import { MinusIcon, PlusIcon } from '@heroicons/react/solid'
import React, { useEffect, useState } from 'react'
import Table from 'widgets/Table'
import AnnulationDesCommandes from './AnnulationDesCommande'
import AffectationDesColis from './AffectationDesColis'
import { Colis, Colisage, ColisJson } from 'tools/types'
import { openAllColis, openColis } from 'config/rtk/rtkColis'
import axios from 'axios'
import { OpenArticleProp, openArticles } from 'components/gestionProduction/rtk/RtkArticle'
import { Article, ArticleJson, Commande, CommandeJson } from 'components/gestionProduction/types'
import { OpenCommandeProp, openCommandes } from 'components/gestionProduction/rtk/RtkCommande'
import Bcyan from 'widgets/Bcyan'
import { refetchClient } from 'components/manager/client/refetchClient'
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

    const colisToOpen = openAllColis()
    const colisJson:ColisJson = colisToOpen.data;
    const coliss: Colis[] = colisJson.content;
    const colisRefetch = colisToOpen.refetch;
    const [allColis, setAllColis] = useState([])
    useEffect(()=>{
        axios.get("http://localhost:1000/api/v1/colis").then((resp) => {
            setAllColis(allColis.concat(resp.data.content));
        })
    },[])

    useEffect(()=>{
        console.log("hey")
        colisRefetch();
    },[coliss])
    //*******************************//
    //************ARTICLE************//
    const ArticlesToOpen: OpenArticleProp = openArticles();
    const ArticleJson: ArticleJson = ArticlesToOpen.data;
    const Articles: Article[] = ArticleJson.content;
    //*******************************//
    //************COMMANDE***********//
    const CommandesToOpen: OpenCommandeProp = openCommandes();
    const CommandesJson: CommandeJson = CommandesToOpen.data
    const Commandes: Commande[] = CommandesJson.content

  return (
    <div className=''>
        <fieldset className=' border-2 rounded-xl'>
            <legend className='ml-5 text-2xl text-gray-400 p-2 '>List des colis</legend>
            <div className='m-5'>
            {/* <Bcyan onClick={() => colisRefetch()}>Refrech</Bcyan> */}
            <Table className='tab-list my-8 px-1 tab-list float-left'
                thead = 
                    {<Table.tr >
                        <Table.th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900'>Code Article</Table.th>
                        {/* <Table.th className=' top-0 z-10    py-5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900'>Client</Table.th> */}
                        <Table.th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 '>Designation</Table.th>
                        <Table.th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 '>Quantite</Table.th>
                        <Table.th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 '>Nº Commande</Table.th>
                        <Table.th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 '>Saison</Table.th>
                        <Table.th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 '>Portion</Table.th>
                        <Table.th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 '>Nº Colis</Table.th>
                        <Table.th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 '></Table.th>
                    </Table.tr>}
            >
                {coliss?.map((p:Colis) => {
                    if(p.idClient == colis.idClient && p.idColisage == colis.id && p.inPalette == false)
                        return (
                            <Table.tr>
                                <Table.td>{Articles?.map(a => {if(a.id === p.idArticle){return a.codeArt}})}</Table.td>
                                {/* <Table.td>{colis.idClient}</Table.td> */}
                                <Table.td>{Articles?.map(a => {if(a.id === p.idArticle){return a.designation}})}</Table.td>
                                <Table.td>{p.quantite}</Table.td>
                                <Table.td>{Commandes?.map(c => {if(c.id === p.idCommande){return c.nbc}})}</Table.td>
                                <Table.td>{Commandes?.map(c => {if(c.id === p.idCommande){return c.season}})}</Table.td>
                                <Table.td>{p.portion}</Table.td>
                                <Table.td>{"de "+p.ncolisDe+" à "+p.ncolisA}</Table.td>
                                <Table.td className='cursor-pointer'>
                                    <div className='flex float-right mx-2'>
                                        <MinusIcon className='w-7 h-7 border-2 rounded-full border-black text-black ' onClick={()=>setShowAnnulation(true)}   />
                                        <AnnulationDesCommandes showAnnulation={showAnnulation} setshowAnnulation={setShowAnnulation} colisRefetch={colisRefetch} id={p.id}  />
                                        <PlusIcon className='w-7 h-7 border-2 rounded-full border-black text-black mx-2 ' onClick={()=>{setshowAffectation(true);}}  />
                                        <AffectationDesColis showAffectation={showAffectation} setshowAffectation={setshowAffectation} colis={p} refetchColis={colisRefetch} />
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