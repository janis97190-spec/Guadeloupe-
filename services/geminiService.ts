import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

// Initialize Gemini
// Note: API_KEY is expected to be available in process.env.API_KEY based on the runtime environment
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
Tu es "Lola", une conciergerie locale experte et chaleureuse pour "GuadaVillas", un site de location de villas de luxe en Guadeloupe.
Ton but est d'aider les clients à choisir la villa parfaite, de leur donner des conseils sur les activités locales (plages, restaurants, randonnées comme la Soufrière), et de répondre aux questions logistiques.
Ton ton est amical, professionnel et invitant. Utilise des émojis tropicaux à l'occasion.
Réponds toujours en français. Sois concis mais utile.
Si on te demande une recommandation de villa, demande les préférences (nombre de chambres, budget, proximité plage) si tu ne les as pas.
`;

let chatSession: Chat | null = null;

export const getChatSession = (): Chat => {
  if (!chatSession) {
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });
  }
  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<AsyncGenerator<string, void, unknown>> => {
  const chat = getChatSession();
  
  try {
    const result = await chat.sendMessageStream({ message });
    
    // Return a generator that yields text chunks
    return (async function* () {
      for await (const chunk of result) {
        const c = chunk as GenerateContentResponse;
        if (c.text) {
          yield c.text;
        }
      }
    })();
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    // Fallback generator in case of error
    return (async function* () {
      yield "Désolée, je rencontre un petit souci technique pour le moment. Veuillez réessayer plus tard.";
    })();
  }
};
