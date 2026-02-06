import React, { useEffect, useRef } from "react";
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
import { Spinner } from "@/components/ui/spinner";

const RecentIssues = ({ issues, fetchMore, hasMore, loading }) => {
  const observerTarget = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          fetchMore();
        }
      },
      { threshold: 1.0 },
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [hasMore, loading, fetchMore]);
  return (
    <div>
      <h2 className="text-2xl font-bold bg-linear-to-r from-white to-neutral-400 bg-clip-text text-transparent mt-10 mb-6">
        Recent Issues
      </h2>
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {issues.map((issue) => (
          <IssueCard key={issue._id} issue={issue} />
        ))}
        {hasMore && (
          <div ref={observerTarget} className="flex justify-center p-4">
            {loading && <Spinner className="text-primary" />}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentIssues;
