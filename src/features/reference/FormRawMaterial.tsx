import { XIcon } from '@heroicons/react/solid';
import { raw } from '@storybook/react';
import { openFamilleF, OpenRawMaterialProp, openRawMaterials } from 'config/rtk/rtkRawMaterial';
import { openUnitF } from 'config/rtk/rtkUnitMeasure';
import React, { forwardRef, Ref, useEffect, useRef, useState } from 'react';
import { ARCHIVE, DEL, REQUEST_EDIT, REQUEST_SAVE, RESTORE } from 'tools/consts';
import { RawMaterial, rawMaterial0, RawMaterialJson, UnitMeasure } from 'tools/types';
import { Field, Form } from 'widgets';
import Action from 'widgets/Action';
import Bcancel from 'widgets/Bcancel';
import Bsave from 'widgets/Bsave';
import BsavEndNew from 'widgets/BsavEndNew';
import MitemsRef from 'widgets/MitemsRef';
import Modal from 'widgets/Modal';
import ModalS from 'widgets/ModalS';
import Pagin from 'widgets/Pagin';
import Required from 'widgets/Required';
import Table from 'widgets/Table';

type FormRawMaterialProps = {
	rawMaterial: RawMaterial;
};
const FormRawMaterial = (
	{ rawMaterial }: FormRawMaterialProps,
	ref: Ref<void>,
) => {
	const rawMaterialsToOpen: OpenRawMaterialProp = openRawMaterials();
	const rawMaterialJson: RawMaterialJson = rawMaterialsToOpen.data;
	const rawMaterials: RawMaterial[] = rawMaterialJson.content;
	const refetchRawMaterial: () => void = rawMaterialsToOpen.refetch;
	const saveRawMaterial = rawMaterialsToOpen.save;
	const editRawMaterial = rawMaterialsToOpen.edit;
	// const tabUnit: UnitMeasure[] = openUnitF().data.content;
	// const Unit = tabUnit?.map((d) => d.symbole);
	const Unit = ["m", "m²", "m³", "mm", "mm²", "mm³", "kg", "g", "mg"];
	const [page, setPage] = useState(0);
	const loadPage = (p: number) => {
		setPage(p);
		refetchRawMaterial();
		refRaw();
	};
	const tabFamille: RawMaterial[] = openFamilleF(page).data.content;
	const refRaw = openFamilleF(page).refetch;
	const Famille = tabFamille?.map((d) => d.design);
	//const { data = [], isFetching, refetch } = usePaginationRawMaterialsQuery(0);
	//useFetchRawMaterialsQuery();
	const [rawMaterial1, setRawMaterial1] = useState<RawMaterial>(rawMaterial0);
	const [request, setRequest] = useState(REQUEST_SAVE);

	//const [save] = useAddRawMaterialMutation();

	//const [updateRawMaterial] = useEditRawMaterialMutation();

	const [form, setForm] = useState(false);

	const [disabled, setDisabled] = useState(true);

	const [show, setShow] = useState(false);
	const open = (r: RawMaterial) => {
		setRawMaterial1(r);
		setShow(true);
	};
	useEffect(() => {
		//@ts-ignore
		ref.current = open;
	});

	const closed = () => {
		setShow(false);
		setDisabled(true);
	};

	const del = useRef(null);
	const archive = useRef(null);
	const restore = useRef(null);

	const showFormulaire = (rawMaterial: RawMaterial) => {
		setRawMaterial1(rawMaterial);
		setForm(true);
		setRequest(REQUEST_EDIT);
	};

	const FormAsEdit = (rawMaterial: RawMaterial) => {
		setDisabled(true);
		showFormulaire(rawMaterial);
	};
	const FormAsUpdate = (rawMaterial: RawMaterial) => {
		setDisabled(false);
		open(rawMaterial);
	};
	const void_ = () => {};

	const [recherche, setRecherche] = useState('');
	const [isRecherche, setIsRecherch] = useState(false);

	return (
		<>
			{!form && (
				<section className='bg-white float-left w-full h-full mp-8 shadow-lg'>
					<Action
						id=''
						path='rawMaterials'
						design=''
						type='Famille Matière Première'
						ref={del}
						action={DEL}
						refetch={refetchRawMaterial}
					/>
					<Action
						id=''
						path='rawMaterials'
						design=''
						type='Famille Matière Première'
						ref={archive}
						action={ARCHIVE}
						refetch={refetchRawMaterial}
					/>
					<h1 className='py-2'>Familles Matière première</h1>
					<div className='float-left w-full'>
						<button
							className='bg-[#2d2e2e] p-3 text-white rounded border border-cyan-900py-2 px-4 shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 float-left'
							onClick={() => {
								setDisabled(false);
								open(rawMaterial0);
							}}>
							Nouvelle Famille Matière Première
						</button>
						<div className='w-full'>
							<div className='float-right'>
								<button className='bg-white float-left border border-[#ddd] border-r-0 p-3 rounded-l-lg' onClick={() => {if(recherche != ""){ setIsRecherch(true); }}}>
									<svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
									</svg>
								</button>
								<input type="text" value={recherche} className='py-3 border outline-[#ddd] border-[#ddd] float-left border-l-0 w-96' placeholder='Recherche' onChange={(e) => {setRecherche(e.target.value);if(e.target.value == ''){setRecherche(''); setIsRecherch(false)}}}/>
								<button className='bg-white float-left border border-[#ddd] border-l-0 p-2 rounded-r-lg' onClick={() => {setIsRecherch(false);setRecherche('');}}>
								<XIcon
									className='w-8 text-[#C1BFBF] group-hover:text-gray-500'
									aria-hidden='true'
								/>
								</button>
							</div>
						</div>
					</div>
					<Table
						className='tab-list float-left w-full mt-8 tab-list'
						thead={
							<tr>
								<th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900'>
									Désignation
								</th>
								<th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900'>
									Nomenclature
								</th>
								<th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900'>
									Taux de perte
								</th>
								<th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900'>
									Unité de mesure
								</th>
								{/* <th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900'>
									Famille
								</th> */}
								<th></th>
							</tr>
						}>
						{!isRecherche &&
							tabFamille?.map((rawMaterial: RawMaterial) => {
								return (
									//@ts-ignore
									<tr className='cursor-pointer h-20 text-xl' key={rawMaterial.id}>
										<Table.td>{rawMaterial.design}</Table.td>
										<Table.td>{rawMaterial.nomenclature}</Table.td>
										<Table.td>
											{rawMaterial.tauxPertes}
											{"%"}
										</Table.td>
										{/* <Table.td>{rawMaterial.family}</Table.td> */}
										<Table.td>{rawMaterial.measureUnit}</Table.td>
										<Table.td className='cursor-pointer'>
											<MitemsRef
												archive={() => {
													//@ts-ignore
													archive.current(rawMaterial.id, rawMaterial.design);
												}}
												del={() => {
													//@ts-ignore
													del.current(rawMaterial.id, rawMaterial.design);
												}}
												obj={rawMaterial}
												update={() => {
													FormAsUpdate(rawMaterial);
												}}
											/>
										</Table.td>
									</tr>
								);
							})
						}
						{isRecherche &&
							tabFamille?.map((rawMaterial: RawMaterial) => {
							if(recherche.toLocaleLowerCase() == rawMaterial.design.toLocaleLowerCase() ||
								recherche.toLocaleLowerCase() == rawMaterial.nomenclature.toLocaleLowerCase() ||
								recherche.toLocaleLowerCase() == rawMaterial.measureUnit.toLocaleLowerCase())
								return (
									//@ts-ignore
									<tr className='cursor-pointer h-20 text-xl' key={rawMaterial.id}>
										<Table.td>{rawMaterial.design}</Table.td>
										<Table.td>{rawMaterial.nomenclature}</Table.td>
										<Table.td>
											{rawMaterial.tauxPertes}
											{"%"}
										</Table.td>
										{/* <Table.td>{rawMaterial.family}</Table.td> */}
										<Table.td>{rawMaterial.measureUnit}</Table.td>
										<Table.td className='cursor-pointer'>
											<MitemsRef
												archive={() => {
													//@ts-ignore
													archive.current(rawMaterial.id, rawMaterial.design);
												}}
												del={() => {
													//@ts-ignore
													del.current(rawMaterial.id, rawMaterial.design);
												}}
												obj={rawMaterial}
												update={() => {
													FormAsUpdate(rawMaterial);
												}}
											/>
										</Table.td>
									</tr>
								);
							})
						}
					</Table>
					<Pagin
						load={loadPage}
						max={rawMaterials?.length}
						visible={rawMaterials?.length > 0}
					/>
				</section>
			)}

			<Modal
				//modal={true}
				format={4}
				show={show}
				title={
					rawMaterial1.id == ""
						? "Nouvelle Famille Matière première"
						: "Modifier Famille Matière première"
				}
				close={closed}>
				<div className='float-left w-full text-sm'>
					<Form
						defaultValues={rawMaterial1}
						onSubmit={(data) => {
							request == REQUEST_SAVE
								? saveRawMaterial(data)
								: request == REQUEST_EDIT
								? editRawMaterial(data)
								: void_;
							setTimeout(() => {
								refetchRawMaterial();
								closed();
							}, 500);
						}}>
						<div className='float-left w-full'>
							<div className=' float-left w-1/2'>
								<Field
									label={<Required msg='Désignation' />}
									name='design'
									disabled={disabled} required
								/>
							</div>
							<div className='float-left w-1/2'>
								<Field
									label={<Required msg='Nomenclature' />}
									name='nomenclature'
									disabled={disabled} required
								/>
							</div>
						</div>
						<div className='float-left w-full'>
							<div className='float-left w-1/2'>
								<Field
									label={<Required msg='Unité De Mesure' />}
									name='measureUnit'
									options={["", ...(Unit || [])]}
									as='select'
									disabled={disabled} required
								/>
							</div>
							<div className='float-right w-1/2'>
								<Field
									label={<Required msg='Taux de perte' />}
									name='tauxPertes'
									disabled={disabled} required
								/>
							</div>
						</div>
						<div className='mt-8 b-ajust-r'>
							<Bsave
								className='float-right'
								onClick={() => {
									// setTimeout(() => {
									// 	refetchRawMaterial();
									// 	closed();
									// }, 500);
								}}
							/>
							{rawMaterial1.id == "" && (
								<BsavEndNew
									className='ml-10 mr-2'
									onClick={() => {
										setTimeout(() => {
											refetchRawMaterial();
										}, 500);
									}}
								/>
							)}
						</div>
					</Form>
					<Bcancel
						className='float-right mt-8 b-ajust'
						onClick={() => {
							setDisabled(true);
							setShow(false);
						}}
					/>
				</div>
			</Modal>
		</>
	);
};

export default forwardRef(FormRawMaterial);
