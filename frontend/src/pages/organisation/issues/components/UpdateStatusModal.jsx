import React, { useEffect } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Check, CircleAlert, CircleCheckBig, Clock } from "lucide-react";
import { toast } from "sonner";
import { updateIssueStatus } from "../../../../services/issue";

const UpdateStatusModal = ({ open, onOpenChange, issue, onSuccess }) => {
  const [status, setStatus] = React.useState(issue?.status || "open");

  useEffect(() => {
    if (issue?.status) {
      setStatus(issue.status);
    }
  }, [issue, open]);

  const updateStatus = async (status) => {
    try {
      let res = await updateIssueStatus(issue._id, status);

      if (res.success) {
        toast.success("Issue status updated successfully");
        if (onSuccess) onSuccess();
      } else {
        toast.error("Failed to update issue status");
      }

      onOpenChange(false);
    } catch (error) {
      console.error("Error updating issue status:", error);
      toast.error("An error occurred while updating status");
    }
  };

  return (
    <>
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="text-lg">Update Status</DrawerTitle>
            <DrawerDescription>
              Update the status of the issue.
              <div className="mt-5">
                <RadioGroup
                  value={status}
                  onValueChange={setStatus}
                  className="max-w-sm"
                >
                  <FieldLabel htmlFor="open-status">
                    <Field orientation="horizontal">
                      <FieldContent>
                        <FieldTitle className="text-base">
                          <CircleAlert size={20} /> Open
                        </FieldTitle>
                      </FieldContent>
                      <RadioGroupItem value="open" id="open-status" />
                    </Field>
                  </FieldLabel>
                  <FieldLabel htmlFor="progress-status">
                    <Field orientation="horizontal">
                      <FieldContent>
                        <FieldTitle className="text-base">
                          <Clock size={20} /> In Progress
                        </FieldTitle>
                      </FieldContent>
                      <RadioGroupItem
                        value="in_progress"
                        id="progress-status"
                      />
                    </Field>
                  </FieldLabel>
                  <FieldLabel htmlFor="resolved-status">
                    <Field orientation="horizontal">
                      <FieldContent>
                        <FieldTitle className="text-base">
                          <CircleCheckBig size={20} /> Resolved
                        </FieldTitle>
                      </FieldContent>
                      <RadioGroupItem value="resolved" id="resolved-status" />
                    </Field>
                  </FieldLabel>
                </RadioGroup>
              </div>
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button
              className="w-full text-base p-6 rounded-xl"
              onClick={() => updateStatus(status)}
            >
              Update
            </Button>
            <DrawerClose>
              <Button
                className="mt-2 w-full text-base p-6 rounded-xl"
                variant="outline"
              >
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default UpdateStatusModal;
