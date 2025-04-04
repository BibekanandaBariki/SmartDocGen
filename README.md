# SmartDocGen - AI-Powered Legal Document Generator

SmartDocGen is an advanced legal document generator that leverages the power of artificial intelligence to create professional legal documents in minutes. This application allows users to generate contracts, agreements, and legal notices with ease.

## Features

- **AI-Powered Document Generation**: Uses OpenAI's GPT models to generate legally sound documents.
- **Multiple Document Types**: Support for contracts, agreements, and legal notices.
- **Custom Document Inputs**: Enter party information, terms, and other details to create tailored documents.
- **PDF Download**: Export generated documents to PDF format for easy sharing and printing.
- **Modern UI**: Clean and intuitive user interface built with Next.js and Tailwind CSS.

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Next.js API Routes
- **AI Integration**: OpenAI API (GPT-3.5-turbo)
- **PDF Generation**: jsPDF
- **Styling**: Tailwind CSS
- **Form Handling**: React Hook Form

## Getting Started

### Prerequisites

- Node.js 18+ and npm installed
- OpenAI API key

### Local Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/SmartDocGen.git
   cd SmartDocGen
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_openai_api_key
   OPENAI_MODEL=gpt-3.5-turbo
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`.

## Deployment on Render

This application can be easily deployed on Render:

1. Push your code to GitHub (make sure not to include your `.env.local` file)

2. Create a new Web Service on Render
   - Connect to your GitHub repository
   - Name: `smartdocgen` (or your preferred name)
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`

3. Add environment variables in Render dashboard:
   - OPENAI_API_KEY: your_openai_api_key
   - OPENAI_MODEL: gpt-3.5-turbo

4. Deploy the service

## Important Notes for Deployment

- The application includes a fallback mechanism that generates mock documents if the OpenAI API is unavailable or exceeds quota limits
- Environment variables must be set properly for the OpenAI integration to work
- Never commit your API keys to the repository

## Usage

1. Select the type of document you want to generate (contract, agreement, or notice).
2. Fill in the required information including:
   - Party details
   - Document purpose
   - Terms and conditions
   - Additional information (optional)
3. Click "Generate Document" to create your legal document.
4. Review the generated document.
5. Download the document as a PDF or copy the text.

## Disclaimer

This application is designed for educational and demonstration purposes. While the generated documents follow general legal principles, they should be reviewed by a qualified legal professional before use in actual legal situations.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 