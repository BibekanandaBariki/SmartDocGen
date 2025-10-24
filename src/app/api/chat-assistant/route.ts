import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Profile information for the co-founder/CEO
const PROFILE_INFO = {
  name: "Bibekananda Bariki",
  title: "Co-founder & CEO",
  socialLinks: {
    linkedin: "https://www.linkedin.com/in/bibekananda-bariki-89840b324/",
    twitter: "https://x.com/bibek_bariki",
    instagram: "https://www.instagram.com/bibekbariki"
  }
};

function detectProfileQuery(message: string): boolean {
  const profileKeywords = [
    'co-founder', 'ceo', 'founder', 'owner', 'creator', 'developer',
    'bibekananda', 'bibek', 'bariki', 'team', 'leadership', 'who made',
    'who created', 'who developed', 'about the team', 'about you'
  ];
  
  const lowerMessage = message.toLowerCase();
  return profileKeywords.some(keyword => lowerMessage.includes(keyword));
}

function detectLegalQuery(message: string): boolean {
  const legalKeywords = [
    'legal', 'law', 'regulation', 'compliance', 'contract', 'agreement',
    'government', 'policy', 'rules', 'legislation', 'statute', 'court',
    'litigation', 'liability', 'terms', 'conditions', 'privacy', 'gdpr'
  ];
  
  const lowerMessage = message.toLowerCase();
  return legalKeywords.some(keyword => lowerMessage.includes(keyword));
}

function generateProfileResponse(): string {
  return `I'd be happy to tell you about our team! 

**${PROFILE_INFO.name}** - ${PROFILE_INFO.title}

Bibekananda Bariki is the co-founder and CEO of SmartDocGen. He's passionate about leveraging AI technology to simplify legal document generation and analysis.

**Connect with Bibekananda:**
• LinkedIn: ${PROFILE_INFO.socialLinks.linkedin}
• Twitter/X: ${PROFILE_INFO.socialLinks.twitter}
• Instagram: ${PROFILE_INFO.socialLinks.instagram}

Feel free to reach out to him directly through any of these platforms!`;
}

async function generateAIResponse(message: string): Promise<string> {
  const systemPrompt = `You are an AI Chat Assistant for SmartDocGen, an AI-powered legal document generation platform. 

Your role is to:
1. Help users with questions about legal matters, government regulations, and general topics
2. Provide helpful information about SmartDocGen and its features
3. Be friendly, professional, and informative
4. If asked about the team/co-founder, direct them to the specific profile information provided

Guidelines:
- Keep responses concise but informative
- Use a friendly, professional tone
- If you don't know something specific, say so and offer to help with related topics
- For legal advice, always recommend consulting with a qualified attorney
- Mention SmartDocGen features when relevant (Chart Bot, document generation, etc.)

Current date: ${new Date().toLocaleDateString()}`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return response.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error('OpenAI API error:', error);
    return "I'm sorry, I'm having trouble connecting to the AI service right now. Please try again in a moment.";
  }
}

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Check if user is asking about the profile/team
    if (detectProfileQuery(message)) {
      return NextResponse.json({
        response: generateProfileResponse()
      });
    }

    // Generate AI response for other queries
    const aiResponse = await generateAIResponse(message);
    
    return NextResponse.json({
      response: aiResponse
    });

  } catch (error) {
    console.error('Chat assistant error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
