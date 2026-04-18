import fs from 'node:fs'
import path from 'node:path'

const projectRoot = path.resolve(import.meta.dirname, '..')
const outputDir = path.join(projectRoot, 'src', 'data')
const legendsZaSourcePath = path.join(projectRoot, 'legends_za_list.html')
const megaSourcePath = path.join(projectRoot, 'megaevolution_serebii.html')
const megaOutputPath = path.join(outputDir, 'megaEntries.json')
const legendsZaOutputPath = path.join(outputDir, 'legendsZaAvailability.json')

const generationRanges = [
  { generation: 1, min: 1, max: 151 },
  { generation: 2, min: 152, max: 251 },
  { generation: 3, min: 252, max: 386 },
  { generation: 4, min: 387, max: 493 },
  { generation: 5, min: 494, max: 649 },
  { generation: 6, min: 650, max: 721 },
  { generation: 7, min: 722, max: 809 },
  { generation: 8, min: 810, max: 898 },
  { generation: 9, min: 899, max: 1025 }
]

const htmlEntityMap = {
  '&nbsp;': ' ',
  '&amp;': '&',
  '&quot;': '"',
  '&#39;': "'",
  '&lt;': '<',
  '&gt;': '>',
  '&eacute;': 'é',
  '&Eacute;': 'É',
  '&mdash;': '—',
  '&ndash;': '–'
}

