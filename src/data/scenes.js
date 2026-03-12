export const SCENES = [
  {
    id: 1,
    time: '8:47am',
    location: 'Your kitchen',
    narrative:
      'The morning is yours. No meetings until noon, no one expecting anything from you. Your coffee is still warm. There\'s a half-finished project from last week, a book you\'ve been meaning to start, and a friend who texted "call me when you\'re free" late last night. The silence feels rare.',
    choices: [
      {
        text: 'I make a list and pick the most important thing.',
        scores: { ownership: 2, expression: 0, adaptability: 0, depth: 1 },
      },
      {
        text: 'I call my friend back first — they reached out for a reason.',
        scores: { ownership: 0, expression: 1, adaptability: 1, depth: 0 },
      },
      {
        text: 'I do whatever I feel pulled toward. Structure can wait.',
        scores: { ownership: 0, expression: 2, adaptability: 1, depth: 0 },
      },
      {
        text: 'I sit with the coffee a bit longer. No rush to fill the space.',
        scores: { ownership: 0, expression: 0, adaptability: 1, depth: 2 },
      },
    ],
  },
  {
    id: 2,
    time: '2:15pm',
    location: 'A shared workspace',
    narrative:
      'A friend messages you. They\'re in over their head with something and could really use a hand — today, ideally right now. You\'re already behind on your own work. Your to-do list stares at you from the corner of your screen. You can feel the tug in both directions.',
    choices: [
      {
        text: 'I drop what I\'m doing and help. My stuff can wait.',
        scores: { ownership: 0, expression: 2, adaptability: 1, depth: 0 },
      },
      {
        text: 'I help, but I set a boundary — one hour, then I\'m back to mine.',
        scores: { ownership: 2, expression: 1, adaptability: 0, depth: 0 },
      },
      {
        text: 'I ask what they need first. Maybe I can help without derailing my day.',
        scores: { ownership: 1, expression: 0, adaptability: 2, depth: 0 },
      },
      {
        text: 'I say I can\'t right now, but I\'ll be there tonight. Honesty over guilt.',
        scores: { ownership: 1, expression: 0, adaptability: 0, depth: 2 },
      },
    ],
  },
  {
    id: 3,
    time: '6:30pm',
    location: 'Walking home',
    narrative:
      'You did something genuinely good today. Built something, helped someone, made a call that mattered. But no one saw it. No praise, no acknowledgment. The sky is turning orange and you\'re replaying it in your head — was it enough? Does it count if nobody knows?',
    choices: [
      {
        text: 'I know it was good. That\'s enough for me.',
        scores: { ownership: 1, expression: 0, adaptability: 0, depth: 2 },
      },
      {
        text: 'I tell someone about it. Not for validation — just to share.',
        scores: { ownership: 0, expression: 2, adaptability: 0, depth: 1 },
      },
      {
        text: 'I write it down somewhere. A record matters, even if only for me.',
        scores: { ownership: 2, expression: 0, adaptability: 0, depth: 1 },
      },
      {
        text: 'I let it go. Tomorrow has its own wins.',
        scores: { ownership: 0, expression: 0, adaptability: 2, depth: 1 },
      },
    ],
  },
  {
    id: 4,
    time: '11:10am',
    location: 'Your desk',
    narrative:
      'You\'re midway through a project you were excited about. But the energy is gone. It doesn\'t feel wrong exactly — just... off. Like the thing you\'re building doesn\'t match the thing you imagined. You could push through. You could scrap it. You could take a walk and pretend you didn\'t notice.',
    choices: [
      {
        text: 'I push through. Finishing teaches you more than starting over.',
        scores: { ownership: 2, expression: 0, adaptability: 0, depth: 1 },
      },
      {
        text: 'I step back and rethink. The vision matters more than the plan.',
        scores: { ownership: 0, expression: 0, adaptability: 2, depth: 1 },
      },
      {
        text: 'I talk to someone about it. A fresh perspective might reframe everything.',
        scores: { ownership: 0, expression: 2, adaptability: 1, depth: 0 },
      },
      {
        text: 'I sit with the discomfort. Sometimes the "off" feeling is the insight.',
        scores: { ownership: 0, expression: 0, adaptability: 0, depth: 2 },
      },
    ],
  },
  {
    id: 5,
    time: '3:40pm',
    location: 'A group conversation',
    narrative:
      'Someone you respect disagrees with you — publicly, firmly, in front of people whose opinions you value. They\'re not being cruel, just direct. You believe you\'re right, but the room has shifted. Everyone is looking at you. Your pulse quickens.',
    choices: [
      {
        text: 'I hold my ground. I believe this and I\'ll defend it clearly.',
        scores: { ownership: 2, expression: 1, adaptability: 0, depth: 0 },
      },
      {
        text: 'I ask them to explain more. Maybe I\'m missing something.',
        scores: { ownership: 0, expression: 0, adaptability: 2, depth: 1 },
      },
      {
        text: 'I acknowledge the tension and suggest we take it offline.',
        scores: { ownership: 0, expression: 1, adaptability: 1, depth: 1 },
      },
      {
        text: 'I go quiet and think about it. My response doesn\'t have to be instant.',
        scores: { ownership: 0, expression: 0, adaptability: 0, depth: 2 },
      },
    ],
  },
  {
    id: 6,
    time: '11:58pm',
    location: 'Your room, lights low',
    narrative:
      'It\'s late. You\'ve been working on something and "done" keeps shifting. Each fix reveals another flaw. You could ship it now — imperfect, but real. You could stay up and chase the version in your head. Or you could close the laptop and trust that tomorrow-you will know what to do.',
    choices: [
      {
        text: 'I ship it. Done is better than perfect.',
        scores: { ownership: 2, expression: 0, adaptability: 1, depth: 0 },
      },
      {
        text: 'I stay up. I\'m close and I\'ll regret stopping now.',
        scores: { ownership: 1, expression: 0, adaptability: 0, depth: 2 },
      },
      {
        text: 'I close the laptop. Rest is part of the work.',
        scores: { ownership: 0, expression: 0, adaptability: 2, depth: 1 },
      },
      {
        text: 'I share what I have with someone. Let their eyes see what mine can\'t.',
        scores: { ownership: 0, expression: 2, adaptability: 1, depth: 0 },
      },
    ],
  },
]
