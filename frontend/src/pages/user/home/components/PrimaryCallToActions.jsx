import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PrimaryCallToActions = () => {
  return (
    <div className="mt-10 grid grid-cols-2 gap-4">
      <Button className="text-base p-6 rounded-2xl">
        <Link to="/user/report" className="w-full ">
          Report an Issue
        </Link>
      </Button>

      <Button className="text-base p-6 rounded-2xl" variant="outline">
        Browse Issues
      </Button>
    </div>
  );
};

export default PrimaryCallToActions;