const decodeEntities = (value) =>
  value
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&(nbsp|amp|quot|#39|lt|gt|eacute|Eacute|mdash|ndash);/g, (match) => htmlEntityMap[match] || match)

const stripTags = (value) =>
  decodeEntities(
    value
      .replace(/<br\s*\/?>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
  )
    .replace(/\s+/g, ' ')
    .trim()

const slugifyPokemonName = (value) =>
  decodeEntities(value)
    .replace(/Pokémon/gi, 'Pokemon')
    .replace(/♀/g, '-f')
    .replace(/♂/g, '-m')
    .replace(/[.'’:]/g, '')
    .replace(/é/g, 'e')
    .replace(/[^A-Za-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase()

const getGenerationForDex = (dex) =>
  generationRanges.find((range) => dex >= range.min && dex <= range.max)?.generation ?? null

const buildMegaApiNameCandidates = (baseSlug, displayName) => {
  const normalizedDisplayName = stripTags(displayName)
  const suffixText = normalizedDisplayName.startsWith('Mega ')
    ? normalizedDisplayName.slice(5).replace(new RegExp(`^${stripTags(baseSlug).replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}\\s*`, 'i'), '').trim()
    : ''

  const suffixSlug = slugifyPokemonName(suffixText)
  const shortenedSuffixSlug = suffixSlug.replace(/-form$/, '').replace(/^original-color$/, 'original').replace(/^eternal-flower$/, 'eternal')
  const candidates = new Set()

  if (suffixSlug) {
    candidates.add(`${baseSlug}-mega-${suffixSlug}`)
    candidates.add(`${baseSlug}-${suffixSlug}-mega`)
  }

  if (shortenedSuffixSlug && shortenedSuffixSlug !== suffixSlug) {
    candidates.add(`${baseSlug}-mega-${shortenedSuffixSlug}`)
    candidates.add(`${baseSlug}-${shortenedSuffixSlug}-mega`)
  }

  candidates.add(`${baseSlug}-mega`)

  return [...candidates]
}

const fetchStatus = async (url) => {
  try {
    const response = await fetch(url)
    return response.status
  } catch {
    return null
  }
}

const resolveMegaApiName = async (baseSlug, displayName, cache) => {
  const candidates = buildMegaApiNameCandidates(baseSlug, displayName)

  for (const candidate of candidates) {
    if (!cache.has(candidate)) {
      cache.set(candidate, await fetchStatus(`https://pokeapi.co/api/v2/pokemon/${candidate}`))
    }

    if (cache.get(candidate) === 200) {
      return candidate
    }
  }

  return null
}

const extractMegaEntries = async (html) => {
  const entryMatches = [...html.matchAll(/<td\s+valign="top"><table>([\s\S]*?)<\/table><\/td>/g)]
  const validationCache = new Map()
  const megaEntries = []
  const unresolvedEntries = []

  for (const [, entryHtml] of entryMatches) {
    const nameMatch = entryHtml.match(/<tr><td align="center"><a href="\/pokemon\/([^/]+)\/">([\s\S]*?)<\/a><\/td><\/tr>/)
    const imageMatch = entryHtml.match(/src="[^"]*?(\d+)-[a-z0-9-]+\.png"/i)

    if (!nameMatch || !imageMatch) {
      continue
    }

    const baseSlug = slugifyPokemonName(nameMatch[1])
    const displayName = stripTags(nameMatch[2])
    const speciesId = Number.parseInt(imageMatch[1], 10)

    if (displayName === 'Mega Magearna Original Color') {
      continue
    }

    const apiName = await resolveMegaApiName(baseSlug, displayName, validationCache)

    if (!apiName) {
      unresolvedEntries.push(displayName)
      continue
    }

    megaEntries.push({
      pokemonName: apiName,
      displayName,
      generation: getGenerationForDex(speciesId),
      speciesId
    })
  }

  return {
    megaEntries,
    unresolvedEntries
  }
}

const extractLegendsZaAvailability = (html, megaDisplayNameMap) => {
  const megaSectionIndex = html.indexOf('<span class="mw-headline" id="Mega_Evolutions">')
  const baseSectionHtml = megaSectionIndex >= 0 ? html.slice(0, megaSectionIndex) : html
  const megaSectionHtml = megaSectionIndex >= 0 ? html.slice(megaSectionIndex) : ''
  const rowPattern = /<tr style="background:#FFF">([\s\S]*?)<\/tr>/g

  const baseDexes = new Set()
  const regionalVariants = new Set()
  const megaPokemon = new Set()

  for (const [, rowHtml] of baseSectionHtml.matchAll(rowPattern)) {
    const dexMatch = rowHtml.match(/<td[^>]*font-family:monospace,monospace[^>]*>#(\d{4})/i)
    const pokemonMatch = rowHtml.match(/<td><a [^>]*title="([^"]+)">\s*([^<]+)<\/a><br \/><small>([\s\S]*?)<\/small>/)

    if (!dexMatch || !pokemonMatch) {
      continue
    }

    const nationalDex = Number.parseInt(dexMatch[1], 10)
    const displayName = stripTags(pokemonMatch[2])
    const formLabel = stripTags(pokemonMatch[3])

    if (!formLabel) {
      baseDexes.add(nationalDex)
      continue
    }

    if (formLabel.endsWith('Form')) {
      const regionName = formLabel.replace(/\s+Form$/, '')
      regionalVariants.add(`${slugifyPokemonName(displayName)}-${slugifyPokemonName(regionName)}`)
    }
  }

  for (const [, rowHtml] of megaSectionHtml.matchAll(rowPattern)) {
    const pokemonMatch = rowHtml.match(/<td><a [^>]*title="([^"]+)">\s*([^<]+)<\/a><br \/><small>([\s\S]*?)<\/small>/)

    if (!pokemonMatch) {
      continue
    }

    const megaDisplayName = stripTags(pokemonMatch[3])
    const apiName = megaDisplayNameMap.get(megaDisplayName)

    if (apiName) {
      megaPokemon.add(apiName)
    }
  }

  return {
    baseDexes: [...baseDexes].sort((a, b) => a - b),
    regionalVariants: [...regionalVariants].sort(),
    megaPokemon: [...megaPokemon].sort()
  }
}

const legendsZaHtml = fs.readFileSync(legendsZaSourcePath, 'utf8')
const megaHtml = fs.readFileSync(megaSourcePath, 'utf8')

const { megaEntries, unresolvedEntries } = await extractMegaEntries(megaHtml)
const megaDisplayNameMap = new Map(megaEntries.map((entry) => [entry.displayName, entry.pokemonName]))
const legendsZaAvailability = extractLegendsZaAvailability(legendsZaHtml, megaDisplayNameMap)

fs.mkdirSync(outputDir, { recursive: true })
fs.writeFileSync(megaOutputPath, JSON.stringify(megaEntries, null, 2) + '\n')
fs.writeFileSync(legendsZaOutputPath, JSON.stringify(legendsZaAvailability, null, 2) + '\n')

console.log(`Wrote ${megaEntries.length} mega entries to ${megaOutputPath}`)
console.log(`Wrote Legends Z-A availability data to ${legendsZaOutputPath}`)

if (unresolvedEntries.length > 0) {
  console.warn(`Unresolved mega entries (${unresolvedEntries.length}): ${unresolvedEntries.join(', ')}`)
}
