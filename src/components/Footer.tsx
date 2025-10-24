'use client';

import Link from 'next/link';
import { FaGithub, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">SmartDocGen</h3>
            <p className="text-gray-400">
              AI-powered legal document generator. Create professional legal documents with ease.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/generate" className="text-gray-400 hover:text-white">
                  Generate
                </Link>
              </li>
              <li>
                <Link href="/chart-bot" className="text-gray-400 hover:text-white">
                  Chart Bot
                </Link>
              </li>
              <li>
                <Link href="/chat-assistant" className="text-gray-400 hover:text-white">
                  Chat Assistant
                </Link>
              </li>
              <li>
                <Link href="/templates" className="text-gray-400 hover:text-white">
                  Templates
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white">
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Document Types</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/generate?type=contract" className="text-gray-400 hover:text-white">
                  Contracts
                </Link>
              </li>
              <li>
                <Link href="/generate?type=agreement" className="text-gray-400 hover:text-white">
                  Agreements
                </Link>
              </li>
              <li>
                <Link href="/generate?type=notice" className="text-gray-400 hover:text-white">
                  Legal Notices
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Connect with Bibekananda</h3>
            <p className="text-gray-400 mb-4 text-sm">
              Co-founder & CEO of SmartDocGen
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/bibekanandabariki"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="GitHub"
                title="GitHub Profile"
              >
                <FaGithub className="h-6 w-6" />
              </a>
              <a
                href="https://x.com/bibek_bariki"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter/X"
                title="Twitter/X Profile"
              >
                <FaTwitter className="h-6 w-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/bibekananda-bariki-89840b324/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
                title="LinkedIn Profile"
              >
                <FaLinkedin className="h-6 w-6" />
              </a>
              <a
                href="https://www.instagram.com/bibekbariki"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
                title="Instagram Profile"
              >
                <FaInstagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} SmartDocGen. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 