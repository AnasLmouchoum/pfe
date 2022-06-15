import { ArchiveIcon, ClipboardListIcon, PencilAltIcon, TrashIcon, XIcon } from '@heroicons/react/solid';
import axios from 'axios';
import { OpenFournisseurProp, openFournisseurs } from 'components/gestionProduction/rtk/RtkFournisseur';
import { OpenMatiereProp, openMatieres, openPaginationMatieres } from 'components/gestionProduction/rtk/RtkMatiere';
import { cp0, f0, Fournisseur, Matiere } from 'components/gestionProduction/types';
// import {
//   OpenFournisseurProp,
//   openFournisseurs,
//   OpenMatierePremiereProp,
//   openMatierePremieresPagination,
// } from 'config/rtk/rtkFournisseur';
import { useEffect, useRef, useState } from 'react';
import { ARCHIVE, DEL } from 'tools/consts';
import { getFournisseur } from 'tools/Methodes';
import { mp0 } from 'tools/types';
// import { f0, Fournisseur, MatierePremiere, mp0 } from 'tools/types';
import { Button } from 'widgets';
import Action from 'widgets/Action';
import Bcyanxl from 'widgets/Bcyanxl';
import Icon from 'widgets/Icon';
import Mitems from 'widgets/Mitems';
import Pagin from 'widgets/Pagin';
import Section from 'widgets/Section';
import Table from 'widgets/Table';
import { MenuItems } from 'widgets/TypeWidgets';

import FormMatierePremiere from './FormMatierePremiere';

