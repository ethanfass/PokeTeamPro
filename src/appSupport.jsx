/* eslint-disable react-refresh/only-export-components, no-control-regex */
import bulbapediaAvailability from './data/bulbapediaAvailability.json'
import dlcPokedexes from './data/dlcPokedexes.json'
import { eliteFourByGame, eliteFourGameGroupByGameKey, eliteFourGames } from './data/eliteFour'
import megaEntries from './data/megaEntries.json'
import legendsZaAvailability from './data/legendsZaAvailability.json'
import legendsZaMegaSprites from './data/legendsZaMegaSprites.json'
import legendsZaMegaShinySprites from './data/legendsZaMegaShinySprites.json'
import { pokemonGenerations } from './data/pokemonBrowseConfig'
import { gymLeaderGameGroupByGameKey, gymLeaderGames, gymLeadersByGame } from './data/gymLeaders'
import pokeballImage from '../assets/pokeball.png'

export const TEAM_SLOT_COUNT = 6
export const TEAM_MOVE_SLOT_COUNT = 4
export const TEAM_BUILD_LEVEL = 100
export const TEAM_HISTORY_LIMIT = 60
export const SAVED_TEAMS_STORAGE_KEY = 'pokeapp-saved-teams-v2'
export const LEGACY_SAVED_TEAMS_STORAGE_KEY = 'pokeapp-saved-teams-v1'
export const SAVED_TEAMS_SCHEMA_VERSION = 2
export const TEAM_SHARE_SCHEMA_VERSION = 1
export const TEAM_SHARE_APP_ID = 'pokeapp-team-share'
export const TEAM_SHARE_COMPRESSED_PREFIX = 'PKAPP1:'
export const MAX_SAVED_TEAMS = 100
export const MAX_SAVED_TEAM_NAME_LENGTH = 48
export const MAX_TEAM_SHARE_TEXT_LENGTH = 50000
export const loadCachedPokemonBrowseData = async () => {
  const pokemonBrowseData = (await import('./data/pokemonBrowseData.json')).default
  const cachedPokemonByGen = pokemonBrowseData?.generations || {}
  const hasCachedPokemonBrowseData = Object.values(cachedPokemonByGen)
    .some((group) => Array.isArray(group?.pokemon) && group.pokemon.length > 0)

  return { cachedPokemonByGen, hasCachedPokemonBrowseData }
}
export const generations = pokemonGenerations
export const EMPTY_MOVE_VALUE = '-'
export const TEAM_EXPORT_SCALE = 2
export const TEAM_EXPORT_SLOT_WIDTH = 248
export const TEAM_EXPORT_SLOT_HEIGHT = 526
export const TEAM_EXPORT_SLOT_GAP = 24
export const POKEMON_FETCH_BATCH_SIZE = 32
export const SPECIAL_POKEMON_FETCH_BATCH_SIZE = 16
export const BUILD_STAT_ROWS = [
  { key: 'hp', label: 'HP' },
  { key: 'attack', label: 'Atk' },
  { key: 'defense', label: 'Def' },
  { key: 'special-attack', label: 'SpA' },
  { key: 'special-defense', label: 'SpD' },
  { key: 'speed', label: 'Spe' }
]
export const DEFAULT_NATURE_KEY = 'hardy'
export const DEFAULT_TEAM_EVS = Object.fromEntries(BUILD_STAT_ROWS.map((stat) => [stat.key, 0]))
export const PERFECT_IV_VALUE = 31
export const TEAM_NATURES = [
  { key: 'hardy', label: 'Hardy', increase: null, decrease: null },
  { key: 'lonely', label: 'Lonely', increase: 'attack', decrease: 'defense' },
  { key: 'brave', label: 'Brave', increase: 'attack', decrease: 'speed' },
  { key: 'adamant', label: 'Adamant', increase: 'attack', decrease: 'special-attack' },
  { key: 'naughty', label: 'Naughty', increase: 'attack', decrease: 'special-defense' },
  { key: 'bold', label: 'Bold', increase: 'defense', decrease: 'attack' },
  { key: 'docile', label: 'Docile', increase: null, decrease: null },
  { key: 'relaxed', label: 'Relaxed', increase: 'defense', decrease: 'speed' },
  { key: 'impish', label: 'Impish', increase: 'defense', decrease: 'special-attack' },
  { key: 'lax', label: 'Lax', increase: 'defense', decrease: 'special-defense' },
  { key: 'timid', label: 'Timid', increase: 'speed', decrease: 'attack' },
  { key: 'hasty', label: 'Hasty', increase: 'speed', decrease: 'defense' },
  { key: 'serious', label: 'Serious', increase: null, decrease: null },
  { key: 'jolly', label: 'Jolly', increase: 'speed', decrease: 'special-attack' },
  { key: 'naive', label: 'Naive', increase: 'speed', decrease: 'special-defense' },
  { key: 'modest', label: 'Modest', increase: 'special-attack', decrease: 'attack' },
  { key: 'mild', label: 'Mild', increase: 'special-attack', decrease: 'defense' },
  { key: 'quiet', label: 'Quiet', increase: 'special-attack', decrease: 'speed' },
  { key: 'bashful', label: 'Bashful', increase: null, decrease: null },
  { key: 'rash', label: 'Rash', increase: 'special-attack', decrease: 'special-defense' },
  { key: 'calm', label: 'Calm', increase: 'special-defense', decrease: 'attack' },
  { key: 'gentle', label: 'Gentle', increase: 'special-defense', decrease: 'defense' },
  { key: 'sassy', label: 'Sassy', increase: 'special-defense', decrease: 'speed' },
  { key: 'careful', label: 'Careful', increase: 'special-defense', decrease: 'special-attack' },
  { key: 'quirky', label: 'Quirky', increase: null, decrease: null }
]
export const TEAM_NATURE_LOOKUP = Object.fromEntries(TEAM_NATURES.map((nature) => [nature.key, nature]))
export const DESIGN_TEMPLATES = [
  {
    key: 'classic',
    label: 'Classic',
    note: 'The current airy Pokedex look.'
  },
  {
    key: 'colorful',
    label: 'Colorful',
    note: 'Bold gradients and saturated accents across the page and builder editor.'
  },
  {
    key: 'sunset',
    label: 'Sunset Dex',
    note: 'Warm coral cards with golden-hour depth.'
  },
  {
    key: 'lagoon',
    label: 'Sea Glass',
    note: 'Cool aqua surfaces with crisp contrast.'
  },
  {
    key: 'verdant',
    label: 'Verdant',
    note: 'Botanical greens with richer panel shadows.'
  },
  {
    key: 'dark',
    label: 'Dark',
    note: 'A richer midnight version of the builder.'
  }
]

export const ANALYZER_COVERAGE_SOURCES = [
  {
    key: 'moves',
    label: 'Move Types'
  },
  {
    key: 'pokemon-types',
    label: 'Pokemon Types'
  }
]

export const TEAM_MATCHUP_PLAYER_SOURCE_OPTIONS = [
  {
    key: 'builder',
    label: 'Current Team Builder'
  },
  {
    key: 'preset',
    label: 'Gym / Elite Four Preset'
  }
]

export const TEAM_MATCHUP_ENEMY_SOURCE_OPTIONS = [
  {
    key: 'preset',
    label: 'Gym / Elite Four Preset'
  },
  {
    key: 'custom',
    label: 'Custom Matchup Team'
  }
]

export const TEAM_MATCHUP_PRESET_OPTIONS = [
  {
    key: 'gym',
    label: 'Gym Leader Team'
  },
  {
    key: 'elite-four',
    label: 'Elite Four Team'
  }
]

export const MOVE_GENERATION_TO_NUMBER = {
  'generation-i': 1,
  'generation-ii': 2,
  'generation-iii': 3,
  'generation-iv': 4,
  'generation-v': 5,
  'generation-vi': 6,
  'generation-vii': 7,
  'generation-viii': 8,
  'generation-ix': 9
}

export const gamePickerMascotSpeciesIds = {
  all: 131,
  champions: 727,
  red: 6,
  blue: 9,
  yellow: 25,
  gold: 250,
  silver: 249,
  crystal: 245,
  ruby: 383,
  sapphire: 382,
  emerald: 384,
  'fire-red': 6,
  'leaf-green': 3,
  diamond: 483,
  pearl: 484,
  platinum: 487,
  'heart-gold': 250,
  'soul-silver': 249,
  black: 643,
  white: 644,
  'black-2': 10022,
  'white-2': 10023,
  x: 716,
  y: 717,
  'omega-ruby': 383,
  'alpha-sapphire': 382,
  sun: 791,
  moon: 792,
  'ultra-sun': 10155,
  'ultra-moon': 10156,
  'lets-go-pikachu': 25,
  'lets-go-eevee': 133,
  sword: 888,
  shield: 889,
  'brilliant-diamond': 10245,
  'shining-pearl': 10246,
  'legends-arceus': 493,
  scarlet: 1007,
  violet: 1008,
  'legends-z-a': 718
}

export const singleFormGamePickerKeys = new Set(['black-2', 'white-2', 'ultra-sun', 'ultra-moon'])

export const gamePickerMascotSpriteConfigs = {
  all: { animatedScale: 1, hoverScale: 1.1 },
  champions: { animatedScale: 1, hoverScale: 1.3 },
  red: { animatedScale: 1, hoverScale: 1.35 },
  blue: { animatedScale: 1, hoverScale: 1.3 },
  yellow: { animatedScale: 1, hoverScale: 1.3 },
  platinum: { animatedScale: 1, hoverScale: 1.4 },
  gold: { animatedScale: 1, hoverScale: 1.5 },
  silver: { animatedScale: 1, hoverScale: 1.5 },
  crystal: { animatedScale: 1, hoverScale: 1.3 },
  ruby: { animatedScale: 1, hoverScale: 1.3 },
  sapphire: { animatedScale: 1, hoverScale: 1.4 },
  emerald: { animatedScale: 1, hoverScale: 1.5 },
  'fire-red': { animatedScale: 1, hoverScale: 1.35 },
  'leaf-green': { animatedScale: 1, hoverScale: 1.3 },
  diamond: { animatedScale: 1, hoverScale: 1.3 },
  pearl: { animatedScale: 1, hoverScale: 1.3 },
  'heart-gold': { animatedScale: 1, hoverScale: 1.5 },
  'soul-silver': { animatedScale: 1, hoverScale: 1.5 },
  black: { animatedScale: 1, hoverScale: 1.4 },
  white: { animatedScale: 1, hoverScale: 1.4 },
  x: { animatedScale: 1, hoverScale: 1.3 },
  y: { animatedScale: 1, hoverScale: 1.3 },
  'omega-ruby': {
    animatedScale: 1,
    hoverScale: 1.3,
    staticSpriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/10078.png',
    shinyStaticSpriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/shiny/10078.png',
    disableAnimatedSprite: true
  },
  'alpha-sapphire': {
    animatedScale: 1,
    hoverScale: 1.3,
    staticSpriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/10077.png',
    shinyStaticSpriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/shiny/10077.png',
    disableAnimatedSprite: true
  },
  'black-2': { apiName: 'black-kyurem', animatedScale: 1, hoverScale: 1.3 },
  'white-2': { apiName: 'white-kyurem', animatedScale: 1, hoverScale: 1.3 },
  sun: { animatedScale: 1, hoverScale: 1.3 },
  moon: { animatedScale: 1, hoverScale: 1.3 },
  'ultra-sun': { animatedScale: 1, hoverScale: 1.3 },
  'ultra-moon': { animatedScale: 1, hoverScale: 1.3 },
  'lets-go-pikachu': { animatedScale: 1, hoverScale: 1.3 },
  'lets-go-eevee': { animatedScale: 1, hoverScale: 1.3 },
  sword: { animatedScale: 1, hoverScale: 1.3 },
  shield: { animatedScale: 1, hoverScale: 1.3 },
  'brilliant-diamond': { animatedScale: 1, hoverScale: 1.3 },
  'shining-pearl': { animatedScale: 1, hoverScale: 1.3 },
  'legends-arceus': { animatedScale: 1, hoverScale: 1.325 },
  scarlet: { animatedScale: 1, hoverScale: 1.3 },
  violet: { animatedScale: 1, hoverScale: 1.3 },
  'legends-z-a': { animatedScale: 1, hoverScale: 1.3 }
}

export const DEFAULT_GAME_PICKER_HOVER_SCALE = 1.25

  export const gymLeaderGameLookup = Object.fromEntries(gymLeaderGames.map((game) => [game.key, game]))
  export const eliteFourGameLookup = Object.fromEntries(eliteFourGames.map((game) => [game.key, game]))
  export const dropdownGymLeaderGames = gymLeaderGames.filter((game) => !['sword', 'shield'].includes(game.key))
  export const dropdownEliteFourGames = eliteFourGames.filter((game) => !['sword', 'shield'].includes(game.key))

