import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

const PersonalInfo = ({ user }) => {
  return (
    <div className="mt-5">
      <div className="flex items-center gap-4">
        <Avatar className="size-20">
          <AvatarImage src="" alt="shadcn" />
          <AvatarFallback>{user?.name?.[0]?.toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col justify-between w-full">
          <h2 className="text-lg font-semibold">{user?.name}</h2>
          <p className="text-sm text-muted-foreground">{user?.email}</p>
        </div>
        <Button variant="outline" className="rounded-full">
          <Pencil />
        </Button>
      </div>
    </div>
  );
};

export default PersonalInfo;
