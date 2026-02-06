import React from "react";
import HomePageHeader from "./components/HomePageHeader";
import PrimaryCallToActions from "./components/PrimaryCallToActions";
import RecentIssues from "./components/RecentIssues";
import { getUserProfile } from "../../../services/user";
import { useEffect } from "react";
import { useState } from "react";
import { getIssueFeed } from "../../../services/issue";

import { Spinner } from "@/components/ui/spinner";

const UserHomePage = () => {
  const [name, setname] = useState("");
  const [issues, setIssues] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchProfile = async () => {
    try {
      const res = await getUserProfile();

      setname(res?.user?.name);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchIssueFeed = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const res = await getIssueFeed(page);
      if (res.issues.length === 0) {
        setHasMore(false);
      } else {
        setIssues((prev) => [...prev, ...res.issues]);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchIssueFeed();
  }, []);

  return (
    <div className="p-5 max-w-7xl mx-auto space-y-8">
      {initialLoading ? (
        <div className="flex h-[80vh] w-full items-center justify-center">
          <Spinner className="size-10 text-primary" />
        </div>
      ) : (
        <>
          <HomePageHeader name={name} />
          <PrimaryCallToActions />
          <RecentIssues
            issues={issues}
            fetchMore={fetchIssueFeed}
            hasMore={hasMore}
            loading={loading}
          />
        </>
      )}
    </div>
  );
};

export default UserHomePage;