export const gameVersionGroupMap = {
  red: ['red-blue'],
  blue: ['red-blue'],
  yellow: ['yellow'],
  gold: ['gold-silver'],
  silver: ['gold-silver'],
  crystal: ['crystal'],
  ruby: ['ruby-sapphire'],
  sapphire: ['ruby-sapphire'],
  emerald: ['emerald'],
  'fire-red': ['firered-leafgreen'],
  'leaf-green': ['firered-leafgreen'],
  diamond: ['diamond-pearl'],
  pearl: ['diamond-pearl'],
  platinum: ['platinum'],
  'heart-gold': ['heartgold-soulsilver'],
  'soul-silver': ['heartgold-soulsilver'],
  black: ['black-white'],
  white: ['black-white'],
  'black-2': ['black-2-white-2'],
  'white-2': ['black-2-white-2'],
  x: ['x-y'],
  y: ['x-y'],
  'omega-ruby': ['omega-ruby-alpha-sapphire'],
  'alpha-sapphire': ['omega-ruby-alpha-sapphire'],
  sun: ['sun-moon'],
  moon: ['sun-moon'],
  'ultra-sun': ['ultra-sun-ultra-moon'],
  'ultra-moon': ['ultra-sun-ultra-moon'],
  'lets-go-pikachu': ['lets-go-pikachu-lets-go-eevee'],
  'lets-go-eevee': ['lets-go-pikachu-lets-go-eevee'],
  sword: ['sword-shield'],
  shield: ['sword-shield'],
  'brilliant-diamond': ['brilliant-diamond-and-shining-pearl'],
  'shining-pearl': ['brilliant-diamond-and-shining-pearl'],
  'legends-arceus': ['legends-arceus'],
  scarlet: ['scarlet-violet'],
  violet: ['scarlet-violet']
}

export const versionGroupOrder = [
  'red-blue',
  'yellow',
  'gold-silver',
  'crystal',
  'ruby-sapphire',
  'emerald',
  'firered-leafgreen',
  'diamond-pearl',
  'platinum',
  'heartgold-soulsilver',
  'black-white',
  'black-2-white-2',
  'x-y',
  'omega-ruby-alpha-sapphire',
  'sun-moon',
  'ultra-sun-ultra-moon',
  'lets-go-pikachu-lets-go-eevee',
  'sword-shield',
  'brilliant-diamond-and-shining-pearl',
  'legends-arceus',
  'scarlet-violet'
]

export const versionGroupSortIndex = Object.fromEntries(
  versionGroupOrder.map((versionGroup, index) => [versionGroup, index])
)

export const pokemonTypeCardGradientStops = {
  normal: ['#A8A878', '#C6B887'],
  fighting: ['#C14039', '#D85253'],
  flying: ['#A890F0', '#C2A8FF'],
  poison: ['#A040A0', '#B85BB0'],
  ground: ['#E0C068', '#F0D878'],
  rock: ['#B8A038', '#D4B857'],
  bug: ['#A8B820', '#C8D835'],
  ghost: ['#705898', '#8877A8'],
  steel: ['#B8B8D0', '#D0D0E8'],
  fire: ['#F08030', '#FF9845'],
  water: ['#6890F0', '#87CEEB'],
  grass: ['#78C850', '#98FB98'],
  electric: ['#F8D030', '#FFED4E'],
  psychic: ['#F85888', '#FF99AA'],
  ice: ['#98D8D8', '#B8E8E8'],
  dragon: ['#7038F8', '#9068FF'],
  dark: ['#705848', '#8B7355'],
  fairy: ['#EE99AC', '#FFB8DD'],
  stellar: ['#6f86ff', '#9fe7ff'],
  unknown: ['#6c7589', '#9aa5bc']
}

export const pokemonCardFallbackGradient = ['#ffe39c', '#ffd062']

export const parseHexColor = (hexColor = '') => {
  const normalizedHex = hexColor.replace('#', '')

  if (normalizedHex.length !== 6) {
    return null
  }

  const channelValue = (start) => Number.parseInt(normalizedHex.slice(start, start + 2), 16)
  const red = channelValue(0)
  const green = channelValue(2)
  const blue = channelValue(4)

  if ([red, green, blue].some((value) => Number.isNaN(value))) {
    return null
  }

  return { red, green, blue }
}

export const getRelativeLuminance = (hexColor) => {
  const rgb = parseHexColor(hexColor)

  if (!rgb) {
    return 1
  }

  const toLinear = (channel) => {
    const normalized = channel / 255
    return normalized <= 0.03928 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4
  }

  return 0.2126 * toLinear(rgb.red) + 0.7152 * toLinear(rgb.green) + 0.0722 * toLinear(rgb.blue)
}

export const getColorWithAlpha = (hexColor, alpha) => {
  const rgb = parseHexColor(hexColor)

  if (!rgb) {
    return `rgba(36, 50, 74, ${alpha})`
  }

  return `rgba(${rgb.red}, ${rgb.green}, ${rgb.blue}, ${alpha})`
}

export const getPokemonCardTypeStops = (type) => pokemonTypeCardGradientStops[type] || pokemonCardFallbackGradient

export const getPokemonCardBackground = (types = []) => {
  const [primaryType, secondaryType] = Array.isArray(types) ? types : []
  const [primaryStart, primaryEnd] = getPokemonCardTypeStops(primaryType)

  if (!secondaryType) {
    return [
      'radial-gradient(circle at 18% 10%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.14) 34%, rgba(255, 255, 255, 0) 60%)',
      'linear-gradient(160deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 42%)',
      `linear-gradient(135deg, ${primaryStart} 0%, ${primaryEnd} 100%)`
    ].join(', ')
  }

  const [secondaryStart, secondaryEnd] = getPokemonCardTypeStops(secondaryType)
  return [
    'radial-gradient(circle at 18% 10%, rgba(255, 255, 255, 0.38) 0%, rgba(255, 255, 255, 0.12) 34%, rgba(255, 255, 255, 0) 60%)',
    'linear-gradient(160deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0) 44%)',
    `linear-gradient(125deg, ${primaryStart} 0%, ${primaryEnd} 25%, ${secondaryStart} 75%, ${secondaryEnd} 100%)`
  ].join(', ')
}

export const getPokemonCardStyle = (pokemon, useTypeColoredCards = true) => {
  if (!useTypeColoredCards) {
    return { cursor: 'pointer' }
  }

  const pokemonTypes = Array.isArray(pokemon?.types) ? pokemon.types : []
  const [primaryStart] = getPokemonCardTypeStops(pokemonTypes[0])
  const [secondaryStart] = getPokemonCardTypeStops(pokemonTypes[1])
  const referenceColor = pokemonTypes.length > 1 ? secondaryStart : primaryStart
  const hasDualTypes = pokemonTypes.length > 1
  const secondaryBorderColor = hasDualTypes ? secondaryStart : primaryStart
  const averageLuminance = (getRelativeLuminance(primaryStart) + getRelativeLuminance(referenceColor)) / 2
  const useDarkText = averageLuminance > 0.375
  const primaryShadow = getColorWithAlpha(primaryStart, 0.22)
  const referenceShadow = getColorWithAlpha(referenceColor, 0.3)

  return {
    cursor: 'pointer',
    '--pokemon-card-bg': getPokemonCardBackground(pokemonTypes),
    '--pokemon-card-border': primaryStart,
    '--type-1-color': primaryStart,
    '--type-2-color': secondaryBorderColor,
    '--pokemon-card-shadow': `0 12px 24px ${primaryShadow}, inset 0 1px 0 rgba(255, 255, 255, 0.5)`,
    '--pokemon-card-hover-shadow': `0 18px 32px ${referenceShadow}, inset 0 1px 0 rgba(255, 255, 255, 0.6)`,
    '--pokemon-card-gloss-opacity': useDarkText ? 0.4 : 0.62,
    '--pokemon-card-name-color': useDarkText ? '#22304a' : '#f4f8ff',
    '--pokemon-card-id-color': useDarkText ? '#3b4e6d' : '#d5e2ff',
    '--pokemon-card-text-shadow': useDarkText ? 'none' : '0 1px 2px rgba(0, 0, 0, 0.42)'
  }
}

export const getSlotTypeStyle = (pokemon) => {
  const pokemonTypes = Array.isArray(pokemon?.types) ? pokemon.types : []
  const [primaryStart] = getPokemonCardTypeStops(pokemonTypes[0])
  const [secondaryStart] = getPokemonCardTypeStops(pokemonTypes[1])
  const referenceColor = pokemonTypes.length > 1 ? secondaryStart : primaryStart
  return {
    '--slot-type-1-color': primaryStart,
    '--slot-type-2-color': referenceColor,
    '--slot-hover-shadow': `0 10px 20px ${getColorWithAlpha(referenceColor, 0.18)}`
  }
}

// Type effectiveness chart
export const typeEffectiveness = {
  normal: { weakTo: ['fighting'], strong: [] },
  fighting: { weakTo: ['flying', 'psychic', 'fairy'], strong: ['normal', 'ice', 'rock', 'dark', 'steel'] },
  flying: { weakTo: ['rock', 'electric', 'ice'], strong: ['fighting', 'bug', 'grass'] },
  poison: { weakTo: ['ground', 'psychic'], strong: ['grass', 'fairy'] },
  ground: { weakTo: ['water', 'grass', 'ice'], strong: ['poison', 'rock', 'steel', 'fire', 'electric'] },
  rock: { weakTo: ['water', 'grass', 'fighting', 'ground', 'steel'], strong: ['flying', 'bug', 'fire', 'ice'] },
  bug: { weakTo: ['flying', 'rock', 'fire'], strong: ['grass', 'psychic', 'dark'] },
  ghost: { weakTo: ['ghost', 'dark'], strong: ['ghost', 'psychic'] },
  steel: { weakTo: ['fire', 'water', 'ground'], strong: ['rock', 'ice', 'fairy'] },
  fire: { weakTo: ['water', 'ground', 'rock'], strong: ['bug', 'steel', 'grass', 'ice', 'fairy'] },
  water: { weakTo: ['electric', 'grass'], strong: ['ground', 'rock', 'fire'] },
  grass: { weakTo: ['flying', 'poison', 'bug', 'fire', 'ice'], strong: ['ground', 'rock', 'water'] },
  electric: { weakTo: ['ground'], strong: ['water', 'flying'] },
  psychic: { weakTo: ['bug', 'ghost', 'dark'], strong: ['fighting', 'poison'] },
  ice: { weakTo: ['fire', 'fighting', 'rock', 'steel'], strong: ['ground', 'grass', 'flying', 'dragon'] },
  dragon: { weakTo: ['ice', 'dragon', 'fairy'], strong: ['dragon'] },
  dark: { weakTo: ['fighting', 'bug', 'fairy'], strong: ['ghost', 'dark'] },
  fairy: { weakTo: ['poison', 'steel'], strong: ['fighting', 'dragon', 'dark'] }
}

export const defensiveTypeChart = {
  normal: { weak: ['fighting'], resist: [], immune: ['ghost'] },
  fighting: { weak: ['flying', 'psychic', 'fairy'], resist: ['bug', 'rock', 'dark'], immune: [] },
  flying: { weak: ['rock', 'electric', 'ice'], resist: ['fighting', 'bug', 'grass'], immune: ['ground'] },
  poison: { weak: ['ground', 'psychic'], resist: ['fighting', 'poison', 'bug', 'grass', 'fairy'], immune: [] },
  ground: { weak: ['water', 'grass', 'ice'], resist: ['poison', 'rock'], immune: ['electric'] },
  rock: { weak: ['water', 'grass', 'fighting', 'ground', 'steel'], resist: ['normal', 'flying', 'poison', 'fire'], immune: [] },
  bug: { weak: ['flying', 'rock', 'fire'], resist: ['fighting', 'ground', 'grass'], immune: [] },
  ghost: { weak: ['ghost', 'dark'], resist: ['poison', 'bug'], immune: ['normal', 'fighting'] },
  steel: { weak: ['fire', 'water', 'ground'], resist: ['normal', 'flying', 'rock', 'bug', 'steel', 'grass', 'psychic', 'ice', 'dragon', 'fairy'], immune: ['poison'] },
  fire: { weak: ['water', 'ground', 'rock'], resist: ['bug', 'steel', 'fire', 'grass', 'ice', 'fairy'], immune: [] },
  water: { weak: ['electric', 'grass'], resist: ['steel', 'fire', 'water', 'ice'], immune: [] },
  grass: { weak: ['flying', 'poison', 'bug', 'fire', 'ice'], resist: ['ground', 'water', 'grass', 'electric'], immune: [] },
  electric: { weak: ['ground'], resist: ['flying', 'steel', 'electric'], immune: [] },
  psychic: { weak: ['bug', 'ghost', 'dark'], resist: ['fighting', 'psychic'], immune: [] },
  ice: { weak: ['fire', 'fighting', 'rock', 'steel'], resist: ['ice'], immune: [] },
  dragon: { weak: ['ice', 'dragon', 'fairy'], resist: ['fire', 'water', 'grass', 'electric'], immune: [] },
  dark: { weak: ['fighting', 'bug', 'fairy'], resist: ['ghost', 'dark'], immune: ['psychic'] },
  fairy: { weak: ['poison', 'steel'], resist: ['fighting', 'bug', 'dark'], immune: ['dragon'] }
}

