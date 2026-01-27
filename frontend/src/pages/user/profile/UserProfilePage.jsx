import React from "react";
import { useNavigate } from "react-router-dom";
import PersonalInfo from "./components/PersonalInfo";
import IssueCount from "./components/IssueCount";
import Annonymity from "./components/Annonymity";
import { Button } from "@/components/ui/button";
import { getUserProfile } from "../../../services/user";
import { useEffect, useState } from "react";
import { getUserIssues } from "../../../services/issue";
import { ArrowLeft } from "lucide-react";

const UserProfilePage = () => {
  const [profile, setProfile] = useState({});
  const [issues, setIssues] = useState([]);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const res = await getUserProfile();
      setProfile(res.user);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserIssues = async () => {
    try {
      const res = await getUserIssues();

      setIssues(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchUserIssues();
  }, []);

  return (
    <div className="p-5">
      <div className="mb-5">
        <Button variant="ghost" onClick={() => navigate("/user/home")}>
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
      </div>
      <h2 className="text-2xl font-semibold">Profile</h2>

      {/* PersonalInfo */}
      <PersonalInfo user={profile} />

      {/* IssueCount */}
      <IssueCount issues={issues} />

      {/* Annonymity */}
      <Annonymity user={profile} />
    </div>
  );
};

export default UserProfilePage;
