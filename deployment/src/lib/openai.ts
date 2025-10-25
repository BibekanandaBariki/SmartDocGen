import OpenAI from 'openai';

// Initialize OpenAI client with API key from environment variables
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

// Helper function to generate document prompts based on document type and data
export function generatePrompt(documentType: string, data: any) {
  let prompt = '';
  const templateId = data.templateId;
  
  // Start with document type specific prompt
  switch (documentType) {
    case 'contract':
      prompt = `Generate a legal contract with the following details:
      - First party: ${data.parties.firstParty.name}, located at ${data.parties.firstParty.address}
      - Second party: ${data.parties.secondParty.name}, located at ${data.parties.secondParty.address}
      - Purpose: ${data.description}
      - Terms and Conditions: ${data.terms}
      ${data.additionalDetails ? `- Additional details: ${data.additionalDetails}` : ''}
      
      Format the contract with proper sections including:
      1. Introduction with parties' information
      2. Definitions
      3. Scope of services/agreement
      4. Terms and conditions
      5. Compensation/payment details if applicable
      6. Duration and termination
      7. Confidentiality
      8. Dispute resolution
      9. Signatures
      
      Use formal legal language and standard contract formatting with numbered clauses.`;
      break;
      
    case 'agreement':
      prompt = `Generate a legal agreement with the following details:
      - First party: ${data.parties.firstParty.name}, located at ${data.parties.firstParty.address}
      - Second party: ${data.parties.secondParty.name}, located at ${data.parties.secondParty.address}
      - Purpose: ${data.description}
      - Terms and Conditions: ${data.terms}
      ${data.additionalDetails ? `- Additional details: ${data.additionalDetails}` : ''}
      
      Format the agreement with proper sections including:
      1. Parties involved
      2. Agreement purpose
      3. Rights and obligations of each party
      4. Terms and conditions
      5. Duration of agreement
      6. Termination conditions
      7. Applicable law
      8. Signatures
      
      Use clear, concise language with appropriate legal terminology.`;
      break;
      
    case 'notice':
      prompt = `Generate a formal legal notice with the following details:
      - Sender: ${data.parties.firstParty.name}, located at ${data.parties.firstParty.address}
      - Recipient: ${data.parties.secondParty.name}, located at ${data.parties.secondParty.address}
      - Subject: ${data.description}
      - Content/Demands: ${data.terms}
      ${data.additionalDetails ? `- Additional details: ${data.additionalDetails}` : ''}
      
      Format the notice with:
      1. Date
      2. Sender and recipient information
      3. Subject line
      4. Clear statement of purpose
      5. Specific demands or notifications
      6. Relevant legal references
      7. Deadline for compliance if applicable
      8. Consequences of non-compliance
      9. Closing and signature
      
      Use formal, authoritative language appropriate for legal notices.`;
      break;
      
    default:
      throw new Error('Invalid document type');
  }
  
  // Add template-specific instructions if a template is used
  if (templateId) {
    switch (templateId) {
      case 'employment-contract':
        prompt += `\n\nThis is an employment contract. Make sure to include specific clauses about:
        - Employment duties and responsibilities
        - Work hours and location
        - Compensation and benefits
        - Probation period if applicable
        - Intellectual property and work product ownership
        - Non-compete clause
        - Termination conditions`;
        break;
        
      case 'nda':
        prompt += `\n\nThis is a non-disclosure agreement. Make sure to include specific clauses about:
        - Definition of confidential information
        - Exclusions from confidential information
        - Obligations of the receiving party
        - Term of confidentiality
        - Return of materials
        - No rights granted
        - Remedies for breach`;
        break;
        
      case 'rental-agreement':
        prompt += `\n\nThis is a rental agreement. Make sure to include specific clauses about:
        - Property description
        - Lease term and renewal options
        - Rent amount, due date, and payment method
        - Security deposit and conditions for return
        - Utilities and maintenance responsibilities
        - Rules and regulations
        - Entry rights of landlord
        - Termination conditions`;
        break;
        
      case 'cease-desist':
        prompt += `\n\nThis is a cease and desist notice. Make sure to include:
        - Specific description of the unlawful/infringing activity
        - Legal basis for the demand
        - Clear deadline for compliance
        - Specific actions required
        - Consequences of non-compliance
        - Request for written confirmation of compliance`;
        break;
    }
  }
  
  return prompt;
}

// System message for OpenAI API
export const systemMessage = 
  "You are a legal document assistant that specializes in creating professional, " +
  "well-structured legal documents. Format your response using markdown with # for " +
  "main headings and ## for subheadings. Make sure the document follows professional " +
  "formatting and includes all necessary legal clauses based on the document type.";

