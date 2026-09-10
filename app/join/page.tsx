"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  User, 
  GraduationCap, 
  Crosshair, 
  Code2, 
  Send,
  ShieldCheck,
  LogIn,
  AlertCircle,
  Loader2
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { submitClubApplication } from "@/lib/firestore";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  branch: string;
  year: string;
  scholarNumber: string;
  interests: string[];
  experienceLevel: "Beginner" | "Intermediate" | "Advanced";
  motivation: string;
  githubProfile: string;
}

const initialData: FormData = {
  fullName: "",
  email: "",
  phone: "",
  branch: "Computer Science & Engineering",
  year: "1st Year",
  scholarNumber: "",
  interests: [],
  experienceLevel: "Beginner",
  motivation: "",
  githubProfile: ""
};

const interestOptions = [
  "Web Security",
  "Networking",
  "CTF & Competitions",
  "Digital Forensics",
  "Malware Analysis",
  "Security Awareness",
  "Research",
  "Projects & Tool Building"
];

const branches = [
  "Computer Science & Engineering",
  "Information Technology",
  "Internet of Things (IoT)",
  "Artificial Intelligence & Data Science",
  "Electronics & Communication Engineering",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Other / Applied Sciences"
];

const years = ["1st Year", "2nd Year", "3rd Year", "4th Year", "Postgraduate / MCA"];

