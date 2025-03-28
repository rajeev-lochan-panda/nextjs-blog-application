"use client";
import React, {
  FormEvent,
  startTransition,
  useActionState,
  useState,
  useEffect,
} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import "react-quill-new/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { createArticle } from "@/actions/create-article";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const CreateArticlesPage = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [formState, action, isPending] = useActionState(createArticle, {
    errors: {},
  });

  // Clear specific field errors when input becomes valid
//   useEffect(() => {
//     if (title.length >= 3 && title.length <= 100) {
//       if (formState.errors.title) {
//         delete formState.errors.title;
//       }
//     }
//   }, [title, formState.errors]);

//   useEffect(() => {
//     if (category.length >= 3 && category.length <= 50) {
//       if (formState.errors.category) {
//         delete formState.errors.category;
//       }
//     }
//   }, [category, formState.errors]);

  useEffect(() => {
    if (content.length >= 20) {
      if (formState.errors.content) {
        delete formState.errors.content;
      }
    }
  }, [content, formState.errors]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    formData.append("content", content);

    // Wrap the action call in startTransition
    startTransition(() => {
      action(formData);
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Create New Article</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Article Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Enter article title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {formState.errors.title && title.length === 0 && (
                <span className="font-medium text-sm text-red-500">
                  {formState.errors.title}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="">Select Category</option>
                <option value="technology">Technology</option>
                <option value="programming">Programming</option>
                <option value="web-development">Web Development</option>
              </select>
              {formState.errors.category && category.length === 0 && (
                <span className="font-medium text-sm text-red-500">
                  {formState.errors.category}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="featuredImage">Featured Image</Label>
              <Input
                id="featuredImage"
                name="featuredImage"
                type="file"
                accept="image/*"
              />
              {formState.errors.featuredImage && (
                <span className="font-medium text-sm text-red-500">
                  {formState.errors.featuredImage}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label>Content</Label>
              <ReactQuill theme="snow" value={content} onChange={setContent} />
              {formState.errors.content && (
                <span className="font-medium text-sm text-red-500">
                  {formState.errors.content[0]}
                </span>
              )}
            </div>
            {formState.errors.formErrors && (
              <div className="dark:bg-transparent bg-red-100 p-2 border border-red-600">
                <span className="font-medium text-sm text-red-500">
                  {formState.errors.formErrors}
                </span>
              </div>
            )}
            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline">
                Cancel
              </Button>
              <Button disabled={isPending} type="submit">
                {isPending ? "Loading..." : "Publish Article"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateArticlesPage;
