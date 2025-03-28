import type { Prisma } from "@prisma/client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { formatDistanceToNow, format } from "date-fns";

type CommentListProps = {
  comments: Prisma.CommentGetPayload<{
    include: {
      author: {
        select: {
          name: true;
          email: true;
          imageUrl: true;
        };
      };
    };
  }>[];
};

const CommentList: React.FC<CommentListProps> = ({ comments }) => {

  const getFormattedTime = (date: Date) => {
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      // Show relative time if less than 24 hours old
      return formatDistanceToNow(date, { addSuffix: true });
    } else {
      // Show exact date and time if older than 24 hours
      return format(date, "MMM dd, yyyy h:mm a");
    }
  };

  return (
    <div className="space-y-8">
      {comments
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .map((comment) => (
          <div key={comment.id} className="flex gap-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={comment.author.imageUrl as string} />
              <AvatarFallback>{comment.author.name}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="mb-2">
                <span className="font-medium text-foreground">
                  {comment.author.name}
                </span>
                <span className="text-sm text-muted-foreground ml-2">
                  {getFormattedTime(new Date(comment.createdAt))}
                </span>
              </div>
              <p className="text-muted-foreground">{comment.body}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default CommentList;
