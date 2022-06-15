import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PAGE_SIZE } from "tools/consts";
import { Client, ClientJson } from 'components/gestionProduction/types';

export const crudClient = createApi({
  reducerPath: "crud-client",
  baseQuery: fetchBaseQuery({
    baseUrl:"http://localhost:1000/api/v1",
    prepareHeaders(headers) {
      return headers;
    },
  }),
  tagTypes: ["Client", "UNAUTHORIZED", "UNKNOWN_ERROR"],
  endpoints(builder) {
    return {
         /*****************************************************************************/
      /**********************Article*******************************************************/
      /*****************************************************************************/
      fetchClients: builder.query<Client[], number | void>({
        query: () => `/clients`,
     }),
      paginationClients: builder.query<Client[], number | void>({
        query: (page) => `/clients?page=${page}&size=${PAGE_SIZE}`,
      }),
      fetchOneClient: builder.query<Client, String>({
        query: (id) => `/clients/${id}`,
      }),
      addClient: builder.mutation<Client, Partial<Client>>({
        query: (body) => ({
          url: "/clients",
          method: "POST",
          body,
        }),
     }),
      editClient: builder.mutation<
      Client,
        Partial<Client> & Pick<Client, "id">
      >({
        query: (body) => ({
          url: `/clients/${body.id}`,
          method: "PUT",
          body,
        }),
      }),
      deleteClient: builder.mutation<
        { success: boolean; id: String },
        number
      >({
        //@ts-ignore
        query(id: String) {
          //  if (confirm(`do you want delete Commande number ${id.id} ?`))
          return {
            //@ts-ignore
            url: `/clients/${id.id}`,
            method: "DELETE",
          };
          // else return
        },
       }),
      archiveClient: builder.mutation<
      Client,
        Partial<Client> & Pick<Client, "id">
      >({
        query: (id) => ({
          url: `/clients/${id}/archive`,
          method: "PUT",
        }),
      }),
      restoreClient: builder.mutation<
      Client,
        Partial<Client> & Pick<Client, "id">
      >({
        query: (id) => ({
          url: `/clients/${id}/restore`,
          method: "PUT",
        }),
      }),
    };
  },
});

export const {
  /*****************Article**************************************/
  /*******************************************************/
  useFetchClientsQuery,
  usePaginationClientsQuery,
  useFetchOneClientQuery,
  useAddClientMutation,
  useEditClientMutation,
  useDeleteClientMutation,
  useArchiveClientMutation,
  useRestoreClientMutation,
} = crudClient;

export type OpenClientProp={
  data:ClientJson
  refetch:()=>void
  save:()=>void
  edit:()=>void
}

export const openClients =():OpenClientProp =>{
    const { data = [], refetch } = useFetchClientsQuery();
    const [save]=useAddClientMutation();
    const [edit]=useEditClientMutation();
    //@ts-ignore
    const out:OpenClientProp={data,refetch,save,edit}
    return out;
}