import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PAGE_SIZE } from "tools/consts";
import {  Colisage, ColisageJson } from "tools/types";

export const crudColisage = createApi({
    reducerPath: "crud-colisage",
    baseQuery: fetchBaseQuery({
      baseUrl:"http://localhost:1000/api/v1",
      prepareHeaders(headers) {
        return headers;
      },
    }),
    tagTypes: ["Colisage", "UNAUTHORIZED", "UNKNOWN_ERROR"],
    endpoints(builder) {
      return {
        fetchColisage: builder.query<Colisage[], number | void>({
          query: () => `/colisage`,
       }),
        paginationColisage: builder.query<Colisage[], number | void>({
          query: (page) => `/colisage?page=${page}&size=${PAGE_SIZE}`,
        }),
        fetchOneColisage: builder.query<Colisage, String>({
          query: (id) => `/articlees/${id}`,
        }),
        addColisage: builder.mutation<Colisage, Partial<Colisage>>({
          query: (body) => ({
            url: "/colisage",
            method: "POST",
            body,
          }),
       }),
        editColisage: builder.mutation<
          Colisage,
          Partial<Colisage> & Pick<Colisage, "id">
        >({
          query: (body) => ({
            url: `/articlees/${body.id}`,
            method: "PUT",
            body,
          }),
        }),
        deleteColisage: builder.mutation<
          { success: boolean; id: String },
          number
        >({
          //@ts-ignore
          query(id: String) {
            //  if (confirm(`do you want delete Commande number ${id.id} ?`))
            return {
              //@ts-ignore
              url: `/colisage/${id.id}`,
              method: "DELETE",
            };
            // else return
          },
         }),
        archiveColisage: builder.mutation<
          Colisage,
          Partial<Colisage> & Pick<Colisage, "id">
        >({
          query: (id) => ({
            url: `/articlees/${id}/archive`,
            method: "PUT",
          }),
        }),
        restoreColisage: builder.mutation<
          Colisage,
          Partial<Colisage> & Pick<Colisage, "id">
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
    useFetchColisageQuery,
    usePaginationColisageQuery,
    useFetchOneColisageQuery,
    useAddColisageMutation,
    useEditColisageMutation,
    useDeleteColisageMutation,
    useArchiveColisageMutation,
    useRestoreColisageMutation,
  } = crudColisage;

  export type OpenColisageProp={
    data:ColisageJson
    refetch:()=>void
    save:()=>void
    edit:()=>void
  }
  

  export const openColisage =(page: number):OpenColisageProp =>{
    const { data = [], refetch } = usePaginationColisageQuery(page);
    const [save]=useAddColisageMutation();
    const [edit]=useEditColisageMutation();
    //@ts-ignore
    const out:OpenColisageProp={data,refetch,save,edit}
    return out;
  }