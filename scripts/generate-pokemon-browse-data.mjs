import fs from 'node:fs/promises'
import path from 'node:path'
import { pokemonGenerations, regionalVariantEntries, legendsArceusIntroducedEntries } from '../src/data/pokemonBrowseConfig.js'

const projectRoot = path.resolve(import.meta.dirname, '..')
const outputDir = path.join(projectRoot, 'src', 'data')
const outputPath = path.join(outputDir, 'pokemonBrowseData.json')
const megaEntriesPath = path.join(outputDir, 'megaEntries.json')
const legendsZaMegaSpritesPath = path.join(outputDir, 'legendsZaMegaSprites.json')
const legendsZaMegaShinySpritesPath = path.join(outputDir, 'legendsZaMegaShinySprites.json')

const POKEMON_FETCH_BATCH_SIZE = 32
const SPECIAL_POKEMON_FETCH_BATCH_SIZE = 16

const readJson = async (filePath) => JSON.parse(await fs.readFile(filePath, 'utf8'))

const formatDisplayName = (value = '') =>
  value
    .split(/[- ]+/)
    .map((part) => (part ? part.charAt(0).toUpperCase() + part.slice(1) : ''))
    .join(' ')

const getSpeciesIdFromUrl = (url = '') => {
  const match = url.match(/\/pokemon-species\/(\d+)\/?$/)
  return match ? Number.parseInt(match[1], 10) : null
}

const buildPokemonSpeciesBrowseData = (speciesData = {}) => {
  const eggGroupKeys = (speciesData.egg_groups || []).map((group) => group.name)
  const growthRateKey = speciesData.growth_rate?.name || 'unknown'

  return {
    eggGroupKeys,
    eggGroups: eggGroupKeys.map((group) => formatDisplayName(group)),
    growthRateKey,
    growthRate: formatDisplayName(growthRateKey),
    isLegendary: Boolean(speciesData.is_legendary),
    isMythical: Boolean(speciesData.is_mythical)
  }
}

const fallbackSpriteUrl = (speciesId, preferShiny = false) =>
  speciesId
    ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${preferShiny ? 'shiny/' : ''}${speciesId}.png`
    : null

const getPokemonSpriteFromSprites = (sprites, preferShiny = false, speciesId = null) => {
  if (preferShiny) {
    return (
      sprites?.other?.['official-artwork']?.front_shiny ||
      sprites?.front_shiny ||
      sprites?.other?.['official-artwork']?.front_default ||
      sprites?.front_default ||
      fallbackSpriteUrl(speciesId, true)
    )
  }

  return (
    sprites?.other?.['official-artwork']?.front_default ||
    sprites?.front_default ||
    fallbackSpriteUrl(speciesId, false)
  )
}

const getPokemonAnimatedSpriteFromSprites = (sprites, preferShiny = false) => {
  const animatedSprites = sprites?.versions?.['generation-v']?.['black-white']?.animated

  if (preferShiny) {
    return animatedSprites?.front_shiny || animatedSprites?.front_default || null
  }

  return animatedSprites?.front_default || null
}

const fetchJson = async (url, attempt = 1) => {
  const response = await fetch(url)

  if (response.ok) {
    return response.json()
  }

  if (attempt < 3 && response.status >= 500) {
    await new Promise((resolve) => setTimeout(resolve, attempt * 600))
    return fetchJson(url, attempt + 1)
  }

  throw new Error(`Request failed (${response.status}) for ${url}`)
}

const buildBrowsePokemonEntry = async (pokemonIdentifier, options = {}) => {
  const {
    specialEntry = null,
    legendsZaMegaSprites,
    legendsZaMegaShinySprites
  } = options
  const data = await fetchJson(`https://pokeapi.co/api/v2/pokemon/${pokemonIdentifier}`)
  const speciesData = await fetchJson(data.species.url)
  const speciesId = getSpeciesIdFromUrl(data.species.url) || specialEntry?.speciesId || data.id
  const speciesBrowseData = buildPokemonSpeciesBrowseData(speciesData)

  if (specialEntry) {
    const legendsZaMegaSprite = legendsZaMegaSprites[specialEntry.pokemonName] || null
    const legendsZaMegaShinySprite = legendsZaMegaShinySprites[specialEntry.pokemonName] || null

    return {
      id: data.id,
      name: specialEntry.displayName,
      apiName: data.name,
      image: legendsZaMegaSprite || getPokemonSpriteFromSprites(data.sprites, false, speciesId),
      normalImage: legendsZaMegaSprite || getPokemonSpriteFromSprites(data.sprites, false, speciesId),
      shinyImage:
        legendsZaMegaShinySprite ||
        legendsZaMegaSprite ||
        getPokemonSpriteFromSprites(data.sprites, true, speciesId),
      animatedNormalImage: legendsZaMegaSprite ? null : getPokemonAnimatedSpriteFromSprites(data.sprites, false),
      animatedShinyImage: legendsZaMegaSprite ? null : getPokemonAnimatedSpriteFromSprites(data.sprites, true),
      types: data.types.map((type) => type.type.name),
      stats: Object.fromEntries(data.stats.map((stat) => [stat.stat.name, stat.base_stat])),
      speciesUrl: data.species.url,
      speciesId,
      eggGroupKeys: speciesBrowseData.eggGroupKeys,
      eggGroups: speciesBrowseData.eggGroups,
      growthRateKey: speciesBrowseData.growthRateKey,
      growthRate: speciesBrowseData.growthRate,
      isLegendary: speciesBrowseData.isLegendary,
      isMythical: speciesBrowseData.isMythical,
      abilities: data.abilities.map((ability) => ({
        name: ability.ability.name,
        isHidden: ability.is_hidden,
        url: ability.ability.url
      }))
    }
  }

  return {
    id: data.id,
    name: data.name,
    apiName: data.name,
    image: getPokemonSpriteFromSprites(data.sprites, false, speciesId),
    normalImage: getPokemonSpriteFromSprites(data.sprites, false, speciesId),
    shinyImage: getPokemonSpriteFromSprites(data.sprites, true, speciesId),
    animatedNormalImage: getPokemonAnimatedSpriteFromSprites(data.sprites, false),
    animatedShinyImage: getPokemonAnimatedSpriteFromSprites(data.sprites, true),
    types: data.types.map((type) => type.type.name),
    stats: Object.fromEntries(data.stats.map((stat) => [stat.stat.name, stat.base_stat])),
    speciesUrl: data.species.url,
    speciesId,
    eggGroupKeys: speciesBrowseData.eggGroupKeys,
    eggGroups: speciesBrowseData.eggGroups,
    growthRateKey: speciesBrowseData.growthRateKey,
    growthRate: speciesBrowseData.growthRate,
    isLegendary: speciesBrowseData.isLegendary,
    isMythical: speciesBrowseData.isMythical,
    abilities: data.abilities.map((ability) => ({
      name: ability.ability.name,
      isHidden: ability.is_hidden,
      url: ability.ability.url
    }))
  }
}

