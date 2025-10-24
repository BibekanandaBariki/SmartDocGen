// Chart Bot utility functions for document analysis

export interface DocumentAnalysis {
  type: 'compliance' | 'summary';
  content: string;
  risks?: string[];
  criticalDates?: string[];
  parties?: string[];
  complianceScore?: number;
  recommendations?: string[];
}

export interface NLPData {
  sentences: string[];
  wordCount: number;
  entities: Array<{ text: string; label: string }>;
  keyPhrases: string[];
}

// Mock Pinecone integration (in a real implementation, you would use the actual Pinecone client)
export class PineconeService {
  private static instance: PineconeService;
  private isInitialized = false;

  static getInstance(): PineconeService {
    if (!PineconeService.instance) {
      PineconeService.instance = new PineconeService();
    }
    return PineconeService.instance;
  }

  async initialize() {
    if (this.isInitialized) return;
    
    // In a real implementation, initialize Pinecone client
    // const pinecone = new PineconeClient();
    // await pinecone.init({...});
    
    this.isInitialized = true;
  }

  async upsert(vectors: Array<{ id: string; values: number[]; metadata: any }>) {
    await this.initialize();
    // Mock implementation - in real app, use Pinecone upsert
    console.log('Mock Pinecone upsert:', vectors.length, 'vectors');
  }

  async query(vector: number[], topK: number = 5) {
    await this.initialize();
    // Mock implementation - in real app, use Pinecone query
    return {
      matches: [
        { id: '1', score: 0.95, metadata: { text: 'Sample legal document' } },
        { id: '2', score: 0.87, metadata: { text: 'Another legal reference' } }
      ]
    };
  }
}

// Mock spaCy-like functionality
export class SpacyProcessor {
  static extractEntities(text: string): Array<{ text: string; label: string; start: number; end: number }> {
    const entities = [];
    
    // Date patterns
    const datePatterns = [
      /\b\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}\b/g,
      /\b(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+\d{4}\b/gi,
      /\b\d{4}-\d{2}-\d{2}\b/g
    ];
    
    datePatterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(text)) !== null) {
        entities.push({
          text: match[0],
          label: 'DATE',
          start: match.index,
          end: match.index + match[0].length
        });
      }
    });

    // Money patterns
    const moneyPatterns = [
      /\$[\d,]+(?:\.\d{2})?/g,
      /\b\d+(?:,\d{3})*(?:\.\d{2})?\s*(?:dollars?|USD|EUR|GBP)\b/gi
    ];
    
    moneyPatterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(text)) !== null) {
        entities.push({
          text: match[0],
          label: 'MONEY',
          start: match.index,
          end: match.index + match[0].length
        });
      }
    });

    // Organization patterns
    const orgPatterns = [
      /\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\s+(?:Inc|Corp|LLC|Ltd|Company|Corporation)\b/g,
      /\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\s+(?:LLP|Partnership|Associates)\b/g
    ];
    
    orgPatterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(text)) !== null) {
        entities.push({
          text: match[0],
          label: 'ORG',
          start: match.index,
          end: match.index + match[0].length
        });
      }
    });

    return entities;
  }

  static extractKeyPhrases(text: string): string[] {
    const legalTerms = [
      'contract', 'agreement', 'terms and conditions', 'liability', 'indemnification',
      'confidentiality', 'non-disclosure', 'termination', 'breach', 'remedies',
      'governing law', 'jurisdiction', 'force majeure', 'intellectual property',
      'warranty', 'representation', 'covenant', 'obligation', 'consideration',
      'assignment', 'amendment', 'severability', 'entire agreement', 'waiver'
    ];
    
    const foundTerms = legalTerms.filter(term => 
      text.toLowerCase().includes(term.toLowerCase())
    );
    
    return foundTerms;
  }

  static performSentimentAnalysis(text: string): { score: number; label: string } {
    // Mock sentiment analysis
    const positiveWords = ['agree', 'benefit', 'advantage', 'positive', 'good', 'excellent'];
    const negativeWords = ['disagree', 'risk', 'liability', 'penalty', 'breach', 'damage'];
    
    const words = text.toLowerCase().split(/\s+/);
    let score = 0;
    
    words.forEach(word => {
      if (positiveWords.some(pw => word.includes(pw))) score += 1;
      if (negativeWords.some(nw => word.includes(nw))) score -= 1;
    });
    
    const normalizedScore = Math.max(-1, Math.min(1, score / words.length * 10));
    
    return {
      score: normalizedScore,
      label: normalizedScore > 0.1 ? 'positive' : normalizedScore < -0.1 ? 'negative' : 'neutral'
    };
  }
}

// Mock Transformers functionality
export class TransformersProcessor {
  static async generateEmbeddings(text: string): Promise<number[]> {
    // Mock embedding generation
    // In a real implementation, you would use a transformer model
    const words = text.split(/\s+/);
    const embedding = new Array(384).fill(0); // Mock 384-dimensional embedding
    
    // Simple hash-based embedding for demo
    words.forEach((word, index) => {
      const hash = word.split('').reduce((a, b) => {
        a = ((a << 5) - a) + b.charCodeAt(0);
        return a & a;
      }, 0);
      embedding[index % 384] += hash % 100 / 100;
    });
    
    return embedding;
  }

  static async classifyDocument(text: string): Promise<{ label: string; confidence: number }> {
    // Mock document classification
    const legalKeywords = ['contract', 'agreement', 'terms', 'liability', 'party'];
    const policyKeywords = ['policy', 'procedure', 'guideline', 'compliance', 'regulation'];
    
    const legalScore = legalKeywords.reduce((score, keyword) => 
      score + (text.toLowerCase().includes(keyword) ? 1 : 0), 0
    );
    
    const policyScore = policyKeywords.reduce((score, keyword) => 
      score + (text.toLowerCase().includes(keyword) ? 1 : 0), 0
    );
    
    if (legalScore > policyScore) {
      return { label: 'legal_document', confidence: legalScore / legalKeywords.length };
    } else {
      return { label: 'policy_document', confidence: policyScore / policyKeywords.length };
    }
  }
}

export class DocumentProcessor {
  static async processDocument(file: File): Promise<{ text: string; nlpData: NLPData }> {
    const buffer = Buffer.from(await file.arrayBuffer());
    let text: string;

    if (file.type === 'application/pdf') {
      text = await this.extractTextFromPDF(buffer);
    } else if (file.type === 'text/plain') {
      text = buffer.toString('utf-8');
    } else {
      throw new Error('Unsupported file type');
    }

    const nlpData = this.performNLPProcessing(text);
    return { text, nlpData };
  }

  private static async extractTextFromPDF(buffer: Buffer): Promise<string> {
    // Mock PDF extraction - in real implementation, use pdf-parse or similar
    return "This is a mock PDF content. In a real implementation, this would extract text from the PDF buffer using a proper PDF parsing library.";
  }

  private static performNLPProcessing(text: string): NLPData {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const words = text.split(/\s+/).filter(w => w.length > 0);
    const entities = SpacyProcessor.extractEntities(text);
    const keyPhrases = SpacyProcessor.extractKeyPhrases(text);

    return {
      sentences,
      wordCount: words.length,
      entities,
      keyPhrases
    };
  }
}


