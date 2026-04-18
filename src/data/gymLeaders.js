const redBlueGyms = [
  {
    number: 1,
    gymName: 'Pewter City Gym',
    leader: 'Brock',
    location: 'Pewter City',
    specialty: 'Rock-type',
    specialtyType: 'rock',
    team: [
      {
        name: 'Geodude',
        apiName: 'geodude',
        level: 12,
        moves: ['Tackle', 'Defense Curl']
      },
      {
        name: 'Onix',
        apiName: 'onix',
        level: 14,
        moves: ['Tackle', 'Screech', 'Bide']
      }
    ]
  },
  {
    number: 2,
    gymName: 'Cerulean City Gym',
    leader: 'Misty',
    location: 'Cerulean City',
    specialty: 'Water-type',
    specialtyType: 'water',
    team: [
      {
        name: 'Staryu',
        apiName: 'staryu',
        level: 18,
        moves: ['Tackle', 'Water Gun']
      },
      {
        name: 'Starmie',
        apiName: 'starmie',
        level: 21,
        moves: ['Tackle', 'Water Gun', 'Harden', 'Bubblebeam']
      }
    ]
  },
  {
    number: 3,
    gymName: 'Vermillion City Gym',
    leader: 'Lt. Surge',
    location: 'Vermillion City',
    specialty: 'Electric-type',
    specialtyType: 'electric',
    team: [
      {
        name: 'Voltorb',
        apiName: 'voltorb',
        level: 21,
        moves: ['Tackle', 'Screech', 'Sonicboom']
      },
      {
        name: 'Pikachu',
        apiName: 'pikachu',
        level: 18,
        moves: ['Thundershock', 'Thunder Wave', 'Growl', 'Quick Attack']
      },
      {
        name: 'Raichu',
        apiName: 'raichu',
        level: 24,
        moves: ['Thunderbolt', 'Thundershock', 'Thunder Wave', 'Growl']
      }
    ]
  },
  {
    number: 4,
    gymName: 'Celadon City Gym',
    leader: 'Erika',
    location: 'Celadon City',
    specialty: 'Grass-type',
    specialtyType: 'grass',
    team: [
      {
        name: 'Victreebel',
        apiName: 'victreebel',
        level: 29,
        moves: ['Wrap', 'Poisonpowder', 'Sleep Powder', 'Razor Leaf']
      },
      {
        name: 'Tangela',
        apiName: 'tangela',
        level: 24,
        moves: ['Bind', 'Constrict']
      },
      {
        name: 'Vileplume',
        apiName: 'vileplume',
        level: 29,
        moves: ['Poisonpowder', 'Mega Drain', 'Sleep Powder', 'Petal Dance']
      }
    ]
  },
  {
    number: 5,
    gymName: 'Fuchsia City Gym',
    leader: 'Koga',
    location: 'Fuchsia City',
    specialty: 'Poison-type',
    specialtyType: 'poison',
    team: [
      {
        name: 'Koffing',
        apiName: 'koffing',
        level: 37,
        moves: ['Tackle', 'Smog', 'Sludge', 'Smokescreen']
      },
      {
        name: 'Muk',
        apiName: 'muk',
        level: 39,
        moves: ['Disable', 'Poison Gas', 'Minimize', 'Sludge']
      },
      {
        name: 'Koffing',
        apiName: 'koffing',
        level: 37,
        moves: ['Tackle', 'Smog', 'Sludge', 'Smokescreen']
      },
      {
        name: 'Weezing',
        apiName: 'weezing',
        level: 43,
        moves: ['Smog', 'Sludge', 'Toxic', 'Selfdestruct']
      }
    ]
  },
  {
    number: 6,
    gymName: 'Saffron City Gym',
    leader: 'Sabrina',
    location: 'Saffron City',
    specialty: 'Psychic-type',
    specialtyType: 'psychic',
    team: [
      {
        name: 'Kadabra',
        apiName: 'kadabra',
        level: 38,
        moves: ['Disable', 'Psybeam', 'Recover', 'Psychic']
      },
      {
        name: 'Mr. Mime',
        apiName: 'mr-mime',
        level: 37,
        moves: ['Confusion', 'Barrier', 'Light Screen', 'Doubleslap']
      },
      {
        name: 'Venomoth',
        apiName: 'venomoth',
        level: 38,
        moves: ['Poisonpowder', 'Leech Life', 'Stun Spore', 'Psybeam']
      },
      {
        name: 'Alakazam',
        apiName: 'alakazam',
        level: 43,
        moves: ['Psybeam', 'Recover', 'Psywave', 'Reflect']
      }
    ]
  },
  {
    number: 7,
    gymName: 'Cinnabar Island Gym',
    leader: 'Blaine',
    location: 'Cinnabar Island',
    specialty: 'Fire-type',
    specialtyType: 'fire',
    team: [
      {
        name: 'Growlithe',
        apiName: 'growlithe',
        level: 42,
        moves: ['Ember', 'Leer', 'Take Down', 'Agility']
      },
      {
        name: 'Ponyta',
        apiName: 'ponyta',
        level: 40,
        moves: ['Tail Whip', 'Stomp', 'Growl', 'Fire Spin']
      },
      {
        name: 'Rapidash',
        apiName: 'rapidash',
        level: 42,
        moves: ['Tail Whip', 'Stomp', 'Growl', 'Fire Spin']
      },
      {
        name: 'Arcanine',
        apiName: 'arcanine',
        level: 47,
        moves: ['Roar', 'Ember', 'Take Down', 'Fire Blast']
      }
    ]
  },
  {
    number: 8,
    gymName: 'Viridian City Gym',
    leader: 'Giovanni',
    location: 'Viridian City',
    specialty: 'Ground-type',
    specialtyType: 'ground',
    team: [
      {
        name: 'Rhyhorn',
        apiName: 'rhyhorn',
        level: 45,
        moves: ['Stomp', 'Tail Whip', 'Fury Attack', 'Horn Attack']
      },
      {
        name: 'Dugtrio',
        apiName: 'dugtrio',
        level: 42,
        moves: ['Growl', 'Dig', 'Sand Attack', 'Slash']
      },
      {
        name: 'Nidoqueen',
        apiName: 'nidoqueen',
        level: 44,
        moves: ['Scratch', 'Tail Whip', 'Poison Sting', 'Body Slam']
      },
      {
        name: 'Nidoking',
        apiName: 'nidoking',
        level: 45,
        moves: ['Tackle', 'Horn Attack', 'Poison Sting', 'Thrash']
      },
      {
        name: 'Rhydon',
        apiName: 'rhydon',
        level: 50,
        moves: ['Stomp', 'Tail Whip', 'Fissure', 'Horn Drill']
      }
    ]
  }
]

const yellowGyms = [
  {
    number: 1,
    gymName: 'Pewter City Gym',
    leader: 'Brock',
    location: 'Pewter City',
    specialty: 'Rock-type',
    specialtyType: 'rock',
    team: [
      {
        name: 'Geodude',
        apiName: 'geodude',
        level: 10,
        moves: ['Tackle']
      },
      {
        name: 'Onix',
        apiName: 'onix',
        level: 12,
        moves: ['Tackle', 'Screech', 'Bide', 'Bind']
      }
    ]
  },
  {
    number: 2,
    gymName: 'Cerulean City Gym',
    leader: 'Misty',
    location: 'Cerulean City',
    specialty: 'Water-type',
    specialtyType: 'water',
    team: [
      {
        name: 'Staryu',
        apiName: 'staryu',
        level: 18,
        moves: ['Tackle', 'Water Gun']
      },
      {
        name: 'Starmie',
        apiName: 'starmie',
        level: 21,
        moves: ['Tackle', 'Water Gun', 'Harden', 'Bubblebeam']
      }
    ]
  },
  {
    number: 3,
    gymName: 'Vermillion City Gym',
    leader: 'Lt. Surge',
    location: 'Vermillion City',
    specialty: 'Electric-type',
    specialtyType: 'electric',
    team: [
      {
        name: 'Raichu',
        apiName: 'raichu',
        level: 28,
        moves: ['Thunderbolt', 'Growl', 'Mega Punch', 'Mega Kick']
      }
    ]
  },
  {
    number: 4,
    gymName: 'Celadon City Gym',
    leader: 'Erika',
    location: 'Celadon City',
    specialty: 'Grass-type',
    specialtyType: 'grass',
    team: [
      {
        name: 'Weepinbell',
        apiName: 'weepinbell',
        level: 32,
        moves: ['Wrap', 'Stun Spore', 'Sleep Powder', 'Razor Leaf']
      },
      {
        name: 'Tangela',
        apiName: 'tangela',
        level: 30,
        moves: ['Bind', 'Mega Drain', 'Vine Whip', 'Constrict']
      },
      {
        name: 'Gloom',
        apiName: 'gloom',
        level: 32,
        moves: ['Acid', 'Petal Dance', 'Stun Spore', 'Sleep Powder']
      }
    ]
  },
  {
    number: 5,
    gymName: 'Fuchsia City Gym',
    leader: 'Koga',
    location: 'Fuchsia City',
    specialty: 'Poison-type',
    specialtyType: 'poison',
    team: [
      {
        name: 'Venonat',
        apiName: 'venonat',
        level: 44,
        moves: ['Tackle', 'Toxic', 'Sleep Powder', 'Psychic']
      },
      {
        name: 'Venonat',
        apiName: 'venonat',
        level: 46,
        moves: ['Toxic', 'Psybeam', 'Supersonic', 'Psychic']
      },
      {
        name: 'Venonat',
        apiName: 'venonat',
        level: 48,
        moves: ['Toxic', 'Psychic', 'Sleep Powder', 'Double-Edge']
      },
      {
        name: 'Venomoth',
        apiName: 'venomoth',
        level: 50,
        moves: ['Toxic', 'Psychic', 'Leech Life', 'Double Team']
      }
    ]
  },
  {
    number: 6,
    gymName: 'Saffron City Gym',
    leader: 'Sabrina',
    location: 'Saffron City',
    specialty: 'Psychic-type',
    specialtyType: 'psychic',
    team: [
      {
        name: 'Abra',
        apiName: 'abra',
        level: 50,
        moves: ['Teleport', 'Flash']
      },
      {
        name: 'Kadabra',
        apiName: 'kadabra',
        level: 50,
        moves: ['Psychic', 'Recover', 'Kinesis', 'Psywave']
      },
      {
        name: 'Alakazam',
        apiName: 'alakazam',
        level: 50,
        moves: ['Psychic', 'Psywave', 'Reflect', 'Recover']
      }
    ]
  },
  {
    number: 7,
    gymName: 'Cinnabar Island Gym',
    leader: 'Blaine',
    location: 'Cinnabar Island',
    specialty: 'Fire-type',
    specialtyType: 'fire',
    team: [
      {
        name: 'Ninetales',
        apiName: 'ninetales',
        level: 48,
        moves: ['Confuse Ray', 'Quick Attack', 'Tail Whip', 'Flamethrower']
      },
      {
        name: 'Rapidash',
        apiName: 'rapidash',
        level: 50,
        moves: ['Take Down', 'Stomp', 'Growl', 'Fire Spin']
      },
      {
        name: 'Arcanine',
        apiName: 'arcanine',
        level: 54,
        moves: ['Reflect', 'Flamethrower', 'Take Down', 'Fire Blast']
      }
    ]
  },
  {
    number: 8,
    gymName: 'Viridian City Gym',
    leader: 'Giovanni',
    location: 'Viridian City',
    specialty: 'Ground-type',
    specialtyType: 'ground',
    team: [
      {
        name: 'Dugtrio',
        apiName: 'dugtrio',
        level: 50,
        moves: ['Sand Attack', 'Dig', 'Fissure', 'Earthquake']
      },
      {
        name: 'Persian',
        apiName: 'persian',
        level: 53,
        moves: ['Screech', 'Slash', 'Fury Swipes', 'Double Team']
      },
      {
        name: 'Nidoqueen',
        apiName: 'nidoqueen',
        level: 53,
        moves: ['Tail Whip', 'Double Kick', 'Poison Sting', 'Thunder']
      },
      {
        name: 'Nidoking',
        apiName: 'nidoking',
        level: 55,
        moves: ['Thunder', 'Leer', 'Earthquake', 'Thrash']
      },
      {
        name: 'Rhydon',
        apiName: 'rhydon',
        level: 55,
        moves: ['Rock Slide', 'Fury Attack', 'Earthquake', 'Horn Drill']
      }
    ]
  }
]

const goldSilverGyms = [
  {
    number: 1,
    gymName: 'Violet City Gym',
    leader: 'Falkner',
    location: 'Violet City',
    specialty: 'Flying-type',
    specialtyType: 'flying',
    team: [
      { name: 'Pidgey', apiName: 'pidgey', level: 7, moves: ['Tackle', 'Mud-Slap'] },
      { name: 'Pidgeotto', apiName: 'pidgeotto', level: 9, moves: ['Tackle', 'Mud-Slap', 'Gust'] }
    ]
  },
  {
    number: 2,
    gymName: 'Azalea Town Gym',
    leader: 'Bugsy',
    location: 'Azalea Town',
    specialty: 'Bug-type',
    specialtyType: 'bug',
    team: [
      { name: 'Metapod', apiName: 'metapod', level: 14, moves: ['Tackle', 'String Shot', 'Harden'] },
      { name: 'Kakuna', apiName: 'kakuna', level: 14, moves: ['Poison Sting', 'String Shot', 'Harden'] },
      { name: 'Scyther', apiName: 'scyther', level: 16, moves: ['Quick Attack', 'Leer', 'Fury Cutter'] }
    ]
  },
  {
    number: 3,
    gymName: 'Goldenrod City Gym',
    leader: 'Whitney',
    location: 'Goldenrod City',
    specialty: 'Normal-type',
    specialtyType: 'normal',
    team: [
      { name: 'Clefairy', apiName: 'clefairy', level: 18, moves: ['Doubleslap', 'Mimic', 'Encore', 'Metronome'] },
      { name: 'Miltank', apiName: 'miltank', level: 20, moves: ['Rollout', 'Attract', 'Stomp', 'Milk Drink'] }
    ]
  },
  {
    number: 4,
    gymName: 'Ecruteak City Gym',
    leader: 'Morty',
    location: 'Ecruteak City',
    specialty: 'Ghost-type',
    specialtyType: 'ghost',
    team: [
      { name: 'Gastly', apiName: 'gastly', level: 21, moves: ['Lick', 'Spite', 'Mean Look', 'Curse'] },
      { name: 'Haunter', apiName: 'haunter', level: 21, moves: ['Hypnosis', 'Mimic', 'Curse', 'Night Shade'] },
      { name: 'Haunter', apiName: 'haunter', level: 23, moves: ['Spite', 'Mean Look', 'Mimic', 'Night Shade'] },
      { name: 'Gengar', apiName: 'gengar', level: 25, moves: ['Hypnosis', 'Shadow Ball', 'Mean Look', 'Dream Eater'] }
    ]
  },
  {
    number: 5,
    gymName: 'Cianwood City Gym',
    leader: 'Chuck',
    location: 'Cianwood City',
    specialty: 'Fighting-type',
    specialtyType: 'fighting',
    team: [
      { name: 'Primeape', apiName: 'primeape', level: 27, moves: ['Leer', 'Rage', 'Karate Chop', 'Fury Swipes'] },
      { name: 'Poliwrath', apiName: 'poliwrath', level: 30, moves: ['Hypnosis', 'Mind Reader', 'Surf', 'Dynamicpunch'] }
    ]
  },
  {
    number: 6,
    gymName: 'Olivine City Gym',
    leader: 'Jasmine',
    location: 'Olivine City',
    specialty: 'Steel-type',
    specialtyType: 'steel',
    team: [
      { name: 'Magnemite', apiName: 'magnemite', level: 30, moves: ['Thunderbolt', 'Supersonic', 'Sonicboom', 'Thunder Wave'] },
      { name: 'Magnemite', apiName: 'magnemite', level: 30, moves: ['Thunderbolt', 'Supersonic', 'Sonicboom', 'Thunder Wave'] },
      { name: 'Steelix', apiName: 'steelix', level: 35, moves: ['Screech', 'Sunny Day', 'Rock Throw', 'Iron Tail'] }
    ]
  },
  {
    number: 7,
    gymName: 'Mahogany Town Gym',
    leader: 'Pryce',
    location: 'Mahogany Town',
    specialty: 'Ice-type',
    specialtyType: 'ice',
    team: [
      { name: 'Seel', apiName: 'seel', level: 27, moves: ['Headbutt', 'Icy Wind', 'Aurora Beam', 'Rest'] },
      { name: 'Dewgong', apiName: 'dewgong', level: 29, moves: ['Headbutt', 'Icy Wind', 'Aurora Beam', 'Rest'] },
      { name: 'Piloswine', apiName: 'piloswine', level: 31, moves: ['Icy Wind', 'Fury Attack', 'Mist', 'Blizzard'] }
    ]
  },
  {
    number: 8,
    gymName: 'Blackthorn City Gym',
    leader: 'Clair',
    location: 'Blackthorn City',
    specialty: 'Dragon-type',
    specialtyType: 'dragon',
    team: [
      { name: 'Dragonair', apiName: 'dragonair', level: 37, moves: ['Thunder Wave', 'Surf', 'Slam', 'Dragonbreath'] },
      { name: 'Dragonair', apiName: 'dragonair', level: 37, moves: ['Thunder Wave', 'Thunderbolt', 'Slam', 'Dragonbreath'] },
      { name: 'Dragonair', apiName: 'dragonair', level: 37, moves: ['Thunder Wave', 'Ice Beam', 'Slam', 'Dragonbreath'] },
      { name: 'Kingdra', apiName: 'kingdra', level: 40, moves: ['Smokescreen', 'Surf', 'Hyper Beam', 'Dragonbreath'] }
    ]
  },
  {
    number: 9,
    gymName: 'Vermilion City Gym',
    leader: 'Lt. Surge',
    location: 'Vermilion City',
    specialty: 'Electric-type',
    specialtyType: 'electric',
    team: [
      { name: 'Raichu', apiName: 'raichu', level: 44, moves: ['Thunder Wave', 'Quick Attack', 'Thunderbolt', 'Thunder'] },
      { name: 'Electrode', apiName: 'electrode', level: 40, moves: ['Screech', 'Double Team', 'Swift', 'Explosion'] },
      { name: 'Electrode', apiName: 'electrode', level: 40, moves: ['Screech', 'Double Team', 'Swift', 'Explosion'] },
      { name: 'Magneton', apiName: 'magneton', level: 40, moves: ['Lock-On', 'Double Team', 'Swift', 'Zap Cannon'] },
      { name: 'Electabuzz', apiName: 'electabuzz', level: 45, moves: ['Quick Attack', 'Thunderpunch', 'Light Screen', 'Thunder'] }
    ]
  },
  {
    number: 10,
    gymName: 'Saffron City Gym',
    leader: 'Sabrina',
    location: 'Saffron City',
    specialty: 'Psychic-type',
    specialtyType: 'psychic',
    team: [
      { name: 'Espeon', apiName: 'espeon', level: 46, moves: ['Sand-Attack', 'Quick Attack', 'Swift', 'Psychic'] },
      { name: 'Mr. Mime', apiName: 'mr-mime', level: 46, moves: ['Barrier', 'Reflect', 'Baton Pass', 'Psychic'] },
      { name: 'Alakazam', apiName: 'alakazam', level: 48, moves: ['Recover', 'Future Sight', 'Psychic', 'Reflect'] }
    ]
  },
  {
    number: 11,
    gymName: 'Celadon City Gym',
    leader: 'Erika',
    location: 'Celadon City',
    specialty: 'Grass-type',
    specialtyType: 'grass',
    team: [
      { name: 'Tangela', apiName: 'tangela', level: 42, moves: ['Vine Whip', 'Bind', 'Giga Drain', 'Sleep Powder'] },
      { name: 'Jumpluff', apiName: 'jumpluff', level: 41, moves: ['Mega Drain', 'Leech Seed', 'Cotton Spore', 'Giga Drain'] },
      { name: 'Victreebel', apiName: 'victreebel', level: 46, moves: ['Sunny Day', 'Synthesis', 'Acid', 'Razor Leaf'] },
      { name: 'Bellossom', apiName: 'bellossom', level: 46, moves: ['Sunny Day', 'Synthesis', 'Petal Dance', 'Solarbeam'] }
    ]
  },
  {
    number: 12,
    gymName: 'Fuchsia City Gym',
    leader: 'Janine',
    location: 'Fuchsia City',
    specialty: 'Poison-type',
    specialtyType: 'poison',
    team: [
      { name: 'Crobat', apiName: 'crobat', level: 36, moves: ['Screech', 'Supersonic', 'Confuse Ray', 'Wing Attack'] },
      { name: 'Weezing', apiName: 'weezing', level: 36, moves: ['Smog', 'Sludge Bomb', 'Toxic', 'Explosion'] },
      { name: 'Weezing', apiName: 'weezing', level: 36, moves: ['Smog', 'Sludge Bomb', 'Toxic', 'Explosion'] },
      { name: 'Ariados', apiName: 'ariados', level: 33, moves: ['Scary Face', 'Giga Drain', 'String Shot', 'Night Shade'] },
      { name: 'Venomoth', apiName: 'venomoth', level: 39, moves: ['Foresight', 'Double Team', 'Gust', 'Psychic'] }
    ]
  },
  {
    number: 13,
    gymName: 'Cerulean City Gym',
    leader: 'Misty',
    location: 'Cerulean City',
    specialty: 'Water-type',
    specialtyType: 'water',
    team: [
      { name: 'Golduck', apiName: 'golduck', level: 42, moves: ['Surf', 'Disable', 'Psych Up', 'Psychic'] },
      { name: 'Quagsire', apiName: 'quagsire', level: 42, moves: ['Surf', 'Amnesia', 'Earthquake', 'Rain Dance'] },
      { name: 'Lapras', apiName: 'lapras', level: 44, moves: ['Surf', 'Perish Song', 'Blizzard', 'Rain Dance'] },
      { name: 'Starmie', apiName: 'starmie', level: 47, moves: ['Surf', 'Confuse Ray', 'Recover', 'Ice Beam'] }
    ]
  },
  {
    number: 14,
    gymName: 'Pewter City Gym',
    leader: 'Brock',
    location: 'Pewter City',
    specialty: 'Rock-type',
    specialtyType: 'rock',
    team: [
      { name: 'Graveler', apiName: 'graveler', level: 41, moves: ['Defense Curl', 'Rock Slide', 'Rollout', 'Earthquake'] },
      { name: 'Rhyhorn', apiName: 'rhyhorn', level: 41, moves: ['Fury Attack', 'Scary Face', 'Earthquake', 'Horn Drill'] },
      { name: 'Omastar', apiName: 'omastar', level: 42, moves: ['Bite', 'Surf', 'Protect', 'Spike Cannon'] },
      { name: 'Onix', apiName: 'onix', level: 44, moves: ['Bind', 'Rock Slide', 'Bide', 'Sandstorm'] },
      { name: 'Kabutops', apiName: 'kabutops', level: 42, moves: ['Slash', 'Surf', 'Endure', 'Giga Drain'] }
    ]
  },
  {
    number: 15,
    gymName: 'Seafoam Islands Gym',
    leader: 'Blaine',
    location: 'Seafoam Islands',
    specialty: 'Fire-type',
    specialtyType: 'fire',
    team: [
      { name: 'Magcargo', apiName: 'magcargo', level: 45, moves: ['Curse', 'Smog', 'Flamethrower', 'Rock Slide'] },
      { name: 'Magmar', apiName: 'magmar', level: 45, moves: ['Thunderpunch', 'Fire Punch', 'Sunny Day', 'Confuse Ray'] },
      { name: 'Rapidash', apiName: 'rapidash', level: 50, moves: ['Quick Attack', 'Fire Spin', 'Fury Attack', 'Fire Blast'] }
    ]
  },
  {
    number: 16,
    gymName: 'Viridian City Gym',
    leader: 'Blue',
    location: 'Viridian City',
    specialty: 'None',
    specialtyType: 'unknown',
    team: [
      { name: 'Pidgeot', apiName: 'pidgeot', level: 56, moves: ['Quick Attack', 'Whirlwind', 'Wing Attack', 'Mirror Move'] },
      { name: 'Alakazam', apiName: 'alakazam', level: 54, moves: ['Disable', 'Recover', 'Psychic', 'Reflect'] },
      { name: 'Rhydon', apiName: 'rhydon', level: 56, moves: ['Fury Attack', 'Sandstorm', 'Rock Slide', 'Earthquake'] },
      { name: 'Gyarados', apiName: 'gyarados', level: 58, moves: ['Twister', 'Hydro Pump', 'Rain Dance', 'Hyper Beam'] },
      { name: 'Exeggutor', apiName: 'exeggutor', level: 58, moves: ['Sunny Day', 'Leech Seed', 'Egg Bomb', 'Solar Beam'] },
      { name: 'Arcanine', apiName: 'arcanine', level: 58, moves: ['Roar', 'Swift', 'Flamethrower', 'Extreme Speed'] }
    ]
  }
]

