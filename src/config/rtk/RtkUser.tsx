import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserConfig } from "next-i18next";
import { PAGE_SIZE } from "tools/consts";
import {
  AdressLiv,
  Article,
  ArticleCommande,
  BureauDouane,
  Client,
  Commande,
  PayementMode,
  RawMaterial,
  RegimeDouanier,
  Declarant,
  Incoterm,
  UnitMeasure,
  Devise,
  Pays,
  Transporteur,
  Ville,
  Role,
  Type,
  Document,
  CommandeFournisseur,
  Fournisseur,
  LigneDeCommande,
  MatierePremiere,
  ClientJson,
  User,
  Users,
} from "tools/types";

export const crudUser = createApi({
  reducerPath: "crud-user",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:1000/api/v1",
    prepareHeaders(headers) {
      return headers;
    },
  }),
  tagTypes: ["User", "UNAUTHORIZED", "UNKNOWN_ERROR"],
  endpoints(builder) {
    return {
      /***************************/
      /************CLIENT*************/
      /***************************/
      fetchUsers: builder.query<Users, void>({
        query: () => `/users`,
      }),
      paginationUsers: builder.query<User[], number>({
        query: (page) => `/users?page=${page}&size=${PAGE_SIZE}`,
      }),
      fetchOneUsers: builder.query<User, string>({
        query: (id) => `/users/${id}`,
      }),
      fetchOneUsersByEmail: builder.query<User, string>({
        query: (email) => `/users/byEmail/${email}`,
      }),
      addUsers: builder.mutation<User, Partial<User>>({
        query: (body) => ({
          url: "/users",
          method: "POST",
          body,
        }),
      }),
      editUsers: builder.mutation<
        User,
        Partial<User> & Pick<User, "id">
      >({
        query: (body) => ({
          url: `/users/${body.id}`,
          method: "PUT",
          body,
        }),
      }),
      deleteUsers: builder.mutation<{ success: boolean; id: number }, number>({
        //@ts-ignore
        query(id: Num) {
          //  if (confirm(`do you want delete Client number ${id.id} ?`))
          return {
            url: `/users/${id.id}`,
            method: "DELETE",
          };
        },
      }),
      archiveUsers: builder.mutation<
        Client,
        Partial<Client> & Pick<Client, "id">
      >({
        query: (id) => ({
          url: `/users/${id}/archive`,
          method: "PUT",
        }),
      }),
      restoreUsers: builder.mutation<
        Client,
        Partial<Client> & Pick<Client, "id">
      >({
        query: (id) => ({
          url: `/users/${id}/restore`,
          method: "PUT",
        }),
      }),
    };
  },
});
/****useMaMethodAfficjageQuery***************/
/****useMaMethodeOperationMutaion**************/
export const {
  /*******CLIENT***********/
  /*******************/
  useFetchUsersQuery,
  usePaginationUsersQuery,
  useFetchOneUsersQuery,
  useFetchOneUsersByEmailQuery,
  useAddUsersMutation,
  useEditUsersMutation,
  useDeleteUsersMutation,
  useArchiveUsersMutation,
  useRestoreUsersMutation,
} = crudUser;
export type OpenClientProp = {
  data: ClientJson;
  refetch: () => void;
  save: () => void;
  edit: () => void;
};
export const openUsers = (): OpenClientProp => {
  const { data = [], refetch } = useFetchUsersQuery();
  const [save] = useAddUsersMutation();
  const [edit] = useEditUsersMutation();
  //@ts-ignore
  const out: OpenClientProp = { data, refetch, save, edit };
  return out;
};

export const openPaginationUsers = (page: number): OpenClientProp => {
  const { data = [], refetch } = usePaginationUsersQuery(page);
  const [save] = useAddUsersMutation();
  const [edit] = useEditUsersMutation();
  //@ts-ignore
  const out: OpenClientProp = { data, refetch, save, edit };
  return out;
};

export const openOneUser = (id: string): OpenClientProp => {
  const { data = [], refetch } = useFetchOneUsersQuery(id);
  const [save] = useAddUsersMutation();
  const [edit] = useEditUsersMutation();
  //@ts-ignore
  const out: OpenClientProp = { data, refetch, save, edit };
  return out;
};
export const openOneUserByEmail = (email: string): OpenClientProp => {
  const { data = [], refetch } = useFetchOneUsersByEmailQuery(email);
  const [save] = useAddUsersMutation();
  const [edit] = useEditUsersMutation();
  //@ts-ignore
  const out: OpenClientProp = { data, refetch, save, edit };
  return out;
};