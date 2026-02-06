import React from "react";
import {
  Clock3,
  MapPin,
  Sparkles,
  AlertTriangle,
  ArrowUpRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { upvoteIssue } from "../../../../services/issue";

const IssueCard = ({ issue, setSelectedIssue }) => {
  const calculatePostedAgo = (dateString) => {
    const created = new Date(dateString);
    const now = new Date();
    const diffInMs = now - created;
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

    if (diffInHours < 24) {
      if (diffInHours === 0) return "Just now";
      return `${diffInHours} hours ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} days ago`;
    }
  };

  const postedAgo = calculatePostedAgo(issue.createdAt);

  const getUrgencyColor = (urgency) => {
    switch (urgency?.toLowerCase()) {
      case "high":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      case "medium":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "low":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      default:
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
    }
  };

  return (
    <div
      onClick={() => setSelectedIssue(issue)}
      className="group relative border border-neutral-800 bg-neutral-900/40 backdrop-blur-md rounded-3xl p-5 md:p-6 cursor-pointer hover:border-neutral-700 hover:bg-neutral-900/60 hover:scale-[1.02] transition-all duration-300 overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <ArrowUpRight className="text-neutral-500" size={20} />
      </div>

      <div className="flex items-start justify-between mb-3">
        <div className="flex gap-2">
          <Badge
            variant="outline"
            className={`${getUrgencyColor(issue.aiAnalysis?.urgency)} border-0`}
          >
            {issue.aiAnalysis?.urgency || "Normal"}
          </Badge>
          <Badge
            variant="secondary"
            className="bg-neutral-800 text-neutral-400 font-normal"
          >
            {issue.category}
          </Badge>
        </div>
      </div>

      <div className="space-y-2">
        <h1 className="text-xl font-bold bg-linear-to-r from-white to-neutral-400 bg-clip-text text-transparent truncate pr-8">
          {issue.title}
        </h1>

        <p className="text-sm text-neutral-400 line-clamp-2 leading-relaxed">
          {issue.description}
        </p>
      </div>

      {issue.aiAnalysis?.summary && (
        <div className="mt-4 p-3 rounded-xl bg-indigo-500/5 border border-indigo-500/10 group-hover:bg-indigo-500/10 transition-colors">
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-medium mb-1.5">
            <Sparkles size={14} />
            AI Summary
          </div>
          <p className="text-sm text-neutral-300 line-clamp-2">
            {issue.aiAnalysis.summary}
          </p>
        </div>
      )}

      <div className="mt-5 flex items-center justify-between pt-4 border-t border-neutral-800/50">
        <div className="flex items-center gap-4 text-xs text-neutral-500">
          <div className="flex items-center gap-1.5">
            <MapPin size={14} />
            <span className="max-w-[100px] truncate">
              {issue.location || "N/A"}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock3 size={14} />
            <span>{postedAgo}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-neutral-400">
            Score: {issue.priorityScore}
          </span>
          <Badge
            className={
              issue.status === "open"
                ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
                : "bg-neutral-800"
            }
          >
            {issue.status}
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default IssueCard;
