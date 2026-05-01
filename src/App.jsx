import { Fragment, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import selectmusicSrc from './sfx/selectmusic.wav'
import pokeclickSrc from './sfx/pokeclick.wav'
import { FeatureMenu } from './components/FeatureMenu.jsx'
import { TeamModals } from './components/TeamModals.jsx'
import { HoverCards } from './components/HoverCards.jsx'
import {
  ANALYZER_COVERAGE_SOURCES,
  BUILD_STAT_ROWS,
  buildBrowsePokemonEntry,
  buildImportedTeamName,
  bulbapediaAvailability,
  clampInteger,
  cloneTeamSlots,
  createAssignedMoveEntry,
  createTeamPokemonEntry,
  DEFAULT_GAME_PICKER_HOVER_SCALE,
  DEFAULT_TEAM_EVS,
  defensiveTypeChart,
  DESIGN_TEMPLATES,
  drawRoundedRectPath,
  dropdownEliteFourGames,
  dropdownGymLeaderGames,
  eliteFourByGame,
  eliteFourGameGroupByGameKey,
  eliteFourGameLookup,
  eliteFourGames,
  EMPTY_MOVE_VALUE,
  extractEnglishEffectText,
  fetchPokemonPanelInfo,
  fitCanvasText,
  formatDisplayName,
  formatEncounterLevelRange,
  formatSavedTeamTimestamp,
  GAME_REGION_BY_KEY,
  gameAvailabilityRules,
  gameDlcSectionConfigs,
  gamePickerMascotSpeciesIds,
  gamePickerMascotSpriteConfigs,
  gameVersionGroupMap,
  generationDlcSections,
  generationGameDetails,
  generations,
  getAssignedMovesForPokemon,
  getChampionsPokemonOrderIndex,
  getDisplayedDexNumber,
  getEnglishEffectText,
  getGamePickerSpriteUrls,
  getPokemonBst,
  getPokemonBuildSummary,
  getPokemonCacheKey,
  getPokemonCardStyle,
  getPokemonCoverageTypesFromMoves,
  getPokemonCoverageTypesFromOwnTypes,
  getPokemonDisplayVariant,
  getPokemonEvs,
  getPokemonSpriteClassName,
  getPokemonStatRows,
  getRegionColorClassName,
  getResourceIdFromUrl,
  getSlotTypeStyle,
  getStatBarColorClass,
  getStatMax,
  getStatMin,
  getTeamSnapshotSignature,
  gymLeaderGameGroupByGameKey,
  gymLeaderGameLookup,
  gymLeaderGames,
  gymLeadersByGame,
  hisuiSpecialPokemonNames,
  isAvailabilityCodeIncluded,
  isBattleRelevantItem,
  isDlcOnlyAvailabilityCode,
  isMegaPokemon,
  isPokemonInChampionsRoster,
  isRegionalVariantPokemon,
  LEGACY_SAVED_TEAMS_STORAGE_KEY,
  legendsArceusIntroducedEntries,
  loadCachedPokemonBrowseData,
  legendsZaBaseDexes,
  legendsZaMegaPokemonNames,
  legendsZaRegionalVariantNames,
  MAX_SAVED_TEAM_NAME_LENGTH,
  MAX_SAVED_TEAMS,
  megaEntries,
  MOVE_GENERATION_TO_NUMBER,
  normalizeAssignedMoves,
  normalizeDisplayName,
  normalizeTeamNature,
  parseImportedTeamPayload,
  POKEMON_FETCH_BATCH_SIZE,
  readSavedTeamsFromStorage,
  regionalVariantEntries,
  regionGameDetails,
  renderPokemonSprite,
  renderTrainerEntryCards,
  sanitizeStorageText,
  SAVED_TEAMS_SCHEMA_VERSION,
  SAVED_TEAMS_STORAGE_KEY,
  serializeSavedTeamForStorage,
  serializeTeamSlots,
  singleFormGamePickerKeys,
  sortPokemonEntries,
  sortSavedTeams,
  SPECIAL_POKEMON_FETCH_BATCH_SIZE,
  specialGameSections,
  stringifyTeamSharePayload,
  TEAM_BUILD_LEVEL,
  TEAM_EXPORT_SCALE,
  TEAM_EXPORT_SLOT_GAP,
  TEAM_EXPORT_SLOT_HEIGHT,
  TEAM_EXPORT_SLOT_WIDTH,
  TEAM_HISTORY_LIMIT,
  TEAM_MATCHUP_ENEMY_SOURCE_OPTIONS,
  TEAM_MATCHUP_PLAYER_SOURCE_OPTIONS,
  TEAM_MATCHUP_PRESET_OPTIONS,
  TEAM_NATURES,
  TEAM_SHARE_COMPRESSED_PREFIX,
  TEAM_SLOT_COUNT,
  teamExportMoveTypeTextColors,
  toGameKey,
  typeEffectiveness,
  versionGroupSortIndex
} from './appSupport.jsx'

function App() {
  const [pokemonByGen, setPokemonByGen] = useState({})
  const [pokemonInfoCache, setPokemonInfoCache] = useState({})
  const [team, setTeam] = useState(() => Array(TEAM_SLOT_COUNT).fill(null))
  const [teamHistoryPast, setTeamHistoryPast] = useState([])
  const [teamHistoryFuture, setTeamHistoryFuture] = useState([])
  const [loading, setLoading] = useState(true)
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
  const [, setComparisonHoveredAbilities] = useState([null, null])
  const [musicVolume, setMusicVolume] = useState(0)
  const [clickVolume, setClickVolume] = useState(0)
  const clickVolumeRef = useRef(0)
  const musicAudioRef = useRef(null)
  const musicRestartTimerRef = useRef(null)
  const menuRef = useRef(null)
  const hoverCardCloseTimeoutRef = useRef(null)
  const hoverMenuTimerRef = useRef(null)
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

    const loadPokemon = async () => {
      try {
        const { cachedPokemonByGen, hasCachedPokemonBrowseData } = await loadCachedPokemonBrowseData()

        if (cancelled) {
          return
        }

        if (hasCachedPokemonBrowseData) {
          setPokemonByGen(cachedPokemonByGen)
          setLoading(false)
          return
        }
      } catch (error) {
        console.error('Error loading cached Pokemon data:', error)
      }

      if (!cancelled) {
        fetchPokemon()
      }
    }

    loadPokemon()

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
    const handleWindowBlur = () => {
      setShiftPressed(false)
      if (hoverMenuTimerRef.current) {
        clearTimeout(hoverMenuTimerRef.current)
        hoverMenuTimerRef.current = null
      }
      setHoveredRegion(null)
      setHoveredGeneration(null)
      setHoveredPokemonCard(null)
      setHoveredItemCard(null)
      setHoveredMoveCard(null)
      setHoveredLearnsetMove(null)
    }

    window.addEventListener('blur', handleWindowBlur)

    return () => {
      window.removeEventListener('blur', handleWindowBlur)
    }
  }, [])

  useEffect(() => {
    const audio = new Audio(selectmusicSrc)
    audio.volume = musicVolume
    musicAudioRef.current = audio

    const handleEnded = () => {
      musicRestartTimerRef.current = setTimeout(() => {
        audio.currentTime = 0
        audio.play().catch(() => {})
      }, 3000)
    }

    audio.addEventListener('ended', handleEnded)

    if (musicVolume > 0) {
      audio.play().catch(() => {})
    }

    return () => {
      audio.removeEventListener('ended', handleEnded)
      audio.pause()
      if (musicRestartTimerRef.current) clearTimeout(musicRestartTimerRef.current)
    }
  }, [])

  useEffect(() => {
    if (!musicAudioRef.current) return
    musicAudioRef.current.volume = musicVolume
    if (musicVolume > 0) {
      if (musicAudioRef.current.paused) {
        musicAudioRef.current.play().catch(() => {})
      }
    } else {
      musicAudioRef.current.pause()
      if (musicRestartTimerRef.current) {
        clearTimeout(musicRestartTimerRef.current)
        musicRestartTimerRef.current = null
      }
    }
  }, [musicVolume])

  useEffect(() => {
    clickVolumeRef.current = clickVolume
  }, [clickVolume])

  useEffect(() => {
    const handleDocumentClick = () => {
      const vol = clickVolumeRef.current
      if (vol === 0) return
      try {
        const audio = new Audio(pokeclickSrc)
        audio.volume = vol
        audio.play()
      } catch (error) {
        console.error('Error playing click sound:', error)
      }
    }
    document.addEventListener('click', handleDocumentClick)
    return () => document.removeEventListener('click', handleDocumentClick)
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
    if (!team[slotIndex] || !Object.hasOwn(DEFAULT_TEAM_EVS, statKey)) {
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

  const startHoverMenuDelay = () => {
    if (hoverMenuTimerRef.current) clearTimeout(hoverMenuTimerRef.current)
    hoverMenuTimerRef.current = setTimeout(() => {
      setShiftPressed(true)
      hoverMenuTimerRef.current = null
    }, 500)
  }

  const scheduleHoverMenuCancel = () => {
    if (hoverMenuTimerRef.current) clearTimeout(hoverMenuTimerRef.current)
    hoverMenuTimerRef.current = setTimeout(() => {
      setShiftPressed(false)
      hoverMenuTimerRef.current = null
    }, 150)
  }

  const keepHoverMenuOpen = () => {
    if (hoverMenuTimerRef.current) {
      clearTimeout(hoverMenuTimerRef.current)
      hoverMenuTimerRef.current = null
    }
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
    startHoverMenuDelay()
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
    scheduleHoverMenuCancel()
    scheduleHoverCardClose()
  }

  const handleItemHoverStart = (item, event) => {
    cancelHoverCardClose()
    startHoverMenuDelay()
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
    scheduleHoverMenuCancel()
    scheduleHoverCardClose()
  }

  const handleMoveHoverStart = (move, event) => {
    cancelHoverCardClose()
    startHoverMenuDelay()
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
    scheduleHoverMenuCancel()
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
            activeHoverCard.rect.right + 3 + hoverCardSize.width <= window.innerWidth - 16
              ? activeHoverCard.rect.right + 3
              : activeHoverCard.rect.left - hoverCardSize.width - 3,
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
  const isPokemonCurrentlyHovered = (pokemon) =>
    Boolean(
      pokemon &&
      hoveredPokemonCard?.pokemon &&
      getPokemonCacheKey(pokemon) === getPokemonCacheKey(hoveredPokemonCard.pokemon)
    )

  return (
    <div className={`app-shell theme-${activeDesignTemplate} ${darkUiMode ? 'dark-ui' : ''}`}>
      <FeatureMenu
        clickVolume={clickVolume}
        DESIGN_TEMPLATES={DESIGN_TEMPLATES}
        generations={generations}
        includeZaMegas={includeZaMegas}
        menuOpen={menuOpen}
        menuRef={menuRef}
        musicVolume={musicVolume}
        selectedDesignTemplate={selectedDesignTemplate}
        selectedGeneration={selectedGeneration}
        setClickVolume={setClickVolume}
        setIncludeZaMegas={setIncludeZaMegas}
        setMenuOpen={setMenuOpen}
        setMusicVolume={setMusicVolume}
        setSelectedDesignTemplate={setSelectedDesignTemplate}
        setSelectedGeneration={setSelectedGeneration}
        setShowAnalyzer={setShowAnalyzer}
        setShowComparison={setShowComparison}
        setShowEliteFour={setShowEliteFour}
        setShowGymLeaders={setShowGymLeaders}
        setShowItemDatabase={setShowItemDatabase}
        setShowMoveDatabase={setShowMoveDatabase}
        setShowSavedTeams={setShowSavedTeams}
        setShowShinySprites={setShowShinySprites}
        setShowSuggestedAdditions={setShowSuggestedAdditions}
        setShowTypeColoredCards={setShowTypeColoredCards}
        setSortByGeneration={setSortByGeneration}
        showAnalyzer={showAnalyzer}
        showComparison={showComparison}
        showEliteFour={showEliteFour}
        showGamePicker={showGamePicker}
        showGymLeaders={showGymLeaders}
        showItemDatabase={showItemDatabase}
        showMoveDatabase={showMoveDatabase}
        showSavedTeams={showSavedTeams}
        showShinySprites={showShinySprites}
        showSuggestedAdditions={showSuggestedAdditions}
        showTypeColoredCards={showTypeColoredCards}
        sortByGeneration={sortByGeneration}
      />

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
                PokeTeamPro
              </span>
              <br />
              <span className="page-subtitle">Pokemon{' '}Team{' '}Builder</span>
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
                      style={pokemon ? getSlotTypeStyle(pokemon) : undefined}
                      onClick={() => handleTeamSlotClick(pokemon, index)}
                      onMouseEnter={(event) => pokemon && handlePokemonHoverStart(pokemon, event)}
                      onMouseLeave={handlePokemonHoverEnd}
                    >
                      {pokemon ? (
                        <>
                          <button
                            type="button"
                            className="slot-remove-button"
                            onClick={(event) => {
                              event.stopPropagation()
                              removeFromTeam(index)
                            }}
                            title={`Remove ${formatDisplayName(pokemon.name)}`}
                          >×</button>
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
                            onMouseEnter={() => { setHoveredRegion(section.key); startHoverMenuDelay() }}
                            onMouseLeave={() => { setHoveredRegion((current) => (current === section.key ? null : current)); scheduleHoverMenuCancel() }}
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
                            onMouseEnter={() => { setHoveredGeneration(section.key); startHoverMenuDelay() }}
                            onMouseLeave={() => { setHoveredGeneration(current => (current === section.key ? null : current)); scheduleHoverMenuCancel() }}
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

      <TeamModals
        activeBuildEditorEvs={activeBuildEditorEvs}
        activeBuildEditorPokemon={activeBuildEditorPokemon}
        activeBuildEditorSummary={activeBuildEditorSummary}
        applyLoadSavedTeam={applyLoadSavedTeam}
        BUILD_STAT_ROWS={BUILD_STAT_ROWS}
        closeDeleteTeamModal={closeDeleteTeamModal}
        closeExportTeamModal={closeExportTeamModal}
        closeImportTeamModal={closeImportTeamModal}
        closeLoadTeamModal={closeLoadTeamModal}
        closeSaveTeamModal={closeSaveTeamModal}
        closeTeamBuildEditor={closeTeamBuildEditor}
        confirmDeleteSavedTeam={confirmDeleteSavedTeam}
        copyExportTeamText={copyExportTeamText}
        editingBuildSlotIndex={editingBuildSlotIndex}
        existingPendingSavedTeam={existingPendingSavedTeam}
        formatDisplayName={formatDisplayName}
        importTeamError={importTeamError}
        importTeamText={importTeamText}
        pendingDeleteTeam={pendingDeleteTeam}
        pendingExportTeam={pendingExportTeam}
        pendingLoadTeam={pendingLoadTeam}
        pendingTeamName={pendingTeamName}
        normalizeTeamNature={normalizeTeamNature}
        resetTeamPokemonEvs={resetTeamPokemonEvs}
        setImportTeamError={setImportTeamError}
        setImportTeamText={setImportTeamText}
        setPendingTeamName={setPendingTeamName}
        setShowTeamFullModal={setShowTeamFullModal}
        showImportTeamModal={showImportTeamModal}
        showSaveTeamModal={showSaveTeamModal}
        showTeamFullModal={showTeamFullModal}
        submitImportTeam={submitImportTeam}
        submitSaveTeam={submitSaveTeam}
        teamExportStatus={teamExportStatus}
        teamExportText={teamExportText}
        TEAM_NATURES={TEAM_NATURES}
        updateTeamPokemonEv={updateTeamPokemonEv}
        updateTeamPokemonNature={updateTeamPokemonNature}
      />

      <HoverCards
        cancelHoverCardClose={cancelHoverCardClose}
        formatDisplayName={formatDisplayName}
        formatEncounterLevelRange={formatEncounterLevelRange}
        gamesList={gamesList}
        getLevelUpLearnsetForPokemon={getLevelUpLearnsetForPokemon}
        getStatBarColorClass={getStatBarColorClass}
        getStatMax={getStatMax}
        getStatMin={getStatMin}
        hoverAbilities={hoverAbilities}
        hoverBst={hoverBst}
        hoverCardRef={hoverCardRef}
        hoverCardStyle={hoverCardStyle}
        hoveredAbility={hoveredAbility}
        hoveredItemCard={hoveredItemCard}
        hoveredItemInfo={hoveredItemInfo}
        hoveredLearnsetMove={hoveredLearnsetMove}
        hoveredLearnsetMoveInfo={hoveredLearnsetMoveInfo}
        hoveredMove={hoveredMove}
        hoveredPokemonCard={hoveredPokemonCard}
        hoveredPokemonInfo={hoveredPokemonInfo}
        hoveredPokemonNameKey={hoveredPokemonNameKey}
        hoverGames={hoverGames}
        hoverLearnsetDetails={hoverLearnsetDetails}
        hoverProfileDetails={hoverProfileDetails}
        hoverStats={hoverStats}
        itemInfoCache={itemInfoCache}
        keepHoverMenuOpen={keepHoverMenuOpen}
        normalizeDisplayName={normalizeDisplayName}
        renderPokemonSprite={renderPokemonSprite}
        scheduleHoverCardClose={scheduleHoverCardClose}
        scheduleHoverMenuCancel={scheduleHoverMenuCancel}
        selectedGame={selectedGame}
        selectedGameDetails={selectedGameDetails}
        setHoveredAbility={setHoveredAbility}
        setHoveredLearnsetMove={setHoveredLearnsetMove}
        shiftPressed={shiftPressed}
      />
    </div>
  )
}

export default App
