import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// API route for visualizing the custom coffee brew
app.post('/api/visualize-brew', async (req: Request, res: Response) => {
  try {
    const { 
      apparatus = 'moka', 
      cupType = 'gibraltar_glass', 
      nutProfile = 'hazelnut',
      cocoaLevel = 2,
      milkStyle = '62°C velvety oat microfoam',
      spice = 'cinnamon'
    } = req.body;

    const cupDescriptions: Record<string, string> = {
      gibraltar_glass: 'a classic faceted heavy glass tumbler (Gibraltar glass)',
      ceramic_tumbler: 'a handcrafted dark charcoal matte stoneware ceramic cortado cup with raw clay rim',
      double_walled_glass: 'a modern clear double-walled thermal glass mug',
      copper_mug: 'a warm vintage brushed copper cafe cup'
    };

    const cupName = cupDescriptions[cupType] || 'a heavy faceted cortado glass';

    const prompt = `A delicious, realistic artisanal ${nutProfile} and dark chocolate oat cortado coffee served in ${cupName}. It has a thick velvety steamed oat milk microfoam top dusted with dark Dutch cacao powder and a dash of ${spice}. Sitting on a rustic dark wooden cafe table next to freshly roasted dark roast coffee beans and toasted hazelnuts. Warm golden morning sunlight, shallow depth of field, 8k luxury coffee photography.`;

    // High-resolution curated visual fallbacks for instant response and offline resilience
    const fallbacks: Record<string, string> = {
      moka: '/src/assets/images/moka_cortado_glass_1793442806967.jpg',
      espresso: '/src/assets/images/ceramic_espresso_cortado_1793442807109.jpg',
      pourover: '/src/assets/images/pourover_glass_mug_1793442806710.jpg',
      gibraltar_glass: '/src/assets/images/hero_cacao_oat_cortado_1793441179727.jpg',
      ceramic_tumbler: '/src/assets/images/ceramic_espresso_cortado_1793442807109.jpg',
      double_walled_glass: '/src/assets/images/pourover_glass_mug_1793442806710.jpg',
    };

    const fallbackUrl = fallbacks[cupType] || fallbacks[apparatus] || fallbacks.moka;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
      return res.json({
        imageUrl: fallbackUrl,
        promptUsed: prompt,
        source: 'curated_highres',
        cupType,
        apparatus
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite-image',
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: '4:3',
        },
      },
    });

    let generatedImageUrl: string | null = null;
    for (const part of response.candidates?.[0]?.content?.parts ?? []) {
      if (part.inlineData?.data) {
        const mime = part.inlineData.mimeType ?? 'image/png';
        generatedImageUrl = `data:${mime};base64,${part.inlineData.data}`;
        break;
      }
    }

    if (generatedImageUrl) {
      return res.json({
        imageUrl: generatedImageUrl,
        promptUsed: prompt,
        source: 'gemini_generated',
        cupType,
        apparatus
      });
    }

    return res.json({
      imageUrl: fallbackUrl,
      promptUsed: prompt,
      source: 'curated_highres',
      cupType,
      apparatus
    });
  } catch (err: unknown) {
    console.warn('Gemini image generation API error, using curated photo:', err);
    
    const { apparatus = 'moka', cupType = 'gibraltar_glass', nutProfile = 'hazelnut' } = req.body || {};
    const fallbacks: Record<string, string> = {
      moka: '/src/assets/images/moka_cortado_glass_1793442806967.jpg',
      espresso: '/src/assets/images/ceramic_espresso_cortado_1793442807109.jpg',
      pourover: '/src/assets/images/pourover_glass_mug_1793442806710.jpg',
      gibraltar_glass: '/src/assets/images/hero_cacao_oat_cortado_1793441179727.jpg',
      ceramic_tumbler: '/src/assets/images/ceramic_espresso_cortado_1793442807109.jpg',
      double_walled_glass: '/src/assets/images/pourover_glass_mug_1793442806710.jpg',
    };

    return res.json({
      imageUrl: fallbacks[cupType] || fallbacks[apparatus] || fallbacks.moka,
      promptUsed: `Artisanal ${nutProfile} and dark chocolate oat cortado`,
      source: 'curated_highres',
      cupType,
      apparatus
    });
  }
});

// Vite Middleware for dev & static serve for production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

startServer();
