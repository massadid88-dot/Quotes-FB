
import { GoogleGenAI, Type } from "@google/genai";
import type { Quote } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This is a fallback for development and will show an alert.
  // In the target environment, process.env.API_KEY is expected to be set.
  console.error("API_KEY is not set. Please set it in your environment variables.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const quoteSchema = {
  type: Type.OBJECT,
  properties: {
    text: {
      type: Type.STRING,
      description: "Isi utama dari kutipan. Harus inspiratif atau memancing pemikiran.",
    },
    author: {
      type: Type.STRING,
      description: "Penulis atau sumber kutipan, seperti 'Pikiran Inspiratif' atau 'Pepatah'.",
    },
  },
  required: ['text', 'author'],
};

export const generateQuotes = async (topic: string): Promise<Quote[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Bertindaklah sebagai pembuat konten media sosial kelas dunia yang berspesialisasi dalam konten viral dan menarik. Buat tepat 5 quotes unik dan inspiratif tentang "${topic}". Quotes harus cocok untuk audiens profil Facebook Profesional. Jaga agar penulisnya tetap umum dan memotivasi, seperti 'Pikiran Inspiratif' atau 'Motivasi Harian'. Sediakan output dalam format array JSON yang valid.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: quoteSchema,
        },
        temperature: 0.8,
        topP: 0.9,
      },
    });

    const jsonString = response.text.trim();
    const quotes = JSON.parse(jsonString) as Quote[];
    return quotes;

  } catch (error) {
    console.error("Error generating quotes:", error);
    if (error instanceof Error) {
        throw new Error(`Gagal membuat quotes dari AI: ${error.message}`);
    }
    throw new Error("Terjadi kesalahan yang tidak diketahui saat membuat quotes.");
  }
};
