import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/users/' }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '',
    }),
  }),
});

export const { useGetUsersQuery } = usersApi;

export default usersApi;
