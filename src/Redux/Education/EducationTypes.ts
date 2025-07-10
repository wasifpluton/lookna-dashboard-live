// Education API Interfaces

// Upload Educational Video
export interface UploadEducationalVideoRequest {
  createdBy: string;
  data: {
    type: "Paid" | "Free";
    title: string;
    description: string;
    category: "EDUCATIONAL" | "EXPLAINES";
    price?: number; // Required when type is "Paid"
    thumbnail: File; // Multipart form data
    video: File; // Multipart form data
  };
}

export interface UploadEducationalVideoResponse {
  status: boolean;
  message: string;
  data: {
    _id: string;
    createdBy: string;
    thumbnail: string;
    videoLink: string;
    title: string;
    description: string;
    price: number | null;
    type: "Paid" | "Free";
    category: "EDUCATIONAL" | "EXPLAINES";
    createdAt: string;
    updatedAt: string;
  };
}

// Get Educational Videos
export interface GetEducationalVideosRequest {
  page?: number;
  limit?: number;
  search?: Record<string, any>;
  id: string;
}

export interface GetEducationalVideosResponse {
  educationalVideos: Array<{
    _id: string;
    thumbnail: string;
    title: string;
    description: string;
    price: number | null;
    type: "Paid" | "Free";
    category: "EDUCATIONAL" | "EXPLAINES";
    createdAt: string;
  }>;
  meta: {
    totalItems: number;
    totalPages: number;
    page: number;
    limit: number;
  };
}

// Stream Educational Video
export interface StreamEducationalVideoRequest {
  // No request body, uses URL parameters
}

export interface StreamEducationalVideoResponse {
  // Returns video stream with appropriate headers
  // Content-Type: video/mp4
  // Content-Length: number
  // Accept-Ranges: bytes
  // Content-Range?: string (for partial content)
}

// Error Response Interface
export interface ErrorResponse {
  status: false;
  message: string;
}

// Common Video Data Interface
export interface EducationalVideo {
  _id: string;
  createdBy: string;
  thumbnail: string;
  videoLink: string;
  title: string;
  description: string;
  price: number | null;
  type: "Paid" | "Free";
  category: "EDUCATIONAL" | "EXPLAINES";
  createdAt: string;
  updatedAt: string;
}

// Pagination Meta Interface
export interface PaginationMeta {
  totalItems: number;
  totalPages: number;
  page: number;
  limit: number;
}

// Single Educational Video Response (excluding videoLink)
export interface GetSingleEducationalVideoRequest {
  adminID: string;
  id: string;
}

export interface GetSingleEducationalVideoResponse {
  status: boolean;
  message: string;
  education: {
    _id: string;
    createdBy: string;
    type: "Paid" | "Free";
    category: "EDUCATIONAL" | "EXPLAINES";
    price: number;
    title: string;
    description: string;
    thumbnail: string;
    createdAt: string;
    updatedAt: string;
    __v?: number;
  };
}

export interface GetVideoStreamRequest {
  loginID: string;
  id: string;
}

// Success: The response is a video stream, not JSON
// You can document the headers for clarity
export interface VideoStreamSuccessResponse {
  // The response is a binary video stream (video/mp4)
  // Headers:
  // - Content-Type: "video/mp4"
  // - Content-Length: number
  // - Accept-Ranges: "bytes"
  // - Content-Range?: string (if partial content)
}
export interface VideoStreamErrorResponse {
  status: false;
  message: string;
}

export interface UpdateEducationalVideoRequest {
  adminID: string;
  id: string;
  data: {
    type: "Paid" | "Free";
    title: string;
    description: string;
    category: "EDUCATIONAL" | "EXPLAINES";
    price?: number; // Required when type is "Paid"
    thumbnail: File; // Multipart form data
    video: File; // Multipart form data
  };
}

export interface UpdateEducationalVideoResponse {
  status: boolean;
  message: string;
  data: {
    _id: string;
    createdBy: string;
    thumbnail: string;
    videoLink: string;
    title: string;
    description: string;
    price: number | null;
    type: "Paid" | "Free";
    category: "EDUCATIONAL" | "EXPLAINES";
    createdAt: string;
    updatedAt: string;
  };
}

export interface DeleteEducationalVideoRequest {
  adminID: string;
  id: string;
}

export interface DeleteEducationalVideoResponse {
  status: boolean;
  message: string;
}