export const generationGameDetails = {
  1: {
    games: [
      { name: 'Red', color: '#c83f4a' },
      { name: 'Blue', color: '#3569d4' },
      { name: 'Yellow', color: '#d8ae1f' }
    ]
  },
  2: {
    games: [
      { name: 'Gold', color: '#c89a2d' },
      { name: 'Silver', color: '#8c97a7' },
      { name: 'Crystal', color: '#3eb3cf' }
    ]
  },
  3: {
    games: [
      { name: 'Ruby', color: '#c63f56' },
      { name: 'Sapphire', color: '#3569d4' },
      { name: 'Emerald', color: '#239a63' },
      { name: 'Fire Red', color: '#ea642f' },
      { name: 'Leaf Green', color: '#5f9d3b' }
    ]
  },
  4: {
    games: [
      { name: 'Diamond', color: '#5c8ce8' },
      { name: 'Pearl', color: '#d78fad' },
      { name: 'Platinum', color: '#8c95a7' },
      { name: 'Heart Gold', color: '#c78f29' },
      { name: 'Soul Silver', color: '#8a98ab' }
    ]
  },
  5: {
    games: [
      { name: 'Black', color: '#2d3442' },
      { name: 'White', color: '#a1a8b8' },
      { name: 'Black 2', color: '#1f2736' },
      { name: 'White 2', color: '#b3bac7' }
    ]
  },
  6: {
    games: [
      { name: 'X', color: '#4874d8' },
      { name: 'Y', color: '#cf4f63' },
      { name: 'Omega Ruby', color: '#d55a47' },
      { name: 'Alpha Sapphire', color: '#4777d6' }
    ]
  },
  7: {
    games: [
      { name: 'Sun', color: '#eb7c2f' },
      { name: 'Moon', color: '#5d6fd8' },
      { name: 'Ultra Sun', color: '#ef6a2d' },
      { name: 'Ultra Moon', color: '#6a58c8' },
      { name: "Let's Go Pikachu", color: '#d9ac26' },
      { name: "Let's Go Eevee", color: '#9a6b43' }
    ]
  },
  8: {
    games: [
      { name: 'Sword', color: '#4e82e8' },
      { name: 'Shield', color: '#d14568' },
      { name: 'Brilliant Diamond', color: '#63a3ef' },
      { name: 'Shining Pearl', color: '#d98bac' }
    ]
  },
  9: {
    games: [
      { name: 'Scarlet', color: '#cb423f' },
      { name: 'Violet', color: '#7950d1' }
    ]
  }
}

export const specialGameSections = [
  {
    label: 'Hisui',
    orderAfterGen: 8,
    games: [{ name: 'Legends Arceus', color: '#8f6d41', region: 'Hisui', supportsAvailability: true }]
  },
  {
    label: 'Kalos',
    orderAfterGen: 9,
    games: [{ name: 'Legends Z-A', color: '#47a86f', region: 'Kalos', supportsAvailability: true }]
  }
]

export const GAME_REGION_BY_KEY = {
  red: 'Kanto',
  blue: 'Kanto',
  yellow: 'Kanto',
  'fire-red': 'Kanto',
  'leaf-green': 'Kanto',
  'lets-go-pikachu': 'Kanto',
  'lets-go-eevee': 'Kanto',
  gold: 'Johto',
  silver: 'Johto',
  crystal: 'Johto',
  'heart-gold': 'Johto',
  'soul-silver': 'Johto',
  ruby: 'Hoenn',
  sapphire: 'Hoenn',
  emerald: 'Hoenn',
  'omega-ruby': 'Hoenn',
  'alpha-sapphire': 'Hoenn',
  diamond: 'Sinnoh',
  pearl: 'Sinnoh',
  platinum: 'Sinnoh',
  'brilliant-diamond': 'Sinnoh',
  'shining-pearl': 'Sinnoh',
  black: 'Unova',
  white: 'Unova',
  'black-2': 'Unova',
  'white-2': 'Unova',
  x: 'Kalos',
  y: 'Kalos',
  'legends-z-a': 'Kalos',
  sun: 'Alola',
  moon: 'Alola',
  'ultra-sun': 'Alola',
  'ultra-moon': 'Alola',
  sword: 'Galar',
  shield: 'Galar',
  'legends-arceus': 'Hisui',
  scarlet: 'Paldea',
  violet: 'Paldea'
}

export const gameStyleLookup = Object.fromEntries(
  [
    ...Object.entries(generationGameDetails).flatMap(([gen, details]) =>
      details.games.map((game) => [
        game.name.toLowerCase(),
        {
          ...game,
          systemClass: Number(gen) <= 5 ? 'pixel' : '3d'
        }
      ])
    ),
    ...specialGameSections.flatMap((section) =>
      section.games.map((game) => [
        game.name.toLowerCase(),
        {
          ...game,
          systemClass: '3d'
        }
      ])
    )
  ]
)

export const buildRegionGames = (names) =>
  names
    .map((name) => gameStyleLookup[name.toLowerCase()])
    .filter(Boolean)

export const regionGameDetails = {
  Kanto: buildRegionGames(['Red', 'Blue', 'Yellow', 'Fire Red', 'Leaf Green', "Let's Go Pikachu", "Let's Go Eevee"]),
  Johto: buildRegionGames(['Gold', 'Silver', 'Crystal', 'SoulSilver', 'HeartGold']),
  Hoenn: buildRegionGames(['Sapphire', 'Ruby', 'Emerald', 'Alpha Sapphire', 'Omega Ruby']),
  Sinnoh: buildRegionGames(['Diamond', 'Pearl', 'Platinum', 'Brilliant Diamond', 'Shining Pearl']),
  Unova: buildRegionGames(['White', 'Black', 'White 2', 'Black 2']),
  Kalos: buildRegionGames(['X', 'Y', 'Legends Z-A']),
  Alola: buildRegionGames(['Sun', 'Moon', 'Ultra Sun', 'Ultra Moon']),
  Galar: buildRegionGames(['Sword', 'Shield']),
  Hisui: buildRegionGames(['Legends Arceus']),
  Paldea: buildRegionGames(['Scarlet', 'Violet'])
}

export const regionalVariantEntries = [
  { pokemonName: 'rattata-alola', displayName: 'Alolan Rattata', generation: 7 },
  { pokemonName: 'raticate-alola', displayName: 'Alolan Raticate', generation: 7 },
  { pokemonName: 'raichu-alola', displayName: 'Alolan Raichu', generation: 7 },
  { pokemonName: 'sandshrew-alola', displayName: 'Alolan Sandshrew', generation: 7 },
  { pokemonName: 'sandslash-alola', displayName: 'Alolan Sandslash', generation: 7 },
  { pokemonName: 'vulpix-alola', displayName: 'Alolan Vulpix', generation: 7 },
  { pokemonName: 'ninetales-alola', displayName: 'Alolan Ninetales', generation: 7 },
  { pokemonName: 'diglett-alola', displayName: 'Alolan Diglett', generation: 7 },
  { pokemonName: 'dugtrio-alola', displayName: 'Alolan Dugtrio', generation: 7 },
  { pokemonName: 'meowth-alola', displayName: 'Alolan Meowth', generation: 7 },
  { pokemonName: 'persian-alola', displayName: 'Alolan Persian', generation: 7 },
  { pokemonName: 'geodude-alola', displayName: 'Alolan Geodude', generation: 7 },
  { pokemonName: 'graveler-alola', displayName: 'Alolan Graveler', generation: 7 },
  { pokemonName: 'golem-alola', displayName: 'Alolan Golem', generation: 7 },
  { pokemonName: 'grimer-alola', displayName: 'Alolan Grimer', generation: 7 },
  { pokemonName: 'muk-alola', displayName: 'Alolan Muk', generation: 7 },
  { pokemonName: 'exeggutor-alola', displayName: 'Alolan Exeggutor', generation: 7 },
  { pokemonName: 'marowak-alola', displayName: 'Alolan Marowak', generation: 7 },
  { pokemonName: 'meowth-galar', displayName: 'Galarian Meowth', generation: 8 },
  { pokemonName: 'ponyta-galar', displayName: 'Galarian Ponyta', generation: 8 },
  { pokemonName: 'rapidash-galar', displayName: 'Galarian Rapidash', generation: 8 },
  { pokemonName: 'slowpoke-galar', displayName: 'Galarian Slowpoke', generation: 8 },
  { pokemonName: 'slowbro-galar', displayName: 'Galarian Slowbro', generation: 8 },
  { pokemonName: 'farfetchd-galar', displayName: "Galarian Farfetch'd", generation: 8 },
  { pokemonName: 'weezing-galar', displayName: 'Galarian Weezing', generation: 8 },
  { pokemonName: 'mr-mime-galar', displayName: 'Galarian Mr. Mime', generation: 8 },
  { pokemonName: 'articuno-galar', displayName: 'Galarian Articuno', generation: 8 },
  { pokemonName: 'zapdos-galar', displayName: 'Galarian Zapdos', generation: 8 },
  { pokemonName: 'moltres-galar', displayName: 'Galarian Moltres', generation: 8 },
  { pokemonName: 'growlithe-hisui', displayName: 'Hisuian Growlithe', generation: 8 },
  { pokemonName: 'arcanine-hisui', displayName: 'Hisuian Arcanine', generation: 8 },
  { pokemonName: 'voltorb-hisui', displayName: 'Hisuian Voltorb', generation: 8 },
  { pokemonName: 'electrode-hisui', displayName: 'Hisuian Electrode', generation: 8 },
  { pokemonName: 'slowking-galar', displayName: 'Galarian Slowking', generation: 8 },
  { pokemonName: 'corsola-galar', displayName: 'Galarian Corsola', generation: 8 },
  { pokemonName: 'cursola', displayName: 'Cursola', generation: 8 },
  { pokemonName: 'zigzagoon-galar', displayName: 'Galarian Zigzagoon', generation: 8 },
  { pokemonName: 'linoone-galar', displayName: 'Galarian Linoone', generation: 8 },
  { pokemonName: 'obstagoon', displayName: 'Obstagoon', generation: 8 },
  { pokemonName: 'perrserker', displayName: 'Perrserker', generation: 8 },
  { pokemonName: 'sirfetchd', displayName: "Sirfetch'd", generation: 8 },
  { pokemonName: 'darumaka-galar', displayName: 'Galarian Darumaka', generation: 8 },
  { pokemonName: 'darmanitan-galar-standard', displayName: 'Galarian Darmanitan', generation: 8 },
  { pokemonName: 'qwilfish-hisui', displayName: 'Hisuian Qwilfish', generation: 8 },
  { pokemonName: 'sneasel-hisui', displayName: 'Hisuian Sneasel', generation: 8 },
  { pokemonName: 'typhlosion-hisui', displayName: 'Hisuian Typhlosion', generation: 8 },
  { pokemonName: 'samurott-hisui', displayName: 'Hisuian Samurott', generation: 8 },
  { pokemonName: 'lilligant-hisui', displayName: 'Hisuian Lilligant', generation: 8 },
  { pokemonName: 'zorua-hisui', displayName: 'Hisuian Zorua', generation: 8 },
  { pokemonName: 'zoroark-hisui', displayName: 'Hisuian Zoroark', generation: 8 },
  { pokemonName: 'braviary-hisui', displayName: 'Hisuian Braviary', generation: 8 },
  { pokemonName: 'sliggoo-hisui', displayName: 'Hisuian Sliggoo', generation: 8 },
  { pokemonName: 'goodra-hisui', displayName: 'Hisuian Goodra', generation: 8 },
  { pokemonName: 'avalugg-hisui', displayName: 'Hisuian Avalugg', generation: 8 },
  { pokemonName: 'decidueye-hisui', displayName: 'Hisuian Decidueye', generation: 8 },
  { pokemonName: 'yamask-galar', displayName: 'Galarian Yamask', generation: 8 },
  { pokemonName: 'runerigus', displayName: 'Runerigus', generation: 8 },
  { pokemonName: 'mr-rime', displayName: 'Mr. Rime', generation: 8 },
  { pokemonName: 'stunfisk-galar', displayName: 'Galarian Stunfisk', generation: 8 },
  { pokemonName: 'wooper-paldea', displayName: 'Paldean Wooper', generation: 9 },
  { pokemonName: 'clodsire', displayName: 'Clodsire', generation: 9 },
  { pokemonName: 'tauros-paldea-combat-breed', displayName: 'Paldean Tauros', generation: 9 },
  { pokemonName: 'tauros-paldea-blaze-breed', displayName: 'Paldean Tauros Blaze Breed', generation: 9 },
  { pokemonName: 'tauros-paldea-aqua-breed', displayName: 'Paldean Tauros Aqua Breed', generation: 9 }
]

export const getRegionalVariantEntriesForGeneration = (generation) =>
  regionalVariantEntries.filter((entry) => entry.generation === generation)

export const legendsArceusIntroducedEntries = [
  { pokemonName: 'wyrdeer', displayName: 'Wyrdeer', generation: 8 },
  { pokemonName: 'kleavor', displayName: 'Kleavor', generation: 8 },
  { pokemonName: 'ursaluna', displayName: 'Ursaluna', generation: 8 },
  { pokemonName: 'basculegion-male', displayName: 'Basculegion', generation: 8 },
  { pokemonName: 'basculegion-female', displayName: 'Basculegion Female', generation: 8 },
  { pokemonName: 'sneasler', displayName: 'Sneasler', generation: 8 },
  { pokemonName: 'overqwil', displayName: 'Overqwil', generation: 8 },
  { pokemonName: 'enamorus-incarnate', displayName: 'Enamorus', generation: 8 },
  { pokemonName: 'dialga-origin', displayName: 'Origin Forme Dialga', generation: 8 },
  { pokemonName: 'palkia-origin', displayName: 'Origin Forme Palkia', generation: 8 }
]

export const legendsZaBaseDexes = new Set(legendsZaAvailability.baseDexes)
export const legendsZaRegionalVariantNames = new Set(legendsZaAvailability.regionalVariants)
export const legendsZaMegaPokemonNames = new Set(legendsZaAvailability.megaPokemon)

