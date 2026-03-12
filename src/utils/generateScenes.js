import { SCENES } from '../data/scenes'

function validate(scenes) {
  if (!Array.isArray(scenes) || scenes.length < 6) return SCENES
  const clean = scenes.map((scene) => ({
    ...scene,
    choices: (scene.choices || []).filter(
      (c) => c && typeof c.text === 'string' && c.text.trim() !== ''
    ),
  }))
  if (clean.some((s) => s.choices.length < 4)) return SCENES
  return clean
}

const PROMPT = `You are writing 6 short story scenes for a behavioral identity game. Each scene is a real-life micro-moment that reveals character through choice — not a quiz, a story. Return ONLY valid JSON array. No markdown, no backticks, no explanation. Format: [{"id":1,"time":"8:47am","location":"Your kitchen","narrative":"3-4 lines, second person present tense, atmospheric and specific, slightly literary","choices":[{"text":"I [action]","scores":{"ownership":0,"expression":0,"adaptability":0,"depth":0}}]}]. Rules: 6 scenes total. 4 choices per scene. Each score is 0, 1, or 2. All 4 choices per scene must feel equally valid — no obvious right answer. Scene themes must cover: unstructured morning freedom, helping someone when you're already overwhelmed, doing something great that nobody noticed, being midway through something that stops feeling right, someone you respect disagreeing with you publicly, late night and done keeps shifting. Never use the words trait score personality or quiz. Tone is slightly literary human never corporate.`

export async function generateScenes() {
  const key = import.meta.env.VITE_GEMINI_KEY

  if (!key || key === 'AIzaSy...') {
    console.warn('⚠️ No valid Gemini key — using fallback scenes')
    return SCENES
  }

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-lite-latest:generateContent?key=${key}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: PROMPT }] }],
        }),
      }
    )

    if (!res.ok) {
      const errBody = await res.text()
      console.error('❌ Gemini error:', res.status, errBody)
      throw new Error(`Gemini API error: ${res.status}`)
    }

    const data = await res.json()
    const text = data.candidates[0].content.parts[0].text
    const cleanText = text.replace(/```json|```/g, '').trim()
    const parsed = JSON.parse(cleanText)
    return validate(parsed)
  } catch (err) {
    console.error('❌ generateScenes failed — using fallback:', err)
    return SCENES
  }
}
