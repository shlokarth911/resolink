import React from "react";
import { Clock3, MapPin, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const IssueCard = ({ issue }) => {
  console.log(issue);

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

  return (
    <div className="border rounded-2xl p-4">
      <div className="mt-4">
        <h1 className="text-xl font-semibold">{issue.title}</h1>

        <p className="text-sm text-muted-foreground mt-1">
          {issue.description}
        </p>
      </div>

      <div className="border mt-4 p-3 rounded-lg">
        <h1 className="flex items-center gap-2 border-b pb-2">
          <Sparkles size={20} /> AI Summary
        </h1>

        <p className="text-sm mt-2 p-3 rounded-md bg-linear-to-br from-blue-900/30 via-indigo-900/30 to-purple-900/30">
          {issue.aiAnalysis?.summary || "No summary available"}
        </p>
      </div>

      <div className="mt-4 flex items-center gap-4">
        <div className="flex items-center gap-1">
          <MapPin size={16} className="text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            {issue.location || "Location not available"}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <Clock3 size={16} className="text-muted-foreground" />
          <p className="text-sm text-muted-foreground">{postedAgo}</p>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-4">
        <Badge>{issue.status}</Badge>
      </div>
    </div>
  );
};

export default IssueCard;
