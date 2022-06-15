import axios from 'axios';
import { OpenArticleProp, openOneArticle } from 'components/gestionProduction/rtk/RtkArticle';
import { art0, Article, ArticleJson } from 'components/gestionProduction/types';
import React, { useEffect, useState } from 'react'
import Table from 'widgets/Table';

type Props = {
    qte?: any;
    idArticle: string;
}

const MatieresForProduct = ({qte, idArticle}: Props) => {

//*******************************//
//************ARTICLE************//
// const ArticleToOpen: OpenArticleProp = openOneArticle(idArticle);
// const ArticleJson: ArticleJson = ArticleToOpen.data
// const Article: Article[] = ArticleJson.content
// console.log(Article)
//*******************************//
//************ARTICLE************//
const [article, setArticle] = useState<Article>(art0);
useEffect(() => {
    axios.get('http://localhost:1000/api/v1/articlees/'+idArticle).then(resp => {
        setArticle(resp.data);
    });
}, []);

  return (
    <fieldset className='border-2 rounded-xl mx-0'>
            <legend className='ml-5 text-2xl text-gray-400 p-2 '>Besoin de matières premières</legend>
        <Table className='tab-list float-left w-full tab-list'
        thead = 
            {<tr>
                <th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900'>Code</th>
                <th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900'>Désignation</th>
                <th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 '>Stock</th>
                <th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 '>Besoin Unitaire</th>
                <th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 '>Besoin Totale</th>
                <th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 '>unité</th>
            </tr>}
        >
            {article?.articleMatieres?.map(mp => {
                return (
                <tr key={mp.id}>
                    <td>{mp.matiere.codeMat}</td>
                    <td>{mp.matiere.designation}</td>
                    <td>{mp.matiere.stock}</td>
                    <td>{mp.quantite}</td>
                    <td>{parseFloat(mp.quantite) * qte}</td>
                    <td>{mp.matiere.unitMesure}</td>
                </tr>
                )
            })}
        </Table>
    </fieldset>
  )
}

export default MatieresForProduct