const crystalGyms = [
  {
    number: 1,
    gymName: 'Violet City Gym',
    leader: 'Falkner',
    location: 'Violet City',
    specialty: 'Flying-type',
    specialtyType: 'flying',
    team: [
      { name: 'Pidgey', apiName: 'pidgey', level: 7, moves: ['Tackle', 'Mud-Slap'] },
      { name: 'Pidgeotto', apiName: 'pidgeotto', level: 9, moves: ['Tackle', 'Mud-Slap', 'Gust'] }
    ]
  },
  {
    number: 2,
    gymName: 'Azalea Town Gym',
    leader: 'Bugsy',
    location: 'Azalea Town',
    specialty: 'Bug-type',
    specialtyType: 'bug',
    team: [
      { name: 'Metapod', apiName: 'metapod', level: 14, moves: ['Tackle', 'String Shot', 'Harden'] },
      { name: 'Kakuna', apiName: 'kakuna', level: 14, moves: ['Poison Sting', 'String Shot', 'Harden'] },
      { name: 'Scyther', apiName: 'scyther', level: 16, moves: ['Quick Attack', 'Leer', 'Fury Cutter'] }
    ]
  },
  {
    number: 3,
    gymName: 'Goldenrod City Gym',
    leader: 'Whitney',
    location: 'Goldenrod City',
    specialty: 'Normal-type',
    specialtyType: 'normal',
    team: [
      { name: 'Clefairy', apiName: 'clefairy', level: 18, moves: ['Doubleslap', 'Mimic', 'Encore', 'Metronome'] },
      { name: 'Miltank', apiName: 'miltank', level: 20, moves: ['Rollout', 'Attract', 'Stomp', 'Milk Drink'] }
    ]
  },
  {
    number: 4,
    gymName: 'Ecruteak City Gym',
    leader: 'Morty',
    location: 'Ecruteak City',
    specialty: 'Ghost-type',
    specialtyType: 'ghost',
    team: [
      { name: 'Gastly', apiName: 'gastly', level: 21, moves: ['Lick', 'Spite', 'Mean Look', 'Curse'] },
      { name: 'Haunter', apiName: 'haunter', level: 21, moves: ['Hypnosis', 'Mimic', 'Curse', 'Night Shade'] },
      { name: 'Haunter', apiName: 'haunter', level: 23, moves: ['Spite', 'Mean Look', 'Mimic', 'Night Shade'] },
      { name: 'Gengar', apiName: 'gengar', level: 25, moves: ['Hypnosis', 'Shadow Ball', 'Mean Look', 'Dream Eater'] }
    ]
  },
  {
    number: 5,
    gymName: 'Cianwood City Gym',
    leader: 'Chuck',
    location: 'Cianwood City',
    specialty: 'Fighting-type',
    specialtyType: 'fighting',
    team: [
      { name: 'Primeape', apiName: 'primeape', level: 27, moves: ['Leer', 'Rage', 'Karate Chop', 'Fury Swipes'] },
      { name: 'Poliwrath', apiName: 'poliwrath', level: 30, moves: ['Hypnosis', 'Mind Reader', 'Surf', 'Dynamicpunch'] }
    ]
  },
  {
    number: 6,
    gymName: 'Olivine City Gym',
    leader: 'Jasmine',
    location: 'Olivine City',
    specialty: 'Steel-type',
    specialtyType: 'steel',
    team: [
      { name: 'Magnemite', apiName: 'magnemite', level: 30, moves: ['Thunderbolt', 'Supersonic', 'Sonicboom', 'Thunder Wave'] },
      { name: 'Magnemite', apiName: 'magnemite', level: 30, moves: ['Thunderbolt', 'Supersonic', 'Sonicboom', 'Thunder Wave'] },
      { name: 'Steelix', apiName: 'steelix', level: 35, moves: ['Screech', 'Sunny Day', 'Rock Throw', 'Iron Tail'] }
    ]
  },
  {
    number: 7,
    gymName: 'Mahogany Town Gym',
    leader: 'Pryce',
    location: 'Mahogany Town',
    specialty: 'Ice-type',
    specialtyType: 'ice',
    team: [
      { name: 'Seel', apiName: 'seel', level: 27, moves: ['Headbutt', 'Icy Wind', 'Aurora Beam', 'Rest'] },
      { name: 'Dewgong', apiName: 'dewgong', level: 29, moves: ['Headbutt', 'Icy Wind', 'Aurora Beam', 'Rest'] },
      { name: 'Piloswine', apiName: 'piloswine', level: 31, moves: ['Icy Wind', 'Fury Attack', 'Mist', 'Blizzard'] }
    ]
  },
  {
    number: 8,
    gymName: 'Blackthorn City Gym',
    leader: 'Clair',
    location: 'Blackthorn City',
    specialty: 'Dragon-type',
    specialtyType: 'dragon',
    team: [
      { name: 'Dragonair', apiName: 'dragonair', level: 37, moves: ['Thunder Wave', 'Surf', 'Slam', 'Dragonbreath'] },
      { name: 'Dragonair', apiName: 'dragonair', level: 37, moves: ['Thunder Wave', 'Thunderbolt', 'Slam', 'Dragonbreath'] },
      { name: 'Dragonair', apiName: 'dragonair', level: 37, moves: ['Thunder Wave', 'Ice Beam', 'Slam', 'Dragonbreath'] },
      { name: 'Kingdra', apiName: 'kingdra', level: 40, moves: ['Smokescreen', 'Surf', 'Hyper Beam', 'Dragonbreath'] }
    ]
  },
  {
    number: 9,
    gymName: 'Vermilion City Gym',
    leader: 'Lt. Surge',
    location: 'Vermilion City',
    specialty: 'Electric-type',
    specialtyType: 'electric',
    team: [
      { name: 'Raichu', apiName: 'raichu', level: 44, moves: ['Thunder Wave', 'Quick Attack', 'Thunderbolt', 'Thunder'] },
      { name: 'Electrode', apiName: 'electrode', level: 40, moves: ['Screech', 'Double Team', 'Swift', 'Explosion'] },
      { name: 'Electrode', apiName: 'electrode', level: 40, moves: ['Screech', 'Double Team', 'Swift', 'Explosion'] },
      { name: 'Magneton', apiName: 'magneton', level: 40, moves: ['Lock-On', 'Double Team', 'Swift', 'Zap Cannon'] },
      { name: 'Electabuzz', apiName: 'electabuzz', level: 45, moves: ['Quick Attack', 'Thunderpunch', 'Light Screen', 'Thunder'] }
    ]
  },
  {
    number: 10,
    gymName: 'Saffron City Gym',
    leader: 'Sabrina',
    location: 'Saffron City',
    specialty: 'Psychic-type',
    specialtyType: 'psychic',
    team: [
      { name: 'Espeon', apiName: 'espeon', level: 46, moves: ['Sand-Attack', 'Quick Attack', 'Swift', 'Psychic'] },
      { name: 'Mr. Mime', apiName: 'mr-mime', level: 46, moves: ['Barrier', 'Reflect', 'Baton Pass', 'Psychic'] },
      { name: 'Alakazam', apiName: 'alakazam', level: 48, moves: ['Recover', 'Future Sight', 'Psychic', 'Reflect'] }
    ]
  },
  {
    number: 11,
    gymName: 'Celadon City Gym',
    leader: 'Erika',
    location: 'Celadon City',
    specialty: 'Grass-type',
    specialtyType: 'grass',
    team: [
      { name: 'Tangela', apiName: 'tangela', level: 42, moves: ['Vine Whip', 'Bind', 'Giga Drain', 'Sleep Powder'] },
      { name: 'Jumpluff', apiName: 'jumpluff', level: 41, moves: ['Mega Drain', 'Leech Seed', 'Cotton Spore', 'Giga Drain'] },
      { name: 'Victreebel', apiName: 'victreebel', level: 46, moves: ['Sunny Day', 'Synthesis', 'Acid', 'Razor Leaf'] },
      { name: 'Bellossom', apiName: 'bellossom', level: 46, moves: ['Sunny Day', 'Synthesis', 'Petal Dance', 'Solarbeam'] }
    ]
  },
  {
    number: 12,
    gymName: 'Fuchsia City Gym',
    leader: 'Janine',
    location: 'Fuchsia City',
    specialty: 'Poison-type',
    specialtyType: 'poison',
    team: [
      { name: 'Crobat', apiName: 'crobat', level: 36, moves: ['Screech', 'Supersonic', 'Confuse Ray', 'Wing Attack'] },
      { name: 'Weezing', apiName: 'weezing', level: 36, moves: ['Smog', 'Sludge Bomb', 'Toxic', 'Explosion'] },
      { name: 'Weezing', apiName: 'weezing', level: 36, moves: ['Smog', 'Sludge Bomb', 'Toxic', 'Explosion'] },
      { name: 'Ariados', apiName: 'ariados', level: 33, moves: ['Scary Face', 'Giga Drain', 'String Shot', 'Night Shade'] },
      { name: 'Venomoth', apiName: 'venomoth', level: 39, moves: ['Foresight', 'Double Team', 'Gust', 'Psychic'] }
    ]
  },
  {
    number: 13,
    gymName: 'Cerulean City Gym',
    leader: 'Misty',
    location: 'Cerulean City',
    specialty: 'Water-type',
    specialtyType: 'water',
    team: [
      { name: 'Golduck', apiName: 'golduck', level: 42, moves: ['Surf', 'Disable', 'Psych Up', 'Psychic'] },
      { name: 'Quagsire', apiName: 'quagsire', level: 42, moves: ['Surf', 'Amnesia', 'Earthquake', 'Rain Dance'] },
      { name: 'Lapras', apiName: 'lapras', level: 44, moves: ['Surf', 'Perish Song', 'Blizzard', 'Rain Dance'] },
      { name: 'Starmie', apiName: 'starmie', level: 47, moves: ['Surf', 'Confuse Ray', 'Recover', 'Ice Beam'] }
    ]
  },
  {
    number: 14,
    gymName: 'Pewter City Gym',
    leader: 'Brock',
    location: 'Pewter City',
    specialty: 'Rock-type',
    specialtyType: 'rock',
    team: [
      { name: 'Graveler', apiName: 'graveler', level: 41, moves: ['Defense Curl', 'Rock Slide', 'Rollout', 'Earthquake'] },
      { name: 'Rhyhorn', apiName: 'rhyhorn', level: 41, moves: ['Fury Attack', 'Scary Face', 'Earthquake', 'Horn Drill'] },
      { name: 'Omastar', apiName: 'omastar', level: 42, moves: ['Bite', 'Surf', 'Protect', 'Spike Cannon'] },
      { name: 'Onix', apiName: 'onix', level: 44, moves: ['Bind', 'Rock Slide', 'Bide', 'Sandstorm'] },
      { name: 'Kabutops', apiName: 'kabutops', level: 42, moves: ['Slash', 'Surf', 'Endure', 'Giga Drain'] }
    ]
  },
  {
    number: 15,
    gymName: 'Seafoam Islands Gym',
    leader: 'Blaine',
    location: 'Seafoam Islands',
    specialty: 'Fire-type',
    specialtyType: 'fire',
    team: [
      { name: 'Magcargo', apiName: 'magcargo', level: 45, moves: ['Curse', 'Smog', 'Flamethrower', 'Rock Slide'] },
      { name: 'Magmar', apiName: 'magmar', level: 45, moves: ['Thunderpunch', 'Fire Punch', 'Sunny Day', 'Confuse Ray'] },
      { name: 'Rapidash', apiName: 'rapidash', level: 50, moves: ['Quick Attack', 'Fire Spin', 'Fury Attack', 'Fire Blast'] }
    ]
  },
  {
    number: 16,
    gymName: 'Viridian City Gym',
    leader: 'Blue',
    location: 'Viridian City',
    specialty: 'None',
    specialtyType: 'unknown',
    team: [
      { name: 'Pidgeot', apiName: 'pidgeot', level: 56, moves: ['Quick Attack', 'Whirlwind', 'Wing Attack', 'Mirror Move'] },
      { name: 'Alakazam', apiName: 'alakazam', level: 54, moves: ['Disable', 'Recover', 'Psychic', 'Reflect'] },
      { name: 'Rhydon', apiName: 'rhydon', level: 56, moves: ['Fury Attack', 'Sandstorm', 'Rock Slide', 'Earthquake'] },
      { name: 'Gyarados', apiName: 'gyarados', level: 58, moves: ['Twister', 'Hydro Pump', 'Rain Dance', 'Hyper Beam'] },
      { name: 'Exeggutor', apiName: 'exeggutor', level: 58, moves: ['Sunny Day', 'Leech Seed', 'Egg Bomb', 'Solar Beam'] },
      { name: 'Arcanine', apiName: 'arcanine', level: 58, moves: ['Roar', 'Swift', 'Flamethrower', 'Extremespeed'] }
    ]
  }
]

const rubySapphireGyms = [
  {
    number: 1,
    gymName: 'Rustboro City Gym',
    leader: 'Roxanne',
    location: 'Rustboro City',
    specialty: 'Rock-type',
    specialtyType: 'rock',
    team: [
      { name: 'Geodude', apiName: 'geodude', level: 14, moves: [] },
      { name: 'Nosepass', apiName: 'nosepass', level: 15, moves: [] }
    ]
  },
  {
    number: 2,
    gymName: 'Dewford Town Gym',
    leader: 'Brawly',
    location: 'Dewford Town',
    specialty: 'Fighting-type',
    specialtyType: 'fighting',
    team: [
      { name: 'Machop', apiName: 'machop', level: 17, moves: [] },
      { name: 'Makuhita', apiName: 'makuhita', level: 18, moves: [] }
    ]
  },
  {
    number: 3,
    gymName: 'Mauville City Gym',
    leader: 'Wattson',
    location: 'Mauville City',
    specialty: 'Electric-type',
    specialtyType: 'electric',
    team: [
      { name: 'Magnemite', apiName: 'magnemite', level: 22, moves: [] },
      { name: 'Voltorb', apiName: 'voltorb', level: 20, moves: [] },
      { name: 'Magneton', apiName: 'magneton', level: 23, moves: [] }
    ]
  },
  {
    number: 4,
    gymName: 'Lavaridge Town Gym',
    leader: 'Flannery',
    location: 'Lavaridge Town',
    specialty: 'Fire-type',
    specialtyType: 'fire',
    team: [
      { name: 'Slugma', apiName: 'slugma', level: 26, moves: [] },
      { name: 'Slugma', apiName: 'slugma', level: 26, moves: [] },
      { name: 'Torkoal', apiName: 'torkoal', level: 28, moves: [] }
    ]
  },
  {
    number: 5,
    gymName: 'Petalburg City Gym',
    leader: 'Norman',
    location: 'Petalburg City',
    specialty: 'Normal-type',
    specialtyType: 'normal',
    team: [
      { name: 'Slaking', apiName: 'slaking', level: 28, moves: [] },
      { name: 'Vigoroth', apiName: 'vigoroth', level: 30, moves: [] },
      { name: 'Slaking', apiName: 'slaking', level: 31, moves: [] }
    ]
  },
  {
    number: 6,
    gymName: 'Fortree City Gym',
    leader: 'Winona',
    location: 'Fortree City',
    specialty: 'Flying-type',
    specialtyType: 'flying',
    team: [
      { name: 'Swellow', apiName: 'swellow', level: 31, moves: [] },
      { name: 'Pelipper', apiName: 'pelipper', level: 30, moves: [] },
      { name: 'Skarmory', apiName: 'skarmory', level: 32, moves: [] },
      { name: 'Altaria', apiName: 'altaria', level: 33, moves: [] }
    ]
  },
  {
    number: 7,
    gymName: 'Mossdeep City Gym',
    leader: 'Tate & Liza',
    location: 'Mossdeep City',
    specialty: 'Psychic-type',
    specialtyType: 'psychic',
    team: [
      { name: 'Solrock', apiName: 'solrock', level: 42, moves: [] },
      { name: 'Lunatone', apiName: 'lunatone', level: 42, moves: [] }
    ],
    battleType: 'Double Battle'
  },
  {
    number: 8,
    gymName: 'Sootopolis City Gym',
    leader: 'Wallace',
    location: 'Sootopolis City',
    specialty: 'Water-type',
    specialtyType: 'water',
    team: [
      { name: 'Luvdisc', apiName: 'luvdisc', level: 40, moves: [] },
      { name: 'Whiscash', apiName: 'whiscash', level: 42, moves: [] },
      { name: 'Sealeo', apiName: 'sealeo', level: 40, moves: [] },
      { name: 'Seaking', apiName: 'seaking', level: 42, moves: [] },
      { name: 'Milotic', apiName: 'milotic', level: 43, moves: [] }
    ]
  }
]