const getPokemonFormSortWeight = (pokemon) => {
  if ((pokemon.speciesId || pokemon.id) === pokemon.id) {
    return 0
  }

  if (pokemon.apiName?.includes('-mega')) {
    return 1
  }

  if (
    pokemon.apiName?.includes('-alola') ||
    pokemon.apiName?.includes('-galar') ||
    pokemon.apiName?.includes('-hisui') ||
    pokemon.apiName?.includes('-paldea')
  ) {
    return 2
  }

  return 3
}

const sortPokemonEntries = (pokemonList) =>
  [...pokemonList].sort((a, b) => {
    const speciesCompare = (a.speciesId || a.id) - (b.speciesId || b.id)

    if (speciesCompare !== 0) {
      return speciesCompare
    }

    const formPriorityCompare = getPokemonFormSortWeight(a) - getPokemonFormSortWeight(b)

    if (formPriorityCompare !== 0) {
      return formPriorityCompare
    }

    return a.name.localeCompare(b.name)
  })

const main = async () => {
  const [megaEntries, legendsZaMegaSprites, legendsZaMegaShinySprites] = await Promise.all([
    readJson(megaEntriesPath),
    readJson(legendsZaMegaSpritesPath),
    readJson(legendsZaMegaShinySpritesPath)
  ])
  const grouped = {}
  const specialPokemon = Array.from(
    new Map(
      [
        ...regionalVariantEntries,
        ...legendsArceusIntroducedEntries,
        ...megaEntries
      ].map((entry) => [entry.pokemonName, entry])
    ).values()
  )

  for (const gen of pokemonGenerations) {
    grouped[gen.gen] = {
      name: gen.name,
      pokemon: []
    }

    const [start, end] = gen.range
    const pokemonIds = Array.from({ length: end - start + 1 }, (_, index) => start + index)

    for (let index = 0; index < pokemonIds.length; index += POKEMON_FETCH_BATCH_SIZE) {
      const batch = pokemonIds.slice(index, index + POKEMON_FETCH_BATCH_SIZE)
      const batchPokemon = await Promise.all(
        batch.map(async (pokemonId) => {
          try {
            return await buildBrowsePokemonEntry(pokemonId, { legendsZaMegaSprites, legendsZaMegaShinySprites })
          } catch (error) {
            console.error(`Error fetching Pokemon ${pokemonId}:`, error)
            return null
          }
        })
      )

      grouped[gen.gen].pokemon.push(...batchPokemon.filter(Boolean))
      console.log(`Fetched Gen ${gen.gen}: ${Math.min(index + batch.length, pokemonIds.length)}/${pokemonIds.length}`)
    }
  }

  for (let index = 0; index < specialPokemon.length; index += SPECIAL_POKEMON_FETCH_BATCH_SIZE) {
    const batch = specialPokemon.slice(index, index + SPECIAL_POKEMON_FETCH_BATCH_SIZE)
    const batchPokemon = await Promise.all(
      batch.map(async (specialEntry) => {
        try {
          return [
            specialEntry.generation,
            await buildBrowsePokemonEntry(specialEntry.pokemonName, {
              specialEntry,
              legendsZaMegaSprites,
              legendsZaMegaShinySprites
            })
          ]
        } catch (error) {
          console.error(`Error fetching special Pokemon ${specialEntry.pokemonName}:`, error)
          return null
        }
      })
    )

    batchPokemon.forEach((entry) => {
      if (!entry) {
        return
      }

      const [generation, pokemon] = entry
      if (grouped[generation]) {
        grouped[generation].pokemon.push(pokemon)
      }
    })
    console.log(`Fetched specials: ${Math.min(index + batch.length, specialPokemon.length)}/${specialPokemon.length}`)
  }

  Object.values(grouped).forEach((group) => {
    group.pokemon = sortPokemonEntries(group.pokemon)
  })

  await fs.mkdir(outputDir, { recursive: true })
  await fs.writeFile(
    outputPath,
    `${JSON.stringify({
      generatedAt: new Date().toISOString(),
      generations: grouped
    }, null, 2)}\n`
  )

  const pokemonCount = Object.values(grouped).reduce((sum, group) => sum + group.pokemon.length, 0)
  console.log(`Wrote ${pokemonCount} Pokemon entries to ${outputPath}`)
}

await main()
