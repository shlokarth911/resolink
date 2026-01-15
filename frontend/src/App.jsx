import React from "react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./components/mode-toggle";

const App = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <Button>Click me</Button>

      <ModeToggle />
    </div>
  );
};

export default App;
