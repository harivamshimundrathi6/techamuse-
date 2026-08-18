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
  },
  // More challenges to make 15
  {
    id: "ch-010",
    realImage: {
      url: "https://images.unsplash.com/photo-1542314831-c6a4d1421051?auto=format&fit=crop&q=80&w=800",
      title: "Deep Sea Diver",
      context: "Marine biologist exploring a coral reef system."
    },
    aiImage: {
      url: "https://images.unsplash.com/photo-1522039553444-a95e7c276ee9?auto=format&fit=crop&q=80&w=800",
      prompt: "Deep sea diver exploring an ancient underwater ruin, bioluminescent plants, hyperrealistic",
      model: "Midjourney v6",
      giveawayClue: "The air bubbles coming from the regulator travel downwards instead of towards the surface."
    },
    globalStats: { realGuessedPercent: 62, aiGuessedPercent: 38 }
  },
  {
    id: "ch-011",
    realImage: {
      url: "https://images.unsplash.com/photo-1517511620798-cec17d428bc0?auto=format&fit=crop&q=80&w=800",
      title: "Abstract Architecture",
      context: "Modern art museum exterior shot at noon."
    },
    aiImage: {
      url: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&q=80&w=800",
      prompt: "Futuristic parametric architecture, impossible geometry, photorealistic, 8k",
      model: "Stable Diffusion XL",
      giveawayClue: "The shadows of the building fall in three different directions simultaneously."
    },
    globalStats: { realGuessedPercent: 44, aiGuessedPercent: 56 }
  },
  {
    id: "ch-012",
    realImage: {
      url: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&q=80&w=800",
      title: "Milky Way Galaxy",
      context: "Long exposure astrophotography from a dark sky reserve."
    },
    aiImage: {
      url: "https://images.unsplash.com/photo-1465101162946-4377e57745c3?auto=format&fit=crop&q=80&w=800",
      prompt: "The milky way galaxy seen from an alien planet, vivid colors, realistic rendering",
      model: "DALL-E 3",
      giveawayClue: "There are two full moons visible in the sky with inconsistent crater patterns."
    },
    globalStats: { realGuessedPercent: 70, aiGuessedPercent: 30 }
  },
  {
    id: "ch-013",
    realImage: {
      url: "https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?auto=format&fit=crop&q=80&w=800",
      title: "Server Farm",
      context: "Interior view of a massive cloud computing data center."
    },
    aiImage: {
      url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
      prompt: "Endless rows of glowing quantum computers, cinematic lighting, hyper-detailed",
      model: "Midjourney v6",
      giveawayClue: "The server racks blend seamlessly into the floor tiles without any structural base."
    },
    globalStats: { realGuessedPercent: 52, aiGuessedPercent: 48 }
  },
  {
    id: "ch-014",
    realImage: {
      url: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&q=80&w=800",
      title: "Vintage Camera",
      context: "Macro photography of an antique film camera lens."
    },
    aiImage: {
      url: "https://images.unsplash.com/photo-1502982720700-baf97d4220a8?auto=format&fit=crop&q=80&w=800",
      prompt: "Steampunk camera made of brass and glass, intricate gears, photorealistic macro",
      model: "Stable Diffusion XL",
      giveawayClue: "Some of the gear teeth overlap instead of interlocking correctly."
    },
    globalStats: { realGuessedPercent: 81, aiGuessedPercent: 19 }
  },
  {
    id: "ch-015",
    realImage: {
      url: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&q=80&w=800",
      title: "Meteor Shower",
      context: "Time-lapse photograph of the Perseid meteor shower over a forest."
    },
    aiImage: {
      url: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&q=80&w=800",
      prompt: "Rain of shooting stars over a magical forest, glowing trees, realistic night sky",
      model: "Midjourney v6",
      giveawayClue: "The meteor trails follow a curved path rather than the straight lines dictated by physics."
    },
    globalStats: { realGuessedPercent: 41, aiGuessedPercent: 59 }
  }
];
