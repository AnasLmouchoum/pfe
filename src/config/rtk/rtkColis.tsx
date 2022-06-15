import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PAGE_SIZE } from "tools/consts";
import {  Colis, ColisJson } from "tools/types";

export const crudColis = createApi({
    reducerPath: "crud-colis",
    baseQuery: fetchBaseQuery({
      baseUrl:"http://localhost:1000/api/v1",
      prepareHeaders(headers) {
        return headers;
      },
    }),
    tagTypes: ["Colis", "UNAUTHORIZED", "UNKNOWN_ERROR"],
    endpoints(builder) {
      return {
        fetchColis: builder.query<Colis[], number | void>({
          query: () => `/colis`,
       }),
        paginationColis: builder.query<Colis[], number | void>({
          query: (page) => `/colis?page=${page}&size=${PAGE_SIZE}`,
        }),
        fetchColisByIdClient: builder.query<Colis, String>({
          query: (id) => `/colis/byidClient/${id}`,
        }),
        addColis: builder.mutation<Colis, Partial<Colis>>({
          query: (body) => ({
            url: "/colis",
            method: "POST",
            body,
          }),
       }),
        editColis: builder.mutation<
          Colis,
          Partial<Colis> & Pick<Colis, "id">
        >({
          query: (body) => ({
            url: `/colis/${body.id}`,
            method: "PUT",
            body,
          }),
        }),
        deleteColis: builder.mutation<
          { success: boolean; id: String },
          number
        >({
          //@ts-ignore
          query(id: String) {
            //  if (confirm(`do you want delete Commande number ${id.id} ?`))
            return {
              //@ts-ignore
              url: `/colis/${id.id}`,
              method: "DELETE",
            };
            // else return
          },
         }),
        archiveColis: builder.mutation<
          Colis,
          Partial<Colis> & Pick<Colis, "id">
        >({
          query: (id) => ({
            url: `/colis/${id}/archive`,
            method: "PUT",
          }),
        }),
        restoreColis: builder.mutation<
          Colis,
          Partial<Colis> & Pick<Colis, "id">
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
    /******Colis*************/
    /*******************/
    useFetchColisQuery,
    usePaginationColisQuery,
    useFetchColisByIdClientQuery,
    useAddColisMutation,
    useEditColisMutation,
    useDeleteColisMutation,
    useArchiveColisMutation,
    useRestoreColisMutation,
  } = crudColis;

  export type OpenColisProp={
    data:ColisJson
    refetch:()=>void
    save:()=>void
    edit:()=>void
  }

  export const openColis =(idClient:String):OpenColisProp =>{
    const { data = [], refetch } = useFetchColisByIdClientQuery(idClient);
    const [save]=useAddColisMutation();
    const [edit]=useEditColisMutation();
    //@ts-ignore
    const out:OpenColisProp={data,refetch,save,edit}
    return out;
  }

  export const openAllColis =():OpenColisProp =>{
    const { data = [], refetch } = useFetchColisQuery();
    const [save]=useAddColisMutation();
    const [edit]=useEditColisMutation();
    //@ts-ignore
    const out:OpenColisProp={data,refetch,save,edit}
    return out;
  }



