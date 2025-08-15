"use client";
import { useState } from "react";

export default function ReferralPage() {
  const referral = "https://botsensai.com/?ref=YOURCODE";
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(referral);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 max-w-lg">
      <h1 className="text-2xl font-semibold mb-4">Referral Program</h1>
      <p className="text-gray-300 mb-4">
        Share your unique link and earn free trading credits for every signup.
      </p>
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          readOnly
          value={referral}
          className="flex-1 rounded border border-gray-700 bg-gray-900 p-2 text-sm"
        />
        <button
          onClick={copy}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
}
