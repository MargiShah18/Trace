import { getArchetype } from '../data/archetypes'

const DIMENSIONS = ['ownership', 'expression', 'adaptability', 'depth']

const DIMENSION_LABELS = {
  ownership: 'Ownership',
  expression: 'Expression',
  adaptability: 'Adaptability',
  depth: 'Depth',
}

export function deriveCard(scores) {
  const ranked = DIMENSIONS
    .map((dim) => ({ dim, score: scores[dim] || 0 }))
    .sort((a, b) => b.score - a.score)

  const top1 = ranked[0].dim
  const top2 = ranked[1].dim

  const archetype = getArchetype(top1, top2)

  const maxPossible = 12
  const totalScore = DIMENSIONS.reduce((sum, d) => sum + (scores[d] || 0), 0)
  const level = Math.max(1, Math.min(99, Math.round((totalScore / (maxPossible * 4)) * 99)))

  const traits = DIMENSIONS.map((dim) => ({
    label: DIMENSION_LABELS[dim],
    value: Math.max(5, Math.min(100, Math.round(((scores[dim] || 0) / maxPossible) * 100))),
  }))

  return {
    name: archetype.name,
    title: archetype.tagline,
    avatar: archetype.emoji,
    level,
    type: archetype.typeId,
    traits,
    moves: archetype.moves,
    flavor: archetype.flavor,
    rarity: archetype.rarity,
    archetype: {
      name: archetype.name,
      description: archetype.description,
      shadow: archetype.shadow,
    },
  }
}