const fireRedLeafGreenGyms = [
  {
    number: 1,
    gymName: 'Pewter City Gym',
    leader: 'Brock',
    location: 'Pewter City',
    specialty: 'Rock-type',
    specialtyType: 'rock',
    team: [
      { name: 'Geodude', apiName: 'geodude', level: 12, moves: [] },
      { name: 'Onix', apiName: 'onix', level: 14, moves: [] }
    ]
  },
  {
    number: 2,
    gymName: 'Cerulean City Gym',
    leader: 'Misty',
    location: 'Cerulean City',
    specialty: 'Water-type',
    specialtyType: 'water',
    team: [
      { name: 'Staryu', apiName: 'staryu', level: 18, moves: [] },
      { name: 'Starmie', apiName: 'starmie', level: 21, moves: [] }
    ]
  },
  {
    number: 3,
    gymName: 'Vermilion City Gym',
    leader: 'Lt. Surge',
    location: 'Vermilion City',
    specialty: 'Electric-type',
    specialtyType: 'electric',
    team: [
      { name: 'Voltorb', apiName: 'voltorb', level: 21, moves: [] },
      { name: 'Pikachu', apiName: 'pikachu', level: 18, moves: [] },
      { name: 'Raichu', apiName: 'raichu', level: 24, moves: [] }
    ]
  },
  {
    number: 4,
    gymName: 'Celadon City Gym',
    leader: 'Erika',
    location: 'Celadon City',
    specialty: 'Grass-type',
    specialtyType: 'grass',
    team: [
      { name: 'Victreebel', apiName: 'victreebel', level: 29, moves: [] },
      { name: 'Tangela', apiName: 'tangela', level: 24, moves: [] },
      { name: 'Vileplume', apiName: 'vileplume', level: 29, moves: [] }
    ]
  },
  {
    number: 5,
    gymName: 'Fuchsia City Gym',
    leader: 'Koga',
    location: 'Fuchsia City',
    specialty: 'Poison-type',
    specialtyType: 'poison',
    team: [
      { name: 'Koffing', apiName: 'koffing', level: 37, moves: [] },
      { name: 'Muk', apiName: 'muk', level: 39, moves: [] },
      { name: 'Koffing', apiName: 'koffing', level: 37, moves: [] },
      { name: 'Weezing', apiName: 'weezing', level: 43, moves: [] }
    ]
  },
  {
    number: 6,
    gymName: 'Saffron City Gym',
    leader: 'Sabrina',
    location: 'Saffron City',
    specialty: 'Psychic-type',
    specialtyType: 'psychic',
    team: [
      { name: 'Kadabra', apiName: 'kadabra', level: 38, moves: [] },
      { name: 'Mr. Mime', apiName: 'mr-mime', level: 37, moves: [] },
      { name: 'Venomoth', apiName: 'venomoth', level: 38, moves: [] },
      { name: 'Alakazam', apiName: 'alakazam', level: 43, moves: [] }
    ]
  },
  {
    number: 7,
    gymName: 'Cinnabar Island Gym',
    leader: 'Blaine',
    location: 'Cinnabar Island',
    specialty: 'Fire-type',
    specialtyType: 'fire',
    team: [
      { name: 'Growlithe', apiName: 'growlithe', level: 42, moves: [] },
      { name: 'Ponyta', apiName: 'ponyta', level: 40, moves: [] },
      { name: 'Rapidash', apiName: 'rapidash', level: 42, moves: [] },
      { name: 'Arcanine', apiName: 'arcanine', level: 47, moves: [] }
    ]
  },
  {
    number: 8,
    gymName: 'Viridian City Gym',
    leader: 'Giovanni',
    location: 'Viridian City',
    specialty: 'Ground-type',
    specialtyType: 'ground',
    team: [
      { name: 'Rhyhorn', apiName: 'rhyhorn', level: 45, moves: [] },
      { name: 'Dugtrio', apiName: 'dugtrio', level: 42, moves: [] },
      { name: 'Nidoqueen', apiName: 'nidoqueen', level: 44, moves: [] },
      { name: 'Nidoking', apiName: 'nidoking', level: 45, moves: [] },
      { name: 'Rhyhorn', apiName: 'rhyhorn', level: 50, moves: [] }
    ]
  }
]

const emeraldGyms = [
  {
    number: 1,
    gymName: 'Rustboro City Gym',
    leader: 'Roxanne',
    location: 'Rustboro City',
    specialty: 'Rock-type',
    specialtyType: 'rock',
    team: [
      { name: 'Geodude', apiName: 'geodude', level: 12, moves: ['Tackle', 'Defense Curl', 'Rock Throw', 'Rock Tomb'] },
      { name: 'Geodude', apiName: 'geodude', level: 12, moves: ['Tackle', 'Defense Curl', 'Rock Throw', 'Rock Tomb'] },
      { name: 'Nosepass', apiName: 'nosepass', level: 15, moves: ['Block', 'Harden', 'Tackle', 'Rock Tomb'] }
    ]
  },
  {
    number: 2,
    gymName: 'Dewford Town Gym',
    leader: 'Brawly',
    location: 'Dewford Town',
    specialty: 'Fighting-type',
    specialtyType: 'fighting',
    team: [
      { name: 'Machop', apiName: 'machop', level: 16, moves: ['Karate Chop', 'Low Kick', 'Seismic Toss', 'Bulk Up'] },
      { name: 'Meditite', apiName: 'meditite', level: 16, moves: ['Focus Punch', 'Light Screen', 'Reflect', 'Bulk Up'] },
      { name: 'Makuhita', apiName: 'makuhita', level: 19, moves: ['Arm Thrust', 'Vital Throw', 'Reversal', 'Bulk Up'] }
    ]
  },
  {
    number: 3,
    gymName: 'Mauville City Gym',
    leader: 'Wattson',
    location: 'Mauville City',
    specialty: 'Electric-type',
    specialtyType: 'electric',
    team: [
      { name: 'Voltorb', apiName: 'voltorb', level: 20, moves: ['Rollout', 'Spark', 'Self-Destruct', 'Shock Wave'] },
      { name: 'Electrike', apiName: 'electrike', level: 20, moves: ['Shock Wave', 'Leer', 'Quick Attack', 'Howl'] },
      { name: 'Magneton', apiName: 'magneton', level: 22, moves: ['Supersonic', 'Shock Wave', 'Thunder Wave', 'Sonic Boom'] },
      { name: 'Manectric', apiName: 'manectric', level: 24, moves: ['Quick Attack', 'Thunder Wave', 'Shock Wave', 'Howl'] }
    ]
  },
  {
    number: 4,
    gymName: 'Lavaridge Town Gym',
    leader: 'Flannery',
    location: 'Lavaridge Town',
    specialty: 'Fire-type',
    specialtyType: 'fire',
    team: [
      { name: 'Numel', apiName: 'numel', level: 24, moves: ['Overheat', 'Take Down', 'Magnitude', 'Sunny Day'] },
      { name: 'Slugma', apiName: 'slugma', level: 24, moves: ['Overheat', 'Smog', 'Light Screen', 'Sunny Day'] },
      { name: 'Camerupt', apiName: 'camerupt', level: 26, moves: ['Overheat', 'Tackle', 'Sunny Day', 'Attract'] },
      { name: 'Torkoal', apiName: 'torkoal', level: 29, moves: ['Overheat', 'Sunny Day', 'Body Slam', 'Attract'] }
    ]
  },
  {
    number: 5,
    gymName: 'Petalburg City Gym',
    leader: 'Norman',
    location: 'Petalburg City',
    specialty: 'Normal-type',
    specialtyType: 'normal',
    team: [
      { name: 'Spinda', apiName: 'spinda', level: 27, moves: ['Teeter Dance', 'Psybeam', 'Facade', 'Encore'] },
      { name: 'Vigoroth', apiName: 'vigoroth', level: 27, moves: ['Slash', 'Facade', 'Encore', 'Feint Attack'] },
      { name: 'Linoone', apiName: 'linoone', level: 29, moves: ['Slash', 'Belly Drum', 'Facade', 'Headbutt'] },
      { name: 'Slaking', apiName: 'slaking', level: 31, moves: ['Counter', 'Yawn', 'Facade', 'Feint Attack'] }
    ]
  },
  {
    number: 6,
    gymName: 'Fortree City Gym',
    leader: 'Winona',
    location: 'Fortree City',
    specialty: 'Flying-type',
    specialtyType: 'flying',
    team: [
      { name: 'Swablu', apiName: 'swablu', level: 29, moves: ['Perish Song', 'Mirror Move', 'Safeguard', 'Aerial Ace'] },
      { name: 'Tropius', apiName: 'tropius', level: 29, moves: ['Sunny Day', 'Aerial Ace', 'Solar Beam', 'Synthesis'] },
      { name: 'Pelipper', apiName: 'pelipper', level: 30, moves: ['Water Gun', 'Supersonic', 'Protect', 'Aerial Ace'] },
      { name: 'Skarmory', apiName: 'skarmory', level: 31, moves: ['Sand Attack', 'Fury Attack', 'Steel Wing', 'Aerial Ace'] },
      { name: 'Altaria', apiName: 'altaria', level: 33, moves: ['Earthquake', 'Dragon Breath', 'Dragon Dance', 'Aerial Ace'] }
    ]
  },
  {
    number: 7,
    gymName: 'Mossdeep City Gym',
    leader: 'Tate & Liza',
    location: 'Mossdeep City',
    specialty: 'Psychic-type',
    specialtyType: 'psychic',
    battleType: 'Double Battle',
    team: [
      { name: 'Claydol', apiName: 'claydol', level: 41, moves: ['Earthquake', 'Ancient Power', 'Psychic', 'Light Screen'] },
      { name: 'Xatu', apiName: 'xatu', level: 41, moves: ['Psychic', 'Sunny Day', 'Confuse Ray', 'Calm Mind'] },
      { name: 'Lunatone', apiName: 'lunatone', level: 42, moves: ['Light Screen', 'Psychic', 'Hypnosis', 'Calm Mind'] },
      { name: 'Solrock', apiName: 'solrock', level: 42, moves: ['Sunny Day', 'Solar Beam', 'Psychic', 'Flamethrower'] }
    ]
  },
  {
    number: 8,
    gymName: 'Sootopolis City Gym',
    leader: 'Juan',
    location: 'Sootopolis City',
    specialty: 'Water-type',
    specialtyType: 'water',
    team: [
      { name: 'Luvdisc', apiName: 'luvdisc', level: 41, moves: ['Water Pulse', 'Attract', 'Sweet Kiss', 'Flail'] },
      { name: 'Whiscash', apiName: 'whiscash', level: 41, moves: ['Rain Dance', 'Water Pulse', 'Amnesia', 'Earthquake'] },
      { name: 'Sealeo', apiName: 'sealeo', level: 43, moves: ['Encore', 'Body Slam', 'Aurora Beam', 'Water Pulse'] },
      { name: 'Crawdaunt', apiName: 'crawdaunt', level: 43, moves: ['Water Pulse', 'Crabhammer', 'Taunt', 'Leer'] },
      { name: 'Kingdra', apiName: 'kingdra', level: 46, moves: ['Water Pulse', 'Double Team', 'Ice Beam', 'Rest'] }
    ]
  }
]

const diamondPearlGyms = [
  {
    number: 1,
    gymName: 'Oreburgh City Gym',
    leader: 'Roark',
    location: 'Oreburgh City',
    specialty: 'Rock-type',
    specialtyType: 'rock',
    team: [
      { name: 'Geodude', apiName: 'geodude', level: 12, moves: ['Rock Throw', 'Screech', 'Stealth Rock'] },
      { name: 'Onix', apiName: 'onix', level: 12, moves: ['Rock Throw', 'Screech', 'Stealth Rock'] },
      { name: 'Cranidos', apiName: 'cranidos', level: 12, moves: ['Rock Throw', 'Screech', 'Stealth Rock'] }
    ]
  },
  {
    number: 2,
    gymName: 'Eterna City Gym',
    leader: 'Gardenia',
    location: 'Eterna City',
    specialty: 'Grass-type',
    specialtyType: 'grass',
    team: [
      { name: 'Cherubi', apiName: 'cherubi', level: 19, moves: ['Grass Knot', 'Leech Seed', 'Safeguard', 'Growth'] },
      { name: 'Turtwig', apiName: 'turtwig', level: 19, moves: ['Grass Knot', 'Razor Leaf', 'Withdraw', 'Reflect'] },
      { name: 'Roserade', apiName: 'roserade', level: 22, moves: ['Grass Knot', 'Magical Leaf', 'Poison Sting', 'Stun Spore'] }
    ]
  },
  {
    number: 3,
    gymName: 'Veilstone City Gym',
    leader: 'Maylene',
    location: 'Veilstone City',
    specialty: 'Fighting-type',
    specialtyType: 'fighting',
    team: [
      { name: 'Meditite', apiName: 'meditite', level: 27, moves: ['Drain Punch', 'Confusion', 'Meditate', 'Detect'] },
      { name: 'Machoke', apiName: 'machoke', level: 27, moves: ['Brick Break', 'Rock Tomb', 'Foresight', 'Leer'] },
      { name: 'Lucario', apiName: 'lucario', level: 30, moves: ['Drain Punch', 'Force Palm', 'Metal Claw', 'Bone Rush'] }
    ]
  },
  {
    number: 4,
    gymName: 'Pastoria City Gym',
    leader: 'Crasher Wake',
    location: 'Pastoria City',
    specialty: 'Water-type',
    specialtyType: 'water',
    team: [
      { name: 'Gyarados', apiName: 'gyarados', level: 27, moves: ['Brine', 'Bite', 'Dragon Rage', 'Swagger'] },
      { name: 'Quagsire', apiName: 'quagsire', level: 27, moves: ['Slam', 'Mud Bomb', 'Mud Sport', 'Tail Whip'] },
      { name: 'Floatzel', apiName: 'floatzel', level: 30, moves: ['Brine', 'Ice Fang', 'Pursuit', 'Swift'] }
    ]
  },
  {
    number: 5,
    gymName: 'Hearthome City Gym',
    leader: 'Fantina',
    location: 'Hearthome City',
    specialty: 'Ghost-type',
    specialtyType: 'ghost',
    team: [
      { name: 'Drifblim', apiName: 'drifblim', level: 32, moves: ['Ominous Wind', 'Gust', 'Astonish', 'Minimize'] },
      { name: 'Gengar', apiName: 'gengar', level: 34, moves: ['Shadow Claw', 'Poison Jab', 'Confuse Ray', 'Spite'] },
      { name: 'Mismagius', apiName: 'mismagius', level: 34, moves: ['Shadow Ball', 'Psybeam', 'Magical Leaf', 'Confuse Ray'] }
    ]
  },
  {
    number: 6,
    gymName: 'Canalave City Gym',
    leader: 'Byron',
    location: 'Canalave City',
    specialty: 'Steel-type',
    specialtyType: 'steel',
    team: [
      { name: 'Bronzor', apiName: 'bronzor', level: 36, moves: ['Flash Cannon', 'Extrasensory', 'Confuse Ray', 'Hypnosis'] },
      { name: 'Steelix', apiName: 'steelix', level: 36, moves: ['Gyro Ball', 'Ice Fang', 'Dragonbreath', 'Sandstorm'] },
      { name: 'Bastiodon', apiName: 'bastiodon', level: 39, moves: ['Flash Cannon', 'Ancient Power', 'Iron Defense', 'Rest'] }
    ]
  },
  {
    number: 7,
    gymName: 'Snowpoint City Gym',
    leader: 'Candice',
    location: 'Snowpoint City',
    specialty: 'Ice-type',
    specialtyType: 'ice',
    team: [
      { name: 'Snover', apiName: 'snover', level: 38, moves: ['Ice Shard', 'Razor Leaf', 'Leer', 'Ingrain'] },
      { name: 'Sneasel', apiName: 'sneasel', level: 38, moves: ['Avalanche', 'Faint Attack', 'Slash', 'Taunt'] },
      { name: 'Medicham', apiName: 'medicham', level: 40, moves: ['Ice Punch', 'Force Palm', 'Bulk Up', 'Detect'] },
      { name: 'Abomasnow', apiName: 'abomasnow', level: 42, moves: ['Avalanche', 'Wood Hammer', 'Swagger', 'Grass Whistle'] }
    ]
  },
  {
    number: 8,
    gymName: 'Sunyshore City Gym',
    leader: 'Volkner',
    location: 'Sunyshore City',
    specialty: 'Electric-type',
    specialtyType: 'electric',
    team: [
      { name: 'Raichu', apiName: 'raichu', level: 46, moves: ['Charge Beam', 'Brick Break', 'Light Screen', 'Thunder Wave'] },
      { name: 'Ambipom', apiName: 'ambipom', level: 48, moves: ['Shock Wave', 'Nasty Plot', 'Agility', 'Baton Pass'] },
      { name: 'Octillery', apiName: 'octillery', level: 48, moves: ['Charge Beam', 'Octazooka', 'Aurora Beam', 'Bullet Seed'] },
      { name: 'Luxray', apiName: 'luxray', level: 49, moves: ['Charge Beam', 'Thunder Wave', 'Thunder Fang', 'Crunch'] }
    ]
  }
]

