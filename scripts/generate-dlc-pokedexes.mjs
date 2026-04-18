import fs from 'node:fs'
import path from 'node:path'

const projectRoot = path.resolve(import.meta.dirname, '..')
const outputDir = path.join(projectRoot, 'src', 'data')
const outputPath = path.join(outputDir, 'dlcPokedexes.json')

const sources = {
  isleOfArmor: path.join(projectRoot, 'ioa_pokedex.html'),
  crownTundra: path.join(projectRoot, 'crown_tundra_pokedex.html'),
  theTealMask: path.join(projectRoot, 'kitakami_pokedex.html'),
  theIndigoDisk: path.join(projectRoot, 'blueberry_pokedex.html')
}

const extractNationalDexes = (html) => {
  const rows = [...html.matchAll(/<tr style="background:#FFF">([\s\S]*?)<\/tr>/g)]
  const dexes = new Set()

  rows.forEach(([, rowHtml]) => {
    const numberMatches = [...rowHtml.matchAll(/<td[^>]*style="font-family:monospace,monospace"[^>]*>#(\d{1,4})/g)]
      .map((match) => Number.parseInt(match[1], 10))
      .filter(Number.isInteger)

    if (numberMatches.length >= 2) {
      dexes.add(numberMatches[1])
    }
  })

  return [...dexes].sort((a, b) => a - b)
}

const output = Object.fromEntries(
  Object.entries(sources).map(([key, filePath]) => {
    const html = fs.readFileSync(filePath, 'utf8')
    return [key, extractNationalDexes(html)]
  })
)

output.mochiMayhem = [1025]

fs.mkdirSync(outputDir, { recursive: true })
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2) + '\n')

console.log(`Wrote DLC dex data to ${outputPath}`)
