import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Building2,
  Mail,
  Lock,
  FileText,
  Phone,
  ShieldCheck,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { registerOrganisation } from "@/services/organisation";

const organisationTypes = [
  { value: "government", label: "Government" },
  { value: "private", label: "Private" },
  { value: "ngo", label: "NGO" },
  { value: "educational", label: "Educational" },
  { value: "other", label: "Other" },
];

const OrganisationRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
    verified: false,
    email: "",
    contactEmail: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTypeChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      type: value,
    }));
  };

  const handleVerifiedChange = (checked) => {
    setFormData((prev) => ({
      ...prev,
      verified: checked,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // Validation
    if (formData.password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!formData.type) {
      toast.error("Please select an organisation type");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);

    try {
      const res = await registerOrganisation(formData);

      if (res) {
        toast.success("Organisation registered successfully!");
        navigate("/org/dashboard");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Registration failed. Please try again.";
      toast.error(errorMessage);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-background min-h-svh flex flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-lg">
        <Card className="border-border/50 backdrop-blur-sm">
          <CardHeader className="text-center space-y-2">
            <div className="flex justify-center mb-2">
              <div className="p-3 rounded-full bg-primary/10 text-primary">
                <Building2 className="w-8 h-8" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">
              Register Your Organisation
            </CardTitle>
            <CardDescription>
              Join ResoLink and start managing issues effectively
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={submitHandler}>
              <FieldGroup>
                {/* Organisation Name */}
                <Field>
                  <FieldLabel htmlFor="name">
                    <Building2 className="w-4 h-4" />
                    Organisation Name
                  </FieldLabel>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter organisation name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </Field>

                {/* Organisation Type */}
                <Field>
                  <FieldLabel htmlFor="type">Organisation Type</FieldLabel>
                  <Select
                    value={formData.type}
                    onValueChange={handleTypeChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select organisation type" />
                    </SelectTrigger>
                    <SelectContent>
                      {organisationTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>

                {/* Description */}
                <Field>
                  <FieldLabel htmlFor="description">
                    <FileText className="w-4 h-4" />
                    Description
                  </FieldLabel>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe your organisation..."
                    value={formData.description}
                    onChange={handleInputChange}
                    className="min-h-24 resize-none"
                  />
                </Field>

                {/* Email Fields */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field>
                    <FieldLabel htmlFor="email">
                      <Mail className="w-4 h-4" />
                      Email
                    </FieldLabel>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="org@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="contactEmail">
                      <Phone className="w-4 h-4" />
                      Contact Email
                    </FieldLabel>
                    <Input
                      id="contactEmail"
                      name="contactEmail"
                      type="email"
                      placeholder="contact@example.com"
                      value={formData.contactEmail}
                      onChange={handleInputChange}
                    />
                  </Field>
                </div>

                {/* Password Fields */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field>
                    <FieldLabel htmlFor="password">
                      <Lock className="w-4 h-4" />
                      Password
                    </FieldLabel>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirmPassword">
                      <Lock className="w-4 h-4" />
                      Confirm Password
                    </FieldLabel>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </Field>
                </div>

                {/* Verified Toggle */}
                <div className="flex items-center justify-between space-x-4 p-4 rounded-lg bg-muted/50 border border-border/50">
                  <Label htmlFor="verified" className="flex-1">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-primary" />
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">
                          Request Verification
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Verified organisations get priority visibility
                        </span>
                      </div>
                    </div>
                  </Label>
                  <Switch
                    id="verified"
                    checked={formData.verified}
                    onCheckedChange={handleVerifiedChange}
                  />
                </div>

                {/* Submit Button */}
                <Field>
                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Registering...
                      </span>
                    ) : (
                      "Create Organisation Account"
                    )}
                  </Button>
                </Field>

                <FieldSeparator>Or</FieldSeparator>

                {/* Login Link */}
                <FieldDescription className="text-center">
                  Already have an organisation account?{" "}
                  <Link
                    to="/org/login"
                    className="text-primary font-medium hover:underline"
                  >
                    Sign in
                  </Link>
                </FieldDescription>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>

        {/* Terms */}
        <FieldDescription className="px-6 text-center mt-4 text-xs">
          By registering, you agree to our{" "}
          <a href="#" className="text-primary hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-primary hover:underline">
            Privacy Policy
          </a>
          .
        </FieldDescription>
      </div>
    </div>
  );
};

export default OrganisationRegister;
