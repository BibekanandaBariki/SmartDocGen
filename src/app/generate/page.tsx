'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DocumentForm from '@/components/DocumentForm';
import DocumentPreview from '@/components/DocumentPreview';
import { FaSpinner } from 'react-icons/fa';

type FormData = {
  documentType: string;
  parties: {
    firstParty: {
      name: string;
      address: string;
    };
    secondParty: {
      name: string;
      address: string;
    };
  };
  terms: string;
  description: string;
  additionalDetails: string;
  templateId?: string;
};

// Template data for pre-filling the form
const templateData: Record<string, Partial<FormData> & { title: string }> = {
  'employment-contract': {
    title: 'Employment Contract',
    documentType: 'contract',
    description: 'Employment contract outlining the terms and conditions of employment between the employer and employee.',
    terms: 'The employment will commence on [START DATE] and continue until terminated by either party. The employee will be paid [AMOUNT] per [PERIOD]. The employee will be entitled to [NUMBER] days of paid vacation per year.',
  },
  'nda': {
    title: 'Non-Disclosure Agreement',
    documentType: 'agreement',
    description: 'Non-disclosure agreement to protect confidential information shared between the parties.',
    terms: 'The receiving party agrees to maintain the confidentiality of the disclosed information and not to use it for any purpose except as authorized by the disclosing party. This obligation shall continue for a period of [NUMBER] years after the disclosure.',
  },
  'rental-agreement': {
    title: 'Rental Agreement',
    documentType: 'agreement',
    description: 'Rental agreement for leasing property between the landlord and tenant.',
    terms: 'The tenant agrees to lease the property located at [ADDRESS] for a term of [PERIOD] beginning on [START DATE]. The monthly rent is [AMOUNT] due on the [DAY] of each month.',
  },
  'cease-desist': {
    title: 'Cease and Desist Notice',
    documentType: 'notice',
    description: 'Cease and desist notice demanding the recipient to stop an illegal or unauthorized activity.',
    terms: 'You are hereby ordered to immediately cease and desist from [ACTIVITY]. Failure to comply with this demand may result in legal action against you.',
  },
};

export default function GeneratePage() {
  const [step, setStep] = useState(1);
  const [generatedDocument, setGeneratedDocument] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const searchParams = useSearchParams();

  const template = searchParams.get('template');
  const typeParam = searchParams.get('type');

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      documentType: typeParam || 'contract',
      parties: {
        firstParty: {
          name: '',
          address: '',
        },
        secondParty: {
          name: '',
          address: '',
        },
      },
      terms: '',
      description: '',
      additionalDetails: '',
      templateId: template || undefined,
    },
  });

  // Set default values based on selected template
  useEffect(() => {
    if (template && templateData[template]) {
      const data = templateData[template];
      
      if (data.documentType) {
        setValue('documentType', data.documentType);
      }
      
      if (data.description) {
        setValue('description', data.description);
      }
      
      if (data.terms) {
        setValue('terms', data.terms);
      }
      
      // Set the template ID
      setValue('templateId', template);
    }
  }, [template, setValue]);

  const documentType = watch('documentType');

  const onSubmit = async (data: FormData) => {
    setIsGenerating(true);
    try {
      // Include template ID in the API call if present
      const payloadData = {
        ...data,
        templateId: template || undefined
      };
      
      // Call our API endpoint to generate the document
      const response = await axios.post('/api/generate', payloadData);
      setGeneratedDocument(response.data.document);
      setStep(2);
    } catch (error) {
      console.error('Error generating document:', error);
      alert('Failed to generate document. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">
          {template ? 'Generate from Template' : 'Create Custom Document'}
        </h1>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex border-b">
            <button
              className={`flex-1 py-4 text-center ${
                step === 1 ? 'bg-primary text-white' : 'bg-gray-100'
              }`}
              onClick={() => !isGenerating && step === 2 && setStep(1)}
              disabled={isGenerating}
            >
              1. Enter Information
            </button>
            <button
              className={`flex-1 py-4 text-center ${
                step === 2 ? 'bg-primary text-white' : 'bg-gray-100'
              }`}
              disabled={step === 1 || isGenerating}
            >
              2. Review & Download
            </button>
          </div>

          <div className="p-6">
            {step === 1 && (
              <form onSubmit={handleSubmit(onSubmit)}>
                {template && (
                  <div className="bg-blue-50 p-4 mb-6 rounded-md">
                    <p className="text-blue-800">
                      <strong>Using template:</strong> {templateData[template]?.title || template}
                      <br />
                      <span className="text-sm">
                        You can customize the pre-filled information below according to your needs.
                      </span>
                    </p>
                  </div>
                )}
                
                <DocumentForm
                  register={register}
                  errors={errors}
                  documentType={documentType}
                />
                
                <div className="mt-8 flex justify-end">
                  <button
                    type="submit"
                    className="btn-primary flex items-center"
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <>
                        <FaSpinner className="animate-spin mr-2" />
                        Generating...
                      </>
                    ) : (
                      'Generate Document'
                    )}
                  </button>
                </div>
              </form>
            )}

            {step === 2 && generatedDocument && (
              <DocumentPreview 
                document={generatedDocument}
                onBack={() => setStep(1)}
              />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
} 