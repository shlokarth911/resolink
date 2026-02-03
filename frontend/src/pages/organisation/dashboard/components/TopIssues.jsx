import React from "react";
import IssueCard from "./IssueCard";

const TopIssues = ({ issues = [] }) => {
  return (
    <div className="mt-10">
      <h2 className="text-3xl font-bold tracking-tight mb-6">
        High Priority Issues
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {issues.length > 0 ? (
          issues.map((issue) => <IssueCard key={issue._id} issue={issue} />)
        ) : (
          <div className="col-span-full py-10 text-center border border-dashed border-zinc-800 rounded-3xl text-zinc-500">
            No issues found for your organisation.
          </div>
        )}
      </div>
    </div>
  );
};

export default TopIssues;
