import React from "react";
import type { Prisma } from "@prisma/client";
import { Card } from "../ui/card";
import { MessageCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import LikeButton from "./like-button";
import CommentList from "../comments/comments-list";
import CommentForm from "../comments/comment-form";
import Image from "next/image";

type ArticleDetailsPageProps = {
  article: Prisma.ArticlesGetPayload<{
    include: {
      author: {
        select: {
          name: true;
          email: true;
          imageUrl: true;
        };
      };
    };
  }>;
};

const ArticleDetailsPage = async ({ article }: ArticleDetailsPageProps) => {
  const { userId } = await auth();

  const comments = await prisma.comment.findMany({
    where: { articleId: article.id },
    include: {
      author: {
        select: { name: true, email: true, imageUrl: true },
      },
    },
  });

  const likes = await prisma.like.findMany({
    where: { articleId: article.id },
  });

  // any user can read only
  const user = userId
    ? await prisma.user.findUnique({
        where: { clerkUserId: userId },
      })
    : null;

  // only logged in users
  //   const user = await prisma.user.findUnique({
  //     where: {
  //       clerkUserId: userId as string,
  //     },
  //   });

  const isLiked = user ? likes.some((like) => like.userId === user.id) : false;

  // Function to calculate read time
  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const textContent = content.replace(/<[^>]*>/g, ""); // Remove HTML tags
    const wordCount = textContent.trim().split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  // Use the function
  const readTime = calculateReadTime(article.content);

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <article className="mx-auto max-w-3xl">
          {/* Article Header */}
          <header className="mb-12">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                {article.category}
              </span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
              {article.title}
            </h1>

            <div className="flex items-center gap-4 text-muted-foreground">
              <Avatar className="h-10 w-10">
                <AvatarImage src={article.author.imageUrl as string} />
                <AvatarFallback>{article.id}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-foreground">
                  {article.author.name}
                </p>
                <p className="text-sm">
                  {article.createdAt.toDateString()} · {readTime} min read
                </p>
              </div>
            </div>
          </header>

          {/* Article Image */}
          {article.featuredImage && (
            <div className="mb-8">
              <Image
                src={article.featuredImage}
                alt={article.title}
                className="w-full rounded-lg object-cover max-h-[400px]"
                width={800}
                height={400}
              />
            </div>
          )}

          {/* Article Content */}
          <section
            className="prose prose-lg dark:prose-invert max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Conditionally Render Actions */}
          {user && (
            <>
              {/* Like Button */}
              <LikeButton
                articleId={article.id}
                likes={likes}
                isLiked={isLiked}
              />
            </>
          )}

          {/* Comments Section */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-8">
              <MessageCircle className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-semibold text-foreground">
                {comments.length} Comments
              </h2>
            </div>

            {/* Comment Form */}
            {user && <CommentForm articleId={article.id} user={user} />}
            {/* <CommentForm articleId={article.id} user={article.author} /> */}

            {/* Comments List */}
            <CommentList comments={comments} />
          </Card>
        </article>
      </main>
    </div>
  );
};

export default ArticleDetailsPage;
