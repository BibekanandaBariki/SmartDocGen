import { NextRequest, NextResponse } from 'next/server';
import { generateDocument } from '@/lib/openai';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { documentType, parties, terms, description, additionalDetails } = body;

    if (!documentType || !parties || !terms || !description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Call our utility function to generate the document
    const generatedDocument = await generateDocument(documentType, {
      parties,
      terms,
      description, 
      additionalDetails
    });

    return NextResponse.json({ document: generatedDocument });
  } catch (error) {
    console.error('Error generating document:', error);
    return NextResponse.json(
      { error: 'Failed to generate document' },
      { status: 500 }
    );
  }
} 