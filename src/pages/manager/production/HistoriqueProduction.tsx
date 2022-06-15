import React, { useState } from 'react'
import { ArticleCommande, ArticleCommandeJson, Commande, CommandeJson, Product, ProductJson } from 'components/gestionProduction/types';
import Table from 'widgets/Table';
import { openAllProducts, OpenProductProp, openProducts } from 'components/gestionProduction/rtk/RtkProduct';
import { OpenArticleCommandeProp, openArticleCommandes } from 'components/gestionProduction/rtk/RtkArticleCommande';
import { OpenCommandeProp, openCommandes } from 'components/gestionProduction/rtk/RtkCommande';
import Pagin from 'widgets/Pagin';
import { XIcon } from '@heroicons/react/solid';

type Props = {}

const HistoriqueProduction = () => {

    const [page, setPage] = useState(0);

    const loadPage = (p: number) => {
        setPage(p);
        refetchProduct();
    };

//*******************************//
//************PRODUCT************//
const ProductsToOpen: OpenProductProp = openProducts(page);
const ProductJson: ProductJson = ProductsToOpen.data
const Products: Product[] = ProductJson.content
const refetchProduct:()=>void=ProductsToOpen.refetch
//*******************************//
//*******ARTICLE-COMMANDE********//
const ArticleCommandesToOpen: OpenArticleCommandeProp = openArticleCommandes();
const ArticleCommandesJson: ArticleCommandeJson = ArticleCommandesToOpen.data
const ArticleCommandes: ArticleCommande[] = ArticleCommandesJson.content
//*******************************//
//************COMMANDE***********//
const CommandesToOpen: OpenCommandeProp = openCommandes();
const CommandesJson: CommandeJson = CommandesToOpen.data
const Commandes: Commande[] = CommandesJson.content
//*******************************//
//*******************************//

const AllProductsToOpen: OpenProductProp = openAllProducts();
const AllProductJson: ProductJson = AllProductsToOpen.data
const AllProducts: Product[] = AllProductJson.content

const [recherche, setRecherche] = useState('');
const [isRecherche, setIsRecherch] = useState(false);


  return (
    <section className='bg-white float-left w-full h-full mp-8 shadow-lg'>
        <div className='float-left w-full'>
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
        {/* <div> */}
            <Table className='tab-list mt-8 tab-list float-left w-full'
                thead={
                    <tr>
                        <th className=' top-0 z-10   y-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900'>idFiche</th>
                        <th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900'>Commande</th>
                        <th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 '>Quantité à fabriquer</th>
                        <th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 '>Quantité à fabriquée</th>
                        <th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 '>Date de Production</th>
                        <th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 '>Portion</th>
                    </tr>}
                >
                    {!isRecherche &&
                        Products?.map((p: Product, i) => {
                            return (
                                <Table.tr className='h-20 text-xl' key={p.id}>
                                    <Table.td>{(page*2+page)+i}</Table.td>
                                    <Table.td>Commande {Commandes?.map((c) => {if(p.idCommande === c.id){return c.nbc}}).filter(e => e)}</Table.td>
                                    <Table.td>{//@ts-ignore 
                                        ArticleCommandes?.map((ac) => {if(p.idCommande === ac.idCommande && p.idArticle === ac.idArticlee && p.portion === ac.portion){return ac.qte}}).filter(e => e)
                                    }</Table.td>
                                    <Table.td>{p.quantite}</Table.td>
                                    <Table.td>{p.dateProd}</Table.td>
                                    <Table.td>{p.portion}</Table.td>
                                </Table.tr>
                            )
                    })}
                    {isRecherche &&
                        AllProducts?.map((p: Product, i) => {//@ts-ignore
                        if(recherche == p.dateProd ||
                            recherche.toLocaleLowerCase() == ("commande "+Commandes?.map((c) => {if(p.idCommande === c.id){return c.nbc}}).filter(e => e)[0]).toLocaleLowerCase()
                            || recherche.toLocaleLowerCase() == p.portion.toLocaleLowerCase())
                            return (
                                <Table.tr className='h-20 text-xl' key={p.id}>
                                    <Table.td>{(page*2+page)+i}</Table.td>
                                    <Table.td>Commande {Commandes?.map((c) => {if(p.idCommande === c.id){return c.nbc}}).filter(e => e)}</Table.td>
                                    <Table.td>{//@ts-ignore
                                        ArticleCommandes?.map((ac) => {if(p.idCommande === ac.idCommande && p.idArticle === ac.idArticlee && p.portion === ac.portion){return ac.qte}}).filter(e => e)
                                    }</Table.td>
                                    <Table.td>{p.quantite}</Table.td>
                                    <Table.td>{p.dateProd}</Table.td>
                                    <Table.td>{p.portion}</Table.td>
                                </Table.tr>
                            )
                        // else if(i==0)
                        // return(<Table.tr className='h-20 text-xl' key={p.id}>
                        //     <div className='center'>"helooow"</div>
                        // </Table.tr>)
                    })}
            </Table>
            <Pagin load={loadPage} visible={Products?.length > 0} max={Products?.length} />
    </section>
  )
}

export default HistoriqueProduction