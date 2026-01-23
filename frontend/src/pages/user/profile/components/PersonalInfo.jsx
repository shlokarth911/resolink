import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

const PersonalInfo = () => {
  return (
    <div className="mt-5">
      <div className="flex items-center gap-4">
        <Avatar className="size-20">
          <AvatarImage src="" alt="shadcn" />
          <AvatarFallback>T</AvatarFallback>
        </Avatar>
        <div className="flex flex-col justify-between w-full">
          <h2 className="text-lg font-semibold">Test User</h2>
          <p className="text-sm text-muted-foreground">testuser@gmail.com</p>
        </div>
        <Button variant="outline" className="rounded-full">
          <Pencil />
        </Button>
      </div>
    </div>
  );
};

export default PersonalInfo;
