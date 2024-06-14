import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'https://api-notekar-backend.vercel.app/';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, credentials: 'include' }),
  tagTypes: ['Note'],
  endpoints: (builder) => ({
    getNotes: builder.query({
      query: (query) => {
        const endpoint = query === '' ? '/notes' : `/notes/${query}`;
        return {
          url: endpoint,
        };
      },
      providesTags: ['Note', 'Label'],
    }),
    getNote: builder.query({
      query: (noteId) => ({
        url: `/notes/${noteId}`,
      }),
      providesTags: ['Note'],
    }),
    addNewNote: builder.mutation({
      query: (body) => ({
        url: '/notes',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Note'],
    }),
    updateNote: builder.mutation({
      query: ({ noteId, body }) => {
        return {
          url: `/notes/${noteId}`,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: ['Note'],
    }),
    deleteNote: builder.mutation({
      query: (noteId) => ({
        url: `/notes/${noteId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Note'],
    }),
    getLabels: builder.query({
      query: () => '/labels',
      providesTags: ['Label'],
    }),
    addNewLabel: builder.mutation({
      query: (body) => ({
        url: '/labels',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Label'],
    }),
    deleteLabel: builder.mutation({
      query: (labelId) => ({
        url: `/labels/${labelId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Label'],
    }),
    updateLabel: builder.mutation({
      query: ({ labelId, body }) => ({
        url: `/labels/${labelId}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Label'],
    }),
    registersUser: builder.mutation({
      query: (body) => ({
        url: '/auth/register',
        method: 'POST',
        body,
      }),
    }),
    loginUser: builder.mutation({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),
    getSelfDetails: builder.query({
      query: () => '/self',
    }),
  }),
});

export const {
  useGetNotesQuery,
  useGetNoteQuery,
  useAddNewNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
  useGetLabelsQuery,
  useAddNewLabelMutation,
  useDeleteLabelMutation,
  useUpdateLabelMutation,
  useRegistersUserMutation,
  useLoginUserMutation,
  useGetSelfDetailsQuery,
} = api;
