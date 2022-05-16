import { RefreshIcon } from "@heroicons/react/solid";
import axios from "axios";
import {
  useFetchArticleCommandesByIdCommandeQuery,
  useFetchArticleCommandesQuery,
  usePaginationArticleCommandesQuery,
  useAddArticleCommandeMutation,
  useEditArticleCommandeMutation
} from "config/rtk";
import React, { useState } from "react";
import { arc0, Commande ,ArticleCommande} from "tools/types";
import { Field, Form } from "widgets";
import Bcyan from "widgets/Bcyan";
import Bedit from "widgets/Bedit";
import Mitems from "widgets/Mitems";
import Pagin from "widgets/Pagin";
import Table from "widgets/Table";
import FormArticleCommande from "./FormArticleCommande";
const style_add_line = "bg-[#dfdfdf] cursor-pointer";
type ArticlesCommandeProps={
  idCommande:string
}
const ArticlesCommande = ({idCommande}:ArticlesCommandeProps) => {
 /*  const [page, setPage] = useState(0);
  const loadPage = (p: number) => {
    setPage(p);
    refetch();
  }; */
  //@ts-ignore
  const { data = [], isFetching, refetch } = useFetchArticleCommandesByIdCommandeQuery(idCommande);
  const [selectedIdCommande,setSelectedIdCommande]=useState("new")
  const [formArt,setFormArt]=useState(false)
  const arc1:ArticleCommande=arc0 
  arc1.idCommande=idCommande
  const close=()=>{
    setFormArt(false)
    setSelectedIdCommande("new")
  }
  const open=(id:string)=>{
    setFormArt(true)
    setSelectedIdCommande(id)
  }
  const [save]=useAddArticleCommandeMutation();
  const [edit]=useEditArticleCommandeMutation();
  return (
    <div>
      <Table
        className="tab-list float-left w-full mt-8"
        thead={
          <tr>
            <Table.th>code</Table.th>
            <Table.th>commande</Table.th>
            <Table.th>designation</Table.th>
            <Table.th>quantité</Table.th>
            <Table.th>portion</Table.th>
            <Table.th>p.u</Table.th>
            <Table.th></Table.th>
          </tr>
        }
      >
        {
          //@ts-ignore
          data?.map((article) => (
         // articles?.map((article) => (
           <>
          <tr key={article.id}>
              <Table.td>{article.id}</Table.td>
              <Table.td>{article.idCommande} </Table.td>
              <Table.td>{article.design} </Table.td>
              <Table.td>{article.qte}</Table.td>
              <Table.td>{article.portion}</Table.td>
              <Table.td>{article.pu}</Table.td>
              <Table.td>
                <Bedit onClick={()=>{
                  open(article.id)
                }} />
              </Table.td>
            </tr>
            {selectedIdCommande==article.id && formArt && <FormArticleCommande articleCommande={article}  close={close} saveArticle={edit} refetch={refetch}/>}
          </>
          ))
        }
        {selectedIdCommande=="new" && formArt && <FormArticleCommande articleCommande={arc1}  close={close} saveArticle={save} refetch={refetch}/>}
        {
          !formArt && <tr
          onClick={() => {
            open("new")
          }}
        >
          <Table.td className={style_add_line}>ajouter une ligne</Table.td>
          <Table.td className={style_add_line}></Table.td>
          <Table.td className={style_add_line}></Table.td>
          <Table.td className={style_add_line}></Table.td>
          <Table.td className={style_add_line}></Table.td>
          <Table.td className={style_add_line}></Table.td>
          <Table.td className={style_add_line}></Table.td>
        </tr>
        }
      </Table>
    </div>
  );
};

export default ArticlesCommande;
