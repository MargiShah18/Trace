export const ARCHETYPES = {
  'ownership+depth': {
    name: 'The Quiet Architect',
    emoji: '🏛️',
    typeId: 'builder',
    tagline: 'Builds cathedrals in silence',
    description:
      'You don\'t need an audience to do meaningful work. You build with patience, hold yourself to a private standard, and trust that depth compounds over time.',
    shadow: 'Sometimes you build alone when you don\'t have to be.',
    moves: ['Finish what others abandon', 'Find the load-bearing truth'],
    flavor: 'The foundation no one sees is the one that holds everything up.',
    rarity: 'Rare',
  },
  'ownership+adaptability': {
    name: 'The Fixer',
    emoji: '🔧',
    typeId: 'maverick',
    tagline: 'Finds a way where there isn\'t one',
    description:
      'When the plan breaks, you don\'t freeze — you improvise. You take ownership not just of your work but of the gaps between everyone else\'s. You make things work.',
    shadow: 'You sometimes fix things that aren\'t yours to fix.',
    moves: ['Turn chaos into a checklist', 'Make the call no one else will'],
    flavor: 'Plans are guesses. Execution is truth.',
    rarity: 'Uncommon',
  },
  'ownership+expression': {
    name: 'The Standard Bearer',
    emoji: '🏴',
    typeId: 'anchor',
    tagline: 'Stands for something and says it out loud',
    description:
      'You don\'t just have convictions — you voice them. You take responsibility publicly and lead by example, even when the room is skeptical.',
    shadow: 'Your certainty can sometimes crowd out others\' input.',
    moves: ['Draw the line clearly', 'Speak first when it matters'],
    flavor: 'If you won\'t stand for it, don\'t expect anyone else to.',
    rarity: 'Epic',
  },
  'expression+depth': {
    name: 'The Resonator',
    emoji: '🔔',
    typeId: 'thinker',
    tagline: 'Feels deeply, then makes it make sense',
    description:
      'You process the world through feeling first, thinking second. You have a rare ability to sit with complexity and then translate it into something others can understand.',
    shadow: 'You can overthink what you feel until the feeling fades.',
    moves: ['Name the thing no one else will', 'Turn tension into insight'],
    flavor: 'Clarity isn\'t the absence of complexity — it\'s the other side of it.',
    rarity: 'Rare',
  },
  'expression+adaptability': {
    name: 'The Connector',
    emoji: '🌉',
    typeId: 'connector',
    tagline: 'Bridges gaps others don\'t see',
    description:
      'You read rooms, shift energy, and make people feel seen. You adapt to context without losing yourself, and you connect dots between people and ideas naturally.',
    shadow: 'You sometimes prioritize harmony over honesty.',
    moves: ['Introduce the right two people', 'Defuse without dismissing'],
    flavor: 'The bridge doesn\'t take sides. It just makes crossing possible.',
    rarity: 'Common',
  },
  'depth+adaptability': {
    name: 'The Navigator',
    emoji: '🧭',
    typeId: 'creator',
    tagline: 'Moves through uncertainty without losing the thread',
    description:
      'You don\'t need the full map to start walking. You hold your values close and let the path reveal itself, adjusting as you go without losing sight of what matters.',
    shadow: 'You sometimes mistake wandering for exploring.',
    moves: ['Find signal in noise', 'Adjust the compass, not the destination'],
    flavor: 'Not all who wander are lost — some are navigating by starlight.',
    rarity: 'Legendary',
  },
  'adaptability+expression': {
    name: 'The Catalyst',
    emoji: '⚗️',
    typeId: 'maverick',
    tagline: 'Makes things happen by making things change',
    description:
      'You\'re the spark. You sense when energy is stuck, shift the dynamic, and get people moving — not through force, but through sheer adaptability and presence.',
    shadow: 'You can get restless when things are calm.',
    moves: ['Reframe the stuck conversation', 'Move before the room is ready'],
    flavor: 'Momentum isn\'t given. It\'s started.',
    rarity: 'Epic',
  },
  'depth+ownership': {
    name: 'The Keeper',
    emoji: '🗝️',
    typeId: 'anchor',
    tagline: 'Protects what matters most',
    description:
      'You carry things — responsibilities, memories, promises — with a weight that others don\'t always see. Your sense of duty runs deep, and you don\'t let go easily.',
    shadow: 'You sometimes carry what isn\'t yours to hold.',
    moves: ['Remember what everyone else forgot', 'Hold the line when it bends'],
    flavor: 'Some things are worth keeping, even when they\'re heavy.',
    rarity: 'Uncommon',
  },
}

export function getArchetype(dim1, dim2) {
  const key1 = `${dim1}+${dim2}`
  const key2 = `${dim2}+${dim1}`
  return ARCHETYPES[key1] || ARCHETYPES[key2] || ARCHETYPES['depth+adaptability']
}
