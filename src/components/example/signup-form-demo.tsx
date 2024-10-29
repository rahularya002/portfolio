"use client";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast"; // Import the useToast hook
import Link from "next/link";

interface FormData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export default function SignupFormDemo() {
  const [formData, setFormData] = useState<FormData>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [registrationSuccess, setRegistrationSuccess] = useState(false); // Track registration status
  const { toast } = useToast(); // Use toast from the useToast hook

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const combinedFormData = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(combinedFormData),
      });

      if (response.ok) {
        toast({
          title: "Success!",
          description: "User signed up successfully",
          variant: "default",
        });
        setFormData({ firstname: "", lastname: "", email: "", password: "" });
        setRegistrationSuccess(true); // Set registration success to true
      } else {
        toast({
          title: "Error",
          description: "Signup failed",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error signing up user",
        variant: "destructive",
      });
    }
  };

  const handlePayment = () => {
    window.location.href = "https://rzp.io/rzp/O3S43wNr"; // Redirect to Razorpay payment link
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black border">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Registration for Workshop
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Register here for the upcoming Workshop
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input
              id="firstname"
              placeholder="John"
              type="text"
              value={formData.firstname}
              onChange={handleChange}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input
              id="lastname"
              placeholder="Doe"
              type="text"
              value={formData.lastname}
              onChange={handleChange}
            />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="your@email.com"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br from-black to-neutral-600 dark:from-zinc-900 dark:to-zinc-900 dark:border-white dark:border w-full text-white rounded-md h-10 font-medium"
          type="submit"
        >
          Sign up &rarr;
        </button>
      </form>

      {registrationSuccess && (
        <button
          onClick={handlePayment}
          className="bg-gradient-to-br from-green-500 to-green-700 text-white w-full rounded-md h-10 font-medium mt-4"
        >
          Proceed to Payment
        </button>
      )}

      <Link href="/workshop">
        <button className="w-full bg-gradient-to-br from-black to-neutral-600 dark:from-zinc-900 dark:to-zinc-900 text-white rounded-md h-10 font-medium my-4">
          Back to Home
        </button>
      </Link>
    </div>
  );
}

interface LabelInputContainerProps {
  children: React.ReactNode;
  className?: string;
}

const LabelInputContainer: React.FC<LabelInputContainerProps> = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
