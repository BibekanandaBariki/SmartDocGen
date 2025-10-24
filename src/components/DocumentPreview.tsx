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
    // A4 portrait with margins and Times font for gov-style look
    const doc = new jsPDF({ format: 'a4', unit: 'pt' });
    
    // Split the document into lines to handle pagination
    const lines = document.split('\n');
    
    const margin = 56; // ~0.78in
    const maxWidth = doc.internal.pageSize.getWidth() - margin * 2;
    let y = margin; // starting y position
    const lineHeight = 18; // ~12pt font leading
    const pageBottom = doc.internal.pageSize.getHeight() - margin;

    doc.setFont('times', 'normal');
    doc.setFontSize(12);
    
    // Helper to detect government-style centered headings
    const isGovMainTitle = (t: string) => t.trim().toUpperCase() === 'FORMAT OF CONTRACT AGREEMENT';
    const isGovArticle = (t: string) => /^ARTICLE\s+\d+\./i.test(t.trim());
    const isUppercaseHeading = (t: string) => {
      const s = t.trim();
      if (!s) return false;
      // consider as heading if mostly uppercase and contains letters
      const letters = s.replace(/[^A-Za-z]/g, '');
      if (letters.length === 0) return false;
      const uppercaseRatio = letters.replace(/[a-z]/g, '').length / letters.length;
      // Heuristic: short-ish lines that are mostly uppercase
      return s.length <= 120 && uppercaseRatio >= 0.9;
    };

    // Render by paragraphs: center headings, justify paragraphs
    let paragraphBuffer: string[] = [];
    // Measure text width helper
    const getTextWidth = (t: string) => doc.getTextWidth(t);
    const spaceWidth = getTextWidth(' ');

    // Draw a fully justified line (except for last line) by distributing extra spacing
    const drawJustifiedLine = (text: string, x: number, yPos: number, targetWidth: number) => {
      const words = text.split(/\s+/).filter(Boolean);
      if (words.length <= 1) {
        doc.text(text, x, yPos);
        return;
      }
      const wordsWidth = words.reduce((sum, w) => sum + getTextWidth(w), 0);
      const gaps = words.length - 1;
      const extraSpaceTotal = Math.max(0, targetWidth - wordsWidth);
      const gapWidth = extraSpaceTotal / gaps;
      let cursorX = x;
      words.forEach((w, idx) => {
        doc.text(w, cursorX, yPos);
        const advance = getTextWidth(w) + (idx < gaps ? gapWidth : 0);
        cursorX += advance;
      });
    };

    // Create wrapped lines for a paragraph using greedy fit
    const wrapParagraph = (text: string): string[] => {
      const words = text.split(/\s+/).filter(Boolean);
      const lines: string[] = [];
      let current = '';
      let currentWidth = 0;
      words.forEach((w) => {
        const wWidth = getTextWidth(w);
        if (current === '') {
          current = w;
          currentWidth = wWidth;
        } else if (currentWidth + spaceWidth + wWidth <= maxWidth) {
          current += ' ' + w;
          currentWidth += spaceWidth + wWidth;
        } else {
          lines.push(current);
          current = w;
          currentWidth = wWidth;
        }
      });
      if (current) lines.push(current);
      return lines;
    };

    const flushParagraph = () => {
      if (paragraphBuffer.length === 0) return;
      const paragraphText = paragraphBuffer.join(' ').replace(/\s+/g, ' ').trim();
      if (!paragraphText) { paragraphBuffer = []; return; }
      const linesWrapped = wrapParagraph(paragraphText);
      linesWrapped.forEach((ln, idx) => {
        if (y > pageBottom) {
          doc.addPage('a4', 'p');
          y = margin;
        }
        const isLast = idx === linesWrapped.length - 1;
        if (!isLast && ln.indexOf(' ') !== -1) {
          drawJustifiedLine(ln, margin, y, maxWidth);
        } else {
          doc.text(ln, margin, y);
        }
        y += lineHeight;
      });
      y += lineHeight / 2; // extra spacing after paragraph
      paragraphBuffer = [];
    };

    lines.forEach((raw) => {
      const line = raw || '';
      if (y > pageBottom) {
        doc.addPage('a4', 'p');
        y = margin; // Reset y position for new page
      }

      // Center markdown-style headings
      if (line.startsWith('# ') || line.startsWith('## ') || isGovMainTitle(line) || isGovArticle(line) || isUppercaseHeading(line)) {
        // Flush any pending paragraph first
        flushParagraph();
        const isH1 = line.startsWith('# ');
        const isH2 = line.startsWith('## ');
        const text = isH1 ? line.substring(2) : isH2 ? line.substring(3) : line.trim();
        const fontSize = isH1 || isGovMainTitle(line) ? 16 : 14;
        doc.setFont('times', 'bold');
        doc.setFontSize(fontSize);
        doc.text(text, doc.internal.pageSize.getWidth() / 2, y, { align: 'center', maxWidth });
        doc.setFont('times', 'normal');
        doc.setFontSize(12);
        y += lineHeight * 1.2;
        return;
      }

      // Blank line indicates paragraph break
      if (line.trim() === '') {
        flushParagraph();
        y += lineHeight / 2;
        return;
      }

      // Accumulate paragraph lines
      paragraphBuffer.push(line);
    });
    // Flush any remaining paragraph
    flushParagraph();
    // Footer page numbers
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.text(`Page ${i} of ${pageCount}`, doc.internal.pageSize.getWidth() - margin, doc.internal.pageSize.getHeight() - margin / 2, { align: 'right' });
    }

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
          const isGovMainTitle = line.trim().toUpperCase() === 'FORMAT OF CONTRACT AGREEMENT';
          const isGovArticle = /^ARTICLE\s+\d+\./i.test(line.trim());
          const letters = line.trim().replace(/[^A-Za-z]/g, '');
          const uppercaseRatio = letters.length ? letters.replace(/[a-z]/g, '').length / letters.length : 0;
          const isUppercaseHeading = line.trim().length <= 120 && uppercaseRatio >= 0.9;
          if (line.startsWith('# ') || isGovMainTitle || isUppercaseHeading) {
            return (
              <h1 key={index} className="text-2xl font-bold mt-6 mb-4 text-center">
                {line.startsWith('# ') ? line.substring(2) : line}
              </h1>
            );
          } else if (line.startsWith('## ') || isGovArticle) {
            return (
              <h2 key={index} className="text-xl font-bold mt-4 mb-2 text-center">
                {line.startsWith('## ') ? line.substring(3) : line}
              </h2>
            );
          } else if (line.trim() === '') {
            return <br key={index} />;
          } else {
            return <p key={index} className="mb-2" style={{ textAlign: 'justify' }}>{line}</p>;
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