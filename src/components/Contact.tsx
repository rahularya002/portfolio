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
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        toast({
          title: "Success!",
          description: "Your message has been sent successfully.",
          variant: "default",
        });
        setName("");
        setEmail("");
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
    }
  };

  return (
    <section
      id="#contact"
      className="w-full py-12 md:py-24 lg:py-32 border-t relative flex items-center justify-center"
    >
      {/* Centered Orbiting Circles Demo */}
      <div className="absolute inset-0 flex items-center justify-center">
        <OrbitingCirclesDemo />
      </div>

      <div className="container relative z-10 px-4 md:px-6 flex items-center justify-center">
        <div className="w-full md:w-2/3 lg:w-1/2">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                Get in Touch
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Let's Discuss Your Project
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
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
                />
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Textarea
                  placeholder="Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <Button type="submit">Submit</Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
