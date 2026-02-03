import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, CircleAlert, Clock, TableCellsSplit } from "lucide-react";

const DashBoardStatistics = ({
  totalIssues,
  openIssues,
  inProgressIssues,
  resolvedIssues,
}) => {
  const issueCount = [
    {
      title: "Total Issues",
      value: totalIssues,
      icon: <TableCellsSplit className="w-5 h-5 text-blue-400" />,
      gradient: "from-zinc-900 to-zinc-800/50",
    },
    {
      title: "Open",
      value: openIssues,
      icon: <CircleAlert className="w-5 h-5 text-red-400" />,
      gradient: "from-zinc-900 to-zinc-800/50",
    },
    {
      title: "In Progress",
      value: inProgressIssues,
      icon: <Clock className="w-5 h-5 text-amber-400" />,
      gradient: "from-zinc-900 to-zinc-800/50",
    },
    {
      title: "Resolved",
      value: resolvedIssues,
      icon: <CheckCircle className="w-5 h-5 text-emerald-400" />,
      gradient: "from-zinc-900 to-zinc-800/50",
    },
  ];

  return (
    <div className="mt-10">
      <h2 className="text-3xl font-bold tracking-tight mb-6">Statistics</h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {issueCount.map((stat, idx) => (
          <Card
            key={idx}
            className={`relative overflow-hidden border-zinc-800 bg-linear-to-br ${stat.gradient} transition-all duration-300 hover:border-zinc-700 hover:shadow-2xl hover:shadow-black/40 group rounded-4xl outline-none gap-0 py-5`}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-zinc-400 group-hover:text-zinc-200 transition-colors uppercase tracking-wider">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent className="pb-2">
              <div className="text-5xl font-bold tracking-tighter text-white">
                {stat.value}
              </div>
              <p className="text-xs text-zinc-500 mt-2 flex items-center gap-1">
                <span className="text-emerald-400 font-medium">↑ 2.5%</span>
                <span className="opacity-70">since last week</span>
              </p>
            </CardContent>
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/2 blur-3xl rounded-full" />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashBoardStatistics;
