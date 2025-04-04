'use client';

import { useState } from 'react';
import { FaDownload, FaArrowLeft, FaCopy, FaCheck } from 'react-icons/fa';
import { jsPDF } from 'jspdf';

type DocumentPreviewProps = {
  document: string;
  onBack: () => void;
};

export default function DocumentPreview({ document, onBack }: DocumentPreviewProps) {
  const [copied, setCopied] = useState(false);

  const downloadAsPdf = () => {
    const doc = new jsPDF();
    
    // Split the document into lines to handle pagination
    const lines = document.split('\n');
    
    let y = 20; // starting y position
    const lineHeight = 7;
    const pageHeight = doc.internal.pageSize.height - 20; // bottom margin
    const margin = 20;
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    
    lines.forEach((line) => {
      if (y > pageHeight) {
        doc.addPage();
        y = 20; // Reset y position for new page
      }
      
      if (line.startsWith('# ')) {
        // It's a header
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(16);
        doc.text(line.substring(2), margin, y);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(12);
      } else if (line.startsWith('## ')) {
        // It's a subheader
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.text(line.substring(3), margin, y);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(12);
      } else {
        // Regular text
        if (line.trim() !== '') {
          doc.text(line, margin, y);
        }
      }
      
      y += lineHeight;
    });
    
    doc.save('legal-document.pdf');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(document);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <div className="flex justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <FaArrowLeft className="mr-2" />
          Back to Edit
        </button>
        <div className="flex space-x-4">
          <button
            onClick={copyToClipboard}
            className="btn-secondary flex items-center"
            disabled={copied}
          >
            {copied ? (
              <>
                <FaCheck className="mr-2" />
                Copied!
              </>
            ) : (
              <>
                <FaCopy className="mr-2" />
                Copy Text
              </>
            )}
          </button>
          <button onClick={downloadAsPdf} className="btn-primary flex items-center">
            <FaDownload className="mr-2" />
            Download PDF
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-300 rounded-lg p-8 mb-6 whitespace-pre-wrap font-serif text-gray-800">
        {document.split('\n').map((line, index) => {
          if (line.startsWith('# ')) {
            return (
              <h1 key={index} className="text-2xl font-bold mt-6 mb-4">
                {line.substring(2)}
              </h1>
            );
          } else if (line.startsWith('## ')) {
            return (
              <h2 key={index} className="text-xl font-bold mt-4 mb-2">
                {line.substring(3)}
              </h2>
            );
          } else if (line.trim() === '') {
            return <br key={index} />;
          } else {
            return <p key={index} className="mb-2">{line}</p>;
          }
        })}
      </div>

      <div className="bg-blue-50 p-4 rounded-md">
        <p className="text-sm text-blue-800">
          <strong>AI Recommendation:</strong> Before finalizing this document, it's advisable to have
          it reviewed by a legal professional to ensure it meets all legal requirements for your
          jurisdiction and situation.
        </p>
      </div>
    </div>
  );
} 