const heartGoldSoulSilverGyms = [
  {
    number: 1,
    gymName: 'Violet City Gym',
    leader: 'Falkner',
    location: 'Violet City',
    specialty: 'Flying-type',
    specialtyType: 'flying',
    team: [
      { name: 'Pidgey', apiName: 'pidgey', level: 9, moves: ['Tackle', 'Sand Attack'] },
      { name: 'Pidgeotto', apiName: 'pidgeotto', level: 13, moves: ['Tackle', 'Roost', 'Gust'] }
    ]
  },
  {
    number: 2,
    gymName: 'Azalea Town Gym',
    leader: 'Bugsy',
    location: 'Azalea Town',
    specialty: 'Bug-type',
    specialtyType: 'bug',
    team: [
      { name: 'Scyther', apiName: 'scyther', level: 17, moves: ['U-Turn', 'Leer', 'Quick Attack', 'Focus Energy'] },
      { name: 'Metapod', apiName: 'metapod', level: 15, moves: ['Harden'] },
      { name: 'Kakuna', apiName: 'kakuna', level: 15, moves: ['Poison Sting'] }
    ]
  },
  {
    number: 3,
    gymName: 'Goldenrod City Gym',
    leader: 'Whitney',
    location: 'Goldenrod City',
    specialty: 'Normal-type',
    specialtyType: 'normal',
    team: [
      { name: 'Clefairy', apiName: 'clefairy', level: 17, moves: ['Encore', 'DoubleSlap', 'Mimic', 'Metronome'] },
      { name: 'Miltank', apiName: 'miltank', level: 19, moves: ['Rollout', 'Attract', 'Stomp', 'Milk Drink'] }
    ]
  },
  {
    number: 4,
    gymName: 'Ecruteak City Gym',
    leader: 'Morty',
    location: 'Ecruteak City',
    specialty: 'Ghost-type',
    specialtyType: 'ghost',
    team: [
      { name: 'Gastly', apiName: 'gastly', level: 21, moves: ['Lick', 'Spite', 'Mean Look', 'Curse'] },
      { name: 'Haunter', apiName: 'haunter', level: 21, moves: ['Hypnosis', 'Dream Eater', 'Curse', 'Nightmare'] },
      { name: 'Haunter', apiName: 'haunter', level: 23, moves: ['Sucker Punch', 'Curse', 'Mean Look', 'Night Shade'] },
      { name: 'Gengar', apiName: 'gengar', level: 25, moves: ['Shadow Ball', 'Hypnosis', 'Sucker Punch', 'Mean Look'] }
    ]
  },
  {
    number: 5,
    gymName: 'Cianwood City Gym',
    leader: 'Chuck',
    location: 'Cianwood City',
    specialty: 'Fighting-type',
    specialtyType: 'fighting',
    team: [
      { name: 'Primeape', apiName: 'primeape', level: 29, moves: ['Leer', 'Focus Punch', 'Double Team', 'Rock Slide'] },
      { name: 'Poliwrath', apiName: 'poliwrath', level: 31, moves: ['Body Slam', 'Surf', 'Focus Punch', 'Hypnosis'] }
    ]
  },
  {
    number: 6,
    gymName: 'Olivine City Gym',
    leader: 'Jasmine',
    location: 'Olivine City',
    specialty: 'Steel-type',
    specialtyType: 'steel',
    team: [
      { name: 'Magnemite', apiName: 'magnemite', level: 30, moves: ['Thunderbolt', 'SonicBoom', 'Supersonic', 'Thunder Wave'] },
      { name: 'Magnemite', apiName: 'magnemite', level: 30, moves: ['Thunderbolt', 'SonicBoom', 'Supersonic', 'Thunder Wave'] },
      { name: 'Steelix', apiName: 'steelix', level: 35, moves: ['Sandstorm', 'Screech', 'Rock Throw', 'Iron Tail'] }
    ]
  },
  {
    number: 7,
    gymName: 'Mahogany Town Gym',
    leader: 'Pryce',
    location: 'Mahogany Town',
    specialty: 'Ice-type',
    specialtyType: 'ice',
    team: [
      { name: 'Seel', apiName: 'seel', level: 30, moves: ['Snore', 'Icy Wind', 'Rest', 'Hail'] },
      { name: 'Dewgong', apiName: 'dewgong', level: 32, moves: ['Sleep Talk', 'Aurora Beam', 'Ice Shard', 'Rest'] },
      { name: 'Piloswine', apiName: 'piloswine', level: 34, moves: ['Hail', 'Ice Fang', 'Mud Bomb', 'Blizzard'] }
    ]
  },
  {
    number: 8,
    gymName: 'Blackthorn City Gym',
    leader: 'Clair',
    location: 'Blackthorn City',
    specialty: 'Dragon-type',
    specialtyType: 'dragon',
    team: [
      { name: 'Gyarados', apiName: 'gyarados', level: 38, moves: ['Twister', 'Dragon Rage', 'Dragon Pulse', 'Bite'] },
      { name: 'Dragonair', apiName: 'dragonair', level: 38, moves: ['Thunder Wave', 'Fire Blast', 'Slam', 'Dragon Pulse'] },
      { name: 'Dragonair', apiName: 'dragonair', level: 38, moves: ['Thunder Wave', 'Aqua Tail', 'Slam', 'Dragon Pulse'] },
      { name: 'Kingdra', apiName: 'kingdra', level: 41, moves: ['Smokescreen', 'Hydro Pump', 'Hyper Beam', 'Dragon Pulse'] }
    ]
  },
  {
    number: 9,
    gymName: 'Pewter City Gym',
    leader: 'Brock',
    location: 'Pewter City',
    specialty: 'Rock-type',
    specialtyType: 'rock',
    team: [
      { name: 'Graveler', apiName: 'graveler', level: 51, moves: ['Defense Curl', 'Rock Slide', 'Rollout', 'Earthquake'] },
      { name: 'Rhyhorn', apiName: 'rhyhorn', level: 51, moves: ['Scary Face', 'Earthquake', 'Horn Drill', 'Sandstorm'] },
      { name: 'Omastar', apiName: 'omastar', level: 53, moves: ['AncientPower', 'Brine', 'Protect', 'Spike Cannon'] },
      { name: 'Onix', apiName: 'onix', level: 54, moves: ['Iron Tail', 'Rock Slide', 'Screech', 'Sandstorm'] },
      { name: 'Kabutops', apiName: 'kabutops', level: 52, moves: ['Rock Slide', 'Aqua Jet', 'Endure', 'Giga Drain'] }
    ]
  },
  {
    number: 10,
    gymName: 'Cerulean City Gym',
    leader: 'Misty',
    location: 'Cerulean City',
    specialty: 'Water-type',
    specialtyType: 'water',
    team: [
      { name: 'Golduck', apiName: 'golduck', level: 49, moves: ['Water Pulse', 'Disable', 'Psych Up', 'Psychic'] },
      { name: 'Quagsire', apiName: 'quagsire', level: 49, moves: ['Water Pulse', 'Amnesia', 'Earthquake', 'Rain Dance'] },
      { name: 'Lapras', apiName: 'lapras', level: 52, moves: ['Sing', 'Ice Beam', 'Body Slam', 'Water Pulse'] },
      { name: 'Starmie', apiName: 'starmie', level: 54, moves: ['Water Pulse', 'Recover', 'Ice Beam', 'Confuse Ray'] }
    ]
  },
  {
    number: 11,
    gymName: 'Vermilion City Gym',
    leader: 'Lt. Surge',
    location: 'Vermilion City',
    specialty: 'Electric-type',
    specialtyType: 'electric',
    team: [
      { name: 'Raichu', apiName: 'raichu', level: 51, moves: ['Thunder Wave', 'Quick Attack', 'Shock Wave', 'Double Team'] },
      { name: 'Electrode', apiName: 'electrode', level: 47, moves: ['Thunder Wave', 'Double Team', 'Shock Wave', 'Light Screen'] },
      { name: 'Electrode', apiName: 'electrode', level: 47, moves: ['Screech', 'Self-Destruct', 'Charge Beam', 'Double Team'] },
      { name: 'Magneton', apiName: 'magneton', level: 47, moves: ['Supersonic', 'Double Team', 'Shock Wave', 'Mirror Shot'] },
      { name: 'Electabuzz', apiName: 'electabuzz', level: 53, moves: ['Quick Attack', 'Shock Wave', 'Low Kick', 'Light Screen'] }
    ]
  },
  {
    number: 12,
    gymName: 'Celadon City Gym',
    leader: 'Erika',
    location: 'Celadon City',
    specialty: 'Grass-type',
    specialtyType: 'grass',
    team: [
      { name: 'Jumpluff', apiName: 'jumpluff', level: 51, moves: ['U-Turn', 'Leech Seed', 'Sunny Day', 'Giga Drain'] },
      { name: 'Victreebel', apiName: 'victreebel', level: 56, moves: ['Sunny Day', 'Synthesis', 'Grass Knot', 'Leaf Storm'] },
      { name: 'Tangela', apiName: 'tangela', level: 52, moves: ['AncientPower', 'Wring Out', 'Giga Drain', 'Sleep Powder'] },
      { name: 'Bellossom', apiName: 'bellossom', level: 56, moves: ['Sunny Day', 'Synthesis', 'Giga Drain', 'SolarBeam'] }
    ]
  },
  {
    number: 13,
    gymName: 'Fuchsia City Gym',
    leader: 'Janine',
    location: 'Fuchsia City',
    specialty: 'Poison-type',
    specialtyType: 'poison',
    team: [
      { name: 'Crobat', apiName: 'crobat', level: 47, moves: ['Screech', 'Supersonic', 'Confuse Ray', 'Wing Attack'] },
      { name: 'Weezing', apiName: 'weezing', level: 44, moves: ['Double Hit', 'Sludge Bomb', 'Toxic', 'Explosion'] },
      { name: 'Ariados', apiName: 'ariados', level: 47, moves: ['Scary Face', 'Poison Jab', 'Pin Missile', 'Psychic'] },
      { name: 'Ariados', apiName: 'ariados', level: 47, moves: ['Pin Missile', 'Poison Jab', 'Swagger', 'Night Shade'] },
      { name: 'Venomoth', apiName: 'venomoth', level: 50, moves: ['Sludge Bomb', 'Double Team', 'Signal Beam', 'Psychic'] }
    ]
  },
  {
    number: 14,
    gymName: 'Saffron City Gym',
    leader: 'Sabrina',
    location: 'Saffron City',
    specialty: 'Psychic-type',
    specialtyType: 'psychic',
    team: [
      { name: 'Espeon', apiName: 'espeon', level: 53, moves: ['Shadow Ball', 'Skill Swap', 'Calm Mind', 'Psychic'] },
      { name: 'Mr. Mime', apiName: 'mr-mime', level: 53, moves: ['Mimic', 'Light Screen', 'Skill Swap', 'Psychic'] },
      { name: 'Alakazam', apiName: 'alakazam', level: 55, moves: ['Skill Swap', 'Psychic', 'Energy Ball', 'Reflect'] }
    ]
  },
  {
    number: 15,
    gymName: 'Seafoam Islands Gym',
    leader: 'Blaine',
    location: 'Seafoam Islands',
    specialty: 'Fire-type',
    specialtyType: 'fire',
    team: [
      { name: 'Magcargo', apiName: 'magcargo', level: 54, moves: ['Sunny Day', 'Smog', 'Overheat', 'Rock Slide'] },
      { name: 'Magmar', apiName: 'magmar', level: 54, moves: ['Thunderpunch', 'Overheat', 'Sunny Day', 'Confuse Ray'] },
      { name: 'Rapidash', apiName: 'rapidash', level: 59, moves: ['Quick Attack', 'Bounce', 'Overheat', 'Flare Blitz'] }
    ]
  },
  {
    number: 16,
    gymName: 'Viridian City Gym',
    leader: 'Blue',
    location: 'Viridian City',
    specialty: 'Mixed-type',
    specialtyType: 'unknown',
    team: [
      { name: 'Pidgeot', apiName: 'pidgeot', level: 60, moves: ['Return', 'Whirlwind', 'Air Slash', 'Mirror Move'] },
      { name: 'Rhydon', apiName: 'rhydon', level: 58, moves: ['Megahorn', 'Stone Edge', 'Earthquake', 'Thunder Fang'] },
      { name: 'Machamp', apiName: 'machamp', level: 56, moves: ['DynamicPunch', 'Earthquake', 'Thunderpunch', 'Stone Edge'] },
      { name: 'Gyarados', apiName: 'gyarados', level: 52, moves: ['Ice Fang', 'Dragon Dance', 'Waterfall', 'Return'] },
      { name: 'Exeggutor', apiName: 'exeggutor', level: 55, moves: ['Leaf Storm', 'Psychic', 'Hypnosis', 'Trick Room'] },
      { name: 'Arcanine', apiName: 'arcanine', level: 58, moves: ['Roar', 'Dragon Pulse', 'ExtremeSpeed', 'Flare Blitz'] }
    ]
  }
]

const platinumGyms = [
  {
    number: 1,
    gymName: 'Oreburgh City Gym',
    leader: 'Roark',
    location: 'Oreburgh City',
    specialty: 'Rock-type',
    specialtyType: 'rock',
    team: [
      { name: 'Geodude', apiName: 'geodude', level: 12, moves: ['Rock Throw', 'Stealth Rock'] },
      { name: 'Onix', apiName: 'onix', level: 12, moves: ['Rock Throw', 'Screech', 'Stealth Rock'] },
      { name: 'Cranidos', apiName: 'cranidos', level: 14, moves: ['Headbutt', 'Pursuit', 'Leer'] }
    ]
  },
  {
    number: 2,
    gymName: 'Eterna City Gym',
    leader: 'Gardenia',
    location: 'Eterna City',
    specialty: 'Grass-type',
    specialtyType: 'grass',
    team: [
      { name: 'Turtwig', apiName: 'turtwig', level: 20, moves: ['Grass Knot', 'Razor Leaf', 'Sunny Day', 'Reflect'] },
      { name: 'Cherrim', apiName: 'cherrim', level: 20, moves: ['Grass Knot', 'Magical Leaf', 'Leech Seed', 'Safeguard'] },
      { name: 'Roserade', apiName: 'roserade', level: 22, moves: ['Grass Knot', 'Magical Leaf', 'Poison Sting', 'Stun Spore'] }
    ]
  },
  {
    number: 3,
    gymName: 'Veilstone City Gym',
    leader: 'Maylene',
    location: 'Veilstone City',
    specialty: 'Fighting-type',
    specialtyType: 'fighting',
    team: [
      { name: 'Meditite', apiName: 'meditite', level: 28, moves: ['Drain Punch', 'Confusion', 'Fake Out', 'Rock Tomb'] },
      { name: 'Machoke', apiName: 'machoke', level: 29, moves: ['Karate Chop', 'Strength', 'Focus Energy', 'Rock Tomb'] },
      { name: 'Lucario', apiName: 'lucario', level: 32, moves: ['Drain Punch', 'Metal Claw', 'Bone Rush', 'Force Palm'] }
    ]
  },
  {
    number: 4,
    gymName: 'Pastoria City Gym',
    leader: 'Crasher Wake',
    location: 'Pastoria City',
    specialty: 'Water-type',
    specialtyType: 'water',
    team: [
      { name: 'Gyarados', apiName: 'gyarados', level: 33, moves: ['Brine', 'Waterfall', 'Bite', 'Twister'] },
      { name: 'Quagsire', apiName: 'quagsire', level: 34, moves: ['Water Pulse', 'Mud Shot', 'Rock Tomb', 'Yawn'] },
      { name: 'Floatzel', apiName: 'floatzel', level: 37, moves: ['Brine', 'Crunch', 'Ice Fang', 'Aqua Jet'] }
    ]
  },
  {
    number: 5,
    gymName: 'Hearthome City Gym',
    leader: 'Fantina',
    location: 'Hearthome City',
    specialty: 'Ghost-type',
    specialtyType: 'ghost',
    team: [
      { name: 'Duskull', apiName: 'duskull', level: 24, moves: ['Will-O-Wisp', 'Future Sight', 'Shadow Sneak', 'Pursuit'] },
      { name: 'Haunter', apiName: 'haunter', level: 24, moves: ['Shadow Claw', 'Sucker Punch', 'Confuse Ray', 'Hypnosis'] },
      { name: 'Mismagius', apiName: 'mismagius', level: 26, moves: ['Shadow Ball', 'Psybeam', 'Magical Leaf', 'Confuse Ray'] }
    ]
  },
  {
    number: 6,
    gymName: 'Canalave City Gym',
    leader: 'Byron',
    location: 'Canalave City',
    specialty: 'Steel-type',
    specialtyType: 'steel',
    team: [
      { name: 'Magnemite', apiName: 'magnemite', level: 37, moves: ['Flash Cannon', 'Thunderbolt', 'Tri Attack', 'Metal Sound'] },
      { name: 'Steelix', apiName: 'steelix', level: 38, moves: ['Flash Cannon', 'Earthquake', 'Ice Fang', 'Sandstorm'] },
      { name: 'Bastiodon', apiName: 'bastiodon', level: 41, moves: ['Metal Burst', 'Stone Edge', 'Iron Defense', 'Taunt'] }
    ]
  },
  {
    number: 7,
    gymName: 'Snowpoint City Gym',
    leader: 'Candice',
    location: 'Snowpoint City',
    specialty: 'Ice-type',
    specialtyType: 'ice',
    team: [
      { name: 'Sneasel', apiName: 'sneasel', level: 40, moves: ['Faint Attack', 'Ice Shard', 'Slash', 'Aerial Ace'] },
      { name: 'Piloswine', apiName: 'piloswine', level: 40, moves: ['Hail', 'Earthquake', 'Stone Edge', 'Avalanche'] },
      { name: 'Abomasnow', apiName: 'abomasnow', level: 42, moves: ['Wood Hammer', 'Focus Blast', 'Water Pulse', 'Avalanche'] },
      { name: 'Froslass', apiName: 'froslass', level: 44, moves: ['Shadow Ball', 'Double Team', 'Psychic', 'Blizzard'] }
    ]
  },
  {
    number: 8,
    gymName: 'Sunyshore City Gym',
    leader: 'Volkner',
    location: 'Sunyshore City',
    specialty: 'Electric-type',
    specialtyType: 'electric',
    team: [
      { name: 'Jolteon', apiName: 'jolteon', level: 46, moves: ['Charge Beam', 'Thunder Wave', 'Iron Tail', 'Quick Attack'] },
      { name: 'Raichu', apiName: 'raichu', level: 46, moves: ['Charge Beam', 'Signal Beam', 'Focus Blast', 'Quick Attack'] },
      { name: 'Luxray', apiName: 'luxray', level: 48, moves: ['Thunder Fang', 'Ice Fang', 'Fire Fang', 'Crunch'] },
      { name: 'Electivire', apiName: 'electivire', level: 50, moves: ['Thunder Punch', 'Fire Punch', 'Giga Impact', 'Quick Attack'] }
    ]
  }
]

const blackGyms = [
  {
    number: 1,
    gymName: 'Striaton City Gym • Snivy Chosen',
    leader: 'Chili',
    location: 'Striaton City',
    specialty: 'Fire-type',
    specialtyType: 'fire',
    team: [
      { name: 'Lillipup', apiName: 'lillipup', level: 12, moves: ['Bite', 'Work Up', 'Odor Sleuth', 'Helping Hand'] },
      { name: 'Pansear', apiName: 'pansear', level: 14, moves: ['Incinerate', 'Work Up', 'Lick', 'Fury Swipes'] }
    ]
  },
  {
    number: 1,
    gymName: 'Striaton City Gym • Oshawott Chosen',
    leader: 'Cilan',
    location: 'Striaton City',
    specialty: 'Grass-type',
    specialtyType: 'grass',
    team: [
      { name: 'Lillipup', apiName: 'lillipup', level: 12, moves: ['Bite', 'Work Up', 'Odor Sleuth', 'Helping Hand'] },
      { name: 'Pansage', apiName: 'pansage', level: 14, moves: ['Vine Whip', 'Work Up', 'Lick', 'Fury Swipes'] }
    ]
  },
  {
    number: 1,
    gymName: 'Striaton City Gym • Tepig Chosen',
    leader: 'Cress',
    location: 'Striaton City',
    specialty: 'Water-type',
    specialtyType: 'water',
    team: [
      { name: 'Lillipup', apiName: 'lillipup', level: 12, moves: ['Bite', 'Work Up', 'Odor Sleuth', 'Helping Hand'] },
      { name: 'Panpour', apiName: 'panpour', level: 14, moves: ['Water Gun', 'Work Up', 'Lick', 'Fury Swipes'] }
    ]
  },
  {
    number: 2,
    gymName: 'Nacrene City Gym',
    leader: 'Lenora',
    location: 'Nacrene City',
    specialty: 'Normal-type',
    specialtyType: 'normal',
    team: [
      { name: 'Herdier', apiName: 'herdier', level: 18, moves: ['Take Down', 'Bite', 'Retaliate', 'Leer'] },
      { name: 'Watchog', apiName: 'watchog', level: 20, moves: ['Leer', 'Crunch', 'Retaliate', 'Hypnosis'] }
    ]
  },
  {
    number: 3,
    gymName: 'Castelia City Gym',
    leader: 'Burgh',
    location: 'Castelia City',
    specialty: 'Bug-type',
    specialtyType: 'bug',
    team: [
      { name: 'Whirlipede', apiName: 'whirlipede', level: 21, moves: ['Poison Tail', 'Struggle Bug', 'Pursuit', 'Screech'] },
      { name: 'Dwebble', apiName: 'dwebble', level: 21, moves: ['Smack Down', 'Struggle Bug', 'Faint Attack', 'Sand Attack'] },
      { name: 'Leavanny', apiName: 'leavanny', level: 23, moves: ['Razor Leaf', 'Struggle Bug', 'String Shot', 'Protect'] }
    ]
  },
  {
    number: 4,
    gymName: 'Nimbasa City Gym',
    leader: 'Elesa',
    location: 'Nimbasa City',
    specialty: 'Electric-type',
    specialtyType: 'electric',
    team: [
      { name: 'Emolga', apiName: 'emolga', level: 25, moves: ['Pursuit', 'Quick Attack', 'Volt Switch', 'Aerial Ace'] },
      { name: 'Emolga', apiName: 'emolga', level: 25, moves: ['Pursuit', 'Quick Attack', 'Volt Switch', 'Aerial Ace'] },
      { name: 'Zebstrika', apiName: 'zebstrika', level: 27, moves: ['Quick Attack', 'Spark', 'Volt Switch', 'Flame Charge'] }
    ]
  },
  {
    number: 5,
    gymName: 'Driftveil City Gym',
    leader: 'Clay',
    location: 'Driftveil City',
    specialty: 'Ground-type',
    specialtyType: 'ground',
    team: [
      { name: 'Krokorok', apiName: 'krokorok', level: 29, moves: ['Crunch', 'Swagger', 'Bulldoze', 'Torment'] },
      { name: 'Palpitoad', apiName: 'palpitoad', level: 29, moves: ['Muddy Water', 'Aqua Ring', 'Bulldoze', 'Bubblebeam'] },
      { name: 'Excadrill', apiName: 'excadrill', level: 31, moves: ['Slash', 'Rock Slide', 'Bulldoze', 'Hone Claws'] }
    ]
  },
  {
    number: 6,
    gymName: 'Mistralton City Gym',
    leader: 'Skyla',
    location: 'Mistralton City',
    specialty: 'Flying-type',
    specialtyType: 'flying',
    team: [
      { name: 'Swoobat', apiName: 'swoobat', level: 33, moves: ['Heart Stamp', 'Amnesia', 'Acrobatics', 'Assurance'] },
      { name: 'Unfezant', apiName: 'unfezant', level: 33, moves: ['Quick Attack', 'Air Slash', 'Leer', 'Razor Wind'] },
      { name: 'Swanna', apiName: 'swanna', level: 35, moves: ['Aqua Ring', 'Aerial Ace', 'Air Slash', 'Bubblebeam'] }
    ]
  },
  {
    number: 7,
    gymName: 'Icirrus City Gym',
    leader: 'Brycen',
    location: 'Icirrus City',
    specialty: 'Ice-type',
    specialtyType: 'ice',
    team: [
      { name: 'Vanillish', apiName: 'vanillish', level: 37, moves: ['Mirror Shot', 'Acid Armor', 'Frost Breath', 'Astonish'] },
      { name: 'Cryogonal', apiName: 'cryogonal', level: 37, moves: ['Reflect', 'Aurora Beam', 'Frost Breath', 'Rapid Spin'] },
      { name: 'Beartic', apiName: 'beartic', level: 39, moves: ['Slash', 'Brine', 'Icicle Crash', 'Swagger'] }
    ]
  },
  {
    number: 8,
    gymName: 'Opelucid City Gym • Black',
    leader: 'Drayden',
    location: 'Opelucid City',
    specialty: 'Dragon-type',
    specialtyType: 'dragon',
    team: [
      { name: 'Fraxure', apiName: 'fraxure', level: 41, moves: ['Dragon Dance', 'Dragon Rage', 'Dragon Tail', 'Assurance'] },
      { name: 'Druddigon', apiName: 'druddigon', level: 41, moves: ['Chip Away', 'Revenge', 'Dragon Tail', 'Night Slash'] },
      { name: 'Haxorus', apiName: 'haxorus', level: 43, moves: ['Dragon Dance', 'Slash', 'Dragon Tail', 'Assurance'] }
    ]
  }
]

