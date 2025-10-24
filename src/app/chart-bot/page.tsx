'use client';

import { useState, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FaUpload, FaFilePdf, FaFileAlt, FaCheckCircle, FaExclamationTriangle, FaSpinner } from 'react-icons/fa';

interface AnalysisResult {
  type: 'compliance' | 'summary';
  content: string;
  risks?: string[];
  criticalDates?: string[];
  parties?: string[];
  complianceScore?: number;
  recommendations?: string[];
}

export default function ChartBot() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [analysisType, setAnalysisType] = useState<'compliance' | 'summary'>('compliance');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === 'application/pdf' || file.type === 'text/plain') {
        setUploadedFile(file);
        setError(null);
        setResult(null);
      } else {
        setError('Please upload a PDF or text file only.');
      }
    }
  };

  const handleAnalyze = async () => {
    if (!uploadedFile) {
      setError('Please upload a file first.');
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('file', uploadedFile);
      formData.append('analysisType', analysisType);

      const response = await fetch('/api/chart-bot/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Analysis failed. Please try again.');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during analysis.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setUploadedFile(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-12">
        <section className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Chart Bot - AI Document Analysis
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Upload your documents and let our AI analyze them for compliance checking or contract summarization.
          </p>
        </section>

        <div className="max-w-4xl mx-auto">
          {/* Analysis Type Selection */}
          <div className="card mb-8">
            <h2 className="text-2xl font-semibold mb-6">Select Analysis Type</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => setAnalysisType('compliance')}
                className={`p-6 rounded-lg border-2 transition-all ${
                  analysisType === 'compliance'
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <FaCheckCircle className={`w-6 h-6 ${analysisType === 'compliance' ? 'text-primary' : 'text-gray-400'}`} />
                  <h3 className="text-xl font-semibold">AI Compliance Checker</h3>
                </div>
                <p className="text-gray-600">
                  Upload business policies and verify their compliance with local legal regulations.
                </p>
              </button>
              <button
                onClick={() => setAnalysisType('summary')}
                className={`p-6 rounded-lg border-2 transition-all ${
                  analysisType === 'summary'
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <FaFileAlt className={`w-6 h-6 ${analysisType === 'summary' ? 'text-primary' : 'text-gray-400'}`} />
                  <h3 className="text-xl font-semibold">AI Agreement Summarizer</h3>
                </div>
                <p className="text-gray-600">
                  Read and summarize contracts, highlighting key risks, critical dates, and involved parties.
                </p>
              </button>
            </div>
          </div>

          {/* File Upload */}
          <div className="card mb-8">
            <h2 className="text-2xl font-semibold mb-6">Upload Document</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.txt"
                onChange={handleFileUpload}
                className="hidden"
              />
              <div className="mb-4">
                {uploadedFile ? (
                  <div className="flex items-center justify-center gap-3">
                    {uploadedFile.type === 'application/pdf' ? (
                      <FaFilePdf className="w-12 h-12 text-red-500" />
                    ) : (
                      <FaFileAlt className="w-12 h-12 text-blue-500" />
                    )}
                    <div className="text-left">
                      <p className="font-semibold">{uploadedFile.name}</p>
                      <p className="text-sm text-gray-500">
                        {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                ) : (
                  <FaUpload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                )}
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="btn-primary mb-4"
                disabled={isAnalyzing}
              >
                {uploadedFile ? 'Change File' : 'Choose File'}
              </button>
              <p className="text-gray-500 text-sm">
                Supported formats: PDF, TXT (Max 10MB)
              </p>
            </div>
          </div>

          {/* Analyze Button */}
          <div className="text-center mb-8">
            <button
              onClick={handleAnalyze}
              disabled={!uploadedFile || isAnalyzing}
              className="btn-primary text-lg px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAnalyzing ? (
                <>
                  <FaSpinner className="w-5 h-5 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Analyze Document'
              )}
            </button>
            {uploadedFile && (
              <button
                onClick={handleReset}
                className="ml-4 btn-secondary"
                disabled={isAnalyzing}
              >
                Reset
              </button>
            )}
          </div>

          {/* Error Display */}
          {error && (
            <div className="card mb-8 border-red-200 bg-red-50">
              <div className="flex items-center gap-3">
                <FaExclamationTriangle className="w-6 h-6 text-red-500" />
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          )}

          {/* Results Display */}
          {result && (
            <div className="card">
              <h2 className="text-2xl font-semibold mb-6">
                {result.type === 'compliance' ? 'Compliance Analysis Results' : 'Contract Summary'}
              </h2>
              
              {result.type === 'compliance' && (
                <div className="space-y-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Compliance Score</h3>
                    <div className="flex items-center gap-4">
                      <div className="text-3xl font-bold text-primary">
                        {result.complianceScore}%
                      </div>
                      <div className="flex-1">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              result.complianceScore! >= 80
                                ? 'bg-green-500'
                                : result.complianceScore! >= 60
                                ? 'bg-yellow-500'
                                : 'bg-red-500'
                            }`}
                            style={{ width: `${result.complianceScore}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Analysis</h3>
                    <div className="prose max-w-none">
                      <p className="text-gray-700 whitespace-pre-wrap">{result.content}</p>
                    </div>
                  </div>

                  {result.recommendations && result.recommendations.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Recommendations</h3>
                      <ul className="space-y-2">
                        {result.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <FaCheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {result.type === 'summary' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Summary</h3>
                    <div className="prose max-w-none">
                      <p className="text-gray-700 whitespace-pre-wrap">{result.content}</p>
                    </div>
                  </div>

                  {result.parties && result.parties.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Involved Parties</h3>
                      <ul className="space-y-1">
                        {result.parties.map((party, index) => (
                          <li key={index} className="text-gray-700">• {party}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {result.criticalDates && result.criticalDates.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Critical Dates</h3>
                      <ul className="space-y-1">
                        {result.criticalDates.map((date, index) => (
                          <li key={index} className="text-gray-700">• {date}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {result.risks && result.risks.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Key Risks</h3>
                      <ul className="space-y-2">
                        {result.risks.map((risk, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <FaExclamationTriangle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{risk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}


