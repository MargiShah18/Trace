import pako from 'pako'

function toBase64Url(uint8) {
  let binary = ''
  for (let i = 0; i < uint8.length; i++) {
    binary += String.fromCharCode(uint8[i])
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function fromBase64Url(str) {
  const base64 = str.replace(/-/g, '+').replace(/_/g, '/')
  const pad = base64.length % 4
  const padded = pad ? base64 + '===='.slice(pad) : base64
  const binary = atob(padded)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes
}

export function encodeCard(cardData) {
  try {
    const json = JSON.stringify(cardData)
    const compressed = pako.deflateRaw(new TextEncoder().encode(json))
    return toBase64Url(compressed)
  } catch {
    return null
  }
}

export function decodeCard(encoded) {
  try {
    const bytes = fromBase64Url(encoded)
    const decompressed = pako.inflateRaw(bytes)
    const json = new TextDecoder().decode(decompressed)
    return JSON.parse(json)
  } catch {
    return null
  }
}
