import React from "react";
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

const UpdateStatusModal = ({ open, onOpenChange, issue }) => {
  return (
    <>
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="text-lg">Update Status</DrawerTitle>
            <DrawerDescription>
              Update the status of the issue.
              <div className="mt-5">
                <RadioGroup defaultValue={issue.status} className="max-w-sm ">
                  <FieldLabel htmlFor="plus-plan">
                    <Field orientation="horizontal">
                      <FieldContent>
                        <FieldTitle className="text-base">Open</FieldTitle>
                      </FieldContent>
                      <RadioGroupItem value="open" id="plus-plan" />
                    </Field>
                  </FieldLabel>
                  <FieldLabel htmlFor="pro-plan">
                    <Field orientation="horizontal">
                      <FieldContent>
                        <FieldTitle className="text-base">
                          In Progress
                        </FieldTitle>
                      </FieldContent>
                      <RadioGroupItem value="in_progress" id="pro-plan" />
                    </Field>
                  </FieldLabel>
                  <FieldLabel htmlFor="enterprise-plan">
                    <Field orientation="horizontal">
                      <FieldContent>
                        <FieldTitle className="text-base">Resolved</FieldTitle>
                      </FieldContent>
                      <RadioGroupItem value="closed" id="enterprise-plan" />
                    </Field>
                  </FieldLabel>
                </RadioGroup>
              </div>
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button className="w-full text-base p-6 rounded-xl">Update</Button>
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
