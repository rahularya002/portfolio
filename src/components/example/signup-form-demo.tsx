"use client";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

interface FormData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill: {
    name: string;
    email: string;
    "card[number]"?: string;
    "card[expiry]"?: string;
    "card[cvv]"?: string;
  };
  theme: {
    color: string;
  };
  notes?: {
    isTestPayment: boolean;
  };
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => {
      open: () => void;
    };
  }
}

export default function SignupFormDemo() {
  const [formData, setFormData] = useState<FormData>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [registrationSuccess, setRegistrationSuccess] = useState<boolean>(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Success!",
          description: "Registration successful! Proceed to payment.",
          variant: "default",
        });
        setRegistrationSuccess(true);
      } else {
        const error = await response.json();
        throw new Error(error.message);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: (error as Error).message || "Registration failed",
        variant: "destructive",
      });
    }
  };

  const handlePayment = async () => {
    try {
      // Use test amount of ₹10 instead of ₹199
      const testAmount = 10;
      
      const response = await fetch("/api/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: testAmount,
          email: formData.email,
          name: `${formData.firstname} ${formData.lastname}`
        }),
      });

      const data = await response.json();
      
      if (!response.ok) throw new Error(data.message);

      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: testAmount * 100, // Amount in paise (₹10)
        currency: "INR",
        name: "Workshop Registration (Test)",
        description: "Workshop Registration Fee (Test Payment)",
        order_id: data.id,
        handler: async (response: RazorpayResponse) => {
          try {
            const verifyResponse = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...response,
                email: formData.email,
              }),
            });

            if (verifyResponse.ok) {
              toast({
                title: "Payment Successful",
                description: "Your test payment is complete!",
                variant: "default",
              });
              // Redirect to success page or dashboard
              window.location.href = "/workshop/success";
            }
          } catch (error) {
            toast({
              title: "Verification Failed",
              description: "Payment verification failed",
              variant: "destructive",
            });
          }
        },
        prefill: {
          name: `${formData.firstname} ${formData.lastname}`,
          email: formData.email,
          // Test card details for easy testing
          "card[number]": '4111111111111111',
          "card[expiry]": '12/25',
          "card[cvv]": '123',
        },
        theme: {
          color: "#3399cc",
        },
        notes: {
          isTestPayment: true
        }
      };

      // Load Razorpay script if not already loaded
      if (!window.Razorpay) {
        await loadRazorpayScript();
      }

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      toast({
        title: "Error",
        description: (error as Error).message || "Payment initiation failed",
        variant: "destructive",
      });
    }
  };

  // Function to load Razorpay script
  const loadRazorpayScript = (): Promise<void> => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve();
      document.body.appendChild(script);
    });
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black border">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Workshop Registration
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Register for the workshop {registrationSuccess ? '(Test Payment: ₹10)' : '(₹199 only)'}
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
              required
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
              required
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
            required
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
            required
            minLength={6}
          />
        </LabelInputContainer>

        {!registrationSuccess ? (
          <button
            className="bg-gradient-to-br from-black to-neutral-600 dark:from-zinc-900 dark:to-zinc-900 dark:border-white dark:border w-full text-white rounded-md h-10 font-medium"
            type="submit"
          >
            Register Now
          </button>
        ) : (
          <button
            type="button"
            onClick={handlePayment}
            className="bg-gradient-to-br from-green-500 to-green-700 text-white w-full rounded-md h-10 font-medium"
          >
            Pay ₹10 (Test)
          </button>
        )}
      </form>

      <Link href="/workshop">
        <button className="w-full bg-gradient-to-br from-black to-neutral-600 dark:from-zinc-900 dark:to-zinc-900 text-white rounded-md h-10 font-medium">
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

const LabelInputContainer: React.FC<LabelInputContainerProps> = ({
  children,
  className,
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};