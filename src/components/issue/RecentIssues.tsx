// "use client";
// import { useIssueStore } from "@/store/issueStore";
// import Link from "next/link";

// // Priority configuration
// const priorityConfig = {
//   0: {
//     label: "No priority",
//     color: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
//     icon: "○",
//   },
//   1: {
//     label: "Urgent",
//     color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
//     icon: "⚠️",
//   },
//   2: {
//     label: "High",
//     color:
//       "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
//     icon: "↑",
//   },
//   3: {
//     label: "Normal",
//     color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
//     icon: "·",
//   },
//   4: {
//     label: "Low",
//     color:
//       "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
//     icon: "↓",
//   },
// };

// // Status configuration
// const statusConfig = {
//   backlog: {
//     label: "Backlog",
//     color: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
//   },
//   todo: {
//     label: "Todo",
//     color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
//   },
//   in_progress: {
//     label: "In Progress",
//     color:
//       "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
//   },
//   in_review: {
//     label: "In Review",
//     color:
//       "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
//   },
//   done: {
//     label: "Done",
//     color:
//       "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
//   },
// };

// export default function RecentIssues() {
//   const { issues, isLoading } = useIssueStore();

//   if (isLoading) {
//     return (
//       <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
//         <div className="mb-4 flex items-center justify-between">
//           <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//             Recent Issues
//           </h3>
//           <div className="h-5 w-16 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
//         </div>
//         <div className="space-y-3">
//           {[...Array(3)].map((_, i) => (
//             <div
//               key={i}
//               className="h-16 w-full animate-pulse rounded bg-gray-100 dark:bg-gray-800"
//             />
//           ))}
//         </div>
//       </div>
//     );
//   }

//   if (issues.length === 0) {
//     return (
//       <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
//         <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
//           Recent Issues
//         </h3>
//         <p className="text-gray-500 dark:text-gray-400">
//           No issues yet. Create an issue from a project page.
//         </p>
//       </div>
//     );
//   }

//   const recentIssues = issues.slice(0, 5);

//   return (
//     <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
//       <div className="mb-4 flex items-center justify-between">
//         <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//           Recent Issues
//         </h3>
//         <Link href="/issues" className="text-sm text-[#0066ff] hover:underline">
//           View all
//         </Link>
//       </div>
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
//           <thead>
//             <tr className="text-left text-sm text-gray-500 dark:text-gray-400">
//               <th className="pb-3 pr-4 font-medium">Title</th>
//               <th className="pb-3 pr-4 font-medium">Status</th>
//               <th className="pb-3 pr-4 font-medium">Priority</th>
//               <th className="pb-3 pr-4 font-medium">Assignee</th>
//               <th className="pb-3 font-medium">Due date</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
//             {recentIssues.map((issue) => {
//               const priority =
//                 priorityConfig[issue.priority] || priorityConfig[0];
//               const status = statusConfig[issue.status] || statusConfig.backlog;
//               const assigneeInitial =
//                 issue.assignee?.username?.[0]?.toUpperCase() || "?";

//               return (
//                 <tr
//                   key={issue.id}
//                   className="group cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
//                 >
//                   <td className="py-3 pr-4">
//                     <Link
//                       href={`/issue/${issue.id}`}
//                       className="font-medium text-gray-900 hover:text-[#0066ff] dark:text-white dark:hover:text-[#0066ff]"
//                     >
//                       {issue.title}
//                     </Link>
//                   </td>
//                   <td className="py-3 pr-4">
//                     <span
//                       className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${status.color}`}
//                     >
//                       {status.label}
//                     </span>
//                   </td>
//                   <td className="py-3 pr-4">
//                     <span
//                       className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${priority.color}`}
//                     >
//                       <span>{priority.icon}</span>
//                       {priority.label}
//                     </span>
//                   </td>
//                   <td className="py-3 pr-4">
//                     <div className="flex items-center gap-2">
//                       <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300">
//                         {assigneeInitial}
//                       </div>
//                       <span className="text-sm text-gray-700 dark:text-gray-300">
//                         {issue.assignee?.username || "Unassigned"}
//                       </span>
//                     </div>
//                   </td>
//                   <td className="py-3 text-sm text-gray-600 dark:text-gray-400">
//                     {issue.due_date
//                       ? new Date(issue.due_date).toLocaleDateString()
//                       : "—"}
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
