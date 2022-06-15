import React, {  useEffect, useRef, useState } from 'react';
import Section from 'widgets/Section';
import { ArchiveIcon, ReplyIcon, SearchIcon, XIcon } from '@heroicons/react/solid';
import Table from 'widgets/Table';
import {  ClipboardListIcon, PencilAltIcon,  TrashIcon} from '@heroicons/react/solid';
import { ARCHIVE, DEL, REQUEST_EDIT, REQUEST_SAVE } from 'tools/consts';

import { MenuItems } from 'widgets/TypeWidgets';
import Pagin from 'widgets/Pagin';
import Bcyan from 'widgets/Bcyan';
import axios from 'axios';
import { Colisage, ColisageJson  } from 'tools/types';
import { openColisage } from 'config/rtk/rtkColisage';
import Mitems from 'widgets/Mitems';
import Action from 'widgets/Action';
import { update } from 'lodash';
import { Client, ClientJson } from 'components/gestionProduction/types';
// import { useDeleteClientMutation } from 'config/rtk';

type ListUtilisateurProps={
  setEstAjt:(b:boolean)=>void
  setShowColis:(b:boolean)=>void
  setModifier:(b:boolean)=>void
  setColis: any
  // setColis:(c:Colisage)=>void
  Client:Client[]
}



function ListColisage({setEstAjt,setShowColis,setModifier,setColis,Client}:ListUtilisateurProps) {
  const [page, setPage] = useState(0);
  const del = useRef(null);
  const archive = useRef(null);
  const edit = useRef(null);
  const update = useRef(null)
  const ColisageToOpen:any = openColisage(page)
  const colisageJson: ColisageJson = ColisageToOpen.data;
  const colisages: Colisage[] = colisageJson.content;

  const refetchColisage  = ColisageToOpen.refetch;
  
  const loadPage = (p: number) => {
      setPage(p);
      refetchColisage();
  };
  const getName = (colis:Colisage) => {
        const tab = Client?.filter( (val:Client) => val.id === colis.idClient)
        return tab?.map((val:Client) => val.design).filter(e => e)

  }
  useEffect(() => {
    refetchColisage()
  },[]);




    const FromDetails = (c0:Colisage) => {
        setColis(c0)
        setShowColis(true)
        
    };


    
    const FormAsUpdate = (colis:Colisage) => {
      setColis(colis)
      setShowColis(true)
      setModifier(true)
    };
    const deleteColisage = (id:String) => {
      axios.delete('http://localhost:1000/api/v1/colisage/'+id)
      for(let i=0;i<3;i++){
        refetchColisage()
      }
      
    };

    const [recherche, setRecherche] = useState('');
    const [isRecherche, setIsRecherch] = useState(false);

  return (
    <Section>
            <Action
						id=''
						path='colisage'
						design=''
						type='le colisage'
						ref={del}
						action={DEL}
            refetch={refetchColisage}
					/>
          <Action
						id=''
						path='colisage'
						design=''
						type='le colisage'
						ref={archive}
						action={ARCHIVE}
            refetch={refetchColisage}
					/>
          <Action
						id=''
						path='colisage'
						design=''
						type='colisage'
						ref={edit}
						action={REQUEST_EDIT}
            refetch={refetchColisage}
					/>
          <Action
						id=''
						path='colisage'
						design=''
						type='colisage'
						ref={update}
						action={REQUEST_SAVE}
            refetch={refetchColisage}
					/>
          <div className=''>
            <h1>Liste des fiches de colisage</h1>
            <div className='float-left w-full'>
                <Bcyan
                    className="float-left"
                    onClick={() => {
                      setEstAjt(true)
                    }}
                  >
                  Nouvelle Fiche
                </Bcyan>
              <div className='float-right'>
                  <button className='bg-white float-left border border-[#ddd] border-r-0 p-3 rounded-l-lg' onClick={() => {if(recherche != ""){ setIsRecherch(true) }}}>
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
                            
                        <Table className='tab-list mt-8 tab-list float-left w-full'
                thead = 
                    {<Table.tr >
                        <Table.th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900'>Nº</Table.th>
                        <Table.th className=' top-0 z-10    py-5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900'>Client</Table.th>
                        <Table.th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 '>Date</Table.th>
                        <Table.th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 '>Pois brut</Table.th>
                        <Table.th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 '>NB Palettes</Table.th>
                        <Table.th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 '></Table.th>
                    </Table.tr>}
            >       
                    {!isRecherche &&
                    colisageJson.content?.map((p: Colisage, i) => {
                        return (
                            <Table.tr  className='cursor-pointer h-20 text-xl' >
                                <Table.td onDoubleClick={()=>FromDetails(p)}>{(page*2+page)+i+1}</Table.td>
                                <Table.td onDoubleClick={()=>FromDetails(p)}>{getName(p)}</Table.td>
                                <Table.td onDoubleClick={()=>FromDetails(p)}>{p.date_colisage}</Table.td>
                                <Table.td onDoubleClick={()=>FromDetails(p)}>{p.pois_brut}</Table.td>
                                <Table.td onDoubleClick={()=>FromDetails(p)}>{p.nombre_palettes}</Table.td>
                                <Table.td className=''>
                                  <Mitems 
                                     archive={() => {
                                      //@ts-ignore
                                      archive.current(p.id, (page*2+page)+i+1);
                                    }}
                                    del={() => {
                                      //@ts-ignore
                                      del.current(p.id, (page*2+page)+i+1);
                                      // deleteColisage(p.id)
                                    }}
                                    edit={() => {
                                      FromDetails(p)
                                    }}
                                    obj={p}
                                    update={() => {
                                      FormAsUpdate(p)
                                      
                                    }}
                                      
                                  />
                                </Table.td>
                            </Table.tr>
                        )
                    })}
                    {isRecherche &&
                    colisageJson.content?.map((p: Colisage, i) => {
                        return (
                            <Table.tr  className='cursor-pointer h-20 text-xl' >
                                <Table.td onDoubleClick={()=>FromDetails(p)}>{(page*2+page)+i+1}</Table.td>
                                <Table.td onDoubleClick={()=>FromDetails(p)}>{getName(p)}</Table.td>
                                <Table.td onDoubleClick={()=>FromDetails(p)}>{p.date_colisage}</Table.td>
                                <Table.td onDoubleClick={()=>FromDetails(p)}>{p.pois_brut}</Table.td>
                                <Table.td onDoubleClick={()=>FromDetails(p)}>{p.nombre_palettes}</Table.td>
                                <Table.td className=''>
                                  <Mitems 
                                     archive={() => {
                                      //@ts-ignore
                                      archive.current(p.id, (page*2+page)+i+1);
                                    }}
                                    del={() => {
                                      //@ts-ignore
                                      del.current(p.id, (page*2+page)+i+1);
                                      // deleteColisage(p.id)
                                    }}
                                    edit={() => {
                                      FromDetails(p)
                                    }}
                                    obj={p}
                                    update={() => {
                                      FormAsUpdate(p)
                                      
                                    }}
                                      
                                  />
                                </Table.td>
                            </Table.tr>
                        )
                    })}
            </Table>
            <Pagin load={loadPage} visible={colisages?.length > 0} max={colisages?.length} />
           
            
                        </div>
        </Section>
  )
}

export default ListColisage;