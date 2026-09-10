import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  ShieldCheck, 
  MapPin, 
  Calendar, 
  Users, 
  CheckCircle2, 
  Terminal, 
  ArrowRight, 
  Sparkles, 
  HelpCircle, 
  Info, 
  Building2, 
  Flame, 
  Layers, 
  Compass,
  FileBadge2
} from "lucide-react";

export const metadata = {
  title: "Offline Recruitment & Induction | Cyber Cell - SATI Vidisha",
  description: "Official recruitment guidelines and offline induction process for joining Cyber Cell at Samrat Ashok Technological Institute (SATI), Vidisha.",
};

const stages = [
  {
    step: "01",
    title: "Orientation & Induction Seminar",
    venue: "Auditorium / CSE Seminar Hall",
    timing: "Recruitment Week • Day 1",
    desc: "Attend our comprehensive campus orientation introducing Cyber Cell's research initiatives, live CTF team achievements, faculty mentors, and domain specializations.",
    badge: "Public Session",
  },
  {
    step: "02",
    title: "On-Campus Registration Desk",
    venue: "Central Computer Center (CCC) Lobby",
    timing: "Recruitment Week • Days 2 & 3",
    desc: "Visit our physical booth on campus. Meet the core team, submit your in-person candidate slip with your scholar number, and collect your offline induction token.",
    badge: "In-Person Verification",
  },
  {
    step: "03",
    title: "Hands-on Screening & Aptitude Challenge",
    venue: "Advanced Computing Lab",
    timing: "Recruitment Week • Day 4",
    desc: "An engaging, beginner-accessible offline challenge covering fundamental networking, Linux commands, logical reasoning, and basic security puzzles. No prior hacking expertise required for junior trainees.",
    badge: "Practical Assessment",
  },
  {
    step: "04",
    title: "Technical & Behavioral Interview",
    venue: "Cyber Cell Lab, SATI Campus",
    timing: "Recruitment Week • Day 5",
    desc: "A personalized one-on-one conversation with domain leads and faculty advisors. We evaluate your curiosity, ethical responsibility, willingness to learn, and teamwork mindset.",
    badge: "Personal Discussion",
  },
  {
    step: "05",
    title: "Final Induction & Lab Onboarding",
    venue: "Cyber Cell Headquarters",
    timing: "Semester Kickoff",
    desc: "Inducted members receive official onboarding into internal research squads, access to private CTF challenge environments, mentorship tracks, and lab privileges.",
    badge: "Official Induction",
  },
];

const domains = [
  {
    name: "Offensive Security (Red Team)",
    desc: "Vulnerability analysis, web security, reverse engineering & exploit research within authorized labs.",
  },
  {
    name: "Defensive Security (Blue Team)",
    desc: "SOC operations, intrusion detection, hardening network systems & digital forensics.",
  },
  {
    name: "Competitive CTF Squad",
    desc: "Representing SATI in national and international Capture The Flag ethical hacking contests.",
  },
  {
    name: "Cloud & DevSecOps",
    desc: "Securing containers, cloud architecture, CI/CD pipeline defense, and infrastructure security.",
  },
  {
    name: "Cyber Awareness & Policy",
    desc: "Student community outreach, digital forensics awareness, cybersecurity seminars, and workshops.",
  },
];

const faqs = [
  {
    q: "Is there an online application form I need to fill?",
    a: "No. All recruitment for Cyber Cell is conducted strictly offline through on-campus verification, registration desks, and in-person interviews at the SATI Vidisha campus.",
  },
  {
    q: "Do I need prior hacking or coding experience to join?",
    a: "No previous cybersecurity experience is required for junior trainees. What matters most is genuine curiosity, problem-solving mindset, consistency, and an ethical commitment.",
  },
  {
    q: "Which branches and academic years are eligible?",
    a: "Students from all branches (CSE, IT, AI/DS, IoT, ECE, EE, ME, CE) and all academic years (1st, 2nd, 3rd, 4th Year B.Tech & MCA) are eligible to participate in offline recruitment drives.",
  },
  {
    q: "What should I bring to the offline registration desk?",
    a: "Please carry your valid SATI College Student ID card, your scholar number, and a notepad or laptop if you wish to take notes during the orientation.",
  },
  {
    q: "How are the recruitment dates announced?",
    a: "Dates and desk timings are officially posted on the college department notice boards, classroom announcements, and Cyber Cell's official campus community channels.",
  },
];

