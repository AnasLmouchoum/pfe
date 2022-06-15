import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PAGE_SIZE } from "tools/consts";
import { ColisPalette, ColisPaletteJson } from "tools/types";

export const crudColisPalette = createApi({
  reducerPath: "crud-colisPalette",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_URL,
    prepareHeaders(headers) {
      return headers;
    },
  }),
  tagTypes: ["ColisPalette", "UNAUTHORIZED", "UNKNOWN_ERROR"],
  endpoints(builder) {
    return {
      /*****************************************************************************/
      /*********************************ColisPalette**************************************/
      /*****************************************************************************/
      fetchColisPalettes: builder.query<ColisPalette[], void>({
        query: () => `/colisPalettes`,
      }),
      paginationColisPalettes: builder.query<ColisPalette[], number>({
        query: (page) => `/colisPalettes?page=${page}&size=${PAGE_SIZE}`,
      }),
      addColisPalette: builder.mutation<ColisPalette, Partial<ColisPalette>>({
        query: (body) => ({
          url: "/colisPalettes",
          method: "POST",
          body,
        }),
      }),
      deleteColisPalette: builder.mutation<{ success: boolean; id: number }, number>(
        {
          //@ts-ignore
          query(id: Num) {
            //  if (confirm(`do you want delete Client number ${id.id} ?`))
            return {
              url: `/colisPalettes/${id.id}`,
              method: "DELETE",
            };
          },
        }
      ),
    };
  },
});

export const {
  useFetchColisPalettesQuery,
  usePaginationColisPalettesQuery,
  useAddColisPaletteMutation,
  useDeleteColisPaletteMutation,
  /*******************************************************/
  /*******************************************************/
} = crudColisPalette;
//const familleColisPaletteOpen:OpenColisPaletteProp=openColisPalettes()
export type OpenColisPaletteProp = {
  data: ColisPaletteJson;
  refetch: () => void;
  save: () => void;
  edit: () => void;
};
export const openColisPalettes = (): OpenColisPaletteProp => {
  const { data = [], refetch } = useFetchColisPalettesQuery();
  const [save] = useAddColisPaletteMutation();
  //@ts-ignore
  const out: OpenColisPaletteProp = { data, refetch, save };
  return out;
};