const whiteGyms = [
  {
    number: 1,
    gymName: 'Striaton City Gym • Snivy Chosen',
    leader: 'Chili',
    location: 'Striaton City',
    specialty: 'Fire-type',
    specialtyType: 'fire',
    team: [
      { name: 'Lillipup', apiName: 'lillipup', level: 12, moves: ['Bite', 'Work Up', 'Odor Sleuth', 'Helping Hand'] },
      { name: 'Pansear', apiName: 'pansear', level: 14, moves: ['Incinerate', 'Work Up', 'Lick', 'Fury Swipes'] }
    ]
  },
  {
    number: 1,
    gymName: 'Striaton City Gym • Oshawott Chosen',
    leader: 'Cilan',
    location: 'Striaton City',
    specialty: 'Grass-type',
    specialtyType: 'grass',
    team: [
      { name: 'Lillipup', apiName: 'lillipup', level: 12, moves: ['Bite', 'Work Up', 'Odor Sleuth', 'Helping Hand'] },
      { name: 'Pansage', apiName: 'pansage', level: 14, moves: ['Vine Whip', 'Work Up', 'Lick', 'Fury Swipes'] }
    ]
  },
  {
    number: 1,
    gymName: 'Striaton City Gym • Tepig Chosen',
    leader: 'Cress',
    location: 'Striaton City',
    specialty: 'Water-type',
    specialtyType: 'water',
    team: [
      { name: 'Lillipup', apiName: 'lillipup', level: 12, moves: ['Bite', 'Work Up', 'Odor Sleuth', 'Helping Hand'] },
      { name: 'Panpour', apiName: 'panpour', level: 14, moves: ['Water Gun', 'Work Up', 'Lick', 'Fury Swipes'] }
    ]
  },
  {
    number: 2,
    gymName: 'Nacrene City Gym',
    leader: 'Lenora',
    location: 'Nacrene City',
    specialty: 'Normal-type',
    specialtyType: 'normal',
    team: [
      { name: 'Herdier', apiName: 'herdier', level: 18, moves: ['Take Down', 'Bite', 'Retaliate', 'Leer'] },
      { name: 'Watchog', apiName: 'watchog', level: 20, moves: ['Leer', 'Crunch', 'Retaliate', 'Hypnosis'] }
    ]
  },
  {
    number: 3,
    gymName: 'Castelia City Gym',
    leader: 'Burgh',
    location: 'Castelia City',
    specialty: 'Bug-type',
    specialtyType: 'bug',
    team: [
      { name: 'Whirlipede', apiName: 'whirlipede', level: 21, moves: ['Poison Tail', 'Struggle Bug', 'Pursuit', 'Screech'] },
      { name: 'Dwebble', apiName: 'dwebble', level: 21, moves: ['Smack Down', 'Struggle Bug', 'Faint Attack', 'Sand Attack'] },
      { name: 'Leavanny', apiName: 'leavanny', level: 23, moves: ['Razor Leaf', 'Struggle Bug', 'String Shot', 'Protect'] }
    ]
  },
  {
    number: 4,
    gymName: 'Nimbasa City Gym',
    leader: 'Elesa',
    location: 'Nimbasa City',
    specialty: 'Electric-type',
    specialtyType: 'electric',
    team: [
      { name: 'Emolga', apiName: 'emolga', level: 25, moves: ['Pursuit', 'Quick Attack', 'Volt Switch', 'Aerial Ace'] },
      { name: 'Emolga', apiName: 'emolga', level: 25, moves: ['Pursuit', 'Quick Attack', 'Volt Switch', 'Aerial Ace'] },
      { name: 'Zebstrika', apiName: 'zebstrika', level: 27, moves: ['Quick Attack', 'Spark', 'Volt Switch', 'Flame Charge'] }
    ]
  },
  {
    number: 5,
    gymName: 'Driftveil City Gym',
    leader: 'Clay',
    location: 'Driftveil City',
    specialty: 'Ground-type',
    specialtyType: 'ground',
    team: [
      { name: 'Krokorok', apiName: 'krokorok', level: 29, moves: ['Crunch', 'Swagger', 'Bulldoze', 'Torment'] },
      { name: 'Palpitoad', apiName: 'palpitoad', level: 29, moves: ['Muddy Water', 'Aqua Ring', 'Bulldoze', 'Bubblebeam'] },
      { name: 'Excadrill', apiName: 'excadrill', level: 31, moves: ['Slash', 'Rock Slide', 'Bulldoze', 'Hone Claws'] }
    ]
  },
  {
    number: 6,
    gymName: 'Mistralton City Gym',
    leader: 'Skyla',
    location: 'Mistralton City',
    specialty: 'Flying-type',
    specialtyType: 'flying',
    team: [
      { name: 'Swoobat', apiName: 'swoobat', level: 33, moves: ['Heart Stamp', 'Amnesia', 'Acrobatics', 'Assurance'] },
      { name: 'Unfezant', apiName: 'unfezant', level: 33, moves: ['Quick Attack', 'Air Slash', 'Leer', 'Razor Wind'] },
      { name: 'Swanna', apiName: 'swanna', level: 35, moves: ['Aqua Ring', 'Aerial Ace', 'Air Slash', 'Bubblebeam'] }
    ]
  },
  {
    number: 7,
    gymName: 'Icirrus City Gym',
    leader: 'Brycen',
    location: 'Icirrus City',
    specialty: 'Ice-type',
    specialtyType: 'ice',
    team: [
      { name: 'Vanillish', apiName: 'vanillish', level: 37, moves: ['Mirror Shot', 'Acid Armor', 'Frost Breath', 'Astonish'] },
      { name: 'Cryogonal', apiName: 'cryogonal', level: 37, moves: ['Reflect', 'Aurora Beam', 'Frost Breath', 'Rapid Spin'] },
      { name: 'Beartic', apiName: 'beartic', level: 39, moves: ['Slash', 'Brine', 'Icicle Crash', 'Swagger'] }
    ]
  },
  {
    number: 8,
    gymName: 'Opelucid City Gym • White',
    leader: 'Iris',
    location: 'Opelucid City',
    specialty: 'Dragon-type',
    specialtyType: 'dragon',
    team: [
      { name: 'Fraxure', apiName: 'fraxure', level: 41, moves: ['Dragon Dance', 'Dragon Rage', 'Dragon Tail', 'Assurance'] },
      { name: 'Druddigon', apiName: 'druddigon', level: 41, moves: ['Chip Away', 'Revenge', 'Dragon Tail', 'Night Slash'] },
      { name: 'Haxorus', apiName: 'haxorus', level: 43, moves: ['Dragon Dance', 'Slash', 'Dragon Tail', 'Assurance'] }
    ]
  }
]

const xYGyms = [
  {
    number: 1,
    gymName: 'Santalune City Gym',
    leader: 'Viola',
    location: 'Santalune City',
    specialty: 'Bug-type',
    specialtyType: 'bug',
    team: [
      { name: 'Surskit', apiName: 'surskit', level: 10, moves: ['Bubble', 'Water Sport', 'Quick Attack'] },
      { name: 'Vivillon', apiName: 'vivillon', level: 12, moves: ['Harden', 'Tackle', 'Infestation'] }
    ]
  },
  {
    number: 2,
    gymName: 'Cyllage City Gym',
    leader: 'Grant',
    location: 'Cyllage City',
    specialty: 'Rock-type',
    specialtyType: 'rock',
    team: [
      { name: 'Tyrunt', apiName: 'tyrunt', level: 25, moves: ['Bite', 'Rock Tomb', 'Stomp'] },
      { name: 'Amaura', apiName: 'amaura', level: 25, moves: ['Thunder Wave', 'Rock Tomb', 'Aurora Beam', 'Take Down'] }
    ]
  },
  {
    number: 3,
    gymName: 'Shalour City Gym',
    leader: 'Korrina',
    location: 'Shalour City',
    specialty: 'Fighting-type',
    specialtyType: 'fighting',
    team: [
      { name: 'Mienfoo', apiName: 'mienfoo', level: 29, moves: ['Fake Out', 'Double Slap', 'Power-Up Punch'] },
      { name: 'Hawlucha', apiName: 'hawlucha', level: 32, moves: ['Hone Claws', 'Flying Press', 'Power-Up Punch'] },
      { name: 'Machoke', apiName: 'machoke', level: 28, moves: ['Rock Tomb', 'Power-Up Punch', 'Leer'] }
    ]
  },
  {
    number: 4,
    gymName: 'Courmaline City Gym',
    leader: 'Ramos',
    location: 'Courmaline City',
    specialty: 'Grass-type',
    specialtyType: 'grass',
    team: [
      { name: 'Jumpluff', apiName: 'jumpluff', level: 30, moves: ['Bullet Seed', 'Acrobatics', 'Leech Seed'] },
      { name: 'Gogoat', apiName: 'gogoat', level: 34, moves: ['Bulldoze', 'Grass Knot', 'Take Down'] },
      { name: 'Weepinbell', apiName: 'weepinbell', level: 31, moves: ['Grass Knot', 'Poison Powder', 'Acid', 'Gastro Acid'] }
    ]
  },
  {
    number: 5,
    gymName: 'Lumiose City Gym',
    leader: 'Clemont',
    location: 'Lumiose City',
    specialty: 'Electric-type',
    specialtyType: 'electric',
    team: [
      { name: 'Emolga', apiName: 'emolga', level: 35, moves: ['Volt Switch', 'Quick Attack', 'Aerial Ace'] },
      { name: 'Magneton', apiName: 'magneton', level: 35, moves: ['Thunderbolt', 'Electric Terrain', 'Mirror Shot'] },
      { name: 'Heliolisk', apiName: 'heliolisk', level: 37, moves: ['Thunderbolt', 'Quick Attack', 'Grass Knot'] }
    ]
  },
  {
    number: 6,
    gymName: 'Laverre City Gym',
    leader: 'Valerie',
    location: 'Laverre City',
    specialty: 'Fairy-type',
    specialtyType: 'fairy',
    team: [
      { name: 'Mawile', apiName: 'mawile', level: 38, moves: ['Feint Attack', 'Crunch', 'Iron Defense'] },
      { name: 'Mr. Mime', apiName: 'mr-mime', level: 39, moves: ['Light Screen', 'Reflect', 'Psychic', 'Dazzling Gleam'] },
      { name: 'Sylveon', apiName: 'sylveon', level: 42, moves: ['Dazzling Gleam', 'Quick Attack', 'Swift', 'Charm'] }
    ]
  },
  {
    number: 7,
    gymName: 'Anistar City Gym',
    leader: 'Olympia',
    location: 'Anistar City',
    specialty: 'Psychic-type',
    specialtyType: 'psychic',
    team: [
      { name: 'Sigilyph', apiName: 'sigilyph', level: 44, moves: ['Psychic', 'Air Slash', 'Light Screen', 'Reflect'] },
      { name: 'Slowking', apiName: 'slowking', level: 45, moves: ['Psychic', 'Calm Mind', 'Power Gem', 'Yawn'] },
      { name: 'Meowstic', apiName: 'meowstic-male', level: 48, moves: ['Psychic', 'Calm Mind', 'Fake Out', 'Shadow Ball'] }
    ]
  },
  {
    number: 8,
    gymName: 'Snowbelle City Gym',
    leader: 'Wulfric',
    location: 'Snowbelle City',
    specialty: 'Ice-type',
    specialtyType: 'ice',
    team: [
      { name: 'Abomasnow', apiName: 'abomasnow', level: 56, moves: ['Ice Beam', 'Ice Shard', 'Energy Ball'] },
      { name: 'Cryogonal', apiName: 'cryogonal', level: 55, moves: ['Ice Beam', 'Confuse Ray', 'Flash Cannon', 'Hail'] },
      { name: 'Avalugg', apiName: 'avalugg', level: 59, moves: ['Avalanche', 'Crunch', 'Curse', 'Gyro Ball'] }
    ]
  }
]

const omegaRubyAlphaSapphireGyms = [
  {
    number: 1,
    gymName: 'Rustboro City Gym',
    leader: 'Roxanne',
    location: 'Rustboro City',
    specialty: 'Rock-type',
    specialtyType: 'rock',
    team: [
      { name: 'Geodude', apiName: 'geodude', level: 12, moves: ['Tackle', 'Defense Curl', 'Rock Tomb'] },
      { name: 'Nosepass', apiName: 'nosepass', level: 14, moves: ['Tackle', 'Harden', 'Rock Tomb'] }
    ]
  },
  {
    number: 2,
    gymName: 'Dewford Town Gym',
    leader: 'Brawly',
    location: 'Dewford Town',
    specialty: 'Fighting-type',
    specialtyType: 'fighting',
    team: [
      { name: 'Machop', apiName: 'machop', level: 14, moves: ['Leer', 'Karate Chop', 'Seismic Toss', 'Bulk Up'] },
      { name: 'Makuhita', apiName: 'makuhita', level: 16, moves: ['Arm Thrust', 'Knock Off', 'Sand Attack', 'Bulk Up'] }
    ]
  },
  {
    number: 3,
    gymName: 'Mauville City Gym',
    leader: 'Wattson',
    location: 'Mauville City',
    specialty: 'Electric-type',
    specialtyType: 'electric',
    team: [
      { name: 'Magnemite', apiName: 'magnemite', level: 19, moves: ['Thunder Wave', 'Tackle', 'Volt Switch'] },
      { name: 'Voltorb', apiName: 'voltorb', level: 19, moves: ['Rollout', 'Charge', 'Volt Switch'] },
      { name: 'Magneton', apiName: 'magneton', level: 21, moves: ['Supersonic', 'Magnet Bomb', 'Volt Switch'] }
    ]
  },
  {
    number: 4,
    gymName: 'Lavaridge Town Gym',
    leader: 'Flannery',
    location: 'Lavaridge Town',
    specialty: 'Fire-type',
    specialtyType: 'fire',
    team: [
      { name: 'Slugma', apiName: 'slugma', level: 26, moves: ['Overheat', 'Rock Throw', 'Light Screen', 'Sunny Day'] },
      { name: 'Numel', apiName: 'numel', level: 26, moves: ['Earth Power', 'Lava Plume', 'Amnesia', 'Sunny Day'] },
      { name: 'Torkoal', apiName: 'torkoal', level: 28, moves: ['Overheat', 'Body Slam', 'Curse', 'Sunny Day'] }
    ]
  },
  {
    number: 5,
    gymName: 'Petalburg City Gym',
    leader: 'Norman',
    location: 'Petalburg City',
    specialty: 'Normal-type',
    specialtyType: 'normal',
    team: [
      { name: 'Slaking', apiName: 'slaking', level: 28, moves: ['Encore', 'Retaliate', 'Yawn', 'Feint Attack'] },
      { name: 'Vigoroth', apiName: 'vigoroth', level: 28, moves: ['Fury Swipes', 'Feint Attack', 'Retaliate', 'Encore'] },
      { name: 'Slaking', apiName: 'slaking', level: 30, moves: ['Chip Away', 'Swagger', 'Retaliate', 'Feint Attack'] }
    ]
  },
  {
    number: 6,
    gymName: 'Fortree City Gym',
    leader: 'Winona',
    location: 'Fortree City',
    specialty: 'Flying-type',
    specialtyType: 'flying',
    team: [
      { name: 'Swellow', apiName: 'swellow', level: 33, moves: ['Quick Attack', 'Aerial Ace', 'Double Team', 'Endeavor'] },
      { name: 'Pelipper', apiName: 'pelipper', level: 33, moves: ['Water Pulse', 'Roost', 'Protect', 'Aerial Ace'] },
      { name: 'Skarmory', apiName: 'skarmory', level: 33, moves: ['Sand Attack', 'Air Cutter', 'Steel Wing', 'Aerial Ace'] },
      { name: 'Altaria', apiName: 'altaria', level: 35, moves: ['Earthquake', 'Dragon Breath', 'Cotton Guard', 'Roost'] }
    ]
  },
  {
    number: 7,
    gymName: 'Mossdeep City Gym',
    leader: 'Liza & Tate',
    location: 'Mossdeep City',
    specialty: 'Psychic-type',
    specialtyType: 'psychic',
    battleType: 'Double Battle',
    team: [
      { name: 'Lunatone', apiName: 'lunatone', level: 45, moves: ['Light Screen', 'Psychic', 'Hypnosis', 'Calm Mind'] },
      { name: 'Solrock', apiName: 'solrock', level: 45, moves: ['Sunny Day', 'Rock Slide', 'Psychic', 'Solar Beam'] }
    ]
  },
  {
    number: 8,
    gymName: 'Sootopolis City Gym',
    leader: 'Wallace',
    location: 'Sootopolis City',
    specialty: 'Water-type',
    specialtyType: 'water',
    team: [
      { name: 'Luvdisc', apiName: 'luvdisc', level: 44, moves: ['Water Pulse', 'Attract', 'Sweet Kiss', 'Draining Kiss'] },
      { name: 'Whiscash', apiName: 'whiscash', level: 44, moves: ['Mud Sport', 'Waterfall', 'Zen Headbutt', 'Earthquake'] },
      { name: 'Sealeo', apiName: 'sealeo', level: 44, moves: ['Encore', 'Body Slam', 'Aurora Beam', 'Waterfall'] },
      { name: 'Seaking', apiName: 'seaking', level: 44, moves: ['Aqua Ring', 'Rain Dance', 'Waterfall', 'Horn Drill'] },
      { name: 'Milotic', apiName: 'milotic', level: 46, moves: ['Hydro Pump', 'Disarming Voice', 'Recover', 'Ice Beam'] }
    ]
  }
]

