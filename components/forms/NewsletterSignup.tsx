"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

interface NewsletterSignupProps {
  className?: string;
  title?: string;
  description?: string;
  variant?: "default" | "minimal" | "featured" | "enhanced";
}

export default function NewsletterSignup({
  className = "",
  title = "Stay in the Loop",
  description = "Get notified when we drop new videos, articles, and insights about the future of design.",
  variant = "default",
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setStatus("error");
      setMessage("Please enter your email address");
      return;
    }

    setIsLoading(true);
    setStatus("idle");

    try {
      const response = await fetch("/api/audience", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "add-contact",
          email,
          firstName,
          lastName,
          // audienceId will be handled server-side from env
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus("success");
        setMessage("🎉 Welcome to the Reality Designers community!");
        setEmail("");
        setFirstName("");
        setLastName("");
      } else {
        setStatus("error");
        setMessage(result.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (variant === "minimal") {
    return (
      <div className={`${className}`}>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-md"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:outline-none text-sm"
            disabled={isLoading}
          />
          <Button
            disabled={isLoading}
            variant="primary"
            size="md"
            theme="light"
            className="whitespace-nowrap"
            onClick={() => {
              const form = document.querySelector("form");
              if (form) {
                const event = new Event("submit", {
                  bubbles: true,
                  cancelable: true,
                });
                form.dispatchEvent(event);
              }
            }}
          >
            {isLoading ? "Joining..." : "Join Newsletter"}
          </Button>
        </form>

        {status !== "idle" && (
          <p
            className={`mt-2 text-sm ${
              status === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    );
  }

  if (variant === "enhanced") {
    return (
      <section
        className={`w-full relative bg-gray-50 overflow-hidden ${className}`}
        data-theme="light"
      >
        {/* Sophisticated Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Mesh gradient overlay */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background: `
								radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.06) 0%, transparent 50%),
								radial-gradient(circle at 70% 80%, rgba(168, 85, 247, 0.04) 0%, transparent 50%)
							`,
            }}
          />

          {/* Subtle grid pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
								linear-gradient(rgba(59, 130, 246, 0.04) 1px, transparent 1px),
								linear-gradient(90deg, rgba(59, 130, 246, 0.04) 1px, transparent 1px)
							`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        {/* Compact content container */}
        <div className="relative z-10 py-12 lg:py-16">
          <div className="container mx-auto px-4">
            {/* Compact section header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-xl bg-white/70 border border-white/30 shadow-sm mb-4">
                <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"></div>
                <span className="font-russo text-gray-600 text-xs tracking-[0.2em] uppercase font-bold">
                  Newsletter
                </span>
              </div>
              <h2 className="font-russo text-2xl lg:text-3xl font-black text-gray-900 mb-2 leading-tight">
                {title}
              </h2>
              <p className="text-base text-gray-600 font-outfit max-w-xl mx-auto">
                {description}
              </p>
            </div>

            {/* Compact newsletter form */}
            <div className="max-w-2xl mx-auto">
              <div className="backdrop-blur-xl bg-white/90 border border-white/50 rounded-2xl p-6 shadow-xl">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Compact name fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="First name"
                      className="px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:outline-none bg-white transition-all duration-300 text-sm"
                      disabled={isLoading}
                    />
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Last name"
                      className="px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:outline-none bg-white transition-all duration-300 text-sm"
                      disabled={isLoading}
                    />
                  </div>

                  {/* Email field */}
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:outline-none bg-white transition-all duration-300 text-sm"
                    disabled={isLoading}
                  />

                  {/* Submit button */}
                  <Button
                    disabled={isLoading}
                    variant="primary"
                    size="md"
                    theme="light"
                    className="w-full text-sm"
                    onClick={() => {
                      const form = document.querySelector("form");
                      if (form) {
                        const event = new Event("submit", {
                          bubbles: true,
                          cancelable: true,
                        });
                        form.dispatchEvent(event);
                      }
                    }}
                  >
                    {isLoading ? "Joining..." : "Join Newsletter"}
                  </Button>
                </form>

                {/* Status message */}
                {status !== "idle" && (
                  <div
                    className={`mt-4 p-3 rounded-lg text-sm ${
                      status === "success"
                        ? "bg-green-100 text-green-700 border border-green-200"
                        : "bg-red-100 text-red-700 border border-red-200"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {status === "success" ? (
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      )}
                      <span className="font-outfit">{message}</span>
                    </div>
                  </div>
                )}

                {/* Compact trust indicators */}
                <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <svg
                      className="w-3 h-3 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>No spam</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <svg
                      className="w-3 h-3 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    <span>Unsubscribe anytime</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Compact visual elements */}
            <div className="flex justify-center mt-8 space-x-6 opacity-50">
              <div className="flex items-center gap-1.5 text-xs text-gray-500 font-outfit">
                <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                <span>Weekly insights</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-500 font-outfit">
                <div className="w-1 h-1 bg-purple-400 rounded-full"></div>
                <span>Exclusive previews</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-500 font-outfit">
                <div className="w-1 h-1 bg-pink-400 rounded-full"></div>
                <span>Early access</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (variant === "featured") {
    return (
      <div className={`relative bg-white ${className}`}>
        {/* Simple Background Accent */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gray-50 rounded-full blur-3xl opacity-30"></div>

        {/* Main Content */}
        <div className="relative px-6 py-16">
          <div className="max-w-lg mx-auto text-center">
            {/* Icon & Badge */}
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="inline-block px-4 py-2 bg-gray-100 rounded-full">
                <span className="font-russo text-xs uppercase tracking-wider font-bold text-gray-700">
                  Newsletter
                </span>
              </div>
            </div>

            {/* Heading */}
            <div className="mb-8">
              <h3 className="font-russo font-black text-3xl text-black mb-4 leading-tight">
                {title}
              </h3>
              <p className="text-lg text-gray-600 font-outfit leading-relaxed">
                {description}
              </p>
            </div>

            {/* Form */}
            <div className="bg-gray-50 rounded-2xl p-6 mb-6">
              <form onSubmit={handleSubmit} className="space-y-3">
                {/* Name Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First name"
                    className="px-3 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:outline-none bg-white transition-all duration-300 text-sm"
                    disabled={isLoading}
                  />
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last name"
                    className="px-3 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:outline-none bg-white transition-all duration-300 text-sm"
                    disabled={isLoading}
                  />
                </div>

                {/* Email Field */}
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:outline-none bg-white transition-all duration-300 text-sm"
                  disabled={isLoading}
                />

                {/* Submit Button */}
                <Button
                  disabled={isLoading}
                  variant="primary"
                  size="md"
                  theme="light"
                  className="w-full text-sm"
                  onClick={() => {
                    const form = document.querySelector("form");
                    if (form) {
                      const event = new Event("submit", {
                        bubbles: true,
                        cancelable: true,
                      });
                      form.dispatchEvent(event);
                    }
                  }}
                >
                  {isLoading ? "Joining..." : "Join Newsletter"}
                </Button>
              </form>

              {/* Status Message */}
              {status !== "idle" && (
                <div
                  className={`mt-4 p-4 rounded-xl text-sm ${
                    status === "success"
                      ? "bg-green-100 text-green-700 border border-green-200"
                      : "bg-red-100 text-red-700 border border-red-200"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {status === "success" ? (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    )}
                    <span className="font-outfit">{message}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>No spam</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <span>Unsubscribe anytime</span>
              </div>
            </div>

            {/* Social Proof */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500 font-outfit">
                Join <span className="font-semibold text-black">100+</span>{" "}
                people who are designing their reality
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className={`bg-gray-50 rounded-2xl p-8 ${className}`}>
      <div className="max-w-md mx-auto text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2 font-russo">
          {title}
        </h3>
        <p className="text-gray-600 mb-6">{description}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:outline-none text-sm"
              disabled={isLoading}
            />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last name"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:outline-none text-sm"
              disabled={isLoading}
            />
          </div>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:outline-none text-sm"
            disabled={isLoading}
          />

          <Button
            disabled={isLoading}
            variant="primary"
            size="md"
            theme="light"
            className="w-full"
            onClick={() => {
              const form = document.querySelector("form");
              if (form) {
                const event = new Event("submit", {
                  bubbles: true,
                  cancelable: true,
                });
                form.dispatchEvent(event);
              }
            }}
          >
            {isLoading ? "Joining..." : "Join Newsletter"}
          </Button>
        </form>

        {status !== "idle" && (
          <div
            className={`mt-4 p-3 rounded-lg text-sm ${
              status === "success"
                ? "bg-green-100 text-green-800 border border-green-200"
                : "bg-red-100 text-red-800 border border-red-200"
            }`}
          >
            {message}
          </div>
        )}

        <p className="mt-4 text-xs text-gray-500">
          No spam, ever. Unsubscribe anytime.
        </p>
      </div>
    </div>
  );
}
