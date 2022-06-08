import { PlusIcon } from '@heroicons/react/solid'
import React, { useState } from 'react'
import Table from 'widgets/Table'
import GestionColisCommande from './GestionColisCommande'

function ListeDesCommandesPrete({showColisCmd,setShowColisCmd,colis}) {
    const [listPret,setListPret] = useState([{
        code:1,
        designation:"vvvvvvv",
        pois_brut:500,
        qntTot:100,
        qnt_rest:100,
        nCmd:5,
        saison:4,
        portion:"Maroc",
        packaging:20
    }])
  return (
    <div className=''>
        <fieldset className=' border-2 rounded-xl'>
            <legend className='ml-5 text-2xl text-gray-400 p-2 '>List des commandes prête</legend>
            <div className='m-5'>
            <Table className='tab-list my-8 px-1 tab-list float-left'
                thead = 
                    {<Table.tr >
                        <Table.th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900'>Code Article</Table.th>
                        <Table.th className=' top-0 z-10    py-5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900'>Designation</Table.th>
                        {/* <Table.th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 '>Poids brut</Table.th> */}
                        <Table.th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 '>Quantite total</Table.th>
                        <Table.th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 '>Quantite Restante</Table.th>
                        <Table.th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 '>Nº Commande</Table.th>
                        <Table.th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 '>Saison</Table.th>
                        <Table.th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 '>Portion</Table.th>
                        <Table.th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 '>Packaging</Table.th>
                        <Table.th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 '></Table.th>
                    </Table.tr>}
            >
                {listPret.map((p: any) => {
                        return (
                            <Table.tr key={p.code}  >
                                <Table.td>{p.code}</Table.td>
                                <Table.td>{p.designation}</Table.td>
                                {/* <Table.td>{p.pois_brud}</Table.td> */}
                                <Table.td>{p.qntTot}</Table.td>
                                <Table.td>{p.qnt_rest}</Table.td>
                                <Table.td>{p.nCmd}</Table.td>
                                <Table.td>{p.saison}</Table.td>
                                <Table.td>{p.portion}</Table.td>
                                <Table.td>{p.packaging}</Table.td>
                                <Table.td className='cursor-pointer'>
                                    <PlusIcon className='w-7 h-7 border-2 rounded-full border-black text-black ' onClick={()=>setShowColisCmd(true)} />
                                    <GestionColisCommande showColisCmd={showColisCmd} setShowColisCmd={setShowColisCmd} colis={colis}  />
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

export default ListeDesCommandesPrete