export const galarSpecialPokemonNames = new Set([
  'meowth-galar',
  'ponyta-galar',
  'rapidash-galar',
  'slowpoke-galar',
  'slowbro-galar',
  'farfetchd-galar',
  'weezing-galar',
  'mr-mime-galar',
  'articuno-galar',
  'zapdos-galar',
  'moltres-galar',
  'slowking-galar',
  'corsola-galar',
  'cursola',
  'zigzagoon-galar',
  'linoone-galar',
  'obstagoon',
  'perrserker',
  'sirfetchd',
  'darumaka-galar',
  'darmanitan-galar-standard',
  'yamask-galar',
  'runerigus',
  'mr-rime',
  'stunfisk-galar'
])

export const hisuiSpecialPokemonNames = new Set([
  'growlithe-hisui',
  'arcanine-hisui',
  'voltorb-hisui',
  'electrode-hisui',
  'qwilfish-hisui',
  'sneasel-hisui',
  'typhlosion-hisui',
  'samurott-hisui',
  'lilligant-hisui',
  'zorua-hisui',
  'zoroark-hisui',
  'braviary-hisui',
  'sliggoo-hisui',
  'goodra-hisui',
  'avalugg-hisui',
  'decidueye-hisui',
  ...legendsArceusIntroducedEntries.map((entry) => entry.pokemonName)
])

export const alolaSpecialEntries = regionalVariantEntries.filter((entry) => entry.pokemonName.includes('-alola'))
export const galarSpecialEntries = regionalVariantEntries.filter((entry) => galarSpecialPokemonNames.has(entry.pokemonName))
export const hisuiSpecialEntries = regionalVariantEntries.filter((entry) => entry.pokemonName.includes('-hisui'))
export const paldeaSpecialEntries = regionalVariantEntries.filter((entry) => entry.generation === 9)

export const generationDlcSections = {
  8: [
    {
      title: 'Isle of Armor',
      dexes: new Set([891, 892])
    },
    {
      title: 'Crown Tundra',
      dexes: new Set([894, 895, 896, 897, 898])
    }
  ],
  9: [
    {
      title: 'The Teal Mask',
      dexes: new Set([1011, 1012, 1013, 1014, 1015, 1016, 1017])
    },
    {
      title: 'The Indigo Disk',
      dexes: new Set([1018, 1019, 1020, 1021, 1022, 1023, 1024])
    },
    {
      title: 'Mochi Mayhem',
      dexes: new Set([1025])
    }
  ]
}

export const gameDlcSectionConfigs = {
  sword: [
    { key: 'isle-of-armor', title: 'Isle of Armor', dexes: new Set(dlcPokedexes.isleOfArmor) },
    { key: 'crown-tundra', title: 'Crown Tundra', dexes: new Set(dlcPokedexes.crownTundra) }
  ],
  shield: [
    { key: 'isle-of-armor', title: 'Isle of Armor', dexes: new Set(dlcPokedexes.isleOfArmor) },
    { key: 'crown-tundra', title: 'Crown Tundra', dexes: new Set(dlcPokedexes.crownTundra) }
  ],
  scarlet: [
    { key: 'the-teal-mask', title: 'The Teal Mask', dexes: new Set(dlcPokedexes.theTealMask) },
    { key: 'the-indigo-disk', title: 'The Indigo Disk', dexes: new Set(dlcPokedexes.theIndigoDisk) },
    { key: 'mochi-mayhem', title: 'Mochi Mayhem', dexes: new Set(dlcPokedexes.mochiMayhem) }
  ],
  violet: [
    { key: 'the-teal-mask', title: 'The Teal Mask', dexes: new Set(dlcPokedexes.theTealMask) },
    { key: 'the-indigo-disk', title: 'The Indigo Disk', dexes: new Set(dlcPokedexes.theIndigoDisk) },
    { key: 'mochi-mayhem', title: 'Mochi Mayhem', dexes: new Set(dlcPokedexes.mochiMayhem) }
  ]
}

export const gameAvailabilityRules = {
  sun: {
    includePokemon: alolaSpecialEntries
  },
  moon: {
    includePokemon: alolaSpecialEntries
  },
  'ultra-sun': {
    includePokemon: alolaSpecialEntries
  },
  'ultra-moon': {
    includePokemon: alolaSpecialEntries
  },
  'lets-go-pikachu': {
    includePokemon: alolaSpecialEntries
  },
  'lets-go-eevee': {
    includePokemon: alolaSpecialEntries
  },
  sword: {
    includePokemon: galarSpecialEntries
  },
  shield: {
    includePokemon: galarSpecialEntries
  },
  'legends-arceus': {
    includePokemon: [...hisuiSpecialEntries, ...legendsArceusIntroducedEntries]
  },
  scarlet: {
    includePokemon: paldeaSpecialEntries
  },
  violet: {
    includePokemon: paldeaSpecialEntries
  }
}

export const specialPokemonEntryLookup = Object.fromEntries(
  [...regionalVariantEntries, ...legendsArceusIntroducedEntries, ...megaEntries].map((entry) => [entry.pokemonName, entry])
)

export const allSpecialPokemonNames = new Set(Object.keys(specialPokemonEntryLookup))

export const championsPokemonOrderTokens = [
  3, 'venusaur-mega',
  6, 'charizard-mega-x', 'charizard-mega-y',
  9, 'blastoise-mega',
  15, 'beedrill-mega',
  18, 'pidgeot-mega',
  24,
  25,
  26, 'raichu-alola',
  36, 'clefable-mega',
  38, 'ninetales-alola',
  59, 'arcanine-hisui',
  65, 'alakazam-mega',
  68,
  71, 'victreebel-mega',
  80, 'slowbro-mega', 'slowbro-galar',
  94, 'gengar-mega',
  115, 'kangaskhan-mega',
  121, 'starmie-mega',
  127, 'pinsir-mega',
  128, 'tauros-paldea-combat-breed',
  130, 'gyarados-mega',
  132,
  134,
  135,
  136,
  142, 'aerodactyl-mega',
  143,
  149, 'dragonite-mega',
  154, 'meganium-mega',
  157, 'typhlosion-hisui',
  160, 'feraligatr-mega',
  168,
  181, 'ampharos-mega',
  184,
  186,
  196,
  197,
  199, 'slowking-galar',
  205,
  208, 'steelix-mega',
  212, 'scizor-mega',
  214, 'heracross-mega',
  227, 'skarmory-mega',
  229, 'houndoom-mega',
  248, 'tyranitar-mega',
  279,
  282, 'gardevoir-mega',
  302, 'sableye-mega',
  306, 'aggron-mega',
  308, 'medicham-mega',
  310, 'manectric-mega',
  319, 'sharpedo-mega',
  323, 'camerupt-mega',
  324,
  334, 'altaria-mega',
  350,
  351,
  354, 'banette-mega',
  358, 'chimecho-mega',
  359, 'absol-mega',
  362, 'glalie-mega',
  389,
  392,
  395,
  405,
  407,
  409,
  411,
  428, 'lopunny-mega',
  442,
  445, 'garchomp-mega',
  448, 'lucario-mega',
  450,
  454,
  460, 'abomasnow-mega',
  461,
  464,
  470,
  471,
  472,
  473,
  475, 'gallade-mega',
  478, 'froslass-mega',
  479,
  497,
  500, 'emboar-mega',
  503, 'samurott-hisui',
  505,
  510,
  512,
  514,
  516,
  530, 'excadrill-mega',
  531, 'audino-mega',
  534,
  547,
  553,
  563,
  569,
  571, 'zoroark-hisui',
  579,
  584,
  587,
  609, 'chandelure-mega',
  614,
  618, 'stunfisk-galar',
  623, 'golurk-mega',
  635,
  637,
  652, 'chesnaught-mega',
  655, 'delphox-mega',
  658, 'greninja-mega',
  660,
  663,
  666,
  670, 'floette-mega',
  671,
  675,
  676,
  678, 'meowstic-mega',
  681,
  683,
  685,
  693,
  695,
  697,
  699,
  700,
  701, 'hawlucha-mega',
  702,
  706, 'goodra-hisui',
  707,
  709,
  711,
  713, 'avalugg-hisui',
  715,
  724, 'decidueye-hisui',
  727,
  730,
  733,
  740, 'crabominable-mega',
  745,
  748,
  750,
  752,
  758,
  763,
  765,
  766,
  778,
  780, 'drampa-mega',
  784,
  823,
  841,
  842,
  844,
  855,
  858,
  'mr-rime',
  'runerigus',
  869,
  877,
  887,
  'wyrdeer',
  'kleavor',
  'basculegion-male',
  'sneasler',
  908,
  911,
  914,
  925,
  934,
  936,
  937,
  939,
  952, 'scovillain-mega',
  956,
  959,
  964,
  968,
  970, 'glimmora-mega',
  981,
  983,
  1013,
  1018,
  1019
]

export const championsBaseSpeciesOrder = new Map()
export const championsSpecialPokemonOrder = new Map()

championsPokemonOrderTokens.forEach((token, index) => {
  if (typeof token === 'number') {
    championsBaseSpeciesOrder.set(token, index)
    return
  }

  championsSpecialPokemonOrder.set(token, index)
})

export const championsSpecialEntries = Array.from(
  new Map(
    [...championsSpecialPokemonOrder.keys()]
      .map((pokemonName) => [pokemonName, specialPokemonEntryLookup[pokemonName]])
      .filter(([, entry]) => Boolean(entry))
  ).values()
)

export const getChampionsPokemonOrderIndex = (pokemon) => {
  if (!pokemon) {
    return Number.POSITIVE_INFINITY
  }

  if (championsSpecialPokemonOrder.has(pokemon.apiName)) {
    return championsSpecialPokemonOrder.get(pokemon.apiName)
  }

  if (allSpecialPokemonNames.has(pokemon.apiName)) {
    return Number.POSITIVE_INFINITY
  }

  const speciesId = pokemon.speciesId || pokemon.id
  return championsBaseSpeciesOrder.has(speciesId)
    ? championsBaseSpeciesOrder.get(speciesId)
    : Number.POSITIVE_INFINITY
}

export const isPokemonInChampionsRoster = (pokemon) =>
  getChampionsPokemonOrderIndex(pokemon) !== Number.POSITIVE_INFINITY

gameAvailabilityRules.champions = {
  includePokemon: championsSpecialEntries
}

export const gameKeyAliases = {
  heartgold: 'heart-gold',
  'let-s-go-pikachu': 'lets-go-pikachu',
  'let-s-go-eevee': 'lets-go-eevee',
  soulsilver: 'soul-silver'
}

export const toGameKey = (name) => {
  const baseKey = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  return gameKeyAliases[baseKey] || baseKey
}

export const formatDisplayName = (value) =>
  value
    .split(/[- ]+/)
    .map(part => (part ? part.charAt(0).toUpperCase() + part.slice(1) : ''))
    .join(' ')

export const normalizeDisplayName = (value = '') => value.toLowerCase().replace(/[^a-z0-9]+/g, '')
export const getRegionColorClassName = (regionName = '') => `region-color-${normalizeDisplayName(regionName)}`

export const formatEncounterLevelRange = (minimumLevel = null, maximumLevel = null) => {
  const hasMinimumLevel = Number.isInteger(minimumLevel)
  const hasMaximumLevel = Number.isInteger(maximumLevel)

  if (!hasMinimumLevel && !hasMaximumLevel) {
    return null
  }

  if (hasMinimumLevel && hasMaximumLevel) {
    return minimumLevel === maximumLevel ? `Lv. ${minimumLevel}` : `Lv. ${minimumLevel}-${maximumLevel}`
  }

  return `Lv. ${hasMinimumLevel ? minimumLevel : maximumLevel}`
}

export const buildPokemonEncounterDetails = (encounterAreas = []) => {
  if (!Array.isArray(encounterAreas) || encounterAreas.length === 0) {
    return []
  }

  const encountersByGame = new Map()

  encounterAreas.forEach((areaEntry) => {
    const locationName = formatDisplayName(areaEntry.location_area?.name || 'unknown-area')

    ;(areaEntry.version_details || []).forEach((versionDetail) => {
      const gameKey = toGameKey(versionDetail.version?.name || '')

      if (!gameKey) {
        return
      }

      const existingGame = encountersByGame.get(gameKey) || {
        gameKey,
        gameName: formatDisplayName(versionDetail.version?.name || 'unknown'),
        locations: new Map()
      }

      const existingLocation = existingGame.locations.get(locationName) || {
        name: locationName,
        methods: new Set(),
        minLevel: null,
        maxLevel: null,
        maxChance: 0
      }

      ;(versionDetail.encounter_details || []).forEach((encounterDetail) => {
        if (encounterDetail.method?.name) {
          existingLocation.methods.add(formatDisplayName(encounterDetail.method.name))
        }

        if (Number.isInteger(encounterDetail.min_level)) {
          existingLocation.minLevel = existingLocation.minLevel === null
            ? encounterDetail.min_level
            : Math.min(existingLocation.minLevel, encounterDetail.min_level)
        }

        if (Number.isInteger(encounterDetail.max_level)) {
          existingLocation.maxLevel = existingLocation.maxLevel === null
            ? encounterDetail.max_level
            : Math.max(existingLocation.maxLevel, encounterDetail.max_level)
        }

        if (typeof encounterDetail.chance === 'number') {
          existingLocation.maxChance = Math.max(existingLocation.maxChance, encounterDetail.chance)
        }
      })

      if (existingLocation.maxChance === 0 && typeof versionDetail.max_chance === 'number') {
        existingLocation.maxChance = versionDetail.max_chance
      }

      existingGame.locations.set(locationName, existingLocation)
      encountersByGame.set(gameKey, existingGame)
    })
  })

  return [...encountersByGame.values()].map((game) => ({
    gameKey: game.gameKey,
    gameName: game.gameName,
    locations: [...game.locations.values()]
      .map((location) => ({
        name: location.name,
        methods: [...location.methods].sort((a, b) => a.localeCompare(b)),
        minLevel: location.minLevel,
        maxLevel: location.maxLevel,
        maxChance: location.maxChance
      }))
      .sort((a, b) => b.maxChance - a.maxChance || a.name.localeCompare(b.name))
  }))
}

