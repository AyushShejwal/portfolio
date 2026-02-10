'use client';

import { useState } from 'react';
import Link from 'next/link';
import ResumeViewer from './ResumeViewer';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Experience', href: '#experience' },
    { name: 'Resume', action: () => setIsResumeOpen(true) },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full flex justify-center items-center px-10 py-6">
      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-1.5 bg-black rounded-full px-6 py-3 shadow-xl">
        {navItems.map((item) => (
          item.action ? (
            <button
              key={item.name}
              onClick={item.action}
              className="px-5 py-1.5 text-gray-300 font-medium hover:text-white hover:bg-gray-900 rounded-full transition-all cursor-pointer"
            >
              {item.name}
            </button>
          ) : (
            <Link
              key={item.name}
              href={item.href!}
              className="px-5 py-1.5 text-gray-300 font-medium hover:text-white hover:bg-gray-900 rounded-full transition-all cursor-pointer"
            >
              {item.name}
            </Link>
          )
        ))}
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden w-full flex justify-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-black rounded-full px-6 py-3 text-gray-300 hover:text-white focus:outline-none shadow-xl"
        >
          <span className="sr-only">Open main menu</span>
          {!isOpen ? (
            <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          ) : (
            <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-1/2 transform -translate-x-1/2 bg-black rounded-3xl shadow-xl px-6 py-4 min-w-[200px]">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              item.action ? (
                <button
                  key={item.name}
                  onClick={() => {
                    item.action();
                    setIsOpen(false);
                  }}
                  className="text-gray-300 hover:text-white hover:bg-gray-900 px-4 py-3 rounded-full text-center font-medium transition-all"
                >
                  {item.name}
                </button>
              ) : (
                <Link
                  key={item.name}
                  href={item.href!}
                  className="text-gray-300 hover:text-white hover:bg-gray-900 px-4 py-3 rounded-full text-center font-medium transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              )
            ))}
          </div>
        </div>
      )}

      <ResumeViewer isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </nav>
  );
};

export default Navbar; 