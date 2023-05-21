import React from "react";

export default function Skeleton() {
  return (
    <div role="status" className="mt-6 animate-pulse">
      <div className="mb-4 h-4  rounded bg-gray-200 dark:bg-gray-700" />
      <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
      <div className="mb-2.5 h-10 rounded bg-gray-200 dark:bg-gray-700" />
      <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
      <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
      <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
      <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
      <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
      <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
      <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
      <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
      <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
      <div className="h-10  rounded bg-gray-200 dark:bg-gray-700" />
      <span className="sr-only">Loading...</span>
    </div>
  );
}
