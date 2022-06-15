import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PAGE_SIZE } from "tools/consts";
import { Commande, CommandeJson } from 'components/gestionProduction/types';

export const crudCommande = createApi({
  reducerPath: "crud-Commande",
  baseQuery: fetchBaseQuery({
    baseUrl:"http://localhost:1000/api/v1",
    prepareHeaders(headers) {
      return headers;
    },
  }),
  tagTypes: ["Commande", "UNAUTHORIZED", "UNKNOWN_ERROR"],
  endpoints(builder) {
    return {
         /*****************************************************************************/
      /**********************COMMANDE*******************************************************/
      /*****************************************************************************/
      fetchCommandes: builder.query<Commande[], number | void>({
        query: () => `/commandes`,
     }),
      paginationCommandes: builder.query<Commande[], number | void>({
        query: (page) => `/commandes?page=${page}&size=${PAGE_SIZE}`,
      }),
      fetchOneCommande: builder.query<Commande, String>({
        query: (id) => `/commandes/${id}`,
      }),
      fetchcommandesByIdClient: builder.query<Commande[], string>({
        query: (idClient) => `/commandes/idclient/${idClient}`,
      }),
      addCommande: builder.mutation<Commande, Partial<Commande>>({
        query: (body) => ({
          url: "/commandes",
          method: "POST",
          body,
        }),
     }),
      editCommande: builder.mutation<
      Commande,
        Partial<Commande> & Pick<Commande, "id">
      >({
        query: (body) => ({
          url: `/commandes/${body.id}`,
          method: "PUT",
          body,
        }),
      }),
      deleteCommande: builder.mutation<
        { success: boolean; id: String },
        number
      >({
        //@ts-ignore
        query(id: String) {
          //  if (confirm(`do you want delete Commande number ${id.id} ?`))
          return {
            //@ts-ignore
            url: `/commandes/${id.id}`,
            method: "DELETE",
          };
          // else return
        },
       }),
      archiveCommande: builder.mutation<
      Commande,
        Partial<Commande> & Pick<Commande, "id">
      >({
        query: (id) => ({
          url: `/commandes/${id}/archive`,
          method: "PUT",
        }),
      }),
      restoreCommande: builder.mutation<
      Commande,
        Partial<Commande> & Pick<Commande, "id">
      >({
        query: (id) => ({
          url: `/commandes/${id}/restore`,
          method: "PUT",
        }),
      }),
    };
  },
});

export const {
  /*****************COMMANDE**************************************/
  /*******************************************************/
  useFetchCommandesQuery,
  usePaginationCommandesQuery,
  useFetchOneCommandeQuery,
  useFetchcommandesByIdClientQuery,
  useAddCommandeMutation,
  useEditCommandeMutation,
  useDeleteCommandeMutation,
  useArchiveCommandeMutation,
  useRestoreCommandeMutation,
} = crudCommande;

export type OpenCommandeProp={
  data:CommandeJson
  refetch:()=>void
  save:()=>void
  edit:()=>void
}

export const openCommandes = ():OpenCommandeProp =>{
    const { data = [], refetch } = useFetchCommandesQuery();
    const [save]=useAddCommandeMutation();
    const [edit]=useEditCommandeMutation();
    //@ts-ignore
    const out:OpenCommandeProp={data,refetch,save,edit}
    return out;
}

export const openCommandesByIdClient = (idClient: string):OpenCommandeProp =>{
  const { data = [], refetch } = useFetchcommandesByIdClientQuery(idClient);
  //@ts-ignore
  const out:OpenCommandeProp={data,refetch}
  return out;
}