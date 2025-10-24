'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FaFileAlt, FaClipboardList, FaDownload, FaRobot, FaChartLine, FaShieldAlt, FaComments } from 'react-icons/fa';

export default function Home() {
  const [selectedDocType, setSelectedDocType] = useState<string | null>(null);

  const documentTypes = [
    {
      id: 'contract',
      title: 'Contract',
      description: 'Standard contracts for business or personal use',
      icon: <FaFileAlt className="w-12 h-12 text-primary" />,
    },
    {
      id: 'agreement',
      title: 'Agreement',
      description: 'Various legal agreements for different purposes',
      icon: <FaClipboardList className="w-12 h-12 text-primary" />,
    },
    {
      id: 'notice',
      title: 'Legal Notice',
      description: 'Formal legal notices for various situations',
      icon: <FaDownload className="w-12 h-12 text-primary" />,
    },
  ];

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-12">
        <section className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            AI-Powered Legal Document Generator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Generate professional legal documents in minutes using advanced AI technology.
            Customize templates to fit your needs and download in PDF format.
          </p>
          <div className="mt-8 flex justify-center">
            <Link href="/generate" className="btn-primary flex items-center gap-2">
              <FaRobot className="w-5 h-5" />
              Start Generating
            </Link>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Available Document Types</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {documentTypes.map((docType) => (
              <div
                key={docType.id}
                className={`card hover:shadow-lg transition-shadow cursor-pointer ${
                  selectedDocType === docType.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedDocType(docType.id)}
              >
                <div className="flex flex-col items-center">
                  {docType.icon}
                  <h3 className="text-xl font-semibold mt-4">{docType.title}</h3>
                  <p className="text-gray-600 text-center mt-2">{docType.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Chart Bot Feature Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">New: Chart Bot - AI Document Analysis</h2>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">Intelligent Document Analysis</h3>
                <p className="text-gray-700 mb-6">
                  Upload your documents and let our advanced AI analyze them for compliance checking 
                  or contract summarization. Powered by NLP, Transformers, and semantic search.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <FaShieldAlt className="w-6 h-6 text-green-500" />
                    <span className="text-gray-700">AI Compliance Checker for business policies</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaChartLine className="w-6 h-6 text-blue-500" />
                    <span className="text-gray-700">AI Agreement Summarizer with risk analysis</span>
                  </div>
                </div>
                <div className="mt-6">
                  <Link href="/chart-bot" className="btn-primary text-lg px-6 py-3">
                    Try Chart Bot
                  </Link>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h4 className="text-lg font-semibold mb-4">Supported Features</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• PDF and text document upload</li>
                  <li>• Compliance scoring and analysis</li>
                  <li>• Contract summarization</li>
                  <li>• Risk identification</li>
                  <li>• Key date extraction</li>
                  <li>• Party identification</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Chat Assistant Feature Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">New: AI Chat Assistant</h2>
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">Intelligent Chat Support</h3>
                <p className="text-gray-700 mb-6">
                  Get instant answers to your questions about legal matters, government regulations, 
                  or any general topics. Our AI assistant is here to help 24/7.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <FaComments className="w-6 h-6 text-green-500" />
                    <span className="text-gray-700">Ask about government rules and regulations</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaRobot className="w-6 h-6 text-blue-500" />
                    <span className="text-gray-700">General queries on any topic</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaShieldAlt className="w-6 h-6 text-purple-500" />
                    <span className="text-gray-700">Learn about our team and leadership</span>
                  </div>
                </div>
                <div className="mt-6">
                  <Link href="/chat-assistant" className="btn-primary text-lg px-6 py-3">
                    Start Chatting
                  </Link>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h4 className="text-lg font-semibold mb-4">What You Can Ask</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• "What are the latest business regulations?"</li>
                  <li>• "Tell me about the co-founder"</li>
                  <li>• "How does SmartDocGen work?"</li>
                  <li>• "What legal documents can I create?"</li>
                  <li>• "Explain contract terms"</li>
                  <li>• "Any general questions you have!"</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card">
              <div className="flex flex-col items-center">
                <div className="rounded-full bg-primary/10 p-4">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="text-xl font-semibold mt-4">Select Document Type</h3>
                <p className="text-gray-600 text-center mt-2">
                  Choose from various document templates based on your needs.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="flex flex-col items-center">
                <div className="rounded-full bg-primary/10 p-4">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h3 className="text-xl font-semibold mt-4">Provide Information</h3>
                <p className="text-gray-600 text-center mt-2">
                  Fill in the required details or let our AI help generate content.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="flex flex-col items-center">
                <div className="rounded-full bg-primary/10 p-4">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h3 className="text-xl font-semibold mt-4">Generate & Download</h3>
                <p className="text-gray-600 text-center mt-2">
                  Review the generated document and download it in PDF format.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
} 