const sunGyms = [
  {
    number: 1,
    gymName: 'Captain Ilima - First Battle (Rowlet Chosen)',
    leader: 'Ilima',
    location: "Hau'oli City",
    specialty: 'Normal-type',
    specialtyType: 'normal',
    team: [
      { name: 'Yungoos', apiName: 'yungoos', level: 9, moves: ['Tackle', 'Pursuit', 'Leer'] },
      { name: 'Smeargle', apiName: 'smeargle', level: 10, moves: ['Ember', 'Tackle'] }
    ]
  },
  {
    number: 1,
    gymName: 'Captain Ilima - First Battle (Litten Chosen)',
    leader: 'Ilima',
    location: "Hau'oli City",
    specialty: 'Normal-type',
    specialtyType: 'normal',
    team: [
      { name: 'Yungoos', apiName: 'yungoos', level: 9, moves: ['Tackle', 'Pursuit', 'Leer'] },
      { name: 'Smeargle', apiName: 'smeargle', level: 10, moves: ['Water Gun', 'Tackle'] }
    ]
  },
  {
    number: 1,
    gymName: 'Captain Ilima - First Battle (Popplio Chosen)',
    leader: 'Ilima',
    location: "Hau'oli City",
    specialty: 'Normal-type',
    specialtyType: 'normal',
    team: [
      { name: 'Yungoos', apiName: 'yungoos', level: 9, moves: ['Tackle', 'Pursuit', 'Leer'] },
      { name: 'Smeargle', apiName: 'smeargle', level: 10, moves: ['Leafage', 'Tackle'] }
    ]
  },
  {
    number: 1,
    gymName: 'Captain Ilima - Second Battle',
    leader: 'Ilima',
    location: "Hau'oli City",
    specialty: 'Normal-type',
    specialtyType: 'normal',
    team: [
      { name: 'Gumshoos', apiName: 'gumshoos', level: 15, moves: ['Tackle', 'Pursuit', 'Leer'] },
      { name: 'Smeargle', apiName: 'smeargle', level: 14, moves: ['Quick Attack', 'Ember', 'Water Gun', 'Leafage'] }
    ]
  },
  {
    number: 2,
    gymName: 'Captain Lana',
    leader: 'Lana',
    location: 'Konikoni City',
    specialty: 'Water-type',
    specialtyType: 'water',
    team: [
      { name: 'Chinchou', apiName: 'chinchou', level: 26, moves: ['Electro Ball', 'Bubble Beam', 'Thunder Wave'] },
      { name: 'Shellder', apiName: 'shellder', level: 26, moves: ['Supersonic', 'Icicle Spear', 'Water Gun'] },
      { name: 'Araquanid', apiName: 'araquanid', level: 27, moves: ['Bubble Beam', 'Bug Bite', 'Bite'] }
    ]
  },
  {
    number: 3,
    gymName: 'Captain Kiawe',
    leader: 'Kiawe',
    location: 'Paniola Town / Royal Avenue',
    specialty: 'Fire-type',
    specialtyType: 'fire',
    team: [
      { name: 'Growlithe', apiName: 'growlithe', level: 26, moves: ['Bite', 'Fire Fang'] },
      { name: 'Fletchinder', apiName: 'fletchinder', level: 26, moves: ['Ember', 'Quick Attack', 'Peck'] },
      { name: 'Marowak', apiName: 'marowak-alola', level: 27, moves: ['Flame Wheel', 'Hex', 'Bonemerang', 'Will-O-Wisp'] }
    ]
  },
  {
    number: 5,
    gymName: 'Captain Sophocles',
    leader: 'Sophocles',
    location: 'Pokemon League',
    specialty: 'Electric-type',
    specialtyType: 'electric',
    team: [
      { name: 'Togedemaru', apiName: 'togedemaru', level: 61, moves: ['Electric Terrain', 'Zing Zap', 'Spiky Shield', 'Fell Stinger'] },
      { name: 'Magnezone', apiName: 'magnezone', level: 61, moves: ['Flash Cannon', 'Discharge', 'Tri Attack', 'Reflect'] },
      { name: 'Electivire', apiName: 'electivire', level: 61, moves: ['Thunder Punch', 'Giga Impact', 'Fire Punch', 'Quick Attack'] },
      { name: 'Vikavolt', apiName: 'vikavolt', level: 61, moves: ['Bug Buzz', 'Thunderbolt', 'Air Slash', 'Guillotine'] },
      { name: 'Golem', apiName: 'golem-alola', level: 61, moves: ['Stone Edge', 'Steamroller', 'Thunder Punch', 'Heavy Slam'] }
    ]
  },
  {
    number: 6,
    gymName: 'Captain Acerola - Elite Four',
    leader: 'Acerola',
    location: 'Pokemon League',
    specialty: 'Ghost-type',
    specialtyType: 'ghost',
    team: [
      { name: 'Sableye', apiName: 'sableye', level: 54, moves: ['Shadow Claw', 'Zen Headbutt', 'Confuse Ray', 'Fake Out'] },
      { name: 'Drifblim', apiName: 'drifblim', level: 54, moves: ['Ominous Wind', 'Focus Energy', 'Amnesia', 'Baton Pass'] },
      { name: 'Dhelmise', apiName: 'dhelmise', level: 54, moves: ['Slam', 'Shadow Ball', 'Energy Ball', 'Whirlpool'] },
      { name: 'Froslass', apiName: 'froslass', level: 54, moves: ['Blizzard', 'Shadow Ball', 'Confuse Ray', 'Ice Shard'] },
      { name: 'Palossand', apiName: 'palossand', level: 55, moves: ['Shadow Ball', 'Earth Power', 'Giga Drain', 'Iron Defense'] }
    ]
  },
  {
    number: 6,
    gymName: 'Captain Acerola - Rematch',
    leader: 'Acerola',
    location: 'Pokemon League',
    specialty: 'Ghost-type',
    specialtyType: 'ghost',
    team: [
      { name: 'Sableye', apiName: 'sableye', level: 63, moves: ['Shadow Claw', 'Zen Headbutt', 'Brick Break', 'Fake Out'] },
      { name: 'Drifblim', apiName: 'drifblim', level: 63, moves: ['Shadow Ball', 'Thunderbolt', 'Psychic', 'Will-O-Wisp'] },
      { name: 'Dhelmise', apiName: 'dhelmise', level: 63, moves: ['Phantom Force', 'Heavy Slam', 'Earthquake', 'Brutal Swing'] },
      { name: 'Froslass', apiName: 'froslass', level: 63, moves: ['Blizzard', 'Shadow Ball', 'Thunderbolt', 'Ice Shard'] },
      { name: 'Palossand', apiName: 'palossand', level: 63, moves: ['Shadow Ball', 'Earth Power', 'Sludge Bomb', 'Giga Drain'] }
    ]
  },
  {
    number: 7,
    gymName: 'Captain Mina - First Battle',
    leader: 'Mina',
    location: 'Route 8',
    specialty: 'Fairy-type',
    specialtyType: 'fairy',
    team: [
      { name: 'Klefki', apiName: 'klefki', level: 61, moves: ['Dazzling Gleam', 'Flash Cannon', 'Light Screen', 'Reflect'] },
      { name: 'Granbull', apiName: 'granbull', level: 61, moves: ['Crunch', 'Play Rough', 'Earthquake', 'Stone Edge'] },
      { name: 'Shiinotic', apiName: 'shiinotic', level: 61, moves: ['Spore', 'Moonblast', 'Dream Eater', 'Giga Drain'] },
      { name: 'Wigglytuff', apiName: 'wigglytuff', level: 61, moves: ['Dazzling Gleam', 'Hyper Voice', 'Flamethrower', 'Ice Beam'] },
      { name: 'Ribombee', apiName: 'ribombee', level: 61, moves: ['Pollen Puff', 'Dazzling Gleam', 'Psychic', 'Energy Ball'] }
    ]
  },
  {
    number: 7,
    gymName: 'Captain Mina - Poni Gauntlet',
    leader: 'Mina',
    location: 'Poni Gauntlet',
    specialty: 'Fairy-type',
    specialtyType: 'fairy',
    team: [
      { name: 'Klefki', apiName: 'klefki', level: 61, moves: ['Dazzling Gleam', 'Flash Cannon', 'Light Screen', 'Reflect'] },
      { name: 'Granbull', apiName: 'granbull', level: 61, moves: ['Crunch', 'Play Rough', 'Earthquake', 'Stone Edge'] },
      { name: 'Shiinotic', apiName: 'shiinotic', level: 61, moves: ['Spore', 'Moonblast', 'Dream Eater', 'Giga Drain'] },
      { name: 'Wigglytuff', apiName: 'wigglytuff', level: 61, moves: ['Dazzling Gleam', 'Hyper Voice', 'Flamethrower', 'Ice Beam'] },
      { name: 'Ribombee', apiName: 'ribombee', level: 61, moves: ['Pollen Puff', 'Dazzling Gleam', 'Psychic', 'Energy Ball'] }
    ]
  }
]

const moonGyms = [
  {
    number: 1,
    gymName: 'Captain Ilima - First Battle (Rowlet Chosen)',
    leader: 'Ilima',
    location: "Hau'oli City",
    specialty: 'Normal-type',
    specialtyType: 'normal',
    team: [
      { name: 'Yungoos', apiName: 'yungoos', level: 9, moves: ['Tackle', 'Pursuit', 'Leer'] },
      { name: 'Smeargle', apiName: 'smeargle', level: 10, moves: ['Ember', 'Tackle'] }
    ]
  },
  {
    number: 1,
    gymName: 'Captain Ilima - First Battle (Litten Chosen)',
    leader: 'Ilima',
    location: "Hau'oli City",
    specialty: 'Normal-type',
    specialtyType: 'normal',
    team: [
      { name: 'Yungoos', apiName: 'yungoos', level: 9, moves: ['Tackle', 'Pursuit', 'Leer'] },
      { name: 'Smeargle', apiName: 'smeargle', level: 10, moves: ['Water Gun', 'Tackle'] }
    ]
  },
  {
    number: 1,
    gymName: 'Captain Ilima - First Battle (Popplio Chosen)',
    leader: 'Ilima',
    location: "Hau'oli City",
    specialty: 'Normal-type',
    specialtyType: 'normal',
    team: [
      { name: 'Yungoos', apiName: 'yungoos', level: 9, moves: ['Tackle', 'Pursuit', 'Leer'] },
      { name: 'Smeargle', apiName: 'smeargle', level: 10, moves: ['Leafage', 'Tackle'] }
    ]
  },
  {
    number: 1,
    gymName: 'Captain Ilima - Second Battle',
    leader: 'Ilima',
    location: "Hau'oli City",
    specialty: 'Normal-type',
    specialtyType: 'normal',
    team: [
      { name: 'Gumshoos', apiName: 'gumshoos', level: 15, moves: ['Tackle', 'Pursuit', 'Leer'] },
      { name: 'Smeargle', apiName: 'smeargle', level: 14, moves: ['Quick Attack', 'Ember', 'Water Gun', 'Leafage'] }
    ]
  },
  {
    number: 2,
    gymName: 'Captain Lana',
    leader: 'Lana',
    location: 'Konikoni City',
    specialty: 'Water-type',
    specialtyType: 'water',
    team: [
      { name: 'Chinchou', apiName: 'chinchou', level: 26, moves: ['Electro Ball', 'Bubble Beam', 'Thunder Wave'] },
      { name: 'Shellder', apiName: 'shellder', level: 26, moves: ['Supersonic', 'Icicle Spear', 'Water Gun'] },
      { name: 'Araquanid', apiName: 'araquanid', level: 27, moves: ['Bubble Beam', 'Bug Bite', 'Bite'] }
    ]
  },
  {
    number: 4,
    gymName: 'Captain Mallow',
    leader: 'Mallow',
    location: 'Konikoni City / Lush Jungle',
    specialty: 'Grass-type',
    specialtyType: 'grass',
    team: [
      { name: 'Phantump', apiName: 'phantump', level: 26, moves: ['Leech Seed', 'Feint Attack', 'Confuse Ray', 'Astonish'] },
      { name: 'Shiinotic', apiName: 'shiinotic', level: 26, moves: ['Ingrain', 'Mega Drain', 'Sleep Powder', 'Astonish'] },
      { name: 'Steenee', apiName: 'steenee', level: 27, moves: ['Teeter Dance', 'Magical Leaf', 'Double Slap', 'Rapid Spin'] }
    ]
  },
  {
    number: 5,
    gymName: 'Captain Sophocles',
    leader: 'Sophocles',
    location: 'Pokemon League',
    specialty: 'Electric-type',
    specialtyType: 'electric',
    team: [
      { name: 'Togedemaru', apiName: 'togedemaru', level: 61, moves: ['Electric Terrain', 'Zing Zap', 'Spiky Shield', 'Fell Stinger'] },
      { name: 'Magnezone', apiName: 'magnezone', level: 61, moves: ['Flash Cannon', 'Discharge', 'Tri Attack', 'Reflect'] },
      { name: 'Electivire', apiName: 'electivire', level: 61, moves: ['Thunder Punch', 'Giga Impact', 'Fire Punch', 'Quick Attack'] },
      { name: 'Vikavolt', apiName: 'vikavolt', level: 61, moves: ['Bug Buzz', 'Thunderbolt', 'Air Slash', 'Guillotine'] },
      { name: 'Golem', apiName: 'golem-alola', level: 61, moves: ['Stone Edge', 'Steamroller', 'Thunder Punch', 'Heavy Slam'] }
    ]
  },
  {
    number: 6,
    gymName: 'Captain Acerola - Elite Four',
    leader: 'Acerola',
    location: 'Pokemon League',
    specialty: 'Ghost-type',
    specialtyType: 'ghost',
    team: [
      { name: 'Sableye', apiName: 'sableye', level: 54, moves: ['Shadow Claw', 'Zen Headbutt', 'Confuse Ray', 'Fake Out'] },
      { name: 'Drifblim', apiName: 'drifblim', level: 54, moves: ['Ominous Wind', 'Focus Energy', 'Amnesia', 'Baton Pass'] },
      { name: 'Dhelmise', apiName: 'dhelmise', level: 54, moves: ['Slam', 'Shadow Ball', 'Energy Ball', 'Whirlpool'] },
      { name: 'Froslass', apiName: 'froslass', level: 54, moves: ['Blizzard', 'Shadow Ball', 'Confuse Ray', 'Ice Shard'] },
      { name: 'Palossand', apiName: 'palossand', level: 55, moves: ['Shadow Ball', 'Earth Power', 'Giga Drain', 'Iron Defense'] }
    ]
  },
  {
    number: 6,
    gymName: 'Captain Acerola - Rematch',
    leader: 'Acerola',
    location: 'Pokemon League',
    specialty: 'Ghost-type',
    specialtyType: 'ghost',
    team: [
      { name: 'Sableye', apiName: 'sableye', level: 63, moves: ['Shadow Claw', 'Zen Headbutt', 'Brick Break', 'Fake Out'] },
      { name: 'Drifblim', apiName: 'drifblim', level: 63, moves: ['Shadow Ball', 'Thunderbolt', 'Psychic', 'Will-O-Wisp'] },
      { name: 'Dhelmise', apiName: 'dhelmise', level: 63, moves: ['Phantom Force', 'Heavy Slam', 'Earthquake', 'Brutal Swing'] },
      { name: 'Froslass', apiName: 'froslass', level: 63, moves: ['Blizzard', 'Shadow Ball', 'Thunderbolt', 'Ice Shard'] },
      { name: 'Palossand', apiName: 'palossand', level: 63, moves: ['Shadow Ball', 'Earth Power', 'Sludge Bomb', 'Giga Drain'] }
    ]
  },
  {
    number: 7,
    gymName: 'Captain Mina - First Battle',
    leader: 'Mina',
    location: 'Route 8',
    specialty: 'Fairy-type',
    specialtyType: 'fairy',
    team: [
      { name: 'Klefki', apiName: 'klefki', level: 61, moves: ['Dazzling Gleam', 'Flash Cannon', 'Light Screen', 'Reflect'] },
      { name: 'Granbull', apiName: 'granbull', level: 61, moves: ['Crunch', 'Play Rough', 'Earthquake', 'Stone Edge'] },
      { name: 'Shiinotic', apiName: 'shiinotic', level: 61, moves: ['Spore', 'Moonblast', 'Dream Eater', 'Giga Drain'] },
      { name: 'Wigglytuff', apiName: 'wigglytuff', level: 61, moves: ['Dazzling Gleam', 'Hyper Voice', 'Flamethrower', 'Ice Beam'] },
      { name: 'Ribombee', apiName: 'ribombee', level: 61, moves: ['Pollen Puff', 'Dazzling Gleam', 'Psychic', 'Energy Ball'] }
    ]
  },
  {
    number: 7,
    gymName: 'Captain Mina - Poni Gauntlet',
    leader: 'Mina',
    location: 'Poni Gauntlet',
    specialty: 'Fairy-type',
    specialtyType: 'fairy',
    team: [
      { name: 'Klefki', apiName: 'klefki', level: 61, moves: ['Dazzling Gleam', 'Flash Cannon', 'Light Screen', 'Reflect'] },
      { name: 'Granbull', apiName: 'granbull', level: 61, moves: ['Crunch', 'Play Rough', 'Earthquake', 'Stone Edge'] },
      { name: 'Shiinotic', apiName: 'shiinotic', level: 61, moves: ['Spore', 'Moonblast', 'Dream Eater', 'Giga Drain'] },
      { name: 'Wigglytuff', apiName: 'wigglytuff', level: 61, moves: ['Dazzling Gleam', 'Hyper Voice', 'Flamethrower', 'Ice Beam'] },
      { name: 'Ribombee', apiName: 'ribombee', level: 61, moves: ['Pollen Puff', 'Dazzling Gleam', 'Psychic', 'Energy Ball'] }
    ]
  }
]

const ultraSunGyms = [
  {
    number: 1,
    gymName: 'Captain Ilima',
    leader: 'Ilima',
    location: "Hau'oli City",
    specialty: 'Normal-type',
    specialtyType: 'normal',
    team: [
      { name: 'Gumshoos', apiName: 'gumshoos', level: 60, moves: ['Crunch', 'Hyper Fang', 'Super Fang'] },
      { name: 'Smeargle', apiName: 'smeargle', level: 60, moves: ['Extreme Speed', 'Fire Blast', 'Hydro Pump', 'Power Whip'] },
      { name: 'Komala', apiName: 'komala', level: 60, moves: ['Sucker Punch', 'Wood Hammer', 'Slam', 'Zen Headbutt'] }
    ]
  },
  {
    number: 2,
    gymName: 'Captain Lana',
    leader: 'Lana',
    location: 'Konikoni City',
    specialty: 'Water-type',
    specialtyType: 'water',
    team: [
      { name: 'Lanturn', apiName: 'lanturn', level: 60, moves: ['Discharge', 'Hydro Pump', 'Thunder Wave', 'Icy Wind'] },
      { name: 'Cloyster', apiName: 'cloyster', level: 60, moves: ['Spike Cannon', 'Icicle Crash', 'Smart Strike', 'Spikes'] },
      { name: 'Araquanid', apiName: 'araquanid', level: 60, moves: ['Liquidation', 'Leech Life', 'Crunch', 'Frost Breath'] }
    ]
  },
  {
    number: 3,
    gymName: 'Captain Kiawe',
    leader: 'Kiawe',
    location: 'Paniola Town / Royal Avenue',
    specialty: 'Fire-type',
    specialtyType: 'fire',
    team: [
      { name: 'Arcanine', apiName: 'arcanine', level: 60, moves: ['Crunch', 'Flare Blitz', 'Extreme Speed'] },
      { name: 'Talonflame', apiName: 'talonflame', level: 60, moves: ['Quick Attack', 'Flare Blitz', 'Brave Bird'] },
      { name: 'Marowak', apiName: 'marowak-alola', level: 60, moves: ['Flare Blitz', 'Shadow Bone', 'Bone Rush'] }
    ]
  },
  {
    number: 5,
    gymName: 'Captain Sophocles',
    leader: 'Sophocles',
    location: 'Pokemon League',
    specialty: 'Electric-type',
    specialtyType: 'electric',
    team: [
      { name: 'Togedemaru', apiName: 'togedemaru', level: 67, moves: ['Electric Terrain', 'Zing Zap', 'Spiky Shield', 'Fell Stinger'] },
      { name: 'Magnezone', apiName: 'magnezone', level: 67, moves: ['Flash Cannon', 'Discharge', 'Tri Attack', 'Reflect'] },
      { name: 'Electivire', apiName: 'electivire', level: 67, moves: ['Thunder Punch', 'Giga Impact', 'Fire Punch', 'Quick Attack'] },
      { name: 'Vikavolt', apiName: 'vikavolt', level: 67, moves: ['Bug Buzz', 'Thunderbolt', 'Air Slash', 'Guillotine'] },
      { name: 'Golem', apiName: 'golem-alola', level: 67, moves: ['Stone Edge', 'Steamroller', 'Thunder Punch', 'Heavy Slam'] }
    ]
  },
  {
    number: 6,
    gymName: 'Captain Acerola - Elite Four',
    leader: 'Acerola',
    location: 'Pokemon League',
    specialty: 'Ghost-type',
    specialtyType: 'ghost',
    team: [
      { name: 'Banette', apiName: 'banette', level: 66, moves: ['Shadow Claw', 'Sucker Punch', 'Infestation', 'Shadow Sneak'] },
      { name: 'Drifblim', apiName: 'drifblim', level: 66, moves: ['Shadow Ball', 'Thunderbolt', 'Psychic', 'Will-O-Wisp'] },
      { name: 'Dhelmise', apiName: 'dhelmise', level: 66, moves: ['Phantom Force', 'Heavy Slam', 'Earthquake', 'Power Whip'] },
      { name: 'Froslass', apiName: 'froslass', level: 66, moves: ['Blizzard', 'Shadow Ball', 'Thunderbolt', 'Ice Shard'] },
      { name: 'Palossand', apiName: 'palossand', level: 66, moves: ['Shadow Ball', 'Earth Power', 'Sludge Bomb', 'Giga Drain'] }
    ]
  }
]

