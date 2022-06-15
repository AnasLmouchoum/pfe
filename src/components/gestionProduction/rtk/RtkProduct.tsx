
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PAGE_SIZE } from "tools/consts";
import { Product, ProductJson } from 'components/gestionProduction/types';

export const crudProduct = createApi({
  reducerPath: "crud-product",
  baseQuery: fetchBaseQuery({
    baseUrl:"http://localhost:1000/api/v1",
    prepareHeaders(headers) {
      return headers;
    },
  }),
  tagTypes: ["Product", "UNAUTHORIZED", "UNKNOWN_ERROR"],
  endpoints(builder) {
    return {
         /*****************************************************************************/
      /**********************Product*******************************************************/
      /*****************************************************************************/
      fetchProducts: builder.query<Product[], number | void>({
        query: () => `/products`,
     }),
     fetchNotDoneProducts: builder.query<Product[], number | void>({
      query: () => `/products/notDone`,
    }),
    paginationNotDoneProducts: builder.query<Product[], number | void>({
      query: (page) => `/products/notDone?page=${page}&size=${PAGE_SIZE}`,
      }),
      paginationProducts: builder.query<Product[], number | void>({
        query: (page) => `/products?page=${page}&size=${PAGE_SIZE}`,
      }),
      fetchOneProduct: builder.query<Product, String>({
        query: (id) => `/products/${id}`,
      }),
      fetchProductsByIdArticle: builder.query<Product, String>({
        query: (idArticle) => `/products/idarticle/${idArticle}`,
      }),
      addProduct: builder.mutation<Product, Partial<Product>>({
        query: (body) => ({
          url: "/products",
          method: "POST",
          body,
        }),
     }),
      editProduct: builder.mutation<
        Product,
        Partial<Product> & Pick<Product, "id">
      >({
        query: (body) => ({
          url: `/products/${body.id}`,
          method: "PUT",
          body,
        }),
      }),
      deleteProduct: builder.mutation<
        { success: boolean; id: String },
        number
      >({
        //@ts-ignore
        query(id: String) {
          //  if (confirm(`do you want delete Commande number ${id.id} ?`))
          return {
            //@ts-ignore
            url: `/products/${id.id}`,
            method: "DELETE",
          };
          // else return
        },
       }),
      archiveProduct: builder.mutation<
        Product,
        Partial<Product> & Pick<Product, "id">
      >({
        query: (id) => ({
          url: `/products/${id}/archive`,
          method: "PUT",
        }),
      }),
      restoreProduct: builder.mutation<
        Product,
        Partial<Product> & Pick<Product, "id">
      >({
        query: (id) => ({
          url: `/products/${id}/restore`,
          method: "PUT",
        }),
      }),
    };
  },
});

export const {
  /*****************PRODUCT**************************************/
  /*******************************************************/
  useFetchProductsQuery,
  usePaginationProductsQuery,
  useFetchOneProductQuery,
  useFetchProductsByIdArticleQuery,
  useAddProductMutation,
  useEditProductMutation,
  useDeleteProductMutation,
  useArchiveProductMutation,
  useRestoreProductMutation,
  useFetchNotDoneProductsQuery,
  usePaginationNotDoneProductsQuery,
} = crudProduct;

export type OpenProductProp={
  data:ProductJson
  refetch:()=>void
  save:()=>void
  edit:()=>void
}

export const openProducts =(page: number):OpenProductProp =>{
  const { data = [], refetch } = usePaginationProductsQuery(page);
  const [save]=useAddProductMutation();
  const [edit]=useEditProductMutation();
  //@ts-ignore
  const out:OpenProductProp={data,refetch,save,edit}
  return out;
}

export const openProductsByIdArticle =(idArticle: string):OpenProductProp =>{
  const { data = [], refetch } = useFetchProductsByIdArticleQuery(idArticle);
  //@ts-ignore
  const out:OpenProductProp={data, refetch}
  return out;
}

export const openAllProducts =():OpenProductProp =>{
  const { data = [], refetch } = useFetchProductsQuery();
  //@ts-ignore
  const out:OpenProductProp={data, refetch}
  return out;
}

export const openNotDone = ():OpenProductProp =>{
  const { data = [], refetch } = useFetchNotDoneProductsQuery();
  //@ts-ignore
  const out:OpenProductProp={data, refetch}
  return out;
}

export const openPaginationNotDone = (page: number):OpenProductProp =>{
  const { data = [], refetch } = usePaginationNotDoneProductsQuery(page);
  //@ts-ignore
  const out:OpenProductProp={data, refetch}
  return out;
}