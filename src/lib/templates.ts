export type Parties = {
  firstParty: { name: string; address: string };
  secondParty: { name: string; address: string };
};

export type GovernmentContractInput = {
  parties: Parties;
  description: string; // scope of work / purpose
  terms: string; // payment terms or other detailed clauses
  additionalDetails?: string;
};

export function generateGovernmentContractAgreement(input: GovernmentContractInput): string {
  const today = new Date().toLocaleDateString();
  const { parties, description, terms, additionalDetails } = input;

  return (
    // Title block and stamp instruction
    `FORMAT OF CONTRACT AGREEMENT\n\n` +
    `(To be executed on non-judicial stamp paper of appropriate value)\n\n` +
    // Preamble
    `THIS CONTRACT AGREEMENT is made the ____________ day of ___________, 20____.\n\n` +
    `BETWEEN\n\n` +
    `(1) ${parties.firstParty.name}, having its principal place of business at ${parties.firstParty.address} (hereinafter called "the Owner"), and\n` +
    `(2) ${parties.secondParty.name}, having its principal place of business at ${parties.secondParty.address} (hereinafter called "the Contractor").\n\n` +
    `WHEREAS the Owner desires to engage the Contractor to ${description} and the Contractor has agreed to such engagement upon and subject to the terms and conditions hereinafter appearing.\n\n` +
    `NOW IT IS HEREBY AGREED as follows:\n\n` +

    // Article 1
    `ARTICLE 1. CONTRACT DOCUMENTS\n\n` +
    `1.1 The following documents shall constitute the Contract between the Owner and the Contractor, and each shall be read and construed as an integral part of the Contract:\n` +
    `a) This Contract Agreement and the Appendices hereto\n` +
    `b) Letter of Award (Ref. No.)\n` +
    `c) Amendment to the NIT document\n` +
    `d) Instruction to Bidders\n` +
    `e) Special Conditions of Contract\n` +
    `f) General Conditions of Contract\n` +
    `g) Technical Specifications and Drawings\n` +
    `h) The Bid and Price Schedules submitted by the Bidder\n\n` +
    `1.2 Order of Precedence\n` +
    `In the event of any ambiguity or conflict between the Contract Documents listed above, the order of precedence shall be the order in which the Contract Documents are listed in Article 1.1 above.\n\n` +
    `1.3 Definitions\n` +
    `Capitalized words and phrases used herein shall have the same meanings as are ascribed to them in the General Conditions of Contract.\n\n` +

    // Article 2
    `ARTICLE 2. CONTRACT PRICE AND PAYMENT TERMS\n\n` +
    `2.1 Contract Price\n` +
    `The Owner hereby agrees to pay to the Contractor the Contract Price in consideration of the performance by the Contractor of its obligations hereunder. The Contract Price shall be as determined in accordance with the terms and conditions of the Contract.\n\n` +
    `2.2 Payment Terms\n` +
    `${terms}\n\n` +

    // Article 3
    `ARTICLE 3. EFFECTIVE DATE FOR DETERMINING TIME FOR COMPLETION\n\n` +
    `The Completion period of the Project shall be determined from the date of the Letter of Award.\n\n` +

    // Article 4
    `ARTICLE 4. NON-ASSIGNABILITY\n\n` +
    `The Contract and benefits and obligations thereof shall be strictly personal to the Contractor and shall not on any account be assignable or transferable by the Contractor.\n\n` +

    // Article 5
    `ARTICLE 5. GOVERNMENT OF INDIA NOT LIABLE\n\n` +
    `It is expressly understood and agreed by and between the Contractor and the Owner that the Owner is entering into this Agreement solely on its own behalf and not on behalf of any other person or entity. In particular, it is expressly understood and agreed that the Government of India is not a party to this Agreement and has no liabilities, obligations or rights hereunder. The Contractor expressly agrees, acknowledges and understands that the Owner is not an Agent, Representative or Delegate of the Government of India.\n\n` +

    // Article 6
    `ARTICLE 6. APPENDICES\n\n` +
    `The Appendices listed in the attached list of Appendices shall be deemed to form an integral part of this Contract Agreement. Reference in the Contract to any Appendix shall mean the Appendices attached hereto, and the Contract shall be read and construed accordingly.\n\n` +

    // Article 7
    `ARTICLE 7. NO LIABILITY ON DIRECTOR AND EMPLOYEE\n\n` +
    `No Director, employee, consultant or agent of the Owner or other person representing the Owner or acting on behalf of the Owner in or pursuant to the Contract or in the discharge of any obligation to the Owner under the Contract or otherwise in relation to the Contract shall have any personal liability to the Contractor or any Sub-Contractor, agent, representative, director or employee of the Contractor.\n\n` +

    // Article 8
    `ARTICLE 8. WAIVER\n\n` +
    `No failure or delay by the Owner in enforcing any right or remedy of the Owner in terms of the Contract or any obligation or liability of the Contractor in terms thereof, shall be deemed to be a waiver of such right, remedy, obligation or liability.\n\n` +

    // Article 9
    `ARTICLE 9. LANGUAGE OF CONTRACT AND COMMUNICATION\n\n` +
    `The language of the Contract shall be English and all communications, drawings, design, data, information, codes, specifications and other documents whatsoever supporting the bid or otherwise exchanged under the Contract shall be in English.\n\n` +

    // Signatures block
    `IN WITNESS WHEREOF the Owner and the Contractor have caused this Agreement to be duly executed by their duly authorized representatives the day and year first above written.\n\n` +
    `Signed for and on behalf of the Owner\n` +
    `[Signature]\n` +
    `[Title]\n` +
    `in the presence of______________________________\n\n` +
    `Signed for and on behalf of the Contractor\n` +
    `[Signature]\n` +
    `[Title]\n` +
    `in the presence of______________________________\n\n` +
    `Date: ${today}` +
    (additionalDetails ? `\n\nADDITIONAL DETAILS\n${additionalDetails}` : '')
  );
}