export const buildPokemonSpeciesBrowseData = (speciesData = {}) => {
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

export const excludedAvailabilityPrefixes = ['—', 'Ev', 'EV', 'DW', 'DR', 'PW', 'TE', 'T']
export const includedAvailabilityPrefixes = ['CC', 'CD', 'DA', 'ET', 'DS', 'FS', 'C', 'S', 'R', 'E', 'B', 'D']

export const normalizeAvailabilityCode = (value = '') => value.replace(/\*/g, '').trim()

export const isAvailabilityCodeIncluded = (value = '') => {
  const normalized = normalizeAvailabilityCode(value)

  if (!normalized) {
    return false
  }

  if (excludedAvailabilityPrefixes.some((prefix) => normalized.startsWith(prefix))) {
    return false
  }

  return includedAvailabilityPrefixes.some((prefix) => normalized.startsWith(prefix))
}

export const isDlcOnlyAvailabilityCode = (value = '', gameKey = '') => {
  const normalized = normalizeAvailabilityCode(value)

  if (!isAvailabilityCodeIncluded(normalized)) {
    return false
  }

  if (gameKey === 'sword' || gameKey === 'shield') {
    return normalized !== 'D' && normalized.includes('D')
  }

  if (gameKey === 'scarlet' || gameKey === 'violet') {
    return normalized.includes('D')
  }

  return false
}

export const getEnglishEffectText = (entries = []) => {
  const englishEntry =
    entries.find((entry) => entry.language?.name === 'en' && entry.short_effect) ||
    entries.find((entry) => entry.language?.name === 'en' && entry.effect)

  return englishEntry?.short_effect || englishEntry?.effect || 'No effect description available.'
}

export const extractEnglishEffectText = (entries = []) => {
  const englishEntry =
    entries.find((entry) => entry.language?.name === 'en' && entry.short_effect) ||
    entries.find((entry) => entry.language?.name === 'en' && entry.effect)

  return englishEntry?.short_effect || englishEntry?.effect || null
}

export const isBattleRelevantItem = (detail, effectText) => {
  const categoryName = detail.category?.name || ''
  const itemName = detail.name || ''
  const attributeNames = (detail.attributes || []).map((attribute) => attribute.name)
  const normalizedEffect = effectText.toLowerCase()
  const excludedCategoryKeywords = [
    'mail',
    'data-card',
    'data-cards',
    'machine',
    'machines',
    'medicine',
    'healing',
    'revival',
    'pp-recovery',
    'status-cures',
    'bikes'
  ]
  const excludedNamePatterns = [
    /-mail$/,
    /(^|-)bike$/,
    /^x-/,
    /^antidote$/,
    /^awakening$/,
    /^burn-heal$/,
    /^ice-heal$/,
    /^paralyze-heal$/,
    /^full-heal$/,
    /^full-restore$/,
    /(^|-)potion$/,
    /^ether$/,
    /^max-ether$/,
    /^elixir$/,
    /^max-elixir$/
  ]
  const excludedEffectPhrases = [
    'restores hp',
    'recovers hp',
    'restores the user',
    'restores 10 pp',
    'restores pp',
    'restores the pp',
    'restoring pp',
    'revives a fainted',
    'cures paralysis',
    'cures poison',
    'cures burn',
    'cures sleep',
    'awakens a sleeping',
    'heals all the status problems',
    'restores all hp',
    'fully restores'
  ]

  if (!effectText || normalizedEffect === 'no effect description available.') {
    return false
  }

  if (
    excludedCategoryKeywords.some((keyword) => categoryName.includes(keyword)) ||
    excludedNamePatterns.some((pattern) => pattern.test(itemName)) ||
    excludedEffectPhrases.some((phrase) => normalizedEffect.includes(phrase))
  ) {
    return false
  }

  if (
    categoryName.includes('machine') ||
    categoryName.includes('machines') ||
    normalizedEffect.includes('teaches ') ||
    normalizedEffect.includes('teach ') ||
    /^tm\d+/i.test(itemName) ||
    /^hm\d+/i.test(itemName)
  ) {
    return false
  }

  if (categoryName.includes('mega-stones')) {
    return true
  }

  if (categoryName.includes('berries')) {
    return true
  }

  if (categoryName.includes('balls')) {
    return false
  }

  if (attributeNames.includes('usable-in-battle')) {
    return true
  }

  const battleKeywords = [
    'in battle',
    'during battle',
    'held in battle',
    'used on a pokemon in battle',
    'restores hp',
    'restores the user',
    'recovers hp',
    'revives',
    'pp',
    'accuracy',
    'critical hit',
    'flinch',
    'confusion',
    'paraly',
    'poison',
    'burn',
    'freeze',
    'sleep',
    'status condition',
    'damage',
    'super effective',
    'special attack',
    'special defense',
    'attack',
    'defense',
    'speed',
    'moves',
    'move power',
    'turns',
    'switching',
    'rain',
    'sun',
    'sandstorm',
    'hail',
    'snow',
    'fleeing',
    'contact move',
    'type'
  ]

  return battleKeywords.some((keyword) => normalizedEffect.includes(keyword))
}

export const getResourceIdFromUrl = (url = '', resourceName = '') => {
  const escapedResource = resourceName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const match = url.match(new RegExp(`/${escapedResource}/(\\d+)/?$`))
  return match ? Number.parseInt(match[1], 10) : null
}

export const formatEvolutionRequirement = (evolutionDetails) => {
  if (!evolutionDetails || evolutionDetails.length === 0) {
    return 'Base form'
  }

  const detail = evolutionDetails[0]
  const parts = []

  if (detail.trigger?.name === 'level-up' && detail.min_level) {
    parts.push(`Level ${detail.min_level}`)
  } else if (detail.trigger?.name === 'trade') {
    parts.push('Trade')
  } else if (detail.trigger?.name === 'use-item' && detail.item) {
    parts.push(`Use ${formatDisplayName(detail.item.name)}`)
  } else if (detail.trigger?.name) {
    parts.push(formatDisplayName(detail.trigger.name))
  }

  if (detail.item && detail.trigger?.name !== 'use-item') {
    parts.push(`Use ${formatDisplayName(detail.item.name)}`)
  }

  if (detail.held_item) {
    parts.push(`Hold ${formatDisplayName(detail.held_item.name)}`)
  }

  if (detail.known_move) {
    parts.push(`Knows ${formatDisplayName(detail.known_move.name)}`)
  }

  if (detail.known_move_type) {
    parts.push(`${formatDisplayName(detail.known_move_type.name)} move`)
  }

  if (detail.location) {
    parts.push(`At ${formatDisplayName(detail.location.name)}`)
  }

  if (detail.min_happiness) {
    parts.push('High friendship')
  }

  if (detail.min_beauty) {
    parts.push(`Beauty ${detail.min_beauty}+`)
  }

  if (detail.min_affection) {
    parts.push(`Affection ${detail.min_affection}+`)
  }

  if (detail.time_of_day) {
    parts.push(`At ${formatDisplayName(detail.time_of_day)}`)
  }

  if (detail.trade_species) {
    parts.push(`For ${formatDisplayName(detail.trade_species.name)}`)
  }

  if (detail.gender === 1) {
    parts.push('Female')
  } else if (detail.gender === 2) {
    parts.push('Male')
  }

  if (detail.relative_physical_stats === 1) {
    parts.push('Attack > Defense')
  } else if (detail.relative_physical_stats === -1) {
    parts.push('Attack < Defense')
  } else if (detail.relative_physical_stats === 0) {
    parts.push('Attack = Defense')
  }

  if (detail.needs_overworld_rain) {
    parts.push('While raining')
  }

  if (detail.turn_upside_down) {
    parts.push('Upside down')
  }

    return parts.length > 0 ? parts.join(' + ') : 'Special'
}

export const clampInteger = (value, minimum, maximum, fallback = minimum) => {
  const parsed = Number.parseInt(value, 10)

  if (Number.isNaN(parsed)) {
    return fallback
  }

  return Math.min(maximum, Math.max(minimum, parsed))
}

export const normalizeTeamBuildValues = (values, defaults, minimum, maximum) =>
  BUILD_STAT_ROWS.reduce((nextValues, stat) => {
    const fallback = defaults[stat.key]
    nextValues[stat.key] = clampInteger(values?.[stat.key], minimum, maximum, fallback)
    return nextValues
  }, {})

export const normalizeTeamNature = (natureKey) =>
  TEAM_NATURE_LOOKUP[natureKey] ? natureKey : DEFAULT_NATURE_KEY

export const getPokemonNatureData = (pokemon) =>
  TEAM_NATURE_LOOKUP[normalizeTeamNature(pokemon?.nature)] || TEAM_NATURE_LOOKUP[DEFAULT_NATURE_KEY]

export const getPokemonEvs = (pokemon) =>
  normalizeTeamBuildValues(pokemon?.evs, DEFAULT_TEAM_EVS, 0, 252)

export const getNatureMultiplier = (natureKey, statKey) => {
  if (statKey === 'hp') {
    return 1
  }

  const nature = TEAM_NATURE_LOOKUP[normalizeTeamNature(natureKey)] || TEAM_NATURE_LOOKUP[DEFAULT_NATURE_KEY]

  if (nature.increase === statKey) {
    return 1.1
  }

  if (nature.decrease === statKey) {
    return 0.9
  }

  return 1
}

export const calculateLevelHundredStat = (statKey, baseStat, ivValue, evValue, natureKey) => {
  const baseValue = baseStat * 2 + ivValue + Math.floor(evValue / 4)

  if (statKey === 'hp') {
    return baseValue + TEAM_BUILD_LEVEL + 10
  }

  return Math.floor((baseValue + 5) * getNatureMultiplier(natureKey, statKey))
}

export const getStatBarColorClass = (value) => {
  if (value >= 90) {
    return 'high'
  }

  if (value >= 60) {
    return 'mid'
  }

  return 'low'
}

export const getStatMin = (statName, baseStat) => {
  if (statName === 'hp') {
    return baseStat * 2 + 110
  }

  return Math.floor((baseStat * 2 + 5) * 0.9)
}

export const getStatMax = (statName, baseStat) => {
  if (statName === 'hp') {
    return baseStat * 2 + 204
  }

  return Math.floor((baseStat * 2 + 99) * 1.1)
}

export const buildEvolutionLine = (chainNode, entries = [], requirement = 'Base form') => {
  entries.push({
    name: formatDisplayName(chainNode.species.name),
    requirement
  })

  chainNode.evolves_to.forEach((nextNode) => {
    buildEvolutionLine(nextNode, entries, formatEvolutionRequirement(nextNode.evolution_details))
  })

  return entries
}

export const getPokemonStatRows = (pokemon) => {
  if (!pokemon?.stats) {
    return []
  }

  return BUILD_STAT_ROWS.map((stat) => ({
    key: stat.key,
    label: stat.label,
    value: pokemon.stats[stat.key]
  }))
}

export const getPokemonBst = (pokemon) =>
  getPokemonStatRows(pokemon).reduce((sum, stat) => sum + stat.value, 0)

export const getPokemonBuildStatRows = (pokemon) => {
  if (!pokemon?.stats) {
    return []
  }

  const evs = getPokemonEvs(pokemon)
  const natureKey = normalizeTeamNature(pokemon?.nature)

  return BUILD_STAT_ROWS.map((stat) => ({
    key: stat.key,
    label: stat.label,
    value: calculateLevelHundredStat(stat.key, pokemon.stats[stat.key], PERFECT_IV_VALUE, evs[stat.key], natureKey)
  }))
}

export const getPokemonBuildBst = (pokemon) =>
  getPokemonBuildStatRows(pokemon).reduce((sum, stat) => sum + stat.value, 0)

export const getBuildEvSummary = (pokemon) => {
  const evs = getPokemonEvs(pokemon)
  const spread = BUILD_STAT_ROWS
    .filter((stat) => evs[stat.key] > 0)
    .sort((a, b) => evs[b.key] - evs[a.key] || a.label.localeCompare(b.label))
    .map((stat) => `${evs[stat.key]} ${stat.label}`)

  return spread.length > 0 ? spread.join(' / ') : 'No EVs'
}

export const getPokemonBuildSummary = (pokemon) => {
  const nature = getPokemonNatureData(pokemon)
  const evs = getPokemonEvs(pokemon)
  const evTotal = Object.values(evs).reduce((sum, value) => sum + value, 0)

  return {
    nature,
    evTotal,
    evSummary: getBuildEvSummary(pokemon)
  }
}

export const getAssignedMovesForPokemon = (pokemon) =>
  normalizeAssignedMoves(pokemon?.moves).filter(Boolean)

export const getPokemonCoverageTypesFromOwnTypes = (pokemon) => {
  const coveredTypes = new Set()

  for (const type of pokemon?.types || []) {
    const effectiveness = typeEffectiveness[type]

    if (!effectiveness) {
      continue
    }

    effectiveness.strong.forEach((targetType) => {
      coveredTypes.add(targetType)
    })
  }

  return coveredTypes
}

export const getPokemonCoverageTypesFromMoves = (pokemon) => {
  const coveredTypes = new Set()

  getAssignedMovesForPokemon(pokemon).forEach((move) => {
    const effectiveness = typeEffectiveness[move.type]

    if (!effectiveness) {
      return
    }

    effectiveness.strong.forEach((targetType) => {
      coveredTypes.add(targetType)
    })
  })

  return coveredTypes
}

export const normalizeEffectText = (value = '') => value.toLowerCase()

export const getMoveSupportBuckets = (move) => {
  if (!move) {
    return []
  }

  const normalizedName = normalizeEffectText(move.name || move.apiName || '')
  const normalizedEffect = normalizeEffectText(move.effect || '')
  const normalizedCategory = normalizeEffectText(move.category || '')
  const buckets = new Set()

  if (normalizedCategory === 'status') {
    buckets.add('status')
  }

  if (
    normalizedName.includes('stealth rock') ||
    normalizedName.includes('spikes') ||
    normalizedName.includes('sticky web') ||
    normalizedEffect.includes('entry hazard')
  ) {
    buckets.add('hazards')
  }

  if (
    normalizedName.includes('defog') ||
    normalizedName.includes('rapid spin') ||
    normalizedName.includes('mortal spin') ||
    normalizedName.includes('court change') ||
    normalizedName.includes('tidy up')
  ) {
    buckets.add('removal')
  }

  if (
    normalizedName.includes('recover') ||
    normalizedName.includes('roost') ||
    normalizedName.includes('wish') ||
    normalizedName.includes('slack off') ||
    normalizedName.includes('soft-boiled') ||
    normalizedName.includes('moonlight') ||
    normalizedName.includes('morning sun') ||
    normalizedName.includes('shore up') ||
    normalizedName.includes('heal order') ||
    normalizedEffect.includes('restores the user')
  ) {
    buckets.add('recovery')
  }

  if (
    normalizedName.includes('tailwind') ||
    normalizedName.includes('trick room') ||
    normalizedName.includes('thunder wave') ||
    normalizedName.includes('icy wind') ||
    normalizedName.includes('electroweb') ||
    normalizedName.includes('string shot') ||
    normalizedName.includes('bulldoze') ||
    normalizedName.includes('scary face') ||
    normalizedEffect.includes('lowers the target speed') ||
    normalizedEffect.includes('paralyzes the target')
  ) {
    buckets.add('speed')
  }

  if (
    normalizedName.includes('u-turn') ||
    normalizedName.includes('volt switch') ||
    normalizedName.includes('flip turn') ||
    normalizedName.includes('parting shot') ||
    normalizedName.includes('teleport') ||
    normalizedName.includes('baton pass') ||
    normalizedEffect.includes('switches out')
  ) {
    buckets.add('pivot')
  }

  if (
    normalizedName.includes('reflect') ||
    normalizedName.includes('light screen') ||
    normalizedName.includes('aurora veil') ||
    normalizedName.includes('safeguard')
  ) {
    buckets.add('screens')
  }

  if (
    normalizedEffect.includes('burns the target') ||
    normalizedEffect.includes('poisons the target') ||
    normalizedEffect.includes('badly poisons') ||
    normalizedEffect.includes('puts the target to sleep') ||
    normalizedEffect.includes('paralyzes the target') ||
    normalizedName.includes('toxic') ||
    normalizedName.includes('will-o-wisp') ||
    normalizedName.includes('spore') ||
    normalizedName.includes('yawn')
  ) {
    buckets.add('status-spread')
  }

  return [...buckets]
}

export const createAssignedMoveEntry = (moveData) => {
  if (!moveData) {
    return null
  }

  const apiName = moveData.apiName || moveData.move?.name || moveData.name || null

  return {
    id: moveData.id || getResourceIdFromUrl(moveData.url || moveData.move?.url || '', 'move') || null,
    name: moveData.name || formatDisplayName(apiName || 'unknown'),
    apiName,
    type: moveData.type || 'normal',
    pp: moveData.pp ?? EMPTY_MOVE_VALUE,
    power: moveData.power ?? EMPTY_MOVE_VALUE,
    accuracy: moveData.accuracy ?? EMPTY_MOVE_VALUE,
    category: moveData.category || formatDisplayName(moveData.damage_class?.name || 'unknown'),
    effect: moveData.effect || null
  }
}

export const normalizeAssignedMoves = (moves = []) =>
  Array.from({ length: TEAM_MOVE_SLOT_COUNT }, (_, index) => createAssignedMoveEntry(moves[index]))

export const buildPokemonLearnset = (moveEntries = []) => {
  const learnsetMap = new Map()

  moveEntries.forEach((moveEntry) => {
    const apiName = moveEntry.move?.name

    if (!apiName) {
      return
    }

    ;(moveEntry.version_group_details || []).forEach((detail) => {
      const versionGroup = detail.version_group?.name
      const method = detail.move_learn_method?.name

      if (!versionGroup || !method) {
        return
      }

      const learnsetKey = `${apiName}:${versionGroup}:${method}:${detail.level_learned_at || 0}`
      if (learnsetMap.has(learnsetKey)) {
        return
      }

      learnsetMap.set(learnsetKey, {
        apiName,
        name: formatDisplayName(apiName),
        versionGroup,
        method,
        level: Number(detail.level_learned_at) || 0,
        order: Number.isFinite(detail.order) ? detail.order : Number.MAX_SAFE_INTEGER
      })
    })
  })

  const entries = [...learnsetMap.values()].sort((a, b) => {
    const versionCompare = (versionGroupSortIndex[a.versionGroup] ?? -1) - (versionGroupSortIndex[b.versionGroup] ?? -1)

    if (versionCompare !== 0) {
      return versionCompare
    }

    if (a.level !== b.level) {
      return a.level - b.level
    }

    return a.name.localeCompare(b.name)
  })

  return {
    entries,
    versionGroups: [...new Set(entries.map((entry) => entry.versionGroup))]
  }
}

export const createTeamPokemonEntry = (pokemonData) => ({
  ...pokemonData,
  isShiny: Boolean(pokemonData.isShiny),
  nature: normalizeTeamNature(pokemonData.nature),
  evs: getPokemonEvs(pokemonData),
  selectedAbilityApiName:
    pokemonData.selectedAbilityApiName ||
    (pokemonData.abilities || []).find((ability) => !ability.isHidden)?.name ||
    pokemonData.abilities?.[0]?.name ||
    '',
  heldItem: pokemonData.heldItem || null,
  moves: normalizeAssignedMoves(pokemonData.moves)
})

export const cloneTeamSlots = (slots = []) =>
  Array.from({ length: TEAM_SLOT_COUNT }, (_, index) => {
    const slot = slots[index]

    if (!slot) {
      return null
    }

    return createTeamPokemonEntry({
      ...slot,
      types: Array.isArray(slot.types) ? [...slot.types] : [],
      stats: slot.stats ? { ...slot.stats } : {},
      abilities: Array.isArray(slot.abilities) ? slot.abilities.map((ability) => ({ ...ability })) : [],
      nature: normalizeTeamNature(slot.nature),
      evs: getPokemonEvs(slot),
      selectedAbilityApiName: slot.selectedAbilityApiName || '',
      heldItem: slot.heldItem ? { ...slot.heldItem } : null,
      moves: normalizeAssignedMoves(slot.moves)
    })
  })

export const serializeTeamSlots = (slots = []) =>
  Array.from({ length: TEAM_SLOT_COUNT }, (_, index) => {
    const slot = slots[index]

    if (!slot) {
      return null
    }

    return {
      id: slot.id,
      name: slot.name,
      apiName: slot.apiName,
      image: slot.image,
      normalImage: slot.normalImage,
      shinyImage: slot.shinyImage,
      animatedNormalImage: slot.animatedNormalImage || null,
      animatedShinyImage: slot.animatedShinyImage || null,
      isShiny: Boolean(slot.isShiny),
      types: Array.isArray(slot.types) ? [...slot.types] : [],
      stats: slot.stats ? { ...slot.stats } : {},
      speciesUrl: slot.speciesUrl || null,
      speciesId: slot.speciesId || slot.id,
      abilities: Array.isArray(slot.abilities) ? slot.abilities.map((ability) => ({ ...ability })) : [],
      nature: normalizeTeamNature(slot.nature),
      evs: getPokemonEvs(slot),
      selectedAbilityApiName: slot.selectedAbilityApiName || '',
      heldItem: slot.heldItem
        ? {
            id: slot.heldItem.id,
            name: slot.heldItem.name,
            apiName: slot.heldItem.apiName,
            image: slot.heldItem.image,
            availableGameKeys: Array.isArray(slot.heldItem.availableGameKeys) ? [...slot.heldItem.availableGameKeys] : []
          }
        : null,
      moves: normalizeAssignedMoves(slot.moves).map((move) => (
        move
          ? {
              id: move.id,
              name: move.name,
              apiName: move.apiName,
              type: move.type,
              pp: move.pp,
              power: move.power,
              accuracy: move.accuracy,
              category: move.category,
              effect: move.effect || null
            }
          : null
      ))
    }
  })

export const getTeamSnapshotSignature = (snapshot) => JSON.stringify(snapshot)

export const sortSavedTeams = (savedTeams) =>
  [...savedTeams].sort((a, b) => new Date(b.savedAt || 0).getTime() - new Date(a.savedAt || 0).getTime())

export const sanitizeStorageText = (value, maxLength = 120) => {
  if (typeof value !== 'string') {
    return ''
  }

  return value.replace(/[\u0000-\u001F\u007F]/g, '').trim().slice(0, maxLength)
}

export const sanitizeStoredAbility = (ability) => {
  if (!ability || typeof ability !== 'object') {
    return null
  }

  const name = sanitizeStorageText(ability.name, 80)
  if (!name) {
    return null
  }

  return {
    name,
    isHidden: Boolean(ability.isHidden),
    url: sanitizeStorageText(ability.url, 240) || null
  }
}

export const sanitizeStoredHeldItem = (heldItem) => {
  if (!heldItem || typeof heldItem !== 'object') {
    return null
  }

  const name = sanitizeStorageText(heldItem.name, 80)
  const apiName = sanitizeStorageText(heldItem.apiName, 120)

  if (!name || !apiName) {
    return null
  }

  return {
    id: Number.isInteger(heldItem.id) && heldItem.id > 0 ? heldItem.id : null,
    name,
    apiName,
    image: sanitizeStorageText(heldItem.image, 320),
    availableGameKeys: Array.isArray(heldItem.availableGameKeys)
      ? heldItem.availableGameKeys
          .map((gameKey) => sanitizeStorageText(gameKey, 60))
          .filter(Boolean)
      : []
  }
}

export const sanitizeStoredMove = (move) => {
  if (!move || typeof move !== 'object') {
    return null
  }

  const apiName = sanitizeStorageText(move.apiName, 120)
  const name = sanitizeStorageText(move.name, 80)

  if (!apiName || !name) {
    return null
  }

  return {
    id: Number.isInteger(move.id) && move.id > 0 ? move.id : null,
    name,
    apiName,
    type: sanitizeStorageText(move.type, 40),
    category: sanitizeStorageText(move.category, 40),
    power: sanitizeStorageText(String(move.power ?? EMPTY_MOVE_VALUE), 12) || EMPTY_MOVE_VALUE,
    accuracy: sanitizeStorageText(String(move.accuracy ?? EMPTY_MOVE_VALUE), 12) || EMPTY_MOVE_VALUE,
    pp: Number.isInteger(move.pp) && move.pp >= 0 ? move.pp : 0,
    effect: sanitizeStorageText(move.effect, 320)
  }
}

export const sanitizeStoredTeamSlot = (slot) => {
  if (!slot || typeof slot !== 'object') {
    return null
  }

  const apiName = sanitizeStorageText(slot.apiName, 120)
  const name = sanitizeStorageText(slot.name, 80)
  const speciesId = Number.isInteger(slot.speciesId) && slot.speciesId > 0
    ? slot.speciesId
    : (Number.isInteger(slot.id) && slot.id > 0 ? slot.id : null)

  if (!apiName || !name || !speciesId) {
    return null
  }

  return createTeamPokemonEntry({
    id: Number.isInteger(slot.id) && slot.id > 0 ? slot.id : speciesId,
    name,
    apiName,
    image: sanitizeStorageText(slot.image, 320),
    normalImage: sanitizeStorageText(slot.normalImage, 320),
    shinyImage: sanitizeStorageText(slot.shinyImage, 320),
    animatedNormalImage: sanitizeStorageText(slot.animatedNormalImage, 320),
    animatedShinyImage: sanitizeStorageText(slot.animatedShinyImage, 320),
    isShiny: Boolean(slot.isShiny),
    types: Array.isArray(slot.types)
      ? slot.types.map((type) => sanitizeStorageText(type, 40)).filter(Boolean)
      : [],
    stats: BUILD_STAT_ROWS.reduce((nextStats, stat) => {
      const rawValue = Number(slot.stats?.[stat.key])
      nextStats[stat.key] = Number.isFinite(rawValue) ? Math.max(1, Math.min(255, rawValue)) : 1
      return nextStats
    }, {}),
    speciesUrl: sanitizeStorageText(slot.speciesUrl, 320),
    speciesId,
    abilities: Array.isArray(slot.abilities)
      ? slot.abilities.map(sanitizeStoredAbility).filter(Boolean)
      : [],
    nature: normalizeTeamNature(slot.nature),
    evs: getPokemonEvs(slot),
    selectedAbilityApiName: sanitizeStorageText(slot.selectedAbilityApiName, 120),
    heldItem: sanitizeStoredHeldItem(slot.heldItem),
    moves: Array.from({ length: TEAM_MOVE_SLOT_COUNT }, (_, index) => sanitizeStoredMove(slot.moves?.[index]))
  })
}

export const serializeSavedTeamForStorage = (savedTeam) => {
  if (!savedTeam || typeof savedTeam !== 'object') {
    return null
  }

  const name = sanitizeStorageText(savedTeam.name, MAX_SAVED_TEAM_NAME_LENGTH)
  if (!name) {
    return null
  }

  return {
    id: sanitizeStorageText(savedTeam.id, 80) || `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name,
    savedAt: typeof savedTeam.savedAt === 'string' ? savedTeam.savedAt : new Date().toISOString(),
    slots: serializeTeamSlots(savedTeam.slots).map((slot) => (slot ? {
      ...slot,
      abilities: Array.isArray(slot.abilities) ? slot.abilities.map(sanitizeStoredAbility).filter(Boolean) : [],
      heldItem: sanitizeStoredHeldItem(slot.heldItem),
      moves: Array.from({ length: TEAM_MOVE_SLOT_COUNT }, (_, index) => sanitizeStoredMove(slot.moves?.[index]))
    } : null))
  }
}

export const createTeamSharePayload = (savedTeam) => {
  const safeTeam = serializeSavedTeamForStorage(savedTeam)
  if (!safeTeam) {
    return null
  }

  return {
    app: TEAM_SHARE_APP_ID,
    version: TEAM_SHARE_SCHEMA_VERSION,
    exportedAt: new Date().toISOString(),
    team: safeTeam
  }
}

export const encodeUint8ArrayToBase64 = (bytes) => {
  let binaryString = ''
  const chunkSize = 0x8000

  for (let index = 0; index < bytes.length; index += chunkSize) {
    const chunk = bytes.subarray(index, index + chunkSize)
    binaryString += String.fromCharCode(...chunk)
  }

  return window.btoa(binaryString)
}

export const decodeBase64ToUint8Array = (value) => {
  const binaryString = window.atob(value)
  const bytes = new Uint8Array(binaryString.length)

  for (let index = 0; index < binaryString.length; index += 1) {
    bytes[index] = binaryString.charCodeAt(index)
  }

  return bytes
}

export const encodeUint8ArrayToBase64Url = (bytes) =>
  encodeUint8ArrayToBase64(bytes)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '')

export const decodeBase64UrlToUint8Array = (value) => {
  const normalizedValue = value
    .replace(/-/g, '+')
    .replace(/_/g, '/')
  const paddedValue = normalizedValue.padEnd(Math.ceil(normalizedValue.length / 4) * 4, '=')
  return decodeBase64ToUint8Array(paddedValue)
}

export const compressText = async (value) => {
  const compressedStream = new Blob([value])
    .stream()
    .pipeThrough(new CompressionStream('gzip'))
  const compressedBuffer = await new Response(compressedStream).arrayBuffer()
  return new Uint8Array(compressedBuffer)
}

export const decompressText = async (bytes) => {
  const decompressedStream = new Blob([bytes])
    .stream()
    .pipeThrough(new DecompressionStream('gzip'))
  return new Response(decompressedStream).text()
}

export const stringifyTeamSharePayload = async (savedTeam) => {
  const sharePayload = createTeamSharePayload(savedTeam)
  if (!sharePayload) {
    return ''
  }

  const jsonValue = JSON.stringify(sharePayload)
  if (typeof CompressionStream === 'undefined') {
    return jsonValue
  }

  try {
    const compressedBytes = await compressText(jsonValue)
    return `${TEAM_SHARE_COMPRESSED_PREFIX}${encodeUint8ArrayToBase64Url(compressedBytes)}`
  } catch (error) {
    console.error('Error compressing team share payload:', error)
    return jsonValue
  }
}

export const parseImportedTeamPayload = async (rawValue) => {
  if (typeof rawValue !== 'string') {
    return null
  }

  const trimmedValue = rawValue.trim()
  if (!trimmedValue || trimmedValue.length > MAX_TEAM_SHARE_TEXT_LENGTH) {
    return null
  }

  let normalizedValue = trimmedValue
  if (trimmedValue.startsWith(TEAM_SHARE_COMPRESSED_PREFIX)) {
    if (typeof DecompressionStream === 'undefined') {
      throw new Error('Compressed team codes are not supported in this browser.')
    }

    const compressedValue = trimmedValue.slice(TEAM_SHARE_COMPRESSED_PREFIX.length)
    normalizedValue = await decompressText(decodeBase64UrlToUint8Array(compressedValue))
  }

  const parsedValue = JSON.parse(normalizedValue)
  const candidateTeam = (
    parsedValue &&
    typeof parsedValue === 'object' &&
    !Array.isArray(parsedValue) &&
    parsedValue.app === TEAM_SHARE_APP_ID &&
    parsedValue.version === TEAM_SHARE_SCHEMA_VERSION &&
    parsedValue.team &&
    typeof parsedValue.team === 'object'
  )
    ? parsedValue.team
    : parsedValue

  return hydrateSavedTeams([candidateTeam])[0] || null
}

export const buildImportedTeamName = (savedTeams, requestedName) => {
  const fallbackName = sanitizeStorageText(requestedName, MAX_SAVED_TEAM_NAME_LENGTH) || 'Imported Team'
  const existingNameSet = new Set(savedTeams.map((entry) => normalizeDisplayName(entry.name)))

  if (!existingNameSet.has(normalizeDisplayName(fallbackName))) {
    return fallbackName
  }

  for (let copyIndex = 2; copyIndex <= 999; copyIndex += 1) {
    const nextName = sanitizeStorageText(`${fallbackName} ${copyIndex}`, MAX_SAVED_TEAM_NAME_LENGTH)
    if (nextName && !existingNameSet.has(normalizeDisplayName(nextName))) {
      return nextName
    }
  }

  return sanitizeStorageText(`${fallbackName} ${Date.now()}`, MAX_SAVED_TEAM_NAME_LENGTH) || 'Imported Team'
}

export const hydrateSavedTeams = (value) => {
  if (!Array.isArray(value)) {
    return []
  }

  return sortSavedTeams(
    value
      .flatMap((entry) => {
        if (!entry || typeof entry !== 'object') {
          return []
        }

        const name = sanitizeStorageText(entry.name, MAX_SAVED_TEAM_NAME_LENGTH)
        if (!name) {
          return []
        }

        return [{
          id: sanitizeStorageText(entry.id, 80) || `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          name,
          savedAt: typeof entry.savedAt === 'string' ? entry.savedAt : new Date().toISOString(),
          slots: Array.from({ length: TEAM_SLOT_COUNT }, (_, index) => sanitizeStoredTeamSlot(entry.slots?.[index]))
        }]
      })
      .slice(0, MAX_SAVED_TEAMS)
  )
}

