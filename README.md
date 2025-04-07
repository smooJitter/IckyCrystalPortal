# TravelAI - AI-Powered Travel Assistant

TravelAI is a Next.js application that uses the Mastra AI agent framework to help you plan your next trip.

## Features

- Travel date and location selection
- Trip goals specification
- Flight and accommodation preferences
- Attraction preferences based on interests
- AI-generated travel itineraries

## Tech Stack

- **Next.js**: React framework for server-rendered applications
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Mastra**: AI agent framework for building assistants
- **Vercel AI SDK**: SDK for working with various LLM providers

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- OpenAI API key (or other LLM provider key)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/travel-ai.git
cd travel-ai
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory and add your API keys:

```
OPENAI_API_KEY=your-openai-api-key
# Optional: Other LLM provider keys
# ANTHROPIC_API_KEY=your-anthropic-api-key
# GOOGLE_GENERATIVE_AI_API_KEY=your-gemini-api-key
```

4. Start the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

This application can be easily deployed to Vercel:

```bash
npm run build
npm run start
# or deploy directly to Vercel
vercel
```

## License

[MIT](LICENSE)

## Acknowledgements

- Mastra for the AI agent framework
- Vercel for the AI SDK
- Next.js team for the awesome framework 