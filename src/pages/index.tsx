import { Col, Form, Head, Link, Text, View } from "widgets";
import Counter from "features/counter/Counter";
import { useTranslation } from "hooks/translate";
import type { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect, useState } from "react";
import { getSession, signIn, useSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import { NextResponse } from "next/server";
import { useRouter } from "next/router";
import Table from "widgets/Table";
import { ArticleCommande, CalculProduct, Client, Commande } from "components/gestionProduction/types";
import axios from "axios";
import { OpenCalculProductProp, openCalculProducts } from "components/gestionProduction/rtk/RtkCalculProduct";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";
import { openAllProducts } from "components/gestionProduction/rtk/RtkProduct";

const IndexPage: NextPage = () => {
  const { data: session, status } = useSession();
  // const loading = status === "loading";
  console.log(session)
  const router = useRouter();
  useEffect(()=>{
        
    const securePage = async () =>{
        const session = await getSession()
        if(!session){
          router.push({
            pathname: '/login',
            query: { returnUrl: router.asPath }
        });
        }else{
          console.log(session)
        }
    }
   securePage() 
})
  const { t } = useTranslation("common");

  const [Clients, setClients] = useState<Client[]>([])
  useEffect(() => {
    axios.get('http://localhost:1000/api/v1/clients').then(resp => {
      setClients(Clients.concat(resp.data.content));
    })
  }, [])

  const [Commandes, setCommandes] = useState<Commande[]>([])
  useEffect(() => {
    axios.get('http://localhost:1000/api/v1/commandes').then(resp => {
      setCommandes(Commandes.concat(resp.data.content));
    })
  }, [])

  const AllProductsToOpen: OpenCalculProductProp = openCalculProducts();
  const AllProducts: CalculProduct[] = AllProductsToOpen.data;

  const [ArticleCommandes, setArticleCommandes] = useState<ArticleCommande[]>([])
  useEffect(() => {
    axios.get('http://localhost:1000/api/v1/articlecommandes').then(resp => {
      setArticleCommandes(ArticleCommandes.concat(resp.data.content));
    })
  }, [])

  const Products = openAllProducts().data.content?.map((p) => p.quantite);

const data = [{}];

  for(let i=0; i<Products?.length; i++){
    data.push({"name":"Page"+(i+1), "Quantité":Products[i]});
  }
  
  const dataa = [
    {
      "name": "Page 1",
      "Commandes": 400,
      // "pv": 2400
    },
    {
      "name": "Page B",
      "Commandes": 300,
      // "pv": 1398
    },
    {
      "name": "Page C",
      "Commandes": 200,
      // "pv": 9800
    },
    {
      "name": "Page D",
      "Commandes": 278,
      // "pv": 3908
    },
    {
      "name": "Page E",
      "Commandes": 180,
      // "pv": 4800
    },
    {
      "name": "Page F",
      "Commandes": 230,
      // "pv": 3800
    },
    {
      "name": "Page G",
      "Commandes": 340,
      // "pv": 4300
    }
  ]

  return (
    <Col>
      <Head title={t("GESTION COMMERCIALE")} />
      <View as="main">
        {/* <img className="float w-full h-72" src="/images/homeImg.jpg" alt="" /> */}
        <h1 className="flex justify-center">Productions et Commandes</h1>
        <div className="center mt-4 flex justify-around">
        <BarChart width={420} height={220} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {/* <Bar dataKey="pv" fill="#8884d8" /> */}
          <Bar dataKey="Quantité" fill="#4A4445" />
        </BarChart>
        <BarChart width={420} height={220} data={dataa}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {/* <Bar dataKey="pv" fill="#8884d8" /> */}
          <Bar dataKey="Commandes" fill="#764A17" />
        </BarChart>
        </div>
        <Table className='tab-list float-left w-full mt-8 tab-list'
                thead = 
                    {<tr>
                        <th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900'>Client</th>
                        <th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 '>Référence commande</th>
                        <th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 '>Quantité commande</th>
                        <th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 '>Quantité produite</th>
                    </tr>}
            >
                    {//@ts-ignore
                    Commandes?.map((p: Product, i:number) => {
                        return (
                            <Table.tr className='cursor-pointer h-20 text-xl' key={p.id}>
                                <Table.td>{Clients?.map(c => {if(c.id === p.idClient){return c.design}})}</Table.td>
                                <Table.td>{p.nbc}</Table.td>
                                <Table.td>{ArticleCommandes?.map(c => {if(c.idCommande === p.id){return c.qte}}).filter(e => e).length ? ArticleCommandes?.map(c => {if(c.idCommande === p.id){return c.qte}}).filter(e => e).reduce((acc, cur) => acc+cur) : 0}</Table.td>
                                <Table.td>{AllProducts?.map(c => {if(c.idCommande === p.id){return c.qteProduit}}).filter(e => e).length ? AllProducts?.map(c => {if(c.idCommande === p.id){return c.qteProduit}}) : 0}</Table.td>
                            </Table.tr>
                        )
                      
                    })}
            </Table>
      </View>
    </Col>
  );
};

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      // Will be passed to the page component as props
    },
  };
}

export default IndexPage;
