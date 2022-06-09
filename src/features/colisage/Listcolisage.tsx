import React, {  useEffect, useRef, useState } from 'react';
import Section from 'widgets/Section';
import { ArchiveIcon, ReplyIcon, SearchIcon } from '@heroicons/react/solid';
import Table from 'widgets/Table';
import {  ClipboardListIcon, PencilAltIcon,  TrashIcon} from '@heroicons/react/solid';
import { ARCHIVE, DEL, REQUEST_EDIT, REQUEST_SAVE, RESTORE } from 'tools/consts';

import { MenuItems } from 'widgets/TypeWidgets';
import Pagin from 'widgets/Pagin';
import Bcyan from 'widgets/Bcyan';
import axios from 'axios';
import { Client, ClientJson, Colisage, ColisageJson  } from 'tools/types';
import { openColisage } from 'config/rtk/rtkColisage';
import Mitems from 'widgets/Mitems';
import Action from 'widgets/Action';
import { update } from 'lodash';
// import { useDeleteClientMutation } from 'config/rtk';

type ListUtilisateurProps={
  setEstAjt:(b:boolean)=>void
  setShowColis:(b:boolean)=>void
  setModifier:(b:boolean)=>void
  setColis:(c:Colisage)=>void
  ClientJson:ClientJson
}



function ListColisage({setEstAjt,setShowColis,setModifier,setColis,ClientJson}:ListUtilisateurProps) {
  const [page, setPage] = useState(0);
  const del = useRef(null);
  const edit = useRef(null);
  const update = useRef(null)
  const ColisageToOpen:any = openColisage(page)
  const colisageJson: ColisageJson = ColisageToOpen.data;
  // console.log(ClientJson)
  // console.log(Array.isArray(ClientJson))

  const refetchColisage  = ColisageToOpen.refetch;
  
  const loadPage = (p: number) => {
      setPage(p);
      refetchColisage();
  };
  const getName = (colis:Colisage):String => {
        const tab = ClientJson?.filter( (val:Client) => val.id === colis.idClient)
        console.log("This is tab")
        return tab.map((val:Client) => val.design)

  }
  useEffect(() => {
    refetchColisage()
  },[]);




    const FromDetails = (c0:Colisage) => {
        console.log("FromDetails")
        setColis(c0)
        setShowColis(true)
        
    };


    
    const FormAsUpdate = (colis:Colisage) => {
      console.log("FormAsUpdate")
      setColis(colis)
      setShowColis(true)
      setModifier(true)
    };
    const deleteColisage = (id:String) => {
      // console.log(id)
      axios.delete('http://localhost:1000/api/v1/colisage/'+id)
      for(let i=0;i<3;i++){
        refetchColisage()
      }
      
    };

//sdfsdf
    // const menu = (colisage: Colisage): MenuItems[] => {
    //     return [
    //       {
    //         icon: (
    //           <ClipboardListIcon
    //             className="mr-3 h-8 w-8 text-green-300 group-hover:text-gray-500"
    //             aria-hidden="true"
    //           />
    //         ),
    //         text: "Détail",
    //         action: () => {
    //           // console.log(user)
    //           FromDetails(colisage);
    //         },
    //       },
    //       {
    //         icon: (
    //           <PencilAltIcon
    //             className="mr-3 h-8 w-8 text-green-900 group-hover:text-gray-500"
    //             aria-hidden="true"
    //           />
    //         ),
    //         text: "Modifier",
    //         action: () => {
    //           FormAsUpdate(colisage);
    //         },
    //       },
    //       {
    //         icon: (
    //           <TrashIcon
    //             className="mr-3 h-8 w-8 text-rose-900 group-hover:text-gray-500"
    //             aria-hidden="true"
    //           />
    //         ),
    //         text: "Supprimer",
    //         action: () => { 
    //           // console.log("Hello")
    //           // deleteColisage(colisage.id);
    //         },
    //       },
    //       {
    //           icon: (
    //               <ArchiveIcon
    //                   className="mr-3 h-8 w-8 text-gray-800 group-hover:text-gray-500"
    //                   aria-hidden="true"
    //               />
    //           ),
    //           text: "Archiver",
    //           action: () => {
    //               //@ts-ignore
    //               archive.current(Ville.id);
    //           },
    //       },
    //       {
    //           icon: (
    //               <ReplyIcon
    //                   className="mr-3 h-8 w-8 text-green-900 group-hover:text-gray-500"
    //                   aria-hidden="true"
    //               />
    //           ),
    //           text: "Restorer",
    //           action: () => {
    //               //@ts-ignore
    //               restore.current(Ville.id);
    //           },
    //       },
          

    //     ];
    //   };
  return (
    <Section>
            <Action
						id=''
						path='colisage'
						design=''
						type='colisage'
						ref={del}
						action={DEL}
					/>
          <Action
						id=''
						path='colisage'
						design=''
						type='colisage'
						ref={edit}
						action={REQUEST_EDIT}
					/>
          <Action
						id=''
						path='colisage'
						design=''
						type='colisage'
						ref={update}
						action={REQUEST_SAVE}
					/>
            <div className=''>
                <div className='grid grid-cols-6 justify-start'>
                    <div className='col-span-4'>
                    <Bcyan
                        className="float-left"
                        onClick={() => {
                          setEstAjt(true)
                        }}
                      >
                      Nouvelle Fiche
                    </Bcyan>
                    </div>
                    <div className='relative text-zinc-400 flex items-center col-span-2'>
                        <SearchIcon  className='w-7 h-7 absolute ml-1 '/>
                        <input type="text" placeholder='Recherche' className='pl-8 w-full' />
                    </div>
                   
                </div>
                      <h1  className='text-gray-400 mt-5 mb-0 text-2xl'>La Liste des fiches de colisage</h1>
                            
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
                    {console.log([...colisageJson])}
                    {colisageJson?.map((p: Colisage) => {
                        return (
                            <Table.tr  className='cursor-pointer h-20 text-xl' >
                                <Table.td onDoubleClick={()=>FromDetails(p)}>{p.id}</Table.td>
                                <Table.td onDoubleClick={()=>FromDetails(p)}>{getName(p)}</Table.td>
                                <Table.td onDoubleClick={()=>FromDetails(p)}>{p.date_colisage}</Table.td>
                                <Table.td onDoubleClick={()=>FromDetails(p)}>{p.pois_brut}</Table.td>
                                <Table.td onDoubleClick={()=>FromDetails(p)}>{p.nombre_palettes}</Table.td>
                                <Table.td className=''>
                                  <Mitems 
                                     archive={() => {
                                      //@ts-ignore
                                      archive.current(client.id, client.design);
                                    }}
                                    /*   restore={() => {
                                      //@ts-ignore
                                      restore.current(client.id,client.design);
                                    }} */
                                    del={() => {
                                      //@ts-ignore
                                      deleteColisage(p.id)
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
            <Pagin load={loadPage} visible={colisageJson?.length ? true : false} />
           
            
                        </div>
        </Section>
  )
}

export default ListColisage;