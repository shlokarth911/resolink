import React, { useEffect, useState, useRef } from "react";
import { ArrowLeft, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import IssueCard from "./components/IssueCard";
import { getUserIssues } from "../../../services/issue";
import IssueDetails from "./components/IssueDetails";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Spinner } from "@/components/ui/spinner";

const UserIssues = () => {
  const [issues, setIssues] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState({});
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  const mainScreenRef = useRef(null);

  const navigate = useNavigate();

  const fetchIssues = async () => {
    try {
      const issues = await getUserIssues();
      setIssues(issues);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

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

      gsap.to(mainScreenRef.current, {
        opacity: 1,
        filter: "blur(10px)",
        duration: 1,
        ease: "power3.out",
      });
    } else {
      gsap.to(mainScreenRef.current, {
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.3,
        ease: "power3.out",
      });
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
    <div className="p-5 max-w-7xl mx-auto">
      <div ref={mainScreenRef}>
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

        {loading ? (
          <div className="flex h-[50vh] w-full items-center justify-center">
            <Spinner className="size-10 text-primary" />
          </div>
        ) : (
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pb-24">
            {issues.map((issue) => (
              <IssueCard
                key={issue._id}
                issue={issue}
                setSelectedIssue={setSelectedIssue}
              />
            ))}
          </div>
        )}
      </div>

      {selectedIssue._id && (
        <div
          ref={containerRef}
          className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-[95%] md:w-[800px] max-h-[95vh] overflow-y-auto rounded-3xl shadow-2xl no-scrollbar"
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
            <IssueDetails issue={selectedIssue} />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserIssues;
