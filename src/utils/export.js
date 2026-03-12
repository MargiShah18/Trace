import html2canvas from 'html2canvas'

export async function exportCardAsPng(element, filename = 'identity-artifact.png') {
  if (!element) return

  const canvas = await html2canvas(element, {
    backgroundColor: '#0c0c0c',
    scale: 2,
    useCORS: true,
    logging: false,
  })

  const link = document.createElement('a')
  link.download = filename
  link.href = canvas.toDataURL('image/png')
  link.click()
}
