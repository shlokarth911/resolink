import React from "react";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

const Annonymity = ({ user }) => {
  return (
    <div className="mt-10">
      <Field orientation="horizontal">
        <FieldContent>
          <FieldLabel
            className="text-lg font-semibold"
            htmlFor="switch-focus-mode"
          >
            Annonymity
          </FieldLabel>
          <FieldDescription className="text-sm">
            Raise issues anonymously
          </FieldDescription>
        </FieldContent>
        <Switch
          id="switch-focus-mode"
          size="default"
          className="scale-125"
          checked={!!user?.isAnonymousByDefault}
        />
      </Field>
    </div>
  );
};

export default Annonymity;
