import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PAGE_SIZE } from "tools/consts";
import { ArticleCommande, ArticleCommandeJson } from 'components/gestionProduction/types';

export const crudArticleCommande = createApi({
  reducerPath: "crud-Articlecommande",
  baseQuery: fetchBaseQuery({
    baseUrl:"http://localhost:1000/api/v1",
    prepareHeaders(headers) {
      return headers;
    },
  }),
  tagTypes: ["ArticleCommande", "UNAUTHORIZED", "UNKNOWN_ERROR"],
  endpoints(builder) {
    return {
         /*****************************************************************************/
      /**********************Article*******************************************************/
      /*****************************************************************************/
      fetchArticleCommandes: builder.query<ArticleCommande[], number | void>({
        query: () => `/articlecommandes`,
     }),
      paginationArticleCommandes: builder.query<ArticleCommande[], number | void>({
        query: (page) => `/articlecommandes?page=${page}&size=${PAGE_SIZE}`,
      }),
      fetchOneArticleCommande: builder.query<ArticleCommande, String>({
        query: (id) => `/articlecommandes/${id}`,
      }),
      addArticleCommande: builder.mutation<ArticleCommande, Partial<ArticleCommande>>({
        query: (body) => ({
          url: "/articlecommandes",
          method: "POST",
          body,
        }),
     }),
      editArticleCommande: builder.mutation<
      ArticleCommande,
        Partial<ArticleCommande> & Pick<ArticleCommande, "id">
      >({
        query: (body) => ({
          url: `/articlecommandes/${body.id}`,
          method: "PUT",
          body,
        }),
      }),
      deleteArticleCommande: builder.mutation<
        { success: boolean; id: String },
        number
      >({
        //@ts-ignore
        query(id: String) {
          //  if (confirm(`do you want delete Commande number ${id.id} ?`))
          return {
            //@ts-ignore
            url: `/articlecommandes/${id.id}`,
            method: "DELETE",
          };
          // else return
        },
       }),
      archiveArticleCommande: builder.mutation<
      ArticleCommande,
        Partial<ArticleCommande> & Pick<ArticleCommande, "id">
      >({
        query: (id) => ({
          url: `/articlecommandes/${id}/archive`,
          method: "PUT",
        }),
      }),
      restoreArticleCommande: builder.mutation<
      ArticleCommande,
        Partial<ArticleCommande> & Pick<ArticleCommande, "id">
      >({
        query: (id) => ({
          url: `/articlecommandes/${id}/restore`,
          method: "PUT",
        }),
      }),
    };
  },
});

export const {
  /*****************Article**************************************/
  /*******************************************************/
  useFetchArticleCommandesQuery,
  usePaginationArticleCommandesQuery,
  useFetchOneArticleCommandeQuery,
  useAddArticleCommandeMutation,
  useEditArticleCommandeMutation,
  useDeleteArticleCommandeMutation,
  useArchiveArticleCommandeMutation,
  useRestoreArticleCommandeMutation,
} = crudArticleCommande;

export type OpenArticleCommandeProp={
  data:ArticleCommandeJson
  refetch:()=>void
  save:()=>void
  edit:()=>void
}

export const openArticleCommandes =():OpenArticleCommandeProp =>{
    const { data = [], refetch } = useFetchArticleCommandesQuery();
    const [save]=useAddArticleCommandeMutation();
    const [edit]=useEditArticleCommandeMutation();
    //@ts-ignore
    const out:OpenArticleCommandeProp={data,refetch,save,edit}
    return out;
}