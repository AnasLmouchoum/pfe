
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CalculProduct, CalculProductJson } from 'components/gestionProduction/types';

export const crudCalculProduct = createApi({
  reducerPath: "crud-calcul",
  baseQuery: fetchBaseQuery({
    baseUrl:"http://localhost:1000/api/v1",
    prepareHeaders(headers) {
      return headers;
    },
  }),
  tagTypes: ["CalculProduct", "UNAUTHORIZED", "UNKNOWN_ERROR"],
  endpoints(builder) {
    return {
      /*****************************************************************************/
      /**********************CalculProduct******************************************/
      /*****************************************************************************/
      fetchCalculProducts: builder.query<CalculProduct[], number | void>({
        query: () => `/calculProducts`,
     }),
      fetchOneCalculProduct: builder.query<CalculProduct, String>({
        query: (id) => `/calculProducts/${id}`,
      }),
    };
  },
});

export const {
  /*****************CalculProduct**************************************/
  /*******************************************************/
  useFetchCalculProductsQuery,
  useFetchOneCalculProductQuery,
} = crudCalculProduct;

export type OpenCalculProductProp={
  data:CalculProduct[]
  refetch:()=>void
}

export const openCalculProducts =():OpenCalculProductProp =>{
  const { data = [], refetch } = useFetchCalculProductsQuery();
  //@ts-ignore
  const out:OpenCalculProductProp={data, refetch}
  return out;
}