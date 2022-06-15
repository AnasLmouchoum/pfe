
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PAGE_SIZE } from "tools/consts";
import { Article, ArticleJson } from 'components/gestionProduction/types';

export const crudArticle = createApi({
  reducerPath: "crud-Article",
  baseQuery: fetchBaseQuery({
    baseUrl:"http://localhost:1000/api/v1",
    prepareHeaders(headers) {
      return headers;
    },
  }),
  tagTypes: ["Article", "UNAUTHORIZED", "UNKNOWN_ERROR"],
  endpoints(builder) {
    return {
         /*****************************************************************************/
      /**********************Article*******************************************************/
      /*****************************************************************************/
      fetchArticles: builder.query<Article[], number | void>({
        query: () => `/articlees`,
     }),
      paginationArticles: builder.query<Article[], number | void>({
        query: (page) => `/articlees?page=${page}&size=${PAGE_SIZE}`,
      }),
      fetchOneArticle: builder.query<Article, String>({
        query: (id) => `/articlees/${id}`,
      }),
      addArticle: builder.mutation<Article, Partial<Article>>({
        query: (body) => ({
          url: "/articlees",
          method: "POST",
          body,
        }),
     }),
      editArticle: builder.mutation<
        Article,
        Partial<Article> & Pick<Article, "id">
      >({
        query: (body) => ({
          url: `/articlees/${body.id}`,
          method: "PUT",
          body,
        }),
      }),
      deleteArticle: builder.mutation<
        { success: boolean; id: String },
        number
      >({
        //@ts-ignore
        query(id: String) {
          //  if (confirm(`do you want delete Commande number ${id.id} ?`))
          return {
            //@ts-ignore
            url: `/articlees/${id.id}`,
            method: "DELETE",
          };
          // else return
        },
       }),
      archiveArticle: builder.mutation<
        Article,
        Partial<Article> & Pick<Article, "id">
      >({
        query: (id) => ({
          url: `/articlees/${id}/archive`,
          method: "PUT",
        }),
      }),
      restoreArticle: builder.mutation<
        Article,
        Partial<Article> & Pick<Article, "id">
      >({
        query: (id) => ({
          url: `/articlees/${id}/restore`,
          method: "PUT",
        }),
      }),
    };
  },
});

export const {
  /*****************Article**************************************/
  /*******************************************************/
  useFetchArticlesQuery,
  usePaginationArticlesQuery,
  useFetchOneArticleQuery,
  useAddArticleMutation,
  useEditArticleMutation,
  useDeleteArticleMutation,
  useArchiveArticleMutation,
  useRestoreArticleMutation,
} = crudArticle;

export type OpenArticleProp={
  data:ArticleJson
  refetch:()=>void
  save:()=>void
  edit:()=>void
}

export const openPaginationArticles =(page: number):OpenArticleProp =>{
    const { data = [], refetch } = usePaginationArticlesQuery(page);
    const [save]=useAddArticleMutation();
    const [edit]=useEditArticleMutation();
    //@ts-ignore
    const out:OpenArticleProp={data,refetch,save,edit}
    return out;
}

export const openArticles =():OpenArticleProp =>{
  const { data = [], refetch } = useFetchArticlesQuery();
  //@ts-ignore
  const out:OpenArticleProp={data, refetch}
  return out;
}

export const openOneArticle =(idArticle: string):OpenArticleProp =>{
  const { data = [], refetch } = useFetchOneArticleQuery(idArticle);
  //@ts-ignore
  const out:OpenArticleProp={data, refetch}
  return out;
}