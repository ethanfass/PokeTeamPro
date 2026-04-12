import { Fragment, useState, useEffect, useRef } from 'react'
import './App.css'
import pokeballIcon from '../assets/pokeball.png'

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
      { name: 'FireRed', color: '#ea642f' },
      { name: 'LeafGreen', color: '#5f9d3b' }
    ]
  },
  4: {
    games: [
      { name: 'Diamond', color: '#5c8ce8' },
      { name: 'Pearl', color: '#d78fad' },
      { name: 'Platinum', color: '#8c95a7' },
      { name: 'HeartGold', color: '#c78f29' },
      { name: 'SoulSilver', color: '#8a98ab' }
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
      { name: 'Shining Pearl', color: '#d98bac' },
      { name: 'Legends Arceus', color: '#8f6d41' }
    ]
  },
  9: {
    games: [
      { name: 'Scarlet', color: '#cb423f' },
      { name: 'Violet', color: '#7950d1' }
    ]
  }
}

const gameAvailabilityRules = {
  red: {
    excludeSpecies: ['sandshrew', 'sandslash', 'vulpix', 'ninetales', 'meowth', 'persian', 'bellsprout', 'weepinbell', 'victreebel', 'magmar', 'pinsir']
  },
  blue: {
    excludeSpecies: ['ekans', 'arbok', 'oddish', 'gloom', 'vileplume', 'mankey', 'primeape', 'growlithe', 'arcanine', 'scyther', 'electabuzz']
  },
  sun: {
    includePokemon: [{ pokemonName: 'raichu-alola', displayName: 'Alolan Raichu', generation: 7 }]
  },
  moon: {
    includePokemon: [{ pokemonName: 'raichu-alola', displayName: 'Alolan Raichu', generation: 7 }]
  },
  'ultra-sun': {
    includePokemon: [{ pokemonName: 'raichu-alola', displayName: 'Alolan Raichu', generation: 7 }]
  },
  'ultra-moon': {
    includePokemon: [{ pokemonName: 'raichu-alola', displayName: 'Alolan Raichu', generation: 7 }]
  }
}

const toGameKey = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

const formatDisplayName = (value) =>
  value
    .split(/[- ]+/)
    .map(part => (part ? part.charAt(0).toUpperCase() + part.slice(1) : ''))
    .join(' ')

const normalizeDisplayName = (value = '') => value.toLowerCase().replace(/[^a-z0-9]+/g, '')

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

    return parts.length > 0 ? parts.join(' • ') : 'Special'
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

const getPokemonCacheKey = (pokemon) => pokemon.apiName || String(pokemon.id)

