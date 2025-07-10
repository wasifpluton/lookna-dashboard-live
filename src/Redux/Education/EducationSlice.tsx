import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  DeleteEducationalVideoRequest,
  DeleteEducationalVideoResponse,
  GetEducationalVideosRequest,
  GetEducationalVideosResponse,
  GetSingleEducationalVideoRequest,
  GetSingleEducationalVideoResponse,
  GetVideoStreamRequest,
  UpdateEducationalVideoRequest,
  UpdateEducationalVideoResponse,
  UploadEducationalVideoRequest,
  UploadEducationalVideoResponse,
  VideoStreamSuccessResponse,
} from "./EducationTypes";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { useLogoutHandler } from "@/models/Auth/AuthModel";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_PORT,
  prepareHeaders: (headers) => {
    const user = getCookie("lookna_admin");
    const parsedUser = user ? JSON.parse(user as string) : null;

    const token = parsedUser?.data?.token;
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

const baseQueryWithReauth: typeof baseQuery = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (
    result.error &&
    result.error.status === 403 &&
    (result.error.data as { message?: string })?.message ===
      "Invalid or expired token"
  ) {
    const user = getCookie("lookna_admin");
    const parsedUser = user ? JSON.parse(user as string) : null;
    const refreshToken = parsedUser?.data?.refreshToken;

    const refreshResult = await fetch(
      `${process.env.NEXT_PUBLIC_PORT}/api/refresh-token`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken: refreshToken, deviceId: "Web" }),
      }
    );

    if (refreshResult.ok) {
      const data = await refreshResult.json();
      setCookie(
        "lookna_admin",
        JSON.stringify({
          ...parsedUser,
          data: { ...parsedUser.data, token: data.token },
        })
      );
      result = await baseQuery(args, api, extraOptions);
    } else {
      const errorData = await refreshResult.json();
      if (errorData?.message === "Invalid refresh token") {
        deleteCookie("lookna_admin");
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      }
    }
  }

  return result;
};

export const EducationSlice = createApi({
  reducerPath: "EducationSlice",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["EducationalVideos"],
  endpoints: (build) => ({
    getEducationalVideos: build.query<
      GetEducationalVideosResponse,
      GetEducationalVideosRequest
    >({
      query: ({ page, limit, search, id }) => {
        const baseUrl = `/api/education/${id}/get-educational-videos?page=${page}&limit=${limit}`;
        let searchParams = "";
        if (search && typeof search === "object") {
          const searchEntries = Object.entries(search);
          if (searchEntries.length > 0) {
            searchParams =
              "&" +
              searchEntries
                .map(
                  ([key, value]) =>
                    `search[${key}]=${encodeURIComponent(value as string)}`
                )
                .join("&");
          }
        }
        return {
          url: baseUrl + searchParams,
          method: "GET",
        };
      },
      providesTags: ["EducationalVideos"],
    }),

    getSingleEducationalVideo: build.query<
      GetSingleEducationalVideoResponse,
      GetSingleEducationalVideoRequest
    >({
      query: ({ adminID, id }) => ({
        url: `/api/education/${adminID}/get-single-topic/${id}`,
        method: "GET",
      }),
    }),

    getVideoStream: build.query<
      VideoStreamSuccessResponse,
      GetVideoStreamRequest
    >({
      query: ({ loginID, id }) => ({
        url: `/api/education/${loginID}/video/stream/${id}`,
        method: "GET",
      }),
    }),

    uploadEducationalVideos: build.mutation<
      UploadEducationalVideoResponse,
      UploadEducationalVideoRequest
    >({
      query: ({ createdBy, data }) => ({
        url: `/api/education/${createdBy}/upload-educational-video`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["EducationalVideos"],
    }),

    updateEducationalVideos: build.mutation<
      UpdateEducationalVideoResponse,
      UpdateEducationalVideoRequest
    >({
      query: ({ adminID, id, data }) => ({
        url: `/api/education/${adminID}/update-educational-video/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["EducationalVideos"],
    }),

    deleteEducationalVideos: build.mutation<
      DeleteEducationalVideoResponse,
      DeleteEducationalVideoRequest
    >({
      query: ({ adminID, id }) => ({
        url: `/api/education/${adminID}/delete-educational-video/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["EducationalVideos"],
    }),
  }),
});

export const {
  useGetEducationalVideosQuery,
  useGetSingleEducationalVideoQuery,
  useGetVideoStreamQuery,
  useUploadEducationalVideosMutation,
  useUpdateEducationalVideosMutation,
  useDeleteEducationalVideosMutation,
} = EducationSlice;
