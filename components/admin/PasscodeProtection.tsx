"use client";

// Passcode Protection Component
// Following CLUADE.md §4

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function PasscodeProtection() {
  const [passcode, setPasscode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode }),
      });

      if (response.ok) {
        toast.success("Login successful");
        router.refresh(); // Refresh to update auth state
      } else {
        const data = await response.json();
        toast.error(data.error || "Invalid passcode");
        setPasscode("");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Popup Builder Admin
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter passcode to access the admin panel
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="passcode" className="sr-only">
              Passcode
            </label>
            <input
              id="passcode"
              name="passcode"
              type="password"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#12213b] focus:border-[#12213b] focus:z-10 sm:text-sm"
              placeholder="Enter passcode"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              disabled={isLoading}
              autoFocus
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading || !passcode}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#12213b] hover:bg-[#12213b]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#12213b] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? "Verifying..." : "Access Admin Panel"}
            </button>
          </div>
        </form>

        <div className="text-center text-xs text-gray-500 mt-4">
          <p>Passcode is stored in environment variables</p>
          <p className="mt-1">POPUP_ADMIN_PASSCODE</p>
        </div>
      </div>
    </div>
  );
}
