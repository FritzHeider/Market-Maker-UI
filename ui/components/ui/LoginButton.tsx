"use client";

import { useState } from "react";

export default function LoginButton() {
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`);
      const data = await res.json();
      window.location.href = data.login_url;
    } catch (err) {
      console.error("Login failed", err);
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogin}
      className="px-4 py-2 bg-blue-600 rounded text-white"
      disabled={loading}
    >
      {loading ? "Redirecting..." : "Login"}
    </button>
  );
}
