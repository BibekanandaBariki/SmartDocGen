'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary">SmartDocGen</span>
          </Link>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <FaTimes className="h-6 w-6" />
            ) : (
              <FaBars className="h-6 w-6" />
            )}
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary">
              Home
            </Link>
            <Link href="/generate" className="text-gray-700 hover:text-primary">
              Generate Documents
            </Link>
            <Link href="/chart-bot" className="text-gray-700 hover:text-primary">
              Chart Bot
            </Link>
            <Link href="/chat-assistant" className="text-gray-700 hover:text-primary">
              Chat Assistant
            </Link>
            <Link href="/templates" className="text-gray-700 hover:text-primary">
              Templates
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-primary">
              About
            </Link>
          </nav>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-gray-700 hover:text-primary px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/generate"
                className="text-gray-700 hover:text-primary px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Generate Documents
              </Link>
              <Link
                href="/chart-bot"
                className="text-gray-700 hover:text-primary px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Chart Bot
              </Link>
              <Link
                href="/chat-assistant"
                className="text-gray-700 hover:text-primary px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Chat Assistant
              </Link>
              <Link
                href="/templates"
                className="text-gray-700 hover:text-primary px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Templates
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-primary px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
} 