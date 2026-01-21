import React from "react";
import { Button } from "@/components/ui/button";

const PrimaryCallToActions = () => {
  return (
    <div className="mt-10 grid grid-cols-2 gap-4">
      <Button className="text-base p-6 rounded-2xl">Report an Issue</Button>
      <Button className="text-base p-6 rounded-2xl" variant="outline">
        Browse Issues
      </Button>
    </div>
  );
};

export default PrimaryCallToActions;
