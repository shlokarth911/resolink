import {
  Sparkles,
  Check,
  ChevronsUpDown,
  Search,
  Building2,
  ArrowLeft,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { createIssue } from "../../../services/issue";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { getAllOrganisations } from "../../../services/organisation";

const ReportIssue = () => {
  const [open, setOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState("");
  const [organisations, setOrganisations] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [anonymous, setAnonymous] = useState(false);

  const [posting, setIsPosting] = useState(false);

  const navigate = useNavigate();

  const fetchOrg = async () => {
    try {
      const response = await getAllOrganisations();
      if (response.data && response.data.organisations) {
        setOrganisations(response.data.organisations);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAttachments([reader.result]);
        toast.info("Image added for AI verification");
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    fetchOrg();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const issueData = {
        title,
        description,
        location,
        attachments,
        isAnonymous: anonymous,
        organisationId: selectedOrg,
      };

      setIsPosting(true);
      const response = await createIssue(issueData);
      toast.success("Issue reported successfully");

      if (response.status === 201) {
        navigate("/user/issues");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="p-5 max-w-4xl mx-auto">
      <div>
        <Button variant="ghost" onClick={() => navigate("/user/home")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>

      <div className="pt-6">
        <h1 className="text-3xl font-semibold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent inline-block">
          Report an Issue
        </h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Share your concerns and our AI will help route them to the right
          organization for resolution.
        </p>
      </div>

      <div className="mt-8 border border-blue-100/20 p-6 rounded-2xl bg-linear-to-br from-blue-500/10 via-indigo-500/10 to-purple-500/10 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl"></div>
        <div className="flex items-center gap-2 relative z-10">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <Sparkles className="w-5 h-5 text-blue-400" />
          </div>
          <h2 className="font-semibold text-lg">AI Powered Analysis</h2>
        </div>
        <p className="text-sm text-muted-foreground mt-3 leading-relaxed relative z-10">
          Our AI will analyze and route this issue to the right organisation,
          detect duplicates, assign priority, and suggest solutions
          automatically.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-8 border border-border/50 px-5 rounded-2xl py-6 flex flex-col gap-8 bg-card/50 backdrop-blur-sm shadow-sm"
      >
        <Field className="gap-3">
          <FieldLabel htmlFor="title" className="text-base font-medium">
            Issue Title
          </FieldLabel>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Briefly summarize the issue (e.g., Pothole on Main St.)"
            required
            className="text-base py-6 rounded-xl border-input/60 focus-visible:ring-blue-500/50 transition-all"
          />
        </Field>
        <Field className="gap-3">
          <FieldLabel htmlFor="description" className="text-base font-medium">
            Issue Description
          </FieldLabel>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Provide detailed information about the issue..."
            required
            className="text-base py-4 min-h-[150px] rounded-xl border-input/60 focus-visible:ring-blue-500/50 transition-all resize-y"
          />
        </Field>
        <div className="space-y-3">
          <Label className="text-base font-medium">Organisation</Label>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                value={selectedOrg}
                onValueChange={setSelectedOrg}
                aria-expanded={open}
                className="w-full justify-between py-6 text-base font-normal rounded-xl border-input/60 hover:bg-muted/50 transition-all overflow-hidden"
              >
                {selectedOrg ? (
                  <span className="text-foreground flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-muted-foreground" />
                    {organisations.find((org) => org._id === selectedOrg)?.name}
                  </span>
                ) : (
                  <span className="text-muted-foreground">
                    Select relevant organisation...
                  </span>
                )}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </DialogTrigger>
            <DialogContent className="p-0 sm:max-w-[500px] overflow-hidden gap-0">
              <DialogHeader className="px-4 py-3 border-b bg-muted/30">
                <DialogTitle className="text-base font-medium flex items-center gap-2">
                  <Search className="w-4 h-4" /> Select Organisation
                </DialogTitle>
              </DialogHeader>
              <Command className="rounded-none border-0">
                <CommandInput
                  placeholder="Search organisations..."
                  className="h-12 text-base border-none focus:ring-0"
                />
                <CommandList className="max-h-[300px] overflow-y-auto p-1">
                  <CommandEmpty className="py-6 text-center text-sm text-muted-foreground">
                    No organisation found.
                  </CommandEmpty>
                  <CommandGroup>
                    {organisations.map((org) => (
                      <CommandItem
                        key={org._id}
                        value={org.name}
                        onSelect={() => {
                          setSelectedOrg(org._id);
                          setOpen(false);
                        }}
                        className="flex items-center gap-2 p-3 rounded-lg cursor-pointer aria-selected:bg-blue-500/10 aria-selected:text-blue-600"
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4 text-blue-600 transition-opacity",
                            selectedOrg === org._id
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                        <span className="flex-1">{org.name}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </DialogContent>
          </Dialog>
          <p className="text-[0.8rem] text-muted-foreground">
            Select the organisation responsible if you know it, otherwise choose
            'Other'.
          </p>
        </div>

        <Field className="gap-3">
          <FieldLabel htmlFor="location" className="text-base font-medium">
            Location
          </FieldLabel>
          <Input
            id="location"
            type="text"
            placeholder="Enter the location of the issue"
            required
            className="text-base py-6 rounded-xl border-input/60 focus-visible:ring-blue-500/50 transition-all"
          />
        </Field>
        <Field className="gap-3">
          <FieldLabel htmlFor="attachments" className="text-base font-medium">
            Evidence (Image)
          </FieldLabel>
          <div className="border border-dashed border-input py-8 px-4 rounded-xl flex flex-col items-center justify-center text-center hover:bg-muted/20 transition-colors cursor-pointer bg-muted/5 relative">
            <Input
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              id="attachments"
              type="file"
              accept="image/*"
            />
            <div className="p-3 bg-muted rounded-full mb-3">
              <Sparkles className="w-6 h-6 text-blue-500" />
            </div>
            {attachments.length > 0 ? (
              <p className="font-medium text-sm text-green-600">
                Image Selected for Verification
              </p>
            ) : (
              <>
                <p className="font-medium text-sm">
                  Click to upload image for AI Verification
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Supports JPG, PNG (Max 5MB)
                </p>
              </>
            )}
          </div>
        </Field>
        {/* Switch */}
        <div className="flex items-center justify-between p-4 rounded-xl border bg-muted/30">
          <Label
            htmlFor="anonymous"
            className="text-base flex-1 cursor-pointer"
          >
            <div className="flex flex-col">
              <span className="font-medium">Report anonymously</span>
              <span className="text-xs text-muted-foreground font-normal mt-0.5">
                Your identity will be kept hidden from public view
              </span>
            </div>
          </Label>
          <Switch
            id="anonymous"
            className="scale-110 data-[state=checked]:bg-blue-600"
            checked={anonymous}
            onCheckedChange={setAnonymous}
          />
        </div>
        <div className="pt-4">
          <Button
            className="w-full py-6 text-lg font-medium rounded-xl shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
            type="submit"
            disabled={posting}
          >
            {posting ? "Posting..." : "Report Issue"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ReportIssue;
