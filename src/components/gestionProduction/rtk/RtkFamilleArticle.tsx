
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PAGE_SIZE } from "tools/consts";
import { FamilleArticle, FamilleArticleJson } from 'components/gestionProduction/types';

export const crudFamilleArticle = createApi({
  reducerPath: "crud-familleArticle",
  baseQuery: fetchBaseQuery({
    baseUrl:"http://localhost:1000/api/v1",
    prepareHeaders(headers) {
      return headers;
    },
  }),
  tagTypes: ["article", "UNAUTHORIZED", "UNKNOWN_ERROR"],
  endpoints(builder) {
    return {
         /*****************************************************************************/
      /**********************FamilleArticle*******************************************************/
      /*****************************************************************************/
      fetchFamilleArticles: builder.query<FamilleArticle[], number | void>({
        query: () => `/articles`,
     }),
      paginationFamilleArticles: builder.query<FamilleArticle[], number | void>({
        query: (page) => `/articles?page=${page}&size=${PAGE_SIZE}`,
      }),
      fetchOneFamilleArticle: builder.query<FamilleArticle, String>({
        query: (id) => `/articles/${id}`,
      }),
      addFamilleArticle: builder.mutation<FamilleArticle, Partial<FamilleArticle>>({
        query: (body) => ({
          url: "/articles",
          method: "POST",
          body,
        }),
     }),
      editFamilleArticle: builder.mutation<
      FamilleArticle,
        Partial<FamilleArticle> & Pick<FamilleArticle, "id">
      >({
        query: (body) => ({
          url: `/articles/${body.id}`,
          method: "PUT",
          body,
        }),
      }),
      deleteFamilleArticle: builder.mutation<
        { success: boolean; id: String },
        number
      >({
        //@ts-ignore
        query(id: String) {
          //  if (confirm(`do you want delete Commande number ${id.id} ?`))
          return {
            //@ts-ignore
            url: `/articles/${id.id}`,
            method: "DELETE",
          };
          // else return
        },
       }),
      archiveFamilleArticle: builder.mutation<
      FamilleArticle,
        Partial<FamilleArticle> & Pick<FamilleArticle, "id">
      >({
        query: (id) => ({
          url: `/articles/${id}/archive`,
          method: "PUT",
        }),
      }),
      restoreFamilleArticle: builder.mutation<
      FamilleArticle,
        Partial<FamilleArticle> & Pick<FamilleArticle, "id">
      >({
        query: (id) => ({
          url: `/articles/${id}/restore`,
          method: "PUT",
        }),
      }),
    };
  },
});

export const {
  /*****************Article**************************************/
  /*******************************************************/
  useFetchFamilleArticlesQuery,
  usePaginationFamilleArticlesQuery,
  useFetchOneFamilleArticleQuery,
  useAddFamilleArticleMutation,
  useEditFamilleArticleMutation,
  useDeleteFamilleArticleMutation,
  useArchiveFamilleArticleMutation,
  useRestoreFamilleArticleMutation,
} = crudFamilleArticle;

export type OpenFamilleArticleProp={
  data:FamilleArticleJson
  refetch:()=>void
  save:()=>void
  edit:()=>void
}

export const openFamilleArticles =():OpenFamilleArticleProp =>{
    const { data = [], refetch } = useFetchFamilleArticlesQuery();
    const [save]=useAddFamilleArticleMutation();
    const [edit]=useEditFamilleArticleMutation();
    //@ts-ignore
    const out:OpenFamilleArticleProp={data,refetch,save,edit}
    return out;
}

export const openPaginFamilleArticles =(page: number):OpenFamilleArticleProp =>{
  const { data = [], refetch } = usePaginationFamilleArticlesQuery(page);
  const [save]=useAddFamilleArticleMutation();
  const [edit]=useEditFamilleArticleMutation();
  //@ts-ignore
  const out:OpenFamilleArticleProp={data,refetch,save,edit}
  return out;
}