"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useForm } from "react-hook-form";
import { registerSchema } from "@/validator/auth";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

type Input = z.infer<typeof registerSchema>;

const Registry = () => {
  const { toast } = useToast();
  const [formStep, setFormStep] = useState(0);
  const form = useForm<Input>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      studentId: "",
      year: "",
      confirmPassword: "",
    },
  });
  function onSubmit(data: Input) {
    if (data.confirmPassword !== data.password) {
      toast({
        title: "Passwords do not match",
        variant: "destructive",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      return;
    }
    alert(JSON.stringify(data, null, 2));
  }

  return (
    <div>
      <ThemeToggle className="absolute top-6 right-6" />

      {/* Form */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Register</CardTitle>
            <CardDescription>Start the journey with us today</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-3"
              >
                <div
                  className={cn("space-y-3", {
                    hidden: formStep == 1,
                  })}
                >
                  {/* name */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your fullname..."
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          This is your public display name.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* email */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your email..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* student id */}
                  <FormField
                    control={form.control}
                    name="studentId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Student ID</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your student id..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* year */}
                  <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Year of study</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a verified email to display" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {[10, 11, 12, 13].map((year) => {
                              return (
                                <SelectItem value={year.toString()} key={year}>
                                  Year {year}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div
                  className={cn("space-y-3", {
                    hidden: formStep == 0,
                  })}
                >
                  {/* password */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your password..."
                            {...field}
                            type="password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* confirm password */}
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Confirm your password"
                            {...field}
                            type="password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    type="submit"
                    className={cn({
                      hidden: formStep == 0,
                    })}
                  >
                    Submit
                  </Button>
                  <Button
                    type="button"
                    variant={"ghost"}
                    className={cn({
                      hidden: formStep == 1,
                    })}
                    onClick={() => {
                      // validation
                      form.trigger(["email", "name", "year", "studentId"]);
                      const emailState = form.getFieldState("email");
                      const nameState = form.getFieldState("name");
                      const yearState = form.getFieldState("year");
                      const idState = form.getFieldState("studentId");

                      if (!emailState.isDirty || emailState.invalid) return;
                      if (!nameState.isDirty || nameState.invalid) return;
                      if (!yearState.isDirty || yearState.invalid) return;
                      if (!idState.isDirty || idState.invalid) return;

                      setFormStep(1);
                    }}
                  >
                    Next Step
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button
                    type="button"
                    variant={"ghost"}
                    className={cn({
                      hidden: formStep == 0,
                    })}
                    onClick={() => {
                      setFormStep(0);
                    }}
                  >
                    Go Back
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Registry;
