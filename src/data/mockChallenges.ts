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
  },
  // Generated challenges
  {
    id: "ch-004",
    realImage: {
      url: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=800",
      title: "Nebula Gas Clouds",
      context: "Deep space telescope photography of a star-forming nebula."
    },
    aiImage: {
      url: "https://images.unsplash.com/photo-1454789548928-9efd52dc4031?auto=format&fit=crop&q=80&w=800",
      prompt: "A vast and colorful nebula in deep space, volumetric lighting, photorealistic astronomy",
      model: "Midjourney v6",
      giveawayClue: "The star patterns lack gravitational lensing and are uniformly distributed without depth."
    },
    globalStats: {
      realGuessedPercent: 55,
      aiGuessedPercent: 45
    }
  },
  {
    id: "ch-005",
    realImage: {
      url: "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&q=80&w=800",
      title: "Cyberpunk Cityscape",
      context: "Night photography of a dense Asian metropolis in the rain."
    },
    aiImage: {
      url: "https://images.unsplash.com/photo-1515630278258-407f66498911?auto=format&fit=crop&q=80&w=800",
      prompt: "Cyberpunk city at night, neon lights reflecting in puddles, Blade Runner style, 4k",
      model: "Stable Diffusion XL",
      giveawayClue: "Some neon signs contain gibberish text that doesn't resemble any real language."
    },
    globalStats: {
      realGuessedPercent: 35,
      aiGuessedPercent: 65
    }
  },
  {
    id: "ch-006",
    realImage: {
      url: "https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?auto=format&fit=crop&q=80&w=800",
      title: "Vintage Computing",
      context: "Historical photo of an early mainframe computer facility."
    },
    aiImage: {
      url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
      prompt: "A 1960s supercomputer room, scientists in lab coats, vintage photo aesthetic, realistic",
      model: "Midjourney v6",
      giveawayClue: "The cables plug directly into the wall panels without any discernible ports or logical flow."
    },
    globalStats: {
      realGuessedPercent: 72,
      aiGuessedPercent: 28
    }
  },
  {
    id: "ch-007",
    realImage: {
      url: "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?auto=format&fit=crop&q=80&w=800",
      title: "Microscopic Engineering",
      context: "Electron microscope view of a complex integrated circuit."
    },
    aiImage: {
      url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800",
      prompt: "Close up macro shot of a glowing microchip, circuit board traces, neon lighting, sci-fi",
      model: "DALL-E 3",
      giveawayClue: "The traces on the circuit board terminate abruptly and cross each other impossibly."
    },
    globalStats: {
      realGuessedPercent: 49,
      aiGuessedPercent: 51
    }
  },
  {
    id: "ch-008",
    realImage: {
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800",
      title: "Desert Dunes",
      context: "Aerial photography of the Sahara desert sand dunes at sunset."
    },
    aiImage: {
      url: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800",
      prompt: "Vast desert dunes at golden hour, sharp wind ridges, National Geographic style",
      model: "Midjourney v6",
      giveawayClue: "The shadows on the left side of the dunes contradict the position of the visible sun."
    },
    globalStats: {
      realGuessedPercent: 88,
      aiGuessedPercent: 12
    }
  },
  {
    id: "ch-009",
    realImage: {
      url: "https://images.unsplash.com/photo-1506744626753-143683980bba?auto=format&fit=crop&q=80&w=800",
      title: "Mountain Range",
      context: "High altitude shot of the Himalayas during early morning."
    },
    aiImage: {
      url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800",
      prompt: "Majestic snow-capped mountains breaking through clouds, photorealistic landscape",
      model: "Stable Diffusion XL",
      giveawayClue: "The snow lines on the peaks look more like painted strokes rather than natural accumulation."
    },
    globalStats: {
      realGuessedPercent: 60,
      aiGuessedPercent: 40
    }
  }
];
