import React, { useEffect, useState } from "react";
import PersonalInfo from "./components/PersonalInfo";
import { getOrganisationProfile } from "../../../services/organisation";
import AdditionalInfo from "./components/AdditionalInfo";
import { Button } from "@/components/ui/button";
import { LogOut, Pencil } from "lucide-react";

const OrganisationProfile = () => {
  const [org, setOrg] = useState({});

  const fetchOrgProfile = async () => {
    try {
      const res = await getOrganisationProfile();
      setOrg(res.data.organisation);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrgProfile();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Profile</h1>

      <div className="mt-5">
        <PersonalInfo org={org} />
        <AdditionalInfo org={org} />
      </div>

      <div className="mt-5">
        <Button variant="outline" className="rounded-xl p-6 w-full">
          <Pencil />
          Edit Profile
        </Button>

        <Button variant="destructive" className="rounded-xl p-6 w-full mt-4">
          <LogOut />
          LogOut
        </Button>
      </div>
    </div>
  );
};

export default OrganisationProfile;
