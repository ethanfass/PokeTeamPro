import { Fragment, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import bulbapediaAvailability from './data/bulbapediaAvailability.json'
import dlcPokedexes from './data/dlcPokedexes.json'
import { eliteFourByGame, eliteFourGameGroupByGameKey, eliteFourGames } from './data/eliteFour'
import megaEntries from './data/megaEntries.json'
import legendsZaAvailability from './data/legendsZaAvailability.json'
import legendsZaMegaSprites from './data/legendsZaMegaSprites.json'
import legendsZaMegaShinySprites from './data/legendsZaMegaShinySprites.json'
import pokemonBrowseData from './data/pokemonBrowseData.json'
import { pokemonGenerations } from './data/pokemonBrowseConfig'
import { gymLeaderGameGroupByGameKey, gymLeaderGames, gymLeadersByGame } from './data/gymLeaders'
import pokeballImage from '../assets/pokeball.png'

const TEAM_SLOT_COUNT = 6
const TEAM_MOVE_SLOT_COUNT = 4
const TEAM_BUILD_LEVEL = 100
const TEAM_HISTORY_LIMIT = 60
const SAVED_TEAMS_STORAGE_KEY = 'pokeapp-saved-teams-v2'
const LEGACY_SAVED_TEAMS_STORAGE_KEY = 'pokeapp-saved-teams-v1'
const SAVED_TEAMS_SCHEMA_VERSION = 2
const TEAM_SHARE_SCHEMA_VERSION = 1
const TEAM_SHARE_APP_ID = 'pokeapp-team-share'
const TEAM_SHARE_COMPRESSED_PREFIX = 'PKAPP1:'
const MAX_SAVED_TEAMS = 100
const MAX_SAVED_TEAM_NAME_LENGTH = 48
const MAX_TEAM_SHARE_TEXT_LENGTH = 50000
const cachedPokemonByGen = pokemonBrowseData?.generations || {}
const hasCachedPokemonBrowseData = Object.values(cachedPokemonByGen)
  .some((group) => Array.isArray(group?.pokemon) && group.pokemon.length > 0)
const generations = pokemonGenerations
const EMPTY_MOVE_VALUE = '-'
const TEAM_EXPORT_SCALE = 2
const TEAM_EXPORT_SLOT_WIDTH = 248
const TEAM_EXPORT_SLOT_HEIGHT = 526
const TEAM_EXPORT_SLOT_GAP = 24
const POKEMON_FETCH_BATCH_SIZE = 32
const SPECIAL_POKEMON_FETCH_BATCH_SIZE = 16
const BUILD_STAT_ROWS = [
  { key: 'hp', label: 'HP' },
  { key: 'attack', label: 'Atk' },
  { key: 'defense', label: 'Def' },
  { key: 'special-attack', label: 'SpA' },
  { key: 'special-defense', label: 'SpD' },
  { key: 'speed', label: 'Spe' }
]
const DEFAULT_NATURE_KEY = 'hardy'
const DEFAULT_TEAM_EVS = Object.fromEntries(BUILD_STAT_ROWS.map((stat) => [stat.key, 0]))
const PERFECT_IV_VALUE = 31
const TEAM_NATURES = [
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
const TEAM_NATURE_LOOKUP = Object.fromEntries(TEAM_NATURES.map((nature) => [nature.key, nature]))
const DESIGN_TEMPLATES = [
  {
    key: 'colorful',
    label: 'Colorful',
    note: 'Bold gradients and saturated accents across the page and builder editor.'
  },
  {
    key: 'classic',
    label: 'Classic',
    note: 'The current airy Pokedex look.'
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

const ANALYZER_COVERAGE_SOURCES = [
  {
    key: 'moves',
    label: 'Move Types'
  },
  {
    key: 'pokemon-types',
    label: 'Pokemon Types'
  }
]

const TEAM_MATCHUP_PLAYER_SOURCE_OPTIONS = [
  {
    key: 'builder',
    label: 'Current Team Builder'
  },
  {
    key: 'preset',
    label: 'Gym / Elite Four Preset'
  }
]

const TEAM_MATCHUP_ENEMY_SOURCE_OPTIONS = [
  {
    key: 'preset',
    label: 'Gym / Elite Four Preset'
  },
  {
    key: 'custom',
    label: 'Custom Matchup Team'
  }
]

const TEAM_MATCHUP_PRESET_OPTIONS = [
  {
    key: 'gym',
    label: 'Gym Leader Team'
  },
  {
    key: 'elite-four',
    label: 'Elite Four Team'
  }
]

const MOVE_GENERATION_TO_NUMBER = {
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

const gamePickerMascotSpeciesIds = {
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

const singleFormGamePickerKeys = new Set(['black-2', 'white-2', 'ultra-sun', 'ultra-moon'])

const gamePickerMascotSpriteConfigs = {
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

const DEFAULT_GAME_PICKER_HOVER_SCALE = 1.25

  const gymLeaderGameLookup = Object.fromEntries(gymLeaderGames.map((game) => [game.key, game]))
  const eliteFourGameLookup = Object.fromEntries(eliteFourGames.map((game) => [game.key, game]))
  const dropdownGymLeaderGames = gymLeaderGames.filter((game) => !['sword', 'shield'].includes(game.key))
  const dropdownEliteFourGames = eliteFourGames.filter((game) => !['sword', 'shield'].includes(game.key))

const gameVersionGroupMap = {
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

const versionGroupOrder = [
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

const versionGroupSortIndex = Object.fromEntries(
  versionGroupOrder.map((versionGroup, index) => [versionGroup, index])
)

const pokemonTypeCardGradientStops = {
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

const pokemonCardFallbackGradient = ['#ffe39c', '#ffd062']

const parseHexColor = (hexColor = '') => {
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

const getRelativeLuminance = (hexColor) => {
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

const getColorWithAlpha = (hexColor, alpha) => {
  const rgb = parseHexColor(hexColor)

  if (!rgb) {
    return `rgba(36, 50, 74, ${alpha})`
  }

  return `rgba(${rgb.red}, ${rgb.green}, ${rgb.blue}, ${alpha})`
}

const getPokemonCardTypeStops = (type) => pokemonTypeCardGradientStops[type] || pokemonCardFallbackGradient

const getPokemonCardBackground = (types = []) => {
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

const getPokemonCardStyle = (pokemon, useTypeColoredCards = true) => {
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

// Type effectiveness chart
const typeEffectiveness = {
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

const defensiveTypeChart = {
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

const generationGameDetails = {
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

const specialGameSections = [
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

const GAME_REGION_BY_KEY = {
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

const gameStyleLookup = Object.fromEntries(
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

const buildRegionGames = (names) =>
  names
    .map((name) => gameStyleLookup[name.toLowerCase()])
    .filter(Boolean)

const regionGameDetails = {
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

const regionalVariantEntries = [
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

const getRegionalVariantEntriesForGeneration = (generation) =>
  regionalVariantEntries.filter((entry) => entry.generation === generation)

const legendsArceusIntroducedEntries = [
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

const legendsZaBaseDexes = new Set(legendsZaAvailability.baseDexes)
const legendsZaRegionalVariantNames = new Set(legendsZaAvailability.regionalVariants)
const legendsZaMegaPokemonNames = new Set(legendsZaAvailability.megaPokemon)

const galarSpecialPokemonNames = new Set([
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

const hisuiSpecialPokemonNames = new Set([
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

const alolaSpecialEntries = regionalVariantEntries.filter((entry) => entry.pokemonName.includes('-alola'))
const galarSpecialEntries = regionalVariantEntries.filter((entry) => galarSpecialPokemonNames.has(entry.pokemonName))
const hisuiSpecialEntries = regionalVariantEntries.filter((entry) => entry.pokemonName.includes('-hisui'))
const paldeaSpecialEntries = regionalVariantEntries.filter((entry) => entry.generation === 9)

const generationDlcSections = {
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

const gameDlcSectionConfigs = {
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

const gameAvailabilityRules = {
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

const specialPokemonEntryLookup = Object.fromEntries(
  [...regionalVariantEntries, ...legendsArceusIntroducedEntries, ...megaEntries].map((entry) => [entry.pokemonName, entry])
)

const allSpecialPokemonNames = new Set(Object.keys(specialPokemonEntryLookup))

const championsPokemonOrderTokens = [
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

const championsBaseSpeciesOrder = new Map()
const championsSpecialPokemonOrder = new Map()

championsPokemonOrderTokens.forEach((token, index) => {
  if (typeof token === 'number') {
    championsBaseSpeciesOrder.set(token, index)
    return
  }

  championsSpecialPokemonOrder.set(token, index)
})

const championsSpecialEntries = Array.from(
  new Map(
    [...championsSpecialPokemonOrder.keys()]
      .map((pokemonName) => [pokemonName, specialPokemonEntryLookup[pokemonName]])
      .filter(([, entry]) => Boolean(entry))
  ).values()
)

const getChampionsPokemonOrderIndex = (pokemon) => {
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

const isPokemonInChampionsRoster = (pokemon) =>
  getChampionsPokemonOrderIndex(pokemon) !== Number.POSITIVE_INFINITY

gameAvailabilityRules.champions = {
  includePokemon: championsSpecialEntries
}

const gameKeyAliases = {
  heartgold: 'heart-gold',
  'let-s-go-pikachu': 'lets-go-pikachu',
  'let-s-go-eevee': 'lets-go-eevee',
  soulsilver: 'soul-silver'
}

const toGameKey = (name) => {
  const baseKey = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  return gameKeyAliases[baseKey] || baseKey
}

const formatDisplayName = (value) =>
  value
    .split(/[- ]+/)
    .map(part => (part ? part.charAt(0).toUpperCase() + part.slice(1) : ''))
    .join(' ')

const normalizeDisplayName = (value = '') => value.toLowerCase().replace(/[^a-z0-9]+/g, '')
const getRegionColorClassName = (regionName = '') => `region-color-${normalizeDisplayName(regionName)}`

const formatEncounterLevelRange = (minimumLevel = null, maximumLevel = null) => {
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

const buildPokemonEncounterDetails = (encounterAreas = []) => {
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

const excludedAvailabilityPrefixes = ['—', 'Ev', 'EV', 'DW', 'DR', 'PW', 'TE', 'T']
const includedAvailabilityPrefixes = ['CC', 'CD', 'DA', 'ET', 'DS', 'FS', 'C', 'S', 'R', 'E', 'B', 'D']

const normalizeAvailabilityCode = (value = '') => value.replace(/\*/g, '').trim()

const isAvailabilityCodeIncluded = (value = '') => {
  const normalized = normalizeAvailabilityCode(value)

  if (!normalized) {
    return false
  }

  if (excludedAvailabilityPrefixes.some((prefix) => normalized.startsWith(prefix))) {
    return false
  }

  return includedAvailabilityPrefixes.some((prefix) => normalized.startsWith(prefix))
}

const isDlcOnlyAvailabilityCode = (value = '', gameKey = '') => {
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

const getEnglishEffectText = (entries = []) => {
  const englishEntry =
    entries.find((entry) => entry.language?.name === 'en' && entry.short_effect) ||
    entries.find((entry) => entry.language?.name === 'en' && entry.effect)

  return englishEntry?.short_effect || englishEntry?.effect || 'No effect description available.'
}

const extractEnglishEffectText = (entries = []) => {
  const englishEntry =
    entries.find((entry) => entry.language?.name === 'en' && entry.short_effect) ||
    entries.find((entry) => entry.language?.name === 'en' && entry.effect)

  return englishEntry?.short_effect || englishEntry?.effect || null
}

const isBattleRelevantItem = (detail, effectText) => {
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

const getResourceIdFromUrl = (url = '', resourceName = '') => {
  const escapedResource = resourceName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const match = url.match(new RegExp(`/${escapedResource}/(\\d+)/?$`))
  return match ? Number.parseInt(match[1], 10) : null
}

const formatEvolutionRequirement = (evolutionDetails) => {
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

const clampInteger = (value, minimum, maximum, fallback = minimum) => {
  const parsed = Number.parseInt(value, 10)

  if (Number.isNaN(parsed)) {
    return fallback
  }

  return Math.min(maximum, Math.max(minimum, parsed))
}

const normalizeTeamBuildValues = (values, defaults, minimum, maximum) =>
  BUILD_STAT_ROWS.reduce((nextValues, stat) => {
    const fallback = defaults[stat.key]
    nextValues[stat.key] = clampInteger(values?.[stat.key], minimum, maximum, fallback)
    return nextValues
  }, {})

const normalizeTeamNature = (natureKey) =>
  TEAM_NATURE_LOOKUP[natureKey] ? natureKey : DEFAULT_NATURE_KEY

const getPokemonNatureData = (pokemon) =>
  TEAM_NATURE_LOOKUP[normalizeTeamNature(pokemon?.nature)] || TEAM_NATURE_LOOKUP[DEFAULT_NATURE_KEY]

const getPokemonEvs = (pokemon) =>
  normalizeTeamBuildValues(pokemon?.evs, DEFAULT_TEAM_EVS, 0, 252)

const getNatureMultiplier = (natureKey, statKey) => {
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

const calculateLevelHundredStat = (statKey, baseStat, ivValue, evValue, natureKey) => {
  const baseValue = baseStat * 2 + ivValue + Math.floor(evValue / 4)

  if (statKey === 'hp') {
    return baseValue + TEAM_BUILD_LEVEL + 10
  }

  return Math.floor((baseValue + 5) * getNatureMultiplier(natureKey, statKey))
}

const getStatBarColorClass = (value) => {
  if (value >= 90) {
    return 'high'
  }

  if (value >= 60) {
    return 'mid'
  }

  return 'low'
}

const getStatMin = (statName, baseStat) => {
  if (statName === 'hp') {
    return baseStat * 2 + 110
  }

  return Math.floor((baseStat * 2 + 5) * 0.9)
}

const getStatMax = (statName, baseStat) => {
  if (statName === 'hp') {
    return baseStat * 2 + 204
  }

  return Math.floor((baseStat * 2 + 99) * 1.1)
}

const buildEvolutionLine = (chainNode, entries = [], requirement = 'Base form') => {
  entries.push({
    name: formatDisplayName(chainNode.species.name),
    requirement
  })

  chainNode.evolves_to.forEach((nextNode) => {
    buildEvolutionLine(nextNode, entries, formatEvolutionRequirement(nextNode.evolution_details))
  })

  return entries
}

const getPokemonStatRows = (pokemon) => {
  if (!pokemon?.stats) {
    return []
  }

  return BUILD_STAT_ROWS.map((stat) => ({
    key: stat.key,
    label: stat.label,
    value: pokemon.stats[stat.key]
  }))
}

const getPokemonBst = (pokemon) =>
  getPokemonStatRows(pokemon).reduce((sum, stat) => sum + stat.value, 0)

const getPokemonBuildStatRows = (pokemon) => {
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

const getPokemonBuildBst = (pokemon) =>
  getPokemonBuildStatRows(pokemon).reduce((sum, stat) => sum + stat.value, 0)

const getBuildEvSummary = (pokemon) => {
  const evs = getPokemonEvs(pokemon)
  const spread = BUILD_STAT_ROWS
    .filter((stat) => evs[stat.key] > 0)
    .sort((a, b) => evs[b.key] - evs[a.key] || a.label.localeCompare(b.label))
    .map((stat) => `${evs[stat.key]} ${stat.label}`)

  return spread.length > 0 ? spread.join(' / ') : 'No EVs'
}

const getPokemonBuildSummary = (pokemon) => {
  const nature = getPokemonNatureData(pokemon)
  const evs = getPokemonEvs(pokemon)
  const evTotal = Object.values(evs).reduce((sum, value) => sum + value, 0)

  return {
    nature,
    evTotal,
    evSummary: getBuildEvSummary(pokemon)
  }
}

const getAssignedMovesForPokemon = (pokemon) =>
  normalizeAssignedMoves(pokemon?.moves).filter(Boolean)

const getPokemonCoverageTypesFromOwnTypes = (pokemon) => {
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

const getPokemonCoverageTypesFromMoves = (pokemon) => {
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

const normalizeEffectText = (value = '') => value.toLowerCase()

const getMoveSupportBuckets = (move) => {
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

const createAssignedMoveEntry = (moveData) => {
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

const normalizeAssignedMoves = (moves = []) =>
  Array.from({ length: TEAM_MOVE_SLOT_COUNT }, (_, index) => createAssignedMoveEntry(moves[index]))

const buildPokemonLearnset = (moveEntries = []) => {
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

const createTeamPokemonEntry = (pokemonData) => ({
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

const cloneTeamSlots = (slots = []) =>
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

const serializeTeamSlots = (slots = []) =>
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

const getTeamSnapshotSignature = (snapshot) => JSON.stringify(snapshot)

const sortSavedTeams = (savedTeams) =>
  [...savedTeams].sort((a, b) => new Date(b.savedAt || 0).getTime() - new Date(a.savedAt || 0).getTime())

const sanitizeStorageText = (value, maxLength = 120) => {
  if (typeof value !== 'string') {
    return ''
  }

  return value.replace(/[\u0000-\u001F\u007F]/g, '').trim().slice(0, maxLength)
}

const sanitizeStoredAbility = (ability) => {
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

const sanitizeStoredHeldItem = (heldItem) => {
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

const sanitizeStoredMove = (move) => {
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

const sanitizeStoredTeamSlot = (slot) => {
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

const serializeSavedTeamForStorage = (savedTeam) => {
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

const createTeamSharePayload = (savedTeam) => {
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

const encodeUint8ArrayToBase64 = (bytes) => {
  let binaryString = ''
  const chunkSize = 0x8000

  for (let index = 0; index < bytes.length; index += chunkSize) {
    const chunk = bytes.subarray(index, index + chunkSize)
    binaryString += String.fromCharCode(...chunk)
  }

  return window.btoa(binaryString)
}

const decodeBase64ToUint8Array = (value) => {
  const binaryString = window.atob(value)
  const bytes = new Uint8Array(binaryString.length)

  for (let index = 0; index < binaryString.length; index += 1) {
    bytes[index] = binaryString.charCodeAt(index)
  }

  return bytes
}

const encodeUint8ArrayToBase64Url = (bytes) =>
  encodeUint8ArrayToBase64(bytes)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '')

const decodeBase64UrlToUint8Array = (value) => {
  const normalizedValue = value
    .replace(/-/g, '+')
    .replace(/_/g, '/')
  const paddedValue = normalizedValue.padEnd(Math.ceil(normalizedValue.length / 4) * 4, '=')
  return decodeBase64ToUint8Array(paddedValue)
}

const compressText = async (value) => {
  const compressedStream = new Blob([value])
    .stream()
    .pipeThrough(new CompressionStream('gzip'))
  const compressedBuffer = await new Response(compressedStream).arrayBuffer()
  return new Uint8Array(compressedBuffer)
}

const decompressText = async (bytes) => {
  const decompressedStream = new Blob([bytes])
    .stream()
    .pipeThrough(new DecompressionStream('gzip'))
  return new Response(decompressedStream).text()
}

const stringifyTeamSharePayload = async (savedTeam) => {
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

const parseImportedTeamPayload = async (rawValue) => {
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

const buildImportedTeamName = (savedTeams, requestedName) => {
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

const hydrateSavedTeams = (value) => {
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

const parseSavedTeamsStoragePayload = (rawValue) => {
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

const readSavedTeamsFromStorage = () => {
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

const formatSavedTeamTimestamp = (savedAt) => {
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

const LoadingIndicator = ({ label }) => (
  <div className="loading">
    <span>{label}</span>
    <img src={pokeballImage} alt="" className="loading-pokeball" />
  </div>
)

const fetchPokemonPanelInfo = async (pokemon) => {
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

const getPokemonCacheKey = (pokemon) => pokemon.apiName || String(pokemon.id)

const isRegionalVariantPokemon = (pokemon) =>
  Boolean(pokemon?.apiName && /-(alola|galar|hisui|paldea)(-|$)/.test(pokemon.apiName))

const isMegaPokemon = (pokemon) =>
  Boolean(pokemon?.apiName && /-mega($|-)/.test(pokemon.apiName))

const getBlackWhiteSpeciesSpriteUrl = (speciesId, preferShiny = false) => {
  if (!Number.isInteger(speciesId) || speciesId < 1) {
    return null
  }

  const shinySegment = preferShiny ? 'shiny/' : ''
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/${shinySegment}${speciesId}.png`
}

const getBlackWhiteSpeciesAnimatedSpriteUrl = (speciesId, preferShiny = false) => {
  if (!Number.isInteger(speciesId) || speciesId < 1 || speciesId > 649) {
    return null
  }

  const shinySegment = preferShiny ? 'shiny/' : ''
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${shinySegment}${speciesId}.gif`
}

const getFrontSpeciesSpriteUrl = (speciesId, preferShiny = false) => {
  if (!Number.isInteger(speciesId) || speciesId < 1) {
    return null
  }

  const shinySegment = preferShiny ? 'shiny/' : ''
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${shinySegment}${speciesId}.png`
}

const getGamePickerSpriteUrls = (speciesId, preferShiny = false) => {
  const blackWhiteStatic = getBlackWhiteSpeciesSpriteUrl(speciesId, preferShiny)
  const frontStatic = getFrontSpeciesSpriteUrl(speciesId, preferShiny)
  const blackWhiteAnimated = getBlackWhiteSpeciesAnimatedSpriteUrl(speciesId, preferShiny)

  return {
    static: blackWhiteStatic || frontStatic,
    animated: blackWhiteAnimated,
    animatedScale: 1
  }
}

const getPokemonSpriteFromSprites = (sprites, preferShiny = false, pokemonId = null) => {
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

const getPokemonAnimatedSpriteFromSprites = (sprites, preferShiny = false, speciesId = null) => {
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

const getSpecialPokemonImage = (_pokemonName, sprites, pokemonId) => getPokemonSpriteFromSprites(sprites, false, pokemonId)

const getSpecialPokemonShinyImage = (_pokemonName, sprites, pokemonId) => getPokemonSpriteFromSprites(sprites, true, pokemonId)

const getPokemonDisplayVariant = (pokemon, preferShiny = false) => {
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

const teamExportMoveTypeTextColors = {
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

const drawRoundedRectPath = (context, x, y, width, height, radius) => {
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

const fitCanvasText = (context, value, maxWidth) => {
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

const renderTrainerEntryCards = (entries, activeGame, options) => {
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

const hasLegendsZaMegaShinySpriteOverride = (pokemon) =>
  Boolean(
    pokemon &&
    pokemon.isShiny &&
    legendsZaMegaPokemonNames.has(pokemon.apiName) &&
    legendsZaMegaShinySprites[pokemon.apiName]
  )

const getPokemonSpriteClassName = (pokemon, baseClassName, extraClassName = '') =>
  `${baseClassName}${hasLegendsZaMegaShinySpriteOverride(pokemon) ? ' legends-za-shiny-mega-sprite' : ''}${
    extraClassName ? ` ${extraClassName}` : ''
  }`

const renderPokemonSprite = (pokemon, {
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

const getDisplayedDexNumber = (pokemon) =>
  isRegionalVariantPokemon(pokemon) || isMegaPokemon(pokemon) ? (pokemon.speciesId || pokemon.id) : pokemon.id

const getSpeciesIdFromUrl = (url = '') => {
  const match = url.match(/\/pokemon-species\/(\d+)\/?$/)
  return match ? Number.parseInt(match[1], 10) : null
}

const getPokemonFormSortWeight = (pokemon) => {
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

const fetchJson = async (url) => {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Request failed (${response.status}) for ${url}`)
  }

  return response.json()
}

const buildBrowsePokemonEntry = async (pokemonIdentifier, specialEntry = null) => {
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

function App() {
  const [pokemonByGen, setPokemonByGen] = useState(() => (hasCachedPokemonBrowseData ? cachedPokemonByGen : {}))
  const [pokemonInfoCache, setPokemonInfoCache] = useState({})
  const [team, setTeam] = useState(() => Array(TEAM_SLOT_COUNT).fill(null))
  const [teamHistoryPast, setTeamHistoryPast] = useState([])
  const [teamHistoryFuture, setTeamHistoryFuture] = useState([])
  const [loading, setLoading] = useState(!hasCachedPokemonBrowseData)
  const [teamTypes, setTeamTypes] = useState({
    moveCoverage: {},
    pokemonTypeCoverage: {},
    weaknesses: {},
    moveTypeUsage: {},
    resistances: {},
    immunities: {}
  })
  const [menuOpen, setMenuOpen] = useState(false)
  const [showAnalyzer, setShowAnalyzer] = useState(false)
  const [showSuggestedAdditions, setShowSuggestedAdditions] = useState(false)
  const [showComparison, setShowComparison] = useState(false)
  const [showItemDatabase, setShowItemDatabase] = useState(false)
  const [showMoveDatabase, setShowMoveDatabase] = useState(false)
  const [showGymLeaders, setShowGymLeaders] = useState(false)
  const [showEliteFour, setShowEliteFour] = useState(false)
  const [showSavedTeams, setShowSavedTeams] = useState(false)
  const [analyzerCoverageSource, setAnalyzerCoverageSource] = useState('moves')
  const [teamMatchupCoverageSource, setTeamMatchupCoverageSource] = useState('moves')
  const [playerMatchupSource, setPlayerMatchupSource] = useState('builder')
  const [enemyMatchupSource, setEnemyMatchupSource] = useState('preset')
  const [customMatchupTeam, setCustomMatchupTeam] = useState(() => Array(TEAM_SLOT_COUNT).fill(null))
  const [customMatchupTargetSlot, setCustomMatchupTargetSlot] = useState(null)
  const [playerPresetType, setPlayerPresetType] = useState('gym')
  const [enemyPresetType, setEnemyPresetType] = useState('gym')
  const [playerPresetGameKey, setPlayerPresetGameKey] = useState(gymLeaderGames[0]?.key || '')
  const [enemyPresetGameKey, setEnemyPresetGameKey] = useState(gymLeaderGames[0]?.key || '')
  const [playerPresetTrainerKey, setPlayerPresetTrainerKey] = useState('')
  const [enemyPresetTrainerKey, setEnemyPresetTrainerKey] = useState('')
  const [selectedDesignTemplate, setSelectedDesignTemplate] = useState('classic')
  const [showTypeColoredCards, setShowTypeColoredCards] = useState(true)
  const [showShinySprites, setShowShinySprites] = useState(false)
  const [includeZaMegas, setIncludeZaMegas] = useState(false)
  const [sortByGeneration, setSortByGeneration] = useState(false)
  const [showGamePicker, setShowGamePicker] = useState(true)
  const [selectedGeneration, setSelectedGeneration] = useState('all')
  const [selectedGame, setSelectedGame] = useState('all')
  const [selectedGymLeaderGame, setSelectedGymLeaderGame] = useState(gymLeaderGames[0]?.key || 'red')
  const [selectedEliteFourGame, setSelectedEliteFourGame] = useState(eliteFourGames[0]?.key || 'red-blue')
  const [showBrowseFilters, setShowBrowseFilters] = useState(false)
  const [selectedBrowseType, setSelectedBrowseType] = useState('all')
  const [browseBstMinimum, setBrowseBstMinimum] = useState(0)
  const [selectedBrowseEggGroup, setSelectedBrowseEggGroup] = useState('all')
  const [selectedBrowseGrowthRate, setSelectedBrowseGrowthRate] = useState('all')
  const [hideTeamMembers, setHideTeamMembers] = useState(false)
  const [onlyPatchTeamWeaknesses, setOnlyPatchTeamWeaknesses] = useState(false)
  const [onlyAddNewTeamTypes, setOnlyAddNewTeamTypes] = useState(false)
  const [onlyCurrentGameLegal, setOnlyCurrentGameLegal] = useState(false)
  const [itemSearch, setItemSearch] = useState('')
  const [moveSearch, setMoveSearch] = useState('')
  const [savedTeams, setSavedTeams] = useState(readSavedTeamsFromStorage)
  const [showSaveTeamModal, setShowSaveTeamModal] = useState(false)
  const [pendingTeamName, setPendingTeamName] = useState('')
  const [pendingLoadTeam, setPendingLoadTeam] = useState(null)
  const [pendingDeleteTeam, setPendingDeleteTeam] = useState(null)
  const [pendingExportTeam, setPendingExportTeam] = useState(null)
  const [teamExportText, setTeamExportText] = useState('')
  const [teamExportStatus, setTeamExportStatus] = useState('')
  const [showImportTeamModal, setShowImportTeamModal] = useState(false)
  const [importTeamText, setImportTeamText] = useState('')
  const [importTeamError, setImportTeamError] = useState('')
  const [teamImageExportStatus, setTeamImageExportStatus] = useState('')
  const [teamImageExporting, setTeamImageExporting] = useState(false)
  const [showTeamFullModal, setShowTeamFullModal] = useState(false)
  const [editingBuildSlotIndex, setEditingBuildSlotIndex] = useState(null)
  const [selectedMoveType, setSelectedMoveType] = useState('all')
  const [selectedMoveCategory, setSelectedMoveCategory] = useState('all')
  const [selectedMoveSort, setSelectedMoveSort] = useState('alpha-asc')
  const [items, setItems] = useState([])
  const [moves, setMoves] = useState([])
  const [itemsLoading, setItemsLoading] = useState(false)
  const [movesLoading, setMovesLoading] = useState(false)
  const [itemInfoCache, setItemInfoCache] = useState({})
  const [moveInfoCache, setMoveInfoCache] = useState({})
  const [itemTargetSelection, setItemTargetSelection] = useState(null)
  const [moveTargetSelection, setMoveTargetSelection] = useState(null)
  const [comparisonSlots, setComparisonSlots] = useState([null, null])
  const [comparisonTargetSlot, setComparisonTargetSlot] = useState(null)
  const [shiftPressed, setShiftPressed] = useState(false)
  const [hoveredRegion, setHoveredRegion] = useState(null)
  const [hoveredGeneration, setHoveredGeneration] = useState(null)
  const [hoveredAnalyzer, setHoveredAnalyzer] = useState(null)
  const [hoveredPokemonCard, setHoveredPokemonCard] = useState(null)
  const [hoveredItemCard, setHoveredItemCard] = useState(null)
  const [hoveredMoveCard, setHoveredMoveCard] = useState(null)
  const [hoveredAbility, setHoveredAbility] = useState(null)
  const [hoveredLearnsetMove, setHoveredLearnsetMove] = useState(null)
  const [comparisonHoveredAbilities, setComparisonHoveredAbilities] = useState([null, null])
  const menuRef = useRef(null)
  const hoverCardCloseTimeoutRef = useRef(null)
  const hoverCardRef = useRef(null)
  const teamSectionRef = useRef(null)
  const teamRef = useRef(team)
  const teamHistoryPastRef = useRef(teamHistoryPast)
  const teamHistoryFutureRef = useRef(teamHistoryFuture)
  const [hoverCardSize, setHoverCardSize] = useState({ width: 340, height: 520 })

  const typesList = ['normal', 'fighting', 'flying', 'poison', 'ground', 'rock', 'bug', 'ghost', 'steel', 'fire', 'water', 'grass', 'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy']

  const browseSections = [
    { key: 'kanto', name: 'Kanto', gen: 1, sourceGen: 1 },
    { key: 'johto', name: 'Johto', gen: 2, sourceGen: 2 },
    { key: 'hoenn', name: 'Hoenn', gen: 3, sourceGen: 3 },
    { key: 'sinnoh', name: 'Sinnoh', gen: 4, sourceGen: 4 },
    { key: 'unova', name: 'Unova', gen: 5, sourceGen: 5 },
    { key: 'kalos', name: 'Kalos', gen: 6, sourceGen: 6 },
    { key: 'alola', name: 'Alola', gen: 7, sourceGen: 7 },
    { key: 'galar', name: 'Galar', gen: 8, sourceGen: 8 },
    { key: 'hisui', name: 'Hisui', gen: 8, sourceGen: 8 },
    { key: 'paldea', name: 'Paldea', gen: 9, sourceGen: 9 }
  ]
  const alwaysVisibleBrowseSectionKeys = new Set(['galar', 'hisui', 'paldea'])
  const leadingGameSections = [
    {
      key: 'champions',
      label: 'Champions',
      games: [
        {
          name: 'Pokemon Champions',
          color: '#ff7c2f',
          key: 'champions',
          systemClass: '3d',
          supportsAvailability: true
        }
      ]
    }
  ]
  const selectGameView = (gameKey) => {
    setSelectedGame(gameKey)
    setShowGamePicker(false)
    setMenuOpen(false)
    setShowBrowseFilters(false)
    setOnlyCurrentGameLegal(false)

    if (gameKey === 'champions' || gameKey === 'legends-z-a') {
      setIncludeZaMegas(true)
    }
  }

  const goHome = () => {
    if (selectedGame === 'champions' || selectedGame === 'legends-z-a') {
      setIncludeZaMegas(false)
    }

    clearCurrentTeam()
    setShowGamePicker(true)
    setMenuOpen(false)
  }

  const shouldIncludeBrowsePokemon = (pokemon) =>
    includeZaMegas || !legendsZaMegaPokemonNames.has(pokemon?.apiName)

  const allBrowsePokemon = useMemo(
    () => sortPokemonEntries(
      Array.from(
        new Map(
          Object.values(pokemonByGen)
            .flatMap((group) => (group?.pokemon || []).map((pokemon) => [pokemon.apiName, pokemon]))
        ).values()
      ).filter((pokemon) => includeZaMegas || !legendsZaMegaPokemonNames.has(pokemon?.apiName))
    ),
    [pokemonByGen, includeZaMegas]
  )
  const allKnownPokemonByApiName = useMemo(
    () => Object.fromEntries(
      Object.values(pokemonByGen)
        .flatMap((group) => group?.pokemon || [])
        .map((pokemon) => [pokemon.apiName, pokemon])
    ),
    [pokemonByGen]
  )
  const browsePokemonByApiName = useMemo(
    () => Object.fromEntries(allBrowsePokemon.map((pokemon) => [pokemon.apiName, pokemon])),
    [allBrowsePokemon]
  )
  const getGamePickerSprites = (gameKey) => {
    const mascotConfig = gamePickerMascotSpriteConfigs[gameKey] || null
    const configuredMascotPokemon = mascotConfig?.apiName ? browsePokemonByApiName[mascotConfig.apiName] || null : null

    const mascotIds = gamePickerMascotSpeciesIds[gameKey] || 25
    const speciesIds = Array.isArray(mascotIds)
      ? (singleFormGamePickerKeys.has(gameKey) ? [mascotIds[0]] : mascotIds)
      : [mascotIds]

    return speciesIds.map((speciesId) => {
      const fallbackSprites = getGamePickerSpriteUrls(speciesId, showShinySprites)
      const shouldDisableAnimatedSprite = Boolean(mascotConfig?.disableAnimatedSprite)
      const configuredStaticSprite = showShinySprites
        ? mascotConfig?.shinyStaticSpriteUrl || mascotConfig?.staticSpriteUrl || null
        : mascotConfig?.staticSpriteUrl || null
      const configuredAnimatedSprite = showShinySprites
        ? mascotConfig?.shinyAnimatedSpriteUrl || mascotConfig?.animatedSpriteUrl || null
        : mascotConfig?.animatedSpriteUrl || null

      if (configuredMascotPokemon) {
        const mascotAnimated = showShinySprites
          ? configuredMascotPokemon.animatedShinyImage || configuredMascotPokemon.animatedNormalImage || null
          : configuredMascotPokemon.animatedNormalImage || null

        return {
          ...fallbackSprites,
          static: configuredStaticSprite || fallbackSprites.static,
          animated: shouldDisableAnimatedSprite ? null : configuredAnimatedSprite || mascotAnimated || fallbackSprites.animated,
          animatedScale: mascotConfig?.animatedScale || 1,
          hoverScale: mascotConfig?.hoverScale || DEFAULT_GAME_PICKER_HOVER_SCALE
        }
      }

      if (configuredStaticSprite || configuredAnimatedSprite) {
        return {
          ...fallbackSprites,
          static: configuredStaticSprite || fallbackSprites.static,
          animated: shouldDisableAnimatedSprite ? null : configuredAnimatedSprite || fallbackSprites.animated,
          animatedScale: mascotConfig?.animatedScale || 1,
          hoverScale: mascotConfig?.hoverScale || DEFAULT_GAME_PICKER_HOVER_SCALE
        }
      }

      return {
        ...fallbackSprites,
        animated: shouldDisableAnimatedSprite ? null : fallbackSprites.animated,
        animatedScale: mascotConfig?.animatedScale || 1,
        hoverScale: mascotConfig?.hoverScale || DEFAULT_GAME_PICKER_HOVER_SCALE
      }
    })
  }
  const darkUiMode = selectedDesignTemplate === 'dark'
  const activeDesignTemplate = darkUiMode ? 'classic' : selectedDesignTemplate

  useEffect(() => {
    if (hasCachedPokemonBrowseData) {
      return undefined
    }

    let cancelled = false

    const fetchPokemon = async () => {
      const grouped = {}
      const uniqueSpecialPokemon = Array.from(
        new Map(
          [
            ...regionalVariantEntries,
            ...legendsArceusIntroducedEntries,
            ...megaEntries,
            ...Object.values(gameAvailabilityRules).flatMap(rule => rule.includePokemon || [])
          ]
            .map(entry => [entry.pokemonName, entry])
        ).values()
      )

      try {
        for (const gen of generations) {
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
                  return await buildBrowsePokemonEntry(pokemonId)
                } catch (error) {
                  console.error(`Error fetching Pokemon ${pokemonId}:`, error)
                  return null
                }
              })
            )

            if (cancelled) {
              return
            }

            grouped[gen.gen].pokemon.push(...batchPokemon.filter(Boolean))
          }
        }

        for (let index = 0; index < uniqueSpecialPokemon.length; index += SPECIAL_POKEMON_FETCH_BATCH_SIZE) {
          const batch = uniqueSpecialPokemon.slice(index, index + SPECIAL_POKEMON_FETCH_BATCH_SIZE)
          const batchPokemon = await Promise.all(
            batch.map(async (specialEntry) => {
              try {
                return [
                  specialEntry.generation,
                  await buildBrowsePokemonEntry(specialEntry.pokemonName, specialEntry)
                ]
              } catch (error) {
                console.error(`Error fetching special Pokemon ${specialEntry.pokemonName}:`, error)
                return null
              }
            })
          )

          if (cancelled) {
            return
          }

          batchPokemon.forEach((entry) => {
            if (!entry) {
              return
            }

            const [generation, pokemon] = entry
            if (grouped[generation]) {
              grouped[generation].pokemon.push(pokemon)
            }
          })
        }

        Object.values(grouped).forEach((group) => {
          group.pokemon = sortPokemonEntries(group.pokemon)
        })

        if (!cancelled) {
          setPokemonByGen(grouped)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    fetchPokemon()

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!showItemDatabase || items.length > 0) {
      return
    }

    let cancelled = false
    setItemsLoading(true)

    const fetchItems = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/item?limit=2500')
        const data = await response.json()

        if (cancelled) {
          return
        }

        const results = data.results || []
        const nextItems = []
        const nextItemInfoCache = {}
        const batchSize = 24

        for (let index = 0; index < results.length; index += batchSize) {
          const batch = results.slice(index, index + batchSize)
          const batchItems = await Promise.all(
            batch.map(async (item) => {
              try {
                const detailResponse = await fetch(`https://pokeapi.co/api/v2/item/${item.name}`)
                const detail = await detailResponse.json()
                const effect = extractEnglishEffectText(detail.effect_entries)
                const image = detail.sprites?.default || null

                if (!effect || !image || !isBattleRelevantItem(detail, effect)) {
                  return null
                }

                return {
                  item: {
                    id: detail.id || getResourceIdFromUrl(item.url, 'item'),
                    name: formatDisplayName(item.name),
                    apiName: item.name,
                    image,
                    availableGameKeys: [...new Set((detail.game_indices || []).map((entry) => toGameKey(entry.version?.name || '')).filter(Boolean))]
                  },
                  info: {
                    effect,
                    category: formatDisplayName(detail.category?.name || 'unknown')
                  }
                }
              } catch (error) {
                console.error(`Error fetching item ${item.name}:`, error)
                return null
              }
            })
          )

          if (cancelled) {
            return
          }

          batchItems.forEach((entry) => {
            if (!entry) {
              return
            }

            nextItems.push(entry.item)
            nextItemInfoCache[entry.item.apiName] = entry.info
          })
        }

        nextItems.sort((a, b) => a.name.localeCompare(b.name))
        setItems(nextItems)
        setItemInfoCache(nextItemInfoCache)
      } catch (error) {
        console.error('Error fetching items:', error)
      } finally {
        if (!cancelled) {
          setItemsLoading(false)
        }
      }
    }

    fetchItems()

    return () => {
      cancelled = true
    }
  }, [showItemDatabase, items.length])

  useEffect(() => {
    const shouldLoadMoves = showMoveDatabase || showGymLeaders || showEliteFour || showComparison

    if (!shouldLoadMoves || moves.length > 0) {
      return
    }

    let cancelled = false
    setMovesLoading(true)

    const fetchMoves = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/move?limit=1200')
        const data = await response.json()

        if (cancelled) {
          return
        }

        const results = data.results || []
        const nextMoves = []
        const batchSize = 36

        for (let index = 0; index < results.length; index += batchSize) {
          const batch = results.slice(index, index + batchSize)
          const batchMoves = await Promise.all(
            batch.map(async (move) => {
              try {
                const detailResponse = await fetch(`https://pokeapi.co/api/v2/move/${move.name}`)
                const detail = await detailResponse.json()

                return {
                  id: detail.id || getResourceIdFromUrl(move.url, 'move'),
                  name: formatDisplayName(move.name),
                  apiName: move.name,
                  generation: MOVE_GENERATION_TO_NUMBER[detail.generation?.name] || null,
                  type: detail.type?.name || 'normal',
                  pp: detail.pp ?? '—',
                  power: detail.power ?? '—',
                  accuracy: detail.accuracy ?? '—',
                  category: formatDisplayName(detail.damage_class?.name || 'unknown'),
                  effect: getEnglishEffectText(detail.effect_entries)
                }
              } catch (error) {
                console.error(`Error fetching move ${move.name}:`, error)
                return null
              }
            })
          )

          if (cancelled) {
            return
          }

          batchMoves.forEach((move) => {
            if (move) {
              nextMoves.push(move)
            }
          })
        }

        nextMoves.sort((a, b) => a.name.localeCompare(b.name))
        setMoves(nextMoves)
      } catch (error) {
        console.error('Error fetching moves:', error)
      } finally {
        if (!cancelled) {
          setMovesLoading(false)
        }
      }
    }

    fetchMoves()

    return () => {
      cancelled = true
    }
  }, [showMoveDatabase, showGymLeaders, showEliteFour, showComparison, moves.length])

  useEffect(() => {
    try {
      const safeTeams = savedTeams
        .map(serializeSavedTeamForStorage)
        .filter(Boolean)
        .slice(0, MAX_SAVED_TEAMS)

      window.localStorage.setItem(SAVED_TEAMS_STORAGE_KEY, JSON.stringify({
        version: SAVED_TEAMS_SCHEMA_VERSION,
        teams: safeTeams
      }))
      window.localStorage.removeItem(LEGACY_SAVED_TEAMS_STORAGE_KEY)
    } catch (error) {
      console.error('Error saving teams to storage:', error)
    }
  }, [savedTeams])

  useEffect(() => {
    if (!teamImageExportStatus) {
      return undefined
    }

    const timeoutId = window.setTimeout(() => {
      setTeamImageExportStatus('')
    }, 3200)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [teamImageExportStatus])

  useEffect(() => {
    teamRef.current = team
  }, [team])

  useEffect(() => {
    teamHistoryPastRef.current = teamHistoryPast
  }, [teamHistoryPast])

  useEffect(() => {
    teamHistoryFutureRef.current = teamHistoryFuture
  }, [teamHistoryFuture])

  useEffect(() => {
    if (
      !showSaveTeamModal &&
      !pendingLoadTeam &&
      !pendingDeleteTeam &&
      !pendingExportTeam &&
      !showImportTeamModal &&
      !showTeamFullModal &&
      editingBuildSlotIndex === null
    ) {
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setShowSaveTeamModal(false)
        setPendingTeamName('')
        setPendingLoadTeam(null)
        setPendingDeleteTeam(null)
        setPendingExportTeam(null)
        setShowImportTeamModal(false)
        setShowTeamFullModal(false)
        setEditingBuildSlotIndex(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [showSaveTeamModal, pendingLoadTeam, pendingDeleteTeam, pendingExportTeam, showImportTeamModal, showTeamFullModal, editingBuildSlotIndex])

  useEffect(() => {
    if (!menuOpen) {
      return undefined
    }

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [menuOpen])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Shift') {
        setShiftPressed(true)
      }
    }

    const handleKeyUp = (event) => {
      if (event.key === 'Shift') {
        setShiftPressed(false)
      }
    }

    const handleWindowBlur = () => {
      setShiftPressed(false)
      setHoveredRegion(null)
      setHoveredGeneration(null)
      setHoveredPokemonCard(null)
      setHoveredItemCard(null)
      setHoveredMoveCard(null)
      setHoveredLearnsetMove(null)
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    window.addEventListener('blur', handleWindowBlur)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      window.removeEventListener('blur', handleWindowBlur)
    }
  }, [])

  useEffect(() => {
    const handleHistoryKeyDown = (event) => {
      const isModifierPressed = event.metaKey || event.ctrlKey
      const targetTagName = event.target?.tagName?.toLowerCase()
      const isTypingField =
        targetTagName === 'input' ||
        targetTagName === 'textarea' ||
        targetTagName === 'select' ||
        event.target?.isContentEditable

      if (!isModifierPressed || isTypingField) {
        return
      }

      const normalizedKey = event.key.toLowerCase()

      if (normalizedKey === 'z' && event.shiftKey) {
        event.preventDefault()
        handleRedoTeamChange()
        return
      }

      if (normalizedKey === 'y') {
        event.preventDefault()
        handleRedoTeamChange()
        return
      }

      if (normalizedKey === 'z') {
        event.preventDefault()
        handleUndoTeamChange()
      }
    }

    window.addEventListener('keydown', handleHistoryKeyDown)

    return () => {
      window.removeEventListener('keydown', handleHistoryKeyDown)
    }
  }, [])

  useEffect(() => {
    const requestedPokemon = [
      shiftPressed ? hoveredPokemonCard?.pokemon : null,
      ...comparisonSlots,
      ...team.filter(Boolean)
    ].filter(Boolean)

    const missingPokemon = Array.from(
      new Map(requestedPokemon.map((pokemon) => [getPokemonCacheKey(pokemon), pokemon])).values()
    ).filter((pokemon) => !pokemonInfoCache[getPokemonCacheKey(pokemon)])

    if (missingPokemon.length === 0) {
      return undefined
    }

    let cancelled = false

    const fetchMissingPokemonInfo = async () => {
      const fetchedEntries = await Promise.all(
        missingPokemon.map(async (pokemon) => {
          try {
            return [getPokemonCacheKey(pokemon), await fetchPokemonPanelInfo(pokemon)]
          } catch (error) {
            console.error(`Error fetching detail card info for ${pokemon.name}:`, error)
            return null
          }
        })
      )

      if (cancelled) {
        return
      }

      setPokemonInfoCache((current) => {
        const next = { ...current }
        let changed = false

        fetchedEntries.forEach((entry) => {
          if (!entry) {
            return
          }

          const [cacheKey, info] = entry
          if (!next[cacheKey]) {
            next[cacheKey] = info
            changed = true
          }
        })

        return changed ? next : current
      })
    }

    fetchMissingPokemonInfo()

    return () => {
      cancelled = true
    }
  }, [hoveredPokemonCard, shiftPressed, comparisonSlots, team, pokemonInfoCache])

  useEffect(() => {
    if (showComparison) {
      return
    }

    setComparisonTargetSlot(null)
    setComparisonHoveredAbilities([null, null])
  }, [showComparison])

  useEffect(() => {
    if (showItemDatabase) {
      return
    }

    setItemTargetSelection(null)
  }, [showItemDatabase])

  useEffect(() => {
    if (showMoveDatabase) {
      return
    }

    setMoveTargetSelection(null)
  }, [showMoveDatabase])

  useEffect(() => {
    if (showComparison && enemyMatchupSource === 'custom') {
      return
    }

    setCustomMatchupTargetSlot(null)
  }, [showComparison, enemyMatchupSource])

  useEffect(() => {
    if (!shiftPressed || !hoveredItemCard?.item) {
      return undefined
    }

    const item = hoveredItemCard.item
    const cacheKey = item.apiName

    if (itemInfoCache[cacheKey]) {
      return undefined
    }

    let cancelled = false

    const fetchItemInfo = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/item/${item.apiName}`)
        const data = await response.json()

        if (cancelled) {
          return
        }

        setItemInfoCache((current) => ({
          ...current,
          [cacheKey]: {
            effect: getEnglishEffectText(data.effect_entries),
            category: formatDisplayName(data.category?.name || 'unknown')
          }
        }))
      } catch (error) {
        console.error(`Error fetching item card info for ${item.name}:`, error)
      }
    }

    fetchItemInfo()

    return () => {
      cancelled = true
    }
  }, [hoveredItemCard, shiftPressed, itemInfoCache])

  useEffect(() => {
    return () => {
      if (hoverCardCloseTimeoutRef.current) {
        clearTimeout(hoverCardCloseTimeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    setHoveredAbility(null)
    setHoveredLearnsetMove(null)
  }, [hoveredPokemonCard, hoveredItemCard, hoveredMoveCard])

  useEffect(() => {
    if (!shiftPressed || !hoveredLearnsetMove?.apiName) {
      return undefined
    }

    const cacheKey = hoveredLearnsetMove.apiName
    if (moveInfoCache[cacheKey]) {
      return undefined
    }

    const moveFromList = moves.find((move) => move.apiName === cacheKey)
    if (moveFromList) {
      setMoveInfoCache((current) => (
        current[cacheKey]
          ? current
          : {
              ...current,
              [cacheKey]: moveFromList
            }
      ))
      return undefined
    }

    let cancelled = false

    const fetchMoveInfo = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/move/${cacheKey}`)
        const detail = await response.json()

        if (cancelled) {
          return
        }

        setMoveInfoCache((current) => ({
          ...current,
          [cacheKey]: createAssignedMoveEntry({
            id: detail.id,
            name: formatDisplayName(detail.name),
            apiName: detail.name,
            type: detail.type?.name || 'normal',
            pp: detail.pp ?? EMPTY_MOVE_VALUE,
            power: detail.power ?? EMPTY_MOVE_VALUE,
            accuracy: detail.accuracy ?? EMPTY_MOVE_VALUE,
            category: formatDisplayName(detail.damage_class?.name || 'unknown'),
            effect: getEnglishEffectText(detail.effect_entries)
          })
        }))
      } catch (error) {
        console.error(`Error fetching move hover info for ${cacheKey}:`, error)
      }
    }

    fetchMoveInfo()

    return () => {
      cancelled = true
    }
  }, [hoveredLearnsetMove, moveInfoCache, moves, shiftPressed])

  const hoveredPokemonInfo = hoveredPokemonCard?.pokemon
    ? pokemonInfoCache[getPokemonCacheKey(hoveredPokemonCard.pokemon)] || null
    : null
  const hoveredItemInfo = hoveredItemCard?.item
    ? itemInfoCache[hoveredItemCard.item.apiName] || null
    : null
  const hoverAbilities = hoveredPokemonInfo?.abilities || []
  const hoverProfileDetails = hoveredPokemonInfo?.profileDetails || null
  const hoverLearnsetDetails = hoveredPokemonInfo?.learnsetDetails || null
  const hoveredLearnsetMoveInfo = hoveredLearnsetMove?.apiName
    ? moveInfoCache[hoveredLearnsetMove.apiName] || moves.find((move) => move.apiName === hoveredLearnsetMove.apiName) || null
    : null
  const activeBuildEditorPokemon = editingBuildSlotIndex !== null ? team[editingBuildSlotIndex] || null : null
  const activeBuildEditorEvs = activeBuildEditorPokemon ? getPokemonEvs(activeBuildEditorPokemon) : DEFAULT_TEAM_EVS
  const activeBuildEditorSummary = activeBuildEditorPokemon ? getPokemonBuildSummary(activeBuildEditorPokemon) : null
  const comparisonPokemonInfo = comparisonSlots.map((pokemon) =>
    pokemon ? pokemonInfoCache[getPokemonCacheKey(pokemon)] || null : null
  )
  const comparisonStatMaps = comparisonSlots.map((pokemon) =>
    Object.fromEntries(getPokemonStatRows(pokemon).map((stat) => [stat.key, stat.value]))
  )
  const comparisonBsts = comparisonSlots.map((pokemon) => getPokemonBst(pokemon))
  const activeHoverCard = hoveredPokemonCard || hoveredItemCard || hoveredMoveCard

  useLayoutEffect(() => {
    if (!shiftPressed || !activeHoverCard || !hoverCardRef.current) {
      return undefined
    }

    const updateHoverCardSize = () => {
      const rect = hoverCardRef.current.getBoundingClientRect()
      const nextSize = {
        width: Math.ceil(rect.width),
        height: Math.ceil(rect.height)
      }

      setHoverCardSize((current) =>
        current.width === nextSize.width && current.height === nextSize.height ? current : nextSize
      )
    }

    updateHoverCardSize()
    window.addEventListener('resize', updateHoverCardSize)

    return () => {
      window.removeEventListener('resize', updateHoverCardSize)
    }
  }, [shiftPressed, activeHoverCard, hoveredPokemonInfo, hoveredItemInfo, hoveredAbility, hoveredLearnsetMoveInfo])

  const ensurePokemonPanelInfo = async (pokemon) => {
    if (!pokemon) {
      return null
    }

    const cacheKey = getPokemonCacheKey(pokemon)
    if (pokemonInfoCache[cacheKey]) {
      return pokemonInfoCache[cacheKey]
    }

    try {
      const info = await fetchPokemonPanelInfo(pokemon)

      setPokemonInfoCache((current) => (
        current[cacheKey]
          ? current
          : {
              ...current,
              [cacheKey]: info
            }
      ))

      return info
    } catch (error) {
      console.error(`Error fetching detail card info for ${pokemon.name}:`, error)
      return null
    }
  }

  const commitTeamChange = (nextTeamOrUpdater, options = {}) => {
    const currentTeam = teamRef.current
    const resolvedTeam = typeof nextTeamOrUpdater === 'function'
      ? nextTeamOrUpdater(currentTeam)
      : nextTeamOrUpdater

    if (!Array.isArray(resolvedTeam)) {
      return false
    }

    const currentSnapshot = serializeTeamSlots(currentTeam)
    const nextSnapshot = serializeTeamSlots(resolvedTeam)

    if (getTeamSnapshotSignature(currentSnapshot) === getTeamSnapshotSignature(nextSnapshot)) {
      return false
    }

    const nextPast = [...teamHistoryPastRef.current, currentSnapshot].slice(-TEAM_HISTORY_LIMIT)
    const nextFuture = options.clearFuture === false ? teamHistoryFutureRef.current : []
    const normalizedNextTeam = cloneTeamSlots(nextSnapshot)

    teamHistoryPastRef.current = nextPast
    teamHistoryFutureRef.current = nextFuture
    teamRef.current = normalizedNextTeam

    setTeamHistoryPast(nextPast)
    setTeamHistoryFuture(nextFuture)
    setTeam(normalizedNextTeam)

    if (options.closeBuildEditor) {
      setEditingBuildSlotIndex(null)
    }

    return true
  }

  const clearCurrentTeam = () => {
    const emptyTeam = Array(TEAM_SLOT_COUNT).fill(null)

    teamHistoryPastRef.current = []
    teamHistoryFutureRef.current = []
    teamRef.current = emptyTeam

    setTeamHistoryPast([])
    setTeamHistoryFuture([])
    setTeam(emptyTeam)
    setEditingBuildSlotIndex(null)
    setItemTargetSelection(null)
    setMoveTargetSelection(null)
    setShowTeamFullModal(false)
  }

  const handleUndoTeamChange = () => {
    if (teamHistoryPastRef.current.length === 0) {
      return
    }

    const currentSnapshot = serializeTeamSlots(teamRef.current)
    const previousSnapshot = teamHistoryPastRef.current[teamHistoryPastRef.current.length - 1]
    const nextPast = teamHistoryPastRef.current.slice(0, -1)
    const nextFuture = [currentSnapshot, ...teamHistoryFutureRef.current].slice(0, TEAM_HISTORY_LIMIT)
    const restoredTeam = cloneTeamSlots(previousSnapshot)

    teamHistoryPastRef.current = nextPast
    teamHistoryFutureRef.current = nextFuture
    teamRef.current = restoredTeam

    setTeamHistoryPast(nextPast)
    setTeamHistoryFuture(nextFuture)
    setTeam(restoredTeam)
    setEditingBuildSlotIndex(null)
  }

  const handleRedoTeamChange = () => {
    if (teamHistoryFutureRef.current.length === 0) {
      return
    }

    const currentSnapshot = serializeTeamSlots(teamRef.current)
    const [nextSnapshot, ...remainingFuture] = teamHistoryFutureRef.current
    const nextPast = [...teamHistoryPastRef.current, currentSnapshot].slice(-TEAM_HISTORY_LIMIT)
    const restoredTeam = cloneTeamSlots(nextSnapshot)

    teamHistoryPastRef.current = nextPast
    teamHistoryFutureRef.current = remainingFuture
    teamRef.current = restoredTeam

    setTeamHistoryPast(nextPast)
    setTeamHistoryFuture(remainingFuture)
    setTeam(restoredTeam)
    setEditingBuildSlotIndex(null)
  }

  const addToTeam = (pokemonData) => {
    const currentTeam = teamRef.current
    const emptySlot = currentTeam.findIndex(slot => slot === null)

    if (emptySlot === -1) {
      setShowTeamFullModal(true)
      return
    }

    const newTeam = [...currentTeam]
    newTeam[emptySlot] = createTeamPokemonEntry(pokemonData)
    commitTeamChange(newTeam)
  }

  const getSelectedAbilityForPokemon = (pokemon) => {
    if (!pokemon) {
      return null
    }

    const selectedAbility =
      (pokemon.abilities || []).find((ability) => ability.name === pokemon.selectedAbilityApiName) ||
      (pokemon.abilities || []).find((ability) => !ability.isHidden) ||
      pokemon.abilities?.[0] ||
      null

    return selectedAbility
      ? {
          ...selectedAbility,
          displayName: formatDisplayName(selectedAbility.name)
        }
      : null
  }

  const cycleTeamPokemonAbility = (slotIndex) => {
    const pokemon = team[slotIndex]

    if (!pokemon || !Array.isArray(pokemon.abilities) || pokemon.abilities.length === 0) {
      return
    }

    const currentIndex = pokemon.abilities.findIndex((ability) => ability.name === pokemon.selectedAbilityApiName)
    const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % pokemon.abilities.length
    const nextTeam = [...team]
    nextTeam[slotIndex] = {
      ...pokemon,
      selectedAbilityApiName: pokemon.abilities[nextIndex]?.name || ''
    }
    commitTeamChange(nextTeam)
  }

  const openTeamBuildEditor = (slotIndex) => {
    if (!team[slotIndex]) {
      return
    }

    setEditingBuildSlotIndex(slotIndex)
  }

  const closeTeamBuildEditor = () => {
    setEditingBuildSlotIndex(null)
  }

  const updateTeamPokemonNature = (slotIndex, natureKey) => {
    if (!team[slotIndex]) {
      return
    }

    const nextTeam = [...team]
    nextTeam[slotIndex] = {
      ...nextTeam[slotIndex],
      nature: normalizeTeamNature(natureKey)
    }
    commitTeamChange(nextTeam)
  }

  const updateTeamPokemonEv = (slotIndex, statKey, nextValue) => {
    if (!team[slotIndex] || !DEFAULT_TEAM_EVS.hasOwnProperty(statKey)) {
      return
    }

    const currentPokemon = team[slotIndex]
    const currentEvs = getPokemonEvs(currentPokemon)
    const otherTotal = Object.entries(currentEvs).reduce(
      (sum, [key, value]) => sum + (key === statKey ? 0 : value),
      0
    )
    const maxAllowed = Math.max(0, Math.min(252, 510 - otherTotal))
    const clampedValue = clampInteger(nextValue, 0, maxAllowed, currentEvs[statKey])
    const nextTeam = [...team]
    nextTeam[slotIndex] = {
      ...currentPokemon,
      evs: {
        ...currentEvs,
        [statKey]: clampedValue
      }
    }
    commitTeamChange(nextTeam)
  }

  const resetTeamPokemonEvs = (slotIndex) => {
    if (!team[slotIndex]) {
      return
    }

    const nextTeam = [...team]
    nextTeam[slotIndex] = {
      ...nextTeam[slotIndex],
      evs: { ...DEFAULT_TEAM_EVS }
    }
    commitTeamChange(nextTeam)
  }

  const assignItemToTeamSlot = (slotIndex, item) => {
    if (!item || !team[slotIndex]) {
      return
    }

    const newTeam = [...team]
    newTeam[slotIndex] = {
      ...newTeam[slotIndex],
      heldItem: item
    }
    commitTeamChange(newTeam)
  }

  const clearMoveFromTeamSlot = (slotIndex, moveIndex) => {
    if (!team[slotIndex]) {
      return
    }

    const newTeam = [...team]
    const nextMoves = normalizeAssignedMoves(newTeam[slotIndex].moves)
    nextMoves[moveIndex] = null
    newTeam[slotIndex] = {
      ...newTeam[slotIndex],
      moves: nextMoves
    }
    commitTeamChange(newTeam)
  }

  const assignMoveToTeamSlot = async (slotIndex, move, preferredMoveIndex = null) => {
    const pokemon = team[slotIndex]

    if (!pokemon || !move) {
      return
    }

    const panelInfo = await ensurePokemonPanelInfo(pokemon)
    const learnsetDetails = panelInfo?.learnsetDetails || null
    const assignmentDetails = getAssignableMoveDetails(
      pokemon,
      learnsetDetails,
      chartMoveRuleGameKey,
      chartMoveRuleGameDetails
    )

    if (!assignmentDetails.resolution || assignmentDetails.resolution.versionGroups.length === 0) {
      alert(assignmentDetails.resolution?.helperText || `${pokemon.name} has no move learnset data for the current rules.`)
      return
    }

    if (!assignmentDetails.moveMap.has(move.apiName)) {
      alert(`${pokemon.name} cannot learn ${move.name} under ${assignmentDetails.resolution.assignmentLabel}.`)
      return
    }

    const currentMoves = normalizeAssignedMoves(pokemon.moves)
    const duplicateMoveIndex = currentMoves.findIndex((entry) => entry?.apiName === move.apiName)

    if (duplicateMoveIndex !== -1 && duplicateMoveIndex !== preferredMoveIndex) {
      alert(`${pokemon.name} already has ${move.name}.`)
      setMoveTargetSelection(null)
      return
    }

    const targetMoveIndex = preferredMoveIndex ?? currentMoves.findIndex((entry) => !entry)

    if (targetMoveIndex === -1) {
      alert(`${pokemon.name} already has four moves. Click one of its move slots to replace or clear it.`)
      return
    }

    const newTeam = [...team]
    const nextMoves = normalizeAssignedMoves(newTeam[slotIndex].moves)
    nextMoves[targetMoveIndex] = createAssignedMoveEntry(move)
    newTeam[slotIndex] = {
      ...newTeam[slotIndex],
      moves: nextMoves
    }
    commitTeamChange(newTeam)
    setMoveTargetSelection(null)
  }

  const handleItemCardClick = (item) => {
    setHoveredPokemonCard(null)
    setHoveredItemCard(null)
    setHoveredMoveCard(null)
    setHoveredAbility(null)
    setMoveTargetSelection(null)
    setItemTargetSelection((current) => (current?.apiName === item.apiName ? null : item))
  }

  const handleMoveCardClick = (move) => {
    setHoveredPokemonCard(null)
    setHoveredItemCard(null)
    setHoveredMoveCard(null)
    setHoveredAbility(null)
    setItemTargetSelection(null)
    setMoveTargetSelection((current) => (current?.apiName === move.apiName ? null : move))
  }

  const handleTeamMoveSlotClick = async (event, slotIndex, moveIndex) => {
    const pokemon = team[slotIndex]
    if (!pokemon) {
      return
    }

    event.stopPropagation()

    if (moveTargetSelection) {
      await assignMoveToTeamSlot(slotIndex, moveTargetSelection, moveIndex)
      return
    }

    clearMoveFromTeamSlot(slotIndex, moveIndex)
  }

  const assignPokemonToCustomMatchupSlot = (slotIndex, pokemon) => {
    if (!pokemon || slotIndex < 0 || slotIndex >= TEAM_SLOT_COUNT) {
      return
    }

    setCustomMatchupTeam((current) => {
      const nextTeam = cloneTeamSlots(current)
      nextTeam[slotIndex] = createTeamPokemonEntry(pokemon)
      return nextTeam
    })
    setCustomMatchupTargetSlot(null)
    setEnemyMatchupSource('custom')
  }

  const removeCustomMatchupPokemon = (slotIndex) => {
    setCustomMatchupTeam((current) => {
      const nextTeam = cloneTeamSlots(current)
      nextTeam[slotIndex] = null
      return nextTeam
    })
    setCustomMatchupTargetSlot((current) => (current === slotIndex ? null : current))
  }

  const clearCustomMatchupTeam = () => {
    setCustomMatchupTeam(Array(TEAM_SLOT_COUNT).fill(null))
    setCustomMatchupTargetSlot(null)
  }

  const assignMoveToCustomMatchupSlot = (slotIndex, move, preferredMoveIndex = null) => {
    const pokemon = customMatchupTeam[slotIndex]

    if (!pokemon || !move) {
      return
    }

    const currentMoves = normalizeAssignedMoves(pokemon.moves)
    const duplicateMoveIndex = currentMoves.findIndex((entry) => entry?.apiName === move.apiName)

    if (duplicateMoveIndex !== -1 && duplicateMoveIndex !== preferredMoveIndex) {
      alert(`${pokemon.name} already has ${move.name}.`)
      setMoveTargetSelection(null)
      return
    }

    const targetMoveIndex = preferredMoveIndex ?? currentMoves.findIndex((entry) => !entry)

    if (targetMoveIndex === -1) {
      alert(`${pokemon.name} already has four moves. Click one of its move slots to replace or clear it.`)
      return
    }

    setCustomMatchupTeam((current) => {
      const nextTeam = cloneTeamSlots(current)
      const nextMoves = normalizeAssignedMoves(nextTeam[slotIndex].moves)
      nextMoves[targetMoveIndex] = createAssignedMoveEntry(move)
      nextTeam[slotIndex] = {
        ...nextTeam[slotIndex],
        moves: nextMoves
      }
      return nextTeam
    })
    setMoveTargetSelection(null)
  }

  const clearMoveFromCustomMatchupSlot = (slotIndex, moveIndex) => {
    const pokemon = customMatchupTeam[slotIndex]

    if (!pokemon) {
      return
    }

    setCustomMatchupTeam((current) => {
      const nextTeam = cloneTeamSlots(current)
      const nextMoves = normalizeAssignedMoves(nextTeam[slotIndex].moves)
      nextMoves[moveIndex] = null
      nextTeam[slotIndex] = {
        ...nextTeam[slotIndex],
        moves: nextMoves
      }
      return nextTeam
    })
  }

  const handleCustomMatchupSlotClick = (pokemon, slotIndex) => {
    if (pokemon && moveTargetSelection) {
      assignMoveToCustomMatchupSlot(slotIndex, moveTargetSelection)
      return
    }

    setCustomMatchupTargetSlot((current) => (current === slotIndex ? null : slotIndex))
    setEnemyMatchupSource('custom')
  }

  const handleCustomMatchupMoveSlotClick = (event, slotIndex, moveIndex) => {
    const pokemon = customMatchupTeam[slotIndex]

    if (!pokemon) {
      return
    }

    event.stopPropagation()

    if (moveTargetSelection) {
      assignMoveToCustomMatchupSlot(slotIndex, moveTargetSelection, moveIndex)
      return
    }

    clearMoveFromCustomMatchupSlot(slotIndex, moveIndex)
  }

  const handleMovePickerTeamControlClick = (event, pokemon) => {
    if (!moveTargetSelection || !pokemon) {
      return false
    }

    event.stopPropagation()
    const slotIndex = team.findIndex((entry) => entry && getPokemonCacheKey(entry) === getPokemonCacheKey(pokemon))

    if (slotIndex !== -1) {
      assignMoveToTeamSlot(slotIndex, moveTargetSelection)
    }

    return true
  }

  const assignPokemonToComparisonSlot = (slotIndex, pokemon) => {
    const normalizedPokemon = createTeamPokemonEntry(pokemon)
    setComparisonSlots((current) => current.map((entry, index) => (index === slotIndex ? normalizedPokemon : entry)))
    setComparisonHoveredAbilities((current) => current.map((entry, index) => (index === slotIndex ? null : entry)))
    setComparisonTargetSlot(null)
  }

  const handleSaveTeam = () => {
    if (teamCount === 0) {
      alert('Add at least one Pokemon before saving a team.')
      return
    }

    setPendingTeamName(`Team ${savedTeams.length + 1}`)
    setShowSaveTeamModal(true)
  }

  const closeSaveTeamModal = () => {
    setShowSaveTeamModal(false)
    setPendingTeamName('')
  }

  const submitSaveTeam = (event) => {
    event.preventDefault()

    const teamName = sanitizeStorageText(pendingTeamName, MAX_SAVED_TEAM_NAME_LENGTH)
    if (!teamName) {
      return
    }

    const nextSavedTeam = {
      id: existingPendingSavedTeam?.id || `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: teamName,
      savedAt: new Date().toISOString(),
      slots: serializeTeamSlots(team)
    }

    setSavedTeams((current) =>
      sortSavedTeams(
        existingPendingSavedTeam
          ? current.map((entry) => (entry.id === existingPendingSavedTeam.id ? nextSavedTeam : entry))
          : [nextSavedTeam, ...current]
      )
    )
    setShowSavedTeams(true)
    setShowSaveTeamModal(false)
    setPendingTeamName('')
  }

  const handleComparisonSlotClick = (slotIndex) => {
    setComparisonTargetSlot((current) => (current === slotIndex ? null : slotIndex))
  }

  const removePokemonById = (pokemonId) => {
    const slotIndex = team.findIndex(p => p && p.id === pokemonId)
    if (slotIndex === -1) {
      return
    }

    const newTeam = [...team]
    newTeam[slotIndex] = null
    commitTeamChange(newTeam)
  }

  const handleTeamSlotClick = (pokemon, slotIndex) => {
    if (!pokemon) {
      return
    }

    if (itemTargetSelection) {
      assignItemToTeamSlot(slotIndex, itemTargetSelection)
      setItemTargetSelection(null)
      return
    }

    if (moveTargetSelection) {
      assignMoveToTeamSlot(slotIndex, moveTargetSelection)
      return
    }

    if (comparisonTargetSlot !== null) {
      assignPokemonToComparisonSlot(comparisonTargetSlot, pokemon)
      return
    }

    removeFromTeam(slotIndex)
  }

  const removeFromTeam = (slotIndex) => {
    const newTeam = [...team]
    newTeam[slotIndex] = null
    commitTeamChange(newTeam)
  }

  const applyLoadSavedTeam = (savedTeam) => {
    const nextTeam = cloneTeamSlots(savedTeam.slots)
    commitTeamChange(nextTeam, { closeBuildEditor: true })
    setItemTargetSelection(null)
    setMoveTargetSelection(null)
    setComparisonTargetSlot(null)
    setEditingBuildSlotIndex(null)
    setPendingLoadTeam(null)
  }

  const handleLoadSavedTeam = (savedTeam) => {
    if (team.some(Boolean)) {
      setPendingLoadTeam(savedTeam)
      return
    }

    applyLoadSavedTeam(savedTeam)
  }

  const closeLoadTeamModal = () => {
    setPendingLoadTeam(null)
  }

  const handleDeleteSavedTeam = (savedTeam) => {
    setPendingDeleteTeam(savedTeam)
  }

  const handleExportSavedTeam = async (savedTeam) => {
    setPendingExportTeam(savedTeam)
    setTeamExportText('')
    setTeamExportStatus('Building a compressed share code...')

    try {
      const shareText = await stringifyTeamSharePayload(savedTeam)
      setTeamExportText(shareText)
      setTeamExportStatus(
        shareText.startsWith(TEAM_SHARE_COMPRESSED_PREFIX)
          ? 'Compressed share code ready.'
          : 'Share code ready.'
      )
    } catch (error) {
      console.error('Error exporting team:', error)
      setTeamExportStatus('Something went wrong while building the share code.')
    }
  }

  const closeExportTeamModal = () => {
    setPendingExportTeam(null)
    setTeamExportText('')
    setTeamExportStatus('')
  }

  const copyExportTeamText = async () => {
    if (!teamExportText) {
      return
    }

    if (!navigator?.clipboard?.writeText) {
      setTeamExportStatus('Clipboard access is unavailable here, so copy the text manually.')
      return
    }

    try {
      await navigator.clipboard.writeText(teamExportText)
      setTeamExportStatus('Team code copied. Send it to a friend and they can import it.')
    } catch (error) {
      console.error('Error copying exported team text:', error)
      setTeamExportStatus('Clipboard was blocked, so copy the text manually instead.')
    }
  }

  const openImportTeamModal = () => {
    setShowImportTeamModal(true)
    setImportTeamText('')
    setImportTeamError('')
  }

  const closeImportTeamModal = () => {
    setShowImportTeamModal(false)
    setImportTeamText('')
    setImportTeamError('')
  }

  const loadImageForTeamExport = (src) => new Promise((resolve) => {
    if (!src) {
      resolve(null)
      return
    }

    const image = new Image()
    image.crossOrigin = 'anonymous'
    image.decoding = 'async'

    image.onload = () => resolve(image)
    image.onerror = async () => {
      try {
        const response = await fetch(src)
        if (!response.ok) {
          resolve(null)
          return
        }

        const blob = await response.blob()
        const objectUrl = URL.createObjectURL(blob)
        const fallbackImage = new Image()
        fallbackImage.decoding = 'async'
        fallbackImage.onload = () => {
          URL.revokeObjectURL(objectUrl)
          resolve(fallbackImage)
        }
        fallbackImage.onerror = () => {
          URL.revokeObjectURL(objectUrl)
          resolve(null)
        }
        fallbackImage.src = objectUrl
      } catch (error) {
        console.error('Error loading team export image:', error)
        resolve(null)
      }
    }

    image.src = src
  })

  const exportCurrentTeamAsImage = async () => {
    if (teamCount === 0 || teamImageExporting) {
      return
    }

    setTeamImageExporting(true)
    setTeamImageExportStatus('Rendering team image...')

    try {
      await document.fonts?.ready

      const exportTeam = cloneTeamSlots(teamRef.current)
      const shellStyles = getComputedStyle(document.querySelector('.app-shell') || document.documentElement)
      const accentColor = shellStyles.getPropertyValue('--theme-accent').trim() || '#5a84ff'
      const headingColor = shellStyles.getPropertyValue('--theme-heading').trim() || '#22304a'
      const mutedColor = shellStyles.getPropertyValue('--theme-muted').trim() || '#60708b'
      const cardBorderColor = shellStyles.getPropertyValue('--theme-panel-border').trim() || 'rgba(108, 128, 161, 0.15)'
      const sectionWidth = teamSectionRef.current?.clientWidth || 0

      const outerPadding = 28
      const cardPadding = 28
      const titleHeight = 92
      const exportWidth = Math.max(
        1560,
        Math.min(1980, sectionWidth > 0 ? Math.round(sectionWidth * 1.4) : 0),
        outerPadding * 2 + TEAM_SLOT_COUNT * TEAM_EXPORT_SLOT_WIDTH + (TEAM_SLOT_COUNT - 1) * TEAM_EXPORT_SLOT_GAP
      )
      const availableSlotsWidth = exportWidth - outerPadding * 2 - cardPadding * 2
      const slotWidth = Math.floor((availableSlotsWidth - (TEAM_SLOT_COUNT - 1) * TEAM_EXPORT_SLOT_GAP) / TEAM_SLOT_COUNT)
      const slotHeight = TEAM_EXPORT_SLOT_HEIGHT
      const exportHeight = outerPadding * 2 + titleHeight + cardPadding * 2 + slotHeight

      const canvas = document.createElement('canvas')
      canvas.width = exportWidth * TEAM_EXPORT_SCALE
      canvas.height = exportHeight * TEAM_EXPORT_SCALE
      const context = canvas.getContext('2d')

      if (!context) {
        throw new Error('Canvas export is unavailable.')
      }

      context.scale(TEAM_EXPORT_SCALE, TEAM_EXPORT_SCALE)
      context.imageSmoothingEnabled = false

      const pageGradient = context.createLinearGradient(0, 0, 0, exportHeight)
      pageGradient.addColorStop(0, '#fbfbf8')
      pageGradient.addColorStop(1, '#eef2f7')
      context.fillStyle = pageGradient
      context.fillRect(0, 0, exportWidth, exportHeight)

      drawRoundedRectPath(context, outerPadding, outerPadding, exportWidth - outerPadding * 2, exportHeight - outerPadding * 2, 30)
      const panelGradient = context.createLinearGradient(outerPadding, outerPadding, outerPadding, exportHeight - outerPadding)
      panelGradient.addColorStop(0, '#ffffff')
      panelGradient.addColorStop(1, '#f5f8ff')
      context.fillStyle = panelGradient
      context.fill()
      context.lineWidth = 2
      context.strokeStyle = cardBorderColor
      context.stroke()

      context.fillStyle = headingColor
      context.font = '34px "PKMN RBYGSC", monospace'
      context.textAlign = 'center'
      context.textBaseline = 'top'
      context.fillText('Your Team', exportWidth / 2, outerPadding + 18)

      context.fillStyle = mutedColor
      context.font = '18px "PKMN RBYGSC", monospace'
      context.fillText(`Team Size: ${teamCount}/${TEAM_SLOT_COUNT}`, exportWidth / 2, outerPadding + 58)

      const spriteAndItemImages = await Promise.all(exportTeam.map(async (pokemon) => {
        if (!pokemon) {
          return { pokemonImage: null, itemImage: null }
        }

        const displayPokemon = getPokemonDisplayVariant(pokemon, showShinySprites)

        const [pokemonImage, itemImage] = await Promise.all([
          loadImageForTeamExport(displayPokemon?.image || null),
          loadImageForTeamExport(pokemon.heldItem?.image || null)
        ])

        return { pokemonImage, itemImage }
      }))

      const drawImageContained = (image, x, y, width, height) => {
        if (!image) {
          return
        }

        const imageRatio = image.width / image.height
        const frameRatio = width / height
        let drawWidth = width
        let drawHeight = height

        if (imageRatio > frameRatio) {
          drawHeight = width / imageRatio
        } else {
          drawWidth = height * imageRatio
        }

        const drawX = x + (width - drawWidth) / 2
        const drawY = y + (height - drawHeight) / 2
        context.drawImage(image, drawX, drawY, drawWidth, drawHeight)
      }

      exportTeam.forEach((pokemon, index) => {
        const slotX = outerPadding + cardPadding + index * (slotWidth + TEAM_EXPORT_SLOT_GAP)
        const slotY = outerPadding + titleHeight + cardPadding
        const { pokemonImage, itemImage } = spriteAndItemImages[index]

        drawRoundedRectPath(context, slotX, slotY, slotWidth, slotHeight, 22)
        const slotGradient = context.createLinearGradient(slotX, slotY, slotX, slotY + slotHeight)
        slotGradient.addColorStop(0, pokemon ? '#ffffff' : '#f5f8fd')
        slotGradient.addColorStop(1, pokemon ? '#eef4ff' : '#e3ebf7')
        context.fillStyle = slotGradient
        context.fill()
        context.lineWidth = 3
        context.strokeStyle = pokemon ? accentColor : '#96a3b7'
        context.stroke()

        if (!pokemon) {
          context.fillStyle = mutedColor
          context.font = '18px "PKMN RBYGSC", monospace'
          context.textAlign = 'center'
          context.textBaseline = 'middle'
          context.fillText('Empty Slot', slotX + slotWidth / 2, slotY + slotHeight / 2)
          return
        }

        const displayPokemon = getPokemonDisplayVariant(pokemon, showShinySprites)
        const selectedAbility = getSelectedAbilityForPokemon(pokemon)
        const buildSummary = getPokemonBuildSummary(pokemon)
        const spriteFrameY = slotY + 18

        drawImageContained(pokemonImage, slotX + 26, spriteFrameY, slotWidth - 52, 108)

        context.fillStyle = headingColor
        context.font = '20px "PKMN RBYGSC", monospace'
        context.textAlign = 'center'
        context.textBaseline = 'top'
        context.fillText(
          fitCanvasText(context, formatDisplayName(displayPokemon.name), slotWidth - 28),
          slotX + slotWidth / 2,
          slotY + 126
        )

        const abilityY = slotY + 166
        drawRoundedRectPath(context, slotX + 14, abilityY, slotWidth - 28, 36, 16)
        const abilityGradient = context.createLinearGradient(slotX, abilityY, slotX, abilityY + 36)
        abilityGradient.addColorStop(0, '#ffffff')
        abilityGradient.addColorStop(1, '#edf4ff')
        context.fillStyle = abilityGradient
        context.fill()
        context.lineWidth = 1
        context.strokeStyle = 'rgba(108, 128, 161, 0.18)'
        context.stroke()
        context.fillStyle = headingColor
        context.font = '14px "PKMN RBYGSC", monospace'
        context.fillText(
          fitCanvasText(context, selectedAbility?.displayName || 'Ability', slotWidth - 48),
          slotX + slotWidth / 2,
          abilityY + 10
        )

        if (pokemon.heldItem) {
          const itemY = abilityY + 48
          drawRoundedRectPath(context, slotX + 14, itemY, slotWidth - 28, 34, 16)
          context.fillStyle = '#f7faff'
          context.fill()
          context.strokeStyle = 'rgba(108, 128, 161, 0.16)'
          context.stroke()
          if (itemImage) {
            drawImageContained(itemImage, slotX + 20, itemY + 5, 24, 24)
          }
          context.fillStyle = mutedColor
          context.font = '13px "PKMN RBYGSC", monospace'
          context.textAlign = 'left'
          context.fillText(
            fitCanvasText(context, pokemon.heldItem.name, slotWidth - 62),
            slotX + 50,
            itemY + 10
          )
        }

        const buildButtonY = pokemon.heldItem ? abilityY + 92 : abilityY + 48
        drawRoundedRectPath(context, slotX + 14, buildButtonY, slotWidth - 28, 52, 16)
        context.fillStyle = '#f7faff'
        context.fill()
        context.strokeStyle = 'rgba(108, 128, 161, 0.16)'
        context.stroke()
        context.textAlign = 'center'
        context.fillStyle = headingColor
        context.font = '14px "PKMN RBYGSC", monospace'
        context.fillText(
          fitCanvasText(context, `${buildSummary?.nature.label || 'Hardy'} Nature`, slotWidth - 44),
          slotX + slotWidth / 2,
          buildButtonY + 10
        )
        context.fillStyle = mutedColor
        context.font = '12px "PKMN RBYGSC", monospace'
        context.fillText(
          fitCanvasText(context, buildSummary?.evSummary || 'No EVs', slotWidth - 44),
          slotX + slotWidth / 2,
          buildButtonY + 28
        )

        const movesStartY = buildButtonY + 66
        normalizeAssignedMoves(pokemon.moves).forEach((move, moveIndex) => {
          const chipY = movesStartY + moveIndex * 44
          drawRoundedRectPath(context, slotX + 14, chipY, slotWidth - 28, 34, 14)
          context.fillStyle = move ? '#ffffff' : '#f5f7fb'
          context.fill()
          context.strokeStyle = move ? 'rgba(108, 128, 161, 0.2)' : 'rgba(108, 128, 161, 0.18)'
          context.setLineDash(move ? [] : [5, 4])
          context.stroke()
          context.setLineDash([])
          context.fillStyle = move ? (teamExportMoveTypeTextColors[move.type] || headingColor) : '#8b97a8'
          context.font = '13px "PKMN RBYGSC", monospace'
          context.textAlign = 'center'
          context.fillText(
            fitCanvasText(context, move?.name || 'Empty Move', slotWidth - 44),
            slotX + slotWidth / 2,
            chipY + 10
          )
        })
      })

      const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'))
      if (!blob) {
        throw new Error('Failed to build PNG export.')
      }

      const link = document.createElement('a')
      const objectUrl = URL.createObjectURL(blob)
      link.href = objectUrl
      link.download = `pokeapp-team-${new Date().toISOString().slice(0, 10)}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(objectUrl)
      setTeamImageExportStatus('Team image downloaded.')
    } catch (error) {
      console.error('Error exporting team image:', error)
      setTeamImageExportStatus('Image export failed. Please try again.')
    } finally {
      setTeamImageExporting(false)
    }
  }

  const submitImportTeam = async (event) => {
    event.preventDefault()

    let importedTeam = null

    try {
      importedTeam = await parseImportedTeamPayload(importTeamText)
    } catch (error) {
      console.error('Error parsing imported team text:', error)
    }

    if (!importedTeam) {
      setImportTeamError('Paste a valid exported team code to import it.')
      return
    }

    setSavedTeams((current) => {
      const nextSavedTeam = serializeSavedTeamForStorage({
        ...importedTeam,
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        name: buildImportedTeamName(current, importedTeam.name),
        savedAt: new Date().toISOString(),
        slots: cloneTeamSlots(importedTeam.slots)
      })

      if (!nextSavedTeam) {
        return current
      }

      return sortSavedTeams([nextSavedTeam, ...current].slice(0, MAX_SAVED_TEAMS))
    })
    setShowSavedTeams(true)
    closeImportTeamModal()
  }

  const closeDeleteTeamModal = () => {
    setPendingDeleteTeam(null)
  }

  const confirmDeleteSavedTeam = () => {
    if (!pendingDeleteTeam) {
      return
    }

    setSavedTeams((current) => current.filter((entry) => entry.id !== pendingDeleteTeam.id))
    setPendingDeleteTeam(null)
  }

  const getCombinedTypeMultiplier = (attackingType, defendingTypes) => {
    return defendingTypes.reduce((multiplier, defendingType) => {
      const chart = defensiveTypeChart[defendingType]
      if (!chart) {
        return multiplier
      }

      if (chart.immune.includes(attackingType)) {
        return 0
      }

      if (chart.weak.includes(attackingType)) {
        return multiplier * 2
      }

      if (chart.resist.includes(attackingType)) {
        return multiplier * 0.5
      }

      return multiplier
    }, 1)
  }

  const pokemonProvidesCoverage = (pokemon, targetType, coverageSource = analyzerCoverageSource) => {
    if (coverageSource === 'pokemon-types') {
      return getPokemonCoverageTypesFromOwnTypes(pokemon).has(targetType)
    }

    return getPokemonCoverageTypesFromMoves(pokemon).has(targetType)
  }

  const getPokemonWeaknessMultiplier = (pokemon, attackingType) => {
    if (!pokemon) {
      return 1
    }

    return getCombinedTypeMultiplier(attackingType, pokemon.types)
  }

  const pokemonIsWeakToType = (pokemon, attackingType) => {
    return getPokemonWeaknessMultiplier(pokemon, attackingType) > 1
  }

  const pokemonResistsType = (pokemon, attackingType) => {
    return getPokemonWeaknessMultiplier(pokemon, attackingType) < 1
  }

  const calculateTeamTypes = (currentTeam) => {
    const moveCoverageCount = {}
    const pokemonTypeCoverageCount = {}
    const weaknessCount = {}
    const moveTypeUsage = {}
    const resistanceCount = {}
    const immunityCount = {}

    currentTeam.forEach(pokemon => {
      if (pokemon) {
        getPokemonCoverageTypesFromOwnTypes(pokemon).forEach((type) => {
          pokemonTypeCoverageCount[type] = (pokemonTypeCoverageCount[type] || 0) + 1
        })

        getAssignedMovesForPokemon(pokemon).forEach((move) => {
          const effectiveness = typeEffectiveness[move.type]

          moveTypeUsage[move.type] = (moveTypeUsage[move.type] || 0) + 1

          if (!effectiveness) {
            return
          }

          effectiveness.strong.forEach((type) => {
            moveCoverageCount[type] = (moveCoverageCount[type] || 0) + 1
          })
        })

        typesList.forEach((attackingType) => {
          const weaknessMultiplier = getPokemonWeaknessMultiplier(pokemon, attackingType)

          if (weaknessMultiplier > 1) {
            weaknessCount[attackingType] =
              (weaknessCount[attackingType] || 0) + (weaknessMultiplier >= 4 ? 2 : 1)
          } else if (weaknessMultiplier === 0) {
            immunityCount[attackingType] = (immunityCount[attackingType] || 0) + 1
          } else if (weaknessMultiplier < 1) {
            resistanceCount[attackingType] = (resistanceCount[attackingType] || 0) + 1
          }
        })
      }
    })

    setTeamTypes({
      moveCoverage: moveCoverageCount,
      pokemonTypeCoverage: pokemonTypeCoverageCount,
      weaknesses: weaknessCount,
      moveTypeUsage,
      resistances: resistanceCount,
      immunities: immunityCount
    })
  }

  const isInTeam = (pokemonId) => {
    return team.some(p => p && p.id === pokemonId)
  }

  const isPokemonAlreadyOnTeam = (pokemon) =>
    team.some((entry) => entry && getPokemonCacheKey(entry) === getPokemonCacheKey(pokemon))

  const teamCount = team.filter(p => p !== null).length
  const customMatchupTeamCount = customMatchupTeam.filter(Boolean).length
  const customMatchupActiveTeam = customMatchupTeam.filter(Boolean)
  const canUndoTeamChange = teamHistoryPast.length > 0
  const canRedoTeamChange = teamHistoryFuture.length > 0
  const hasFeaturePanel = !showGamePicker && (
    showAnalyzer ||
    showSuggestedAdditions ||
    showComparison ||
    showItemDatabase ||
    showMoveDatabase ||
    showGymLeaders ||
    showEliteFour ||
    showSavedTeams
  )
  const normalizedPendingTeamName = normalizeDisplayName(pendingTeamName)

  useEffect(() => {
    calculateTeamTypes(team)
  }, [team])

  useEffect(() => {
    const selectedGymLeaderGroupKey = gymLeaderGameGroupByGameKey[selectedGame]

    if (selectedGymLeaderGroupKey && gymLeaderGameLookup[selectedGymLeaderGroupKey]) {
      setSelectedGymLeaderGame(selectedGymLeaderGroupKey)
    }
  }, [selectedGame])

  useEffect(() => {
    if (selectedGame === 'all' && (selectedGymLeaderGame === 'sword' || selectedGymLeaderGame === 'shield')) {
      setSelectedGymLeaderGame('sword-shield')
    }
  }, [selectedGame, selectedGymLeaderGame])

  useEffect(() => {
    const selectedEliteFourGroupKey = eliteFourGameGroupByGameKey[selectedGame]

    if (selectedEliteFourGroupKey && eliteFourGameLookup[selectedEliteFourGroupKey]) {
      setSelectedEliteFourGame(selectedEliteFourGroupKey)
    }
  }, [selectedGame])

  useEffect(() => {
    if (selectedGame === 'all' && (selectedEliteFourGame === 'sword' || selectedEliteFourGame === 'shield')) {
      setSelectedEliteFourGame('sword-shield')
    }
  }, [selectedGame, selectedEliteFourGame])

  const existingPendingSavedTeam = normalizedPendingTeamName
    ? savedTeams.find((entry) => normalizeDisplayName(entry.name) === normalizedPendingTeamName)
    : null
  const comparisonSlotLabels = ['Blue Slot', 'Red Slot']
  const normalizedItemSearch = itemSearch.trim().toLowerCase()
  const normalizedMoveSearch = moveSearch.trim().toLowerCase()
  const moveLookupByNormalizedName = Object.fromEntries(
    moves.map((move) => [normalizeDisplayName(move.name || move.apiName || ''), move])
  )
  const moveTypeFilterOptions = Array.from(new Set(moves.map((move) => move.type)))
    .sort((a, b) => {
      const aIndex = typesList.indexOf(a)
      const bIndex = typesList.indexOf(b)

      if (aIndex !== -1 || bIndex !== -1) {
        if (aIndex === -1) {
          return 1
        }

        if (bIndex === -1) {
          return -1
        }

        return aIndex - bIndex
      }

      return a.localeCompare(b)
    })
  const moveCategoryFilterOptions = Array.from(new Set(moves.map((move) => move.category.toLowerCase())))
    .sort((a, b) => {
      const categoryOrder = ['physical', 'special', 'status', 'unknown']
      const aIndex = categoryOrder.indexOf(a)
      const bIndex = categoryOrder.indexOf(b)

      if (aIndex === -1 || bIndex === -1) {
        if (aIndex === -1 && bIndex === -1) {
          return a.localeCompare(b)
        }

        return aIndex === -1 ? 1 : -1
      }

      return aIndex - bIndex
    })
  const browseEggGroupOptions = Array.from(
    new Set(allBrowsePokemon.flatMap((pokemon) => pokemon.eggGroupKeys || []))
  )
    .sort((a, b) => a.localeCompare(b))
    .map((eggGroup) => ({
      key: eggGroup,
      label: formatDisplayName(eggGroup)
    }))
  const browseGrowthRateOptions = Array.from(
    new Set(allBrowsePokemon.map((pokemon) => pokemon.growthRateKey).filter(Boolean))
  )
    .sort((a, b) => a.localeCompare(b))
    .map((growthRate) => ({
      key: growthRate,
      label: formatDisplayName(growthRate)
    }))
  const maxBrowseBst = Math.max(780, ...allBrowsePokemon.map((pokemon) => getPokemonBst(pokemon)))
  const filteredItems = items.filter((item) =>
    normalizedItemSearch.length === 0 ||
    item.name.toLowerCase().includes(normalizedItemSearch) ||
    item.apiName.includes(normalizedItemSearch)
  )
  const getMoveAssignmentRuleText = () =>
    selectedGame === 'all' || selectedGame === 'champions'
      ? 'Move rules combine every tracked game this Pokemon can learn in.'
      : getVersionGroupsForGameKey(selectedGame).length === 0
        ? `${selectedGameDetails?.name || 'This game'} is not on PokéAPI's learnset list yet, so move selection falls back to each Pokemon's most recent supported learnset.`
        : `Moves are filtered by ${selectedGameDetails?.name || 'the selected game'}.`
  const baseFilteredMoves = moves.filter((move) => {
    const matchesSearch =
      normalizedMoveSearch.length === 0 ||
      move.name.toLowerCase().includes(normalizedMoveSearch) ||
      move.apiName.includes(normalizedMoveSearch) ||
      move.type.includes(normalizedMoveSearch) ||
      move.category.toLowerCase().includes(normalizedMoveSearch)
    const matchesType = selectedMoveType === 'all' || move.type === selectedMoveType
    const matchesCategory =
      selectedMoveCategory === 'all' || move.category.toLowerCase() === selectedMoveCategory

    return matchesSearch && matchesType && matchesCategory
  })

  const coverageCountMap = analyzerCoverageSource === 'pokemon-types'
    ? teamTypes.pokemonTypeCoverage
    : teamTypes.moveCoverage
  const coverageTypes = typesList
    .map(type => ({
      type,
      count: coverageCountMap[type] || 0
    }))
    .sort((a, b) => b.count - a.count)

  const weaknessTypes = typesList
    .map(type => ({
      type,
      count: teamTypes.weaknesses[type] || 0
    }))
    .sort((a, b) => b.count - a.count)

  const moveTypeUsageTypes = typesList
    .map((type) => ({
      type,
      count: teamTypes.moveTypeUsage[type] || 0
    }))
    .sort((a, b) => b.count - a.count)

  const getWeaknessBarState = (count) => ({
    primaryFilled: Math.min(count, 6),
    overflowFilled: Math.min(Math.max(count - 6, 0), 6),
    hasOverflow: count > 6
  })

  const getCoverageBarState = (count) => ({
    primaryFilled: Math.min(count, 6),
    overflowFilled: Math.min(Math.max(count - 6, 0), 6),
    hasOverflow: count > 6
  })

  const activeTeam = team.filter(Boolean)
  const assignedTeamMoves = activeTeam.flatMap((pokemon) => getAssignedMovesForPokemon(pokemon))
  const uniqueTeamTypeCount = new Set(activeTeam.flatMap((pokemon) => pokemon?.types || [])).size
  const analyzerUsesPokemonTypes = analyzerCoverageSource === 'pokemon-types'
  const coverageSummarySubject = analyzerUsesPokemonTypes ? 'your team typings' : 'your current moves'
  const coveragePanelTitle = analyzerUsesPokemonTypes ? 'Coverage by Team Typing' : 'Coverage by Assigned Moves'
  const uncoveredCoveragePrefix = analyzerUsesPokemonTypes
    ? 'No super-effective team typing coverage into'
    : 'No super-effective move coverage into'
  const thinCoveragePrefix = analyzerUsesPokemonTypes
    ? 'Only one team member typing covers'
    : 'Only one assigned move covers'
  const coverageSuccessText = analyzerUsesPokemonTypes
    ? 'Current team typings have at least one answer into every matchup type.'
    : 'Current move coverage has at least one answer into every matchup type.'
  const coverageHelperText = analyzerUsesPokemonTypes
    ? 'Coverage counts how many team members can pressure each matchup with their own types.'
    : 'Coverage counts how many assigned moves hit each matchup super effectively.'
  const coveredTypeCount = coverageTypes.filter(({ count }) => count > 0).length
  const sturdyCoverageCount = coverageTypes.filter(({ count }) => count >= 2).length
  const uncoveredTypes = coverageTypes.filter(({ count }) => count === 0).map(({ type }) => type)
  const thinCoverageTypes = coverageTypes.filter(({ count }) => count === 1).map(({ type }) => type)
  const exposedTypeCount = weaknessTypes.filter(({ count }) => count > 0).length
  const stackedWeaknessTypeCount = weaknessTypes.filter(({ count }) => count >= 2).length
  const totalWeaknessLoad = weaknessTypes.reduce((sum, { count }) => sum + count, 0)
  const maxWeaknessStack = weaknessTypes.reduce((maxCount, { count }) => Math.max(maxCount, count), 0)
  const resistantTypeCount = typesList.filter((type) => (teamTypes.resistances[type] || 0) > 0).length
  const immunityTypeCount = typesList.filter((type) => (teamTypes.immunities[type] || 0) > 0).length
  const uniqueMoveTypeCount = moveTypeUsageTypes.filter(({ count }) => count > 0).length
  const uniqueCoverageSourceCount = analyzerUsesPokemonTypes ? uniqueTeamTypeCount : uniqueMoveTypeCount
  const clampTeamRating = (value) => Math.max(0, Math.min(100, Math.round(value)))
  const offenseRating = clampTeamRating(
    (coveredTypeCount / typesList.length) * 60 +
    (sturdyCoverageCount / typesList.length) * 20 +
    (uniqueCoverageSourceCount / typesList.length) * 20
  )
  const weaknessSpreadRatio = totalWeaknessLoad > 0 ? exposedTypeCount / totalWeaknessLoad : 1
  const normalizedWeaknessLoad = activeTeam.length > 0
    ? Math.min(1, totalWeaknessLoad / (activeTeam.length * 2))
    : 1
  const normalizedWeaknessConcentration = totalWeaknessLoad > 0
    ? Math.min(1, maxWeaknessStack / totalWeaknessLoad)
    : 0
  const defenseRating = activeTeam.length === 0
    ? 0
    : clampTeamRating(
        ((1 - normalizedWeaknessLoad) * 45) +
        (weaknessSpreadRatio * 25) +
        ((resistantTypeCount / typesList.length) * 20) +
        ((immunityTypeCount / typesList.length) * 10) -
        (normalizedWeaknessConcentration * 12)
      )
  const teamSummaryRatings = [
    {
      key: 'offense',
      label: 'Offense',
      value: offenseRating,
      copy: `${coveredTypeCount}/18 matchup types covered by ${coverageSummarySubject}`
    },
    {
      key: 'defense',
      label: 'Defense',
      value: defenseRating,
      copy:
        activeTeam.length === 0
          ? 'Add Pokemon to rate your defensive profile'
          : totalWeaknessLoad > 0
            ? `${totalWeaknessLoad} weakness points across ${exposedTypeCount} types, with ${maxWeaknessStack} as the biggest stack`
            : 'No current defensive weak points across the tracked attack types'
    }
  ]
  const teamWarnings = []

  if (activeTeam.length === 0) {
    teamWarnings.push({
      kind: 'text',
      tone: 'warning',
      text: 'Add Pokemon to start building a team summary.'
    })
  } else {
    if (!analyzerUsesPokemonTypes && assignedTeamMoves.length === 0) {
      teamWarnings.push({
        kind: 'text',
        tone: 'warning',
        text: 'No moves are assigned yet, so offensive coverage is currently empty.'
      })
    }

    if (uncoveredTypes.length > 0) {
      teamWarnings.push({
        kind: 'type-list',
        tone: 'warning',
        prefix: uncoveredCoveragePrefix,
        types: uncoveredTypes
      })
    }

    if (thinCoverageTypes.length > 0) {
      teamWarnings.push({
        kind: 'type-list',
        tone: 'warning',
        prefix: thinCoveragePrefix,
        types: thinCoverageTypes
      })
    }
  }

  const orderedGameSections = [
    ...leadingGameSections,
    ...generations.flatMap((gen) => {
    const generationSection = {
      key: `gen-${gen.gen}`,
      label: `Gen ${gen.gen}`,
        games: generationGameDetails[gen.gen].games.map((game) => ({
          ...game,
          key: toGameKey(game.name),
          gen: gen.gen,
          region: GAME_REGION_BY_KEY[toGameKey(game.name)] || gen.name,
          systemClass: gen.gen <= 5 ? 'pixel' : '3d',
          supportsAvailability: true
        }))
    }

    const attachedSpecialSections = specialGameSections
      .filter((section) => section.orderAfterGen === gen.gen)
      .map((section) => ({
        key: `special-${section.label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
        label: section.label,
        games: section.games.map((game) => ({
          ...game,
          key: toGameKey(game.name),
          gen: gen.gen,
          region: GAME_REGION_BY_KEY[toGameKey(game.name)] || game.region || section.label,
          systemClass: '3d'
        }))
      }))

      return [generationSection, ...attachedSpecialSections]
    })
  ]

  const gamesList = orderedGameSections.flatMap((section) => section.games)
  const gameLookupByKey = Object.fromEntries(gamesList.map((game) => [game.key, game]))
  const isSpecificGameSelected = selectedGame !== 'all'
  const selectedGameDetails = gamesList.find((game) => game.key === selectedGame) || null
  const getTrainerDatasetAccentColor = (activeGame, preferredGameKey = null) => {
    if (!activeGame) {
      return null
    }

    if (preferredGameKey && activeGame.gameKeys?.includes(preferredGameKey)) {
      return gameLookupByKey[preferredGameKey]?.color || null
    }

    const fallbackGameKey = activeGame.gameKeys?.[0] || activeGame.key
    return gameLookupByKey[fallbackGameKey]?.color || null
  }
  const renderTrainerDatasetGameName = (activeGame) => {
    if (!activeGame) {
      return null
    }

    const gameKeys = Array.isArray(activeGame.gameKeys) && activeGame.gameKeys.length > 0
      ? activeGame.gameKeys
      : [activeGame.key]
    const nameSegments = String(activeGame.name || '')
      .split('/')
      .map((segment) => segment.trim())
      .filter(Boolean)

    if (nameSegments.length <= 1) {
      const soloGameKey = gameKeys[0] || activeGame.key
      const soloColor = gameLookupByKey[soloGameKey]?.color || 'var(--theme-shell-text)'

      return (
        <span className="feature-select-display-segment" style={{ color: soloColor }}>
          {activeGame.name}
        </span>
      )
    }

    return nameSegments.map((segment, index) => {
      const segmentGameKey = gameKeys[index] || gameKeys[0] || activeGame.key
      const segmentColor = gameLookupByKey[segmentGameKey]?.color || 'var(--theme-shell-text)'

      return (
        <Fragment key={`${activeGame.key}-segment-${segmentGameKey}-${index}`}>
          {index > 0 && <span className="feature-select-display-slash">/</span>}
          <span className="feature-select-display-segment" style={{ color: segmentColor }}>
            {segment}
          </span>
        </Fragment>
      )
    })
  }
  const selectedGameGymLeaderGroupKey = selectedGame !== 'all' ? gymLeaderGameGroupByGameKey[selectedGame] || null : null
  const selectedGameHasGymLeaderData = Boolean(selectedGameGymLeaderGroupKey)
  const activeGymLeaderGame = selectedGameHasGymLeaderData
    ? gymLeaderGameLookup[selectedGameGymLeaderGroupKey]
    : gymLeaderGameLookup[selectedGymLeaderGame] || gymLeaderGames[0] || null
  const displayedGymLeaders = activeGymLeaderGame ? gymLeadersByGame[activeGymLeaderGame.key] || [] : []
  const shouldShowGymLeaderGameSelect = showGymLeaders && (selectedGame === 'all' || !selectedGameHasGymLeaderData)
  const gymLeaderHelperText = (() => {
    if (!activeGymLeaderGame) {
      return 'No gym leader data is loaded yet.'
    }

    const groupedGameNote = activeGymLeaderGame.gameKeys?.length > 1
      ? `${activeGymLeaderGame.name} share one gym dataset here.`
      : `${activeGymLeaderGame.name} has its own gym dataset here.`

    if (selectedGame === 'all') {
      return `Choose a game set from the dropdown to inspect that title's gym order. ${groupedGameNote}`
    }

    if (selectedGameHasGymLeaderData) {
      return `Showing the ${activeGymLeaderGame.name} gym order. ${groupedGameNote}`
    }

    return `${selectedGameDetails?.name || 'This game'} does not have gym data here yet, so the panel is showing ${activeGymLeaderGame.name} instead.`
  })()
  const selectedGameEliteFourGroupKey = selectedGame !== 'all' ? eliteFourGameGroupByGameKey[selectedGame] || null : null
  const selectedGameHasEliteFourData = Boolean(selectedGameEliteFourGroupKey)
  const activeEliteFourGame = selectedGameHasEliteFourData
    ? eliteFourGameLookup[selectedGameEliteFourGroupKey]
    : eliteFourGameLookup[selectedEliteFourGame] || eliteFourGames[0] || null
  const displayedEliteFourEntries = activeEliteFourGame ? eliteFourByGame[activeEliteFourGame.key] || [] : []
  const shouldShowEliteFourGameSelect = showEliteFour && (selectedGame === 'all' || !selectedGameHasEliteFourData)
  const eliteFourHelperText = (() => {
    if (!activeEliteFourGame) {
      return 'No Elite Four data is loaded yet.'
    }

    const groupedGameNote = activeEliteFourGame.gameKeys?.length > 1
      ? `${activeEliteFourGame.name} share one Elite Four dataset here.`
      : `${activeEliteFourGame.name} has its own Elite Four dataset here.`

    if (selectedGame === 'all') {
      return `Choose a game set from the dropdown to inspect that title's Elite Four and Champion roster. ${groupedGameNote}`
    }

    if (selectedGameHasEliteFourData) {
      return `Showing the ${activeEliteFourGame.name} Elite Four and Champion roster. ${groupedGameNote}`
    }

    return `${selectedGameDetails?.name || 'This game'} does not have Elite Four data here yet, so the panel is showing ${activeEliteFourGame.name} instead.`
  })()

  const getTeamMatchupPresetDataset = (presetType) => (
    presetType === 'gym'
      ? {
          games: dropdownGymLeaderGames,
          gameLookup: gymLeaderGameLookup,
          entriesByGame: gymLeadersByGame,
          rankFallback: 'Gym #'
        }
      : {
          games: dropdownEliteFourGames,
          gameLookup: eliteFourGameLookup,
          entriesByGame: eliteFourByGame,
          rankFallback: 'Entry #'
        }
  )

  const buildTeamMatchupTrainerLabel = (entry, presetType, entryIndex) => {
    const rankLabel = entry.rankLabel || (presetType === 'gym' ? `Gym #${entry.number}` : `Entry #${entry.number || entryIndex + 1}`)
    const subtitle = entry.subtitle || entry.gymName || ''
    return subtitle ? `${rankLabel} - ${entry.leader} (${subtitle})` : `${rankLabel} - ${entry.leader}`
  }

  const buildPresetTrainerOptions = (presetType, gameKey) => {
    const dataset = getTeamMatchupPresetDataset(presetType)
    const activeGame = dataset.gameLookup[gameKey] || dataset.games[0] || null
    const entries = activeGame ? dataset.entriesByGame[activeGame.key] || [] : []

    return {
      dataset,
      activeGame,
      options: entries.map((entry, index) => ({
        key: `${presetType}-${activeGame?.key || 'game'}-${entry.number || index + 1}-${entry.leader}-${index}`,
        entry,
        label: buildTeamMatchupTrainerLabel(entry, presetType, index)
      }))
    }
  }

  const playerPresetSelection = buildPresetTrainerOptions(playerPresetType, playerPresetGameKey)
  const enemyPresetSelection = buildPresetTrainerOptions(enemyPresetType, enemyPresetGameKey)
  const activePlayerTrainer =
    playerPresetSelection.options.find((option) => option.key === playerPresetTrainerKey) ||
    playerPresetSelection.options[0] ||
    null
  const activeEnemyTrainer =
    enemyPresetSelection.options.find((option) => option.key === enemyPresetTrainerKey) ||
    enemyPresetSelection.options[0] ||
    null

  const createTeamMatchupMemberFromBuilderPokemon = (pokemon, index) => {
    const displayPokemon = getPokemonDisplayVariant(pokemon, showShinySprites)
    const assignedMoves = getAssignedMovesForPokemon(pokemon)

    return {
      key: `${getPokemonCacheKey(pokemon)}-${index}`,
      name: formatDisplayName(pokemon.name),
      apiName: pokemon.apiName,
      level: TEAM_BUILD_LEVEL,
      image: displayPokemon?.image || pokemon.image || null,
      types: pokemon.types || [],
      moveTypes: [...new Set(assignedMoves.map((move) => move.type).filter(Boolean))],
      moveNames: assignedMoves.map((move) => move.name)
    }
  }

  const createTeamMatchupMemberFromPreset = (member, index) => {
    const knownPokemon =
      browsePokemonByApiName[member.apiName] ||
      allKnownPokemonByApiName?.[member.apiName] ||
      null
    const displayPokemon = knownPokemon ? getPokemonDisplayVariant(knownPokemon, showShinySprites) : null
    const moveTypes = [...new Set(
      (member.moves || [])
        .map((move) => moveLookupByNormalizedName[normalizeDisplayName(move)]?.type || null)
        .filter(Boolean)
    )]

    return {
      key: `${member.apiName || member.name}-${member.level || 0}-${index}`,
      name: member.name,
      apiName: member.apiName,
      level: member.level || null,
      image: displayPokemon?.image || knownPokemon?.image || null,
      types: knownPokemon?.types || [],
      moveTypes,
      moveNames: member.moves || []
    }
  }

  const playerMatchupTeam = playerMatchupSource === 'preset'
    ? (activePlayerTrainer?.entry?.team || []).map(createTeamMatchupMemberFromPreset)
    : activeTeam.map(createTeamMatchupMemberFromBuilderPokemon)
  const enemyMatchupTeam = enemyMatchupSource === 'custom'
    ? customMatchupActiveTeam.map(createTeamMatchupMemberFromBuilderPokemon)
    : enemyMatchupSource === 'builder'
      ? activeTeam.map(createTeamMatchupMemberFromBuilderPokemon)
      : (activeEnemyTrainer?.entry?.team || []).map(createTeamMatchupMemberFromPreset)
  const playerMatchupTeamLabel = playerMatchupSource === 'builder'
    ? 'Current Team Builder'
    : activePlayerTrainer
      ? `${activePlayerTrainer.entry.leader} (${playerPresetSelection.activeGame?.name || 'Preset'})`
      : 'No trainer selected'
  const enemyMatchupTeamLabel = enemyMatchupSource === 'custom'
    ? 'Custom Matchup Team'
    : enemyMatchupSource === 'builder'
      ? 'Current Team Builder'
      : activeEnemyTrainer
        ? `${activeEnemyTrainer.entry.leader} (${enemyPresetSelection.activeGame?.name || 'Preset'})`
        : 'No trainer selected'

  const resolveMatchupAttackTypes = (member, coverageSource) => (
    coverageSource === 'pokemon-types'
      ? (member.types || [])
      : (member.moveTypes || [])
  )

  const evaluateTeamMatchupCell = (attacker, defender, coverageSource) => {
    if (!attacker || !defender || !Array.isArray(defender.types) || defender.types.length === 0) {
      return {
        multiplier: null,
        bestAttackType: null,
        bucket: 'unknown'
      }
    }

    const attackTypes = resolveMatchupAttackTypes(attacker, coverageSource)
    if (!Array.isArray(attackTypes) || attackTypes.length === 0) {
      return {
        multiplier: null,
        bestAttackType: null,
        bucket: 'unknown'
      }
    }

    let bestMultiplier = -1
    let bestAttackType = null

    attackTypes.forEach((attackType) => {
      const multiplier = getCombinedTypeMultiplier(attackType, defender.types)
      if (multiplier > bestMultiplier) {
        bestMultiplier = multiplier
        bestAttackType = attackType
      }
    })

    if (bestMultiplier < 0) {
      return {
        multiplier: null,
        bestAttackType: null,
        bucket: 'unknown'
      }
    }

    if (bestMultiplier === 0) {
      return {
        multiplier: 0,
        bestAttackType,
        bucket: 'immune'
      }
    }

    if (bestMultiplier >= 2) {
      return {
        multiplier: bestMultiplier,
        bestAttackType,
        bucket: 'favorable'
      }
    }

    if (bestMultiplier < 1) {
      return {
        multiplier: bestMultiplier,
        bestAttackType,
        bucket: 'resisted'
      }
    }

    return {
      multiplier: bestMultiplier,
      bestAttackType,
      bucket: 'neutral'
    }
  }

  const buildTeamMatchupMatrix = (attackers, defenders, coverageSource) =>
    attackers.map((attacker) => defenders.map((defender) => evaluateTeamMatchupCell(attacker, defender, coverageSource)))

  const summarizeTeamPressure = (attackers, defenders, matrix) => {
    const emptySummary = {
      favorable: 0,
      neutral: 0,
      resisted: 0,
      immune: 0,
      unknown: 0
    }

    if (!attackers.length || !defenders.length || matrix.length === 0) {
      return emptySummary
    }

    const summary = { ...emptySummary }

    defenders.forEach((_, defenderIndex) => {
      let bestCell = null

      matrix.forEach((row) => {
        const candidate = row[defenderIndex]
        if (!candidate || candidate.multiplier === null) {
          return
        }

        if (!bestCell || candidate.multiplier > bestCell.multiplier) {
          bestCell = candidate
        }
      })

      if (!bestCell) {
        summary.unknown += 1
        return
      }

      summary[bestCell.bucket] += 1
    })

    return summary
  }

  const formatMatchupMultiplier = (multiplier) => {
    if (typeof multiplier !== 'number') {
      return '--'
    }

    if (Number.isInteger(multiplier)) {
      return `${multiplier}x`
    }

    return `${multiplier.toFixed(2).replace(/\.00$/, '').replace(/0$/, '')}x`
  }

  const teamMatchupForwardMatrix = buildTeamMatchupMatrix(
    playerMatchupTeam,
    enemyMatchupTeam,
    teamMatchupCoverageSource
  )
  const teamMatchupReverseMatrix = buildTeamMatchupMatrix(
    enemyMatchupTeam,
    playerMatchupTeam,
    teamMatchupCoverageSource
  )
  const teamMatchupForwardSummary = summarizeTeamPressure(playerMatchupTeam, enemyMatchupTeam, teamMatchupForwardMatrix)
  const teamMatchupReverseSummary = summarizeTeamPressure(enemyMatchupTeam, playerMatchupTeam, teamMatchupReverseMatrix)
  const teamMatchupNeedsPlayerTrainer = playerMatchupSource === 'preset' && !activePlayerTrainer
  const teamMatchupNeedsEnemyTrainer = enemyMatchupSource === 'preset' && !activeEnemyTrainer
  const teamMatchupNeedsCustomTeam = enemyMatchupSource === 'custom' && customMatchupActiveTeam.length === 0
  const teamMatchupCanRender =
    playerMatchupTeam.length > 0 &&
    enemyMatchupTeam.length > 0 &&
    !teamMatchupNeedsPlayerTrainer &&
    !teamMatchupNeedsEnemyTrainer &&
    !teamMatchupNeedsCustomTeam
  const teamMatchupCoverageHelperText = teamMatchupCoverageSource === 'pokemon-types'
    ? 'Matchups are scored using each Pokemon\'s own typing as the attacking profile.'
    : 'Matchups are scored using assigned moves for builder/custom teams and listed moves for preset teams.'

  const renderCustomMatchupTeamBuilder = () => (
    <div className="team-matchup-custom-panel">
      <div className="team-matchup-custom-toolbar">
        <div className="team-matchup-custom-count">
          {customMatchupTeamCount}/{TEAM_SLOT_COUNT} Pokemon
        </div>
        <div className="team-matchup-custom-actions">
          <button
            type="button"
            className="team-matchup-custom-button"
            onClick={() => {
              const nextSlot = customMatchupTeam.findIndex((slot) => slot === null)
              setCustomMatchupTargetSlot(nextSlot === -1 ? 0 : nextSlot)
              setEnemyMatchupSource('custom')
            }}
          >
            {customMatchupTargetSlot === null ? 'Pick Slot' : `Slot ${customMatchupTargetSlot + 1} Ready`}
          </button>
          <button
            type="button"
            className="team-matchup-custom-button"
            onClick={clearCustomMatchupTeam}
            disabled={customMatchupTeamCount === 0}
          >
            Clear
          </button>
        </div>
      </div>

      <div className="team-matchup-custom-helper">
        {customMatchupTargetSlot !== null
          ? `Click a Pokemon in the browser to place it in custom slot ${customMatchupTargetSlot + 1}.`
          : 'Pick a custom slot, then click Pokemon in the browser. Use Move Database cards to fill move slots.'}
      </div>

      <div className="team-matchup-custom-slots">
        {customMatchupTeam.map((pokemon, index) => {
          const displayPokemon = pokemon ? getPokemonDisplayVariant(pokemon, showShinySprites) : null
          const slotMoves = normalizeAssignedMoves(pokemon?.moves)

          return (
            <div
              key={`custom-matchup-slot-${index}`}
              className={`team-matchup-custom-slot ${pokemon ? 'filled' : ''} ${customMatchupTargetSlot === index ? 'target' : ''} ${moveTargetSelection && pokemon ? 'move-target' : ''}`}
              role="button"
              tabIndex={0}
              onClick={() => handleCustomMatchupSlotClick(pokemon, index)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  handleCustomMatchupSlotClick(pokemon, index)
                }
              }}
              onMouseEnter={(event) => pokemon && handlePokemonHoverStart(pokemon, event)}
              onMouseLeave={handlePokemonHoverEnd}
            >
              {pokemon ? (
                <>
                  <button
                    type="button"
                    className="team-matchup-custom-remove"
                    onClick={(event) => {
                      event.stopPropagation()
                      removeCustomMatchupPokemon(index)
                    }}
                    title={`Remove ${formatDisplayName(pokemon.name)} from the custom matchup team.`}
                  >
                    x
                  </button>
                  {renderPokemonSprite(displayPokemon || pokemon, {
                    baseClassName: 'team-matchup-custom-image',
                    stackClassName: 'team-matchup-custom-image-stack',
                    animateOnHover: isPokemonCurrentlyHovered(pokemon),
                    alt: pokemon.name
                  })}
                  <div className="team-matchup-custom-name">{formatDisplayName(pokemon.name)}</div>
                  <div className="team-matchup-custom-types">
                    {(pokemon.types || []).map((type) => (
                      <span key={`custom-${index}-${type}`} className={`type-badge team-matchup-custom-type type-${type}`}>
                        {formatDisplayName(type)}
                      </span>
                    ))}
                  </div>
                  <div className="team-matchup-custom-moves">
                    {slotMoves.map((move, moveIndex) => (
                      <button
                        key={`custom-${pokemon.apiName}-move-${moveIndex}`}
                        type="button"
                        className={`team-matchup-custom-move ${move ? 'filled' : 'empty'}`}
                        onClick={(event) => handleCustomMatchupMoveSlotClick(event, index, moveIndex)}
                        title={
                          moveTargetSelection
                            ? `Assign ${moveTargetSelection.name} to custom move slot ${moveIndex + 1}`
                            : move
                              ? `Remove ${move.name}`
                              : `Custom Move Slot ${moveIndex + 1}`
                        }
                      >
                        <span className={move ? `move-type-text move-type-text-${move.type}` : ''}>
                          {move?.name || 'Move'}
                        </span>
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <div className="team-matchup-custom-empty">
                  <span>Slot {index + 1}</span>
                  <span>Pick Pokemon</span>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )

  const selectedGameRule = selectedGameDetails ? gameAvailabilityRules[selectedGameDetails.key] || {} : null
  const selectedGameDlcConfig = selectedGameDetails ? gameDlcSectionConfigs[selectedGameDetails.key] || null : null
  const chartMoveRuleGameKey = selectedGame === 'champions' ? 'all' : selectedGame
  const chartMoveRuleGameDetails = chartMoveRuleGameKey === 'all'
    ? null
    : gamesList.find((game) => game.key === chartMoveRuleGameKey) || null
  const isPokemonAvailableInGame = (pokemon, gameDetails, ruleOverride = null) => {
    if (!pokemon || !gameDetails || gameDetails.key === 'all') {
      return true
    }

    if (gameDetails.key === 'champions') {
      return isPokemonInChampionsRoster(pokemon)
    }

    if (gameDetails.key === 'legends-z-a') {
      if (isMegaPokemon(pokemon)) {
        return legendsZaMegaPokemonNames.has(pokemon.apiName)
      }

      if (isRegionalVariantPokemon(pokemon)) {
        return legendsZaRegionalVariantNames.has(pokemon.apiName)
      }

      return legendsZaBaseDexes.has(pokemon.speciesId || pokemon.id)
    }

    if (gameDetails.supportsAvailability === false) {
      return false
    }

    const availabilityCode = bulbapediaAvailability[pokemon.id]?.codes?.[gameDetails.key]
    const isIncludedByAvailability = isAvailabilityCodeIncluded(availabilityCode)
    const rule = ruleOverride || gameAvailabilityRules[gameDetails.key] || {}
    const isIncludedByRule = (rule.includePokemon || []).some((entry) => entry.pokemonName === pokemon.apiName)

    return isIncludedByAvailability || isIncludedByRule
  }
  const moveDatabaseFilteredMoves = baseFilteredMoves
  const displayedMoves = (() => {
    if (selectedMoveSort === 'alpha-asc') {
      return moveDatabaseFilteredMoves
    }

    if (selectedMoveSort === 'alpha-desc') {
      return [...moveDatabaseFilteredMoves].sort((a, b) => b.name.localeCompare(a.name))
    }

    const getMovePowerValue = (move) => {
      const parsedPower = Number(move.power)
      return Number.isFinite(parsedPower) ? parsedPower : 0
    }

    return [...moveDatabaseFilteredMoves]
      .sort((a, b) => {
        const direction = selectedMoveSort === 'power-desc' ? -1 : 1
        const powerDifference = (getMovePowerValue(a) - getMovePowerValue(b)) * direction

        if (powerDifference !== 0) {
          return powerDifference
        }

        return a.name.localeCompare(b.name)
      })
  })()
  const moveDatabaseEmptyStateText = 'No moves match that search.'
  const moveDatabaseCountLabel = movesLoading
    ? 'Loading moves...'
    : `${displayedMoves.length} moves`
  const teamTypeSet = new Set(activeTeam.flatMap((pokemon) => pokemon?.types || []))
  const teamWeaknessFilterTypes = weaknessTypes.filter(({ count }) => count > 0).map(({ type }) => type)
  const applyBrowseFilters = (pokemonList = []) =>
    pokemonList.filter((pokemon) => {
      if (selectedBrowseType !== 'all' && !pokemon.types.includes(selectedBrowseType)) {
        return false
      }

      if (getPokemonBst(pokemon) < browseBstMinimum) {
        return false
      }

      if (selectedBrowseEggGroup !== 'all' && !(pokemon.eggGroupKeys || []).includes(selectedBrowseEggGroup)) {
        return false
      }

      if (selectedBrowseGrowthRate !== 'all' && pokemon.growthRateKey !== selectedBrowseGrowthRate) {
        return false
      }

      if (hideTeamMembers && isPokemonAlreadyOnTeam(pokemon)) {
        return false
      }

      if (
        onlyCurrentGameLegal &&
        selectedGame !== 'all' &&
        selectedGameDetails &&
        !isPokemonAvailableInGame(pokemon, selectedGameDetails, selectedGameRule)
      ) {
        return false
      }

      if (
        onlyPatchTeamWeaknesses &&
        teamWeaknessFilterTypes.length > 0 &&
        !teamWeaknessFilterTypes.some((type) => pokemonResistsType(pokemon, type))
      ) {
        return false
      }

      if (
        onlyAddNewTeamTypes &&
        teamTypeSet.size > 0 &&
        !pokemon.types.some((type) => !teamTypeSet.has(type))
      ) {
        return false
      }

      return true
    })
  const resetBrowseFilters = () => {
    setSelectedBrowseType('all')
    setBrowseBstMinimum(0)
    setSelectedBrowseEggGroup('all')
    setSelectedBrowseGrowthRate('all')
    setHideTeamMembers(false)
    setOnlyPatchTeamWeaknesses(false)
    setOnlyAddNewTeamTypes(false)
    setOnlyCurrentGameLegal(false)
  }

  const visibleBrowseSections = browseSections.filter((section) => {
    if (sortByGeneration && selectedGeneration !== 'all') {
      return String(section.gen) === selectedGeneration
    }

    return true
  })

  const getAvailablePokemonForGeneration = (gen) => {
    const generationPokemon = (pokemonByGen[gen.gen]?.pokemon || []).filter(shouldIncludeBrowsePokemon)

    if (!isSpecificGameSelected || !selectedGameDetails) {
      return generationPokemon
    }

    return generationPokemon.filter((pokemon) => isPokemonAvailableInGame(pokemon, selectedGameDetails, selectedGameRule))
  }

  const getAvailablePokemonForBrowseSection = (section) => {
    const pokemon = getAvailablePokemonForGeneration({ gen: section.sourceGen })

    if (section.key === 'galar') {
      return pokemon.filter((entry) => !hisuiSpecialPokemonNames.has(entry.apiName))
    }

    if (section.key === 'hisui') {
      return pokemon.filter((entry) => hisuiSpecialPokemonNames.has(entry.apiName))
    }

    return pokemon
  }

  const getPokemonDlcSection = (pokemon, gameKey) => {
    const dlcSections = gameDlcSectionConfigs[gameKey]

    if (!dlcSections) {
      return null
    }

    const availabilityCode = bulbapediaAvailability[pokemon.id]?.codes?.[gameKey]

    if (!isDlcOnlyAvailabilityCode(availabilityCode, gameKey)) {
      return null
    }

    return dlcSections.find((section) => section.dexes.has(pokemon.id)) || null
  }

  const getGenerationPokemonSections = (section) => {
    const pokemon = applyBrowseFilters(getAvailablePokemonForBrowseSection(section))

    if (isSpecificGameSelected && selectedGameDetails && selectedGameDlcConfig) {
      const basePokemon = pokemon.filter((entry) => !getPokemonDlcSection(entry, selectedGameDetails.key))

      return basePokemon.length > 0 ? [{ key: `${section.key}-main`, title: null, pokemon: basePokemon }] : []
    }

    const dlcSections = generationDlcSections[section.gen]

    if (!dlcSections) {
      return [{ key: `${section.key}-main`, title: null, pokemon }]
    }

    const allDlcDexes = new Set(dlcSections.flatMap((section) => [...section.dexes]))
    const basePokemon = pokemon.filter((entry) => !allDlcDexes.has(entry.id))
    const sections = []

    if (basePokemon.length > 0) {
      sections.push({ key: `${section.key}-main`, title: null, pokemon: basePokemon })
    }

    dlcSections.forEach((section) => {
      const sectionPokemon = pokemon.filter((entry) => section.dexes.has(entry.id))

      if (sectionPokemon.length > 0) {
        sections.push({
          key: `${section.key}-${section.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
          title: section.title,
          pokemon: sectionPokemon
        })
      }
    })

    return sections.filter((entry) => entry.pokemon.length > 0)
  }

  const gameDlcSections = isSpecificGameSelected && selectedGameDetails && selectedGameDlcConfig
    ? selectedGameDlcConfig
        .map((section) => ({
          ...section,
          generations: generations
            .map((gen) => ({
              ...gen,
              pokemon: applyBrowseFilters(
                getAvailablePokemonForGeneration(gen).filter(
                  (entry) => getPokemonDlcSection(entry, selectedGameDetails.key)?.key === section.key
                )
              )
            }))
            .filter((entry) => entry.pokemon.length > 0)
        }))
        .filter((section) => section.generations.length > 0)
    : []
  const visibleGenerationBrowseSections = visibleBrowseSections
    .map((section) => ({
      ...section,
      generationSections: pokemonByGen[section.sourceGen] ? getGenerationPokemonSections(section) : []
    }))
    .filter((section) => section.generationSections.length > 0 || alwaysVisibleBrowseSectionKeys.has(section.key))
  const championsBrowsePokemon = applyBrowseFilters(allBrowsePokemon.filter(isPokemonInChampionsRoster))
    .sort((a, b) => {
      const orderDifference = getChampionsPokemonOrderIndex(a) - getChampionsPokemonOrderIndex(b)

      if (orderDifference !== 0) {
        return orderDifference
      }

      const speciesDifference = (a.speciesId || a.id) - (b.speciesId || b.id)
      if (speciesDifference !== 0) {
        return speciesDifference
      }

      return a.name.localeCompare(b.name)
    })
  const missingTeamPokemonTypes = typesList.filter((type) => !teamTypeSet.has(type))
  const suggestionCandidatePool = activeTeam.length === 0
    ? []
    : allBrowsePokemon.filter((pokemon) => {
        if (!pokemon || isPokemonAlreadyOnTeam(pokemon) || isMegaPokemon(pokemon)) {
          return false
        }

        if (pokemon.isLegendary || pokemon.isMythical) {
          return false
        }

        if (selectedGame === 'champions') {
          return isPokemonInChampionsRoster(pokemon)
        }

        if (isSpecificGameSelected && selectedGameDetails) {
          return isPokemonAvailableInGame(pokemon, selectedGameDetails, selectedGameRule)
        }

        return true
      })
  const scoredSuggestedAdditions = suggestionCandidatePool
    .map((pokemon) => {
      const addedTypes = (pokemon.types || []).filter((type) => !teamTypeSet.has(type))
      const offensiveCoverageTypes = teamWeaknessFilterTypes.filter((targetType) =>
        (pokemon.types || []).some((type) => typeEffectiveness[type]?.strong?.includes(targetType))
      )
      const defensivePatchTypes = teamWeaknessFilterTypes.filter((targetType) =>
        getPokemonWeaknessMultiplier(pokemon, targetType) < 1
      )
      const immunityPatchTypes = teamWeaknessFilterTypes.filter((targetType) =>
        getPokemonWeaknessMultiplier(pokemon, targetType) === 0
      )
      const bst = getPokemonBst(pokemon)
      const score =
        bst +
        (addedTypes.length * 150) +
        (offensiveCoverageTypes.length * 90) +
        (defensivePatchTypes.length * 45) +
        (immunityPatchTypes.length * 20)

      return {
        pokemon,
        bst,
        score,
        addedTypes,
        offensiveCoverageTypes,
        defensivePatchTypes,
        immunityPatchTypes
      }
    })
    .filter((entry) =>
      entry.addedTypes.length > 0 ||
      entry.offensiveCoverageTypes.length > 0 ||
      entry.defensivePatchTypes.length > 0
    )
    .sort((a, b) =>
      b.score - a.score ||
      b.bst - a.bst ||
      b.addedTypes.length - a.addedTypes.length ||
      a.pokemon.name.localeCompare(b.pokemon.name)
    )
  const highBstSuggestedAdditions = scoredSuggestedAdditions.filter((entry) => entry.bst >= 500)
  const mediumBstSuggestedAdditions = scoredSuggestedAdditions.filter((entry) => entry.bst >= 470)
  const suggestedAdditions =
    (highBstSuggestedAdditions.length >= 6 ? highBstSuggestedAdditions
      : mediumBstSuggestedAdditions.length >= 6 ? mediumBstSuggestedAdditions
      : scoredSuggestedAdditions)
      .slice(0, 6)
  const browseVisiblePokemonCount =
    selectedGame === 'champions'
      ? championsBrowsePokemon.length
      : visibleGenerationBrowseSections.reduce(
      (sum, section) => sum + section.generationSections.reduce((sectionSum, entry) => sectionSum + entry.pokemon.length, 0),
      0
    ) +
    gameDlcSections.reduce(
      (sum, section) => sum + section.generations.reduce((generationSum, gen) => generationSum + gen.pokemon.length, 0),
      0
    )
  const activeBrowseFilterChips = [
    selectedBrowseType !== 'all' ? `Type: ${formatDisplayName(selectedBrowseType)}` : null,
    browseBstMinimum > 0 ? `BST ${browseBstMinimum}+` : null,
    selectedBrowseEggGroup !== 'all' ? `Egg Group: ${formatDisplayName(selectedBrowseEggGroup)}` : null,
    selectedBrowseGrowthRate !== 'all' ? `Growth: ${formatDisplayName(selectedBrowseGrowthRate)}` : null,
    hideTeamMembers ? 'Hide Team Members' : null,
    onlyCurrentGameLegal && isSpecificGameSelected && selectedGameDetails ? `Legal in ${selectedGameDetails.name}` : null,
    onlyPatchTeamWeaknesses && teamWeaknessFilterTypes.length > 0
      ? `Patches ${teamWeaknessFilterTypes.length === 1 ? formatDisplayName(teamWeaknessFilterTypes[0]) : 'Team Weaknesses'}`
      : null,
    onlyAddNewTeamTypes && teamTypeSet.size > 0 ? 'Adds New Team Type' : null
  ].filter(Boolean)

  const getPokemonTrackedGames = (pokemon) =>
    gamesList
      .filter((game) => {
        if (game.key === 'champions') {
          return isPokemonInChampionsRoster(pokemon)
        }

        if (game.key === 'legends-z-a') {
          if (isMegaPokemon(pokemon)) {
            return legendsZaMegaPokemonNames.has(pokemon.apiName)
          }

          if (isRegionalVariantPokemon(pokemon)) {
            return legendsZaRegionalVariantNames.has(pokemon.apiName)
          }

          return legendsZaBaseDexes.has(pokemon.speciesId || pokemon.id)
        }

        if (game.supportsAvailability === false) {
          return false
        }

        const availabilityCode = bulbapediaAvailability[pokemon.id]?.codes?.[game.key]
        const isIncludedByAvailability = isAvailabilityCodeIncluded(availabilityCode)
        const isIncludedByRule = (gameAvailabilityRules[game.key]?.includePokemon || [])
          .some((entry) => entry.pokemonName === pokemon.apiName)

        return isIncludedByAvailability || isIncludedByRule
      })
      .map((game) => ({
        ...game,
        dlcSection: getPokemonDlcSection(pokemon, game.key)?.title || null
      }))

  const getVersionGroupsForGameKey = (gameKey) => gameVersionGroupMap[gameKey] || []

  const getLatestSupportedLearnsetGame = (pokemon, learnsetDetails) => {
    const versionGroups = Array.isArray(learnsetDetails?.versionGroups) ? learnsetDetails.versionGroups : []

    if (versionGroups.length === 0) {
      return null
    }

    const knownVersionGroups = new Set(versionGroups)
    const trackedSupportedGames = getPokemonTrackedGames(pokemon).filter((game) =>
      getVersionGroupsForGameKey(game.key).some((versionGroup) => knownVersionGroups.has(versionGroup))
    )

    if (trackedSupportedGames.length > 0) {
      return trackedSupportedGames[trackedSupportedGames.length - 1]
    }

    return [...gamesList]
      .reverse()
      .find((game) => getVersionGroupsForGameKey(game.key).some((versionGroup) => knownVersionGroups.has(versionGroup))) || null
  }

  function resolvePokemonLearnsetSelection(
    pokemon,
    learnsetDetails,
    mode = 'assignment',
    gameKey = selectedGame,
    gameDetailsOverride = null
  ) {
    const knownVersionGroupList = Array.isArray(learnsetDetails?.versionGroups) ? learnsetDetails.versionGroups : []

    if (!pokemon || !learnsetDetails) {
      return {
        versionGroups: [],
        basisLabel: 'Unknown',
        assignmentLabel: 'the current rules',
        helperText: 'Loading move learnset data...',
        fallbackUsed: false,
        combinedGames: false
      }
    }

    const knownVersionGroups = new Set(knownVersionGroupList)

    if (gameKey === 'all') {
      if (mode === 'assignment') {
        return {
          versionGroups: [...knownVersionGroups].sort(
            (a, b) => (versionGroupSortIndex[a] ?? -1) - (versionGroupSortIndex[b] ?? -1)
          ),
          basisLabel: 'All Games',
          assignmentLabel: 'All Games combined',
          helperText: 'All Games is selected, so move selection combines every tracked learnset this Pokemon has.',
          fallbackUsed: false,
          combinedGames: true
        }
      }

      const mostRecentGame = getLatestSupportedLearnsetGame(pokemon, learnsetDetails)
      if (mostRecentGame) {
        const versionGroups = getVersionGroupsForGameKey(mostRecentGame.key).filter((versionGroup) =>
          knownVersionGroups.has(versionGroup)
        )

        return {
          versionGroups,
          basisLabel: mostRecentGame.name,
          assignmentLabel: mostRecentGame.name,
          helperText: `All Games is selected, so this card uses the most recent available level-up learnset: ${mostRecentGame.name}.`,
          fallbackUsed: false,
          combinedGames: true
        }
      }

      return {
        versionGroups: [],
        basisLabel: 'All Games',
        assignmentLabel: 'All Games combined',
        helperText: 'No supported level-up learnset data is available for this Pokemon.',
        fallbackUsed: false,
        combinedGames: true
      }
    }

    const requestedGame = gameDetailsOverride || gamesList.find((game) => game.key === gameKey) || null
    const requestedVersionGroups = getVersionGroupsForGameKey(gameKey)
    const availableRequestedGroups = requestedVersionGroups.filter((versionGroup) => knownVersionGroups.has(versionGroup))

    if (availableRequestedGroups.length > 0) {
      return {
        versionGroups: availableRequestedGroups,
        basisLabel: requestedGame?.name || 'Current Game',
        assignmentLabel: requestedGame?.name || 'the current game',
        helperText: `Based on ${requestedGame?.name || 'the current game'}.`,
        fallbackUsed: false,
        combinedGames: false
      }
    }

    if (requestedGame) {
      let isTrackedInRequestedGame = true

      try {
        isTrackedInRequestedGame = getPokemonTrackedGames(pokemon).some((game) => game.key === requestedGame.key)
      } catch (error) {
        console.error(`Error checking tracked games for ${pokemon.name}:`, error)
      }

      if (!isTrackedInRequestedGame) {
        return {
          versionGroups: [],
          basisLabel: requestedGame.name,
          assignmentLabel: requestedGame.name,
          helperText: `${pokemon.name} is not tracked in ${requestedGame.name}.`,
          fallbackUsed: false,
          combinedGames: false
        }
      }
    }

    const fallbackGame = getLatestSupportedLearnsetGame(pokemon, learnsetDetails)
    if (fallbackGame) {
      const fallbackVersionGroups = getVersionGroupsForGameKey(fallbackGame.key).filter((versionGroup) =>
        knownVersionGroups.has(versionGroup)
      )

      return {
        versionGroups: fallbackVersionGroups,
        basisLabel: fallbackGame.name,
        assignmentLabel: fallbackGame.name,
        helperText:
          requestedVersionGroups.length === 0
            ? `${requestedGame?.name || 'This game'} is not on PokéAPI's learnset list yet, so this uses ${fallbackGame.name}.`
            : `No direct learnset data was found for ${requestedGame?.name || 'this game'}, so this uses ${fallbackGame.name}.`
      }
    }

    return {
      versionGroups: [],
      basisLabel: requestedGame?.name || 'Current Game',
      assignmentLabel: requestedGame?.name || 'the current rules',
      helperText: `No learnset data is available for ${requestedGame?.name || 'the current rules'}.`
    }
  }

  function getAssignableMoveDetails(pokemon, learnsetDetails, gameKey = selectedGame, gameDetailsOverride = null) {
    const resolution = resolvePokemonLearnsetSelection(
      pokemon,
      learnsetDetails,
      'assignment',
      gameKey,
      gameDetailsOverride
    )
    const moveMap = new Map()
    const learnsetEntries = Array.isArray(learnsetDetails?.entries) ? learnsetDetails.entries : []

    if (!learnsetDetails || learnsetEntries.length === 0 || resolution.versionGroups.length === 0) {
      return {
        resolution,
        moveMap,
        moves: []
      }
    }

    const allowedVersionGroups = new Set(resolution.versionGroups)

    learnsetEntries.forEach((entry) => {
      if (!allowedVersionGroups.has(entry.versionGroup)) {
        return
      }

      const existingEntry = moveMap.get(entry.apiName)
      const nextVersionScore = versionGroupSortIndex[entry.versionGroup] ?? -1
      const existingVersionScore = existingEntry ? versionGroupSortIndex[existingEntry.versionGroup] ?? -1 : -1

      if (
        !existingEntry ||
        nextVersionScore > existingVersionScore ||
        (nextVersionScore === existingVersionScore && entry.name.localeCompare(existingEntry.name) < 0)
      ) {
        moveMap.set(entry.apiName, entry)
      }
    })

    return {
      resolution,
      moveMap,
      moves: [...moveMap.values()].sort((a, b) => a.name.localeCompare(b.name))
    }
  }

  function getLearnableMoveApiNameSet(pokemon, learnsetDetails, gameKey = selectedGame, gameDetailsOverride = null) {
    const { resolution, moveMap, moves } = getAssignableMoveDetails(
      pokemon,
      learnsetDetails,
      gameKey,
      gameDetailsOverride
    )

    return {
      resolution,
      moveMap,
      moves,
      moveApiNames: new Set(moveMap.keys())
    }
  }

  function getLevelUpLearnsetForPokemon(pokemon, learnsetDetails, gameKey = selectedGame, gameDetailsOverride = null) {
    const resolution = resolvePokemonLearnsetSelection(
      pokemon,
      learnsetDetails,
      'display',
      gameKey,
      gameDetailsOverride
    )
    const learnsetMap = new Map()
    const learnsetEntries = Array.isArray(learnsetDetails?.entries) ? learnsetDetails.entries : []

    if (!learnsetDetails || learnsetEntries.length === 0 || resolution.versionGroups.length === 0) {
      return {
        resolution,
        moves: []
      }
    }

    const allowedVersionGroups = new Set(resolution.versionGroups)

    learnsetEntries.forEach((entry) => {
      if (entry.method !== 'level-up' || !allowedVersionGroups.has(entry.versionGroup)) {
        return
      }

      const existingEntry = learnsetMap.get(entry.apiName)

      if (
        !existingEntry ||
        entry.level < existingEntry.level ||
        (entry.level === existingEntry.level && entry.name.localeCompare(existingEntry.name) < 0)
      ) {
        learnsetMap.set(entry.apiName, entry)
      }
    })

    return {
      resolution,
      moves: [...learnsetMap.values()].sort((a, b) => a.level - b.level || a.name.localeCompare(b.name))
    }
  }

  const getMoveTargetHighlightClass = (pokemon) => {
    if (!moveTargetSelection || !pokemon) {
      return ''
    }

    const learnsetDetails = pokemonInfoCache[getPokemonCacheKey(pokemon)]?.learnsetDetails

    if (!learnsetDetails) {
      return 'move-target'
    }

    const { resolution, moveApiNames } = getLearnableMoveApiNameSet(
      pokemon,
      learnsetDetails,
      chartMoveRuleGameKey,
      chartMoveRuleGameDetails
    )

    if (!resolution || resolution.versionGroups.length === 0) {
      return 'move-target-illegal'
    }

    return moveApiNames.has(moveTargetSelection.apiName) ? 'move-target-legal' : 'move-target-illegal'
  }

  const getPokemonHighlightClass = (pokemon) => {
    if (!isPokemonHighlighted(pokemon)) {
      return ''
    }

    if (hoveredAnalyzer?.kind === 'weakness') {
      return getPokemonWeaknessMultiplier(pokemon, hoveredAnalyzer.type) >= 4
        ? 'highlighted-weakness-severe'
        : 'highlighted-weakness'
    }

    return 'highlighted-coverage'
  }

  const togglePokemonSelection = (pokemon) => {
    if (itemTargetSelection) {
      return
    }

    if (comparisonTargetSlot !== null) {
      assignPokemonToComparisonSlot(comparisonTargetSlot, pokemon)
      return
    }

    if (showComparison && customMatchupTargetSlot !== null) {
      assignPokemonToCustomMatchupSlot(customMatchupTargetSlot, pokemon)
      return
    }

    if (isInTeam(pokemon.id)) {
      removePokemonById(pokemon.id)
      return
    }

    addToTeam(pokemon)
  }

  const isPokemonHighlighted = (pokemon) => {
    if (!hoveredAnalyzer) {
      return false
    }

    if (hoveredAnalyzer.kind === 'coverage') {
      return pokemonProvidesCoverage(pokemon, hoveredAnalyzer.type)
    }

    return pokemonIsWeakToType(pokemon, hoveredAnalyzer.type)
  }

  const cancelHoverCardClose = () => {
    if (hoverCardCloseTimeoutRef.current) {
      clearTimeout(hoverCardCloseTimeoutRef.current)
      hoverCardCloseTimeoutRef.current = null
    }
  }

  const scheduleHoverCardClose = () => {
    cancelHoverCardClose()
    hoverCardCloseTimeoutRef.current = setTimeout(() => {
      setHoveredPokemonCard(null)
      setHoveredItemCard(null)
      setHoveredMoveCard(null)
      setHoveredAbility(null)
    }, 120)
  }

  const handlePokemonHoverStart = (pokemon, event) => {
    cancelHoverCardClose()
    const rect = event.currentTarget.getBoundingClientRect()
    setHoveredItemCard(null)
    setHoveredMoveCard(null)
    setHoveredPokemonCard({
      pokemon,
      rect: {
        top: rect.top,
        left: rect.left,
        right: rect.right,
        bottom: rect.bottom
      }
    })
  }

  const handlePokemonHoverEnd = () => {
    scheduleHoverCardClose()
  }

  const handleItemHoverStart = (item, event) => {
    cancelHoverCardClose()
    const rect = event.currentTarget.getBoundingClientRect()
    setHoveredPokemonCard(null)
    setHoveredMoveCard(null)
    setHoveredItemCard({
      item,
      rect: {
        top: rect.top,
        left: rect.left,
        right: rect.right,
        bottom: rect.bottom
      }
    })
  }

  const handleItemHoverEnd = () => {
    scheduleHoverCardClose()
  }

  const handleMoveHoverStart = (move, event) => {
    cancelHoverCardClose()
    const rect = event.currentTarget.getBoundingClientRect()
    setHoveredPokemonCard(null)
    setHoveredItemCard(null)
    setHoveredMoveCard({
      move,
      rect: {
        top: rect.top,
        left: rect.left,
        right: rect.right,
        bottom: rect.bottom
      }
    })
  }

  const handleMoveHoverEnd = () => {
    scheduleHoverCardClose()
  }

  const hoverCardStyle = activeHoverCard
    ? {
        top: `${Math.max(
          16,
          Math.min(activeHoverCard.rect.top, window.innerHeight - hoverCardSize.height - 16)
        )}px`,
        left: `${Math.max(
          16,
          Math.min(
            activeHoverCard.rect.right + 8 + hoverCardSize.width <= window.innerWidth - 16
              ? activeHoverCard.rect.right + 8
              : activeHoverCard.rect.left - hoverCardSize.width - 8,
            window.innerWidth - hoverCardSize.width - 16
          )
        )}px`
      }
    : {}

  const hoverStats = getPokemonStatRows(hoveredPokemonCard?.pokemon)
  const hoverBst = getPokemonBst(hoveredPokemonCard?.pokemon)
  const hoveredMove = hoveredMoveCard?.move || null
  const hoveredPokemonNameKey = hoveredPokemonCard?.pokemon
    ? normalizeDisplayName(hoveredPokemonCard.pokemon.name)
    : ''
  const hoverGames = hoveredPokemonCard?.pokemon
    ? getPokemonTrackedGames(hoveredPokemonCard.pokemon)
    : []
  const hoveredPokemonBuildSummary = hoveredPokemonCard?.pokemon ? getPokemonBuildSummary(hoveredPokemonCard.pokemon) : null
  const hoveredPokemonBuildAbility = hoveredPokemonCard?.pokemon ? getSelectedAbilityForPokemon(hoveredPokemonCard.pokemon) : null
  const isPokemonCurrentlyHovered = (pokemon) =>
    Boolean(
      pokemon &&
      hoveredPokemonCard?.pokemon &&
      getPokemonCacheKey(pokemon) === getPokemonCacheKey(hoveredPokemonCard.pokemon)
    )

  const renderPokemonProfileSummary = (profileDetails, options = {}) => {
    const { includeEggGroups = true } = options

    return (
    <div className="pokemon-hover-section">
      <div className="pokemon-hover-section-title">Breeding & Growth</div>
      {profileDetails ? (
        <div className="pokemon-profile-grid">
          <div className="pokemon-profile-card">
            <div className="pokemon-profile-label">Catch Rate</div>
            <div className="pokemon-profile-value">{profileDetails.catchRate}</div>
          </div>
          <div className="pokemon-profile-card">
            <div className="pokemon-profile-label">Growth Rate</div>
            <div className="pokemon-profile-value">{profileDetails.growthRate}</div>
          </div>
          {includeEggGroups && (
            <div className="pokemon-profile-card pokemon-profile-card-wide">
              <div className="pokemon-profile-label">Egg Groups</div>
              <div className="pokemon-profile-chip-list">
                {(profileDetails.eggGroups.length > 0 ? profileDetails.eggGroups : ['Unknown']).map((group) => (
                  <span key={group} className="pokemon-profile-chip">
                    {group}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="pokemon-hover-loading">Loading species details...</div>
      )}
    </div>
  )
  }

  const renderPokemonEncounterSummary = (profileDetails) => {
    const encounterGames = Array.isArray(profileDetails?.encounters) ? profileDetails.encounters : []

    if (!profileDetails) {
      return (
        <div className="pokemon-hover-section">
          <div className="pokemon-hover-section-title">Locations & Encounters</div>
          <div className="pokemon-hover-loading">Loading encounter data...</div>
        </div>
      )
    }

    if (encounterGames.length === 0) {
      return (
        <div className="pokemon-hover-section">
          <div className="pokemon-hover-section-title">Locations & Encounters</div>
          <div className="pokemon-hover-loading">No tracked encounter data is available for this Pokemon.</div>
        </div>
      )
    }

    const gameSortIndex = Object.fromEntries(gamesList.map((game, index) => [game.key, index]))
    const sortedEncounterGames = [...encounterGames].sort((a, b) => {
      const leftIndex = gameSortIndex[a.gameKey] ?? Number.MAX_SAFE_INTEGER
      const rightIndex = gameSortIndex[b.gameKey] ?? Number.MAX_SAFE_INTEGER

      return leftIndex - rightIndex || a.gameName.localeCompare(b.gameName)
    })

    let displayedGames = sortedEncounterGames
    let helperText = 'Showing every tracked game with encounter data.'
    let hiddenGameCount = 0

    if (selectedGame !== 'all') {
      const selectedGameEncounters = sortedEncounterGames.filter((game) => game.gameKey === selectedGame)

      if (selectedGameEncounters.length > 0) {
        displayedGames = selectedGameEncounters
        helperText = `Showing ${selectedGameDetails?.name || 'the selected game'}.`
      } else {
        displayedGames = sortedEncounterGames.slice(0, 3)
        hiddenGameCount = Math.max(0, sortedEncounterGames.length - displayedGames.length)
        helperText = `${selectedGameDetails?.name || 'The selected game'} has no encounter data here, so showing other tracked games instead.`
      }
    } else {
      displayedGames = sortedEncounterGames.slice(0, 3)
      hiddenGameCount = Math.max(0, sortedEncounterGames.length - displayedGames.length)
      helperText = hiddenGameCount > 0
        ? `Showing 3 of ${sortedEncounterGames.length} games with encounter data.`
        : 'Showing every tracked game with encounter data.'
    }

    return (
      <div className="pokemon-hover-section">
        <div className="pokemon-hover-section-title">Locations & Encounters</div>
        <div className="pokemon-encounter-helper">{helperText}</div>
        <div className="pokemon-encounter-groups">
          {displayedGames.map((game) => (
            <div key={game.gameKey} className="pokemon-encounter-group">
              <div className="pokemon-encounter-group-header">
                <div className="pokemon-encounter-game">{game.gameName}</div>
                <span className="pokemon-hover-game-tag">
                  {game.locations.length} {game.locations.length === 1 ? 'spot' : 'spots'}
                </span>
              </div>

              <div className="pokemon-encounter-location-list">
                {game.locations.slice(0, 4).map((location) => {
                  const levelRange = formatEncounterLevelRange(location.minLevel, location.maxLevel)

                  return (
                    <div key={`${game.gameKey}-${location.name}`} className="pokemon-encounter-location-card">
                      <div className="pokemon-encounter-location-header">
                        <div className="pokemon-encounter-location-name">{location.name}</div>
                        {levelRange ? <div className="pokemon-encounter-level">{levelRange}</div> : null}
                      </div>

                      <div className="pokemon-profile-chip-list pokemon-encounter-method-list">
                        {location.methods.length > 0 ? (
                          location.methods.map((method) => (
                            <span key={`${game.gameKey}-${location.name}-${method}`} className="pokemon-profile-chip pokemon-encounter-method">
                              {method}
                            </span>
                          ))
                        ) : (
                          <span className="pokemon-hover-loading">Method data unavailable.</span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              {game.locations.length > 4 ? (
                <div className="pokemon-encounter-more">
                  +{game.locations.length - 4} more {game.locations.length - 4 === 1 ? 'location' : 'locations'}
                </div>
              ) : null}
            </div>
          ))}
        </div>
        {hiddenGameCount > 0 ? (
          <div className="pokemon-encounter-more">
            +{hiddenGameCount} more {hiddenGameCount === 1 ? 'game' : 'games'} with encounter data
          </div>
        ) : null}
      </div>
    )
  }

  const renderPokemonLevelUpLearnset = (pokemon, learnsetDetails) => {
    const learnset = getLevelUpLearnsetForPokemon(pokemon, learnsetDetails)

    return (
      <div className="pokemon-hover-section pokemon-hover-section-learnset">
        <div className="pokemon-hover-section-title">Level-Up Learnset</div>
        <div className="pokemon-learnset-helper">
          {learnset.resolution?.helperText || 'Loading move learnset data...'}
        </div>
        {learnset.moves.length > 0 ? (
          <div className="pokemon-hover-learnset-shell">
            <div className="pokemon-hover-ability-list pokemon-learnset-list">
              {learnset.moves.map((move) => (
                <button
                  key={`${pokemon.apiName}-${move.apiName}-${move.level}`}
                  type="button"
                  className="pokemon-hover-ability pokemon-learnset-move"
                  onMouseEnter={() => setHoveredLearnsetMove(move)}
                  onMouseLeave={() => setHoveredLearnsetMove((current) => (
                    current?.apiName === move.apiName ? null : current
                  ))}
                >
                  <span className="pokemon-learnset-level">Lv. {move.level}</span>
                  <span>{move.name}</span>
                </button>
              ))}
            </div>
            <div className="item-hover-description pokemon-learnset-tooltip-copy pokemon-learnset-effect">
              {hoveredLearnsetMove ? (
                <>
                  <div className="pokemon-learnset-tooltip-header">
                    <div className="pokemon-learnset-tooltip-name-row">
                      <span className="pokemon-learnset-tooltip-name">{hoveredLearnsetMove.name}</span>
                      <span className="pokemon-learnset-tooltip-level">Lv. {hoveredLearnsetMove.level}</span>
                    </div>
                    <div className="item-hover-meta pokemon-learnset-tooltip-meta">
                      <span className={`type-badge move-card-type type-${hoveredLearnsetMoveInfo?.type || 'normal'}`}>
                        {formatDisplayName(hoveredLearnsetMoveInfo?.type || 'normal')}
                      </span>
                      <span
                        className={`item-hover-badge move-category-badge move-category-${(
                          hoveredLearnsetMoveInfo?.category || 'unknown'
                        ).toLowerCase()}`}
                      >
                        {hoveredLearnsetMoveInfo?.category || 'Unknown'}
                      </span>
                    </div>
                  </div>
                  <div className="move-hover-stats pokemon-learnset-tooltip-stats">
                    <div className="move-hover-stat-card">
                      <span className="move-hover-stat-label">Power</span>
                      <span className="move-hover-stat-value">{hoveredLearnsetMoveInfo?.power || 'Loading'}</span>
                    </div>
                    <div className="move-hover-stat-card">
                      <span className="move-hover-stat-label">Accuracy</span>
                      <span className="move-hover-stat-value">{hoveredLearnsetMoveInfo?.accuracy || 'Loading'}</span>
                    </div>
                    <div className="move-hover-stat-card">
                      <span className="move-hover-stat-label">PP</span>
                      <span className="move-hover-stat-value">{hoveredLearnsetMoveInfo?.pp || 'Loading'}</span>
                    </div>
                  </div>
                  {hoveredLearnsetMoveInfo?.effect || 'Loading move details...'}
                </>
              ) : (
                'Move details and effects will appear here when you hover a level-up move.'
              )}
            </div>
          </div>
        ) : (
          <div className="pokemon-hover-loading">
            No level-up moves found for {learnset.resolution?.basisLabel || 'this ruleset'}.
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={`app-shell theme-${activeDesignTemplate} ${darkUiMode ? 'dark-ui' : ''}`}>
      <div className="top-controls" ref={menuRef}>
        <button
          type="button"
          className={`menu-toggle ${menuOpen ? 'open' : ''}`}
          aria-label="Toggle feature menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(current => !current)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {menuOpen && (
          <div className="feature-menu">
            <div className="feature-menu-title">Features</div>
            <div className="feature-menu-section feature-menu-section-appearance">
              <div className="feature-menu-group-label">Appearance</div>
              <select
                className="feature-select"
                value={selectedDesignTemplate}
                onChange={(event) => setSelectedDesignTemplate(event.target.value)}
              >
                {DESIGN_TEMPLATES.map((template) => (
                  <option key={template.key} value={template.key}>
                    {template.label}
                  </option>
                ))}
              </select>
              <div className="feature-menu-toggle-list">
                <label className="feature-toggle">
                  <input
                    type="checkbox"
                    checked={showTypeColoredCards}
                    onChange={(event) => setShowTypeColoredCards(event.target.checked)}
                  />
                  <span>Type Colored Cards</span>
                </label>
                <label className="feature-toggle">
                  <input
                    type="checkbox"
                    checked={showShinySprites}
                    onChange={(event) => setShowShinySprites(event.target.checked)}
                  />
                  <span>Shiny Sprites</span>
                </label>
              </div>
            </div>
            {!showGamePicker && (
              <>
                <div className="feature-menu-section feature-menu-section-team-builder">
                  <div className="feature-menu-group-label">Team Builder</div>
                  <div className="feature-menu-toggle-list">
                    <label className="feature-toggle">
                      <input
                        type="checkbox"
                        checked={showAnalyzer}
                        onChange={(event) => setShowAnalyzer(event.target.checked)}
                      />
                      <span>Type Analyzer</span>
                    </label>
                    <label className="feature-toggle">
                      <input
                        type="checkbox"
                        checked={showSuggestedAdditions}
                        onChange={(event) => setShowSuggestedAdditions(event.target.checked)}
                      />
                      <span>Suggested Additions</span>
                    </label>
                    <label className="feature-toggle">
                      <input
                        type="checkbox"
                        checked={showComparison}
                        onChange={(event) => setShowComparison(event.target.checked)}
                      />
                      <span>Team Matchup</span>
                    </label>
                    <label className="feature-toggle">
                      <input
                        type="checkbox"
                        checked={showSavedTeams}
                        onChange={(event) => setShowSavedTeams(event.target.checked)}
                      />
                      <span>View Saved Teams</span>
                    </label>
                  </div>
                </div>

                <div className="feature-menu-section feature-menu-section-databases">
                  <div className="feature-menu-group-label">Databases</div>
                  <div className="feature-menu-toggle-list">
                    <label className="feature-toggle">
                      <input
                        type="checkbox"
                        checked={showItemDatabase}
                        onChange={(event) => setShowItemDatabase(event.target.checked)}
                      />
                      <span>Item Database</span>
                    </label>
                    <label className="feature-toggle">
                      <input
                        type="checkbox"
                        checked={showMoveDatabase}
                        onChange={(event) => setShowMoveDatabase(event.target.checked)}
                      />
                      <span>Move Database</span>
                    </label>
                  </div>
                </div>

                <div className="feature-menu-section feature-menu-section-battle-prep">
                  <div className="feature-menu-group-label">Battle Prep</div>
                  <div className="feature-menu-toggle-list">
                    <label className="feature-toggle">
                      <input
                        type="checkbox"
                        checked={showGymLeaders}
                        onChange={(event) => setShowGymLeaders(event.target.checked)}
                      />
                      <span>Gym Leaders</span>
                    </label>
                    <label className="feature-toggle">
                      <input
                        type="checkbox"
                        checked={showEliteFour}
                        onChange={(event) => setShowEliteFour(event.target.checked)}
                      />
                      <span>Elite Four</span>
                    </label>
                  </div>
                </div>

                <div className="feature-menu-section feature-menu-section-pokedex">
                  <div className="feature-menu-group-label">Pokedex</div>
                  <div className="feature-menu-toggle-list">
                    <label className="feature-toggle">
                      <input
                        type="checkbox"
                        checked={includeZaMegas}
                        onChange={(event) => setIncludeZaMegas(event.target.checked)}
                      />
                      <span>Include Z-A Megas</span>
                    </label>
                    <label className="feature-toggle">
                      <input
                        type="checkbox"
                        checked={sortByGeneration}
                        onChange={(event) => {
                          const checked = event.target.checked
                          setSortByGeneration(checked)
                          if (!checked) {
                            setSelectedGeneration('all')
                          }
                        }}
                      />
                      <span>Sort by Gen</span>
                    </label>
                  </div>
                  {sortByGeneration && (
                    <select
                      className="feature-select"
                      value={selectedGeneration}
                      onChange={(event) => setSelectedGeneration(event.target.value)}
                    >
                      <option value="all">All Generations</option>
                      {generations.map((gen) => (
                        <option key={gen.gen} value={gen.gen}>
                          {gen.name} (Gen {gen.gen})
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <div className={`app-wrapper ${hasFeaturePanel ? 'with-side-panel' : 'centered-layout'}`}>
        <div className="app-container">
          <header className="page-header">
            {!showGamePicker && (
              <button
                type="button"
                className="home-button"
                onClick={goHome}
                aria-label="Go to game selection home"
                title="Back to game selection"
              >
                <svg viewBox="0 0 24 24" className="home-button-icon" aria-hidden="true">
                  <path d="M4 11.5 12 5l8 6.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M7 10.5V19h10v-8.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )}
            <h1>
              <span className="page-title-main">
                PartyDex
              </span>
              <br />
              <span className="page-subtitle">Premium{' '}Pokemon{' '}Team{' '}Builder</span>
            </h1>
          </header>

          {showGamePicker ? (
            <section className="game-picker-section">
              <div className="game-picker-header">
                <div>
                  <div className="game-picker-kicker">Games</div>
                  <h2 className="game-picker-title">Choose a game before browsing Pokemon</h2>
                  <p className="game-picker-copy">
                    Start with <strong>All Games</strong> to browse everything, or jump straight into a specific release.
                  </p>
                </div>
                <div className="game-picker-status">
                  <span>{loading ? 'Loading Pokemon data...' : 'Pokemon ready'}</span>
                  <span>{itemsLoading ? 'Loading items...' : items.length > 0 ? 'Items ready' : 'Items ready'}</span>
                  <span>{movesLoading ? 'Loading moves...' : moves.length > 0 ? 'Moves ready' : 'Moves load on demand'}</span>
                </div>
              </div>

              <div className="game-picker-grid">
                <button
                  type="button"
                  className="game-picker-card game-picker-card-all"
                  onClick={() => selectGameView('all')}
                >
                  <div className="game-picker-card-top">
                    <div className="game-picker-card-copy-block">
                      <span className="game-picker-card-label">All Games</span>
                      <span className="game-picker-card-title">Browse All Pokemon</span>
                    </div>
                    <div className="game-picker-card-sprite-group" aria-hidden="true">
                      {getGamePickerSprites('all').map((gamePickerSprite, spriteIndex) => (
                        gamePickerSprite.animated ? (
                          <div
                            key={`all-sprite-${spriteIndex}`}
                            className="game-picker-card-sprite-stack"
                            style={{
                              '--game-picker-sprite-scale': gamePickerSprite.animatedScale || 1,
                              '--game-picker-hover-scale': gamePickerSprite.hoverScale || DEFAULT_GAME_PICKER_HOVER_SCALE
                            }}
                          >
                            <img
                              src={gamePickerSprite.static}
                              alt=""
                              className="game-picker-card-sprite game-picker-card-sprite-static"
                            />
                            <img
                              src={gamePickerSprite.animated}
                              alt=""
                              className="game-picker-card-sprite game-picker-card-sprite-animated"
                            />
                          </div>
                        ) : (
                          <img
                            key={`all-sprite-${spriteIndex}`}
                            src={gamePickerSprite.static}
                            alt=""
                            className="game-picker-card-sprite"
                            style={{
                              '--game-picker-sprite-scale': gamePickerSprite.animatedScale || 1,
                              '--game-picker-hover-scale': gamePickerSprite.hoverScale || DEFAULT_GAME_PICKER_HOVER_SCALE
                            }}
                          />
                        )
                      ))}
                    </div>
                  </div>
                  <span className="game-picker-card-copy">See the full dex.</span>
                </button>

                <button
                  type="button"
                  className="game-picker-card game-picker-card-champions"
                  onClick={() => selectGameView('champions')}
                >
                  <div className="game-picker-card-top">
                    <div className="game-picker-card-copy-block">
                      <span className="game-picker-card-label">Champions</span>
                      <span className="game-picker-card-title" style={{ color: '#ff7c2f' }}>
                        Pokemon Champions
                      </span>
                    </div>
                    <div className="game-picker-card-sprite-group" aria-hidden="true">
                      {getGamePickerSprites('champions').map((gamePickerSprite, spriteIndex) => (
                        <img
                          key={`champions-sprite-${spriteIndex}`}
                          src={gamePickerSprite.static}
                          alt=""
                          className="game-picker-card-sprite"
                          style={{
                            '--game-picker-sprite-scale': gamePickerSprite.animatedScale || 1,
                            '--game-picker-hover-scale': gamePickerSprite.hoverScale || DEFAULT_GAME_PICKER_HOVER_SCALE
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="game-picker-card-copy">Active Pokemon</span>
                </button>

                {orderedGameSections.flatMap((section) =>
                  section.games.map((game) => {
                    if (game.key === 'champions') {
                      return null
                    }

                    const regionLabel = game.region || GAME_REGION_BY_KEY[game.key] || `Gen ${game.gen}`
                    const gamePickerSprites = getGamePickerSprites(game.key)

                    return (
                      <button
                        key={`game-picker-${game.key}`}
                        type="button"
                        className={`game-picker-card game-picker-card-${game.systemClass} game-picker-card-gen-${game.gen}`}
                        onClick={() => selectGameView(game.key)}
                      >
                        <div className="game-picker-card-top">
                          <div className="game-picker-card-copy-block">
                            <span className="game-picker-card-label">{`Gen ${game.gen}`}</span>
                            <span className="game-picker-card-title" style={{ color: game.color }}>
                              {game.name}
                            </span>
                          </div>
                          <div
                            className={`game-picker-card-sprite-group ${
                              gamePickerSprites.length > 1 ? 'game-picker-card-sprite-group-duo' : ''
                            }`}
                            aria-hidden="true"
                          >
                            {gamePickerSprites.map((gamePickerSprite, spriteIndex) => (
                              gamePickerSprite.animated ? (
                                <div
                                  key={`${game.key}-sprite-${spriteIndex}`}
                                  className="game-picker-card-sprite-stack"
                                  style={{
                                    '--game-picker-sprite-scale': gamePickerSprite.animatedScale || 1,
                                    '--game-picker-hover-scale': gamePickerSprite.hoverScale || DEFAULT_GAME_PICKER_HOVER_SCALE
                                  }}
                                >
                                  <img
                                    src={gamePickerSprite.static}
                                    alt=""
                                    className="game-picker-card-sprite game-picker-card-sprite-static"
                                  />
                                  <img
                                    src={gamePickerSprite.animated}
                                    alt=""
                                    className="game-picker-card-sprite game-picker-card-sprite-animated"
                                  />
                                </div>
                              ) : (
                                <img
                                  key={`${game.key}-sprite-${spriteIndex}`}
                                  src={gamePickerSprite.static}
                                  alt=""
                                  className="game-picker-card-sprite"
                                  style={{
                                    '--game-picker-sprite-scale': gamePickerSprite.animatedScale || 1,
                                    '--game-picker-hover-scale': gamePickerSprite.hoverScale || DEFAULT_GAME_PICKER_HOVER_SCALE
                                  }}
                                />
                              )
                            ))}
                          </div>
                        </div>
                        <span className={`game-picker-card-copy ${getRegionColorClassName(regionLabel)}`}>
                          {regionLabel}
                        </span>
                      </button>
                    )
                  })
                )}
              </div>
            </section>
          ) : (
            <>
          <div className="team-section" ref={teamSectionRef}>
            <div className="team-action-buttons">
              <button
                type="button"
                className="team-save-button team-history-button"
                onClick={handleUndoTeamChange}
                disabled={!canUndoTeamChange}
                title={canUndoTeamChange ? 'Undo the last team change. Ctrl/Cmd+Z' : 'No team changes to undo.'}
              >
                <svg viewBox="0 0 24 24" className="team-save-button-icon" aria-hidden="true">
                  <path d="M11 7 6 12l5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M7 12h7a4 4 0 1 1 0 8h-1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="sr-only">Undo team change</span>
              </button>
              <button
                type="button"
                className="team-save-button team-history-button"
                onClick={handleRedoTeamChange}
                disabled={!canRedoTeamChange}
                title={canRedoTeamChange ? 'Redo the last undone team change. Ctrl/Cmd+Y' : 'No team changes to redo.'}
              >
                <svg viewBox="0 0 24 24" className="team-save-button-icon" aria-hidden="true">
                  <path d="m13 7 5 5-5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M17 12h-7a4 4 0 1 0 0 8h1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="sr-only">Redo team change</span>
              </button>
              <button
                type="button"
                className="team-save-button"
                onClick={handleSaveTeam}
                disabled={teamCount === 0}
                title={teamCount === 0 ? 'Add Pokemon to save a team.' : 'Save the current team.'}
              >
                <svg viewBox="0 0 24 24" className="team-save-button-icon" aria-hidden="true">
                  <path d="M5 3h11l3 3v15H5V3Zm2 2v5h8V5H7Zm0 8v6h10v-6H7Zm2 2h6v2H9v-2Z" fill="currentColor" />
                </svg>
                <span className="sr-only">Save current team</span>
              </button>
              <button
                type="button"
                className="team-save-button"
                onClick={exportCurrentTeamAsImage}
                disabled={teamCount === 0 || teamImageExporting}
                title={
                  teamCount === 0
                    ? 'Add Pokemon before exporting a team image.'
                    : teamImageExporting
                      ? 'Rendering your team image.'
                      : 'Export your current team as an image.'
                }
              >
                <svg viewBox="0 0 24 24" className="team-save-button-icon" aria-hidden="true">
                  <path d="M12 3v10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="m8 9 4 4 4-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <rect x="4" y="15" width="16" height="6" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
                <span className="sr-only">Export current team as image</span>
              </button>
            </div>
            <div className="team-title">Your Team</div>
            <div className="team-count">
              Team Size: <span className={teamCount === TEAM_SLOT_COUNT ? 'team-count-full' : ''}>{teamCount}</span>/{TEAM_SLOT_COUNT}
            </div>
            {teamImageExportStatus && (
              <div className="team-export-status">{teamImageExportStatus}</div>
            )}
            <div className="team-slots-scroll">
              <div className="team-slots">
                {team.map((pokemon, index) => {
                  const selectedAbility = getSelectedAbilityForPokemon(pokemon)
                  const buildSummary = pokemon ? getPokemonBuildSummary(pokemon) : null

                  return (
                    <div
                      key={index}
                      className={`slot ${pokemon ? 'filled' : ''} ${pokemon ? getPokemonHighlightClass(pokemon) : ''} ${itemTargetSelection && pokemon ? 'item-target' : ''} ${pokemon ? getMoveTargetHighlightClass(pokemon) : ''}`}
                      onClick={() => handleTeamSlotClick(pokemon, index)}
                      onMouseEnter={(event) => pokemon && handlePokemonHoverStart(pokemon, event)}
                      onMouseLeave={handlePokemonHoverEnd}
                    >
                      {pokemon ? (
                        <>
                          {renderPokemonSprite(pokemon, {
                            baseClassName: 'slot-pokemon-image',
                            stackClassName: 'slot-pokemon-image-stack',
                            animateOnHover: isPokemonCurrentlyHovered(pokemon),
                            alt: pokemon.name
                          })}
                          <div className="slot-name">{formatDisplayName(pokemon.name)}</div>
                          {selectedAbility && (
                            <button
                              type="button"
                              className="slot-ability-button"
                              onClick={(event) => {
                                if (handleMovePickerTeamControlClick(event, pokemon)) {
                                  return
                                }
                                event.stopPropagation()
                                cycleTeamPokemonAbility(index)
                              }}
                              title={
                                pokemon.abilities.length > 1
                                  ? `Current ability: ${selectedAbility.displayName}. Click to cycle abilities.`
                                  : `Ability: ${selectedAbility.displayName}`
                              }
                            >
                              <span className="slot-ability-name">{selectedAbility.displayName}</span>
                              {selectedAbility.isHidden && <span className="slot-ability-tag">Hidden</span>}
                            </button>
                          )}
                          {pokemon.heldItem && (
                            <div className="slot-held-item">
                              <img
                                src={pokemon.heldItem.image}
                                alt={pokemon.heldItem.name}
                                className="slot-held-item-image"
                              />
                              <span className="slot-held-item-name">{pokemon.heldItem.name}</span>
                            </div>
                          )}
                          <button
                            type="button"
                            className="slot-build-button"
                            onClick={(event) => {
                              if (handleMovePickerTeamControlClick(event, pokemon)) {
                                return
                              }
                              event.stopPropagation()
                              openTeamBuildEditor(index)
                            }}
                            title={
                              buildSummary
                                ? `${buildSummary.nature.label} nature. ${buildSummary.evSummary}. Click to edit nature and EVs.`
                                : 'Edit nature and EVs.'
                            }
                          >
                            <span className="slot-build-title">{buildSummary?.nature.label || 'Hardy'} Nature</span>
                            <span className="slot-build-summary">{buildSummary?.evSummary || 'No EVs'}</span>
                          </button>
                          <div className="slot-move-grid">
                            {normalizeAssignedMoves(pokemon.moves).map((move, moveIndex) => (
                              <button
                                key={`${pokemon.apiName}-move-slot-${moveIndex}`}
                                type="button"
                                className={`slot-move-chip ${move ? 'filled' : 'empty'}`}
                                onClick={(event) => handleTeamMoveSlotClick(event, index, moveIndex)}
                                title={
                                  moveTargetSelection
                                    ? `Assign ${moveTargetSelection.name} to move slot ${moveIndex + 1}`
                                    : move
                                      ? `Remove ${move.name}`
                                      : `Move Slot ${moveIndex + 1}`
                                }
                              >
                                <span
                                  className={`slot-move-chip-name ${move ? `move-type-text move-type-text-${move.type}` : ''}`}
                                >
                                  {move?.name || 'Empty Move'}
                                </span>
                              </button>
                            ))}
                          </div>
                        </>
                      ) : (
                        <span className="empty-slot-text">Empty Slot</span>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="pokemon-grid">
            <div className="pokemon-title">Select Pokemon by Generation</div>
            <div className="pokemon-helper">
              Hold Shift while hovering over the blue region name or generation text to see their games, or any Pokemon to see their details.
            </div>
            {customMatchupTargetSlot !== null && (
              <div className="pokemon-helper pokemon-helper-active">
                Custom matchup slot {customMatchupTargetSlot + 1} is ready. Click a Pokemon below to place it there.
              </div>
            )}
            {isSpecificGameSelected && selectedGameDetails && (
              <div className="pokemon-helper pokemon-helper-active">
                Showing Pokemon from {selectedGameDetails.name}:
              </div>
            )}
            {isSpecificGameSelected && selectedGameDetails?.supportsAvailability === false && (
              <div className="pokemon-helper pokemon-helper-active">
                Availability data is not out yet for {selectedGameDetails.name}.
              </div>
            )}
            <div className="browse-filters-panel">
              <div className="browse-filters-header">
                <div>
                  <div className="browse-filters-title">Browse Filters</div>
                  <div className="browse-filters-helper">
                    Narrow the browser with normal filters, then use smart filters to spot better additions for the current team.
                  </div>
                </div>
                <div className="browse-filters-actions">
                  <button
                    type="button"
                    className="browse-filters-toggle"
                    onClick={() => setShowBrowseFilters((current) => !current)}
                    aria-expanded={showBrowseFilters}
                  >
                    {showBrowseFilters ? 'Hide Filters' : 'Show Filters'}
                  </button>
                  <button
                    type="button"
                    className="browse-filters-reset"
                    onClick={resetBrowseFilters}
                    disabled={activeBrowseFilterChips.length === 0}
                  >
                    Reset Filters
                  </button>
                </div>
              </div>

              {showBrowseFilters ? (
                <>
                  <div className="browse-filter-grid">
                    <label className="browse-filter-field">
                      <span className="browse-filter-label">Type</span>
                      <select
                        className="feature-select browse-filter-control"
                        value={selectedBrowseType}
                        onChange={(event) => setSelectedBrowseType(event.target.value)}
                      >
                        <option value="all">All Types</option>
                        {typesList.map((type) => (
                          <option key={type} value={type}>
                            {formatDisplayName(type)}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="browse-filter-field">
                      <span className="browse-filter-label">Egg Group</span>
                      <select
                        className="feature-select browse-filter-control"
                        value={selectedBrowseEggGroup}
                        onChange={(event) => setSelectedBrowseEggGroup(event.target.value)}
                      >
                        <option value="all">All Egg Groups</option>
                        {browseEggGroupOptions.map((eggGroup) => (
                          <option key={eggGroup.key} value={eggGroup.key}>
                            {eggGroup.label}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="browse-filter-field">
                      <span className="browse-filter-label">Growth Rate</span>
                      <select
                        className="feature-select browse-filter-control"
                        value={selectedBrowseGrowthRate}
                        onChange={(event) => setSelectedBrowseGrowthRate(event.target.value)}
                      >
                        <option value="all">All Growth Rates</option>
                        {browseGrowthRateOptions.map((growthRate) => (
                          <option key={growthRate.key} value={growthRate.key}>
                            {growthRate.label}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="browse-filter-field browse-filter-field-range">
                      <span className="browse-filter-label">Minimum BST</span>
                      <input
                        type="range"
                        min="0"
                        max={maxBrowseBst}
                        step="5"
                        className="browse-filter-range"
                        value={browseBstMinimum}
                        onChange={(event) => setBrowseBstMinimum(Number(event.target.value))}
                      />
                      <span className="browse-filter-range-value">{browseBstMinimum}+</span>
                    </label>
                  </div>

                  <div className="browse-smart-filter-group">
                    <label className="feature-toggle browse-smart-filter">
                      <input
                        type="checkbox"
                        checked={hideTeamMembers}
                        onChange={(event) => setHideTeamMembers(event.target.checked)}
                      />
                      <span>Hide Team Members</span>
                    </label>
                    <label className="feature-toggle browse-smart-filter">
                      <input
                        type="checkbox"
                        checked={onlyPatchTeamWeaknesses}
                        onChange={(event) => setOnlyPatchTeamWeaknesses(event.target.checked)}
                        disabled={teamWeaknessFilterTypes.length === 0}
                      />
                      <span>Patch Team Weaknesses</span>
                    </label>
                    <label className="feature-toggle browse-smart-filter">
                      <input
                        type="checkbox"
                        checked={onlyAddNewTeamTypes}
                        onChange={(event) => setOnlyAddNewTeamTypes(event.target.checked)}
                        disabled={teamTypeSet.size === 0}
                      />
                      <span>Add New Team Typing</span>
                    </label>
                  </div>
                </>
              ) : (
                <div className="browse-filters-collapsed-copy">
                  Filters are currently hidden. Open them to narrow the general Pokemon search.
                </div>
              )}

              <div className="browse-filters-footer">
                <div className="browse-filters-count">
                  {loading ? 'Loading Pokemon...' : `${browseVisiblePokemonCount} Pokemon match the current filters.`}
                </div>
                {activeBrowseFilterChips.length > 0 ? (
                  <div className="browse-filter-chip-list">
                    {activeBrowseFilterChips.map((chip) => (
                      <span key={chip} className="browse-filter-chip">
                        {chip}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="browse-filters-helper">
                    No extra filters are active right now.
                  </div>
                )}
              </div>
            </div>
            {loading ? (
              <LoadingIndicator label="Loading Pokemon..." />
            ) : (
              <div className="generations-container">
                {browseVisiblePokemonCount === 0 ? (
                  <div className="browse-empty-state">
                    No Pokemon match those filters right now. Try easing the BST floor or turning off one of the smart filters.
                  </div>
                ) : selectedGame === 'champions' ? (
                  <div className="generation-section champions-active-section">
                    <div className="generation-header">
                      <h2 className="generation-title">Active Pokemon</h2>
                    </div>
                    <div className="pokemon-list">
                      {championsBrowsePokemon.map((poke) => {
                        const displayedPokemon = getPokemonDisplayVariant(poke, showShinySprites)

                        return (
                          <div
                            key={`champions-${poke.id}-${poke.name}`}
                            className={`pokemon-card ${isInTeam(poke.id) ? 'in-team' : ''}`}
                            onClick={() => togglePokemonSelection(displayedPokemon)}
                            style={getPokemonCardStyle(displayedPokemon, showTypeColoredCards)}
                            onMouseEnter={(event) => handlePokemonHoverStart(displayedPokemon, event)}
                            onMouseLeave={handlePokemonHoverEnd}
                          >
                            <div className="pokemon-sprite-frame">
                              {renderPokemonSprite(displayedPokemon, {
                                baseClassName: 'pokemon-image',
                                stackClassName: 'pokemon-image-stack',
                                animateOnHover: isPokemonCurrentlyHovered(displayedPokemon),
                                alt: displayedPokemon.name
                              })}
                            </div>
                            <div className="pokemon-name">{displayedPokemon.name}</div>
                            <div className="pokemon-id">#{getDisplayedDexNumber(displayedPokemon)}</div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ) : (
                  visibleGenerationBrowseSections.map((section) => (
                    <div key={section.key} className="generation-section">
                      <div className="generation-header">
                        <h2 className="generation-title">
                          <span
                            className={`generation-region ${getRegionColorClassName(section.name)} ${hoveredRegion === section.key ? 'active' : ''}`}
                            onMouseEnter={() => setHoveredRegion(section.key)}
                            onMouseLeave={() => setHoveredRegion((current) => (current === section.key ? null : current))}
                          >
                            {section.name}
                            {shiftPressed && hoveredRegion === section.key && (
                              <div className="generation-games-popover">
                                <div className="generation-games-label">Games:</div>
                                <ul className="generation-games-list">
                                  {regionGameDetails[section.name].map((game) => (
                                    <li
                                      key={`${section.name}-${game.name}`}
                                      className={`generation-game-item gen-${game.systemClass}`}
                                      style={{ color: game.color }}
                                    >
                                      {game.name}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </span>{' '}
                          <span className="generation-separator">-</span>{' '}
                          <span
                            className={`generation-meta ${hoveredGeneration === section.key ? 'active' : ''}`}
                            onMouseEnter={() => setHoveredGeneration(section.key)}
                            onMouseLeave={() => setHoveredGeneration(current => (current === section.key ? null : current))}
                          >
                            Gen {section.gen}
                            {shiftPressed && hoveredGeneration === section.key && (
                              <div className="generation-games-popover">
                                <div className="generation-games-label">Games:</div>
                                <ul className="generation-games-list">
                                  {generationGameDetails[section.gen].games.map((game) => (
                                    <li
                                      key={game.name}
                                      className={`generation-game-item gen-${section.gen <= 5 ? 'pixel' : '3d'}`}
                                      style={{ color: game.color }}
                                    >
                                      {game.name}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </span>
                        </h2>
                      </div>
                      {section.generationSections.map((generationSection) => (
                        <Fragment key={generationSection.key}>
                          {generationSection.title && <div className="generation-subsection-title">{generationSection.title}</div>}
                          <div className={`pokemon-list ${generationSection.title ? 'pokemon-list-subsection' : ''}`}>
                            {generationSection.pokemon.map((poke) => {
                              const displayedPokemon = getPokemonDisplayVariant(poke, showShinySprites)

                              return (
                                <div
                                  key={`${generationSection.key}-${poke.id}-${poke.name}`}
                                  className={`pokemon-card ${isInTeam(poke.id) ? 'in-team' : ''}`}
                                  onClick={() => togglePokemonSelection(displayedPokemon)}
                                  style={getPokemonCardStyle(displayedPokemon, showTypeColoredCards)}
                                  onMouseEnter={(event) => handlePokemonHoverStart(displayedPokemon, event)}
                                  onMouseLeave={handlePokemonHoverEnd}
                                >
                                  <div className="pokemon-sprite-frame">
                                    {renderPokemonSprite(displayedPokemon, {
                                      baseClassName: 'pokemon-image',
                                      stackClassName: 'pokemon-image-stack',
                                      animateOnHover: isPokemonCurrentlyHovered(displayedPokemon),
                                      alt: displayedPokemon.name
                                    })}
                                  </div>
                                  <div className="pokemon-name">{displayedPokemon.name}</div>
                                  <div className="pokemon-id">#{getDisplayedDexNumber(displayedPokemon)}</div>
                                </div>
                              )
                            })}
                          </div>
                        </Fragment>
                      ))}
                    </div>
                  ))
                )}
                {gameDlcSections.map((section) => (
                  <div key={section.key} className="generation-section game-dlc-section">
                    <div className="generation-header">
                      <h2 className="generation-title generation-dlc-title">{section.title}</h2>
                    </div>
                    {section.generations.map((gen) => (
                      <Fragment key={`${section.key}-${gen.gen}`}>
                        <div className="game-dlc-region-title">{gen.name} - Gen {gen.gen}</div>
                        <div className="pokemon-list pokemon-list-subsection">
                          {gen.pokemon.map((poke) => {
                            const displayedPokemon = getPokemonDisplayVariant(poke, showShinySprites)

                            return (
                              <div
                                key={`${section.key}-${gen.gen}-${poke.id}-${poke.name}`}
                                className={`pokemon-card ${isInTeam(poke.id) ? 'in-team' : ''}`}
                                onClick={() => togglePokemonSelection(displayedPokemon)}
                                style={getPokemonCardStyle(displayedPokemon, showTypeColoredCards)}
                                onMouseEnter={(event) => handlePokemonHoverStart(displayedPokemon, event)}
                                onMouseLeave={handlePokemonHoverEnd}
                              >
                                <div className="pokemon-sprite-frame">
                                  {renderPokemonSprite(displayedPokemon, {
                                    baseClassName: 'pokemon-image',
                                    stackClassName: 'pokemon-image-stack',
                                    animateOnHover: isPokemonCurrentlyHovered(displayedPokemon),
                                    alt: displayedPokemon.name
                                  })}
                                </div>
                                <div className="pokemon-name">{displayedPokemon.name}</div>
                                <div className="pokemon-id">#{getDisplayedDexNumber(displayedPokemon)}</div>
                              </div>
                            )
                          })}
                        </div>
                      </Fragment>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
            </>
          )}

        </div>

        {hasFeaturePanel && (
          <div className="feature-panel-column">
            {showAnalyzer && (
              <aside className="type-analyzer">
                <div className="analyzer-title">Type Analyzer</div>
                <div className="analyzer-coverage-toggle">
                  {ANALYZER_COVERAGE_SOURCES.map((source) => (
                    <button
                      key={source.key}
                      type="button"
                      className={`analyzer-coverage-option ${analyzerCoverageSource === source.key ? 'active' : ''}`}
                      aria-pressed={analyzerCoverageSource === source.key}
                      onClick={() => setAnalyzerCoverageSource(source.key)}
                    >
                      {source.label}
                    </button>
                  ))}
                </div>
                <div className="analyzer-coverage-helper">{coverageHelperText}</div>

                <div className="analyzer-summary-grid">
                  {teamSummaryRatings.map((rating) => (
                    <div key={rating.key} className={`analyzer-summary-card analyzer-summary-${rating.key}`}>
                      <div className="analyzer-summary-label">{rating.label}</div>
                      <div className="analyzer-summary-value-row">
                        <div className="analyzer-summary-value">{rating.value}</div>
                        <div className="analyzer-summary-meter">
                          <div
                            className="analyzer-summary-meter-fill"
                            style={{ width: `${rating.value}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="analyzer-summary-copy">{rating.copy}</div>
                    </div>
                  ))}
                </div>

                <div className="analyzer-section analyzer-warning-section">
                  <h3 className="analyzer-header">Team Warnings</h3>
                  {teamWarnings.length > 0 ? (
                    <div className="analyzer-warning-list">
                      {teamWarnings.map((warning, index) => (
                        <div
                          key={`team-warning-${index}`}
                          className={`analyzer-warning-card ${warning.tone === 'success' ? 'analyzer-warning-card-success' : ''}`}
                        >
                          {warning.kind === 'type-list' ? (
                            <div className="analyzer-warning-type-row">
                              <span className="analyzer-warning-prefix">{warning.prefix}</span>
                              <div className="analyzer-warning-type-list">
                                {warning.types.map((type) => (
                                  <span key={`warning-${index}-${type}`} className={`type-badge analyzer-warning-type-badge type-${type}`}>
                                    {formatDisplayName(type)}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ) : (
                            warning.text
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="analyzer-warning-card analyzer-warning-card-success">
                      {coverageSuccessText}
                    </div>
                  )}
                </div>

                <div className="analyzer-panels">
                  <div className="analyzer-section analyzer-column">
                    <h3 className="analyzer-header">{coveragePanelTitle}</h3>
                    <div className="type-bars-compact">
                      {coverageTypes.map(({ type, count }) => (
                        (() => {
                          const { primaryFilled, overflowFilled, hasOverflow } = getCoverageBarState(count)

                          return (
                            <div
                              key={type}
                              className={`type-bar-row ${hoveredAnalyzer?.kind === 'coverage' && hoveredAnalyzer.type === type ? 'active' : ''}`}
                              onMouseEnter={() => setHoveredAnalyzer({ kind: 'coverage', type })}
                              onMouseLeave={() => setHoveredAnalyzer(null)}
                            >
                              <div className="type-bar-label-inline">{type.charAt(0).toUpperCase() + type.slice(1)}:</div>
                              <div className={`type-bar-stack ${hasOverflow ? 'has-overflow' : ''}`}>
                                <div className="type-bar-container-inline">
                                  {[...Array(6)].map((_, i) => (
                                    <div
                                      key={`coverage-base-${type}-${i}`}
                                      className={`type-bar-segment type-${type} ${i < primaryFilled ? 'filled' : ''}`}
                                    ></div>
                                  ))}
                                </div>
                                {hasOverflow && (
                                  <div className="type-bar-container-inline overflow-row">
                                    {[...Array(6)].map((_, i) => (
                                      <div
                                        key={`coverage-overflow-${type}-${i}`}
                                        className={`type-bar-segment type-${type} ${i < overflowFilled ? 'filled' : ''}`}
                                      ></div>
                                    ))}
                                  </div>
                                )}
                              </div>
                              <div className="type-bar-count">{count}</div>
                            </div>
                          )
                        })()
                      ))}
                    </div>
                  </div>

                  <div className="analyzer-section analyzer-column">
                    <h3 className="analyzer-header">Weak To</h3>
                    <div className="type-bars-compact">
                      {weaknessTypes.map(({ type, count }) => (
                        (() => {
                          const { primaryFilled, overflowFilled, hasOverflow } = getWeaknessBarState(count)

                          return (
                            <div
                              key={type}
                              className={`type-bar-row ${hoveredAnalyzer?.kind === 'weakness' && hoveredAnalyzer.type === type ? 'active' : ''} ${hasOverflow ? 'overflow-danger' : ''}`}
                              onMouseEnter={() => setHoveredAnalyzer({ kind: 'weakness', type })}
                              onMouseLeave={() => setHoveredAnalyzer(null)}
                            >
                              <div className="type-bar-label-inline weakness-label">{type.charAt(0).toUpperCase() + type.slice(1)}:</div>
                              <div className={`type-bar-stack ${hasOverflow ? 'has-overflow' : ''}`}>
                                <div className="type-bar-container-inline">
                                  {[...Array(6)].map((_, i) => (
                                    <div
                                      key={`base-${i}`}
                                      className={`type-bar-segment type-${type} weakness-bar ${i < primaryFilled ? 'filled' : ''}`}
                                    ></div>
                                  ))}
                                </div>
                                {hasOverflow && (
                                  <div className="type-bar-container-inline overflow-row">
                                    {[...Array(6)].map((_, i) => (
                                      <div
                                        key={`overflow-${i}`}
                                        className={`type-bar-segment type-${type} weakness-bar severe ${i < overflowFilled ? 'filled' : ''}`}
                                      ></div>
                                    ))}
                                  </div>
                                )}
                              </div>
                              <div className="type-bar-count weakness-count">{count}</div>
                            </div>
                          )
                        })()
                      ))}
                    </div>
                  </div>
                </div>
              </aside>
            )}

            {showSuggestedAdditions && (
              <aside className="suggested-additions-panel">
                <h2 className="analyzer-title">Suggested Additions</h2>
                <p className="comparison-helper suggested-additions-helper">
                  High-BST, non-legendary picks based on the Pokemon types your team is missing and the matchups it still needs help covering.
                </p>
                {activeTeam.length === 0 ? (
                  <div className="analyzer-warning-card">
                    Add at least one Pokemon first, then this will suggest strong additions based on the types your team still does not have.
                  </div>
                ) : suggestedAdditions.length > 0 ? (
                  <div className="analyzer-suggestion-list">
                    {suggestedAdditions.map((suggestion) => {
                      const suggestionDisplay = getPokemonDisplayVariant(suggestion.pokemon, showShinySprites)

                      return (
                        <button
                          key={`suggested-addition-${suggestion.pokemon.apiName}`}
                          type="button"
                          className="analyzer-suggestion-card"
                          onClick={() => addToTeam(suggestion.pokemon)}
                        >
                          <div className="analyzer-suggestion-top">
                            <img
                              src={suggestionDisplay.image}
                              alt={suggestionDisplay.name}
                              className={getPokemonSpriteClassName(suggestionDisplay, 'analyzer-suggestion-image')}
                            />
                            <div className="analyzer-suggestion-copy">
                              <div className="analyzer-suggestion-name-row">
                                <span className="analyzer-suggestion-name">
                                  {formatDisplayName(suggestionDisplay.name)}
                                </span>
                                <span className="analyzer-suggestion-bst">BST {suggestion.bst}</span>
                              </div>
                              <div className="analyzer-suggestion-type-list">
                                {suggestion.pokemon.types.map((type) => (
                                  <span
                                    key={`${suggestion.pokemon.apiName}-${type}`}
                                    className={`type-badge analyzer-warning-type-badge type-${type}`}
                                  >
                                    {formatDisplayName(type)}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <span className="analyzer-suggestion-action">
                              {teamCount < TEAM_SLOT_COUNT ? 'Add' : 'Team Full'}
                            </span>
                          </div>
                          <div className="analyzer-suggestion-reasons">
                            {suggestion.addedTypes.length > 0 && (
                              <div className="analyzer-suggestion-reason">
                                <span className="analyzer-suggestion-reason-label">Adds</span>
                                <div className="analyzer-warning-type-list">
                                  {suggestion.addedTypes.map((type) => (
                                    <span
                                      key={`${suggestion.pokemon.apiName}-adds-${type}`}
                                      className={`type-badge analyzer-warning-type-badge type-${type}`}
                                    >
                                      {formatDisplayName(type)}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                            {suggestion.offensiveCoverageTypes.length > 0 && (
                              <div className="analyzer-suggestion-reason">
                                <span className="analyzer-suggestion-reason-label">Covers</span>
                                <div className="analyzer-warning-type-list">
                                  {suggestion.offensiveCoverageTypes.map((type) => (
                                    <span
                                      key={`${suggestion.pokemon.apiName}-covers-${type}`}
                                      className={`type-badge analyzer-warning-type-badge type-${type}`}
                                    >
                                      {formatDisplayName(type)}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                            {suggestion.defensivePatchTypes.length > 0 && (
                              <div className="analyzer-suggestion-reason">
                                <span className="analyzer-suggestion-reason-label">Resists</span>
                                <div className="analyzer-warning-type-list">
                                  {suggestion.defensivePatchTypes.map((type) => (
                                    <span
                                      key={`${suggestion.pokemon.apiName}-resists-${type}`}
                                      className={`type-badge analyzer-warning-type-badge type-${type}`}
                                    >
                                      {formatDisplayName(type)}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                ) : (
                  <div className="analyzer-warning-card analyzer-warning-card-success">
                    No strong non-legendary suggestions stood out for the current team and game rules.
                  </div>
                )}
              </aside>
            )}

            {showComparison && (
              <aside className="comparison-panel team-matchup-panel">
                <div className="comparison-title">Team Matchup</div>
                <div className="comparison-helper">
                  Compare a full team against another team. You can use your current builder lineup or load a Gym Leader/Elite Four preset.
                </div>

                <div className="analyzer-coverage-toggle team-matchup-coverage-toggle">
                  {ANALYZER_COVERAGE_SOURCES.map((source) => (
                    <button
                      key={`matchup-source-${source.key}`}
                      type="button"
                      className={`analyzer-coverage-option ${teamMatchupCoverageSource === source.key ? 'active' : ''}`}
                      aria-pressed={teamMatchupCoverageSource === source.key}
                      onClick={() => setTeamMatchupCoverageSource(source.key)}
                    >
                      {source.label}
                    </button>
                  ))}
                </div>
                <div className="analyzer-coverage-helper">{teamMatchupCoverageHelperText}</div>

                <div className="team-matchup-side-grid">
                  <div className="team-matchup-side-card">
                    <div className="team-matchup-side-title">Your Side</div>
                    <label className="team-matchup-label" htmlFor="team-matchup-player-source">Team Source</label>
                    <select
                      id="team-matchup-player-source"
                      className="feature-select team-matchup-select"
                      value={playerMatchupSource}
                      onChange={(event) => setPlayerMatchupSource(event.target.value)}
                    >
                      {TEAM_MATCHUP_PLAYER_SOURCE_OPTIONS.map((source) => (
                        <option key={`player-source-${source.key}`} value={source.key}>
                          {source.label}
                        </option>
                      ))}
                    </select>

                    {playerMatchupSource === 'preset' ? (
                      <>
                        <label className="team-matchup-label" htmlFor="team-matchup-player-preset-type">Preset Type</label>
                        <select
                          id="team-matchup-player-preset-type"
                          className="feature-select team-matchup-select"
                          value={playerPresetType}
                          onChange={(event) => setPlayerPresetType(event.target.value)}
                        >
                          {TEAM_MATCHUP_PRESET_OPTIONS.map((preset) => (
                            <option key={`player-preset-${preset.key}`} value={preset.key}>
                              {preset.label}
                            </option>
                          ))}
                        </select>

                        <label className="team-matchup-label" htmlFor="team-matchup-player-game">Game</label>
                        <select
                          id="team-matchup-player-game"
                          className="feature-select team-matchup-select"
                          value={playerPresetSelection.activeGame?.key || ''}
                          onChange={(event) => setPlayerPresetGameKey(event.target.value)}
                        >
                          {playerPresetSelection.dataset.games.map((game) => (
                            <option key={`player-game-${game.key}`} value={game.key}>
                              {game.name}
                            </option>
                          ))}
                        </select>

                        <label className="team-matchup-label" htmlFor="team-matchup-player-trainer">Gym/Elite Member</label>
                        <select
                          id="team-matchup-player-trainer"
                          className="feature-select team-matchup-select"
                          value={activePlayerTrainer?.key || ''}
                          onChange={(event) => setPlayerPresetTrainerKey(event.target.value)}
                        >
                          {playerPresetSelection.options.map((option) => (
                            <option key={option.key} value={option.key}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </>
                    ) : (
                      <div className="team-matchup-source-note">Uses the Pokemon currently in your Team Builder bar.</div>
                    )}
                  </div>

                  <div className="team-matchup-side-card">
                    <div className="team-matchup-side-title">Enemy Side</div>
                    <label className="team-matchup-label" htmlFor="team-matchup-enemy-source">Team Source</label>
                    <select
                      id="team-matchup-enemy-source"
                      className="feature-select team-matchup-select"
                      value={enemyMatchupSource}
                      onChange={(event) => setEnemyMatchupSource(event.target.value)}
                    >
                      {TEAM_MATCHUP_ENEMY_SOURCE_OPTIONS.map((source) => (
                        <option key={`enemy-source-${source.key}`} value={source.key}>
                          {source.label}
                        </option>
                      ))}
                    </select>

                    {enemyMatchupSource === 'preset' ? (
                      <>
                        <label className="team-matchup-label" htmlFor="team-matchup-enemy-preset-type">Preset Type</label>
                        <select
                          id="team-matchup-enemy-preset-type"
                          className="feature-select team-matchup-select"
                          value={enemyPresetType}
                          onChange={(event) => setEnemyPresetType(event.target.value)}
                        >
                          {TEAM_MATCHUP_PRESET_OPTIONS.map((preset) => (
                            <option key={`enemy-preset-${preset.key}`} value={preset.key}>
                              {preset.label}
                            </option>
                          ))}
                        </select>

                        <label className="team-matchup-label" htmlFor="team-matchup-enemy-game">Game</label>
                        <select
                          id="team-matchup-enemy-game"
                          className="feature-select team-matchup-select"
                          value={enemyPresetSelection.activeGame?.key || ''}
                          onChange={(event) => setEnemyPresetGameKey(event.target.value)}
                        >
                          {enemyPresetSelection.dataset.games.map((game) => (
                            <option key={`enemy-game-${game.key}`} value={game.key}>
                              {game.name}
                            </option>
                          ))}
                        </select>

                        <label className="team-matchup-label" htmlFor="team-matchup-enemy-trainer">Gym/Elite Member</label>
                        <select
                          id="team-matchup-enemy-trainer"
                          className="feature-select team-matchup-select"
                          value={activeEnemyTrainer?.key || ''}
                          onChange={(event) => setEnemyPresetTrainerKey(event.target.value)}
                        >
                          {enemyPresetSelection.options.map((option) => (
                            <option key={option.key} value={option.key}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </>
                    ) : enemyMatchupSource === 'custom' ? (
                      renderCustomMatchupTeamBuilder()
                    ) : (
                      <div className="team-matchup-source-note">Uses the Pokemon currently in your Team Builder bar.</div>
                    )}
                  </div>
                </div>

                {!teamMatchupCanRender ? (
                  <div className="analyzer-warning-card team-matchup-warning">
                    {teamMatchupNeedsCustomTeam
                      ? 'Build a custom enemy team to run the matchup.'
                      : teamMatchupNeedsPlayerTrainer || teamMatchupNeedsEnemyTrainer
                      ? 'Pick both preset trainers to run the matchup.'
                      : 'Both sides need at least one Pokemon to compute a matchup matrix.'}
                  </div>
                ) : (
                  <>
                    <div className="team-matchup-summary-grid">
                      <div className="team-matchup-summary-card">
                        <div className="team-matchup-summary-title">{playerMatchupTeamLabel}</div>
                        <div className="team-matchup-summary-copy">Pressure into enemy team</div>
                        <div className="team-matchup-summary-metrics">
                          <span className="team-matchup-pill favorable">SE {teamMatchupForwardSummary.favorable}</span>
                          <span className="team-matchup-pill neutral">Neutral {teamMatchupForwardSummary.neutral}</span>
                          <span className="team-matchup-pill resisted">Resisted {teamMatchupForwardSummary.resisted}</span>
                          <span className="team-matchup-pill immune">Immune {teamMatchupForwardSummary.immune}</span>
                          {teamMatchupForwardSummary.unknown > 0 ? (
                            <span className="team-matchup-pill unknown">Unknown {teamMatchupForwardSummary.unknown}</span>
                          ) : null}
                        </div>
                      </div>

                      <div className="team-matchup-summary-card">
                        <div className="team-matchup-summary-title">{enemyMatchupTeamLabel}</div>
                        <div className="team-matchup-summary-copy">Pressure into your team</div>
                        <div className="team-matchup-summary-metrics">
                          <span className="team-matchup-pill favorable">SE {teamMatchupReverseSummary.favorable}</span>
                          <span className="team-matchup-pill neutral">Neutral {teamMatchupReverseSummary.neutral}</span>
                          <span className="team-matchup-pill resisted">Resisted {teamMatchupReverseSummary.resisted}</span>
                          <span className="team-matchup-pill immune">Immune {teamMatchupReverseSummary.immune}</span>
                          {teamMatchupReverseSummary.unknown > 0 ? (
                            <span className="team-matchup-pill unknown">Unknown {teamMatchupReverseSummary.unknown}</span>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <div className="team-matchup-matrix-group">
                      <div className="team-matchup-matrix-title">Your Team Into Enemy Team</div>
                      <div className="team-matchup-table-shell">
                        <table className="team-matchup-table">
                          <thead>
                            <tr>
                              <th>Attacker</th>
                              {enemyMatchupTeam.map((member) => (
                                <th key={`forward-head-${member.key}`}>{member.name}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {playerMatchupTeam.map((attacker, attackerIndex) => (
                              <tr key={`forward-row-${attacker.key}`}>
                                <th>{attacker.name}</th>
                                {enemyMatchupTeam.map((defender, defenderIndex) => {
                                  const cell = teamMatchupForwardMatrix[attackerIndex]?.[defenderIndex]
                                  return (
                                    <td key={`forward-cell-${attacker.key}-${defender.key}`} className={`team-matchup-cell ${cell?.bucket || 'unknown'}`}>
                                      <div className="team-matchup-cell-value">{formatMatchupMultiplier(cell?.multiplier)}</div>
                                      {cell?.bestAttackType ? (
                                        <span className={`type-badge team-matchup-cell-type type-${cell.bestAttackType}`}>
                                          {formatDisplayName(cell.bestAttackType)}
                                        </span>
                                      ) : null}
                                    </td>
                                  )
                                })}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="team-matchup-matrix-group">
                      <div className="team-matchup-matrix-title">Enemy Team Into Your Team</div>
                      <div className="team-matchup-table-shell">
                        <table className="team-matchup-table">
                          <thead>
                            <tr>
                              <th>Attacker</th>
                              {playerMatchupTeam.map((member) => (
                                <th key={`reverse-head-${member.key}`}>{member.name}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {enemyMatchupTeam.map((attacker, attackerIndex) => (
                              <tr key={`reverse-row-${attacker.key}`}>
                                <th>{attacker.name}</th>
                                {playerMatchupTeam.map((defender, defenderIndex) => {
                                  const cell = teamMatchupReverseMatrix[attackerIndex]?.[defenderIndex]
                                  return (
                                    <td key={`reverse-cell-${attacker.key}-${defender.key}`} className={`team-matchup-cell ${cell?.bucket || 'unknown'}`}>
                                      <div className="team-matchup-cell-value">{formatMatchupMultiplier(cell?.multiplier)}</div>
                                      {cell?.bestAttackType ? (
                                        <span className={`type-badge team-matchup-cell-type type-${cell.bestAttackType}`}>
                                          {formatDisplayName(cell.bestAttackType)}
                                        </span>
                                      ) : null}
                                    </td>
                                  )
                                })}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                )}
              </aside>
            )}

            {showGymLeaders && (
              <aside className="gym-leaders-panel">
                <div className="gym-leaders-header">
                  <div className="gym-leaders-title">Gym Leaders</div>
                  <div className="gym-leaders-helper">{gymLeaderHelperText}</div>
                </div>

                {shouldShowGymLeaderGameSelect && (
                  <div className="gym-leaders-controls">
                    <label className="sr-only" htmlFor="gym-leader-game-select">
                      Select a game for gym data
                    </label>
                    <div className="feature-select-shell gym-leaders-select-shell">
                      <div className="feature-select feature-select-display gym-leaders-select">
                        {renderTrainerDatasetGameName(activeGymLeaderGame)}
                      </div>
                      <select
                        id="gym-leader-game-select"
                        className="feature-select feature-select-overlay gym-leaders-select"
                        value={activeGymLeaderGame?.key || selectedGymLeaderGame}
                        onChange={(event) => setSelectedGymLeaderGame(event.target.value)}
                      >
                        {dropdownGymLeaderGames.map((game) => (
                          <option key={game.key} value={game.key}>
                            {game.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                {renderTrainerEntryCards(displayedGymLeaders, activeGymLeaderGame, {
                  browsePokemonByApiName,
                  allKnownPokemonByApiName,
                  showShinySprites,
                  getPokemonDisplayVariant,
                  renderPokemonSprite,
                  formatDisplayName,
                  moveLookupByNormalizedName,
                  normalizeDisplayName
                })}
              </aside>
            )}

            {showEliteFour && (
              <aside className="elite-four-panel">
                <div className="gym-leaders-header">
                  <div className="gym-leaders-title">Elite Four</div>
                  <div className="gym-leaders-helper">{eliteFourHelperText}</div>
                </div>

                {shouldShowEliteFourGameSelect && (
                  <div className="gym-leaders-controls">
                    <label className="sr-only" htmlFor="elite-four-game-select">
                      Select a game for Elite Four data
                    </label>
                    <div className="feature-select-shell gym-leaders-select-shell">
                      <div className="feature-select feature-select-display gym-leaders-select">
                        {renderTrainerDatasetGameName(activeEliteFourGame)}
                      </div>
                      <select
                        id="elite-four-game-select"
                        className="feature-select feature-select-overlay gym-leaders-select"
                        value={activeEliteFourGame?.key || selectedEliteFourGame}
                        onChange={(event) => setSelectedEliteFourGame(event.target.value)}
                      >
                        {dropdownEliteFourGames.map((game) => (
                          <option key={game.key} value={game.key}>
                            {game.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                {renderTrainerEntryCards(displayedEliteFourEntries, activeEliteFourGame, {
                  browsePokemonByApiName,
                  allKnownPokemonByApiName,
                  showShinySprites,
                  getPokemonDisplayVariant,
                  renderPokemonSprite,
                  formatDisplayName,
                  moveLookupByNormalizedName,
                  normalizeDisplayName
                })}
              </aside>
            )}

            {showSavedTeams && (
              <aside className="saved-teams-section">
                <div className="saved-teams-header">
                  <div className="saved-teams-title">Saved Teams</div>
                  <div className="saved-teams-helper">
                    Save a lineup from the main team bar, then load it back in, export it, or import a shared code here.
                  </div>
                  <div className="saved-teams-storage-note">
                    Saved teams are stored in this browser only. They do not leave your device unless you export or share a team code. You can delete saved teams anytime from Saved Teams or by clearing browser data.
                  </div>
                  <div className="saved-teams-header-actions">
                    <button
                      type="button"
                      className="saved-team-action saved-team-action-secondary"
                      onClick={openImportTeamModal}
                    >
                      Import Team
                    </button>
                  </div>
                </div>

                {savedTeams.length === 0 ? (
                  <div className="saved-teams-empty-state">
                    No saved teams yet. Use the save button on your current lineup to store one.
                  </div>
                ) : (
                  <div className="saved-team-list">
                    {savedTeams.map((savedTeam) => {
                      const savedTeamCount = savedTeam.slots.filter(Boolean).length

                      return (
                        <article key={savedTeam.id} className="saved-team-card">
                          <div className="saved-team-card-header">
                            <div>
                              <div className="saved-team-name">{savedTeam.name}</div>
                              <div className="saved-team-meta">
                                {savedTeamCount}/{TEAM_SLOT_COUNT} Pokemon
                              </div>
                            </div>
                            <div className="saved-team-date">{formatSavedTeamTimestamp(savedTeam.savedAt)}</div>
                          </div>

                          <div className="saved-team-preview">
                            {savedTeam.slots.map((slot, index) => (
                              <div
                                key={`${savedTeam.id}-${index}`}
                                className={`saved-team-preview-slot ${slot ? 'filled' : ''}`}
                              >
                                {slot ? (
                                  <>
                                    <img
                                      src={slot.image}
                                      alt={slot.name}
                                      className={getPokemonSpriteClassName(slot, 'saved-team-preview-image')}
                                      loading="lazy"
                                    />
                                    <span className="saved-team-preview-name">{formatDisplayName(slot.name)}</span>
                                    {slot.heldItem && (
                                      <span className="saved-team-preview-item">
                                        <img
                                          src={slot.heldItem.image}
                                          alt={slot.heldItem.name}
                                          className="saved-team-preview-item-image"
                                          loading="lazy"
                                        />
                                        <span className="saved-team-preview-item-name">{slot.heldItem.name}</span>
                                      </span>
                                    )}
                                    {normalizeAssignedMoves(slot.moves).some(Boolean) && (
                                      <div className="saved-team-preview-moves">
                                        {normalizeAssignedMoves(slot.moves).map((move, moveIndex) => (
                                          <span
                                            key={`${slot.apiName}-saved-move-${move?.apiName || moveIndex}`}
                                            className={`saved-team-preview-move ${move ? 'filled' : 'empty'}`}
                                          >
                                            {move?.name || 'Empty'}
                                          </span>
                                        ))}
                                      </div>
                                    )}
                                  </>
                                ) : (
                                  <span className="saved-team-preview-empty">Empty</span>
                                )}
                              </div>
                            ))}
                          </div>

                          <div className="saved-team-actions">
                            <button
                              type="button"
                              className="saved-team-action saved-team-action-primary"
                              onClick={() => handleLoadSavedTeam(savedTeam)}
                            >
                              Load Into Slots
                            </button>
                            <button
                              type="button"
                              className="saved-team-action saved-team-action-secondary"
                              onClick={() => handleExportSavedTeam(savedTeam)}
                            >
                              Export Code
                            </button>
                            <button
                              type="button"
                              className="saved-team-action saved-team-action-danger"
                              onClick={() => handleDeleteSavedTeam(savedTeam)}
                            >
                              Delete
                            </button>
                          </div>
                        </article>
                      )
                    })}
                  </div>
                )}
              </aside>
            )}

            {showItemDatabase && (
              <aside className="item-database-section">
                <div className="item-database-header">
                  <div className="item-database-title">Item Database</div>
                  <div className="item-database-helper">
                    {itemTargetSelection
                      ? `Click a team slot to give it ${itemTargetSelection.name}.`
                      : 'Click an item to arm it, or hold Shift and hover a card to see what it does.'}
                  </div>
                </div>

                <div className="item-database-controls">
                  <input
                    type="text"
                    className="item-search-input"
                    placeholder="Search items..."
                    value={itemSearch}
                    onChange={(event) => setItemSearch(event.target.value)}
                  />
                  <div className="item-database-count">
                    {itemsLoading ? 'Loading items...' : `${filteredItems.length} items`}
                  </div>
                </div>

                {itemsLoading ? (
                  <LoadingIndicator label="Loading items..." />
                ) : filteredItems.length === 0 ? (
                  <div className="loading">No items match that search.</div>
                ) : (
                  <div className="item-grid">
                    {filteredItems.map((item) => (
                      <div
                        key={item.id}
                        className={`item-card ${itemTargetSelection?.apiName === item.apiName ? 'armed' : ''}`}
                        onClick={() => handleItemCardClick(item)}
                        onMouseEnter={(event) => handleItemHoverStart(item, event)}
                        onMouseLeave={handleItemHoverEnd}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="item-card-image"
                          loading="lazy"
                          onError={(event) => {
                            event.currentTarget.style.display = 'none'
                          }}
                        />
                        <div className="item-card-name">{item.name}</div>
                      </div>
                    ))}
                  </div>
                )}
              </aside>
            )}

            {showMoveDatabase && (
              <aside className="move-database-section">
                <div className="move-database-header">
                  <div className="move-database-title">Move Database</div>
                  <div className="move-database-helper">
                    {moveTargetSelection
                      ? `Click a team slot${showComparison && enemyMatchupSource === 'custom' ? ', a custom matchup slot,' : ''} or one of its four move slots to teach ${moveTargetSelection.name}. ${getMoveAssignmentRuleText()}`
                      : 'Search, filter, or sort any move.'}
                  </div>
                </div>

                <div className="move-database-controls">
                  <input
                    type="text"
                    className="item-search-input move-search-input"
                    placeholder="Search moves or types..."
                    value={moveSearch}
                    onChange={(event) => setMoveSearch(event.target.value)}
                  />
                  <div className="move-database-secondary-row">
                    <div className="move-database-filters">
                      <select
                        className="move-filter-select"
                        value={selectedMoveType}
                        onChange={(event) => setSelectedMoveType(event.target.value)}
                      >
                        <option value="all">All Types</option>
                        {moveTypeFilterOptions.map((type) => (
                          <option key={type} value={type}>
                            {formatDisplayName(type)}
                          </option>
                        ))}
                      </select>
                      <select
                        className="move-filter-select"
                        value={selectedMoveCategory}
                        onChange={(event) => setSelectedMoveCategory(event.target.value)}
                      >
                        <option value="all">All Classes</option>
                        {moveCategoryFilterOptions.map((category) => (
                          <option key={category} value={category}>
                            {formatDisplayName(category)}
                          </option>
                        ))}
                      </select>
                      <select
                        className="move-filter-select"
                        value={selectedMoveSort}
                        onChange={(event) => setSelectedMoveSort(event.target.value)}
                      >
                        <option value="alpha-asc">A-Z</option>
                        <option value="alpha-desc">Z-A</option>
                        <option value="power-asc">Power (Ascending)</option>
                        <option value="power-desc">Power (Descending)</option>
                      </select>
                    </div>
                    <div className="item-database-count move-database-count">
                      {moveDatabaseCountLabel}
                    </div>
                  </div>
                </div>

                {movesLoading ? (
                  <LoadingIndicator label="Loading moves..." />
                ) : displayedMoves.length === 0 ? (
                  <div className="loading">{moveDatabaseEmptyStateText}</div>
                ) : (
                  <div className="move-grid">
                    {displayedMoves.map((move) => (
                      <div
                        key={move.id}
                        className={`move-card ${moveTargetSelection?.apiName === move.apiName ? 'armed' : ''}`}
                        onClick={() => handleMoveCardClick(move)}
                        onMouseEnter={(event) => handleMoveHoverStart(move, event)}
                        onMouseLeave={handleMoveHoverEnd}
                      >
                        <div className="move-card-name">{move.name}</div>
                        <div className="move-card-meta">
                          <span className={`type-badge move-card-type type-${move.type}`}>
                            {formatDisplayName(move.type)}
                          </span>
                          <span
                            className={`item-hover-badge move-category-badge move-card-category move-category-${move.category.toLowerCase()}`}
                          >
                            {move.category}
                          </span>
                          <span className="move-card-pp">PP {move.pp}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </aside>
            )}
          </div>
        )}
      </div>

      {activeBuildEditorPokemon && (
        <div className="save-team-modal-backdrop" onClick={closeTeamBuildEditor}>
          <div
            className="save-team-modal team-build-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="save-team-modal-header">
              <div className="save-team-modal-title">Build {formatDisplayName(activeBuildEditorPokemon.name)}</div>
              <div className="save-team-modal-helper">
                Choose a nature and assign EVs directly. The comparer now uses each Pokemon's base stats and BST.
              </div>
            </div>

            <div className="team-build-summary-panel">
              <div className="team-build-summary-chip">
                <span className="team-build-summary-label">Nature</span>
                <span>{activeBuildEditorSummary?.nature.label || 'Hardy'}</span>
              </div>
              <div className="team-build-summary-chip">
                <span className="team-build-summary-label">EV Total</span>
                <span>{activeBuildEditorSummary?.evTotal || 0} / 510</span>
              </div>
            </div>

            <div className="team-build-section">
              <label className="save-team-label" htmlFor="team-build-nature">
                Nature
              </label>
              <select
                id="team-build-nature"
                className="save-team-input team-build-select"
                value={normalizeTeamNature(activeBuildEditorPokemon.nature)}
                onChange={(event) => updateTeamPokemonNature(editingBuildSlotIndex, event.target.value)}
              >
                {TEAM_NATURES.map((nature) => (
                  <option key={nature.key} value={nature.key}>
                    {nature.label}
                    {nature.increase && nature.decrease ? ` (+${BUILD_STAT_ROWS.find((stat) => stat.key === nature.increase)?.label}, -${BUILD_STAT_ROWS.find((stat) => stat.key === nature.decrease)?.label})` : ''}
                  </option>
                ))}
              </select>
            </div>

            <div className="team-build-grid">
              <div className="team-build-card">
                <div className="team-build-card-header">
                  <div className="team-build-card-title">EV Spread</div>
                  <button
                    type="button"
                    className="save-team-modal-button save-team-modal-button-secondary team-build-inline-button"
                    onClick={() => resetTeamPokemonEvs(editingBuildSlotIndex)}
                  >
                    Clear EVs
                  </button>
                </div>
                <div className="team-build-card-helper">
                  Keep the total at or under 510, with no more than 252 in any single stat.
                </div>
                <div className="team-build-stat-grid">
                  {BUILD_STAT_ROWS.map((stat) => (
                    <label key={`ev-${stat.key}`} className="team-build-stat-field">
                      <span className="team-build-stat-label">{stat.label}</span>
                      <input
                        type="number"
                        min="0"
                        max="252"
                        className="save-team-input team-build-number-input"
                        value={activeBuildEditorEvs[stat.key]}
                        onChange={(event) => updateTeamPokemonEv(editingBuildSlotIndex, stat.key, event.target.value)}
                      />
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="save-team-modal-actions">
              <button
                type="button"
                className="save-team-modal-button save-team-modal-button-primary"
                onClick={closeTeamBuildEditor}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {showSaveTeamModal && (
        <div className="save-team-modal-backdrop" onClick={closeSaveTeamModal}>
          <div
            className="save-team-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="save-team-modal-header">
              <div className="save-team-modal-title">
                {existingPendingSavedTeam ? 'Replace Saved Team' : 'Save Team'}
              </div>
              <div className="save-team-modal-helper">
                Team items and all four move slots are saved with each Pokemon and will return when you load this lineup.
              </div>
            </div>

            <form className="save-team-form" onSubmit={submitSaveTeam}>
              <label className="save-team-label" htmlFor="save-team-name">
                Team Name
              </label>
              <input
                id="save-team-name"
                type="text"
                className="save-team-input"
                value={pendingTeamName}
                onChange={(event) => setPendingTeamName(event.target.value)}
                placeholder="Give this team a name..."
                autoFocus
              />
              {existingPendingSavedTeam && pendingTeamName.trim() && (
                <div className="save-team-warning">
                  Saving with this name will replace the existing "{existingPendingSavedTeam.name}" team.
                </div>
              )}

              <div className="save-team-modal-actions">
                <button
                  type="button"
                  className="save-team-modal-button save-team-modal-button-secondary"
                  onClick={closeSaveTeamModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="save-team-modal-button save-team-modal-button-primary"
                  disabled={!pendingTeamName.trim()}
                >
                  {existingPendingSavedTeam ? 'Replace Team' : 'Save Team'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {pendingLoadTeam && (
        <div className="save-team-modal-backdrop" onClick={closeLoadTeamModal}>
          <div
            className="save-team-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="save-team-modal-header">
              <div className="save-team-modal-title">Load Saved Team</div>
              <div className="save-team-modal-helper">
                "{pendingLoadTeam.name}" will be loaded into your current six slots, including any attached held items and assigned moves.
              </div>
            </div>

            <div className="save-team-warning">
              Your current lineup will be replaced when you load this team.
            </div>

            <div className="save-team-modal-actions">
              <button
                type="button"
                className="save-team-modal-button save-team-modal-button-secondary"
                onClick={closeLoadTeamModal}
              >
                Cancel
              </button>
              <button
                type="button"
                className="save-team-modal-button save-team-modal-button-primary"
                onClick={() => applyLoadSavedTeam(pendingLoadTeam)}
              >
                Load Team
              </button>
            </div>
          </div>
        </div>
      )}

      {pendingDeleteTeam && (
        <div className="save-team-modal-backdrop" onClick={closeDeleteTeamModal}>
          <div
            className="save-team-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="save-team-modal-header">
              <div className="save-team-modal-title">Delete Saved Team</div>
              <div className="save-team-modal-helper">
                "{pendingDeleteTeam.name}" will be removed from your saved teams list.
              </div>
            </div>

            <div className="save-team-warning save-team-warning-danger">
              This deletes the saved copy only. Your current active lineup will stay exactly as it is.
            </div>

            <div className="save-team-modal-actions">
              <button
                type="button"
                className="save-team-modal-button save-team-modal-button-secondary"
                onClick={closeDeleteTeamModal}
              >
                Cancel
              </button>
              <button
                type="button"
                className="save-team-modal-button save-team-modal-button-danger"
                onClick={confirmDeleteSavedTeam}
              >
                Delete Team
              </button>
            </div>
          </div>
        </div>
      )}

      {pendingExportTeam && (
        <div className="save-team-modal-backdrop" onClick={closeExportTeamModal}>
          <div
            className="save-team-modal save-team-modal-wide"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="save-team-modal-header">
              <div className="save-team-modal-title">Export Team</div>
              <div className="save-team-modal-helper">
                "{pendingExportTeam.name}" is packaged into a compressed share code below. Copy it and send it to a friend, then they can paste it into Import Team on their side.
              </div>
            </div>

            <label className="save-team-label" htmlFor="team-export-text">
              Share Code
            </label>
            <textarea
              id="team-export-text"
              className="save-team-input save-team-textarea"
              value={teamExportText}
              readOnly
            />
            {teamExportStatus && (
              <div className="save-team-note">{teamExportStatus}</div>
            )}

            <div className="save-team-modal-actions">
              <button
                type="button"
                className="save-team-modal-button save-team-modal-button-secondary"
                onClick={closeExportTeamModal}
              >
                Close
              </button>
              <button
                type="button"
                className="save-team-modal-button save-team-modal-button-primary"
                onClick={copyExportTeamText}
                disabled={!teamExportText}
              >
                Copy Code
              </button>
            </div>
          </div>
        </div>
      )}

      {showImportTeamModal && (
        <div className="save-team-modal-backdrop" onClick={closeImportTeamModal}>
          <div
            className="save-team-modal save-team-modal-wide"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="save-team-modal-header">
              <div className="save-team-modal-title">Import Team</div>
              <div className="save-team-modal-helper">
                Paste a compressed team code exported from this planner and it will be added to your saved teams without needing an account. Older JSON export codes still work too.
              </div>
            </div>

            <form className="save-team-form" onSubmit={submitImportTeam}>
              <label className="save-team-label" htmlFor="import-team-text">
                Team Code
              </label>
              <textarea
                id="import-team-text"
                className="save-team-input save-team-textarea"
                value={importTeamText}
                onChange={(event) => {
                  setImportTeamText(event.target.value)
                  if (importTeamError) {
                    setImportTeamError('')
                  }
                }}
                placeholder="Paste a shared team code here..."
                autoFocus
              />
              {importTeamError && (
                <div className="save-team-warning save-team-warning-danger">
                  {importTeamError}
                </div>
              )}

              <div className="save-team-modal-actions">
                <button
                  type="button"
                  className="save-team-modal-button save-team-modal-button-secondary"
                  onClick={closeImportTeamModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="save-team-modal-button save-team-modal-button-primary"
                  disabled={!importTeamText.trim()}
                >
                  Import Team
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showTeamFullModal && (
        <div className="save-team-modal-backdrop" onClick={() => setShowTeamFullModal(false)}>
          <div
            className="save-team-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="save-team-modal-header">
              <div className="save-team-modal-title">Your Team Is Full</div>
              <div className="save-team-modal-helper">
                All six team slots are already filled. Remove a Pokemon or load a different team before adding another one.
              </div>
            </div>

            <div className="save-team-note team-full-note">
              The current lineup stays exactly as it is. This just means there isn’t an open slot for a seventh Pokemon yet.
            </div>

            <div className="save-team-modal-actions">
              <button
                type="button"
                className="save-team-modal-button save-team-modal-button-primary"
                onClick={() => setShowTeamFullModal(false)}
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}

      {shiftPressed && hoveredPokemonCard?.pokemon && (
        <div
          className="pokemon-hover-card"
          ref={hoverCardRef}
          style={hoverCardStyle}
          onMouseEnter={cancelHoverCardClose}
          onMouseLeave={scheduleHoverCardClose}
        >
          <div className="pokemon-hover-header">
            {renderPokemonSprite(hoveredPokemonCard.pokemon, {
              baseClassName: 'pokemon-hover-image',
              stackClassName: 'pokemon-hover-image-stack',
              animateOnHover: true,
              alt: hoveredPokemonCard.pokemon.name
            })}
            <div className="pokemon-hover-heading">
              <div className="pokemon-hover-name">{hoveredPokemonCard.pokemon.name}</div>
              <div className="pokemon-hover-types">
                {hoveredPokemonCard.pokemon.types.map((type) => (
                  <span key={type} className={`type-badge type-${type}`}>
                    {formatDisplayName(type)}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="pokemon-hover-body">
            <div className="pokemon-hover-column pokemon-hover-column-primary">
              <div className="pokemon-hover-section">
                <div className="pokemon-hover-section-title">Base Stats</div>
                <div className="pokemon-hover-stats-chart">
                  <div className="pokemon-hover-stat-scale">
                    <div className="pokemon-hover-stat-scale-spacer"></div>
                    <div className="pokemon-hover-stat-scale-spacer"></div>
                    <div className="pokemon-hover-stat-scale-bar-label">Base</div>
                    <div className="pokemon-hover-stat-scale-marker">Min</div>
                    <div className="pokemon-hover-stat-scale-marker">Max</div>
                  </div>
                  {hoverStats.map((stat) => (
                    <div key={stat.key} className="pokemon-hover-stat-row">
                      <div className="pokemon-hover-stat-label">{stat.label}</div>
                      <div className="pokemon-hover-stat-value">{stat.value}</div>
                      <div className="pokemon-hover-stat-bar-track">
                        <div
                          className={`pokemon-hover-stat-bar ${getStatBarColorClass(stat.value)}`}
                          style={{ width: `${Math.max(10, (stat.value / 255) * 100)}%` }}
                        ></div>
                      </div>
                      <div className="pokemon-hover-stat-min">{getStatMin(stat.key, stat.value)}</div>
                      <div className="pokemon-hover-stat-max">{getStatMax(stat.key, stat.value)}</div>
                    </div>
                  ))}
                  <div className="pokemon-hover-stat-row total-row">
                    <div className="pokemon-hover-stat-label">BST</div>
                    <div className="pokemon-hover-stat-value">{hoverBst}</div>
                    <div className="pokemon-hover-stat-bar-track total-track">
                      <div
                        className="pokemon-hover-stat-bar total"
                        style={{ width: `${Math.max(12, Math.min(100, (hoverBst / 780) * 100))}%` }}
                      ></div>
                    </div>
                    <div className="pokemon-hover-stat-min">180</div>
                    <div className="pokemon-hover-stat-max">780</div>
                  </div>
                </div>
              </div>

              {renderPokemonProfileSummary(hoverProfileDetails)}

              <div className="pokemon-hover-section">
                <div className="pokemon-hover-section-title">Evolution Line</div>
                {hoveredPokemonInfo ? (
                  <div className="pokemon-hover-evolution">
                    {hoveredPokemonInfo.evolutionLine.map((entry, index) => (
                      <Fragment key={`${entry.name}-${index}`}>
                        <div
                          className={`pokemon-hover-evolution-item ${
                            normalizeDisplayName(entry.name) === hoveredPokemonNameKey ? 'current' : ''
                          }`}
                        >
                          <div className="pokemon-hover-evolution-name">{entry.name}</div>
                          <div className="pokemon-hover-evolution-requirement">{entry.requirement}</div>
                        </div>
                        {index < hoveredPokemonInfo.evolutionLine.length - 1 && (
                          <div className="pokemon-hover-evolution-connector">
                            <span>evolves into</span>
                          </div>
                        )}
                      </Fragment>
                    ))}
                  </div>
                ) : (
                  <div className="pokemon-hover-loading">Loading evolution line...</div>
                )}
              </div>

              <div className="pokemon-hover-section">
                <div className="pokemon-hover-section-title">Abilities</div>
                {hoverAbilities.length > 0 ? (
                  <div className="pokemon-hover-abilities">
                    <div className="pokemon-hover-ability-list">
                      {hoverAbilities.map((ability) => (
                        <button
                          key={`${ability.name}-${ability.isHidden ? 'hidden' : 'standard'}`}
                          type="button"
                          className={`pokemon-hover-ability ${ability.isHidden ? 'hidden' : ''}`}
                          onMouseEnter={() => setHoveredAbility(ability)}
                          onMouseLeave={() => setHoveredAbility((current) => (current?.name === ability.name ? null : current))}
                        >
                          <span>{ability.name}</span>
                          {ability.isHidden && <span className="pokemon-hover-ability-tag">Hidden</span>}
                        </button>
                      ))}
                    </div>
                    <div className="pokemon-hover-ability-tooltip">
                      {hoveredAbility?.effect || 'Hover an ability to see what it does.'}
                    </div>
                  </div>
                ) : (
                  <div className="pokemon-hover-loading">Loading abilities...</div>
                )}
              </div>

              <div className="pokemon-hover-section">
                <div className="pokemon-hover-section-title">Current Build</div>
                <div className="pokemon-build-preview-card">
                  <div className="pokemon-build-preview-header">
                    <div className="pokemon-build-preview-nature">
                      {hoveredPokemonBuildSummary?.nature.label || 'Hardy'} Nature
                    </div>
                  </div>

                  <div className="pokemon-build-preview-grid">
                    <div className="pokemon-profile-card">
                      <div className="pokemon-profile-label">Ability</div>
                      <div className="pokemon-profile-value">
                        {hoveredPokemonBuildAbility?.displayName || 'Loading...'}
                      </div>
                    </div>
                    <div className="pokemon-profile-card">
                      <div className="pokemon-profile-label">EVs</div>
                      <div className="pokemon-profile-value">
                        {hoveredPokemonBuildSummary?.evSummary || 'No EVs'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {renderPokemonEncounterSummary(hoverProfileDetails)}

            </div>

            <div className="pokemon-hover-column pokemon-hover-column-secondary">
              {renderPokemonLevelUpLearnset(hoveredPokemonCard.pokemon, hoverLearnsetDetails)}

              {hoveredPokemonCard.pokemon.heldItem && (
                <div className="pokemon-hover-section">
                  <div className="pokemon-hover-section-title">Held Item</div>
                  <div className="item-hover-inline">
                    <img
                      src={hoveredPokemonCard.pokemon.heldItem.image}
                      alt={hoveredPokemonCard.pokemon.heldItem.name}
                      className="item-hover-inline-image"
                    />
                    <div className="item-hover-inline-copy">
                      <div className="item-hover-inline-name">{hoveredPokemonCard.pokemon.heldItem.name}</div>
                      <div className="pokemon-hover-loading">
                        {itemInfoCache[hoveredPokemonCard.pokemon.heldItem.apiName]?.effect || 'Loading item details...'}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="pokemon-hover-section">
                <div className="pokemon-hover-section-title">Games</div>
                <div className="pokemon-hover-games">
                  {hoverGames.length > 0 ? (
                    <ul className="pokemon-hover-games-list">
                      {hoverGames.map((game) => (
                        <li
                          key={`${hoveredPokemonCard.pokemon.name}-${game.key}`}
                          className={`pokemon-hover-game-item gen-${game.systemClass}`}
                        >
                          <span className="pokemon-hover-game-name" style={{ color: game.color }}>
                            {game.name}
                          </span>
                          {game.dlcSection ? <span className="pokemon-hover-game-tag">{game.dlcSection}</span> : null}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="pokemon-hover-loading">No tracked game availability yet.</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {shiftPressed && hoveredItemCard?.item && !hoveredPokemonCard?.pokemon && (
        <div
          className="pokemon-hover-card item-hover-card"
          ref={hoverCardRef}
          style={hoverCardStyle}
          onMouseEnter={cancelHoverCardClose}
          onMouseLeave={scheduleHoverCardClose}
        >
          <div className="pokemon-hover-header">
            <img
              src={hoveredItemCard.item.image}
              alt={hoveredItemCard.item.name}
              className="pokemon-hover-image item-hover-image"
            />
            <div className="pokemon-hover-heading">
              <div className="pokemon-hover-name">{hoveredItemCard.item.name}</div>
              <div className="item-hover-meta">
                <span className="item-hover-badge">
                  {hoveredItemInfo?.category || 'Loading category...'}
                </span>
              </div>
            </div>
          </div>

          <div className="pokemon-hover-section">
            <div className="pokemon-hover-section-title">Effect</div>
            <div className="item-hover-description">
              {hoveredItemInfo?.effect || 'Loading item details...'}
            </div>
          </div>
        </div>
      )}

      {shiftPressed && hoveredMove && !hoveredPokemonCard?.pokemon && !hoveredItemCard?.item && (
        <div
          className="pokemon-hover-card move-hover-card"
          ref={hoverCardRef}
          style={hoverCardStyle}
          onMouseEnter={cancelHoverCardClose}
          onMouseLeave={scheduleHoverCardClose}
        >
          <div className="pokemon-hover-header">
            <div className="pokemon-hover-heading move-hover-heading">
              <div className="pokemon-hover-name">{hoveredMove.name}</div>
              <div className="item-hover-meta">
                <span className={`type-badge move-card-type type-${hoveredMove.type}`}>
                  {formatDisplayName(hoveredMove.type)}
                </span>
                <span
                  className={`item-hover-badge move-category-badge move-category-${hoveredMove.category.toLowerCase()}`}
                >
                  {hoveredMove.category}
                </span>
              </div>
            </div>
          </div>

          <div className="pokemon-hover-section">
            <div className="pokemon-hover-section-title">Move Stats</div>
            <div className="move-hover-stats">
              <div className="move-hover-stat-card">
                <span className="move-hover-stat-label">Power</span>
                <span className="move-hover-stat-value">{hoveredMove.power}</span>
              </div>
              <div className="move-hover-stat-card">
                <span className="move-hover-stat-label">Accuracy</span>
                <span className="move-hover-stat-value">{hoveredMove.accuracy}</span>
              </div>
              <div className="move-hover-stat-card">
                <span className="move-hover-stat-label">PP</span>
                <span className="move-hover-stat-value">{hoveredMove.pp}</span>
              </div>
            </div>
          </div>

          <div className="pokemon-hover-section">
            <div className="pokemon-hover-section-title">Effect</div>
            <div className="move-hover-description">{hoveredMove.effect}</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
