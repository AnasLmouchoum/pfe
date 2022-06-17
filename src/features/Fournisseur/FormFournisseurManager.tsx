// import { useAddFournisseurMutation, useEditFournisseurMutation } from 'config/rtk';
import { DotsHorizontalIcon } from '@heroicons/react/solid';
import { useAddFournisseurMutation, useEditFournisseurMutation } from 'components/gestionProduction/rtk/RtkFournisseur';
import React, { useState } from 'react';
import { REQUEST_EDIT, REQUEST_SAVE } from 'tools/consts';
import { Devise, Fournisseur } from 'tools/types';
import { Field, Form } from 'widgets';
import Avatar from 'widgets/Avatar';
import Bcancel from 'widgets/Bcancel';
import Bsave from 'widgets/Bsave';
import Bupdate from 'widgets/Bupdate';
import Required from 'widgets/Required';
import Section from 'widgets/Section';
import ShowCheckedsField from 'widgets/ShowCheckedsField';
import Title from 'widgets/Title';
import Xclose from 'widgets/Xclose';

import ListCommandeFournisseur from './ListCommandeFournisseur';

type FormFournisseurManagerProp = {
	closed: () => void;
	fournisseur: Fournisseur;
	request: number;
	disable: boolean;
};
const FormFournisseurManager = ({
	closed,
	fournisseur,
	request,
	disable,
}: FormFournisseurManagerProp) => {
	const [save] = useAddFournisseurMutation();
	const [edit] = useEditFournisseurMutation();
	// const tabDevises: Devise[] = openDevises(0).data.content;
	// const devises: string[] = tabDevises?.map((d) => d.symbole);
	const devises: string[] = ["", "DH", "USD", "EUR"];
	// const tabIncoterms: Incoterm[] = openIncoterms().data.content;
	// const incoterms = tabIncoterms?.map((d) => d.code);
	const incoterms: string[] = ["", "EXW", "FCA", "CPT", "CIP", "DPU", "DAP", "DDP"];
	// const tabPayementModes: PayementMode[] = openPayementModes().data.content;
	// const payementModes = tabPayementModes?.map((d) => d.code);
	const payementModes: string[] = ["","Par chèque", "Par carte bancaire", "Par espèces", "En ligne"];
	const onSubmit = (data) => { 
		request == REQUEST_SAVE ? save({...data, image: img}) : request == REQUEST_EDIT ? edit({...data, image: img}) : undefined;

		setTimeout(() => {
			closed();
		}, 500);
	}
	const [disabled, setDisabled] = useState(disable);

	const [img, setImg] = useState('');
	
	return (
		<Section>
			<Xclose close={closed} />
			<Title msg='fournisseur' id={fournisseur.id} edit={disabled} />
			<div className='text-xs'> {/*@ts-ignore*/}
				<Form defaultValues={fournisseur} onSubmit={onSubmit}>
					<div className='float-left w-5/6'>
						<div className='float-left w-1/2'>
							{request == REQUEST_EDIT && <Field type='hidden' name='id' />}
							<Field
								label={<Required msg='Nom du Fournisseur' />}
								name='design'
								disabled={disabled}
								required
							/>
							<Field label='Contact' name='contact' disabled={disabled} />
							<Field label='Téléphone' name='tel' disabled={disabled} />
							<Field label='Email' name='email' disabled={disabled} />
							<Field
								label={<Required msg='Adresse' />}
								name='adressse'
								as='textarea'
								disabled={disabled}
								required
							/>
						</div>
						<div className='float-left w-1/2'>
							<Field
								label={<Required msg='Mode de Règlement' />}
								name='modeDeReglements'
								as='select'
								options={payementModes}
								disabled={disabled}
								required
							/>
							<Field
								label={<Required msg='Incoterm' />}
								name='incoterm'
								as='select'
								options={incoterms}
								disabled={disabled}
								required
							/>
							<Field
								label={<Required msg='Devise' />}
								name='devise'
								as='select'
								options={devises}
								disabled={disabled}
								required
							/>

							<ShowCheckedsField
								msg='les coordonnées bancaires du fournisseur'
								isAdd={fournisseur.id == ""}>
								<Field label='Banque' name='nomBanque' disabled={disabled} />
								<Field label='RIB' name='ribBanque' disabled={disabled} />
								<Field label='SWIFT' name='swift' disabled={disabled} />
							</ShowCheckedsField>
						</div>
					</div>
					<div className="col-span-1">
						<div className=" justify-center col-span-2">
							<div className="grid justify-center">
							<div className="w-28 h-28  block mt-10">
							<img src={fournisseur.image?.length > 0 ? "/profileImages/"+fournisseur.image : "/profileImages/empty-avatar.png"} />
							</div>
							<div className="text-sm text-gray-600 ">
								<label
								htmlFor="file-upload"
								className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
								>
								<span>
									<DotsHorizontalIcon className="w-8 h-8 text-gray-400 m-auto" />
								</span>
								<Field
									id="file-upload"
									name="file"
									type="file"
									className="sr-only"
									disabled={disabled}
									onChange={(e) => {setImg(e.target.files[0].name);}}
								/>
								
								</label>
							</div>
							</div>
						</div>
            </div>
					<div className='float-left w-full mt-1'>
						{!disabled && (
							<Bsave
								className='float-right b-ajust-r'
								// onClick={() => {
								// 	setTimeout(() => {
								// 		closed();
								// 	}, 500);
								// }}
							/>
						)}
					</div>
				</Form>
			</div>
			{!disabled && (
				<Bcancel
					className={
						"float-right b-ajust " + (request == REQUEST_SAVE && "b-ajustf")
					}
					onClick={() => {
						if (fournisseur.id != "") setDisabled(true);
						else closed();
					}}
				/>
			)}

			{disabled && (
				<Bupdate
					className='float-right'
					onClick={() => {
						setDisabled(false);
					}}
				/>
			)}
			{/* {fournisseur.id != "" && (
				<ListCommandeFournisseur fournisseur={fournisseur} />
			)} */}
		</Section>
	);
};
export default FormFournisseurManager;
