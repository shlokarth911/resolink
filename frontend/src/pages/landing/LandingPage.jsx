import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Sparkles,
  ShieldCheck,
  Zap,
  Globe,
  ArrowRight,
  BrainCircuit,
  Building2,
  Users,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const LandingPage = () => {
  const containerRef = useRef(null);
  const heroRef = useRef(null);

  useGSAP(
    () => {
      // Hero Animations
      const tl = gsap.timeline();

      tl.from(".hero-content > *", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power4.out",
      })
        .from(
          ".hero-image",
          {
            scale: 0.8,
            opacity: 0,
            duration: 1.5,
            ease: "expo.out",
          },
          "-=0.8",
        )
        .to(".hero-glow", {
          opacity: 0.6,
          duration: 2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });

      // Scroll Animations for Sections
      gsap.utils.toArray(".feature-card").forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.1,
          ease: "power2.out",
        });
      });

      gsap.from(".gemini-section", {
        scrollTrigger: {
          trigger: ".gemini-section",
          start: "top 80%",
        },
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
      });
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-black text-white selection:bg-purple-500/30 overflow-x-hidden font-sans"
    >
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-purple-600/20 rounded-full blur-[120px] hero-glow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-blue-600/20 rounded-full blur-[120px] hero-glow animation-delay-2000"></div>
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center backdrop-blur-lg bg-white/5 border-b border-white/10 mx-auto max-w-7xl mt-4 rounded-full w-[95%]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-linear-to-tr from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white to-gray-400">
            ResoLink
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <a href="#features" className="hover:text-white transition-colors">
            Features
          </a>
          <a
            href="#how-it-works"
            className="hover:text-white transition-colors"
          >
            How it Works
          </a>
          <a href="#about" className="hover:text-white transition-colors">
            About
          </a>
        </div>
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
          >
            Log In
          </Link>
          <Link
            to="/register"
            className="px-5 py-2.5 bg-white text-black text-sm font-semibold rounded-full hover:bg-gray-200 transition-transform active:scale-95"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative z-10 pt-40 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center"
      >
        <div className="hero-content max-w-4xl space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-sm font-medium text-gray-300">
              Powered by Google Gemini 3
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-tight">
            Connect. Resolve. <br />
            <span className="bg-clip-text text-transparent bg-linear-to-r from-purple-400 via-blue-400 to-purple-400 animate-gradient">
              Evolve.
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
            The next-generation platform connecting users with organizations for
            seamless issue resolution, powered by advanced AI analysis.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              to="/register"
              className="group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] transition-all"
            >
              <span className="relative z-10 flex items-center gap-2">
                Join as User <Users className="w-4 h-4" />
              </span>
              <div className="absolute inset-0 bg-linear-to-r from-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>
            <Link
              to="/org/register"
              className="group px-8 py-4 bg-transparent border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-all backdrop-blur-sm"
            >
              <span className="flex items-center gap-2">
                For Organizations <Building2 className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Gemini Integration Section */}
      <section
        id="how-it-works"
        className="gemini-section relative z-10 py-32 px-6"
      >
        <div className="max-w-7xl mx-auto">
          <div className="bg-linear-to-b from-purple-900/40 to-black border border-white/10 rounded-3xl p-12 md:p-20 overflow-hidden relative">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>

            <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center justify-center p-3 bg-blue-500/20 rounded-xl border border-blue-500/30">
                  <BrainCircuit className="w-8 h-8 text-blue-400" />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold">
                  Intelligent Issue <br />
                  <span className="text-blue-400">Analysis</span>
                </h2>
                <p className="text-lg text-gray-400 leading-relaxed">
                  We don't just list problems. We understand them. Utilizing
                  Google's Gemini 3 models, ResoLink automatically categorizes,
                  prioritizes, and suggests solutions for every reported issue.
                </p>
                <div className="space-y-4">
                  {[
                    "Automatic Category Detection",
                    "Severity Assessment",
                    "Smart Resolution Suggestions",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                        <Zap className="w-3 h-3 text-green-400" />
                      </div>
                      <span className="text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-blue-500/20 blur-[80px] rounded-full"></div>
                <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
                  {/* Mock UI for AI Analysis */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      <span className="text-xs font-mono text-gray-400">
                        Start Analysis...
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 w-3/4 bg-white/10 rounded animate-pulse"></div>
                      <div className="h-2 w-1/2 bg-white/10 rounded animate-pulse delay-75"></div>
                      <div className="h-2 w-full bg-white/10 rounded animate-pulse delay-150"></div>
                    </div>
                    <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20 mt-4">
                      <p className="text-sm text-blue-300 font-mono">
                        {">"} Issue detected: Infrastructure Failure
                        <br />
                        {">"} Priority: High
                        <br />
                        {">"} Assigning to: maintenance_team_alpha
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section
        id="features"
        className="relative z-10 py-20 px-6 max-w-7xl mx-auto"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Built for Efficiency
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Streamline your workflow with tools designed for speed and
            transparency.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: ShieldCheck,
              title: "Verified Organizations",
              desc: "Every organization on ResoLink is verified to ensure legitimate issue resolution and trust.",
            },
            {
              icon: Globe,
              title: "Public Transparency",
              desc: "Issues can be viewed publicly, fostering accountability and faster resolution times.",
            },
            {
              icon: Zap,
              title: "Real-time Updates",
              desc: "Get instant notifications when your issue status changes or an organization responds.",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="feature-card p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-sm group cursor-pointer"
            >
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-32 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            Ready to resolve better?
          </h2>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform"
          >
            Get Started Now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-white/10 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} ResoLink. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
