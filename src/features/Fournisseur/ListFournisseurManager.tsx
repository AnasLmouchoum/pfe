import { XIcon } from '@heroicons/react/solid';
import { OpenFournisseurProp, openFournisseurs, openPaginationFournisseurs } from 'components/gestionProduction/rtk/RtkFournisseur';
import { f0, Fournisseur } from 'components/gestionProduction/types';
import React from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { ARCHIVE, DEL, REQUEST_EDIT, REQUEST_SAVE, RESTORE } from 'tools/consts';
import { Button } from 'widgets';
import Action from 'widgets/Action';
import Bcyan from 'widgets/Bcyan';
import Icon from 'widgets/Icon';
import Mitems from 'widgets/Mitems';
import Pagin from 'widgets/Pagin';
import Section from 'widgets/Section';

import FormFournisseurManager from './FormFournisseurManager';

const ListFournisseurManager = () => {
	const [form, setForm] = useState(false);
	const [fournisseur0, setFournisseur0] = useState(f0);
	const [request0, setRequest0] = useState(REQUEST_SAVE);
	const [page, setPage] = useState(0);
	const fournOpen: OpenFournisseurProp = openPaginationFournisseurs(page);
	const fournisseurs: Fournisseur[] = fournOpen.data.content;
	const refetch = fournOpen.refetch;
	const save = fournOpen.save;
	const [disabled, setDisabled] = useState(true);
	const del = useRef(null);
	const archive = useRef(null);
	const restore = useRef(null);
	const loadPage = (p: number) => {
		setPage(p);
		refetch();
	};
	const showFormulaire = (fournisseur: Fournisseur) => {
		setFournisseur0(fournisseur);
		setForm(true);
		setRequest0(REQUEST_EDIT);
	};
	const FormAsAdd = () => {
		setDisabled(false);
		setFournisseur0(f0);
		setForm(true);
		setRequest0(REQUEST_SAVE);
	};
	const FormAsEdit = (fournisseur: Fournisseur) => {
		setDisabled(true);
		showFormulaire(fournisseur);
	};
	const FormAsUpdate = (fournisseur: Fournisseur) => {
		setDisabled(false);
		showFormulaire(fournisseur);
	};

	const AllfournOpen: OpenFournisseurProp = openFournisseurs();
	const Allfournisseurs: Fournisseur[] = AllfournOpen.data.content;
	const refetchAllFournisseur = AllfournOpen.refetch;

	const [recherche, setRecherche] = useState('');
    const [isRecherche, setIsRecherch] = useState(false);

	return (
		<>
			{form && (
				<FormFournisseurManager
					request={request0}//@ts-ignore
					fournisseur={fournisseur0}
					closed={() => {
						setForm(false);
						setRequest0(REQUEST_SAVE);
						refetch();
					}}
					disable={disabled}
				/>
			)}
			{!form && (
				<Section>
					<Action
						id=''
						path='fournisseurs'
						design=''
						type='le fournisseur'
						ref={del}
						action={DEL}
						refetch={refetch}
					/>
					<Action
						id=''
						path='fournisseurs'
						design=''
						type='le fournisseur'
						ref={archive}
						action={ARCHIVE}
						refetch={refetch}
					/>
					<Action
						id=''
						path='fournisseurs'
						design=''
						type='le fournisseur'
						ref={restore}
						action={RESTORE}
						refetch={refetch}
					/>
					<div className='float-left w-full'>
						<Bcyan
							className='float-left'
							onClick={() => {
								FormAsAdd();
							}}>
							Nouveau Fournisseur
						</Bcyan>
						<div className='float-left w-full'>
							<div className='float-right'>
								<button className='bg-white float-left border border-[#ddd] border-r-0 p-3 rounded-l-lg' onClick={() => {if(recherche != ""){ setIsRecherch(true);refetchAllFournisseur(); }}}>
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
					<table className='tab-list float-left w-full mt-8'>
						<thead className='bg-gray-50'>
							<tr>
								<th className='px-3 py-3 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6'>
									Nom Fournisseur
								</th>
								<th className='px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500'>
									Contact
								</th>
								<th className='px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500'>
									Incoterm
								</th>
								<th className='px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500'>
									Mode Réglement
								</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{!isRecherche &&
							fournisseurs?.map((fournisseur) => (
								<tr className='cursor-pointer h-20 text-xl' key={fournisseur.id}>
									<td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6'>
										<div className='flex items-center'>
											<div className='h-10 w-10 flex-shrink-0'>
												<img
													className='h-10 w-10 rounded-full'
													src={fournisseur.image?.length > 0  ? "/profileImages/"+fournisseur.image : "/profileImages/empty-avatar.png"}
													// src={fournisseur.image}
													alt=''
												/>
											</div>
											<div className='ml-4'>
												<div className='font-medium text-gray-900'>
													{fournisseur.design}
												</div>
											</div>
										</div>
									</td>
									<td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
										<div className='text-gray-900'>{fournisseur.tel}</div>
										<div className='text-gray-500'>{fournisseur.email}</div>
									</td>
									<td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
										<div className='text-gray-900'>{fournisseur.incoterm}</div>
										{/* <div className='text-gray-500'>{fournisseur.contact}</div> */}
									</td>
									<td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
										<div className='text-gray-900'>
											{fournisseur.modeDeReglements}
										</div>
									</td>
									<td>
										<Mitems
											archive={() => {
												//@ts-ignore
												archive.current(fournisseur.id, fournisseur.design);
											}}
											del={() => {
												//@ts-ignore
												del.current(fournisseur.id, fournisseur.design);
											}}
											edit={() => {
												FormAsEdit(fournisseur);
											}}
											obj={fournisseur}
											update={() => {
												FormAsUpdate(fournisseur);
											}}
										/>
									</td>
								</tr>
							))}
							{isRecherche &&
							Allfournisseurs?.map((fournisseur) => {
							if(recherche.toLocaleLowerCase() == fournisseur.design.toLocaleLowerCase() || 
								recherche.toLocaleLowerCase() == fournisseur.email.toLocaleLowerCase() || 
								recherche.toLocaleLowerCase() == fournisseur.tel.toLocaleLowerCase())
							return(
								<tr className='cursor-pointer h-20 text-xl' key={fournisseur.id}>
									<td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6'>
										<div className='flex items-center'>
											<div className='h-10 w-10 flex-shrink-0'>
												<img
													className='h-10 w-10 rounded-full'
													src={"/images/empty-contact.png"}
													// src={fournisseur.image}
													alt=''
												/>
											</div>
											<div className='ml-4'>
												<div className='font-medium text-gray-900'>
													{fournisseur.design}
												</div>
											</div>
										</div>
									</td>
									<td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
										<div className='text-gray-900'>{fournisseur.tel}</div>
										<div className='text-gray-500'>{fournisseur.email}</div>
									</td>
									<td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
										<div className='text-gray-900'>{fournisseur.incoterm}</div>
										{/* <div className='text-gray-500'>{fournisseur.contact}</div> */}
									</td>
									<td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
										<div className='text-gray-900'>
											{fournisseur.modeDeReglements}
										</div>
									</td>
									<td>
										<Mitems
											archive={() => {
												//@ts-ignore
												archive.current(fournisseur.id, fournisseur.design);
											}}
											del={() => {
												//@ts-ignore
												del.current(fournisseur.id, fournisseur.design);
											}}
											edit={() => {
												FormAsEdit(fournisseur);
											}}
											obj={fournisseur}
											update={() => {
												FormAsUpdate(fournisseur);
											}}
										/>
									</td>
								</tr>)
							})}
						</tbody>
					</table>
					<Pagin
						visible={fournisseurs?.length > 0}
						load={loadPage}
						max={fournisseurs?.length}
					/>
				</Section>
			)}
		</>
	);
};

export default ListFournisseurManager;
