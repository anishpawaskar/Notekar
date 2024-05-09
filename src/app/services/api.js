import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'http://localhost:3000';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, credentials: 'include' }),
  tagTypes: ['Note'],
  endpoints: (builder) => ({
    getNotes: builder.query({
      query: () => '/notes',
      providesTags: ['Note'],
    }),
    getNote: builder.query({
      query: (noteId) => ({
        url: `/notes/${noteId}`,
      }),
    }),
    addNewNote: builder.mutation({
      query: (body) => ({
        url: '/notes',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Note'],
    }),
  }),
});

export const { useGetNotesQuery, useGetNoteQuery, useAddNewNoteMutation } = api;
