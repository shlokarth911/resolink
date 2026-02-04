import React, { useEffect, useState } from "react";
import { getOrganisationIssues } from "../../../services/issue";
import { useNavigate } from "react-router-dom";
import IssueCard from "./components/IssueCard";
import IssueDetails from "./components/IssueDetails";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import UpdateStatusModal from "./components/UpdateStatusModal";

const OrganisationIssues = () => {
  const [issues, setIssues] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const containerRef = useRef(null);
  const navigate = useNavigate();

  const fetchIssues = async () => {
    const issues = await getOrganisationIssues();
    setIssues(issues);
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
      <h1 className="text-2xl font-bold">Browse Issues</h1>
      <p className="text-muted-foreground mt-2 text-sm">
        View and track issues reported by the community.
      </p>

      <div className="mt-5 flex flex-col gap-5 pb-24">
        {issues.map((issue) => (
          <IssueCard
            key={issue._id}
            issue={issue}
            setSelectedIssue={setSelectedIssue}
          />
        ))}
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
        />
      </div>
    </div>
  );
};

export default OrganisationIssues;
