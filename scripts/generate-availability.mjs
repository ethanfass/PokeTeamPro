import fs from 'node:fs'
import path from 'node:path'

const projectRoot = path.resolve(import.meta.dirname, '..')
const sourcePath = path.join(projectRoot, 'availability_bulbapedia.html')
const outputDir = path.join(projectRoot, 'src', 'data')
const outputPath = path.join(outputDir, 'bulbapediaAvailability.json')

const fullColumnOrder = [
  { pageKey: 'red', outputKey: 'red' },
  { pageKey: 'green', outputKey: 'blue' },
  { pageKey: 'blue-japan', outputKey: null },
  { pageKey: 'yellow', outputKey: 'yellow' },
  { pageKey: 'gold', outputKey: 'gold' },
  { pageKey: 'silver', outputKey: 'silver' },
  { pageKey: 'crystal', outputKey: 'crystal' },
  { pageKey: 'ruby', outputKey: 'ruby' },
  { pageKey: 'sapphire', outputKey: 'sapphire' },
  { pageKey: 'fire-red', outputKey: 'fire-red' },
  { pageKey: 'leaf-green', outputKey: 'leaf-green' },
  { pageKey: 'emerald', outputKey: 'emerald' },
  { pageKey: 'colosseum', outputKey: null },
  { pageKey: 'xd', outputKey: null },
  { pageKey: 'diamond', outputKey: 'diamond' },
  { pageKey: 'pearl', outputKey: 'pearl' },
  { pageKey: 'platinum', outputKey: 'platinum' },
  { pageKey: 'heart-gold', outputKey: 'heart-gold' },
  { pageKey: 'soul-silver', outputKey: 'soul-silver' },
  { pageKey: 'black', outputKey: 'black' },
  { pageKey: 'white', outputKey: 'white' },
  { pageKey: 'black-2', outputKey: 'black-2' },
  { pageKey: 'white-2', outputKey: 'white-2' },
  { pageKey: 'x', outputKey: 'x' },
  { pageKey: 'y', outputKey: 'y' },
  { pageKey: 'omega-ruby', outputKey: 'omega-ruby' },
  { pageKey: 'alpha-sapphire', outputKey: 'alpha-sapphire' },
  { pageKey: 'sun', outputKey: 'sun' },
  { pageKey: 'moon', outputKey: 'moon' },
  { pageKey: 'ultra-sun', outputKey: 'ultra-sun' },
  { pageKey: 'ultra-moon', outputKey: 'ultra-moon' },
  { pageKey: 'lets-go-pikachu', outputKey: 'lets-go-pikachu' },
  { pageKey: 'lets-go-eevee', outputKey: 'lets-go-eevee' },
  { pageKey: 'sword', outputKey: 'sword' },
  { pageKey: 'shield', outputKey: 'shield' },
  { pageKey: 'brilliant-diamond', outputKey: 'brilliant-diamond' },
  { pageKey: 'shining-pearl', outputKey: 'shining-pearl' },
  { pageKey: 'legends-arceus', outputKey: 'legends-arceus' },
  { pageKey: 'scarlet', outputKey: 'scarlet' },
  { pageKey: 'violet', outputKey: 'violet' },
  { pageKey: 'legends-z-a', outputKey: null }
]

const getColumns = (indexes) => indexes.map((index) => fullColumnOrder[index])

const generationColumnConfigs = [
  { min: 1, max: 151, columns: fullColumnOrder },
  { min: 152, max: 251, columns: getColumns([4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 33, 34, 35, 36, 37, 38, 39, 40]) },
  { min: 252, max: 386, columns: getColumns([7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 33, 34, 35, 36, 37, 38, 39, 40]) },
  { min: 387, max: 493, columns: getColumns([14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 33, 34, 35, 36, 37, 38, 39, 40]) },
  { min: 494, max: 649, columns: getColumns([19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 33, 34, 37, 38, 39, 40]) },
  { min: 650, max: 721, columns: getColumns([23, 24, 25, 26, 27, 28, 29, 30, 33, 34, 37, 38, 39, 40]) },
  { min: 808, max: 809, columns: getColumns([31, 32, 33, 34, 37, 38, 39, 40]) },
  { min: 722, max: 809, columns: getColumns([27, 28, 29, 30, 33, 34, 37, 38, 39, 40]) },
  { min: 810, max: 898, columns: getColumns([33, 34, 38, 39, 40]) },
  { min: 899, max: 905, columns: getColumns([37, 38, 39, 40]) },
  { min: 906, max: 1025, columns: getColumns([38, 39, 40]) }
]

const decodeEntities = (value) =>
  value
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')

const cleanCellText = (value) =>
  decodeEntities(
    value
      .replace(/<br\s*\/?>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
  )
    .replace(/\s+/g, ' ')
    .trim()

const html = fs.readFileSync(sourcePath, 'utf8')
const rowMatches = html.matchAll(/<tr style="background:#FFF">([\s\S]*?)<\/tr>/g)
const output = {}

for (const [, rowHtml] of rowMatches) {
  const cellMatches = [...rowHtml.matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/g)].map((match) => cleanCellText(match[1]))

  const nationalDex = Number.parseInt(cellMatches[0], 10)
  if (!Number.isInteger(nationalDex)) {
    continue
  }

  const generationConfig = generationColumnConfigs.find((range) => nationalDex >= range.min && nationalDex <= range.max)
  if (!generationConfig) {
    continue
  }

  const columnOrder = generationConfig.columns

  const displayName = cellMatches[2]
  if (displayName.includes('(')) {
    continue
  }

  if (cellMatches.length < 3 + columnOrder.length) {
    continue
  }

  const codes = {}
  columnOrder.forEach((column, index) => {
    if (column.outputKey) {
      codes[column.outputKey] = cellMatches[index + 3]
    }
  })

  output[nationalDex] = {
    nationalDex,
    name: displayName,
    codes
  }
}

fs.mkdirSync(outputDir, { recursive: true })
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2) + '\n')

console.log(`Wrote ${Object.keys(output).length} entries to ${outputPath}`)
