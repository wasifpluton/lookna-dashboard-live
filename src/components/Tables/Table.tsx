"use client";

import dynamic from "next/dynamic";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Edit, Eye, Trash, Download } from "lucide-react";

interface TableColumn {
  key: string;
  header: string;
  render?: (value: any, row: any) => React.ReactNode;
  className?: string;
  type?: string;
}

interface TableProps<T> {
  tableName?: string;
  data: T[];
  columns: TableColumn[];
  onRowClick?: (item: T) => void;
  onViewClick?: (item: T) => void;
  onEditClick?: (item: T) => void;
  keyField?: string;
  statusField?: string;
  statusStyles?: Record<string, string>;
  defaultStatusStyles?: {
    active: string;
    inactive: string;
    delivered: string;
    picking_up: string;
    on_way: string;
  };
  href?: string;
  actions?: boolean;
  eye?: boolean;
  edit?: boolean;
  trash?: boolean;
  isLoading?: boolean;
  setId?: (id: string) => void;
  setSelectedRowData?: (data: any) => void;
  maxTextLength?: number;
  deleteFunctions?: (item: T) => void;
  tableStyle?: React.CSSProperties;
  theadStyle?: React.CSSProperties;
  trStyle?: React.CSSProperties;
  tbodyStyle?: React.CSSProperties;
  download?: boolean;
  onDownloadClick?: (item: T) => void;
}

const shimmerAnimation = {
  background: "linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)",
  backgroundSize: "200% 100%",
  animation: "shimmer 1.5s infinite",
  borderRadius: "4px",
};

const skeletonStyle = {
  height: "20px",
  width: "100%",
  ...shimmerAnimation,
};

const smallSkeletonStyle = {
  height: "20px",
  width: "20px",
  ...shimmerAnimation,
};