const ListAllMatierePremiere = () => {
	const [page, setPage] = useState(0);
	const loadPage = (p: number) => {
		setPage(p);
		refetch();
	};
	// const matierePremieresOpen: OpenMatierePremiereProp =
	// 	openMatierePremieresPagination(page);
	// const matierePremieres: MatierePremiere[] = matierePremieresOpen.data.content;
	// const refetch = matierePremieresOpen.refetch;
	// const fournisseursOpen: OpenFournisseurProp = openFournisseurs();
	// const fournisseurs: Fournisseur[] = fournisseursOpen.data.content;
	// const refCom = useRef(null);
	// const del = useRef(null);
	// const archive = useRef(null);
	// const restore = useRef(null);
	
	const matierePremieresOpen: OpenMatiereProp = openPaginationMatieres(page);
	const matierePremieres: Matiere[] = matierePremieresOpen.data.content;
	const refetch = matierePremieresOpen.refetch;

	const AllmatierePremieresOpen: OpenMatiereProp = openMatieres();
	const AllmatierePremieres: Matiere[] = AllmatierePremieresOpen.data.content;
	const refetchAll = AllmatierePremieresOpen.refetch;
	//********Fournisseur****/
	// const fournisseursOpen: OpenFournisseurProp = openFournisseurs();
	// const fournisseurs: Fournisseur[] = fournisseursOpen.data.content;
	const [fournisseurs, setFournisseurs] = useState<Fournisseur[]>([f0])
	useEffect(() => {
	axios.get('http://localhost:1000/api/v1/fournisseurs').then(resp => {
		setFournisseurs(fournisseurs.concat(resp.data.content))
	})
	}, [])

	const refCom = useRef(null);
	const del = useRef(null);
	const archive = useRef(null);
	const [disabled, setDisabled] = useState(false);

	const [recherche, setRecherche] = useState('');
    const [isRecherche, setIsRecherch] = useState(false);


	return (
		<Section>
			<Action
				id=''
				path='matieresPremiere'
				design=''
				type='la matiere premiere'
				ref={del}
				action={DEL}
				refetch={refetch}
			/>
			<Action
				id=''
				path='matieresPremiere'
				design=''
				type='la matiere premiere'
				ref={archive}
				action={ARCHIVE}
				refetch={refetch}
			/>
			<div className='float-left w-full'>
				<Bcyanxl
					className='float-left mt-2'
					onClick={() => {
						//@ts-ignore
						refCom.current(mp0);
					}}>
					Nouvelle Matière première
				</Bcyanxl>
				<div className='float-left w-full'>
					<div className='float-right'>
						<button className='bg-white float-left border border-[#ddd] border-r-0 p-3 rounded-l-lg' onClick={() => {if(recherche != ""){ setIsRecherch(true);refetchAll()}}}>
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
			<FormMatierePremiere
				Matierep={mp0}
				disabled={disabled}
				setDisabled={setDisabled}
				ref={refCom}
				refetch={refetch}//@ts-ignore
				fournisseurs={fournisseurs}//@ts-ignore
				fournisseur={f0}
			/>
			<Table
				className='tab-list float-left w-full mt-12'
				thead={
					<tr>
						<Table.th>Code</Table.th>
						<Table.th>Désignation</Table.th>
						<Table.th>Prix</Table.th>
						<Table.th>Fournisseur</Table.th>
						<Table.th>Famille</Table.th>
						<Table.th>Origine</Table.th>
						<Table.th></Table.th>
					</tr>
				}>
				{!isRecherche &&
				matierePremieres?.map((matiere) => (
					<tr className='cursor-pointer h-20 text-xl' key={matiere.id}>
						<Table.td>{matiere.codeMat}</Table.td>
						<Table.td>{matiere.designation}</Table.td>
						<Table.td>{matiere.prixUnit}</Table.td>
						<Table.td>
							{/* {getFournisseur(matiere.idFournisseur, fournisseurs).design} */}
							{fournisseurs?.map(f => {if(f.id == matiere.idFournisseur)return f.design})}
						</Table.td>
						<Table.td>{matiere.familleMatierePremiere}</Table.td>
						<Table.td>{matiere.origine}</Table.td>
						<Table.td>
							{/* <Mitems
                menu={menu(
                  matiere,
                  getFournisseur(matiere.idFournisseur, fournisseurs)
                )}
              /> */}	<Mitems
							archive={() => {
								//@ts-ignore
								archive.current(matiere.id, matiere.designation);
								refetch();
							}}
							/*    restore={() => {
								//@ts-ignore
								restore.current(fournisseur.id,fournisseur.design);
							}} */
							del={() => {
								//@ts-ignore
								del.current(matiere.id, matiere.designation);
								refetch();
							}}
							edit={() => {
								// FromDetails(p);
								setDisabled(true);
								//@ts-ignore
								refCom.current(matiere);
							}}
							obj={matiere}
							update={() => {
								// FormAsUpdate(p);
								//@ts-ignore
								refCom.current(matiere);
							}}
				/>
						</Table.td>
					</tr>
				))}
				{isRecherche &&
				AllmatierePremieres?.map((matiere) => {
				if(recherche.toLocaleLowerCase() == matiere.codeMat.toLocaleLowerCase() || recherche == matiere.designation.toLocaleLowerCase()
					|| recherche.toLocaleLowerCase() == matiere.familleMatierePremiere.toLocaleLowerCase()
					|| recherche.toLocaleLowerCase() == fournisseurs?.map(f => {if(f.id == matiere.idFournisseur)return f.design}).filter(e=>e)[0]?.toLocaleLowerCase()
					|| recherche.toLocaleLowerCase() == matiere.origine.toLocaleLowerCase()){
				return(
				<tr className='cursor-pointer h-20 text-xl' key={matiere.id}>
						<Table.td>{matiere.codeMat}</Table.td>
						<Table.td>{matiere.designation}</Table.td>
						<Table.td>{matiere.prixUnit}</Table.td>
						<Table.td>
							{/* {getFournisseur(matiere.idFournisseur, fournisseurs).design} */}
							{fournisseurs?.map(f => {if(f.id == matiere.idFournisseur)return f.design})}
						</Table.td>
						<Table.td>{matiere.familleMatierePremiere}</Table.td>
						<Table.td>{matiere.origine}</Table.td>
						<Table.td>
							<Mitems
							archive={() => {
								//@ts-ignore
								archive.current(matiere.id, matiere.designation);
								refetch();
							}}
							/*    restore={() => {
								//@ts-ignore
								restore.current(fournisseur.id,fournisseur.design);
							}} */
							del={() => {
								//@ts-ignore
								del.current(matiere.id, matiere.designation);
								refetch();
							}}
							edit={() => {
								// FromDetails(p);
								setDisabled(true);
								//@ts-ignore
								refCom.current(matiere);
							}}
							obj={matiere}
							update={() => {
								// FormAsUpdate(p);
								//@ts-ignore
								refCom.current(matiere);
							}}
				/>
						</Table.td>
					</tr>)}}
				)}
			</Table>
			<Pagin load={loadPage} max={300} visible={true} />
		</Section>
	);
};
export default ListAllMatierePremiere;
