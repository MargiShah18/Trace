export const IDENTITY_TYPES = [
  {
    id: 'builder',
    label: 'Builder',
    emoji: '🔨',
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
    glow: 'rgba(245, 158, 11, 0.35)',
  },
  {
    id: 'connector',
    label: 'Connector',
    emoji: '🤝',
    color: '#ec4899',
    gradient: 'linear-gradient(135deg, #ec4899, #db2777)',
    glow: 'rgba(236, 72, 153, 0.35)',
  },
  {
    id: 'thinker',
    label: 'Thinker',
    emoji: '🧠',
    color: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
    glow: 'rgba(139, 92, 246, 0.35)',
  },
  {
    id: 'creator',
    label: 'Creator',
    emoji: '✨',
    color: '#06b6d4',
    gradient: 'linear-gradient(135deg, #06b6d4, #0891b2)',
    glow: 'rgba(6, 182, 212, 0.35)',
  },
  {
    id: 'maverick',
    label: 'Maverick',
    emoji: '⚡',
    color: '#ef4444',
    gradient: 'linear-gradient(135deg, #ef4444, #dc2626)',
    glow: 'rgba(239, 68, 68, 0.35)',
  },
  {
    id: 'anchor',
    label: 'Anchor',
    emoji: '⚓',
    color: '#22c55e',
    gradient: 'linear-gradient(135deg, #22c55e, #16a34a)',
    glow: 'rgba(34, 197, 94, 0.35)',
  },
]

export function getType(id) {
  return IDENTITY_TYPES.find((t) => t.id === id) || IDENTITY_TYPES[0]
}