const ultraMoonGyms = [
  {
    number: 1,
    gymName: 'Captain Ilima',
    leader: 'Ilima',
    location: "Hau'oli City",
    specialty: 'Normal-type',
    specialtyType: 'normal',
    team: [
      { name: 'Gumshoos', apiName: 'gumshoos', level: 60, moves: ['Crunch', 'Hyper Fang', 'Super Fang'] },
      { name: 'Smeargle', apiName: 'smeargle', level: 60, moves: ['Extreme Speed', 'Fire Blast', 'Hydro Pump', 'Power Whip'] },
      { name: 'Komala', apiName: 'komala', level: 60, moves: ['Sucker Punch', 'Wood Hammer', 'Slam', 'Zen Headbutt'] }
    ]
  },
  {
    number: 2,
    gymName: 'Captain Lana',
    leader: 'Lana',
    location: 'Konikoni City',
    specialty: 'Water-type',
    specialtyType: 'water',
    team: [
      { name: 'Lanturn', apiName: 'lanturn', level: 60, moves: ['Discharge', 'Hydro Pump', 'Thunder Wave', 'Icy Wind'] },
      { name: 'Cloyster', apiName: 'cloyster', level: 60, moves: ['Spike Cannon', 'Icicle Crash', 'Smart Strike', 'Spikes'] },
      { name: 'Araquanid', apiName: 'araquanid', level: 60, moves: ['Liquidation', 'Leech Life', 'Crunch', 'Frost Breath'] }
    ]
  },
  {
    number: 4,
    gymName: 'Captain Mallow',
    leader: 'Mallow',
    location: 'Konikoni City / Lush Jungle',
    specialty: 'Grass-type',
    specialtyType: 'grass',
    team: [
      { name: 'Trevenant', apiName: 'trevenant', level: 60, moves: ['Horn Leech', 'Shadow Claw', 'Leech Seed'] },
      { name: 'Shiinotic', apiName: 'shiinotic', level: 60, moves: ['Moonblast', 'Giga Drain', 'Spore', 'Ingrain'] },
      { name: 'Tsareena', apiName: 'tsareena', level: 60, moves: ['Power Whip', 'High Jump Kick', 'Zen Headbutt', 'U-Turn'] }
    ]
  },
  {
    number: 5,
    gymName: 'Captain Sophocles',
    leader: 'Sophocles',
    location: 'Pokemon League',
    specialty: 'Electric-type',
    specialtyType: 'electric',
    team: [
      { name: 'Togedemaru', apiName: 'togedemaru', level: 67, moves: ['Electric Terrain', 'Zing Zap', 'Spiky Shield', 'Fell Stinger'] },
      { name: 'Magnezone', apiName: 'magnezone', level: 67, moves: ['Flash Cannon', 'Discharge', 'Tri Attack', 'Reflect'] },
      { name: 'Electivire', apiName: 'electivire', level: 67, moves: ['Thunder Punch', 'Giga Impact', 'Fire Punch', 'Quick Attack'] },
      { name: 'Vikavolt', apiName: 'vikavolt', level: 67, moves: ['Bug Buzz', 'Thunderbolt', 'Air Slash', 'Guillotine'] },
      { name: 'Golem', apiName: 'golem-alola', level: 67, moves: ['Stone Edge', 'Steamroller', 'Thunder Punch', 'Heavy Slam'] }
    ]
  },
  {
    number: 6,
    gymName: 'Captain Acerola - Elite Four',
    leader: 'Acerola',
    location: 'Pokemon League',
    specialty: 'Ghost-type',
    specialtyType: 'ghost',
    team: [
      { name: 'Banette', apiName: 'banette', level: 66, moves: ['Shadow Claw', 'Sucker Punch', 'Infestation', 'Shadow Sneak'] },
      { name: 'Drifblim', apiName: 'drifblim', level: 66, moves: ['Shadow Ball', 'Thunderbolt', 'Psychic', 'Will-O-Wisp'] },
      { name: 'Dhelmise', apiName: 'dhelmise', level: 66, moves: ['Phantom Force', 'Heavy Slam', 'Earthquake', 'Power Whip'] },
      { name: 'Froslass', apiName: 'froslass', level: 66, moves: ['Blizzard', 'Shadow Ball', 'Thunderbolt', 'Ice Shard'] },
      { name: 'Palossand', apiName: 'palossand', level: 66, moves: ['Shadow Ball', 'Earth Power', 'Sludge Bomb', 'Giga Drain'] }
    ]
  }
]

const letsGoPikachuLetsGoEeveeGyms = [
  {
    number: 1,
    gymName: 'Pewter City Gym',
    leader: 'Brock',
    location: 'Pewter City',
    specialty: 'Rock-type',
    specialtyType: 'rock',
    team: [
      { name: 'Geodude', apiName: 'geodude', level: 11, moves: ['Tackle'] },
      { name: 'Onix', apiName: 'onix', level: 12, moves: ['Headbutt', 'Bind', 'Rock Throw'] }
    ]
  },
  {
    number: 2,
    gymName: 'Cerulean City Gym',
    leader: 'Misty',
    location: 'Cerulean City',
    specialty: 'Water-type',
    specialtyType: 'water',
    team: [
      { name: 'Psyduck', apiName: 'psyduck', level: 18, moves: ['Water Gun', 'Confusion'] },
      { name: 'Starmie', apiName: 'starmie', level: 19, moves: ['Scald', 'Psywave', 'Swift'] }
    ]
  },
  {
    number: 3,
    gymName: 'Vermilion City Gym',
    leader: 'Lt. Surge',
    location: 'Vermilion City',
    specialty: 'Electric-type',
    specialtyType: 'electric',
    team: [
      { name: 'Voltorb', apiName: 'voltorb', level: 25, moves: ['Thunderbolt', 'Swift', 'Light Screen'] },
      { name: 'Magnemite', apiName: 'magnemite', level: 25, moves: ['Thunderbolt', 'Sonic Boom'] },
      { name: 'Raichu', apiName: 'raichu', level: 26, moves: ['Thunderbolt', 'Quick Attack', 'Double Kick'] }
    ]
  },
  {
    number: 4,
    gymName: 'Celadon City Gym',
    leader: 'Erika',
    location: 'Celadon City',
    specialty: 'Grass-type',
    specialtyType: 'grass',
    team: [
      { name: 'Tangela', apiName: 'tangela', level: 33, moves: ['Mega Drain', 'Sleep Powder', 'Bind'] },
      { name: 'Weepinbell', apiName: 'weepinbell', level: 33, moves: ['Mega Drain', 'Poison Jab'] },
      { name: 'Vileplume', apiName: 'vileplume', level: 34, moves: ['Mega Drain', 'Moonblast'] }
    ]
  },
  {
    number: 5,
    gymName: 'Fuchsia City Gym',
    leader: 'Koga',
    location: 'Fuchsia City',
    specialty: 'Poison-type',
    specialtyType: 'poison',
    team: [
      { name: 'Weezing', apiName: 'weezing', level: 43, moves: ['Toxic', 'Protect', 'Sludge Bomb', 'Explosion'] },
      { name: 'Muk', apiName: 'muk', level: 43, moves: ['Toxic', 'Protect', 'Sludge Bomb', 'Moonblast'] },
      { name: 'Golbat', apiName: 'golbat', level: 43, moves: ['Toxic', 'Protect', 'Fly', 'Leech Life'] },
      { name: 'Venomoth', apiName: 'venomoth', level: 44, moves: ['Sludge Bomb', 'Protect', 'Psychic', 'Bug Buzz'] }
    ]
  },
  {
    number: 6,
    gymName: 'Saffron City Gym',
    leader: 'Sabrina',
    location: 'Saffron City',
    specialty: 'Psychic-type',
    specialtyType: 'psychic',
    team: [
      { name: 'Mr. Mime', apiName: 'mr-mime', level: 43, moves: ['Psychic', 'Reflect', 'Light Screen', 'Double Slap'] },
      { name: 'Slowbro', apiName: 'slowbro', level: 43, moves: ['Psychic', 'Yawn', 'Surf', 'Calm Mind'] },
      { name: 'Jynx', apiName: 'jynx', level: 43, moves: ['Psychic', 'Lovely Kiss', 'Ice Punch'] },
      { name: 'Alakazam', apiName: 'alakazam', level: 44, moves: ['Psychic', 'Night Shade'] }
    ]
  },
  {
    number: 7,
    gymName: 'Cinnabar Island Gym',
    leader: 'Blaine',
    location: 'Cinnabar Island',
    specialty: 'Fire-type',
    specialtyType: 'fire',
    team: [
      { name: 'Magmar', apiName: 'magmar', level: 47, moves: ['Flamethrower', 'Low Kick', 'Confuse Ray'] },
      { name: 'Rapidash', apiName: 'rapidash', level: 47, moves: ['Flare Blitz', 'Quick Attack', 'Fury Attack'] },
      { name: 'Ninetales', apiName: 'ninetales', level: 47, moves: ['Fire Blast', 'Quick Attack'] },
      { name: 'Arcanine', apiName: 'arcanine', level: 48, moves: ['Flare Blitz', 'Outrage', 'Crunch'] }
    ]
  },
  {
    number: 8,
    gymName: 'Viridian City Gym',
    leader: 'Giovanni',
    location: 'Viridian City',
    specialty: 'Ground-type',
    specialtyType: 'ground',
    team: [
      { name: 'Dugtrio', apiName: 'dugtrio', level: 49, moves: ['Earthquake', 'Sucker Punch', 'Slash'] },
      { name: 'Nidoqueen', apiName: 'nidoqueen', level: 49, moves: ['Earthquake', 'Super Fang', 'Crunch'] },
      { name: 'Nidoking', apiName: 'nidoking', level: 49, moves: ['Earthquake', 'Horn Drill', 'Megahorn', 'Poison Jab'] },
      { name: 'Rhydon', apiName: 'rhydon', level: 50, moves: ['Earthquake', 'Rock Slide', 'Megahorn'] }
    ]
  }
]

const swordGyms = [
  {
    number: 1,
    gymName: 'Turffield Gym',
    leader: 'Milo',
    location: 'Turffield',
    specialty: 'Grass-type',
    specialtyType: 'grass',
    team: [
      { name: 'Gossifleur', apiName: 'gossifleur', level: 19, moves: ['Magical Leaf', 'Round', 'Rapid Spin'] },
      { name: 'Eldegoss', apiName: 'eldegoss', level: 20, moves: ['Magical Leaf', 'Leafage', 'Round'] }
    ]
  },
  {
    number: 2,
    gymName: 'Hulbury Gym',
    leader: 'Nessa',
    location: 'Hulbury',
    specialty: 'Water-type',
    specialtyType: 'water',
    team: [
      { name: 'Goldeen', apiName: 'goldeen', level: 22, moves: ['Water Pulse', 'Whirlpool', 'Horn Attack', 'Agility'] },
      { name: 'Arrokuda', apiName: 'arrokuda', level: 23, moves: ['Aqua Jet', 'Bite', 'Whirlpool', 'Fury Attack'] },
      { name: 'Drednaw', apiName: 'drednaw', level: 24, moves: ['Razor Shell', 'Water Gun', 'Bite', 'Headbutt'] }
    ]
  },
  {
    number: 3,
    gymName: 'Motostoke Gym',
    leader: 'Kabu',
    location: 'Motostoke',
    specialty: 'Fire-type',
    specialtyType: 'fire',
    team: [
      { name: 'Ninetales', apiName: 'ninetales', level: 25, moves: ['Will-O-Wisp', 'Fire Spin', 'Quick Attack', 'Ember'] },
      { name: 'Arcanine', apiName: 'arcanine', level: 25, moves: ['Will-O-Wisp', 'Flame Wheel', 'Bite', 'Agility'] },
      { name: 'Centiskorch', apiName: 'centiskorch', level: 27, moves: ['Flame Wheel', 'Coil', 'Bug Bite', 'Smokescreen'], gigantamax: true }
    ]
  },
  {
    number: 4,
    gymName: 'Stow-on-Side Gym',
    leader: 'Bea',
    location: 'Stow-on-Side',
    specialty: 'Fighting-type',
    specialtyType: 'fighting',
    team: [
      { name: 'Hitmontop', apiName: 'hitmontop', level: 34, moves: ['Triple Kick', 'Quick Attack', 'Counter', 'Revenge'] },
      { name: 'Pangoro', apiName: 'pangoro', level: 34, moves: ['Bullet Punch', 'Circle Throw', 'Night Slash', 'Work Up'] },
      { name: "Sirfetch'd", apiName: 'sirfetchd', level: 35, moves: ['Detect', 'Swords Dance', 'Brutal Swing', 'Revenge'] },
      { name: 'Machamp', apiName: 'machamp', level: 36, moves: ['Scary Face', 'Revenge', 'Knock Off', 'Strength'], gigantamax: true }
    ]
  },
  {
    number: 5,
    gymName: 'Ballonlea Gym',
    leader: 'Opal',
    location: 'Ballonlea',
    specialty: 'Fairy-type',
    specialtyType: 'fairy',
    team: [
      { name: 'Weezing', apiName: 'weezing-galar', level: 36, moves: ['Sludge', 'Fairy Wind', 'Tackle'] },
      { name: 'Mawile', apiName: 'mawile', level: 36, moves: ['Draining Kiss', 'Crunch', 'Iron Defense', 'Astonish'] },
      { name: 'Togekiss', apiName: 'togekiss', level: 37, moves: ['Air Slash', 'Draining Kiss', 'Ancient Power'] },
      { name: 'Alcremie', apiName: 'alcremie', level: 38, moves: ['Draining Kiss', 'Acid Armor', 'Sweet Kiss'], gigantamax: true }
    ]
  },
  {
    number: 6,
    gymName: 'Circhester Gym',
    leader: 'Gordie',
    location: 'Circhester',
    specialty: 'Rock-type',
    specialtyType: 'rock',
    team: [
      { name: 'Barbaracle', apiName: 'barbaracle', level: 40, moves: ['Shell Smash', 'Rock Tomb', 'Razor Shell'] },
      { name: 'Shuckle', apiName: 'shuckle', level: 40, moves: ['Power Split', 'Stone Edge', 'Struggle Bug', 'Rock Tomb'] },
      { name: 'Stonjourner', apiName: 'stonjourner', level: 41, moves: ['Stealth Rock', 'Rock Tomb', 'Body Slam', 'Wonder Room'] },
      { name: 'Coalossal', apiName: 'coalossal', level: 42, moves: ['Tar Shot', 'Stealth Rock', 'Heat Crash', 'Rock Tomb'], gigantamax: true }
    ]
  },
  {
    number: 7,
    gymName: 'Spikemuth Gym',
    leader: 'Piers',
    location: 'Spikemuth',
    specialty: 'Dark-type',
    specialtyType: 'dark',
    team: [
      { name: 'Scrafty', apiName: 'scrafty', level: 44, moves: ['Fake Out', 'Sand Attack', 'Brick Break', 'Payback'] },
      { name: 'Malamar', apiName: 'malamar', level: 45, moves: ['Night Slash', 'Foul Play', 'Psycho Cut', 'Payback'] },
      { name: 'Skuntank', apiName: 'skuntank', level: 45, moves: ['Sucker Punch', 'Screech', 'Toxic', 'Snarl'] },
      { name: 'Obstagoon', apiName: 'obstagoon', level: 46, moves: ['Obstruct', 'Throat Chop', 'Counter', 'Shadow Claw'] }
    ]
  },
  {
    number: 8,
    gymName: 'Hammerlocke Gym',
    leader: 'Raihan',
    location: 'Hammerlocke',
    specialty: 'Dragon-type',
    specialtyType: 'dragon',
    battleType: 'Double Battle',
    team: [
      { name: 'Gigalith', apiName: 'gigalith', level: 46, moves: ['Stealth Rock', 'Sand Tomb', 'Rock Blast', 'Body Press'] },
      { name: 'Flygon', apiName: 'flygon', level: 47, moves: ['Thunder Punch', 'Breaking Swipe', 'Crunch', 'Steel Wing'] },
      { name: 'Sandaconda', apiName: 'sandaconda', level: 46, moves: ['Protect', 'Glare', 'Fire Fang', 'Earth Power'] },
      { name: 'Duraludon', apiName: 'duraludon', level: 48, moves: ['Breaking Swipe', 'Body Press', 'Stone Edge', 'Iron Head'], gigantamax: true }
    ]
  }
]

const shieldGyms = [
  {
    number: 1,
    gymName: 'Turffield Gym',
    leader: 'Milo',
    location: 'Turffield',
    specialty: 'Grass-type',
    specialtyType: 'grass',
    team: [
      { name: 'Gossifleur', apiName: 'gossifleur', level: 19, moves: ['Magical Leaf', 'Round', 'Rapid Spin'] },
      { name: 'Eldegoss', apiName: 'eldegoss', level: 20, moves: ['Magical Leaf', 'Leafage', 'Round'] }
    ]
  },
  {
    number: 2,
    gymName: 'Hulbury Gym',
    leader: 'Nessa',
    location: 'Hulbury',
    specialty: 'Water-type',
    specialtyType: 'water',
    team: [
      { name: 'Goldeen', apiName: 'goldeen', level: 22, moves: ['Water Pulse', 'Whirlpool', 'Horn Attack', 'Agility'] },
      { name: 'Arrokuda', apiName: 'arrokuda', level: 23, moves: ['Aqua Jet', 'Bite', 'Whirlpool', 'Fury Attack'] },
      { name: 'Drednaw', apiName: 'drednaw', level: 24, moves: ['Razor Shell', 'Water Gun', 'Bite', 'Headbutt'] }
    ]
  },
  {
    number: 3,
    gymName: 'Motostoke Gym',
    leader: 'Kabu',
    location: 'Motostoke',
    specialty: 'Fire-type',
    specialtyType: 'fire',
    team: [
      { name: 'Ninetales', apiName: 'ninetales', level: 25, moves: ['Will-O-Wisp', 'Fire Spin', 'Quick Attack', 'Ember'] },
      { name: 'Arcanine', apiName: 'arcanine', level: 25, moves: ['Will-O-Wisp', 'Flame Wheel', 'Bite', 'Agility'] },
      { name: 'Centiskorch', apiName: 'centiskorch', level: 27, moves: ['Flame Wheel', 'Coil', 'Bug Bite', 'Smokescreen'] }
    ]
  },
  {
    number: 4,
    gymName: 'Stow-on-Side Gym',
    leader: 'Allister',
    location: 'Stow-on-Side',
    specialty: 'Ghost-type',
    specialtyType: 'ghost',
    team: [
      { name: 'Yamask', apiName: 'yamask-galar', level: 34, moves: ['Brutal Swing', 'Hex', 'Disable'] },
      { name: 'Mimikyu', apiName: 'mimikyu-disguised', level: 34, moves: ['Shadow Sneak', 'Baby-Doll Eyes', 'Hone Claws', 'Slash'] },
      { name: 'Cursola', apiName: 'cursola', level: 35, moves: ['Ancient Power', 'Curse', 'Hex'] },
      { name: 'Gengar', apiName: 'gengar', level: 36, moves: ['Venoshock', 'Hex', 'Hypnosis', 'Payback'], gigantamax: true }
    ]
  },
  {
    number: 5,
    gymName: 'Ballonlea Gym',
    leader: 'Opal',
    location: 'Ballonlea',
    specialty: 'Fairy-type',
    specialtyType: 'fairy',
    team: [
      { name: 'Weezing', apiName: 'weezing-galar', level: 36, moves: ['Sludge', 'Fairy Wind', 'Tackle'] },
      { name: 'Mawile', apiName: 'mawile', level: 36, moves: ['Draining Kiss', 'Crunch', 'Iron Defense', 'Astonish'] },
      { name: 'Togekiss', apiName: 'togekiss', level: 37, moves: ['Air Slash', 'Draining Kiss', 'Ancient Power'] },
      { name: 'Alcremie', apiName: 'alcremie', level: 38, moves: ['Draining Kiss', 'Acid Armor', 'Sweet Kiss'], gigantamax: true }
    ]
  },
  {
    number: 6,
    gymName: 'Circhester Gym',
    leader: 'Melony',
    location: 'Circhester',
    specialty: 'Ice-type',
    specialtyType: 'ice',
    team: [
      { name: 'Frosmoth', apiName: 'frosmoth', level: 40, moves: ['Icy Wind', 'Feather Dance', 'Bug Buzz', 'Hail'] },
      { name: 'Darmanitan', apiName: 'darmanitan-galar-standard', level: 40, moves: ['Icicle Crash', 'Headbutt', 'Taunt', 'Fire Fang'] },
      { name: 'Eiscue', apiName: 'eiscue-ice', level: 41, moves: ['Amnesia', 'Freeze-Dry', 'Hail', 'Icy Wind'] },
      { name: 'Lapras', apiName: 'lapras', level: 42, moves: ['Icy Wind', 'Ice Beam', 'Surf', 'Sing'], gigantamax: true }
    ]
  },
  {
    number: 7,
    gymName: 'Spikemuth Gym',
    leader: 'Piers',
    location: 'Spikemuth',
    specialty: 'Dark-type',
    specialtyType: 'dark',
    team: [
      { name: 'Scrafty', apiName: 'scrafty', level: 44, moves: ['Fake Out', 'Sand Attack', 'Brick Break', 'Payback'] },
      { name: 'Malamar', apiName: 'malamar', level: 45, moves: ['Night Slash', 'Foul Play', 'Psycho Cut', 'Payback'] },
      { name: 'Skuntank', apiName: 'skuntank', level: 45, moves: ['Sucker Punch', 'Screech', 'Toxic', 'Snarl'] },
      { name: 'Obstagoon', apiName: 'obstagoon', level: 46, moves: ['Obstruct', 'Throat Chop', 'Counter', 'Shadow Claw'] }
    ]
  },
  {
    number: 8,
    gymName: 'Hammerlocke Gym',
    leader: 'Raihan',
    location: 'Hammerlocke',
    specialty: 'Dragon-type',
    specialtyType: 'dragon',
    battleType: 'Double Battle',
    team: [
      { name: 'Gigalith', apiName: 'gigalith', level: 46, moves: ['Stealth Rock', 'Sand Tomb', 'Rock Blast', 'Body Press'] },
      { name: 'Flygon', apiName: 'flygon', level: 47, moves: ['Thunder Punch', 'Breaking Swipe', 'Crunch', 'Steel Wing'] },
      { name: 'Sandaconda', apiName: 'sandaconda', level: 46, moves: ['Protect', 'Glare', 'Fire Fang', 'Earth Power'] },
      { name: 'Duraludon', apiName: 'duraludon', level: 48, moves: ['Breaking Swipe', 'Body Press', 'Stone Edge', 'Iron Head'], gigantamax: true }
    ]
  }
]

