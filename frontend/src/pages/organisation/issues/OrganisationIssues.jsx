import React, { useEffect, useState } from "react";
import { getOrganisationIssues } from "../../../services/issue";
import { useNavigate } from "react-router-dom";
import IssueCard from "./components/IssueCard";
import IssueDetails from "./components/IssueDetails";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, X } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import UpdateStatusModal from "./components/UpdateStatusModal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";

const OrganisationIssues = () => {
  const [issues, setIssues] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [urgencyFilter, setUrgencyFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const containerRef = useRef(null);
  const observer = useRef();
  const navigate = useNavigate();

  const lastIssueElementRef = React.useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore],
  );

  const fetchIssues = async (pageNum = 1) => {
    setLoading(true);
    try {
      const data = await getOrganisationIssues({
        page: pageNum,
        status: statusFilter,
        urgency: urgencyFilter,
        sortBy,
      });

      if (pageNum === 1) {
        setIssues(data.issues);
      } else {
        setIssues((prev) => {
          // Filter out any duplicates just in case
          const newIssues = data.issues.filter(
            (newIssue) =>
              !prev.some((existing) => existing._id === newIssue._id),
          );
          return [...prev, ...newIssues];
        });
      }

      setHasMore(data.page < data.totalPages);

      // Update selectedIssue if it's currently open and found in the new batch (mostly relevant for refresh)
      if (selectedIssue?._id) {
        const updatedIssue = data.issues.find(
          (i) => i._id === selectedIssue._id,
        );
        if (updatedIssue) {
          setSelectedIssue(updatedIssue);
        }
      }
    } catch (error) {
      console.error("Failed to fetch issues", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    fetchIssues(1);
  }, [statusFilter, urgencyFilter, sortBy]);

  useEffect(() => {
    if (page > 1) fetchIssues(page);
  }, [page]);

  // Handler for when an issue status is updated - refresh the list (reset to page 1)
  const handleIssueUpdate = () => {
    setPage(1);
    fetchIssues(1);
  };

  useGSAP(() => {
    if (selectedIssue._id && containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { y: "10%", opacity: 0, backdropFilter: "blur(20px)" },
        {
          y: 0,
          opacity: 1,
          duration: 0.3,
          scale: 1,
          ease: "power3.out",
          filter: "blur(0px)",
          backdropFilter: "blur(20px)",
        },
      );
    }
  }, [selectedIssue]);

  const handleClose = () => {
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        y: "10%",
        opacity: 0,
        duration: 0.3,
        filter: "blur(20px)",
        ease: "power3.in",
        onComplete: () => setSelectedIssue({}),
      });
    } else {
      setSelectedIssue({});
    }
  };
  return (
    <div className="p-5">
      {/* Back Button */}
      <Button variant="outline" className="mb-5" onClick={() => navigate(-1)}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <h1 className="text-2xl font-bold">Browse Issues</h1>
      <p className="text-muted-foreground mt-2 text-sm">
        View and track issues reported by the community.
      </p>

      {loading && issues.length === 0 && (
        <div className="flex h-[50vh] w-full items-center justify-center">
          <Spinner className="size-10 text-primary" />
        </div>
      )}

      {/* Filters */}

      <div className="mt-5">
        <h1 className="text-xl font-bold mb-2">Filters</h1>
        <div className="flex flex-wrap gap-4 mb-6">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
          <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
            <SelectTrigger className="">
              <SelectValue placeholder="Urgency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Urgencies</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="priority">Priority Score</SelectItem>
              <SelectItem value="votes">Most Voted</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pb-24 max-w-7xl mx-auto">
        {issues.map((issue, index) => {
          if (issues.length === index + 1) {
            return (
              <div ref={lastIssueElementRef} key={issue._id}>
                <IssueCard issue={issue} setSelectedIssue={setSelectedIssue} />
              </div>
            );
          } else {
            return (
              <IssueCard
                key={issue._id}
                issue={issue}
                setSelectedIssue={setSelectedIssue}
              />
            );
          }
        })}
        {loading && (
          <div className="flex justify-center py-4">
            <Spinner className="text-primary" />
          </div>
        )}
        {!hasMore && issues.length > 0 && (
          <div className="text-center py-4 text-muted-foreground">
            No more issues
          </div>
        )}
      </div>

      {selectedIssue._id && (
        <div
          ref={containerRef}
          className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-[95%] md:w-[800px] max-h-[95vh] overflow-y-auto rounded-3xl shadow-2xl no-scrollbar blur-xl"
        >
          <div className="relative">
            <Button
              variant="secondary"
              size="icon"
              className="absolute top-4 right-4 z-10 h-8 w-8 rounded-full bg-neutral-800/50 hover:bg-neutral-700/80 backdrop-blur-md border border-neutral-700/50"
              onClick={handleClose}
            >
              <X size={14} />
            </Button>
            <IssueDetails
              issue={selectedIssue}
              setIsModalOpen={setIsModalOpen}
            />
          </div>
        </div>
      )}

      <div>
        <UpdateStatusModal
          issue={selectedIssue}
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          onSuccess={handleIssueUpdate}
        />
      </div>
    </div>
  );
};

export default OrganisationIssues;
