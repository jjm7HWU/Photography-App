const CHALLENGES = [
  {
    name: "My Lady",
    id: 0,
    reward: 20,
    tasks: [
      {
	desc: "Find a ladybug",
	question: "Is this a ladybug?"
      }
    ]
  },
  {
    name: "Trees of Scotland",
    id: 1,
    reward: 60,
    tasks: [
      {
	desc: "Find an oak tree",
	question: "Is this an oak tree?"
      },
      {
	desc: "Find an ash tree",
	question: "Is this an ash tree?"
      },
      {
	desc: "Find a willow tree",
	question: "Is this a willow tree?"
      },
      {
	desc: "Find a hazel tree",
	question: "Is this a hazel tree?"
      },
      {
	desc: "Find a birch tree",
	question: "Is this a birch tree?"
      }
    ]
  },
  {
    name: "Sunny Days",
    id: 2,
    reward: 10,
    tasks: [
      {
	desc: "Take a photo of a sunflower",
	question: "Is this a sunflower?"
      },
      {
	desc: "Find some tulips",
	question: "Are there tulips in this photo?"
      }
    ]
  },
  {
    name: "Draw Back Your Bow",
    id: 3,
    reward: 25,
    tasks: [
      {
	desc: "Find a rose",
	question: "Is this a rose?"
      },
      {
	desc: "Find a daffodil",
	question: "Is this a daffodil?"
      },
      {
	desc: "Find an orchid",
	question: "Is there an orchid in this image?"
      },
      {
	desc: "Find a butterfly",
	question: "Is this a photo of a butterfly?"
      }
    ]
  },
  {
    name: "Garden Birds",
    id: 4,
    reward: 100,
    tasks: [
      {
	desc: "Find a robin",
	question: "Does this photo contain a robin?"
      },
      {
	desc: "Find a blackbird",
	question: "Does this photo contain a blackbird?"
      },
      {
	desc: "Find a house sparrow",
	question: "Does this photo contain a house sparrow?"
      }
    ]
  },
  {
    name: "Funky fungi",
    id: 5,
    reward: 5,
    tasks: [
      {
	desc: "Find a mushroom",
	question: "Is there a mushroom in this photo?"
      }
    ]
  },
  {
    name: "Deer",
    id: 6,
    reward: 50,
    tasks: [
      {
	desc: "Find a deer",
	question: "Is there a deer in this photo?"
      }
    ]
  },
  {
    name: "Red Tail Grey Tail",
    id: 7,
    reward: 150,
    tasks: [
      {
	desc: "Find a red squirrel",
	question: "Does this photo contain a red squirrel?"
      },
      {
	desc: "Find a grey squirrel",
	question: "Does this photo contain a grey squirrel?"
      }
    ]
  },
  {
    name: "Paloma",
    id: 8,
    reward: 90,
    tasks: [
      {
	desc: "Find a woodpigeon",
	question: "Does this photo contain a woodpigeon?"
      },
      {
	desc: "Find a rock dove",
	question: "Does this photo contain a rock dove?"
      },
      {
	desc: "Find a collared dove",
	question: "Does this photo contain a collared dove?"
      }
    ]
  },
  {
    name: "Felix",
    id: 9,
    reward: 10,
    tasks: [
      {
	desc: "Take a picture of a cat",
	question: "Is there a cat in this photo?"
      }
    ]
  },
  {
    name: "Best Friend",
    id: 10,
    reward: 10,
    tasks: [
      {
	desc: "Find a dog",
	question: "Is there a dog in this photo?"
      }
    ]
  },
  {
    name: "The Edinburgh Challenge",
    id: 11,
    reward: 80,
    tasks: [
      {
	desc: "Take a photo of Edinburgh Castle",
	question: "Is this a photo of Edinburgh Castle?"
      },
      {
	desc: "Capture Arthur's Seat",
	question: "Is this a photo of Arthur's Seat?"
      },
      {
	desc: "Take a photo of Scottish Parliament at Holyrood",
	question: "Is this a photo of Scottish Parliament?"
      },
      {
	desc: "Find St Giles' Cathedral",
	question: "Is this a photo of St Giles' Cathedral?"
      },
      {
	desc: "Snap a photograph of Calton Hill",
	question: "Is this a photo of Calton Hill?"
      }
    ]
  },
  {
    name: "Sea Gulls",
    id: 12,
    reward: 20,
    tasks: [
      {
	desc: "Capture a photograph containing three or more seagulls",
	question: "Are there three of more seagulls in this photograph?"
      }
    ]
  },
  {
    name: "The St Andrews Challenge",
    id: 13,
    reward: 45,
    tasks: [
      {
	desc: "Capture a photograph of St Andrews Cathedral",
	question: "Is this an image of St Andrews Cathedral?"
      },
      {
	desc: "Take a picture of St Andrews Castle",
	question: "Is this St Andrews Castle?"
      },
      {
	desc: "Find and photograph Swilken Bridge",
	question: "Is this a photo of Swilken Bridge?"
      }
    ]
  },
  {
    name: "The Inverness Challenge",
    id: 14,
    reward: 60,
    tasks: [
      {
	desc: "Capture an image of Inverness Castle",
	question: "Is this a photo of Inverness Castle?"
      },
      {
	desc: "Take a picture of Inverness Cathedral",
	question: "Is this Inverness Cathedral?"
      },
      {
	desc: "Find and photograph St Stephen's Church",
	question: "Is this a photo of St Stephen's Church"
      }
    ]
  },
  {
    name: "The Isle of Arran Challenge",
    id: 15,
    reward: 180,
    tasks: [
      {
	desc: "Capture a photograph of Brodick Castle",
	question: "Is this Brodick Castle?"
      },
      {
	desc: "Take a photo of the Holy Isle",
	question: "Is this a photo of the Holy Isle?"
      },
      {
	desc: "Find Lochranza Castle",
	question: "Is this Lochranza Castle?"
      },
      {
	desc: "Find the Machrie Moor Standing Stones",
	question: "Are these the Machrie Moor Standing Stones?"
      }
    ]
  },
  {
    name: "The Glasgow Challenge",
    id: 16,
    reward: 100,
    tasks: [
      {
	desc: "Take a photo of the Hunterian Art Gallery",
	question: "Is this the Hunterian Art Gallery?"
      },
      {
	desc: "Capture a photo of George Square",
	question: "Is this George Square?"
      },
      {
	desc: "Find and photograph Glasgow Cathedral",
	question: "Is this a photo of Glasgow Cathedral?"
      },
      {
	desc: "Photograph Kelvingrove Art Gallery",
	question: "Is this a photo of Kelvingrove Art Gallery?"
      }
    ]
  },
  {
    name: "The Aberdeen Challenge",
    id: 17,
    reward: 60,
    tasks: [
      {
	desc: "Take a photo of the Tolbooth Museum",
	question: "Is this Tolbooth Museum"
      },
      {
	desc: "Photograph Aberdeen Science Center",
	question: "Is this a photo of Aberdeen Science Center?"
      },
      {
	desc: "Find and photograph King's College Chapel",
	question: "Is this a photo of King's College Chapel?"
      },
      {
	desc: "Find and photograph the William Wallace Statue",
	question: "Is this Aberdeen's William Wallace Statue?"
      }
    ]
  },
  {
    name: "The Shetland Challenge",
    id: 18,
    reward: 330,
    tasks: [
      {
	desc: "Take a picture of the Broch of Mousa",
	question: "Is this the Broch of Mousa?"
      },
      {
	desc: "Find a puffin!",
	question: "Is this a puffin?"
      },
      {
	desc: "Find the prehistoric settlment at Jarlshof",
	question: "Is this the Jarlshof prehistoric settlement?"
      },
      {
	desc: "Take a picture of Scalloway Castle",
	question: "Is this a photo of Scalloway Castle?"
      },
      {
	desc: "Photograph the lighthouse on Bressay",
	question: "Is this the lighthouse on Bressay?"
      }
    ]
  },
  {
    name: "Back in the Bushes",
    id: 19,
    reward: 10,
    tasks: [
      {
	desc: "Find some dock leaves",
	question: "Are these dock leaves?"
      },
      {
	desc: "Find some fern leaves",
	question: "Are these fern leaves?"
      }
    ]
  },
  {
    name: "Happy Munchers",
    id: 20,
    reward: 15,
    tasks: [
      {
	desc: "Find a snail",
	question: "Does this photo contain a snail?"
      },
      {
	desc: "Find a catterpillar",
	question: "Does this photo contain a caterpillar?"
      },
      {
	desc: "Find a woodlouce",
	question: "Does this photo contain any woodlice?"
      }
    ]
  }
];

module.exports = CHALLENGES;