const swordShieldGyms = [
  ...swordGyms.slice(0, 3),
  swordGyms[3],
  shieldGyms[3],
  swordGyms[4],
  swordGyms[5],
  shieldGyms[5],
  ...swordGyms.slice(6)
]

const brilliantDiamondAndShiningPearlGyms = [
  {
    number: 1,
    gymName: 'Oreburgh City Gym',
    leader: 'Roark',
    location: 'Oreburgh City',
    specialty: 'Rock-type',
    specialtyType: 'rock',
    team: [
      { name: 'Geodude', apiName: 'geodude', level: 12, moves: ['Stealth Rock', 'Defense Curl', 'Rollout'] },
      { name: 'Onix', apiName: 'onix', level: 12, moves: ['Stealth Rock', 'Rock Throw', 'Bind'] },
      { name: 'Cranidos', apiName: 'cranidos', level: 14, moves: ['Headbutt', 'Bulldoze', 'Leer'] }
    ]
  },
  {
    number: 2,
    gymName: 'Eterna City Gym',
    leader: 'Gardenia',
    location: 'Eterna City',
    specialty: 'Grass-type',
    specialtyType: 'grass',
    team: [
      { name: 'Cherubi', apiName: 'cherubi', level: 19, moves: ['Grass Knot', 'Growth', 'Dazzling Gleam', 'Safeguard'] },
      { name: 'Turtwig', apiName: 'turtwig', level: 19, moves: ['Grass Knot', 'Razor Leaf', 'Reflect', 'Work Up'] },
      { name: 'Roserade', apiName: 'roserade', level: 22, moves: ['Grass Knot', 'Petal Blizzard', 'Poison Sting', 'Stun Spore'] }
    ]
  },
  {
    number: 3,
    gymName: 'Veilstone City Gym',
    leader: 'Maylene',
    location: 'Veilstone City',
    specialty: 'Fighting-type',
    specialtyType: 'fighting',
    team: [
      { name: 'Meditite', apiName: 'meditite', level: 27, moves: ['Drain Punch', 'Light Screen', 'Flash', 'Bulk Up'] },
      { name: 'Machoke', apiName: 'machoke', level: 27, moves: ['Low Sweep', 'Knock Off', 'Rock Tomb', 'Bulldoze'] },
      { name: 'Lucario', apiName: 'lucario', level: 30, moves: ['Drain Punch', 'Screech', 'Metal Claw', 'Bulk Up'] }
    ]
  },
  {
    number: 4,
    gymName: 'Pastoria City Gym',
    leader: 'Crasher Wake',
    location: 'Pastoria City',
    specialty: 'Water-type',
    specialtyType: 'water',
    team: [
      { name: 'Gyarados', apiName: 'gyarados', level: 27, moves: ['Brine', 'Ice Fang', 'Crunch', 'Flail'] },
      { name: 'Quagsire', apiName: 'quagsire', level: 27, moves: ['Rain Dance', 'Haze', 'Mud Shot', 'Scald'] },
      { name: 'Floatzel', apiName: 'floatzel', level: 30, moves: ['Brine', 'Ice Fang', 'Bite', 'Aqua Jet'] }
    ]
  },
  {
    number: 5,
    gymName: 'Hearthome City Gym',
    leader: 'Fantina',
    location: 'Hearthome City',
    specialty: 'Ghost-type',
    specialtyType: 'ghost',
    team: [
      { name: 'Drifblim', apiName: 'drifblim', level: 32, moves: ['Strength Sap', 'Hex', 'Fly', 'Will-O-Wisp'] },
      { name: 'Gengar', apiName: 'gengar', level: 34, moves: ['Shadow Claw', 'Confuse Ray', 'Sludge Bomb', 'Dazzling Gleam'] },
      { name: 'Mismagius', apiName: 'mismagius', level: 36, moves: ['Confuse Ray', 'Phantom Force', 'Magical Leaf', 'Dazzling Gleam'] }
    ]
  },
  {
    number: 6,
    gymName: 'Canalave City Gym',
    leader: 'Byron',
    location: 'Canalave City',
    specialty: 'Steel-type',
    specialtyType: 'steel',
    team: [
      { name: 'Bronzor', apiName: 'bronzor', level: 36, moves: ['Confuse Ray', 'Sandstorm', 'Trick Room', 'Flash Cannon'] },
      { name: 'Steelix', apiName: 'steelix', level: 36, moves: ['Thunder Fang', 'Earthquake', 'Sandstorm', 'Gyro Ball'] },
      { name: 'Bastiodon', apiName: 'bastiodon', level: 39, moves: ['Iron Defense', 'Thunderbolt', 'Stone Edge', 'Flash Cannon'] }
    ]
  },
  {
    number: 7,
    gymName: 'Snowpoint City Gym',
    leader: 'Candice',
    location: 'Snowpoint City',
    specialty: 'Ice-type',
    specialtyType: 'ice',
    team: [
      { name: 'Snover', apiName: 'snover', level: 38, moves: ['Mist', 'Razor Leaf', 'Water Pulse', 'Avalanche'] },
      { name: 'Sneasel', apiName: 'sneasel', level: 38, moves: ['Metal Claw', 'Hone Claws', 'Dig', 'Avalanche'] },
      { name: 'Medicham', apiName: 'medicham', level: 40, moves: ['Ice Punch', 'Bulk Up', 'Brick Break', 'Rock Slide'] },
      { name: 'Abomasnow', apiName: 'abomasnow', level: 42, moves: ['Aurora Veil', 'Giga Drain', 'Earthquake', 'Blizzard'] }
    ]
  },
  {
    number: 8,
    gymName: 'Sunyshore City Gym',
    leader: 'Volkner',
    location: 'Sunyshore City',
    specialty: 'Electric-type',
    specialtyType: 'electric',
    team: [
      { name: 'Raichu', apiName: 'raichu', level: 46, moves: ['Nuzzle', 'Volt Switch', 'Surf', 'Charge Beam'] },
      { name: 'Ambipom', apiName: 'ambipom', level: 47, moves: ['Fake Out', 'Thunderbolt', 'Double Hit', 'Last Resort'] },
      { name: 'Octillery', apiName: 'octillery', level: 47, moves: ['Octazooka', 'Focus Energy', 'Aurora Beam', 'Charge Beam'] },
      { name: 'Luxray', apiName: 'luxray', level: 49, moves: ['Thunder Fang', 'Ice Fang', 'Crunch', 'Iron Tail'] }
    ]
  }
]

const scarletVioletGyms = [
  {
    number: 1,
    gymName: 'Cortondo Gym',
    leader: 'Katy',
    location: 'Cortondo',
    specialty: 'Bug-type',
    specialtyType: 'bug',
    team: [
      { name: 'Nymble', apiName: 'nymble', level: 14, moves: ['Struggle Bug', 'Double Kick'] },
      { name: 'Tarountula', apiName: 'tarountula', level: 14, moves: ['Bug Bite', 'Assurance'] },
      { name: 'Teddiursa', apiName: 'teddiursa', level: 15, moves: ['Fury Cutter', 'Fury Swipes'], teraType: 'bug' }
    ]
  },
  {
    number: 2,
    gymName: 'Artazon Gym',
    leader: 'Brassius',
    location: 'Artazon',
    specialty: 'Grass-type',
    specialtyType: 'grass',
    team: [
      { name: 'Petilil', apiName: 'petilil', level: 16, moves: ['Sleep Powder', 'Mega Drain'] },
      { name: 'Smoliv', apiName: 'smoliv', level: 16, moves: ['Tackle', 'Razor Leaf'] },
      { name: 'Sudowoodo', apiName: 'sudowoodo', level: 17, moves: ['Trailblaze', 'Rock Throw'], teraType: 'grass' }
    ]
  },
  {
    number: 3,
    gymName: 'Levincia Gym',
    leader: 'Iono',
    location: 'Levincia',
    specialty: 'Electric-type',
    specialtyType: 'electric',
    team: [
      { name: 'Wattrel', apiName: 'wattrel', level: 23, moves: ['Pluck', 'Quick Attack', 'Spark'] },
      { name: 'Bellibolt', apiName: 'bellibolt', level: 23, moves: ['Water Gun', 'Spark'] },
      { name: 'Luxio', apiName: 'luxio', level: 23, moves: ['Spark', 'Bite'] },
      { name: 'Mismagius', apiName: 'mismagius', level: 24, moves: ['Charge Beam', 'Hex', 'Confuse Ray'], teraType: 'electric' }
    ]
  },
  {
    number: 4,
    gymName: 'Cascarrafa Gym',
    leader: 'Kofu',
    location: 'Cascarrafa',
    specialty: 'Water-type',
    specialtyType: 'water',
    team: [
      { name: 'Veluza', apiName: 'veluza', level: 29, moves: ['Slash', 'Pluck', 'Aqua Cutter'] },
      { name: 'Wugtrio', apiName: 'wugtrio', level: 29, moves: ['Mud-Slap', 'Water Pulse', 'Headbutt'] },
      { name: 'Crabominable', apiName: 'crabominable', level: 30, moves: ['Crabhammer', 'Rock Smash', 'Slam'], teraType: 'water' }
    ]
  },
  {
    number: 5,
    gymName: 'Medali Gym',
    leader: 'Larry',
    location: 'Medali',
    specialty: 'Normal-type',
    specialtyType: 'normal',
    team: [
      { name: 'Komala', apiName: 'komala', level: 35, moves: ['Yawn', 'Sucker Punch', 'Slam'] },
      { name: 'Dudunsparce', apiName: 'dudunsparce-two-segment', level: 35, moves: ['Hyper Drill', 'Drill Run', 'Glare'] },
      { name: 'Staraptor', apiName: 'staraptor', level: 36, moves: ['Facade', 'Aerial Ace'], teraType: 'normal' }
    ]
  },
  {
    number: 6,
    gymName: 'Montenevera Gym',
    leader: 'Ryme',
    location: 'Montenevera',
    specialty: 'Ghost-type',
    specialtyType: 'ghost',
    battleType: 'Double Battle',
    team: [
      { name: 'Banette', apiName: 'banette', level: 41, moves: ['Icy Wind', 'Sucker Punch', 'Shadow Sneak'] },
      { name: 'Mimikyu', apiName: 'mimikyu-disguised', level: 41, moves: ['Light Screen', 'Shadow Sneak', 'Slash'] },
      { name: 'Houndstone', apiName: 'houndstone', level: 41, moves: ['Play Rough', 'Crunch', 'Phantom Force'] },
      { name: 'Toxtricity', apiName: 'toxtricity-amped', level: 42, moves: ['Discharge', 'Hex', 'Hyper Voice'], teraType: 'ghost' }
    ]
  },
  {
    number: 7,
    gymName: 'Alfornada Gym',
    leader: 'Tulip',
    location: 'Alfornada',
    specialty: 'Psychic-type',
    specialtyType: 'psychic',
    team: [
      { name: 'Farigiraf', apiName: 'farigiraf', level: 44, moves: ['Crunch', 'Zen Headbutt', 'Reflect'] },
      { name: 'Gardevoir', apiName: 'gardevoir', level: 44, moves: ['Psychic', 'Dazzling Gleam', 'Energy Ball'] },
      { name: 'Espathra', apiName: 'espathra', level: 44, moves: ['Psychic', 'Quick Attack', 'Shadow Ball'] },
      { name: 'Florges', apiName: 'florges', level: 45, moves: ['Psychic', 'Moonblast', 'Petal Blizzard'], teraType: 'psychic' }
    ]
  },
  {
    number: 8,
    gymName: 'Glaseado Gym',
    leader: 'Grusha',
    location: 'Glaseado',
    specialty: 'Ice-type',
    specialtyType: 'ice',
    team: [
      { name: 'Frosmoth', apiName: 'frosmoth', level: 47, moves: ['Blizzard', 'Bug Buzz', 'Tailwind'] },
      { name: 'Beartic', apiName: 'beartic', level: 47, moves: ['Aqua Jet', 'Icicle Crash', 'Earthquake'] },
      { name: 'Cetitan', apiName: 'cetitan', level: 47, moves: ['Ice Spinner', 'Liquidation', 'Ice Shard'] },
      { name: 'Altaria', apiName: 'altaria', level: 48, moves: ['Ice Beam', 'Dragon Pulse', 'Moonblast', 'Hurricane'], teraType: 'ice' }
    ]
  }
]

export const gymLeaderGames = [
  {
    key: 'red-blue',
    name: 'Red/Blue',
    gameKeys: ['red', 'blue'],
    region: 'Kanto',
    sourceUrl: 'https://www.serebii.net/rb/gyms.shtml'
  },
  {
    key: 'yellow',
    name: 'Yellow',
    gameKeys: ['yellow'],
    region: 'Kanto',
    sourceUrl: 'https://www.serebii.net/yellow/gyms.shtml'
  },
  {
    key: 'gold-silver',
    name: 'Gold/Silver',
    gameKeys: ['gold', 'silver'],
    region: 'Johto/Kanto',
    sourceUrl: 'https://www.serebii.net/gs/gyms.shtml'
  },
  {
    key: 'crystal',
    name: 'Crystal',
    gameKeys: ['crystal'],
    region: 'Johto/Kanto',
    sourceUrl: 'user-supplied text'
  },
  {
    key: 'ruby-sapphire',
    name: 'Ruby/Sapphire',
    gameKeys: ['ruby', 'sapphire'],
    region: 'Hoenn',
    sourceUrl: 'user-supplied text'
  },
  {
    key: 'fire-red-leaf-green',
    name: 'FireRed/LeafGreen',
    gameKeys: ['fire-red', 'leaf-green'],
    region: 'Kanto',
    sourceUrl: 'user-supplied text'
  },
  {
    key: 'emerald',
    name: 'Emerald',
    gameKeys: ['emerald'],
    region: 'Hoenn',
    sourceUrl: 'user-supplied text'
  },
  {
    key: 'diamond-pearl',
    name: 'Diamond/Pearl',
    gameKeys: ['diamond', 'pearl'],
    region: 'Sinnoh',
    sourceUrl: 'user-supplied text'
  },
  {
    key: 'heartgold-soulsilver',
    name: 'HeartGold/SoulSilver',
    gameKeys: ['heart-gold', 'soul-silver'],
    region: 'Johto/Kanto',
    sourceUrl: 'user-supplied text'
  },
  {
    key: 'platinum',
    name: 'Platinum',
    gameKeys: ['platinum'],
    region: 'Sinnoh',
    sourceUrl: 'user-supplied text'
  },
  {
    key: 'black',
    name: 'Black',
    gameKeys: ['black'],
    region: 'Unova',
    sourceUrl: 'user-supplied text'
  },
  {
    key: 'white',
    name: 'White',
    gameKeys: ['white'],
    region: 'Unova',
    sourceUrl: 'user-supplied text'
  },
  {
    key: 'x-y',
    name: 'X/Y',
    gameKeys: ['x', 'y'],
    region: 'Kalos',
    sourceUrl: 'user-supplied text'
  },
  {
    key: 'omega-ruby-alpha-sapphire',
    name: 'Omega Ruby/Alpha Sapphire',
    gameKeys: ['omega-ruby', 'alpha-sapphire'],
    region: 'Hoenn',
    sourceUrl: 'user-supplied text'
  },
  {
    key: 'sun',
    name: 'Sun',
    gameKeys: ['sun'],
    region: 'Alola',
    sourceUrl: 'user-supplied text'
  },
  {
    key: 'moon',
    name: 'Moon',
    gameKeys: ['moon'],
    region: 'Alola',
    sourceUrl: 'user-supplied text'
  },
  {
    key: 'ultra-sun',
    name: 'Ultra Sun',
    gameKeys: ['ultra-sun'],
    region: 'Alola',
    sourceUrl: 'user-supplied text'
  },
  {
    key: 'ultra-moon',
    name: 'Ultra Moon',
    gameKeys: ['ultra-moon'],
    region: 'Alola',
    sourceUrl: 'user-supplied text'
  },
  {
    key: 'lets-go-pikachu-lets-go-eevee',
    name: "Let's Go Pikachu/Let's Go Eevee",
    gameKeys: ['let-s-go-pikachu', 'let-s-go-eevee'],
    region: 'Kanto',
    sourceUrl: 'user-supplied text'
  },
  {
    key: 'sword-shield',
    name: 'Sword/Shield',
    gameKeys: ['sword', 'shield'],
    region: 'Galar',
    sourceUrl: 'user-supplied text'
  },
  {
    key: 'sword',
    name: 'Sword',
    gameKeys: ['sword'],
    region: 'Galar',
    sourceUrl: 'user-supplied text'
  },
  {
    key: 'shield',
    name: 'Shield',
    gameKeys: ['shield'],
    region: 'Galar',
    sourceUrl: 'user-supplied text'
  },
  {
    key: 'brilliant-diamond-and-shining-pearl',
    name: 'Brilliant Diamond/Shining Pearl',
    gameKeys: ['brilliant-diamond', 'shining-pearl'],
    region: 'Sinnoh',
    sourceUrl: 'user-supplied text'
  },
  {
    key: 'scarlet-violet',
    name: 'Scarlet/Violet',
    gameKeys: ['scarlet', 'violet'],
    region: 'Paldea',
    sourceUrl: 'user-supplied text'
  }
]

export const gymLeaderGameGroupByGameKey = {
  red: 'red-blue',
  blue: 'red-blue',
  yellow: 'yellow',
  gold: 'gold-silver',
  silver: 'gold-silver',
  crystal: 'crystal',
  ruby: 'ruby-sapphire',
  sapphire: 'ruby-sapphire',
  'fire-red': 'fire-red-leaf-green',
  'leaf-green': 'fire-red-leaf-green',
  emerald: 'emerald',
  diamond: 'diamond-pearl',
  pearl: 'diamond-pearl',
  'heart-gold': 'heartgold-soulsilver',
  'soul-silver': 'heartgold-soulsilver',
  platinum: 'platinum',
  black: 'black',
  white: 'white',
  x: 'x-y',
  y: 'x-y',
  'omega-ruby': 'omega-ruby-alpha-sapphire',
  'alpha-sapphire': 'omega-ruby-alpha-sapphire',
  sun: 'sun',
  moon: 'moon',
  'ultra-sun': 'ultra-sun',
  'ultra-moon': 'ultra-moon',
  'let-s-go-pikachu': 'lets-go-pikachu-lets-go-eevee',
  'let-s-go-eevee': 'lets-go-pikachu-lets-go-eevee',
  sword: 'sword',
  shield: 'shield',
  'brilliant-diamond': 'brilliant-diamond-and-shining-pearl',
  'shining-pearl': 'brilliant-diamond-and-shining-pearl',
  scarlet: 'scarlet-violet',
  violet: 'scarlet-violet'
}

export const gymLeadersByGame = {
  'red-blue': redBlueGyms,
  yellow: yellowGyms,
  'gold-silver': goldSilverGyms,
  crystal: crystalGyms,
  'ruby-sapphire': rubySapphireGyms,
  'fire-red-leaf-green': fireRedLeafGreenGyms,
  emerald: emeraldGyms,
  'diamond-pearl': diamondPearlGyms,
  'heartgold-soulsilver': heartGoldSoulSilverGyms,
  platinum: platinumGyms,
  black: blackGyms,
  white: whiteGyms,
  'x-y': xYGyms,
  'omega-ruby-alpha-sapphire': omegaRubyAlphaSapphireGyms,
  sun: sunGyms,
  moon: moonGyms,
  'ultra-sun': ultraSunGyms,
  'ultra-moon': ultraMoonGyms,
  'lets-go-pikachu-lets-go-eevee': letsGoPikachuLetsGoEeveeGyms,
  'sword-shield': swordShieldGyms,
  sword: swordGyms,
  shield: shieldGyms,
  'brilliant-diamond-and-shining-pearl': brilliantDiamondAndShiningPearlGyms,
  'scarlet-violet': scarletVioletGyms
}
