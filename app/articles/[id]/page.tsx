import ArticleDetailsPage from "@/components/articles/article-details-page";
import { prisma } from "@/lib/prisma";
import React from "react";

type ArticleDetailsPageProps = {
  params: Promise<{ id: string }>;
};
const page: React.FC<ArticleDetailsPageProps> = async ({ params }) => {
  const { id } = await params;
  const article = await prisma.articles.findUnique({
    where: {
      id,
    },
    include: {
      author: {
        select: {
          name: true,
          email: true,
          imageUrl: true,
        },
      },
    },
  });

  if (!article) {
    return (
      <div>
        <h1>Article not found</h1>
      </div>
    );
  }

  return (
    <div>
      <ArticleDetailsPage article={article} />
    </div>
  );
};

export default page;
