"use client";

import { useEffect, useState } from "react";
import IgniteLogo from "./IgniteLogo";

const navLinks = [
  { label: "What We Do", href: "#what-we-do" },
  { label: "Workflows", href: "#workflows" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Active section tracking
      const sections = ["hero", "what-we-do", "workflows", "faq", "contact"];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "glass-nav py-3" : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavClick("#hero")}
            className="transition-opacity hover:opacity-80"
            aria-label="Go to top"
          >
            <IgniteLogo size={36} />
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`text-sm font-medium tracking-wide transition-all duration-300 relative
                    ${isActive ? "text-white" : "text-white/50 hover:text-white/90"}`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
                  )}
                </button>
              );
            })}

            <button
              onClick={() => handleNavClick("#contact")}
              className="btn-primary px-5 py-2.5 text-sm font-semibold tracking-wide"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                mobileOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                mobileOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-500 md:hidden ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-2xl"
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 h-full w-72 glass-nav flex flex-col pt-24 px-8 gap-8 transition-transform duration-500 ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-xl font-semibold text-white/80 hover:text-white text-left transition-colors duration-200"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick("#contact")}
            className="btn-primary px-6 py-3 text-base font-semibold mt-4"
          >
            Get Started
          </button>
        </div>
      </div>
    </>
  );
}
