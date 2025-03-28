import React from "react";

const ArticleDetailLoading = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 animate-pulse">
      {/* Title Skeleton */}
      <div className="h-8 w-3/4 bg-gray-300 dark:bg-gray-700 rounded-md mb-4"></div>

      {/* Meta Info Skeleton */}
      <div className="flex items-center gap-4 mb-6">
        <div className="h-6 w-24 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
        <div className="h-6 w-16 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
      </div>

      {/* Image Skeleton */}
      <div className="h-64 w-full bg-gray-300 dark:bg-gray-700 rounded-md mb-6"></div>

      {/* Paragraph Skeleton */}
      <div className="space-y-4">
        <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded-md"></div>
        <div className="h-4 w-5/6 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
        <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
        <div className="h-4 w-4/5 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
      </div>
    </div>
  );
};

export default ArticleDetailLoading;
