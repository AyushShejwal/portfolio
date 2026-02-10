'use client';

import React from 'react';
import Image from "next/image";
import Navbar from './components/Navbar';
import ChatWidget from './components/ChatWidget';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, MapPin, Briefcase } from "lucide-react";

interface BulletPoint {
  text: string;
  stat?: { value: string; label: string };
}

interface Experience {
  company: string;
  logo: string;
  url: string;
  role: string;
  location: string;
  period: string;
  bullets: BulletPoint[];
  tags: string[];
}

const experiences: Experience[] = [
  {
    company: "Pebbles AI",
    logo: "/pebbles.png",
    url: "https://pebblesai.xyz",
    role: "AI/Full-Stack Engineering Intern",
    location: "Remote",
    period: "Aug 2025 — Present",
    bullets: [
      {
        text: "Architected a high-performance local RAG system in Python/Flask using ChromaDB and vLLM, implementing two-stage retrieval (dense embeddings + BAAI cross-encoder reranking) to reduce query latency by 95% (71.8s → 2.5s) while preserving multi-document reasoning accuracy",
      },
      {
        text: "Led inference architecture pivot from PowerInfer to vLLM with Qwen2.5-7B-Instruct, enabling stable 128K-context serving; built secure Gmail and Outlook ingestion pipelines integrated into a GPU-backed RunPod deployment.",
      },
      {
        text: "Built a cross-platform Tauri desktop app bundling a local Python AI backend via PyInstaller with automated provisioning",
      },
    ],
    tags: ["Python", "Flask", "vLLM", "ChromaDB", "Tauri", "RunPod"],
  },
  {
    company: "STILED",
    logo: "/stiled.png",
    url: "https://thestiled.com",
    role: "CTO, Co-founder",
    location: "Tempe, AZ",
    period: "Apr 2025 — Present",
    bullets: [
      {
        text: "Developed an AI-powered virtual try-on platform with Gemini 2.5 and MediaPipe, integrating fit scoring based on body measurements and skin tone (ITA°/LAB) to generate real-time, anatomically accurate outfit visualizations.",
      },
      {
        text: "Built and deployed scalable backend services on GCP with PostgreSQL and Firebase; engineered brand-specific scrapers for 30+ retail websites with automated measurement normalization to support dynamic content.",
      },
      {
        text: "Validated product with 50 pilot users (ages 18–31): 89% Found combined fit+color+outfit suggestions useful, 92.5% would use while shopping online, featured in Business of Fashion and AllThingsFashionTech.",
      },
    ],
    tags: ["GCP", "Gemini", "MediaPipe", "PostgreSQL", "Firebase"],
  },
];