export const parseSavedTeamsStoragePayload = (rawValue) => {
  const parsedValue = JSON.parse(rawValue)

  if (Array.isArray(parsedValue)) {
    return hydrateSavedTeams(parsedValue)
  }

  if (
    parsedValue &&
    typeof parsedValue === 'object' &&
    parsedValue.version === SAVED_TEAMS_SCHEMA_VERSION &&
    Array.isArray(parsedValue.teams)
  ) {
    return hydrateSavedTeams(parsedValue.teams)
  }

  return []
}

export const readSavedTeamsFromStorage = () => {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const rawValue =
      window.localStorage.getItem(SAVED_TEAMS_STORAGE_KEY) ||
      window.localStorage.getItem(LEGACY_SAVED_TEAMS_STORAGE_KEY)

    return rawValue ? parseSavedTeamsStoragePayload(rawValue) : []
  } catch (error) {
    console.error('Error reading saved teams from storage:', error)
    return []
  }
}

export const formatSavedTeamTimestamp = (savedAt) => {
  const parsedDate = new Date(savedAt)

  if (Number.isNaN(parsedDate.getTime())) {
    return 'Saved recently'
  }

  return parsedDate.toLocaleString([], {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  })
}

export const LoadingIndicator = ({ label }) => (
  <div className="loading">
    <span>{label}</span>
    <img src={pokeballImage} alt="" className="loading-pokeball" />
  </div>
)

