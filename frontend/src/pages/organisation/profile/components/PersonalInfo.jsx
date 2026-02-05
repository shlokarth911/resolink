import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

const PersonalInfo = ({ org }) => {
  return (
    <div>
      <div className="mt-5">
        <div className="flex items-center gap-4">
          <Avatar className="size-20">
            <AvatarImage src="" alt="shadcn" />
            <AvatarFallback>{org?.name?.[0]?.toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col justify-between w-full">
            <h2 className="text-lg font-semibold">{org?.name}</h2>
            <p className="text-sm text-muted-foreground">{org?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
