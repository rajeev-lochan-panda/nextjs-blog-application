"use server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const createCommentSchema = z.object({
  body: z.string().min(1, { message: "Comment cannot be empty" }),
});

type CreateCommentFormState = {
  errors: {
    body?: string[];
    formErrors?: string[];
  };
};
export const createComment = async (
  articleId: string,
  prevState: CreateCommentFormState,
  formData: FormData
): Promise<CreateCommentFormState> => {
  const result = createCommentSchema.safeParse({
    body: formData.get("body"),
  });
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }
  const { userId } = await auth();
  if (!userId) {
    return {
      errors: {
        formErrors: ["You have to login first"],
      },
    };
  }
  const existingUser = await prisma.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });
  if (!existingUser) {
    return {
      errors: {
        formErrors: ["User not found. Please register first."],
      },
    };
  }

  try {
    await prisma.comment.create({
      data: {
        body: result.data.body,
        authorId: existingUser.id,
        articleId,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return {
        errors: {
          formErrors: [error.message],
        },
      };
    } else {
      return {
        errors: {
          formErrors: ["Some internal server error occurred."],
        },
      };
    }
  }
  revalidatePath(`/articles/${articleId}`);
  return {
    errors: {},
  };
};
