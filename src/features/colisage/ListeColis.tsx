import { MinusIcon, PlusIcon } from '@heroicons/react/solid'
import React, { useEffect } from 'react'
import Table from 'widgets/Table'
import AnnulationDesCommandes from './AnnulationDesCommande'
import AffectationDesColis from './AffectationDesColis'
import { Colis, Colisage, ColisJson } from 'tools/types'
import { openColis } from 'config/rtk/rtkColis'
// import { Colisage, ColisJson , Colis } from 'config/rtk/rtk_colisage'
// import { openColis } from '../rtk/rtk_colis'



type ListColisProps={
    showAnnulation:boolean
    setShowAnnulation:(b:boolean)=>void
    showAffectation:boolean
    setshowAffectation:(b:boolean)=>void
    colis:Colisage
  }

function ListeColis({showAnnulation,setShowAnnulation,showAffectation,setshowAffectation,colis}:ListColisProps) {

    const colisToOpen = openColis(colis.idClient)
    const colisJson:ColisJson = colisToOpen.data;
    const colisRefetch = colisToOpen.refetch;
    useEffect(()=>{
        // console.log("hey")
        colisRefetch()
    },[])


  return (
    <div className=''>
        <fieldset className=' border-2 rounded-xl'>
            <legend className='ml-5 text-2xl text-gray-400 p-2 '>List des colis</legend>
            <div className='m-5'>
            <Table className='tab-list my-8 px-1 tab-list float-left'
                thead = 
                    {<Table.tr >
                        <Table.th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900'>Code Article</Table.th>
                        <Table.th className=' top-0 z-10    py-5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900'>Client</Table.th>
                        <Table.th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 '>Designation</Table.th>
                        <Table.th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 '>Quantite</Table.th>
                        <Table.th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 '>Nº Commande</Table.th>
                        <Table.th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 '>Saison</Table.th>
                        <Table.th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 '>Portion</Table.th>
                        <Table.th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 '>Nº Colis</Table.th>
                        <Table.th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 '></Table.th>
                    </Table.tr>}
            >
                {colisJson.map((p:Colis) => {
                        return (
                            <Table.tr>
                                <Table.td>{p.codeArticle}</Table.td>
                                <Table.td>{colis.idClient}</Table.td>
                                <Table.td>{p.designation}</Table.td>
                                <Table.td>{p.quantite}</Table.td>
                                <Table.td>{p.ncommande}</Table.td>
                                <Table.td>{p.saison}</Table.td>
                                <Table.td>{p.portion}</Table.td>
                                <Table.td>{"de "+p.ncolisDe+" a "+p.ncolisA}</Table.td>
                                <Table.td className='cursor-pointer'>
                                    <div className='flex float-right mx-2'>
                                        <MinusIcon className='w-7 h-7 border-2 rounded-full border-black text-black ' onClick={()=>setShowAnnulation(true)}   />
                                        <AnnulationDesCommandes showAnnulation={showAnnulation} setshowAnnulation={setShowAnnulation} colisRefetch={colisRefetch} id={p.id}  />
                                        <PlusIcon className='w-7 h-7 border-2 rounded-full border-black text-black mx-2 ' onClick={()=>{setshowAffectation(true);}}  />
                                        <AffectationDesColis showAffectation={showAffectation} setshowAffectation={setshowAffectation} idClient={colis.idClient}  />
                                    </div>
                                    
                                </Table.td>
                            </Table.tr>
                        )
                    })}
            </Table>
            </div>
        </fieldset>
        </div>
  )
}

export default ListeColis