// Function to generate document using OpenAI API
export async function generateDocument(documentType: string, data: any) {
  try {
    const prompt = generatePrompt(documentType, data);
    
    // Use gpt-3.5-turbo as the default model if not specified in environment variables
    const model = process.env.OPENAI_MODEL || "gpt-3.5-turbo";
    
    console.log(`Attempting to generate document using model: ${model}`);
    
    const completion = await openai.chat.completions.create({
      model: model,
      messages: [
        {
          role: "system",
          content: systemMessage
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
    });

    return completion.choices[0].message.content || '';
  } catch (error: any) {
    console.error('Error generating document:', error);
    
    // If it's a model not found error, try with a fallback model
    if (error.code === 'model_not_found') {
      try {
        console.log('Falling back to gpt-3.5-turbo model');
        
        const prompt = generatePrompt(documentType, data);
        const completion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo", // Fallback to a widely available model
          messages: [
            {
              role: "system",
              content: systemMessage
            },
            {
              role: "user",
              content: prompt
            }
          ],
          temperature: 0.7,
        });
        
        return completion.choices[0].message.content || '';
      } catch (fallbackError) {
        console.error('Error with fallback model:', fallbackError);
        console.log('Using mock document generator as final fallback');
        return generateMockDocument(documentType, data);
      }
    }
    
    // For quota issues or other errors, use mock generator
    if (error.code === 'insufficient_quota' || error.status === 429) {
      console.log('API quota exceeded, using mock document generator');
      return generateMockDocument(documentType, data);
    }
    
    // For any other errors, try the mock generator
    console.log('Using mock document generator due to API error');
    return generateMockDocument(documentType, data);
  }
}

// Mock document generator function for when API fails
function generateMockDocument(documentType: string, data: any): string {
  const today = new Date().toLocaleDateString();
  const { parties, description, terms, additionalDetails } = data;
  
  switch (documentType) {
    case 'contract':
      return `# Contract Agreement
      
## Introduction
This Contract Agreement (the "Agreement") is made and entered into on ${today}, by and between:

**${parties.firstParty.name}**, located at ${parties.firstParty.address} (hereinafter referred to as the "First Party"), and
**${parties.secondParty.name}**, located at ${parties.secondParty.address} (hereinafter referred to as the "Second Party").

## Purpose
${description}

## Terms and Conditions
1. The parties agree to the following terms and conditions:
   ${terms.split('\n').join('\n   ')}

2. The duration of this agreement shall be for a period of one year from the date of signing, unless otherwise terminated in accordance with the provisions herein.

3. All confidential information shared between the parties shall remain confidential during the term of this agreement and for a period of two years thereafter.

4. This agreement may be terminated by either party with 30 days written notice to the other party.

${additionalDetails ? `## Additional Details\n${additionalDetails}` : ''}

## Signatures
IN WITNESS WHEREOF, the parties hereto have executed this Agreement as of the date first above written.

___________________________
${parties.firstParty.name}
First Party

___________________________
${parties.secondParty.name}
Second Party`;

    case 'agreement':
      return `# Legal Agreement
      
## Parties Involved
This Agreement is made on ${today} between:

**${parties.firstParty.name}**, located at ${parties.firstParty.address} (the "First Party"), and
**${parties.secondParty.name}**, located at ${parties.secondParty.address} (the "Second Party").

## Agreement Purpose
${description}

## Rights and Obligations
1. The First Party agrees to:
   - Fulfill all obligations as specified in this agreement
   - Maintain proper communication with the Second Party
   - Adhere to all timelines and deadlines

2. The Second Party agrees to:
   - Provide necessary cooperation to the First Party
   - Make payments as stipulated in this agreement
   - Notify the First Party of any issues promptly

## Terms and Conditions
${terms}

${additionalDetails ? `## Additional Details\n${additionalDetails}` : ''}

## Duration
This Agreement shall remain in effect for a period of one year from the date first written above, unless terminated earlier as provided herein.

## Signatures
IN WITNESS WHEREOF, the parties have executed this Agreement on the date stated above.

___________________________
${parties.firstParty.name}
First Party

___________________________
${parties.secondParty.name}
Second Party`;

    case 'notice':
      return `# Legal Notice
      
## Date
${today}

## From
${parties.firstParty.name}
${parties.firstParty.address}

## To
${parties.secondParty.name}
${parties.secondParty.address}

## Subject: Legal Notice
${description}

## Content
${terms}

${additionalDetails ? `## Additional Information\n${additionalDetails}` : ''}

## Compliance Deadline
Please comply with this notice within 14 days of receipt.

## Consequences of Non-Compliance
Failure to comply with this notice may result in legal action being taken against you, including but not limited to court proceedings and claims for damages and costs.

## Closing
This notice is issued without prejudice to any other rights or remedies that may be available.

Sincerely,

___________________________
${parties.firstParty.name}`;

    default:
      return `# Legal Document

## Date
${today}

## Parties
- ${parties.firstParty.name} (${parties.firstParty.address})
- ${parties.secondParty.name} (${parties.secondParty.address})

## Details
${description}

${terms}

${additionalDetails ? `## Additional Information\n${additionalDetails}` : ''}

## Signatures
___________________________
${parties.firstParty.name}

___________________________
${parties.secondParty.name}`;
  }
}