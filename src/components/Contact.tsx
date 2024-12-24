"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { OrbitingCirclesDemo } from "./Orbit";
import { useToast } from "@/hooks/use-toast"; // Import the useToast hook

export default function Contact() {
  const { toast } = useToast(); // Destructure the toast function

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(""); // Add phone state
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic client-side validation
    if (!name || !email || !phone || !message) { // Include phone in validation
      toast({
        title: "Error",
        description: "All fields are required.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true); // Set loading state

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, phone, message }), // Include phone in the request body
      });

      if (response.ok) {
        toast({
          title: "Success!",
          description: "Your message has been sent successfully.",
          variant: "default",
        });
        setName("");
        setEmail("");
        setPhone(""); // Reset phone
        setMessage("");
      } else {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <section
      id="#contact"
      className="w-full py-12 md:py-24 lg:py-32 border-t relative flex items-center justify-center overflow-hidden"
    >
      {/* Centered Orbiting Circles Demo */}
      <div className="absolute inset-0 flex items-center justify-center">
        <OrbitingCirclesDemo />
      </div>

      <div className="container relative z-10 px-4 md:px-6 flex items-center justify-center">
        <div className="w-full md:w-2/3 lg:w-1/2">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm text-black dark:text-white">
                Get in Touch
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-black dark:text-white">
                Let's Discuss Your Project
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-black dark:text-white">
                Fill out the form below and one of our team members will get back to you shortly.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading} // Disable input when loading
                />
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading} // Disable input when loading
                />
                <Input
                  type="tel"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={loading} // Disable input when loading
                />
                <Textarea
                  placeholder="Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={loading} // Disable textarea when loading
                />
                <Button type="submit" disabled={loading}>
                  {loading ? "Submitting..." : "Submit"} {/* Show loading text */}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
