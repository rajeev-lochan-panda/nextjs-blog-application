// "use client";

// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import {
//   PlusCircle,
//   FileText,
//   MessageCircle,
//   ThumbsUp,
//   Users,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   PieChart,
//   Pie,
//   Cell,
// } from "recharts";
// import { fetchDashboardStats } from "@/actions/analytics";

// const DashboardAnalytics = () => {
//   const [data, setData] = useState({
//     articles: 0,
//     totalComments: 0,
//     totalLikes: 0,
//     users: 0,
//   });

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const stats = await fetchDashboardStats();
//         setData(stats);
//       } catch (error) {
//         console.error("Failed to load dashboard stats:", error);
//       }
//     };

//     loadData();
//   }, []);

//   const colors = ["#4f46e5", "#22c55e", "#f43f5e", "#ff9800"];

//   return (
//     <main className="flex-1 p-4 md:p-8">
//       <div className="flex justify-between items-center mb-8">
//         <div>
//           <h1 className="text-3xl font-bold text-foreground">Blog Dashboard</h1>
//           <p className="text-muted-foreground">
//             Manage your content and analytics
//           </p>
//         </div>
//         <Link href={"/dashboard/articles/create"}>
//           <Button className="gap-2">
//             <PlusCircle className="h-4 w-4" />
//             New Article
//           </Button>
//         </Link>
//       </div>

//       {/* Quick Stats */}
//       <div className="grid gap-4 md:grid-cols-4 mb-8">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium">Articles</CardTitle>
//             <FileText className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{data.articles}</div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium">Comments</CardTitle>
//             <MessageCircle className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{data.totalComments}</div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium">Likes</CardTitle>
//             <ThumbsUp className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{data.totalLikes}</div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium">Visitors</CardTitle>
//             <Users className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{data.users}</div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Graphs */}
//       <div className="grid gap-6 md:grid-cols-2">
//         {/* Bar Chart for Articles */}
//         <Card className="p-4">
//           <CardHeader>
//             <CardTitle className="text-lg font-medium">
//               Articles Published
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <ResponsiveContainer width="100%" height={250}>
//               <BarChart data={[{ name: "Articles", value: data.articles }]}>
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar dataKey="value" fill={colors[0]} radius={[5, 5, 0, 0]} />
//               </BarChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>

//         {/* Line Chart for Comments */}
//         <Card className="p-4">
//           <CardHeader>
//             <CardTitle className="text-lg font-medium">Comment Trend</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <ResponsiveContainer width="100%" height={250}>
//               <LineChart
//                 data={[{ name: "Comments", value: data.totalComments }]}
//               >
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Line
//                   type="monotone"
//                   dataKey="value"
//                   stroke={colors[1]}
//                   strokeWidth={2}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>

//         {/* Pie Chart for Likes */}
//         <Card className="p-4">
//           <CardHeader>
//             <CardTitle className="text-lg font-medium">
//               Likes Distribution
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <ResponsiveContainer width="100%" height={250}>
//               <PieChart>
//                 <Pie
//                   data={[{ name: "Likes", value: data.totalLikes }]}
//                   dataKey="value"
//                   cx="50%"
//                   cy="50%"
//                   outerRadius={80}
//                   fill={colors[2]}
//                 >
//                   <Cell fill={colors[2]} />
//                 </Pie>
//                 <Tooltip />
//               </PieChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>

//         {/* Bar Chart for Visitors */}
//         <Card className="p-4">
//           <CardHeader>
//             <CardTitle className="text-lg font-medium">
//               Visitors Overview
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <ResponsiveContainer width="100%" height={250}>
//               <BarChart data={[{ name: "Users", value: data.users }]}>
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar dataKey="value" fill={colors[3]} radius={[5, 5, 0, 0]} />
//               </BarChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>
//       </div>
//     </main>
//   );
// };

// export default DashboardAnalytics;

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { fetchDashboardStats } from "@/actions/analytics";

const DashboardAnalytics = () => {
  const [data, setData] = useState({
    articles: 0,
    totalComments: 0,
    totalLikes: 0,
    users: 0,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const stats = await fetchDashboardStats();
        setData(stats);
      } catch (error) {
        console.error("Failed to load dashboard stats:", error);
      }
    };

    loadData();
  }, []);

  const colors = ["#4f46e5", "#22c55e", "#f43f5e", "#ff9800"];
  const pieData = [
    { name: "Articles", value: data.articles },
    { name: "Comments", value: data.totalComments },
    { name: "Likes", value: data.totalLikes },
    { name: "Users", value: data.users },
  ];

  return (
    <main className="flex-1 p-4 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Blog Dashboard</h1>
          <p className="text-muted-foreground">Manage your content and analytics</p>
        </div>
        <Link href={"/dashboard/articles/create"}>
          <Button className="gap-2">
            <PlusCircle className="h-4 w-4" />
            New Article
          </Button>
        </Link>
      </div>

      {/* Pie Chart for All Data */}
      <Card className="p-4">
        <CardHeader>
          <CardTitle className="text-lg font-medium">Analytics Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                // label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </main>
  );
};

export default DashboardAnalytics;