export default function JoinPage() {
  const { user, openAuthModal, requireAuth } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialData);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [applicationId, setApplicationId] = useState<string>("");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Sync user info when authenticated
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: prev.fullName || user.displayName || "",
        email: prev.email || user.email || "",
      }));
    }
  }, [user]);

  const handleInterestToggle = (interest: string) => {
    setFormData((prev) => {
      const exists = prev.interests.includes(interest);
      if (exists) {
        return { ...prev, interests: prev.interests.filter((i) => i !== interest) };
      } else {
        return { ...prev, interests: [...prev.interests, interest] };
      }
    });
  };

  const validateStep = (currentStep: number): boolean => {
    const errs: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.fullName.trim()) errs.fullName = "Full name is required";
      if (!formData.email.trim() || !formData.email.includes("@")) {
        errs.email = "Valid email address is required";
      }
      if (!formData.phone.trim()) errs.phone = "Phone number is required";
    }

    if (currentStep === 2) {
      if (!formData.branch) errs.branch = "Please select your academic branch";
      if (!formData.year) errs.year = "Please select your academic year";
    }

    if (currentStep === 3) {
      if (formData.interests.length === 0) {
        errs.interests = "Please select at least one cybersecurity domain of interest";
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const executeSubmission = async () => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const appId = await submitClubApplication({
        ...formData,
        userId: user?.uid,
      });
      setApplicationId(appId);
      setSubmitted(true);
    } catch (err: any) {
      console.error("Submission error:", err);
      setSubmitError(err.message || "Failed to submit application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(step)) return;

    // Require authentication when submitting the official club application
    if (!user) {
      requireAuth(() => {
        executeSubmission();
      }, "Sign in required to submit your Cyber Cell application");
      return;
    }

    executeSubmission();
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-white flex flex-col">
      <Navbar />

      <main className="flex-1 pt-28 pb-20 px-4 sm:px-6 lg:px-8 cyber-grid">
        <div className="max-w-2xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-8">
            <span className="text-xs font-mono font-medium tracking-widest text-[#38bdf8] uppercase block mb-2">
              RECRUITMENT & MEMBERSHIP
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Join Cyber Cell SATI
            </h1>
            <p className="text-sm text-slate-400 mt-2">
              Whether you are an absolute beginner or an active CTF competitor, 
              Cyber Cell is open to all passionate SATI students.
            </p>
          </div>

          {/* Account Status Callout */}
          {!submitted && (
            <div className="mb-6 p-4 rounded-xl bg-[#0d111a] border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              {user ? (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-xs font-bold text-cyan-300">
                    {(user.displayName?.[0] || user.email?.[0] || "U").toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-white">
                        {user.displayName || user.email}
                      </span>
                      <span className="px-1.5 py-0.2 rounded text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Authenticated
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Your application will be linked directly to your student account.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
                    <p className="text-xs text-slate-300">
                      Sign in to link and track your application status.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => openAuthModal("Sign in to submit your Cyber Cell application")}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-xs font-medium text-cyan-300 transition-colors shrink-0"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Sign In</span>
                  </button>
                </div>
              )}
            </div>
          )}


          {!submitted ? (
            <div className="rounded-xl bg-[#0d111a] border border-white/[0.08] p-6 sm:p-10 shadow-xl">
              
              {/* Stepper Progress Bar */}
              <div className="mb-8">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                  <span>STEP {step} OF 4</span>
                  <span className="text-white font-medium">
                    {step === 1 && "Personal Info"}
                    {step === 2 && "Academic Details"}
                    {step === 3 && "Domain Interests"}
                    {step === 4 && "Experience & Submit"}
                  </span>
                </div>
                <div className="w-full h-1 bg-white/[0.08] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#0ea5e9] transition-all duration-200"
                    style={{ width: `${(step / 4) * 100}%` }}
                  />
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* STEP 1: Personal Info */}
                {step === 1 && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase text-slate-300 mb-1 font-semibold">
                      <User className="w-4 h-4 text-slate-400" />
                      Personal Information
                    </div>

                    <div>
                      <label className="block text-xs text-slate-300 font-medium mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Yash Sharma"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#07090e] border border-white/10 text-sm text-white focus:outline-none focus:border-white/30"
                      />
                      {errors.fullName && <p className="text-xs text-red-400 mt-1">{errors.fullName}</p>}
                    </div>

                    <div>
                      <label className="block text-xs text-slate-300 font-medium mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="college or personal email"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#07090e] border border-white/10 text-sm text-white focus:outline-none focus:border-white/30"
                      />
                      {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-xs text-slate-300 font-medium mb-1.5">
                        WhatsApp / Contact Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#07090e] border border-white/10 text-sm text-white focus:outline-none focus:border-white/30"
                      />
                      {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone}</p>}
                    </div>
                  </div>
                )}

                {/* STEP 2: Academic Info */}
                {step === 2 && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase text-slate-300 mb-1 font-semibold">
                      <GraduationCap className="w-4 h-4 text-slate-400" />
                      Academic Details
                    </div>

                    <div>
                      <label className="block text-xs text-slate-300 font-medium mb-1.5">
                        Branch of Engineering *
                      </label>
                      <select
                        value={formData.branch}
                        onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#07090e] border border-white/10 text-sm text-white focus:outline-none focus:border-white/30"
                      >
                        {branches.map((b) => (
                          <option key={b} value={b} className="bg-[#0d111a]">
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs text-slate-300 font-medium mb-1.5">
                        Current Academic Year *
                      </label>
                      <select
                        value={formData.year}
                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#07090e] border border-white/10 text-sm text-white focus:outline-none focus:border-white/30"
                      >
                        {years.map((y) => (
                          <option key={y} value={y} className="bg-[#0d111a]">
                            {y}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs text-slate-300 font-medium mb-1.5">
                        Scholar / Roll Number (Optional)
                      </label>
                      <input
                        type="text"
                        value={formData.scholarNumber}
                        onChange={(e) => setFormData({ ...formData, scholarNumber: e.target.value })}
                        placeholder="e.g. 0108CS221000"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#07090e] border border-white/10 text-sm text-white focus:outline-none focus:border-white/30"
                      />
                    </div>
                  </div>
                )}

                {/* STEP 3: Domain Interests */}
                {step === 3 && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase text-slate-300 mb-1 font-semibold">
                      <Crosshair className="w-4 h-4 text-slate-400" />
                      Cybersecurity Interests
                    </div>
                    <p className="text-xs text-slate-400 mb-3">
                      Select any tracks you are excited to learn or practice:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {interestOptions.map((interest) => {
                        const isSelected = formData.interests.includes(interest);
                        return (
                          <button
                            type="button"
                            key={interest}
                            onClick={() => handleInterestToggle(interest)}
                            className={`p-3 rounded-lg border text-left text-xs font-medium transition-colors flex items-center justify-between ${
                              isSelected
                                ? "bg-white/[0.08] border-white/40 text-white"
                                : "bg-[#07090e] border-white/[0.08] text-slate-400 hover:border-white/20 hover:text-slate-200"
                            }`}
                          >
                            <span>{interest}</span>
                            {isSelected && <CheckCircle2 className="w-4 h-4 text-[#38bdf8] shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                    {errors.interests && <p className="text-xs text-red-400 mt-1">{errors.interests}</p>}
                  </div>
                )}

                {/* STEP 4: Experience & Submit */}
                {step === 4 && (
                  <div className="space-y-5">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase text-slate-300 mb-1 font-semibold">
                      <Code2 className="w-4 h-4 text-slate-400" />
                      Experience & Background
                    </div>

                    <div>
                      <label className="block text-xs text-slate-300 font-medium mb-2">
                        Current Cybersecurity Proficiency Level
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {(["Beginner", "Intermediate", "Advanced"] as const).map((lvl) => (
                          <button
                            type="button"
                            key={lvl}
                            onClick={() => setFormData({ ...formData, experienceLevel: lvl })}
                            className={`py-2 rounded-lg border text-xs font-medium transition-colors ${
                              formData.experienceLevel === lvl
                                ? "bg-white text-black font-semibold border-white"
                                : "bg-[#07090e] border-white/[0.08] text-slate-400 hover:border-white/20"
                            }`}
                          >
                            {lvl}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-slate-300 font-medium mb-1.5">
                        GitHub / TryHackMe / HTB Profile (Optional)
                      </label>
                      <input
                        type="url"
                        value={formData.githubProfile}
                        onChange={(e) => setFormData({ ...formData, githubProfile: e.target.value })}
                        placeholder="https://github.com/username or TryHackMe profile"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#07090e] border border-white/10 text-sm text-white focus:outline-none focus:border-white/30"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-slate-300 font-medium mb-1.5">
                        Why do you want to join Cyber Cell? (Optional)
                      </label>
                      <textarea
                        rows={3}
                        value={formData.motivation}
                        onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                        placeholder="Tell us what you hope to build, learn, or solve..."
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#07090e] border border-white/10 text-sm text-white focus:outline-none focus:border-white/30 resize-none"
                      />
                    </div>

                    <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.05] text-[11px] text-slate-400 leading-relaxed font-mono">
                      By applying, you agree to adhere to ethical computing boundaries, institutional policies of SATI, and responsible disclosure standards.
                    </div>
                  </div>
                )}

                {/* Form Buttons */}
                <div className="pt-5 border-t border-white/[0.07] flex items-center justify-between">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/[0.04] text-xs font-medium text-slate-300 hover:text-white transition-colors"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back</span>
                    </button>
                  ) : (
                    <div />
                  )}

                  {step < 4 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-medium text-xs sm:text-sm transition-colors"
                    >
                      <span>Continue</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-medium text-xs sm:text-sm transition-colors disabled:opacity-60"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Saving to Firestore...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Submit Application</span>
                        </>
                      )}
                    </button>
                  )}
                </div>

                {submitError && (
                  <div className="mt-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center gap-2 text-xs text-rose-300">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                    <span>{submitError}</span>
                  </div>
                )}

              </form>
            </div>
          ) : (
            /* Success View */
            <div className="rounded-xl bg-[#0d111a] border border-white/[0.08] p-8 sm:p-12 text-center max-w-lg mx-auto shadow-2xl">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 mx-auto mb-4">
                <CheckCircle2 className="w-6 h-6" />
              </div>

              <h2 className="text-xl font-bold text-white mb-2">Application Received</h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                Thank you for applying to Cyber Cell, {formData.fullName}. 
                Your domain preferences ({formData.interests.join(", ")}) have been stored in the club database. 
                Our team will reach out via email once orientation schedules are announced.
              </p>

              {applicationId && (
                <div className="p-3.5 rounded-lg bg-cyan-500/[0.04] border border-cyan-500/20 text-xs font-mono text-cyan-300 mb-4 flex items-center justify-between">
                  <span className="text-slate-400">Application Reference ID:</span>
                  <span className="font-bold">{applicationId}</span>
                </div>
              )}

              <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/[0.05] text-[11px] font-mono text-slate-400 mb-6">
                Status: Under Review by SATI Central Coding Club
              </div>

              <button
                onClick={() => {
                  setSubmitted(false);
                  setStep(1);
                  setFormData(initialData);
                  setApplicationId("");
                }}
                className="px-4 py-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.08] text-xs font-medium text-white transition-colors"
              >
                Submit another response
              </button>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
