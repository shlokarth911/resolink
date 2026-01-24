import React from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import IssueCard from "./components/IssueCard";

const UserIssues = () => {
  const navigate = useNavigate();

  return (
    <div className="p-5 max-w-4xl mx-auto">
      <div>
        <Button variant="ghost" onClick={() => navigate("/user/home")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>

      <div className="pt-6">
        <h1 className="text-3xl font-semibold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent inline-block">
          Browse Issues
        </h1>
        <p className="text-muted-foreground mt-2 text-sm">
          View and track issues reported by the community.
        </p>
      </div>

      <div className="mt-5 flex flex-col gap-5">
        <IssueCard />
      </div>
    </div>
  );
};

export default UserIssues;
