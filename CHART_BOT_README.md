# Chart Bot - AI Document Analysis Feature

## Overview

Chart Bot is an advanced AI-powered document analysis feature integrated into SmartDocGen. It provides two main functionalities:

1. **AI Compliance Checker**: Analyzes business policies and verifies compliance with legal regulations
2. **AI Agreement Summarizer**: Reads and summarizes contracts, highlighting key risks, critical dates, and involved parties

## Tech Stack

- **NLP Processing**: spaCy for natural language processing
- **Transformers**: For advanced text analysis and embeddings
- **Pinecone**: For semantic search and vector storage
- **OpenAI GPT-4**: For intelligent analysis and summarization
- **Next.js**: Frontend framework
- **TypeScript**: Type safety

## Features

### AI Compliance Checker
- Upload business policies in PDF or text format
- Automatic compliance scoring (0-100%)
- Detailed analysis of compliance issues
- Specific recommendations for improvement
- Entity extraction (dates, money, organizations)

### AI Agreement Summarizer
- Contract analysis and summarization
- Key risk identification
- Critical date extraction
- Party identification
- Comprehensive document overview

## File Structure

```
src/
├── app/
│   ├── chart-bot/
│   │   └── page.tsx              # Main Chart Bot interface
│   └── api/
│       └── chart-bot/
│           └── analyze/
│               └── route.ts      # API endpoint for analysis
├── lib/
│   └── chart-bot.ts              # Utility functions and NLP processing
└── components/
    └── Header.tsx                # Updated with Chart Bot navigation
```

## Setup Instructions

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Environment Variables**:
   Create a `.env.local` file with:
   ```
   OPENAI_API_KEY=your_openai_api_key
   PINECONE_API_KEY=your_pinecone_api_key
   PINECONE_ENVIRONMENT=your_pinecone_environment
   ```

3. **Run the Application**:
   ```bash
   npm run dev
   ```

## Usage

1. Navigate to the Chart Bot page (`/chart-bot`)
2. Select analysis type (Compliance Checker or Agreement Summarizer)
3. Upload a PDF or text document (max 10MB)
4. Click "Analyze Document" to process
5. Review the AI-generated analysis results

## API Endpoints

### POST `/api/chart-bot/analyze`

Analyzes uploaded documents for compliance or summarization.

**Request Body**:
- `file`: PDF or text file
- `analysisType`: "compliance" or "summary"

**Response**:
```json
{
  "type": "compliance" | "summary",
  "content": "Analysis content",
  "complianceScore": 85,
  "recommendations": ["rec1", "rec2"],
  "parties": ["party1", "party2"],
  "criticalDates": ["date1", "date2"],
  "risks": ["risk1", "risk2"]
}
```

## Implementation Notes

- The current implementation uses mock data for spaCy and Transformers processing
- For production, integrate actual spaCy models and transformer libraries
- Pinecone integration is prepared but uses mock data
- PDF text extraction is mocked - integrate with `pdf-parse` or similar library
- Error handling includes fallback to mock data when APIs fail

## Future Enhancements

- Real spaCy model integration
- Actual transformer model deployment
- Pinecone vector database integration
- Advanced document parsing (Word, Excel)
- Batch document processing
- Custom compliance rule configuration
- Export analysis results to PDF

## Dependencies Added

- `pinecone-client`: Vector database client
- `spacy`: Natural language processing
- `transformers`: Transformer model library

## Security Considerations

- File upload size limits (10MB)
- File type validation (PDF, TXT only)
- API key protection
- Input sanitization
- Rate limiting (recommended for production)