export type GovernmentNoticeInput = {
  parties: Parties; // firstParty = sender, secondParty = recipient
  description: string; // subject / purpose
  terms: string; // content / demands
  additionalDetails?: string;
};

export function generateGovernmentLegalNotice(input: GovernmentNoticeInput): string {
  const today = new Date().toLocaleDateString();
  const { parties, description, terms, additionalDetails } = input;
  return (
    `LEGAL NOTICE\n\n` +
    `DATE: ${today}\n\n` +
    `FROM\n${parties.firstParty.name}\n${parties.firstParty.address}\n\n` +
    `TO\n${parties.secondParty.name}\n${parties.secondParty.address}\n\n` +
    `SUBJECT: ${description}\n\n` +
    `TAKE NOTICE THAT:\n` +
    `${terms}\n\n` +
    (additionalDetails ? `ADDITIONAL INFORMATION\n${additionalDetails}\n\n` : '') +
    `You are hereby called upon to comply within the stipulated time, failing which appropriate action may be initiated without further reference.\n\n` +
    `Sincerely,\n\n[Signature]\n${parties.firstParty.name}`
  );
}

// Registry of supported government templates
export type GovernmentTemplateId = 'gov-contract' | 'gov-legal-notice';

export type GovernmentTemplateGenerator = (data: any) => string;

export const governmentTemplateRegistry: Record<GovernmentTemplateId, GovernmentTemplateGenerator> = {
  'gov-contract': (data: any) =>
    generateGovernmentContractAgreement({
      parties: data.parties,
      description: data.description,
      terms: data.terms,
      additionalDetails: data.additionalDetails,
    }),
  'gov-legal-notice': (data: any) =>
    generateGovernmentLegalNotice({
      parties: data.parties,
      description: data.description,
      terms: data.terms,
      additionalDetails: data.additionalDetails,
    }),
};


