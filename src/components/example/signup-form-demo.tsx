"use client";

import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation'; // Add this import

interface FormData {
  firstname: string;
  lastname: string;
  phoneNumber: string;
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
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    firstname: "",
    lastname: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

  const [registrationSuccess, setRegistrationSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [paymentInProgress, setPaymentInProgress] = useState<boolean>(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    
    if (id === 'phoneNumber') {
      const sanitizedValue = value.replace(/\D/g, '');
      const truncatedValue = sanitizedValue.slice(0, 10);
      
      setFormData((prevData) => ({
        ...prevData,
        [id]: truncatedValue,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }
  };

  const isValidPhoneNumber = (phoneNumber: string) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phoneNumber);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (!isValidPhoneNumber(formData.phoneNumber)) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit Indian mobile number",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

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
    } finally {
      setIsLoading(false);
    }
  };

  const handlePayment = async () => {
    setPaymentInProgress(true);
    setIsLoading(true);

    try {
      // Use the correct amount (199 as defined in backend)
      const response = await fetch("/api/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          name: `${formData.firstname} ${formData.lastname}`,
        }),
      });

      const data = await response.json();

      // Check if user has already paid
      if (response.status === 400 && data.redirectUrl) {
        router.push(data.redirectUrl);
        return;
      }

      if (!response.ok) throw new Error(data.message);

      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: data.amount, // Use amount from server response
        currency: "INR",
        name: "Workshop Registration",
        description: "Workshop Registration Fee",
        order_id: data.id,
        handler: async function(response: RazorpayResponse) {
          try {
            const webhookResponse = await fetch("/api/razorpay", {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                order_id: data.id,
                payment_id: response.razorpay_payment_id,
                status: 'captured'
              }),
            });

            const result = await webhookResponse.json();
            
            if (webhookResponse.ok && result.redirectUrl) {
              toast({
                title: "Payment Successful",
                description: "Redirecting to workshop page...",
                variant: "default",
              });
              router.push(result.redirectUrl);
            } else {
              throw new Error(result.message || 'Payment verification failed');
            }
          } catch (error) {
            toast({
              title: "Verification Failed",
              description: (error as Error).message || "Payment verification failed",
              variant: "destructive",
            });
          }
        },
        prefill: {
          name: `${formData.firstname} ${formData.lastname}`,
          email: formData.email,
          // Use test card from server response if available
          ...(data.testCard && {
            "card[number]": data.testCard.number,
            "card[expiry]": data.testCard.expiry,
            "card[cvv]": data.testCard.cvv,
          }),
        },
        theme: {
          color: "#3399cc",
        },
        notes: {
          isTestPayment: true
        }
      };

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
    } finally {
      setIsLoading(false);
      setPaymentInProgress(false);
    }
  };

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
      <h1 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Workshop Registration
      </h1>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Register for the workshop (₹199 only)
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
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            id="phoneNumber"
            placeholder="Enter 10-digit mobile number"
            type="tel"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            pattern="[6-9]\d{9}"
            maxLength={10}
            title="10-digit mobile number starting with 6, 7, 8, or 9"
          />
        </LabelInputContainer>

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

        {!registrationSuccess ? (
          <button
            className="bg-gradient-to-br from-black to-neutral-600 dark:from-zinc-900 dark:to-zinc-900 dark:border-white dark:border w-full text-white rounded-md h-10 font-medium flex items-center justify-center"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            {isLoading ? "Processing..." : "Register Now"}
          </button>
        ) : (
          <button
            type="button"
            onClick={handlePayment}
            className="bg-gradient-to-br from-green-500 to-green-700 text-white w-full rounded-md h-10 font-medium flex items-center justify-center"
            disabled={isLoading || paymentInProgress}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            {isLoading ? "Processing..." : "Pay ₹199"}
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