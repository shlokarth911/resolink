import {
  Clock3,
  MapPin,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Timer,
  Building2,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";

const IssueDetails = ({ issue }) => {
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
    <div className="rounded-3xl border border-neutral-800 bg-black/40 backdrop-blur-xl overflow-hidden p-6 space-y-6">
      {/* Header Section */}
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold bg-linear-to-r from-white to-gray-400 bg-clip-text text-transparent">
              {issue.title}
            </h1>
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(
                  issue.aiAnalysis?.urgency,
                )}`}
              >
                {issue.aiAnalysis?.urgency || "Normal"} Urgency
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium border border-neutral-700 bg-neutral-800/50 text-neutral-300">
                {issue.category}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium border border-neutral-700 bg-neutral-800/50 text-neutral-300">
                Score: {issue.priorityScore}
              </span>
            </div>
          </div>
        </div>

        <p className="text-neutral-400 text-base leading-relaxed">
          {issue.description}
        </p>

        <div className="flex items-center gap-4 text-sm text-neutral-500 border-t border-neutral-800/50 pt-4">
          <div className="flex items-center gap-1.5">
            <MapPin size={14} />
            <span>{issue.location || "Location N/A"}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock3 size={14} />
            <span>{calculatePostedAgo(issue.createdAt)}</span>
          </div>
        </div>
      </div>
      {/* AI Summary Card */}
      <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-4 relative overflow-hidden group">
        <div className="absolute inset-0 bg-linear-to-br from-indigo-500/10 via-purple-500/5 to-transparent opacity-50" />
        <div className="relative">
          <h2 className="flex items-center gap-2 text-indigo-400 font-semibold mb-3">
            <Sparkles size={18} className="animate-pulse" />
            AI Analysis
          </h2>
          <p className="text-neutral-300 text-sm leading-relaxed">
            {issue.aiAnalysis?.summary || "Analysis in progress..."}
          </p>
        </div>
      </div>
      {/* Upvotes */}

      <div className="flex items-center gap-3 p-4 rounded-2xl bg-neutral-800/30 border border-neutral-800/50">
        <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
          <ThumbsUp size={20} />
        </div>
        <div>
          <div className="text-lg font-bold text-neutral-200">
            {issue.upvotes || 0}
          </div>
          <div className="text-xs text-neutral-500 uppercase tracking-widest font-medium">
            Total Upvotes
          </div>
        </div>
      </div>

      {/* Metadata Footer */}
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-neutral-800">
        <div className="space-y-1">
          <span className="text-xs text-neutral-500 uppercase tracking-widest font-medium">
            Responsible Entity
          </span>
          <div className="flex items-center gap-2 text-base font-medium text-neutral-200">
            <Building2 size={16} className="text-neutral-400" />
            {issue.aiSolutions?.responsibleEntity || "Pending Assignment"}
          </div>
        </div>
        <div className="space-y-1">
          <span className="text-xs text-neutral-500 uppercase tracking-widest font-medium">
            Est. Resolution
          </span>
          <div className="flex items-center gap-2 text-base font-medium text-neutral-200">
            <Timer size={16} className="text-neutral-400" />
            {issue.aiSolutions?.estimatedResolutionTime || "TBD"}
          </div>
        </div>
      </div>
      <div className="flex items-start gap-2 p-3 rounded-lg bg-orange-500/5 border border-orange-500/10 text-orange-400/80 text-xs mt-2">
        <AlertTriangle size={14} className="shrink-0 mt-0.5" />
        <p>
          This plan is generated by AI based on historical data and current
          parameters. Official municipal response times may vary.
        </p>
      </div>
    </div>
  );
};

export default IssueDetails;
