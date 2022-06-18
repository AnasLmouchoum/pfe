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
  
  return (
    <Col>
      <Head title={t("GESTION COMMERCIALE")} />
      <View as="main">
        <div className="absolute top-48">
          <h1></h1>
        </div>
        <img className="float w-full h-96" src="/images/homeImg.jpg" alt="" />
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
