"use client";
import React, { useTransition } from "react";
import type { Prisma } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Avatar, AvatarImage } from "../ui/avatar";
import { deleteArticle } from "@/actions/delete-article";
import { toast } from "react-hot-toast";


type RecentArticlesProps = {
  articles: Prisma.ArticlesGetPayload<{
    include: {
      comments: true;
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

const RecentArticles: React.FC<RecentArticlesProps> = ({ articles }) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Recent Articles</CardTitle>
          <Link href="/articles">
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              View All →
            </Button>
          </Link>
        </div>
      </CardHeader>
      {!articles.length ? (
        <CardContent>No articles found.</CardContent>
      ) : (
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Author</TableHead>
                <TableHead>Title</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Comments</TableHead>
                <TableHead className="text-center">Date</TableHead>
                <TableHead className="text-center">Time</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {articles.slice(0, 5).map((article) => (
                <TableRow key={article.id}>
                  <TableCell className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={article.author.imageUrl as string} />
                    </Avatar>
                    {article.author.email}
                  </TableCell>
                  <TableCell className="font-medium">{article.title}</TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant={"secondary"}
                      className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800"
                    >
                      Published
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    {article.comments.length}
                  </TableCell>
                  <TableCell className="text-center">
                    {new Date(article.createdAt).toDateString()}
                  </TableCell>
                  <TableCell className="text-center">
                    {new Date(article.createdAt).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </TableCell>

                  <TableCell className="text-center w-25">
                    <div className="flex gap-2">
                      <Link href={`/dashboard/articles/${article.id}/edit`}>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </Link>
                      <DeleteButton articleId={article.id} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      )}
    </Card>
  );
};

export default RecentArticles;

type DeleteButtonProps = {
  articleId: string;
};

const DeleteButton: React.FC<DeleteButtonProps> = ({ articleId }) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    startTransition(async () => {
      const response = await deleteArticle(articleId);

      if (response?.errors?.formErrors?.length) {
        toast.error(response.errors.formErrors[0]); // Show error toast
        return;
      }

      toast.success("Article deleted successfully!"); // Show success toast
      // setTimeout(() => window.location.reload(), 1500); // Refresh page after a delay
    });
  };

  return (
    <div className="flex flex-col items-center">
      <Button disabled={isPending} variant="ghost" size="sm" onClick={handleDelete}>
        {isPending ? "Deleting..." : "Delete"}
      </Button>
    </div>
  );
};

// const DeleteButton: React.FC<DeleteButtonProps> = ({ articleId }) => {
//   const [isPending, startTransition] = useTransition();
//   const [error, setError] = useState<string | null>(null);

//   const handleDelete = async () => {
//     setError(null);
//     startTransition(async () => {
//       const response = await deleteArticle(articleId);

//       if (response?.errors?.formErrors?.length) {
//         setError(response.errors.formErrors[0]);
//         return;
//       }

//       // Optionally: Revalidate the articles list or refresh the page
//       window.location.reload();
//     });
//   };

//   return (
//     <div className="flex flex-col items-center">
//       <Button disabled={isPending} variant="ghost" size="sm" onClick={handleDelete}>
//         {isPending ? "Deleting..." : "Delete"}
//       </Button>
//       {error && (
//         <p className="text-red-500 text-xs mt-1">{error}</p>
//       )}
//     </div>
//   );
// };
