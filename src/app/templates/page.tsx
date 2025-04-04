'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FaFileAlt, FaSearch, FaArrowRight } from 'react-icons/fa';

type Template = {
  id: string;
  title: string;
  description: string;
  type: 'contract' | 'agreement' | 'notice';
};

export default function TemplatesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);

  // Template data - in a real app, this might come from an API
  const templates: Template[] = [
    {
      id: 'employment-contract',
      title: 'Employment Contract',
      description: 'Standard contract between employer and employee outlining job responsibilities, compensation, and terms.',
      type: 'contract',
    },
    {
      id: 'nda',
      title: 'Non-Disclosure Agreement',
      description: 'Confidentiality agreement to protect sensitive information shared between parties.',
      type: 'agreement',
    },
    {
      id: 'rental-agreement',
      title: 'Rental Agreement',
      description: 'Lease agreement between property owner and tenant for residential or commercial property.',
      type: 'agreement',
    },
    {
      id: 'cease-desist',
      title: 'Cease and Desist Notice',
      description: 'Formal demand to stop an alleged illegal activity with potential legal consequences.',
      type: 'notice',
    },
    {
      id: 'service-contract',
      title: 'Service Contract',
      description: 'Agreement for providing specified services between a service provider and client.',
      type: 'contract',
    },
    {
      id: 'partnership-agreement',
      title: 'Partnership Agreement',
      description: 'Contract establishing the terms of a business partnership between two or more parties.',
      type: 'agreement',
    },
    {
      id: 'eviction-notice',
      title: 'Eviction Notice',
      description: 'Formal notification to a tenant to vacate a property within a specified timeframe.',
      type: 'notice',
    },
    {
      id: 'sales-contract',
      title: 'Sales Contract',
      description: 'Agreement documenting the sale of goods or services between a buyer and seller.',
      type: 'contract',
    },
  ];

  // Filter templates based on search term and selected type
  const filteredTemplates = templates.filter((template) => {
    const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          template.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType ? template.type === selectedType : true;
    
    return matchesSearch && matchesType;
  });

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">Document Templates</h1>
        
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search templates..."
                className="input-field pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <button
                className={`px-4 py-2 rounded-md ${
                  selectedType === null
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
                onClick={() => setSelectedType(null)}
              >
                All
              </button>
              <button
                className={`px-4 py-2 rounded-md ${
                  selectedType === 'contract'
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
                onClick={() => setSelectedType('contract')}
              >
                Contracts
              </button>
              <button
                className={`px-4 py-2 rounded-md ${
                  selectedType === 'agreement'
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
                onClick={() => setSelectedType('agreement')}
              >
                Agreements
              </button>
              <button
                className={`px-4 py-2 rounded-md ${
                  selectedType === 'notice'
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
                onClick={() => setSelectedType('notice')}
              >
                Notices
              </button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.length > 0 ? (
            filteredTemplates.map((template) => (
              <div key={template.id} className="card hover:shadow-lg transition-shadow">
                <div className="flex items-start mb-4">
                  <div className="bg-primary/10 p-3 rounded-lg mr-4">
                    <FaFileAlt className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{template.title}</h3>
                    <span className="text-sm text-gray-500 capitalize">{template.type}</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{template.description}</p>
                <Link
                  href={`/generate?template=${template.id}&type=${template.type}`}
                  className="text-primary font-medium flex items-center hover:underline"
                >
                  Use Template <FaArrowRight className="ml-2" />
                </Link>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-8">
              <p className="text-gray-500">No templates found matching your search criteria.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
} 