
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PAGE_SIZE } from "tools/consts";
import { Matiere } from 'components/gestionProduction/types';

export const crudMatiere = createApi({
  reducerPath: "crud-matiere",
  baseQuery: fetchBaseQuery({
    baseUrl:"http://localhost:1000/api/v1",
    prepareHeaders(headers) {
      return headers;
    },
  }),
  tagTypes: ["Matiere", "UNAUTHORIZED", "UNKNOWN_ERROR"],
  endpoints(builder) {
    return {
         /*****************************************************************************/
      /**********************Matiere*******************************************************/
      /*****************************************************************************/
      fetchMatieres: builder.query<Matiere[], number | void>({
        query: () => `/matieresPremiere`,
     }),
      paginationMatieres: builder.query<Matiere[], number | void>({
        query: (page) => `/matieresPremiere?page=${page}&size=${PAGE_SIZE}`,
      }),
      fetchOneMatiere: builder.query<Matiere, String>({
        query: (id) => `/matieresPremiere/${id}`,
      }),
      addMatiere: builder.mutation<Matiere, Partial<Matiere>>({
        query: (body) => ({
          url: "/matieresPremiere",
          method: "POST",
          body,
        }),
     }),
      editMatiere: builder.mutation<
        Matiere,
        Partial<Matiere> & Pick<Matiere, "id">
      >({
        query: (body) => ({
          url: `/matieresPremiere/${body.id}`,
          method: "PUT",
          body,
        }),
      }),
      deleteMatiere: builder.mutation<
        { success: boolean; id: String },
        number
      >({
        //@ts-ignore
        query(id: String) {
          //  if (confirm(`do you want delete Commande number ${id.id} ?`))
          return {
            //@ts-ignore
            url: `/matieresPremiere/${id.id}`,
            method: "DELETE",
          };
          // else return
        },
       }),
      archiveMatiere: builder.mutation<
        Matiere,
        Partial<Matiere> & Pick<Matiere, "id">
      >({
        query: (id) => ({
          url: `/matieresPremiere/${id}/archive`,
          method: "PUT",
        }),
      }),
      restoreMatiere: builder.mutation<
        Matiere,
        Partial<Matiere> & Pick<Matiere, "id">
      >({
        query: (id) => ({
          url: `/matieresPremiere/${id}/restore`,
          method: "PUT",
        }),
      }),
    };
  },
});

export const {
  /*****************Matiere**************************************/
  /*******************************************************/
  useFetchMatieresQuery,
  usePaginationMatieresQuery,
  useFetchOneMatiereQuery,
  useAddMatiereMutation,
  useEditMatiereMutation,
  useDeleteMatiereMutation,
  useArchiveMatiereMutation,
  useRestoreMatiereMutation,
} = crudMatiere;

import { MatiereJson } from 'components/gestionProduction/types';
export type OpenMatiereProp={
  data:MatiereJson
  refetch:()=>void
  save:()=>void
  edit:()=>void
}

export const openMatieres =():OpenMatiereProp =>{
    const { data = [], refetch } = useFetchMatieresQuery();
    const [save]=useAddMatiereMutation();
    const [edit]=useEditMatiereMutation();
    //@ts-ignore
    const out:OpenMatiereProp={data,refetch,save,edit}
    return out;
  }

  export const openPaginationMatieres =(page: number):OpenMatiereProp =>{
    const { data = [], refetch } = usePaginationMatieresQuery(page);
    const [save]=useAddMatiereMutation();
    const [edit]=useEditMatiereMutation();
    //@ts-ignore
    const out:OpenMatiereProp={data,refetch,save,edit}
    return out;
  }