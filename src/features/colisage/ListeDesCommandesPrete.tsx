import { PlusIcon } from '@heroicons/react/solid'
import axios from 'axios'
import { OpenArticleProp, openArticles } from 'components/gestionProduction/rtk/RtkArticle'
import { OpenCommandeProp, openCommandes } from 'components/gestionProduction/rtk/RtkCommande'
import { Article, ArticleJson, Commande, CommandeJson } from 'components/gestionProduction/types'
import { openAllColis } from 'config/rtk/rtkColis'
import React, { useEffect, useState } from 'react'
import { Colis, ColisJson } from 'tools/types'
import Bcyan from 'widgets/Bcyan'
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
    //*******************************//
    //************COLIS***********//
    const colisToOpen = openAllColis()
    const colisJson:ColisJson = colisToOpen.data;
    const coliss: Colis[] = colisJson.content;
    const colisRefetch = colisToOpen.refetch;
    const [allColis, setAllColis] = useState<Colis[]>([])
    useEffect(()=>{
        axios.get("http://localhost:1000/api/v1/colis").then((resp) => {
            setAllColis(allColis.concat(resp.data.content));
        })
    },[])

  return (
    <div className=''>
        <fieldset className=' border-2 rounded-xl'>
            <legend className='ml-5 text-2xl text-gray-400 p-2 '>List des commandes prête</legend>
            <div className='m-5'>
            {/* <Bcyan onClick={() => colisRefetch()}>Refrech</Bcyan> */}
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
                {ProductsDone.map((p: any) => {//@ts-ignore
                        if(colis.idClient == p.idClient && (p.sum - (coliss?.map(c => {if(c.idClient == p.idClient && c.idArticle == p.idArticle && c.idCommande == p.idCommande && c.portion == p.portion)return c.quantite}).filter(e=>e)?.reduce((acc, cur) => acc+cur, 0) || 0)) >0)
                        return (
                            <Table.tr key={p.id}  >
                                <Table.td>{Articles?.map(a => {if(a.id === p.idArticle){return a.codeArt}})}</Table.td>
                                <Table.td>{Articles?.map(a => {if(a.id === p.idArticle){return a.designation}})}</Table.td>
                                {/* <Table.td>{p.pois_brud}</Table.td> */}
                                <Table.td>{p.sum}</Table.td>{/*@ts-ignore*/}
                                <Table.td>{p.sum - (coliss?.map(c => {if(c.idClient == p.idClient && c.idArticle == p.idArticle && c.idCommande == p.idCommande && c.portion == p.portion)return c.quantite}).filter(e=>e)?.reduce((acc, cur) => acc+cur, 0) || 0)}</Table.td>
                                <Table.td>{Commandes?.map(c => {if(c.id === p.idCommande){return c.nbc}})}</Table.td>
                                <Table.td>{Commandes?.map(c => {if(c.id === p.idCommande){return c.season}})}</Table.td>
                                <Table.td>{p.portion}</Table.td>
                                <Table.td>{20}</Table.td>
                                <Table.td className='cursor-pointer'>
                                    <PlusIcon className='w-7 h-7 border-2 rounded-full border-black text-black ' onClick={()=>setShowColisCmd(true)} />
                                    <GestionColisCommande showColisCmd={showColisCmd} setShowColisCmd={setShowColisCmd} product={p} idColisage={colis.id} colisRefetch={colisRefetch} />
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