export default function JoinPage() {
  return (
    <div className="min-h-screen bg-[#06080d] text-white selection:bg-cyan-500/30 selection:text-cyan-200">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Banner */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-4">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>OFFLINE RECRUITMENT • ON-CAMPUS INDUCTION</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
              Join <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">Cyber Cell</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Official student-driven cybersecurity and ethical defense body of{" "}
              <span className="text-white font-medium">Samrat Ashok Technological Institute (SATI), Vidisha</span>.
              All memberships and core lead positions are recruited through our structured offline on-campus drive.
            </p>
          </div>

          {/* Important Offline Notice Card */}
          <div className="mb-16 p-6 sm:p-8 rounded-2xl bg-[#090d16] border border-cyan-500/30 shadow-[0_0_40px_rgba(6,182,212,0.1)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0 text-cyan-400">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2.5 mb-1">
                    <h2 className="text-lg sm:text-xl font-bold text-white">
                      Recruitment is Exclusively Offline
                    </h2>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 uppercase">
                      In-Person Drive
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                    To maintain ethical accountability and foster real-world collaborative spirit, we do not use online application forms. 
                    Candidates are evaluated on-campus through orientation sessions, physical desk registration, aptitude challenges, and in-person interviews.
                  </p>
                </div>
              </div>

              <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
                <Link
                  href="/about#contact"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs transition-colors text-center"
                >
                  <span>Contact Coordinators</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/resources"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] border border-white/10 text-white text-xs font-medium transition-colors text-center"
                >
                  <span>Prepare with Roadmap</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            <div className="p-5 rounded-xl bg-[#090d16] border border-white/[0.08]">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-3">
                <MapPin className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">Primary Venue</h3>
              <p className="text-sm font-semibold text-white">Central Computer Center (CCC)</p>
              <p className="text-xs text-slate-400 mt-0.5">SATI Campus, Vidisha (M.P.)</p>
            </div>

            <div className="p-5 rounded-xl bg-[#090d16] border border-white/[0.08]">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-3">
                <Users className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">Eligibility</h3>
              <p className="text-sm font-semibold text-white">All Branches & Years</p>
              <p className="text-xs text-slate-400 mt-0.5">1st to 4th Year B.Tech & MCA</p>
            </div>

            <div className="p-5 rounded-xl bg-[#090d16] border border-white/[0.08]">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-3">
                <Calendar className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">Frequency</h3>
              <p className="text-sm font-semibold text-white">Semester Drives</p>
              <p className="text-xs text-slate-400 mt-0.5">Odd & Even Semester Cycles</p>
            </div>

            <div className="p-5 rounded-xl bg-[#090d16] border border-white/[0.08]">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">Selection Focus</h3>
              <p className="text-sm font-semibold text-white">Curiosity & Ethics</p>
              <p className="text-xs text-slate-400 mt-0.5">No prior expert hacking required</p>
            </div>
          </div>

          {/* Detailed Recruitment Stages Timeline */}
          <div className="mb-20">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                OFFLINE PROCESS
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1 mb-2">
                5-Stage Offline Induction Roadmap
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Here is the step-by-step procedure followed during our official on-campus recruitment drives.
              </p>
            </div>

            <div className="space-y-4 max-w-4xl mx-auto">
              {stages.map((stage) => (
                <div
                  key={stage.step}
                  className="p-6 rounded-2xl bg-[#080c14] border border-white/[0.08] hover:border-cyan-500/30 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-[#0c1220] border border-white/10 flex items-center justify-center shrink-0 font-mono font-bold text-cyan-400 group-hover:border-cyan-500/40 group-hover:bg-cyan-500/10 transition-colors">
                      {stage.step}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="text-base font-semibold text-white group-hover:text-cyan-300 transition-colors">
                          {stage.title}
                        </h3>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.06] text-slate-300 border border-white/10">
                          {stage.badge}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed mb-2 max-w-2xl">
                        {stage.desc}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono text-slate-400">
                        <span className="flex items-center gap-1.5 text-slate-300">
                          <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                          {stage.venue}
                        </span>
                        <span className="flex items-center gap-1.5 text-slate-400">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          {stage.timing}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Domains We Recruit For */}
          <div className="mb-20">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                SPECIALIZATION TRACKS
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1 mb-2">
                Domains Open During Induction
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                You will have the opportunity to join or train under one or more specialized cybersecurity domains.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
              {domains.map((domain, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-[#090d16] border border-white/[0.08] hover:border-cyan-500/30 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Terminal className="w-4 h-4 text-cyan-400" />
                      <h3 className="text-sm font-semibold text-white">{domain.name}</h3>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {domain.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-500">
                    <span>SATI Cyber Cell</span>
                    <span className="text-cyan-400">Offline Mentored</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Frequently Asked Questions */}
          <div className="mb-16 max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono text-slate-300 mb-2">
                <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
                <span>FREQUENTLY ASKED QUESTIONS</span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Offline Recruitment FAQs
              </h2>
            </div>

            <div className="space-y-3.5">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="p-5 rounded-xl bg-[#080c14] border border-white/[0.08]"
                >
                  <h3 className="text-sm font-semibold text-white mb-1.5 flex items-start gap-2">
                    <span className="text-cyan-400 font-mono">Q.</span>
                    <span>{faq.q}</span>
                  </h3>
                  <p className="text-xs text-slate-400 pl-5 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Final Call to Action */}
          <div className="text-center p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#090e1a] to-[#06080d] border border-white/10 relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 mb-4">
                <Flame className="w-6 h-6" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                Ready to Defend, Hack & Build?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
                Stay tuned for physical circulars on SATI college notice boards. Start sharpening your basics now with our curated roadmaps and resource vault.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/resources"
                  className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs sm:text-sm transition-colors"
                >
                  Explore Resource Vault
                </Link>
                <Link
                  href="/events"
                  className="px-6 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] border border-white/10 text-white font-medium text-xs sm:text-sm transition-colors"
                >
                  View Campus Events
                </Link>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
