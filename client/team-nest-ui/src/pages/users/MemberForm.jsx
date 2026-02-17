import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  IconUser,
  IconArrowLeft,
  IconDeviceFloppy,
  IconMail,
  IconPhone,
  IconBuildingSkyscraper,
  IconBriefcase,
  IconShield,
  IconUserCheck,
  IconUserX,
  IconUserPause,
  IconUserPlus,
} from "@tabler/icons-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { showToast } from "@/components/ui/sonner";
import {
  PageHeader,
  PageHeaderHeading,
  PageHeaderTitle,
  PageHeaderDescription,
  PageHeaderActions,
} from "@/components/ui/page-header";

import {
  getUsers,
  createUser,
  updateUser,
  getRoles,
  UserStatus,
  departments,
} from "@/api/userApi";

// Status configuration
const statusConfig = {
  ACTIVE: {
    label: "Active",
    icon: IconUserCheck,
    color: "bg-success/10 text-success border-success/20",
    description: "User has full access",
  },
  INACTIVE: {
    label: "Inactive",
    icon: IconUserX,
    color: "bg-muted/10 text-muted-foreground border-muted/20",
    description: "User account is disabled",
  },
  PENDING: {
    label: "Pending",
    icon: IconUserPause,
    color: "bg-pending/10 text-pending border-pending/20",
    description: "Awaiting approval",
  },
  SUSPENDED: {
    label: "Suspended",
    icon: IconUserX,
    color: "bg-destructive/10 text-destructive border-destructive/20",
    description: "Account is suspended",
  },
};

// Form validation schema
const memberSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50),
  lastName: z.string().min(1, "Last name is required").max(50),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  phone: z.string().optional(),
  jobTitle: z.string().optional(),
  department: z.string().optional(),
  roleId: z.string().min(1, "Role is required"),
  status: z.nativeEnum(UserStatus).optional(),
});

export function MemberForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(isEditing);
  const [roles, setRoles] = useState([]);

  const form = useForm({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      jobTitle: "",
      department: "",
      roleId: "",
      status: UserStatus.ACTIVE,
    },
  });

  // Fetch roles on mount
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await getRoles();
        setRoles(response.data);
      } catch (error) {
        showToast.error("Failed to load roles");
      }
    };
    fetchRoles();
  }, []);

  // Fetch user data if editing
  useEffect(() => {
    if (isEditing) {
      const fetchUser = async () => {
        try {
          const response = await getUsers();
          const user = response.data.find((u) => u.id === parseInt(id));
          if (user) {
            form.reset({
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              phone: user.phone || "",
              jobTitle: user.jobTitle || "",
              department: user.department || "",
              roleId: user.roleId?.toString() || "",
              status: user.status,
            });
          } else {
            showToast.error("User not found");
            navigate("/members");
          }
        } catch (error) {
          showToast.error("Failed to load user");
          navigate("/members");
        } finally {
          setIsFetching(false);
        }
      };
      fetchUser();
    }
  }, [id, isEditing, form, navigate]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const formData = {
        ...data,
        roleId: parseInt(data.roleId),
      };
      
      if (isEditing) {
        await updateUser(parseInt(id), formData);
        showToast.success("User updated successfully");
      } else {
        await createUser(formData);
        showToast.success("User created successfully");
      }
      navigate("/members");
    } catch (error) {
      showToast.error(isEditing ? "Failed to update user" : "Failed to create user");
    } finally {
      setIsLoading(false);
    }
  };

  const watchedFirstName = form.watch("firstName");
  const watchedLastName = form.watch("lastName");
  const initials = `${watchedFirstName?.[0] || ""}${watchedLastName?.[0] || ""}`.toUpperCase();

  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <div className="size-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground">Loading user...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Page Header */}
      <PageHeader>
        <PageHeaderHeading icon={isEditing ? IconUser : IconUserPlus}>
          <PageHeaderTitle>{isEditing ? "Edit User" : "Add New User"}</PageHeaderTitle>
          <PageHeaderDescription>
            {isEditing
              ? "Update user information and permissions"
              : "Create a new user account with role assignment"}
          </PageHeaderDescription>
        </PageHeaderHeading>
        <PageHeaderActions>
          <Button variant="ghost" onClick={() => navigate("/members")}>
            <IconArrowLeft className="mr-1.5 size-4" />
            Back to Members
          </Button>
        </PageHeaderActions>
      </PageHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Preview Card */}
          <Card className="bg-gradient-to-br from-primary/5 via-primary/5 to-info/5 border-primary/10">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <Avatar className="size-16 border-2 border-background shadow-lg">
                  <AvatarFallback className="bg-gradient-to-br from-primary to-info text-primary-foreground text-xl font-semibold">
                    {initials || "?"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">
                    {watchedFirstName || watchedLastName
                      ? `${watchedFirstName} ${watchedLastName}`.trim()
                      : "New User"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {form.watch("email") || "email@example.com"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {form.watch("jobTitle") || "Job Title"} • {form.watch("department") || "Department"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <IconUser className="size-5 text-primary" />
                Personal Information
              </CardTitle>
              <CardDescription>
                Basic user details and contact information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="John" className="h-11" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" className="h-11" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address *</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <IconMail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                        <Input
                          type="email"
                          placeholder="john.doe@company.com"
                          className="h-11 pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      This will be used for login and notifications
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <IconPhone className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                        <Input
                          placeholder="+1 555-0100"
                          className="h-11 pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Work Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <IconBriefcase className="size-5 text-primary" />
                Work Information
              </CardTitle>
              <CardDescription>
                Job details and department assignment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="jobTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Software Engineer"
                          className="h-11"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-11">
                            <div className="flex items-center gap-2">
                              <IconBuildingSkyscraper className="size-4 text-muted-foreground" />
                              <SelectValue placeholder="Select department" />
                            </div>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {departments.map((dept) => (
                            <SelectItem key={dept} value={dept}>
                              {dept}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Role & Permissions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <IconShield className="size-5 text-primary" />
                Role & Access
              </CardTitle>
              <CardDescription>
                Assign role and manage account status
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="roleId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {roles.map((role) => (
                          <SelectItem key={role.id} value={role.id.toString()}>
                            <div className="flex items-center gap-3">
                              <div
                                className={`size-3 rounded-full bg-gradient-to-br ${role.color}`}
                              />
                              <div className="flex flex-col">
                                <span className="font-medium">{role.name}</span>
                                <span className="text-xs text-muted-foreground">
                                  {role.description}
                                </span>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Role determines what actions the user can perform
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {isEditing && (
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account Status</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(statusConfig).map(([key, config]) => {
                            const StatusIcon = config.icon;
                            return (
                              <SelectItem key={key} value={key}>
                                <div className="flex items-center gap-3">
                                  <div className={`flex size-7 items-center justify-center rounded-md border ${config.color}`}>
                                    <StatusIcon className="size-4" />
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="font-medium">{config.label}</span>
                                    <span className="text-xs text-muted-foreground">
                                      {config.description}
                                    </span>
                                  </div>
                                </div>
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/members")}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="size-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  {isEditing ? "Saving..." : "Creating..."}
                </>
              ) : (
                <>
                  <IconDeviceFloppy className="mr-1.5 size-4" />
                  {isEditing ? "Save Changes" : "Create User"}
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default MemberForm;
