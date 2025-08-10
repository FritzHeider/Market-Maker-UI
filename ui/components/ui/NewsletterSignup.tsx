"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // Placeholder action for subscribing
    toast.success("Thanks for subscribing!");
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="flex-1 px-4 py-2 rounded-md text-black"
        required
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 rounded-md text-white"
      >
        Subscribe
      </button>
    </form>
  );
}
