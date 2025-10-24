'use client';

import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { FaLightbulb } from 'react-icons/fa';

type FormData = {
  documentType: string;
  format?: 'standard' | 'government';
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
};

type DocumentFormProps = {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  documentType: string;
};

export default function DocumentForm({ register, errors, documentType }: DocumentFormProps) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Format</label>
        <select
          {...register('format')}
          className="input-field"
          defaultValue="standard"
        >
          <option value="standard">Standard</option>
          <option value="government">Government (strict template)</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Document Type</label>
        <select
          {...register('documentType', { required: 'Document type is required' })}
          className="input-field"
        >
          <option value="contract">Contract</option>
          <option value="agreement">Agreement</option>
          <option value="notice">Legal Notice</option>
        </select>
        {errors.documentType && (
          <p className="mt-1 text-sm text-red-600">{errors.documentType.message}</p>
        )}
      </div>

      <div className="bg-blue-50 p-4 rounded-md flex items-start">
        <FaLightbulb className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
        <div>
          <p className="text-sm text-blue-800">
            <strong>AI Assistant:</strong> You're creating a{' '}
            {documentType === 'contract'
              ? 'contract'
              : documentType === 'agreement'
              ? 'legal agreement'
              : 'legal notice'}
            . Be sure to provide clear details about all parties involved and specify terms precisely.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-medium text-gray-900 mb-3">First Party</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                {...register('parties.firstParty.name', {
                  required: 'First party name is required',
                })}
                className="input-field"
              />
              {errors.parties?.firstParty?.name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.parties.firstParty.name.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input
                type="text"
                {...register('parties.firstParty.address', {
                  required: 'First party address is required',
                })}
                className="input-field"
              />
              {errors.parties?.firstParty?.address && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.parties.firstParty.address.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-medium text-gray-900 mb-3">Second Party</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                {...register('parties.secondParty.name', {
                  required: 'Second party name is required',
                })}
                className="input-field"
              />
              {errors.parties?.secondParty?.name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.parties.secondParty.name.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input
                type="text"
                {...register('parties.secondParty.address', {
                  required: 'Second party address is required',
                })}
                className="input-field"
              />
              {errors.parties?.secondParty?.address && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.parties.secondParty.address.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description (What is this document for?)
        </label>
        <textarea
          {...register('description', { required: 'Description is required' })}
          rows={3}
          className="input-field"
          placeholder="Briefly describe the purpose of this document"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Terms and Conditions
        </label>
        <textarea
          {...register('terms', { required: 'Terms are required' })}
          rows={5}
          className="input-field"
          placeholder="Enter the main terms and conditions"
        />
        {errors.terms && <p className="mt-1 text-sm text-red-600">{errors.terms.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Additional Details (Optional)
        </label>
        <textarea
          {...register('additionalDetails')}
          rows={3}
          className="input-field"
          placeholder="Any other details that should be included"
        />
      </div>
    </div>
  );
} 