// src/app/videos/[id]/page.tsx

"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Layout from "@/Layout/Dashboard/Layout";
import { X } from "lucide-react";
import {
  useGetSingleEducationalVideo,
  useGetVideoStream,
} from "@/models/Education/EducationModel";
import { getCookie } from "cookies-next";

interface VideoDetails {
  _id: string;
  title: string;
  description: string;
  type: string;
  category: string;
  price?: number;
  thumbnail?: string;
}

const VideoSinglePage = () => {
  const { id } = useParams<{ id: string }>();
  const [details, setDetails] = useState<VideoDetails | null>(null);
  const [playVideo, setPlayVideo] = useState(false);

  const user = getCookie("lookna_admin");
  const parsedUser = user ? JSON.parse(user as string) : null;
  const loginID = parsedUser?.data?.user?._id;

  const singleEducation = useGetSingleEducationalVideo({
    id: id,
  });

  useEffect(() => {
    setDetails(singleEducation?.data?.education || null);
  }, [id, singleEducation?.data?.education]);

  const handleVideoPause = () => setPlayVideo(false);

  if (!details) return <div className="p-8 text-center">Loading...</div>;

  return (
    <Layout>
      <div className="h-[90vh] flex items-center justify-center">
        <div className="w-full max-w-xl mx-auto p-3 bg-[var(--glass-bg)] rounded-xl shadow-lg h-[600px] overflow-y-auto">
          <style jsx>{`
            div::-webkit-scrollbar {
              width: 8px;
              background: transparent;
            }
            div::-webkit-scrollbar-thumb {
              background: var(--glass-primary);
              border-radius: 8px;
              transition: background 0.2s;
            }
            div::-webkit-scrollbar-thumb:hover {
              background: var(--glass-primary);
              opacity: 0.8;
            }
            div::-webkit-scrollbar-button {
              display: none;
              height: 0;
              width: 0;
            }
            /* For Firefox */
            div {
              scrollbar-width: thin;
              scrollbar-color: var(--glass-primary) transparent;
            }
          `}</style>
          <div className="mb-4 relative w-full h-[350px] flex items-center justify-center bg-black rounded">
            {details.thumbnail && !playVideo && (
              <div
                className="absolute inset-0 cursor-pointer group"
                onClick={() => setPlayVideo(true)}
              >
                <img
                  src={`${process.env.NEXT_PUBLIC_PORT}/${details.thumbnail}`}
                  alt="Thumbnail"
                  className="w-full h-full object-contain rounded border"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity rounded">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <circle cx="12" cy="12" r="12" fill="rgba(0,0,0,0.4)" />
                    <polygon points="10,8 16,12 10,16" fill="white" />
                  </svg>
                </div>
              </div>
            )}
            {playVideo && (
              <div className="absolute inset-0">
                <video
                  src={`${process.env.NEXT_PUBLIC_PORT}/api/education/${loginID}/video/stream/${id}`}
                  controls
                  autoPlay
                  className="w-full h-full object-contain rounded border"
                />
                <button
                  type="button"
                  className="absolute top-2 right-2 bg-black/60 rounded-full p-1 text-white hover:bg-red-600 transition z-10"
                  onClick={() => setPlayVideo(false)}
                  aria-label="Close Video"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          <h1 className="text-2xl font-bold mb-4">{details.title}</h1>

          <div className="mb-4">
            <span className="font-semibold">Description:</span>
            <div>{details.description}</div>
          </div>

          <div className="mb-4">
            <span className="font-semibold">Type:</span> {details.type}
          </div>

          <div className="mb-4">
            <span className="font-semibold">Category:</span> {details.category}
          </div>
          {details.type === "Paid" && (
            <div className="mb-4">
              <span className="font-semibold">Price:</span> ${details.price}
            </div>
          )}

          {/* {details.video && (
          <div className="mb-4">
            <span className="font-semibold">Video:</span>
            <div>{details.video}</div>
          </div>
        )} */}
        </div>
      </div>
    </Layout>
  );
};

export default VideoSinglePage;
