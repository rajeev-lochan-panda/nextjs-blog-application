import { Button } from "@/components/ui/button";
import React, { Suspense } from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import ArticleSearchInput from "@/components/articles/article-search-input";
import AllArticlesPage from "@/components/articles/all-articles-page";
import { fetchArticleByQuery } from "@/lib/query/fetch-articles";

type SearchPageProps = {
  searchParams: { search?: string; page?: string };
};

const ITEMS_PER_PAGE = 3; // Number of items per page

const page: React.FC<SearchPageProps> = async ({ searchParams }) => {
  // const searchText = searchParams.search || "";
  // const currentPage = Number(searchParams.page) || 1;
  const searchText = (await searchParams).search || "";
  const currentPage = Number((await searchParams).page) || 1;
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;
  const take = ITEMS_PER_PAGE;

  const { articles, total } = await fetchArticleByQuery(searchText, skip, take);
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-12 space-y-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            All Articles
          </h1>
          {/* Search Bar */}
          <Suspense fallback={<div>Loading...</div>}>
            <ArticleSearchInput />
          </Suspense>
        </div>
        {/* All article page  */}
        <Suspense fallback={<AllArticlesPageSkeleton />}>
          <AllArticlesPage articles={articles} />
        </Suspense>
        {/* <AllArticlesPageSkeleton/> */}
        {/* Pagination */}
        {articles.length > 0 && totalPages > 1 && (
          <div className="mt-12 flex justify-center gap-2">
            {/* Prev Button */}
            <Button
              variant="ghost"
              size="sm"
              disabled={currentPage === 1}
              asChild
            >
              {currentPage === 1 ? (
                <span className="opacity-50 cursor-not-allowed">← Prev</span>
              ) : (
                <Link
                  href={`?search=${searchText}&page=${currentPage - 1}`}
                  passHref
                >
                  ← Prev
                </Link>
              )}
            </Button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }).map((_, index) => {
              const pageNumber = index + 1;
              return (
                <Button
                  key={pageNumber}
                  variant={currentPage === pageNumber ? "destructive" : "ghost"}
                  size="sm"
                  disabled={currentPage === pageNumber}
                  asChild
                >
                  <Link
                    href={`?search=${searchText}&page=${pageNumber}`}
                    passHref
                  >
                    {pageNumber}
                  </Link>
                </Button>
              );
            })}

            {/* Next Button */}
            <Button
              variant="ghost"
              size="sm"
              disabled={currentPage === totalPages}
              asChild
            >
              {currentPage === totalPages ? (
                <span className="opacity-50 cursor-not-allowed">Next →</span>
              ) : (
                <Link
                  href={`?search=${searchText}&page=${currentPage + 1}`}
                  passHref
                >
                  Next →
                </Link>
              )}
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default page;

export function AllArticlesPageSkeleton() {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <Card
          key={index}
          className="group relative overflow-hidden transition-all hover:shadow-lg"
        >
          <div className="p-6">
            {/* Article Image Skeleton */}
            <Skeleton className="mb-4 h-48 w-full rounded-xl bg-gradient-to-br from-purple-100/50 to-blue-100/50 dark:from-purple-900/20 dark:to-blue-900/20" />

            {/* Article Title Skeleton */}
            <Skeleton className="h-6 w-3/4 rounded-lg" />

            {/* Article Category Skeleton */}
            <Skeleton className="mt-2 h-4 w-1/2 rounded-lg" />

            {/* Author & Metadata Skeleton */}
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Author Avatar Skeleton */}
                <Skeleton className="h-8 w-8 rounded-full" />

                {/* Author Name Skeleton */}
                <Skeleton className="h-4 w-20 rounded-lg " />
              </div>

              {/* Date Skeleton */}
              <Skeleton className="h-4 w-24 rounded-lg " />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
