"use server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const deleteArticle = async (articleId: string) => {
  const { userId } = await auth();
  if (!userId) {
    return { errors: { formErrors: ["You have to login first"] } };
  }

  // Fetch article along with the author's clerkUserId in a single query
  const existingArticle = await prisma.articles.findUnique({
    where: { id: articleId },
    select: { authorId: true, author: { select: { clerkUserId: true } } },
  });

  if (!existingArticle) {
    return { errors: { formErrors: ["Article not found"] } };
  }

  if (existingArticle.author?.clerkUserId !== userId) {
    return { errors: { formErrors: ["You are not authorized to delete this article"] } };
  }

  await prisma.articles.delete({ where: { id: articleId } });
  revalidatePath("/dashboard");

  return { success: true };
};
