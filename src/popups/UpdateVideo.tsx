import React, { useState } from "react";
import Modal from "@/components/Modal/Modal";
import CustomSelect from "@/components/Select/CustomerSelect";
import CustomUploadBtn from "@/components/UploadBtn/CustomUploadBtn";
import { Trash2 } from "lucide-react";
import {
  useUpdateEducationalVideos,
  useUploadEducationalVideos,
} from "@/models/Education/EducationModel";
import { getCookie } from "cookies-next";

const UpdateVideo = ({
  isOpen,
  setIsOpen,
  updateEducationData,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  updateEducationData: any;
}) => {
  const user = getCookie("lookna_admin");
  const parsedUser = user ? JSON.parse(user as string) : null;
  const adminID = parsedUser?.data?.user?._id;

  const [form, setForm] = useState<{
    title: string;
    description: string;
    type: string;
    category: string;
    price: string;
    thumbnail: File | null;
    video: File | null;
  }>({
    title: updateEducationData?.title || "",
    description: updateEducationData?.description || "",
    type: updateEducationData?.type || "",
    category: updateEducationData?.category || "",
    price: updateEducationData?.price || "",
    thumbnail: updateEducationData?.thumbnail || null,
    video: updateEducationData?.video || null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const { handleUpdateEducationalVideos, isLoading } =
    useUpdateEducationalVideos({ setIsOpen });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("type", form.type);
    formData.append("category", form.category);
    formData.append("price", form.type === "Free" ? "null" : form.price);
    if (form.thumbnail) formData.append("thumbnail", form.thumbnail);
    if (form.video) formData.append("video", form.video);

    handleUpdateEducationalVideos({
      adminID: adminID,
      id: updateEducationData._id,
      data: formData,
    });

    // Do something with form data
    setIsOpen(false);
    setForm({
      title: "",
      description: "",
      type: "",
      category: "",
      price: "",
      thumbnail: null,
      video: null,
    });
  };

  return (
    <>
      <Modal
        width={"w-full sm:w-[55vw] md:w-[55vw] lg:w-[65vw]"}
        height={"max:h-[80vh]"}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={"Update Video"}
        footer={
          <div className="text-center pt-2">
            {isLoading ? (
              <button
                className="px-4 py-2 bg-[var(--primary-theme-color)] text-white rounded"
                // onClick={handleSubmit}
                type="submit"
              >
                Uploading...
              </button>
            ) : (
              <button
                className="px-4 py-2 bg-[var(--primary-theme-color)] text-white rounded"
                onClick={handleSubmit}
                type="submit"
              >
                Upload
              </button>
            )}
          </div>
        }
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-textColorDark">Title</label>
              <input
                type="text"
                placeholder="Your Title..."
                className="p-2 md:p-3 rounded-md bg-transparent text-white focus:outline-none border-2 focus:border-white focus:border-2 placeholder:text-[12px] md:placeholder:text-[14px]"
                name="title"
                value={form.title}
                onChange={handleChange}
              />
            </div>

            <div className="flex w-full flex-col sm:flex-row gap-5 w-full">
              <div className="flex flex-col gap-2 w-full">
                <label className="text-sm text-textColorDark">Type</label>
                <CustomSelect
                  options={[
                    { value: "Paid", label: "Paid" },
                    { value: "Free", label: "Free" },
                  ]}
                  value={form.type}
                  onChange={(value) => setForm({ ...form, type: value })}
                  placeholder="Select Type"
                />
              </div>

              <div className="flex flex-col  gap-2 w-full">
                <label className="text-sm text-textColorDark">Category</label>
                <CustomSelect
                  options={[
                    { value: "EDUCATIONAL", label: "EDUCATIONAL" },
                    { value: "EXPLAINES", label: "EXPLAINES" },
                  ]}
                  value={form.category}
                  onChange={(value) => setForm({ ...form, category: value })}
                  placeholder="Select Category"
                />
              </div>
            </div>

            {form.type === "Paid" && (
              <div className="flex flex-col gap-2">
                <label className="text-sm text-textColorDark">Price</label>
                <input
                  type="number"
                  placeholder="Price"
                  className="p-2 md:p-3 rounded-md bg-transparent text-white focus:outline-none border-2 focus:border-white focus:border-2 placeholder:text-[12px] md:placeholder:text-[14px]"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                />
              </div>
            )}

            <div className="flex w-full gap-5 items-center">
              <div className="flex flex-col gap-2">
                <CustomUploadBtn
                  label="Upload Thumbnail"
                  className="w-[35vw] sm:w-[15vw] md:w-[20vw] lg:w-[20vw] xl:w-[10vw]"
                  value={form.thumbnail}
                  onChange={(file) => setForm({ ...form, thumbnail: file })}
                />
              </div>

              <div className="flex flex-col gap-2">
                <CustomUploadBtn
                  label="Upload Video"
                  className="w-[35vw] sm:w-[15vw] md:w-[20vw] lg:w-[20vw] xl:w-[10vw]"
                  value={form.video}
                  onChange={(file) => setForm({ ...form, video: file })}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-textColorDark">Description</label>
              <textarea
                placeholder="Add Description..."
                style={{ height: "100px" }}
                className="p-2 md:p-3 rounded-md bg-transparent text-white focus:outline-none border-2 focus:border-white focus:border-2 placeholder:text-[12px] md:placeholder:text-[14px]"
                name="description"
                value={form.description}
                onChange={handleChange}
              />
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default UpdateVideo;