function App() {
  const [pokemonByGen, setPokemonByGen] = useState({})
  const [specialPokemon, setSpecialPokemon] = useState({})
  const [pokemonInfoCache, setPokemonInfoCache] = useState({})
  const [team, setTeam] = useState([null, null, null, null, null, null])
  const [loading, setLoading] = useState(true)
  const [teamTypes, setTeamTypes] = useState({ coverage: [], weaknesses: {} })
  const [menuOpen, setMenuOpen] = useState(false)
  const [showAnalyzer, setShowAnalyzer] = useState(false)
  const [sortByGeneration, setSortByGeneration] = useState(false)
  const [sortByGame, setSortByGame] = useState(false)
  const [selectedGeneration, setSelectedGeneration] = useState('all')
  const [selectedGame, setSelectedGame] = useState('all')
  const [shiftPressed, setShiftPressed] = useState(false)
  const [hoveredGeneration, setHoveredGeneration] = useState(null)
  const [hoveredAnalyzer, setHoveredAnalyzer] = useState(null)
  const [hoveredPokemonCard, setHoveredPokemonCard] = useState(null)
  const menuRef = useRef(null)

  const typesList = ['normal', 'fighting', 'flying', 'poison', 'ground', 'rock', 'bug', 'ghost', 'steel', 'fire', 'water', 'grass', 'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy']

  const generations = [
    { name: 'Kanto', gen: 1, range: [1, 151] },
    { name: 'Johto', gen: 2, range: [152, 251] },
    { name: 'Hoenn', gen: 3, range: [252, 386] },
    { name: 'Sinnoh', gen: 4, range: [387, 493] },
    { name: 'Unova', gen: 5, range: [494, 649] },
    { name: 'Kalos', gen: 6, range: [650, 721] },
    { name: 'Alola', gen: 7, range: [722, 809] },
    { name: 'Galar', gen: 8, range: [810, 898] },
    { name: 'Paldea', gen: 9, range: [899, 1025] },
  ]

  useEffect(() => {
    const fetchPokemon = async () => {
      const grouped = {}
      const specialPokemonMap = {}
      const uniqueSpecialPokemon = Array.from(
        new Map(
          Object.values(gameAvailabilityRules)
            .flatMap(rule => rule.includePokemon || [])
            .map(entry => [entry.pokemonName, entry])
        ).values()
      )

      for (const gen of generations) {
        grouped[gen.gen] = {
          name: gen.name,
          pokemon: []
        }

        const [start, end] = gen.range
        for (let i = start; i <= end; i++) {
          try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
            const data = await response.json()
            grouped[gen.gen].pokemon.push({
              id: data.id,
              name: data.name,
              apiName: data.name,
              image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`,
              types: data.types.map(t => t.type.name),
              stats: Object.fromEntries(data.stats.map(stat => [stat.stat.name, stat.base_stat])),
              speciesUrl: data.species.url
            })
          } catch (error) {
            console.error(`Error fetching Pokemon ${i}:`, error)
          }
        }
      }

      for (const specialEntry of uniqueSpecialPokemon) {
        try {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${specialEntry.pokemonName}`)
          const data = await response.json()
          specialPokemonMap[specialEntry.pokemonName] = {
            id: data.id,
            name: specialEntry.displayName,
            apiName: data.name,
            image:
              data.sprites.other?.['official-artwork']?.front_default ||
              data.sprites.front_default,
            types: data.types.map(t => t.type.name),
            stats: Object.fromEntries(data.stats.map(stat => [stat.stat.name, stat.base_stat])),
            speciesUrl: data.species.url
          }
        } catch (error) {
          console.error(`Error fetching special Pokemon ${specialEntry.pokemonName}:`, error)
        }
      }

      setPokemonByGen(grouped)
      setSpecialPokemon(specialPokemonMap)
      setLoading(false)
    }

    fetchPokemon()
  }, [])

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
      setHoveredGeneration(null)
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
    if (!shiftPressed || !hoveredPokemonCard?.pokemon) {
      return undefined
    }

    const pokemon = hoveredPokemonCard.pokemon
    const cacheKey = getPokemonCacheKey(pokemon)

    if (pokemonInfoCache[cacheKey]) {
      return undefined
    }

    let cancelled = false

    const fetchPokemonInfo = async () => {
      try {
        const speciesResponse = await fetch(pokemon.speciesUrl || `https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}`)
        const speciesData = await speciesResponse.json()
        const evolutionResponse = await fetch(speciesData.evolution_chain.url)
        const evolutionData = await evolutionResponse.json()

        if (cancelled) {
          return
        }

        setPokemonInfoCache((current) => ({
          ...current,
          [cacheKey]: {
            evolutionLine: buildEvolutionLine(evolutionData.chain)
          }
        }))
      } catch (error) {
        console.error(`Error fetching hover card info for ${pokemon.name}:`, error)
      }
    }

    fetchPokemonInfo()

    return () => {
      cancelled = true
    }
  }, [hoveredPokemonCard, shiftPressed, pokemonInfoCache])

  const addToTeam = (pokemonData) => {
    const emptySlot = team.findIndex(slot => slot === null)

    if (emptySlot === -1) {
      alert('Your team is full! Remove a Pokemon to add another.')
      return
    }

    const newTeam = [...team]
    newTeam[emptySlot] = pokemonData
    setTeam(newTeam)
    calculateTeamTypes(newTeam)
  }

  const removePokemonById = (pokemonId) => {
    const slotIndex = team.findIndex(p => p && p.id === pokemonId)
    if (slotIndex === -1) {
      return
    }

    const newTeam = [...team]
    newTeam[slotIndex] = null
    setTeam(newTeam)
    calculateTeamTypes(newTeam)
  }

  const removeFromTeam = (slotIndex) => {
    const newTeam = [...team]
    newTeam[slotIndex] = null
    setTeam(newTeam)
    calculateTeamTypes(newTeam)
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

  const pokemonProvidesCoverage = (pokemon, targetType) => {
    return pokemon.types.some((type) => typeEffectiveness[type]?.strong.includes(targetType))
  }

  const pokemonIsWeakToType = (pokemon, attackingType) => {
    return getCombinedTypeMultiplier(attackingType, pokemon.types) > 1
  }

  const calculateTeamTypes = (currentTeam) => {
    const coverageCount = {}
    const weaknessCount = {}

    currentTeam.forEach(pokemon => {
      if (pokemon) {
        pokemon.types.forEach(type => {
          const effectiveness = typeEffectiveness[type]
          if (effectiveness) {
            effectiveness.strong.forEach(t => {
              coverageCount[t] = (coverageCount[t] || 0) + 1
            })
          }
        })

        typesList.forEach((attackingType) => {
          if (pokemonIsWeakToType(pokemon, attackingType)) {
            weaknessCount[attackingType] = (weaknessCount[attackingType] || 0) + 1
          }
        })
      }
    })

    setTeamTypes({
      coverage: coverageCount,
      weaknesses: weaknessCount
    })
  }

  const isInTeam = (pokemonId) => {
    return team.some(p => p && p.id === pokemonId)
  }

  const teamCount = team.filter(p => p !== null).length

  const coverageTypes = typesList
    .map(type => ({
      type,
      count: teamTypes.coverage[type] || 0
    }))
    .sort((a, b) => b.count - a.count)

  const weaknessTypes = typesList
    .map(type => ({
      type,
      count: teamTypes.weaknesses[type] || 0
    }))
    .sort((a, b) => b.count - a.count)

  const gamesList = generations.flatMap((gen) =>
    generationGameDetails[gen.gen].games.map((game) => ({
      ...game,
      key: toGameKey(game.name),
      gen: gen.gen,
      region: gen.name,
      systemClass: gen.gen <= 5 ? 'pixel' : '3d'
    }))
  )

  const selectedGameDetails = gamesList.find((game) => game.key === selectedGame) || null

  const visibleGenerations = generations.filter((gen) => {
    if (sortByGeneration && selectedGeneration !== 'all') {
      return String(gen.gen) === selectedGeneration
    }

    if (sortByGame && selectedGameDetails) {
      return gen.gen === selectedGameDetails.gen
    }

    return true
  })

  const getAvailablePokemonForGeneration = (gen) => {
    const generationPokemon = pokemonByGen[gen.gen]?.pokemon || []

    if (!sortByGame || !selectedGameDetails) {
      return generationPokemon
    }

    const rule = gameAvailabilityRules[selectedGameDetails.key] || {}
    const excludedSpecies = new Set(rule.excludeSpecies || [])

    const filteredPokemon = generationPokemon.filter((pokemon) => !excludedSpecies.has(pokemon.name))
    const includedPokemon = (rule.includePokemon || [])
      .filter((entry) => entry.generation === gen.gen)
      .map((entry) => specialPokemon[entry.pokemonName])
      .filter(Boolean)

    return [...filteredPokemon, ...includedPokemon]
  }

  const getPokemonHighlightClass = (pokemon) => {
    if (!isPokemonHighlighted(pokemon)) {
      return ''
    }

    return hoveredAnalyzer?.kind === 'weakness' ? 'highlighted-weakness' : 'highlighted-coverage'
  }

  const togglePokemonSelection = (pokemon) => {
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

  const handlePokemonHoverStart = (pokemon, event) => {
    const rect = event.currentTarget.getBoundingClientRect()
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
    setHoveredPokemonCard(null)
  }

  const hoveredPokemonInfo = hoveredPokemonCard?.pokemon
    ? pokemonInfoCache[getPokemonCacheKey(hoveredPokemonCard.pokemon)] || null
    : null

  const hoverCardStyle = hoveredPokemonCard
    ? {
        top: `${Math.max(16, Math.min(hoveredPokemonCard.rect.top, window.innerHeight - 470))}px`,
        left: `${Math.max(
          16,
          Math.min(
            hoveredPokemonCard.rect.right + 16,
            window.innerWidth - 360
          )
        )}px`
      }
    : {}

  const hoverStats = hoveredPokemonCard?.pokemon?.stats
    ? [
        { key: 'hp', label: 'HP', value: hoveredPokemonCard.pokemon.stats.hp },
        { key: 'attack', label: 'Atk', value: hoveredPokemonCard.pokemon.stats.attack },
        { key: 'defense', label: 'Def', value: hoveredPokemonCard.pokemon.stats.defense },
        { key: 'special-attack', label: 'SpA', value: hoveredPokemonCard.pokemon.stats['special-attack'] },
        { key: 'special-defense', label: 'SpD', value: hoveredPokemonCard.pokemon.stats['special-defense'] },
        { key: 'speed', label: 'Spe', value: hoveredPokemonCard.pokemon.stats.speed }
      ]
    : []

  const hoverBst = hoverStats.reduce((sum, stat) => sum + stat.value, 0)
  const hoveredPokemonNameKey = hoveredPokemonCard?.pokemon
    ? normalizeDisplayName(hoveredPokemonCard.pokemon.name)
    : ''

  return (
    <div className="app-shell">
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
                checked={sortByGeneration}
                onChange={(event) => {
                  const checked = event.target.checked
                  setSortByGeneration(checked)
                  if (checked) {
                    setSortByGame(false)
                    setSelectedGame('all')
                  } else {
                    setSelectedGeneration('all')
                  }
                }}
              />
              <span>Sort by Gen</span>
            </label>
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
            <label className="feature-toggle">
              <input
                type="checkbox"
                checked={sortByGame}
                onChange={(event) => {
                  const checked = event.target.checked
                  setSortByGame(checked)
                  if (checked) {
                    setSortByGeneration(false)
                    setSelectedGeneration('all')
                  } else {
                    setSelectedGame('all')
                  }
                }}
              />
              <span>Sort by Game</span>
            </label>
            {sortByGame && (
              <select
                className="feature-select"
                value={selectedGame}
                onChange={(event) => setSelectedGame(event.target.value)}
              >
                <option value="all">All Games</option>
                {gamesList.map((game) => (
                  <option key={game.key} value={game.key}>
                    {game.name}
                  </option>
                ))}
              </select>
            )}
          </div>
        )}
      </div>

      <div className={`app-wrapper ${showAnalyzer ? 'with-analyzer' : 'centered-layout'}`}>
        <div className="app-container">
          <header className="page-header">
            <div className="page-header-brand">
              <img src={pokeballIcon} alt="" className="page-header-icon" />
              <h1>Pokemon Team Builder</h1>
            </div>
          </header>

          <div className="team-section">
            <div className="team-title">Your Team</div>
            <div className="team-count">
              Team Size: <span className={teamCount === 6 ? 'team-count-full' : ''}>{teamCount}</span>/6
            </div>
            <div className="team-slots-scroll">
              <div className="team-slots">
                {team.map((pokemon, index) => (
                  <div
                    key={index}
                    className={`slot ${pokemon ? 'filled' : ''} ${pokemon ? getPokemonHighlightClass(pokemon) : ''}`}
                    onClick={() => pokemon && removeFromTeam(index)}
                    onMouseEnter={(event) => pokemon && handlePokemonHoverStart(pokemon, event)}
                    onMouseLeave={handlePokemonHoverEnd}
                  >
                    {pokemon ? (
                      <>
                        <img
                          src={pokemon.image}
                          alt={pokemon.name}
                          className="slot-pokemon-image"
                        />
                        <div className="slot-name">{pokemon.name}</div>
                      </>
                    ) : (
                      <span className="empty-slot-text">Empty Slot</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pokemon-grid">
            <div className="pokemon-title">Select Pokemon by Generation</div>
            <div className="pokemon-helper">
              {sortByGame && selectedGameDetails
                ? `Showing ${selectedGameDetails.name} from ${selectedGameDetails.region}, including game-specific availability. Hold Shift while hovering the blue generation text to see its games.`
                : 'Hold Shift while hovering the blue generation text to see its games.'}
            </div>
            {loading ? (
              <div className="loading">Loading Pokemon...</div>
            ) : (
              <div className="generations-container">
                {visibleGenerations.map((gen) => (
                  pokemonByGen[gen.gen] && getAvailablePokemonForGeneration(gen).length > 0 && (
                    <div key={gen.gen} className="generation-section">
                      <div className="generation-header">
                        <h2 className="generation-title">
                          <span className="generation-region">{gen.name}</span>{' '}
                          <span className="generation-separator">-</span>{' '}
                          <span
                            className={`generation-meta ${hoveredGeneration === gen.gen ? 'active' : ''}`}
                            onMouseEnter={() => setHoveredGeneration(gen.gen)}
                            onMouseLeave={() => setHoveredGeneration(current => (current === gen.gen ? null : current))}
                          >
                            Gen {gen.gen}
                            {shiftPressed && hoveredGeneration === gen.gen && (
                              <div className="generation-games-popover">
                                <div className="generation-games-label">Games:</div>
                                <ul className="generation-games-list">
                                  {generationGameDetails[gen.gen].games.map((game) => (
                                    <li
                                      key={game.name}
                                      className={`generation-game-item gen-${gen.gen <= 5 ? 'pixel' : '3d'}`}
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
                      <div className="pokemon-list">
                        {getAvailablePokemonForGeneration(gen).map((poke) => (
                          <div
                            key={`${gen.gen}-${poke.id}-${poke.name}`}
                            className={`pokemon-card ${isInTeam(poke.id) ? 'in-team' : ''}`}
                            onClick={() => togglePokemonSelection(poke)}
                            style={{ cursor: 'pointer' }}
                            onMouseEnter={(event) => handlePokemonHoverStart(poke, event)}
                            onMouseLeave={handlePokemonHoverEnd}
                          >
                            <img src={poke.image} alt={poke.name} className="pokemon-image" />
                            <div className="pokemon-name">{poke.name}</div>
                            <div className="pokemon-id">#{poke.id}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                ))}
              </div>
            )}
          </div>
        </div>

        {showAnalyzer && (
          <aside className="type-analyzer">
            <div className="analyzer-title">Type Analyzer</div>

            <div className="analyzer-panels">
              <div className="analyzer-section analyzer-column">
                <h3 className="analyzer-header">Type Coverage</h3>
                <div className="type-bars-compact">
                  {coverageTypes.map(({ type, count }) => (
                    <div
                      key={type}
                      className={`type-bar-row ${hoveredAnalyzer?.kind === 'coverage' && hoveredAnalyzer.type === type ? 'active' : ''}`}
                      onMouseEnter={() => setHoveredAnalyzer({ kind: 'coverage', type })}
                      onMouseLeave={() => setHoveredAnalyzer(null)}
                    >
                      <div className="type-bar-label-inline">{type.charAt(0).toUpperCase() + type.slice(1)}:</div>
                      <div className="type-bar-container-inline">
                        {[...Array(6)].map((_, i) => (
                          <div
                            key={i}
                            className={`type-bar-segment type-${type} ${i < count ? 'filled' : ''}`}
                          ></div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="analyzer-section analyzer-column">
                <h3 className="analyzer-header">Weak To</h3>
                <div className="type-bars-compact">
                  {weaknessTypes.map(({ type, count }) => (
                    <div
                      key={type}
                      className={`type-bar-row ${hoveredAnalyzer?.kind === 'weakness' && hoveredAnalyzer.type === type ? 'active' : ''}`}
                      onMouseEnter={() => setHoveredAnalyzer({ kind: 'weakness', type })}
                      onMouseLeave={() => setHoveredAnalyzer(null)}
                    >
                      <div className="type-bar-label-inline weakness-label">{type.charAt(0).toUpperCase() + type.slice(1)}:</div>
                      <div className="type-bar-container-inline">
                        {[...Array(6)].map((_, i) => (
                          <div
                            key={i}
                            className={`type-bar-segment type-${type} weakness-bar ${i < count ? 'filled' : ''}`}
                          ></div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        )}
      </div>

      {shiftPressed && hoveredPokemonCard?.pokemon && (
        <div className="pokemon-hover-card" style={hoverCardStyle}>
          <div className="pokemon-hover-header">
            <img
              src={hoveredPokemonCard.pokemon.image}
              alt={hoveredPokemonCard.pokemon.name}
              className="pokemon-hover-image"
            />
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
            <div className="pokemon-hover-section-title">Games</div>
            <div className="pokemon-hover-games"></div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
