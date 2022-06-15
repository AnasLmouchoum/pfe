import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PAGE_SIZE } from "tools/consts";
import { Palette,PaletteJson, OpenPaletteProp } from "tools/types";

export const crudPalette = createApi({
    reducerPath: "crud-palette",
    baseQuery: fetchBaseQuery({
      baseUrl:"http://localhost:1000/api/v1",
      prepareHeaders(headers) {
        return headers;
      },
    }),
    tagTypes: ["Palette", "UNAUTHORIZED", "UNKNOWN_ERROR"],
    endpoints(builder) {
      return {
        fetchPaletteByIdClient: builder.query<Palette[], number | void>({
          query: (idClient) => `/palette/client/${idClient}`,
       }),
      fetchPalette: builder.query<Palette[], number | void>({
        query: () => `/palette`,
     }),
        fetchNumPalette: builder.query<number[], String | void>({
        query: (idN) => `/palette/numPalette/${idN}`,
     }),
        paginationPalette: builder.query<Palette[], number | void>({
          query: (page) => `/palette?page=${page}&size=${PAGE_SIZE}`,
        }),
        fetchOnePalette: builder.query<Palette, String>({
          query: (id) => `/palette/${id}`,
        }),
        addPalette: builder.mutation<Palette, Partial<Palette>>({
          query: (body) => ({
            url: "/palette",
            method: "POST",
            body,
          }),
       }),
        editPalette: builder.mutation<
          Palette,
          Partial<Palette> & Pick<Palette, "id">
        >({
          query: (body) => ({
            url: `/palette/${body.id}`,
            method: "PUT",
            body,
          }),
        }),
        deletePalette: builder.mutation<
          { success: boolean; id: String },
          number
        >({
          //@ts-ignore
          query(id: String) {
            //  if (confirm(`do you want delete Commande number ${id.id} ?`))
            return {
              //@ts-ignore
              url: `/palette/${id.id}`,
              method: "DELETE",
            };
            // else return
          },
         }),
        archivePalette: builder.mutation<
          Palette,
          Partial<Palette> & Pick<Palette, "id">
        >({
          query: (id) => ({
            url: `/palette/${id}/archive`,
            method: "PUT",
          }),
        }),
        restorePalette: builder.mutation<
          Palette,
          Partial<Palette> & Pick<Palette, "id">
        >({
          query: (id) => ({
            url: `/palette/${id}/restore`,
            method: "PUT",
          }),
        }),
      };
    },
  });

  export const {
    /******Palette*************/
    /*******************/
    useFetchPaletteQuery,
    useFetchNumPaletteQuery,
    usePaginationPaletteQuery,
    useFetchOnePaletteQuery,
    useAddPaletteMutation,
    useEditPaletteMutation,
    useDeletePaletteMutation,
    useArchivePaletteMutation,
    useRestorePaletteMutation,
    useFetchPaletteByIdClientQuery,
  } = crudPalette;



  export const openPalette =(idClient:String):OpenPaletteProp =>{
    const { data = [], refetch } = useFetchPaletteByIdClientQuery(idClient);
    const [save]=useAddPaletteMutation();
    const [edit]=useEditPaletteMutation();
    //@ts-ignore
    const out:OpenPaletteProp={data,refetch,save,edit}
    return out;
  }

  export const openAllPalette =():OpenPaletteProp =>{
    const { data = [], refetch } = useFetchPaletteQuery();
    const [save]=useAddPaletteMutation();
    const [edit]=useEditPaletteMutation();
    //@ts-ignore
    const out:OpenPaletteProp={data,refetch,save,edit}
    return out;
  }

  // export const openNumPalette =(idClient:String):OpenPaletteProp =>{
    
  //   const { data = [], refetch } = useFetchNumPaletteQuery(idClient);
  //   console.log(idClient)
  //   const [save]=useAddPaletteMutation();
  //   const [edit]=useEditPaletteMutation();
  //   //@ts-ignore
  //   const out:OpenPaletteProp={data,refetch,save,edit}
  //   return out;
  // }