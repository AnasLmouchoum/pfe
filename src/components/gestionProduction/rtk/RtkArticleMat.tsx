
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PAGE_SIZE } from "tools/consts";
import { ArticleMatiere, ArticleMatiereJson } from 'components/gestionProduction/types';

export const crudArticleMatiere = createApi({
  reducerPath: "crud-articleMatiere",
  baseQuery: fetchBaseQuery({
    baseUrl:"http://localhost:1000/api/v1",
    prepareHeaders(headers) {
      return headers;
    },
  }),
  tagTypes: ["ArticleMatiere", "UNAUTHORIZED", "UNKNOWN_ERROR"],
  endpoints(builder) {
    return {
         /*****************************************************************************/
      /**********************Article*******************************************************/
      /*****************************************************************************/
      fetchArticleMatieres: builder.query<ArticleMatiere[], number | void>({
        query: () => `/article/matieres`,
     }),
      paginationArticleMatieres: builder.query<ArticleMatiere[], number | void>({
        query: (page) => `/article/matieres?page=${page}&size=${PAGE_SIZE}`,
      }),
      fetchOneArticleMatiere: builder.query<ArticleMatiere, String>({
        query: (id) => `/article/matieres/${id}`,
      }),
      addArticleMatiere: builder.mutation<ArticleMatiere, Partial<ArticleMatiere>>({
        query: (body) => ({
          url: "/article/matieres",
          method: "POST",
          body,
        }),
     }),
      editArticleMatiere: builder.mutation<
      ArticleMatiere,
        Partial<ArticleMatiere> & Pick<ArticleMatiere, "id">
      >({
        query: (body) => ({
          url: `/articles/matieres/${body.id}`,
          method: "PUT",
          body,
        }),
      }),
      deleteArticleMatiere: builder.mutation<
        { success: boolean; id: String },
        number
      >({
        //@ts-ignore
        query(id: String) {
          //  if (confirm(`do you want delete Commande number ${id.id} ?`))
          return {
            //@ts-ignore
            url: `/articles/matieres/${id.id}`,
            method: "DELETE",
          };
          // else return
        },
       }),
      archiveArticleMatiere: builder.mutation<
      ArticleMatiere,
        Partial<ArticleMatiere> & Pick<ArticleMatiere, "id">
      >({
        query: (id) => ({
          url: `/articles/matieres/${id}/archive`,
          method: "PUT",
        }),
      }),
      restoreArticleMatiere: builder.mutation<
      ArticleMatiere,
        Partial<ArticleMatiere> & Pick<ArticleMatiere, "id">
      >({
        query: (id) => ({
          url: `/articles/matieres/${id}/restore`,
          method: "PUT",
        }),
      }),
    };
  },
});

export const {
  /*****************Article**************************************/
  /*******************************************************/
  useFetchArticleMatieresQuery,
  usePaginationArticleMatieresQuery,
  useFetchOneArticleMatiereQuery,
  useAddArticleMatiereMutation,
  useEditArticleMatiereMutation,
  useDeleteArticleMatiereMutation,
  useArchiveArticleMatiereMutation,
  useRestoreArticleMatiereMutation,
} = crudArticleMatiere;

export type OpenArticleMatiereProp={
  data:ArticleMatiereJson
  refetch:()=>void
  save:()=>void
  edit:()=>void
}

export const openArticleMatieres =(page: number):OpenArticleMatiereProp =>{
    const { data = [], refetch } = usePaginationArticleMatieresQuery(page);
    const [save]=useAddArticleMatiereMutation();
    const [edit]=useEditArticleMatiereMutation();
    //@ts-ignore
    const out:OpenArticleMatiereProp={data,refetch,save,edit}
    return out;
  }