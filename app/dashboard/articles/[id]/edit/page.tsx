import EditArticlesPage from "@/components/articles/edit-articles-page";
import { prisma } from "@/lib/prisma";
import React from "react";
type EditArticleParams = {
  params: Promise<{ id: string }>;
};
const page: React.FC<EditArticleParams> = async ({ params }) => {
  const { id } = await params;

  const article = await prisma.articles.findUnique({
    where: {
      id,
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
      <EditArticlesPage article={article} />
    </div>
  );
};

export default page;
