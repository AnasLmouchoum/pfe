import { PlusIcon } from '@heroicons/react/solid'
import axios from 'axios'
import { OpenArticleProp, openArticles } from 'config/rtk/rtkArticle'
import { OpenCommandeProp, openCommandes } from 'config/rtk/RtkCommande'
import React, { useEffect, useState } from 'react'
import { Article, ArticleJson, Commande, CommandeJson } from 'tools/types'
import Table from 'widgets/Table'
// import { OpenArticleProp, openArticles } from '../rtk/RtkArticle'
// import { OpenCommandeProp, openCommandes } from '../rtk/RtkCommande'
// import { Article, ArticleJson, Commande, CommandeJson } from '../tools/types'
import GestionColisCommande from './GestionColisCommande'

//@ts-ignore
function ListeDesCommandesPrete({showColisCmd,setShowColisCmd,colis}) {
    
    //*******************************//
    //************ARTICLE************//
    const ArticlesToOpen: OpenArticleProp = openArticles();
    const ArticleJson: ArticleJson = ArticlesToOpen.data;
    //@ts-ignore
    const Articles: Article[] = ArticleJson.content;
    //*******************************//
    //************ARTICLE************//
    const [ProductsDone, setProductsDone] = useState([])
    useEffect(() => {
    axios.get('http://localhost:1000/api/v1/productsDone').then(resp => {
        setProductsDone(resp.data)
    })
    }, [])
    //*******************************//
    //************COMMANDE***********//
    const CommandesToOpen: OpenCommandeProp = openCommandes();
    const CommandesJson: CommandeJson = CommandesToOpen.data
    const Commandes: Commande[] = CommandesJson.content

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
                {ProductsDone.map((p: any) => {
                        console.log("This is Article")
                        console.log(Articles)
                        console.log(p)
                        if(colis.idClient == p.idClient)
                        return (
                            <Table.tr key={p.id}  >
                                <Table.td>{Articles?.map(a => {if(a.id === p.idArticle){return a.codeArt}})}</Table.td>
                                <Table.td>{Articles?.map(a => {if(a.id === p.idArticle){return a.designation}})}</Table.td>
                                {/* <Table.td>{p.pois_brud}</Table.td> */}
                                <Table.td>{p.sum}</Table.td>
                                <Table.td>{0}</Table.td>
                                <Table.td>{Commandes?.map(c => {if(c.id === p.idCommande){return c.nbc}})}</Table.td>
                                <Table.td>{Commandes?.map(c => {if(c.id === p.idCommande){return c.season}})}</Table.td>
                                <Table.td>{p.portion}</Table.td>
                                <Table.td>{20}</Table.td>
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