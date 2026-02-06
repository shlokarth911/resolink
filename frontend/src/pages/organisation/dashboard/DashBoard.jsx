import React, { useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";
import DashBoardHeader from "./components/DashBoardHeader";
import DashBoardStatistics from "./components/DashBoardStatistics";
import TopIssues from "./components/TopIssues";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { getIssueCount, getOrganisationIssues } from "../../../services/issue";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const DashBoard = () => {
  const [issues, setIssues] = useState([]);
  const [highPriorityIssues, setHighPriorityIssues] = useState([]);
  const [totalIssues, setTotalIssues] = useState(0);
  const [openIssues, setOpenIssues] = useState(0);
  const [inProgressIssues, setInProgressIssues] = useState(0);
  const [resolvedIssues, setResolvedIssues] = useState(0);
  const [initialLoading, setInitialLoading] = useState(true);

  const navigate = useNavigate();

  const fetchOrgIssues = async () => {
    try {
      const issues = await getIssueCount();

      setTotalIssues(issues?.totalIssues);
      setOpenIssues(issues?.openIssues);
      setInProgressIssues(issues?.inProgressIssues);
      setResolvedIssues(issues?.resolvedIssues);
    } catch (error) {
      console.log(error);
    } finally {
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    fetchOrgIssues();
  }, []);

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <DashBoardHeader />
      {initialLoading ? (
        <div className="flex h-[50vh] w-full items-center justify-center">
          <Spinner className="size-10 text-primary" />
        </div>
      ) : (
        <>
          <DashBoardStatistics
            totalIssues={totalIssues}
            openIssues={openIssues}
            inProgressIssues={inProgressIssues}
            resolvedIssues={resolvedIssues}
          />

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button className="text-base p-6 rounded-2xl">
              <Link to="/org/issues" className="w-full ">
                Browse All Issues
              </Link>
            </Button>

            <Button className="text-base p-6 rounded-2xl" variant="outline">
              <Link to="/org/analysis" className="w-full ">
                AI Analysis
              </Link>
            </Button>
          </div>

          <TopIssues issues={highPriorityIssues} />
        </>
      )}
    </div>
  );
};

export default DashBoard;
