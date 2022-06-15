import axios from 'axios';
import { OpenProductProp, openProductsByIdArticle } from 'components/gestionProduction/rtk/RtkProduct';
import { Product, ProductJson } from 'components/gestionProduction/types';
import React, { useEffect, useState } from 'react'
import Table from 'widgets/Table'

type Props = {
    idArticle: string;
}

const HistoriqueTab = ({idArticle}: Props) => {

    const [historique, setHistorique] = useState<Product[]>([]);

//*******************************//
//************Historique Product************//
// const ProductiToOpen: OpenProductProp = openProductsByIdArticle(idArticle);
// const ProductiJson: ProductJson = ProductiToOpen.data
// const Products: Product[] = ProductiJson.content
// console.log(Products)
//*******************************//
//*******************************//


useEffect(() => {
    if(idArticle != ""){
        axios.get('http://localhost:1000/api/v1/products/idarticle/'+idArticle).then(resp => {
            setHistorique(resp.data);
        });
    }
}, []);



  return (
    <div>
        <Table className="tab-list float-left w-full mt-2"
            thead={
                <tr>
                    <Table.th>N°</Table.th>
                    <Table.th>Date</Table.th>
                    <Table.th>Quantité produite</Table.th>
                    <Table.th>Remarque</Table.th>
                </tr>
            }
        >
            {
                historique?.map(h => {
                    return (
                        <tr key={h.id}>
                            <Table.td>{h.num}</Table.td>
                            <Table.td>{h.dateProd}</Table.td>
                            <Table.td>{h.quantite}</Table.td>
                            <Table.td>Remarque</Table.td>
                        </tr>
                    )
                })
            }
        </Table>
    </div>
  )
}

export default HistoriqueTab