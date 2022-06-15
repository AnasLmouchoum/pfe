
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PAGE_SIZE } from "tools/consts";
import { Fournisseur, FournisseurJson } from 'components/gestionProduction/types';

export const crudFournisseur = createApi({
  reducerPath: "crud-Fournisseur",
  baseQuery: fetchBaseQuery({
    baseUrl:"http://localhost:1000/api/v1",
    prepareHeaders(headers) {
      return headers;
    },
  }),
  tagTypes: ["Fournisseur", "UNAUTHORIZED", "UNKNOWN_ERROR"],
  endpoints(builder) {
    return {
      /*****************************************************************************/
      /**********************FOURNISSEUR*******************************************************/
      /*****************************************************************************/
      fetchFournisseurs: builder.query<Fournisseur[], number | void>({
        query: () => `/fournisseurs`,
     }),
      paginationFournisseurs: builder.query<Fournisseur[], number | void>({
        query: (page) => `/fournisseurs?page=${page}&size=${PAGE_SIZE}`,
      }),
      fetchOneFournisseur: builder.query<Fournisseur, String>({
        query: (id) => `/fournisseurs/${id}`,
      }),
      addFournisseur: builder.mutation<Fournisseur, Partial<Fournisseur>>({
        query: (body) => ({
          url: "/fournisseurs",
          method: "POST",
          body,
        }),
     }),
      editFournisseur: builder.mutation<
      Fournisseur,
        Partial<Fournisseur> & Pick<Fournisseur, "id">
      >({
        query: (body) => ({
          url: `/fournisseurs/${body.id}`,
          method: "PUT",
          body,
        }),
      }),
      deleteFournisseur: builder.mutation<
        { success: boolean; id: String },
        number
      >({
        //@ts-ignore
        query(id: String) {
          //  if (confirm(`do you want delete Commande number ${id.id} ?`))
          return {
            //@ts-ignore
            url: `/fournisseurs/${id.id}`,
            method: "DELETE",
          };
          // else return
        },
       }),
      archiveFournisseur: builder.mutation<
      Fournisseur,
        Partial<Fournisseur> & Pick<Fournisseur, "id">
      >({
        query: (id) => ({
          url: `/fournisseurs/${id}/archive`,
          method: "PUT",
        }),
      }),
      restoreFournisseur: builder.mutation<
      Fournisseur,
        Partial<Fournisseur> & Pick<Fournisseur, "id">
      >({
        query: (id) => ({
          url: `/fournisseurs/${id}/restore`,
          method: "PUT",
        }),
      }),
    };
  },
});

export const {
  /*****************FOURNISSEUR**************************************/
  /*******************************************************/
  useFetchFournisseursQuery,
  usePaginationFournisseursQuery,
  useFetchOneFournisseurQuery,
  useAddFournisseurMutation,
  useEditFournisseurMutation,
  useDeleteFournisseurMutation,
  useArchiveFournisseurMutation,
  useRestoreFournisseurMutation,
} = crudFournisseur;

export type OpenFournisseurProp={
  data:FournisseurJson
  refetch:()=>void
  save:()=>void
  edit:()=>void
}

export const openFournisseurs =():OpenFournisseurProp =>{
    const { data = [], refetch } = useFetchFournisseursQuery();
    const [save]=useAddFournisseurMutation();
    const [edit]=useEditFournisseurMutation();
    //@ts-ignore
    const out:OpenFournisseurProp={data,refetch,save,edit}
    return out;
}

export const openPaginationFournisseurs =(page: number):OpenFournisseurProp =>{
  const { data = [], refetch } = usePaginationFournisseursQuery(page);
  const [save]=useAddFournisseurMutation();
  const [edit]=useEditFournisseurMutation();
  //@ts-ignore
  const out:OpenFournisseurProp={data,refetch,save,edit}
  return out;
}