export const fetchPokemonPanelInfo = async (pokemon) => {
  const [speciesResponse, pokemonResponse] = await Promise.all([
    fetch(pokemon.speciesUrl || `https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}`),
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.apiName || pokemon.id}`)
  ])
  const [speciesData, pokemonData] = await Promise.all([
    speciesResponse.json(),
    pokemonResponse.json()
  ])
  const speciesBrowseData = buildPokemonSpeciesBrowseData(speciesData)
  const evolutionPromise = fetch(speciesData.evolution_chain.url).then((response) => response.json())
  const encounterPromise = pokemonData.location_area_encounters
    ? fetch(pokemonData.location_area_encounters)
        .then((response) => (response.ok ? response.json() : []))
        .catch((error) => {
          console.error(`Error fetching encounters for ${pokemon.name}:`, error)
          return []
        })
    : Promise.resolve([])
  const abilityDetailsPromise = Promise.all(
    (pokemon.abilities || []).map(async (ability) => {
      try {
        const abilityResponse = await fetch(ability.url)
        const abilityData = await abilityResponse.json()

        return {
          name: formatDisplayName(ability.name),
          isHidden: ability.isHidden,
          effect: getEnglishEffectText(abilityData.effect_entries)
        }
      } catch (error) {
        console.error(`Error fetching ability ${ability.name}:`, error)
        return {
          name: formatDisplayName(ability.name),
          isHidden: ability.isHidden,
          effect: 'No effect description available.'
        }
      }
    })
  )
  const [evolutionData, encounterData, abilityDetails] = await Promise.all([
    evolutionPromise,
    encounterPromise,
    abilityDetailsPromise
  ])

  return {
    evolutionLine: buildEvolutionLine(evolutionData.chain),
    abilities: abilityDetails,
    profileDetails: {
      catchRate: speciesData.capture_rate ?? 'Unknown',
      growthRate: speciesBrowseData.growthRate,
      eggGroups: speciesBrowseData.eggGroups,
      encounters: buildPokemonEncounterDetails(encounterData)
    },
    learnsetDetails: buildPokemonLearnset(pokemonData.moves || [])
  }
}

export const getPokemonCacheKey = (pokemon) => pokemon.apiName || String(pokemon.id)

export const isRegionalVariantPokemon = (pokemon) =>
  Boolean(pokemon?.apiName && /-(alola|galar|hisui|paldea)(-|$)/.test(pokemon.apiName))

export const isMegaPokemon = (pokemon) =>
  Boolean(pokemon?.apiName && /-mega($|-)/.test(pokemon.apiName))

export const getBlackWhiteSpeciesSpriteUrl = (speciesId, preferShiny = false) => {
  if (!Number.isInteger(speciesId) || speciesId < 1) {
    return null
  }

  const shinySegment = preferShiny ? 'shiny/' : ''
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/${shinySegment}${speciesId}.png`
}

export const getBlackWhiteSpeciesAnimatedSpriteUrl = (speciesId, preferShiny = false) => {
  if (!Number.isInteger(speciesId) || speciesId < 1 || speciesId > 649) {
    return null
  }

  const shinySegment = preferShiny ? 'shiny/' : ''
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${shinySegment}${speciesId}.gif`
}

export const getFrontSpeciesSpriteUrl = (speciesId, preferShiny = false) => {
  if (!Number.isInteger(speciesId) || speciesId < 1) {
    return null
  }

  const shinySegment = preferShiny ? 'shiny/' : ''
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${shinySegment}${speciesId}.png`
}

export const getGamePickerSpriteUrls = (speciesId, preferShiny = false) => {
  const blackWhiteStatic = getBlackWhiteSpeciesSpriteUrl(speciesId, preferShiny)
  const frontStatic = getFrontSpeciesSpriteUrl(speciesId, preferShiny)
  const blackWhiteAnimated = getBlackWhiteSpeciesAnimatedSpriteUrl(speciesId, preferShiny)

  return {
    static: blackWhiteStatic || frontStatic,
    animated: blackWhiteAnimated,
    animatedScale: 1
  }
}

export const getPokemonSpriteFromSprites = (sprites, preferShiny = false, pokemonId = null) => {
  if (!sprites) {
    return null
  }

  const blackWhiteSprites = sprites.versions?.['generation-v']?.['black-white']
  const frontSprite = getFrontSpeciesSpriteUrl(pokemonId, preferShiny)
  const frontDefaultSprite = getFrontSpeciesSpriteUrl(pokemonId, false)
  const officialArtwork = sprites.other?.['official-artwork']?.front_default
  const officialShinyArtwork = sprites.other?.['official-artwork']?.front_shiny

  if (preferShiny) {
    return (
      blackWhiteSprites?.front_shiny ||
      sprites.front_shiny ||
      officialShinyArtwork ||
      blackWhiteSprites?.front_default ||
      sprites.front_default ||
      officialArtwork ||
      frontSprite ||
      frontDefaultSprite ||
      null
    )
  }

  return blackWhiteSprites?.front_default || sprites.front_default || officialArtwork || frontDefaultSprite || null
}

export const getPokemonAnimatedSpriteFromSprites = (sprites, preferShiny = false, speciesId = null) => {
  if (!sprites) {
    return null
  }

  const blackWhiteAnimatedSprites = sprites.versions?.['generation-v']?.['black-white']?.animated
  const speciesAnimatedSprite = getBlackWhiteSpeciesAnimatedSpriteUrl(speciesId, preferShiny)
  const speciesAnimatedDefaultSprite = getBlackWhiteSpeciesAnimatedSpriteUrl(speciesId, false)

  if (preferShiny) {
    return (
      blackWhiteAnimatedSprites?.front_shiny ||
      speciesAnimatedSprite ||
      blackWhiteAnimatedSprites?.front_default ||
      speciesAnimatedDefaultSprite ||
      null
    )
  }

  return blackWhiteAnimatedSprites?.front_default || speciesAnimatedDefaultSprite || null
}

export const getSpecialPokemonImage = (_pokemonName, sprites, pokemonId) => getPokemonSpriteFromSprites(sprites, false, pokemonId)

export const getSpecialPokemonShinyImage = (_pokemonName, sprites, pokemonId) => getPokemonSpriteFromSprites(sprites, true, pokemonId)

export const getPokemonDisplayVariant = (pokemon, preferShiny = false) => {
  if (!pokemon) {
    return pokemon
  }

  if (typeof pokemon.isShiny === 'boolean') {
    return pokemon
  }

  const nextIsShiny = Boolean(preferShiny && pokemon.shinyImage)

  return {
    ...pokemon,
    isShiny: nextIsShiny,
    image: nextIsShiny ? pokemon.shinyImage : pokemon.normalImage || pokemon.image
  }
}

export const teamExportMoveTypeTextColors = {
  normal: '#7a6f66',
  fire: '#cf603c',
  water: '#4b7ddf',
  electric: '#c59a1b',
  grass: '#4e9a50',
  ice: '#4d9bb4',
  fighting: '#b45242',
  poison: '#9157b1',
  ground: '#a47b43',
  flying: '#6f87db',
  psychic: '#d05f88',
  bug: '#729243',
  rock: '#96804f',
  ghost: '#6657b5',
  dragon: '#5b69cd',
  dark: '#5b5867',
  steel: '#6e8597',
  fairy: '#d281b0'
}

export const drawRoundedRectPath = (context, x, y, width, height, radius) => {
  const safeRadius = Math.min(radius, width / 2, height / 2)

  context.beginPath()
  context.moveTo(x + safeRadius, y)
  context.lineTo(x + width - safeRadius, y)
  context.quadraticCurveTo(x + width, y, x + width, y + safeRadius)
  context.lineTo(x + width, y + height - safeRadius)
  context.quadraticCurveTo(x + width, y + height, x + width - safeRadius, y + height)
  context.lineTo(x + safeRadius, y + height)
  context.quadraticCurveTo(x, y + height, x, y + height - safeRadius)
  context.lineTo(x, y + safeRadius)
  context.quadraticCurveTo(x, y, x + safeRadius, y)
  context.closePath()
}

export const fitCanvasText = (context, value, maxWidth) => {
  const safeValue = typeof value === 'string' ? value : ''
  if (!safeValue) {
    return ''
  }

  if (context.measureText(safeValue).width <= maxWidth) {
    return safeValue
  }

  let nextValue = safeValue
  while (nextValue.length > 1 && context.measureText(`${nextValue}...`).width > maxWidth) {
    nextValue = nextValue.slice(0, -1)
  }

  return `${nextValue}...`
}

export const renderTrainerEntryCards = (entries, activeGame, options) => {
  const {
    browsePokemonByApiName,
    allKnownPokemonByApiName,
    showShinySprites,
    getPokemonDisplayVariant,
    renderPokemonSprite,
    formatDisplayName,
    moveLookupByNormalizedName,
    normalizeDisplayName
  } = options

  if (!entries || entries.length === 0 || !activeGame) {
    return <div className="loading">No trainer data is available for that game yet.</div>
  }

    return (
      <div className="gym-leader-list">
        {entries.map((entry, entryIndex) => (
          <article key={`${activeGame.key}-${entry.rankLabel || 'gym'}-${entry.number}-${entry.leader}-${entryIndex}`} className="gym-leader-card">
            <div className="gym-leader-card-header">
              <div className="gym-leader-card-copy">
                <div className="gym-leader-kicker">{entry.rankLabel || `Gym #${entry.number}`}</div>
                <div className="gym-leader-name">{entry.leader}</div>
                {entry.subtitle || entry.gymName ? (
                  <div className="gym-leader-gym-name">{entry.subtitle || entry.gymName}</div>
                ) : null}
              </div>
              <span className={`type-badge gym-leader-specialty-badge type-${entry.specialtyType}`}>
                {entry.specialty}
              </span>
            </div>

            <div className="gym-leader-meta-grid">
              <div className="gym-leader-meta-card">
                <div className="gym-leader-meta-label">Location</div>
                <div className="gym-leader-meta-value">{entry.location}</div>
              </div>
              <div className="gym-leader-meta-card">
                <div className="gym-leader-meta-label">Game</div>
                <div className="gym-leader-meta-value">{activeGame.name}</div>
              </div>
            </div>

            <div className="gym-leader-team-grid">
              {entry.team.map((member, memberIndex) => {
                const memberPokemon =
                  browsePokemonByApiName[member.apiName] ||
                  allKnownPokemonByApiName?.[member.apiName] ||
                  null
                const displayedMemberPokemon = memberPokemon
                  ? getPokemonDisplayVariant(memberPokemon, showShinySprites)
                  : null
                const memberTypes = memberPokemon?.types || []

                return (
                  <div
                    key={`${activeGame.key}-${entry.leader}-${entry.number}-${member.apiName}-${memberIndex}`}
                    className="gym-team-member-card"
                  >
                    <div className="gym-team-member-top">
                      {displayedMemberPokemon ? (
                        renderPokemonSprite(displayedMemberPokemon, {
                          baseClassName: 'gym-team-member-sprite',
                          alt: member.name
                        })
                      ) : (
                        <div className="gym-team-member-sprite gym-team-member-sprite-fallback">
                          {member.name.charAt(0)}
                        </div>
                      )}
                      <div className="gym-team-member-copy">
                        <div className="gym-team-member-name">{member.name}</div>
                        <div className="gym-team-member-level">{`Level ${member.level}`}</div>
                        {memberTypes.length > 0 && (
                          <div className="gym-team-member-types">
                            {memberTypes.map((type) => (
                              <span
                                key={`${activeGame.key}-${entry.number}-${member.apiName}-${type}-${memberIndex}`}
                                className={`type-badge gym-team-member-type-badge type-${type}`}
                              >
                                {formatDisplayName(type)}
                              </span>
                            ))}
                            {member.teraType ? (
                              <span
                                className={`type-badge gym-team-member-type-badge gym-team-member-tera-badge type-${member.teraType}`}
                              >
                                {`Tera ${formatDisplayName(member.teraType)}`}
                              </span>
                            ) : null}
                            {member.gigantamax ? (
                              <span className="type-badge gym-team-member-type-badge gym-team-member-special-badge">
                                Gigantamax
                              </span>
                            ) : null}
                          </div>
                        )}
                      </div>
                    </div>

                    {member.moves?.length > 0 ? (
                      <ul className="gym-team-member-moves">
                        {member.moves.map((move) => {
                          const moveInfo = moveLookupByNormalizedName[normalizeDisplayName(move)] || null
                          const moveTypeClass = moveInfo?.type ? `move-type-text move-type-text-${moveInfo.type}` : ''

                          return (
                            <li
                              key={`${activeGame.key}-${entry.number}-${member.apiName}-${move}-${memberIndex}`}
                              className="gym-team-member-move"
                            >
                              <span className={`gym-team-member-move-name ${moveTypeClass}`.trim()}>
                                {move}
                              </span>
                            </li>
                          )
                        })}
                      </ul>
                    ) : null}
                  </div>
                )
              })}
            </div>
          </article>
        ))}
      </div>
    )
}

export const hasLegendsZaMegaShinySpriteOverride = (pokemon) =>
  Boolean(
    pokemon &&
    pokemon.isShiny &&
    legendsZaMegaPokemonNames.has(pokemon.apiName) &&
    legendsZaMegaShinySprites[pokemon.apiName]
  )

export const getPokemonSpriteClassName = (pokemon, baseClassName, extraClassName = '') =>
  `${baseClassName}${hasLegendsZaMegaShinySpriteOverride(pokemon) ? ' legends-za-shiny-mega-sprite' : ''}${
    extraClassName ? ` ${extraClassName}` : ''
  }`

export const renderPokemonSprite = (pokemon, {
  baseClassName,
  animateOnHover = false,
  alt = pokemon?.name || ''
}) => {
  if (!pokemon) {
    return null
  }

  const isHovered = Boolean(animateOnHover)

  return (
    <img
      src={pokemon.image}
      alt={alt}
      className={getPokemonSpriteClassName(
        pokemon,
        `${baseClassName}${isHovered ? ' pokemon-sprite-hovered' : ''}`
      )}
    />
  )
}

export const getDisplayedDexNumber = (pokemon) =>
  isRegionalVariantPokemon(pokemon) || isMegaPokemon(pokemon) ? (pokemon.speciesId || pokemon.id) : pokemon.id

export const getSpeciesIdFromUrl = (url = '') => {
  const match = url.match(/\/pokemon-species\/(\d+)\/?$/)
  return match ? Number.parseInt(match[1], 10) : null
}

export const getPokemonFormSortWeight = (pokemon) => {
  if ((pokemon.speciesId || pokemon.id) === pokemon.id) {
    return 0
  }

  if (isMegaPokemon(pokemon)) {
    return 1
  }

  if (isRegionalVariantPokemon(pokemon)) {
    return 2
  }

  return 3
}

export const sortPokemonEntries = (pokemonList) =>
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

export const fetchJson = async (url) => {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Request failed (${response.status}) for ${url}`)
  }

  return response.json()
}

export const buildBrowsePokemonEntry = async (pokemonIdentifier, specialEntry = null) => {
  const data = await fetchJson(`https://pokeapi.co/api/v2/pokemon/${pokemonIdentifier}`)
  const speciesData = await fetchJson(data.species.url)
  const speciesId = getSpeciesIdFromUrl(data.species.url) || specialEntry?.speciesId || data.id
  const speciesBrowseData = buildPokemonSpeciesBrowseData(speciesData)

  if (specialEntry) {
    const legendsZaMegaSprite = legendsZaMegaPokemonNames.has(specialEntry.pokemonName)
      ? legendsZaMegaSprites[specialEntry.pokemonName] || null
      : null
    const legendsZaMegaShinySprite = legendsZaMegaPokemonNames.has(specialEntry.pokemonName)
      ? legendsZaMegaShinySprites[specialEntry.pokemonName] || null
      : null

    return {
      id: data.id,
      name: specialEntry.displayName,
      apiName: data.name,
      image: legendsZaMegaSprite || getSpecialPokemonImage(specialEntry.pokemonName, data.sprites, data.id),
      normalImage: legendsZaMegaSprite || getSpecialPokemonImage(specialEntry.pokemonName, data.sprites, data.id),
      shinyImage:
        legendsZaMegaShinySprite ||
        legendsZaMegaSprite ||
        getSpecialPokemonShinyImage(specialEntry.pokemonName, data.sprites, data.id),
      animatedNormalImage: legendsZaMegaSprite ? null : getPokemonAnimatedSpriteFromSprites(data.sprites, false, data.id),
      animatedShinyImage: legendsZaMegaSprite ? null : getPokemonAnimatedSpriteFromSprites(data.sprites, true, data.id),
      types: data.types.map(t => t.type.name),
      stats: Object.fromEntries(data.stats.map(stat => [stat.stat.name, stat.base_stat])),
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
    image: getPokemonSpriteFromSprites(data.sprites, false, data.id),
    normalImage: getPokemonSpriteFromSprites(data.sprites, false, data.id),
    shinyImage: getPokemonSpriteFromSprites(data.sprites, true, data.id),
    animatedNormalImage: getPokemonAnimatedSpriteFromSprites(data.sprites, false, data.id),
    animatedShinyImage: getPokemonAnimatedSpriteFromSprites(data.sprites, true, data.id),
    types: data.types.map(t => t.type.name),
    stats: Object.fromEntries(data.stats.map(stat => [stat.stat.name, stat.base_stat])),
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


export {
  bulbapediaAvailability,
  dlcPokedexes,
  eliteFourByGame,
  eliteFourGameGroupByGameKey,
  eliteFourGames,
  megaEntries,
  legendsZaAvailability,
  legendsZaMegaSprites,
  legendsZaMegaShinySprites,
  pokemonGenerations,
  gymLeaderGameGroupByGameKey,
  gymLeaderGames,
  gymLeadersByGame,
  pokeballImage
}