// Helper function to render text with bold keywords
const renderTextWithBoldKeywords = (text: string) => {
  const keywords = [
    'RAG', 'Python/Flask', 'ChromaDB', 'vLLM', 'BAAI', '95%',
    'Qwen2.5-7B-Instruct', '128K', 'Tauri', 'PyInstaller',
    'Gemini 2.5', 'MediaPipe', 'GCP', 'PostgreSQL', 'Firebase',
    '89%', '50', 'Business of Fashion', 'AllThingsFashionTech', '92.5%'
  ];

  let parts: (string | React.ReactElement)[] = [text];
  let keyCounter = 0;

  keywords.forEach((keyword, kwIndex) => {
    const newParts: (string | React.ReactElement)[] = [];
    parts.forEach((part, idx) => {
      if (typeof part === 'string') {
        const regex = new RegExp(`(${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        const segments = part.split(regex);
        segments.forEach((segment, segIdx) => {
          if (segment.toLowerCase() === keyword.toLowerCase()) {
            newParts.push(
              <span key={`kw-${kwIndex}-${idx}-${segIdx}-${keyCounter++}`} className="font-bold text-base text-[#1a2332]">
                {segment}
              </span>
            );
          } else if (segment) {
            newParts.push(segment);
          }
        });
      } else {
        newParts.push(part);
      }
    });
    parts = newParts;
  });

  return <>{parts}</>;
};

const ExperienceCard = ({ exp, index }: { exp: Experience; index: number }) => {
  const [hovered, setHovered] = useState(false);
  const isLeft = index === 0; // Pebbles AI on left, STILED on right

  return (
    <div className="relative flex items-center">
      {/* Timeline dot */}
      <motion.div
        className="w-2 h-2 rounded-full bg-[#1a2332] z-10 relative"
        animate={hovered ? { scale: 1.5 } : { scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
      {hovered && (
        <motion.div
          className="absolute w-4 h-4 rounded-full bg-[#1a2332]/20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
        />
      )}

      {/* Main card container */}
      <div
        className={`absolute ${isLeft ? 'right-6' : 'left-6'}`}
      >
        {/* Always visible: Logo + basic info */}
        <motion.div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className={`flex flex-col items-center text-center w-48 relative z-20`}
          animate={hovered ? { y: -8 } : { y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <a
            href={exp.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link flex flex-col items-center mb-4 relative"
          >
            <div className="w-40 h-40 flex items-center justify-center mb-0 group-hover/link:scale-105 transition-transform relative">
              <Image
                src={exp.logo}
                alt={exp.company}
                width={140}
                height={140}
                className="object-contain"
              />
              <div className="absolute -top-1 -right-1 bg-white rounded-full p-1.5 shadow-sm opacity-0 group-hover/link:opacity-100 transition-opacity">
                <ExternalLink className="w-4 h-4 text-[#1a2332]" />
              </div>
            </div>
          </a>

          <div className="space-y-0.5 text-center -mt-2">
            <div className="text-sm font-semibold text-[#1a2332] mt-1">{exp.role}</div>
            <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
              <MapPin className="w-3 h-3" />
              {exp.location}
            </div>
            <div className="text-xs text-gray-500 font-mono">{exp.period}</div>
          </div>

          {/* Hover reveal content - positioned around the logo */}
          <AnimatePresence>
            {hovered && exp.bullets.map((bullet, bIndex) => {
              // Position: 0 = above, 1 = side, 2 = below
              const positions = [
                'absolute -top-44 left-1/2 -translate-x-1/2 w-96',
                `absolute top-1/2 -translate-y-1/2 w-80 ${isLeft ? '-left-96' : '-right-96'}`,
                'absolute -bottom-48 left-1/2 -translate-x-1/2 w-96'
              ];

              return (
                <motion.div
                  key={bIndex}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: bIndex * 0.1, duration: 0.3 }}
                  className={positions[bIndex]}
                >
                  {bullet.stat ? (
                    <div className="p-4">
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-2xl font-extrabold text-[#1a2332]">
                          {bullet.stat.value}
                        </span>
                        <span className="text-xs font-medium text-gray-500">
                          {bullet.stat.label}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed text-gray-700" style={{ fontFamily: 'var(--font-kalam)' }}>
                        {renderTextWithBoldKeywords(bullet.text)}
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm leading-relaxed text-gray-700" style={{ fontFamily: 'var(--font-kalam)' }}>
                      {renderTextWithBoldKeywords(bullet.text)}
                    </p>
                  )}

                  {/* Handwritten curved lines below each point */}
                  <div className="mt-3">
                    <svg
                      width="100%"
                      height="25"
                      viewBox="0 0 400 25"
                      preserveAspectRatio="none"
                      className="w-full"
                    >
                      <path
                        d="M 0 20 Q 100 12, 200 8 Q 300 5, 400 3"
                        stroke={bIndex === 0 ? '#ef4444' : bIndex === 1 ? '#3b82f6' : '#22c55e'}
                        strokeWidth="2.5"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M 0 15 Q 100 13, 200 12 Q 300 10, 400 9"
                        stroke={bIndex === 0 ? '#ef4444' : bIndex === 1 ? '#3b82f6' : '#22c55e'}
                        strokeWidth="2.5"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Tags - positioned below the bottom bullet point */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              className="absolute -bottom-64 left-1/2 -translate-x-1/2 flex flex-wrap gap-1.5 justify-center w-96"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.3 }}
            >
              {exp.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-gray-100/80 px-2.5 py-0.5 font-mono text-[10px] font-medium text-gray-700"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const ExperienceSection = () => {
  return (
    <section id="experience" className="snap-section relative min-h-screen flex items-center justify-center px-6 md:px-12 bg-[#FDF8F3]">
      <div className="max-w-6xl mx-auto w-full">

        {/* Horizontal timeline */}
        <div className="relative flex items-center justify-center gap-32 max-w-6xl mx-auto">
          {/* Horizontal line */}
          <div className="absolute left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300" />

          {/* Left experience (Pebbles AI) */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
              }}
            >
              <ExperienceCard exp={experiences[0]} index={0} />
            </motion.div>
          </div>

          {/* Right experience (STILED) */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.15,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
              }}
            >
              <ExperienceCard exp={experiences[1]} index={1} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  const [charIndex, setCharIndex] = useState(0);
  const [isLightOn, setIsLightOn] = useState(true);
  const [showHindi, setShowHindi] = useState(false);
  const lines = [
    'Hey, I\'m Ayush',
    'Building Products',
    'With Purpose 💡'
  ];
  const fullText = lines.join('');

  useEffect(() => {
    const interval = setInterval(() => {
      setCharIndex((prev) => {
        if (prev < fullText.length) {
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Wait for typing to finish, then toggle to Hindi and back to English once
    if (charIndex >= fullText.length) {
      const timer1 = setTimeout(() => {
        setShowHindi(true); // Switch to Hindi
        const timer2 = setTimeout(() => {
          setShowHindi(false); // Switch back to English
        }, 2000);
        return () => clearTimeout(timer2);
      }, 500);

      return () => clearTimeout(timer1);
    }
  }, [charIndex, fullText.length]);

  const getDisplayLines = () => {
    let charCount = 0;
    return lines.map((line) => {
      const lineStart = charCount;
      const lineEnd = charCount + line.length;
      charCount += line.length;

      if (charIndex < lineStart) {
        return '';
      } else if (charIndex >= lineEnd) {
        return line;
      } else {
        return line.slice(0, charIndex - lineStart);
      }
    });
  };

  const getCurrentLine = () => {
    let charCount = 0;
    for (let i = 0; i < lines.length; i++) {
      const lineEnd = charCount + lines[i].length;
      if (charIndex < lineEnd) {
        return i;
      }
      charCount += lines[i].length;
    }
    return lines.length - 1;
  };

  const displayLines = getDisplayLines();
  const currentLine = getCurrentLine();

  return (
    <main className="min-h-screen bg-[#FDF8F3] transition-all duration-500 relative" style={{ filter: isLightOn ? 'none' : 'brightness(0.5)' }}>
      <Navbar />
      <ChatWidget />
      <div>
        {/* Hero Section */}
        <section className="hero-section relative min-h-screen px-4 flex flex-col items-center justify-center">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <h1 className="text-5xl md:text-6xl lg:text-7xl text-[#1a2332] leading-tight min-h-[200px] md:min-h-[220px] lg:min-h-[270px]">
                {displayLines.map((line, index) => (
                  <span key={index}>
                    {index === 0 ? (
                      <>
                        {line.includes('Ayush') ? (
                          <>
                            {line.replace('Ayush', '').trim()}{' '}
                            <span
                              onClick={() => setShowHindi(!showHindi)}
                              className="cursor-pointer inline-block hover:scale-105 active:scale-95 relative"
                              style={{ minWidth: '150px' }}
                            >
                              <span
                                className="absolute left-0 top-0 transition-all duration-700 ease-in-out"
                                style={{
                                  opacity: showHindi ? 0 : 1,
                                  transform: showHindi ? 'translateY(-20px) scale(0.8)' : 'translateY(0) scale(1)',
                                  filter: showHindi ? 'blur(4px)' : 'blur(0px)'
                                }}
                              >
                                Ayush
                              </span>
                              <span
                                className="absolute left-0 top-0 transition-all duration-700 ease-in-out"
                                style={{
                                  opacity: showHindi ? 1 : 0,
                                  transform: showHindi ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.8)',
                                  filter: showHindi ? 'blur(0px)' : 'blur(4px)'
                                }}
                              >
                                आयुष
                              </span>
                              <span className="invisible">Ayush</span>
                            </span>
                          </>
                        ) : (
                          line
                        )}
                      </>
                    ) : index === lines.length - 1 ? (
                      <>
                        {line.replace('💡', '').trim()}
                        {line.includes('💡') && (
                          <>
                            {' '}
                            <span className="relative inline-block">
                              <span
                                onClick={() => setIsLightOn(!isLightOn)}
                                className="cursor-pointer inline-block transition-all hover:scale-110 active:scale-95"
                                style={{
                                  filter: isLightOn ? 'none' : 'grayscale(100%) brightness(0.5)',
                                  textShadow: isLightOn ? '0 0 20px rgba(255, 223, 0, 0.8), 0 0 40px rgba(255, 223, 0, 0.5)' : 'none'
                                }}
                                role="button"
                                aria-label="Toggle light"
                              >
                                💡
                              </span>
                              <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                                <svg width="40" height="30" viewBox="0 0 40 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path
                                    d="M 5 25 Q 15 5, 35 15"
                                    stroke="#1a2332"
                                    strokeWidth="2"
                                    fill="none"
                                    strokeLinecap="round"
                                  />
                                  <path
                                    d="M 35 15 L 30 12 M 35 15 L 32 19"
                                    stroke="#1a2332"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                <span
                                  className="whitespace-nowrap text-2xl md:text-3xl"
                                  style={{
                                    fontFamily: 'var(--font-caveat)',
                                    color: '#1a2332'
                                  }}
                                >
                                  click me
                                </span>
                              </div>
                            </span>
                          </>
                        )}
                      </>
                    ) : (
                      line
                    )}
                    {index === currentLine && charIndex < fullText.length && (
                      <span className="animate-pulse">|</span>
                    )}
                    {index < displayLines.length - 1 && <br />}
                  </span>
                ))}
              </h1>
              <p className="text-gray-600 text-lg max-w-lg">
                Computer Science Student at Arizona State University, passionate about building innovative solutions and exploring new technologies.
              </p>

              {/* Social Links */}
              <div className="flex gap-4">
                <a href="https://linkedin.com/in/your-linkedin" target="_blank" rel="noopener noreferrer" className="text-[#0A66C2] hover:text-[#004182] transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer" className="text-[#181717] hover:text-[#000000] transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Right Illustration */}
            <div className="relative h-[500px] w-full">
              <Image
                src="/images/hero-illustration.svg"
                alt="Hero Illustration"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <ExperienceSection />

        {/* Contact Section */}
        <section id="contact" className="snap-section relative min-h-screen flex items-center justify-center px-6 md:px-12 bg-[#FDF8F3]">
          <div className="max-w-4xl mx-auto w-full text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight text-[#1a2332] mb-12">
                Get In Touch
              </h2>

              <div className="space-y-6 mb-12">
                <motion.a
                  href="mailto:ayushshejwal2204@gmail.com"
                  className="block text-xl md:text-2xl text-gray-700 hover:text-[#1a2332] transition-colors font-medium"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  ayushshejwal2204@gmail.com
                </motion.a>

                <motion.a
                  href="mailto:ashejwal@asu.edu"
                  className="block text-xl md:text-2xl text-gray-700 hover:text-[#1a2332] transition-colors font-medium"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  ashejwal@asu.edu
                </motion.a>
              </div>

              {/* Social Links */}
              <div className="flex gap-6 justify-center">
                <motion.a
                  href="https://linkedin.com/in/ayush-shejwal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0A66C2] hover:text-[#004182] transition-colors"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </motion.a>
                <motion.a
                  href="https://github.com/ayushshejwal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#181717] hover:text-[#000000] transition-colors"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  );
}
