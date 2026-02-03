import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ArrowUpFromDot,
  Clock3,
  MapPin,
  MessageCircle,
  Sparkles,
  ArrowUpRight,
  ThumbsUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { toast } from "sonner";
const IssueCard = ({ issue }) => {
  if (!issue) return null;

  return (
    <div className="group relative border border-neutral-800 bg-neutral-900/40 backdrop-blur-md rounded-3xl p-5 hover:border-neutral-700 hover:bg-neutral-900/60 transition-all duration-300">
      <div className="absolute top-4 right-4 text-neutral-500 opacity-0 group-hover:opacity-100 transition-opacity">
        <ArrowUpRight size={20} />
      </div>

      <div className="flex items-center gap-3 mb-4">
        <Avatar className="h-10 w-10 border border-neutral-700">
          <AvatarImage src="" alt="shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-sm font-medium text-neutral-200">Username</h1>
        </div>
        <Badge
          variant="outline"
          className="ml-auto border-neutral-800 bg-neutral-900/50 text-neutral-400"
        >
          {issue.category}
        </Badge>
      </div>

      <div className="space-y-2">
        <h1 className="text-xl font-bold bg-linear-to-r from-white to-neutral-400 bg-clip-text text-transparent">
          {issue.title}
        </h1>

        <p className=" text-sm text-neutral-400 leading-relaxed">
          {issue.description}
        </p>
      </div>

      <div className="mt-4 p-3 rounded-xl bg-indigo-500/5 border border-indigo-500/10 group-hover:bg-indigo-500/10 transition-colors">
        <h1 className="flex items-center gap-2 text-indigo-400 text-xs font-semibold mb-2">
          <Sparkles size={14} className="animate-pulse" /> AI Summary
        </h1>
        <p className="text-sm text-neutral-300 ">{issue.aiAnalysis?.summary}</p>
      </div>

      <div className="mt-5 flex items-center justify-between pt-4 border-t border-neutral-800/50">
        <div className="flex items-center gap-4 text-xs text-neutral-500">
          <div className="flex items-center gap-1.5">
            <MapPin size={14} />
            <span>Sector 12</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock3 size={14} />
            <span>2d</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueCard;
