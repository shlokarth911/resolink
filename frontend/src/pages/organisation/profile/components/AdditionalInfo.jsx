import React from "react";

const AdditionalInfo = ({ org }) => {
  return (
    <div>
      <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-5 p-5 border rounded-2xl">
        <div>
          <h2 className="text-lg font-semibold">Description</h2>
          <p className="text-sm text-muted-foreground mt-2 ">
            {org?.description}
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Contact Email</h2>
          <p className="text-sm text-muted-foreground mt-2 ">
            {org?.contactEmail}
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Type</h2>
          <p className="text-sm text-muted-foreground mt-2 ">{org?.type}</p>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfo;
