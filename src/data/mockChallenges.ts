export interface Challenge {
  id: string;
  realImage: {
    url: string;
    title: string;
    context: string;
  };
  aiImage: {
    url: string;
    prompt: string;
    model: string;
    giveawayClue: string;
  };
  globalStats: {
    realGuessedPercent: number;
    aiGuessedPercent: number;
  };
  // To randomly place the AI image on the left or right, we can randomize at runtime
}

export const mockChallenges: Challenge[] = [
  {
    id: "ch-001",
    realImage: {
      url: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=800",
      title: "Earth from ISS",
      context: "Authentic photograph taken by astronauts aboard the International Space Station showing Earth's atmosphere."
    },
    aiImage: {
      url: "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?auto=format&fit=crop&q=80&w=800",
      prompt: "A realistic view of Earth from space, cinematic lighting, 8k resolution, photorealistic",
      model: "Midjourney v6",
      giveawayClue: "The cloud formations repeat unnaturally in a fractal pattern near the equator."
    },
    globalStats: {
      realGuessedPercent: 68,
      aiGuessedPercent: 32
    }
  },
  {
    id: "ch-002",
    realImage: {
      url: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?auto=format&fit=crop&q=80&w=800",
      title: "Astronaut on Spacewalk",
      context: "NASA photograph of an Extravehicular Activity (EVA) outside the space station."
    },
    aiImage: {
      url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
      prompt: "Astronaut floating in zero gravity, highly detailed suit, deep space background, unreal engine 5 render",
      model: "DALL-E 3",
      giveawayClue: "The reflections on the visor show a lighting source that doesn't match the ambient lighting of the scene."
    },
    globalStats: {
      realGuessedPercent: 45,
      aiGuessedPercent: 55
    }
  },
  {
    id: "ch-003",
    realImage: {
      url: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&q=80&w=800",
      title: "Rocket Launch Sequence",
      context: "Actual liftoff sequence of a modern orbital launch vehicle."
    },
    aiImage: {
      url: "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&q=80&w=800",
      prompt: "Space rocket launching into the night sky, dramatic exhaust plumes, hyperrealistic",
      model: "Stable Diffusion XL",
      giveawayClue: "The structural supports on the launch pad meld into the rocket body."
    },
    globalStats: {
      realGuessedPercent: 82,
      aiGuessedPercent: 18
    }
  }
];
