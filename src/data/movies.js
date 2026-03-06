const movies = [
  {
    id: 1,
    title: "Avatar: Fire and Ash",
    year: 2025,
    genres: ["Sci-Fi", "Action", "Adventure"],
    director: "James Cameron",
    cast: ["Sam Worthington", "Zoe Saldaña", "Sigourney Weaver", "Stephen Lang"],
    description:
      "The third chapter in James Cameron's Avatar saga returns to Pandora, where Jake Sully and Neytiri face a new and devastating threat from a clan of Na'vi who harness the power of fire and volcanic ash. As old alliances fracture and the world of Pandora is pushed to its limits, the Sully family must once again fight for their home and their people.",
    posterUrl: "/images/tsireya.png",
  },
  {
    id: 2,
    title: "Casablanca",
    year: 1942,
    genres: ["Romance", "Drama", "War"],
    director: "Michael Curtiz",
    cast: ["Humphrey Bogart", "Ingrid Bergman", "Paul Henreid", "Claude Rains"],
    description:
      "Set in the Moroccan city of Casablanca during World War II, an American expatriate running a nightclub is forced to choose between his love for a woman and helping her and her Czech Resistance leader husband escape from the Vichy-controlled city. One of the most celebrated films ever made, Casablanca remains a timeless story of sacrifice, moral courage, and lost love.",
    posterUrl: "/images/casablanca.jpg",
  },
  {
    id: 3,
    title: "Cars",
    year: 2006,
    genres: ["Animation", "Comedy", "Family"],
    director: "John Lasseter",
    cast: ["Owen Wilson", "Paul Newman", "Bonnie Hunt", "Larry the Cable Guy"],
    description:
      "Lightning McQueen, a hotshot rookie race car chasing his first Piston Cup championship, finds himself stranded in the forgotten small town of Radiator Springs after a detour off Route 66. What starts as a frustrating delay becomes an unexpected journey of friendship, humility, and discovering what truly matters. A Pixar classic built on heart, humor, and a love of the open road.",
    posterUrl: "/images/cars_scene.jpg",
  },
  {
    id: 4,
    title: "Star Wars: A New Hope",
    year: 1977,
    genres: ["Sci-Fi", "Action", "Adventure"],
    director: "George Lucas",
    cast: ["Mark Hamill", "Harrison Ford", "Carrie Fisher", "Alec Guinness"],
    description:
      "A farm boy from a desert planet discovers his destiny when he joins a ragtag group of rebels fighting to destroy the Galactic Empire's ultimate weapon — the Death Star. The film that launched one of the most beloved franchises in cinema history, A New Hope introduced audiences to the Force, lightsabers, and a galaxy far, far away.",
    posterUrl: "/images/darth_vader.jpg",
  },
  {
    id: 5,
    title: "Star Wars: The Empire Strikes Back",
    year: 1980,
    genres: ["Sci-Fi", "Action", "Adventure"],
    director: "Irvin Kershner",
    cast: ["Mark Hamill", "Harrison Ford", "Carrie Fisher", "Billy Dee Williams"],
    description:
      "The Rebel Alliance is on the run from the Empire as Luke Skywalker begins his Jedi training under the ancient Master Yoda. Meanwhile, Han Solo and Princess Leia find themselves hunted across the galaxy. Widely regarded as the greatest sequel ever made, The Empire Strikes Back deepens the saga with one of cinema's most iconic revelations.",
    posterUrl: "/images/Yoda.jpg",
  },
  {
    id: 6,
    title: "Star Wars: Return of the Jedi",
    year: 1983,
    genres: ["Sci-Fi", "Action", "Adventure"],
    director: "Richard Marquand",
    cast: ["Mark Hamill", "Harrison Ford", "Carrie Fisher", "Ian McDiarmid"],
    description:
      "Luke Skywalker and the Rebel Alliance launch a final assault against the Empire, culminating in a confrontation with the Emperor himself and a last chance to redeem his father, Darth Vader. The conclusion of the original trilogy brings the saga to an emotional and triumphant close.",
    posterUrl: "/images/millennium_falcon.jpg",
  },
  {
    id: 7,
    title: "Titanic",
    year: 1997,
    genres: ["Romance", "Drama", "History"],
    director: "James Cameron",
    cast: ["Leonardo DiCaprio", "Kate Winslet", "Billy Zane", "Kathy Bates"],
    description:
      "Aboard the ill-fated RMS Titanic, a young aristocratic woman and a penniless artist fall deeply in love during the ship's maiden voyage across the Atlantic. Their romance unfolds against the backdrop of one of history's greatest maritime disasters. James Cameron's epic became the highest-grossing film of its time and swept the Academy Awards.",
    posterUrl: "/images/titanic.jpg",
  },
  {
    id: 8,
    title: "Jurassic Park",
    year: 1993,
    genres: ["Sci-Fi", "Adventure", "Thriller"],
    director: "Steven Spielberg",
    cast: ["Sam Neill", "Laura Dern", "Jeff Goldblum", "Richard Attenborough"],
    description:
      "A billionaire philanthropist invites a group of scientists to preview his remote island theme park populated by cloned dinosaurs. When the park's security systems fail, the guests find themselves hunted by creatures that have been extinct for 65 million years. Steven Spielberg's landmark film revolutionized visual effects and redefined the summer blockbuster.",
    posterUrl: "/images/brontasaur.jpg",
  },
  {
    id: 9,
    title: "The Lost World: Jurassic Park",
    year: 1997,
    genres: ["Sci-Fi", "Adventure", "Thriller"],
    director: "Steven Spielberg",
    cast: ["Jeff Goldblum", "Julianne Moore", "Pete Postlethwaite", "Vince Vaughn"],
    description:
      "Four years after the disaster on Isla Nublar, Dr. Ian Malcolm is recruited to document dinosaurs living on a second island — Isla Sorna. But a corporate team arrives with plans to capture the creatures and bring them back to the mainland, setting off a deadly chain of events. The chaos, as Dr. Malcolm would say, was inevitable.",
    posterUrl: "/images/iceberg_dino.jpg",
  },
  {
    id: 10,
    title: "Jurassic Park III",
    year: 2001,
    genres: ["Sci-Fi", "Adventure", "Thriller"],
    director: "Joe Johnston",
    cast: ["Sam Neill", "William H. Macy", "Téa Leoni", "Alessandro Nivola"],
    description:
      "Dr. Alan Grant is lured back to the dangerous Isla Sorna under false pretenses by a desperate couple searching for their missing son. Stranded on the island, the group must survive encounters with a new and terrifying apex predator — the Spinosaurus — and navigate the jungle before it's too late.",
    posterUrl: "/images/triceratops.jpg",
  },
  {
    id: 11,
    title: "Steamboat Willie",
    year: 1928,
    genres: ["Animation", "Comedy", "Short"],
    director: "Walt Disney, Ub Iwerks",
    cast: ["Walt Disney"],
    description:
      "The third Mickey Mouse cartoon and the first to feature synchronized sound, Steamboat Willie introduced the world to Mickey Mouse as a mischievous steamboat pilot who turns the animals aboard into musical instruments. A landmark in animation history, this short film marked the beginning of an entertainment empire and forever changed the art of filmmaking.",
    posterUrl: "/images/steamboat_willie.png",
  },
  {
    id: 12,
    title: "Night at the Museum",
    year: 2006,
    genres: ["Comedy", "Adventure", "Family"],
    director: "Shawn Levy",
    cast: ["Ben Stiller", "Carla Gugino", "Ricky Gervais", "Robin Williams"],
    description:
      "A hapless night security guard at the Museum of Natural History discovers that the exhibits come to life after dark — including a T-Rex skeleton, Roman soldiers, and a miniature cowboy cavalry. What begins as chaos becomes an adventure as Larry Daley fights to keep the museum from descending into full-scale prehistoric pandemonium.",
    posterUrl: "/images/lincoln_memorial.jpg",
  },
  {
    id: 13,
    title: "The Mummy",
    year: 1999,
    genres: ["Action", "Adventure", "Horror"],
    director: "Stephen Sommers",
    cast: ["Brendan Fraser", "Rachel Weisz", "Arnold Vosloo", "John Hannah"],
    description:
      "An American adventurer and a feisty librarian accidentally unleash Imhotep, an ancient Egyptian priest cursed with the darkest of spells, upon the modern world. As the resurrected mummy unleashes a series of biblical plagues in pursuit of his lost love, the unlikely heroes must race to stop him before he becomes invincible. A rousing blend of action, humor, and horror.",
    posterUrl: "/images/egypt_script.jpg",
  },
  {
    id: 14,
    title: "Rush Hour",
    year: 1998,
    genres: ["Action", "Comedy", "Crime"],
    director: "Brett Ratner",
    cast: ["Jackie Chan", "Chris Tucker", "Tom Wilkinson", "Chris Penn"],
    description:
      "When the Chinese Consul's daughter is kidnapped in Los Angeles, Hong Kong detective Inspector Lee is sent to assist the FBI — only to be sidelined and partnered with fast-talking LAPD Detective James Carter. Together, the mismatched duo must navigate cultural clashes, dangerous criminals, and their own egos to rescue the girl before time runs out.",
    posterUrl: "/images/hong_kong.jpg",
  },
  {
    id: 15,
    title: "The Fast and the Furious",
    year: 2001,
    genres: ["Action", "Crime", "Thriller"],
    director: "Rob Cohen",
    cast: ["Vin Diesel", "Paul Walker", "Jordana Brewster", "Michelle Rodriguez"],
    description:
      "An undercover LAPD officer infiltrates the world of illegal street racing to investigate a series of truck hijackings. As he is drawn deeper into the underground scene and forms a bond with its charismatic leader, he must decide where his true loyalties lie. The film that launched one of Hollywood's most enduring and high-octane franchises.",
    posterUrl: "/images/racecar.jpg",
  },
  {
    id: 16,
    title: "The Conjuring",
    year: 2013,
    genres: ["Horror", "Thriller", "Mystery"],
    director: "James Wan",
    cast: ["Patrick Wilson", "Vera Farmiga", "Ron Livingston", "Lili Taylor"],
    description:
      "Based on a true story, paranormal investigators Ed and Lorraine Warren are called to help a family terrorized by a dark presence in their remote Rhode Island farmhouse. As the Warrens dig into the home's sinister history, they uncover something far more malevolent than they have ever encountered — and are forced into a confrontation that will test their faith.",
    posterUrl: "/images/skull.jpg",
  },
  {
    id: 17,
    title: "Harry Potter and the Sorcerer's Stone",
    year: 2001,
    genres: ["Fantasy", "Adventure", "Family"],
    director: "Chris Columbus",
    cast: ["Daniel Radcliffe", "Emma Watson", "Rupert Grint", "Richard Harris"],
    description:
      "An orphaned boy living under the stairs of his aunt and uncle's house discovers on his eleventh birthday that he is a wizard and has been accepted to Hogwarts School of Witchcraft and Wizardry. As Harry Potter navigates a world of magic, friendship, and hidden danger, he begins to unravel the mystery surrounding his famous name and the dark wizard who killed his parents.",
    posterUrl: "/images/hogwarts.jpg",
  },
  {
    id: 18,
    title: "Back to the Future",
    year: 1985,
    genres: ["Sci-Fi", "Adventure", "Comedy"],
    director: "Robert Zemeckis",
    cast: ["Michael J. Fox", "Christopher Lloyd", "Lea Thompson", "Crispin Glover"],
    description:
      "Teenager Marty McFly is accidentally sent back to 1955 in a time machine built by his eccentric scientist friend Doc Brown. Stranded in the past, he must make sure his future parents fall in love — or he will cease to exist — while also finding a way back to 1985. A perfect blend of comedy, heart, and adventure that remains one of cinema's most beloved films.",
    posterUrl: "/images/btf_film.jpg",
  },
  {
    id: 19,
    title: "Finding Nemo",
    year: 2003,
    genres: ["Animation", "Adventure", "Family"],
    director: "Andrew Stanton",
    cast: ["Albert Brooks", "Ellen DeGeneres", "Alexander Gould", "Willem Dafoe"],
    description:
      "An overprotective clownfish named Marlin crosses the entire ocean to find his young son Nemo, who has been taken by a scuba diver and placed in a fish tank in a Sydney dentist's office. Along the way he is joined by the forgetful but irrepressible Dory. A Pixar masterpiece about letting go, finding courage, and the boundless love between a parent and child.",
    posterUrl: "/images/finding_nemo.jpg",
  },
  {
    id: 20,
    title: "The Notebook",
    year: 2004,
    genres: ["Romance", "Drama"],
    director: "Nick Cassavetes",
    cast: ["Ryan Gosling", "Rachel McAdams", "James Garner", "Gena Rowlands"],
    description:
      "In a nursing home, an elderly man reads to a woman with dementia from a weathered notebook — the story of a passionate summer romance between a poor mill worker and a wealthy young woman in 1940s South Carolina, and the decades of separation that followed. A sweeping love story about devotion, memory, and the enduring power of a love that refuses to fade.",
    posterUrl: "/images/the_notebook.jpg",
  },
];

export default movies;
