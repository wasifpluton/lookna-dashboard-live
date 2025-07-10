"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/Layout/Dashboard/Layout";

import IsMessage from "@/components/IsMessage/IsMessage";
import Pagination from "@/components/Pagination/Pagination";
import Table from "@/components/Tables/Table";
import AddVideo from "@/popups/AddVideo";
import { useGetEducationalVideosQuery } from "@/Redux/Education/EducationSlice";
import VideoForm from "@/popups/AddVideo";
import UpdateVideo from "@/popups/UpdateVideo";
import { getCookie } from "cookies-next";
import { useDeleteEducationalVideos } from "@/models/Education/EducationModel";
import ConfirmationModal from "@/components/Modal/ConfirmationModal";

const Dashboard = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [educationData, setEducationData] = useState<any[]>([]);

  const [isOpen, setIsOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateEducationData, setUpdateEducationData] = useState<any>(null);

  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const columns = [
    { key: "thumbnail", header: "Thumbnail", type: "image" },
    { key: "title", header: "Title" },
    { key: "category", header: "Category" },
    { key: "type", header: "Type" },
    { key: "price", header: "Price" },
  ];

  const user = getCookie("lookna_admin");
  const parsedUser = user ? JSON.parse(user as string) : null;
  const adminID = parsedUser?.data?.user?._id;

  const { data, isLoading, isError, isFetching, refetch } =
    useGetEducationalVideosQuery({
      page,
      limit: 10,
      id: adminID,
      search: {
        title: "",
        category: "",
        type: "",
      },
    });

  const { handleDeleteEducationalVideos, isLoading: isDeleteLoading } =
    useDeleteEducationalVideos({ setIsOpen });

  useEffect(() => {
    setEducationData(data?.educationalVideos || []);
  }, [data, isLoading]);

  const total = data?.meta?.totalItems || 0;
  const totalPages = Math.ceil(total / 10);

  const handleDelete = (id: string) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    if (deleteId) {
      handleDeleteEducationalVideos({ adminID, id: deleteId });
      setDeleteId(null);
    }
  };

  return (
    <Layout>
      <div className="w-full mx-auto pt-8 flex flex-col gap-6">
        <div className="bg-[var(--glass-bg)] backdrop-blur-md border border-white rounded-xl shadow-lg rounded-lg shadow-sm">
          <div className="p-6 flex justify-between items-start md:lg:items-center  lg:items-center xl:items-center flex-col md:flex-row lg:flex-row xl:flex-row gap-6 w-full">
            <div>
              <h2 className="text-xl font-semibold">Education Management</h2>
              <p className="text-gray-500 text-sm">
                manage your courses in the system
              </p>
            </div>
            <div className="flex items-center justify-center w-[40%] sm:w-[90%] md:w-[20%] lg:w-[20%] xl:w-[10%]">
              <button
                onClick={() => setIsOpen(true)}
                type="submit"
                className="bg-[var(--primary-theme-color)] rounded-md w-full text-white font-semibold py-2 roundedtransition px-2"
              >
                Add Video
              </button>
            </div>
          </div>
        </div>

        <div className="bg-[var(--glass-bg)] backdrop-blur-md border border-white rounded-xl shadow-lg p-6 w-full">
          {educationData.length > 0 ? (
            <>
              <Table
                data={educationData || []}
                columns={columns}
                actions={true}
                edit={true}
                trash={true}
                eye={true}
                keyField="_id"
                onViewClick={(video) => router.push(`/video/${video._id}`)}
                onEditClick={(video) => {
                  setIsUpdate(true);
                  setUpdateEducationData(video);
                }}
                deleteFunctions={(item) => handleDelete(item._id)}
              />
              <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </>
          ) : (
            <IsMessage message="No Videos Found" />
          )}
        </div>
      </div>

      {isOpen && <AddVideo isOpen={isOpen} setIsOpen={setIsOpen} />}

      {isUpdate && (
        <UpdateVideo
          isOpen={isUpdate}
          setIsOpen={setIsUpdate}
          updateEducationData={updateEducationData}
        />
      )}

      <ConfirmationModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this video?"
      />
    </Layout>
  );
};

export default Dashboard;
