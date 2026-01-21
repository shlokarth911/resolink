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

const IssueCard = () => {
  return (
    <div className="border rounded-2xl p-4">
      <div className="flex items-center gap-3">
        <Avatar size="sm">
          <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div>
          <h1>Username</h1>
        </div>
      </div>

      <div className="mt-4">
        <h1 className="text-xl font-semibold">
          Garbage not collected for 5 days
        </h1>

        <p className="text-sm text-muted-foreground mt-1">
          Garbage is piling up in Sector 12 causing bad smell
        </p>
      </div>

      <div className="border mt-4 p-3 rounded-lg">
        <h1 className="flex items-center gap-2 border-b pb-2">
          <Sparkles size={20} /> AI Summary
        </h1>

        <p className="text-sm mt-2 p-3 rounded-md bg-gradient-to-br from-blue-900/30 via-indigo-900/30 to-purple-900/30">
          Uncollected garbage in Sector 12 for five days is causing
          accumulation…
        </p>
      </div>

      <div className="mt-4 flex items-center gap-4">
        <div className="flex items-center gap-1">
          <MapPin size={16} className="text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Sector 12</p>
        </div>
        <div className="flex items-center gap-1">
          <Clock3 size={16} className="text-muted-foreground" />
          <p className="text-sm text-muted-foreground">5 days ago</p>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-4">
        <Button variant="outline">
          <ArrowUpFromDot /> UpVote
        </Button>
        <Button variant="outline">
          <MessageCircle /> Comment
        </Button>
      </div>
    </div>
  );
};

export default IssueCard;