const Table = <T extends Record<string, any>>({
  tableName,
  data,
  columns,
  onRowClick,
  onViewClick,
  onEditClick,
  keyField = "id",
  statusField,
  href,
  actions = true,
  eye = true,
  edit = true,
  trash = true,
  isLoading = false,
  setId = () => {},
  setSelectedRowData = () => {},
  maxTextLength = 20,
  deleteFunctions = () => {},
  tableStyle,
  theadStyle,
  trStyle,
  tbodyStyle,
  download = false,
  onDownloadClick,
}: TableProps<T>) => {
  const router = useRouter();

  const truncateText = (text: string, maxLength: number) => {
    if (!text) return "-";
    if (text?.length > maxLength) {
      return text?.substring(0, maxLength) + "...";
    }
    return text;
  };

  const handleViewClick = (id: string) => {
    if (href) {
      router.push(`${href}/${id}`);
    }
  };

  return (
    <div
      className="overflow-x-auto "
      style={{ padding: "0", maxWidth: "100%" }}
    >
      {tableName && (
        <h2 className="text-lg font-medium mb-4" style={{ padding: "0 1rem" }}>
          {tableName}
        </h2>
      )}

      <div
        className="max-h-[calc(80vh-200px)] overflow-hidden overflow-y-auto overflow-x-auto"
        style={{ margin: "0 1rem" }}
      >
        <table
          cellPadding="10"
          className="w-full border-separate border-spacing-y-4 min-w-max"
          style={{
            ...tableStyle,
            borderCollapse: "separate",
            borderSpacing: "0 0.5rem",
          }}
        >
          <thead
            className="[var(--primary-theme-color)] shadow "
            style={{ ...theadStyle, zIndex: 10 }}
          >
            <tr
              style={{ ...trStyle }}
              className="text-left text-white text-xs border-b border-gray-200"
            >
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={` pb-3 font-medium ${column.className || ""}`}
                  style={{ padding: "1rem 0.75rem" }}
                >
                  {column.header}
                </th>
              ))}
              {actions && (
                <th
                  className={`py-4 px-2 md:px-4 font-[500] text-white text-sm text-left `}
                  style={{ padding: "1rem 0.75rem" }}
                >
                  Action
                </th>
              )}
            </tr>
          </thead>
          <tbody className=" " style={{ ...tbodyStyle }}>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <tr
                  key={index}
                  className="hover:bg-[var(--primary-theme-color)] cursor-pointer shadow"
                  style={{ marginBottom: "0.5rem" }}
                >
                  {columns.map((_, i) => (
                    <td
                      key={i}
                      className="hover:bg-[var(--primary-theme-color)] rounded-xl shadow-lg py-4 px-2 text-sm font-normal text-center md:px-4"
                      style={{ padding: "0.75rem" }}
                    >
                      <div style={skeletonStyle}></div>
                    </td>
                  ))}
                  {actions && (
                    <td
                      className="py-4 px-2 text-sm font-normal text-center md:px-4"
                      style={{ padding: "0.75rem" }}
                    >
                      <div className="flex justify-center gap-4">
                        <div style={smallSkeletonStyle}></div>
                        <div style={smallSkeletonStyle}></div>
                        <div style={smallSkeletonStyle}></div>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : data?.length > 0 ? (
              data.map((item, index) => (
                <tr
                  key={keyField ? item[keyField] : index}
                  className="hover:bg-[var(--primary-theme-color)] "
                  style={{
                    ...trStyle,
                    transition: "all 0.2s",
                    marginBottom: "0.5rem",
                  }}
                  onClick={() => {
                    if (onRowClick) {
                      onRowClick(item);
                      setId(item[keyField]);
                    } else {
                      setId(item[keyField]);
                    }
                  }}
                >
                  {columns.map((column) => {
                    if (column.key === statusField && statusField) {
                      const status = item[statusField];
                      return (
                        <td
                          key={column.key}
                          className="py-4 px-2 text-sm font-normal text-left md:px-4"
                          style={{ padding: "0.75rem" }}
                        >
                          <span
                            className={`inline-block py-2 px-3 rounded-sm `}
                          >
                            {truncateText(status, maxTextLength)}
                          </span>
                        </td>
                      );
                    }

                    if (column.render) {
                      return (
                        <td
                          key={column.key}
                          className={`py-4 px-2 text-sm font-normal text-left md:px-4 ${
                            column.className || ""
                          }`}
                          style={{ padding: "0.75rem" }}
                        >
                          {column.render(item[column.key], item)}
                        </td>
                      );
                    }

                    return (
                      <td
                        key={column.key}
                        className={`py-4 px-2 text-sm font-normal text-left md:px-4 ${
                          column.className || ""
                        }`}
                        style={{ padding: "0.75rem" }}
                      >
                        {column.type === "image" ? (
                          <img
                            src={`${process.env.NEXT_PUBLIC_PORT}/${
                              item[column.key]
                            }`}
                            alt={item.title || "thumbnail"}
                            style={{
                              width: 50,
                              height: 50,
                              objectFit: "cover",
                              borderRadius: 8,
                            }}
                          />
                        ) : (
                          truncateText(item[column.key], maxTextLength)
                        )}
                      </td>
                    );
                  })}
                  {actions && (
                    <td
                      className="py-4 px-2 text-sm font-normal md:px-4"
                      style={{ padding: "0.75rem" }}
                    >
                      <div className="text-left gap-4 flex flex-row">
                        {eye && (
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onViewClick) {
                                onViewClick(item);
                              } else {
                                handleViewClick(item[keyField]);
                              }
                              setSelectedRowData(item);
                            }}
                            style={{ cursor: "pointer" }}
                          >
                            <Eye className="w-5 h-5 text-white hover:text-white" />
                          </div>
                        )}
                        {edit && (
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onEditClick) {
                                onEditClick(item);
                              }
                            }}
                            style={{ cursor: "pointer" }}
                          >
                            <Edit className="w-5 h-5 text-blue-500 hover:text-blue-700" />
                          </div>
                        )}
                        {trash && (
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              if (deleteFunctions) {
                                deleteFunctions(item);
                              }
                            }}
                            style={{ cursor: "pointer" }}
                          >
                            <Trash className="w-5 h-5 text-red-500 hover:text-red-700" />
                          </div>
                        )}
                        {download && (
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onDownloadClick) {
                                onDownloadClick(item);
                              }
                            }}
                            style={{ cursor: "pointer" }}
                          >
                            <Download className="w-5 h-5 text-gray-500 hover:text-white" />
                          </div>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="py-4 px-2 text-sm font-normal text-center text-gray-500 md:px-4"
                  style={{ padding: "1.5rem 0.75rem" }}
                >
                  No Data Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Table), { ssr: false });
