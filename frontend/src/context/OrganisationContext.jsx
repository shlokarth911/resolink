import React, { createContext, useState } from "react";

export const OrganisationContext = createContext();

export const OrganisationContextProvider = ({ children }) => {
  const [org, setOrg] = useState(null);

  return (
    <OrganisationContext.Provider value={{ org, setOrg }}>
      {children}
    </OrganisationContext.Provider>
  );
};

export default OrganisationContext;
