"use server";

import { prisma } from "@/lib/prisma";

export async function fetchDashboardStats() {
  try {
    const [articles, totalComments, totalLikes, users] = await Promise.all([
      prisma.articles.count(),
      prisma.comment.count(),
      prisma.like.count(),
      prisma.user.count(),
    ]);

    return {
      articles,
      totalComments,
      totalLikes,
      users,
    };
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw new Error("Failed to fetch dashboard data");
  }
}
