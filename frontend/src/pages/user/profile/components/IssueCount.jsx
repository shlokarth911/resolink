import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const IssueCount = () => {
  return (
    <div className="mt-5 flex items-center justify-center gap-2">
      <Card className="w-full gap-2 rounded-4xl">
        <CardHeader>
          <CardTitle>Issues Raised</CardTitle>
          <CardDescription>View all issues raised by you</CardDescription>
        </CardHeader>
        <CardContent>
          <h1 className="text-5xl font-semibold">45</h1>
        </CardContent>
      </Card>
      <Card className="w-full gap-2 rounded-4xl">
        <CardHeader>
          <CardTitle>Issues Resolved</CardTitle>
          <CardDescription>Issues resolved by your efforts</CardDescription>
        </CardHeader>
        <CardContent>
          <h1 className="text-5xl font-semibold">45</h1>
        </CardContent>
      </Card>
    </div>
  );
};

export default IssueCount;
