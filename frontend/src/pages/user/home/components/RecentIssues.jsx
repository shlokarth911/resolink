import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ArrowUpFromDot,
  Clock3,
  MapPin,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import IssueCard from "./IssueCard";

const RecentIssues = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mt-10">Recent Issues</h2>
      <div className="mt-5 flex flex-col gap-5">
        <IssueCard />
      </div>
    </div>
  );
};

export default RecentIssues;
