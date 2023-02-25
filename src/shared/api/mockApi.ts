import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Company, FormToSystem, Ownership, TaxSystem } from '../types/types';

export const mybuhApi = createApi({
  reducerPath: 'mybuhApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://cards-server.cyclic.app/' }),
  endpoints: (builder) => ({
    getCompanies: builder.query<Company[], void>({
      query: () => `companies`,
    }),
    /* можно было бы сделать запрос по form_id, чтобы сервер сразу возвращал только валидные системы, 
        но поскольку весь массив не очень большой, и я хочу минимизировать запросы к серверу,
         оставлю только ообщий запрос */
    getFormToSystem: builder.query<FormToSystem[], void>({
      query: () => `form-to-system`,
    }),
    getOwnerships: builder.query<Ownership[], void>({
      query: () => `ownerships`,
    }),
    getTaxSystems: builder.query<TaxSystem[], void>({
      query: () => `tax-system`,
    }),
    /* editCompany: builder.mutation<Company, Partial<Company> & Pick<Company, "id">>({
      query: ({ id, ...patch }) => ({
        url: `/companies/${id}`,
        method: 'PATCH',
        body: patch
      }) 
    })*/
  }),
})


export const {
  useGetCompaniesQuery,
  useGetFormToSystemQuery,
  useGetOwnershipsQuery,
  useGetTaxSystemsQuery
} = mybuhApi