"use client";

import {
  ShowApiErrorToast,
  ShowErrorToast,
  ShowSuccessToast,
  ShowWarningToast,
} from "@/components/Toast/Toast";
import {
  useGetSingleEducationalVideoQuery,
  useGetEducationalVideosQuery,
  useGetVideoStreamQuery,
  useUploadEducationalVideosMutation,
  useUpdateEducationalVideosMutation,
  useDeleteEducationalVideosMutation,
} from "@/Redux/Education/EducationSlice";

import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export const useGetSingleEducationalVideo = ({ id }: { id: string }) => {
  try {
    const user = getCookie("lookna_admin");
    const parsedUser = user ? JSON.parse(user as string) : null;
    const adminID = parsedUser?.data?.user?._id;

    const { data, isError, isFetching, isLoading, refetch, error } =
      useGetSingleEducationalVideoQuery({
        adminID: adminID,
        id,
      });
    if (error) {
      ShowApiErrorToast(error);
    }

    return { data, isError, isFetching, isLoading, refetch };
  } catch (error) {
    ShowApiErrorToast(error);
  }
};

export const useGetEducationalVideos = ({
  id,
  page,
  limit,
  search,
}: {
  id: string;
  page: number;
  limit: number;
  search?: Record<string, string>;
}) => {
  try {
    const { data, isError, isFetching, isLoading, refetch, error } =
      useGetEducationalVideosQuery({ id, page, limit, search });

    if (error) {
      ShowApiErrorToast(error);
    }

    return { data, isError, isFetching, isLoading, refetch };
  } catch (error) {
    ShowApiErrorToast(error);
  }
};

export const useGetVideoStream = ({
  id,
  playVideo,
}: {
  id: string;
  playVideo: boolean;
}) => {
  try {
    const user = getCookie("lookna_admin");
    const parsedUser = user ? JSON.parse(user as string) : null;
    const loginID = parsedUser?.data?.user?._id;

    const { data, isError, isFetching, isLoading, refetch, error } =
      useGetVideoStreamQuery({ loginID, id }, { skip: !playVideo });

    if (error) {
      ShowApiErrorToast(error);
    }
    return { data, isError, isFetching, isLoading, refetch };
  } catch (error) {
    ShowApiErrorToast(error);
  }
};

export const useUploadEducationalVideos = ({
  setIsOpen,
}: {
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const [addVidoe, { isError, isLoading }] =
    useUploadEducationalVideosMutation();

  const handleUploadEducationalVideos = async ({
    createdBy,
    data,
  }: {
    createdBy: string;
    data: any;
  }) => {
    try {
      const response = await addVidoe({ createdBy, data });
      if (isError) {
        ShowApiErrorToast(isError);
      }
      if (isLoading) {
        ShowSuccessToast("Uploading...");
      }
      ShowSuccessToast("Uploaded Successfully");
      setIsOpen(false);
      return response;
    } catch (error) {
      ShowApiErrorToast(error);
    }
  };
  return { handleUploadEducationalVideos, isLoading };
};

export const useUpdateEducationalVideos = ({
  setIsOpen,
}: {
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const [updateVidoe, { isError, isLoading }] =
    useUpdateEducationalVideosMutation();

  const handleUpdateEducationalVideos = async ({
    adminID,
    id,
    data,
  }: {
    adminID: string;
    id: string;
    data: any;
  }) => {
    try {
      const response = await updateVidoe({ adminID, id, data });
      if (isError) {
        ShowApiErrorToast(isError);
      }
      if (isLoading) {
        ShowSuccessToast("Updating...");
      }
      ShowSuccessToast("Updated Successfully");
      setIsOpen(false);
      return response;
    } catch (error) {
      ShowApiErrorToast(error);
    }
  };
  return { handleUpdateEducationalVideos, isLoading };
};

export const useDeleteEducationalVideos = ({
  setIsOpen,
}: {
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const [deleteVidoe, { isError, isLoading }] =
    useDeleteEducationalVideosMutation();

  const handleDeleteEducationalVideos = async ({
    adminID,
    id,
  }: {
    adminID: string;
    id: string;
  }) => {
    try {
      const response = await deleteVidoe({ adminID, id });
      if (isError) {
        ShowApiErrorToast(isError);
      }
      if (isLoading) {
        ShowSuccessToast("Deleting...");
      }
      ShowSuccessToast("Deleted Successfully");
      setIsOpen(false);
      return response;
    } catch (error) {
      ShowApiErrorToast(error);
    }
  };
  return { handleDeleteEducationalVideos, isLoading };
};
