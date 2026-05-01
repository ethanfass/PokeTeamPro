export function PokemonProfileSummary({ profileDetails, includeEggGroups = true }) {
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

export function PokemonEncounterSummary({
  formatEncounterLevelRange,
  gamesList,
  profileDetails,
  selectedGame,
  selectedGameDetails
}) {
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

export function PokemonLevelUpLearnset({
  formatDisplayName,
  getLevelUpLearnsetForPokemon,
  hoveredLearnsetMove,
  hoveredLearnsetMoveInfo,
  learnsetDetails,
  pokemon,
  setHoveredLearnsetMove
}) {
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
