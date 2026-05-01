import { Fragment } from 'react'
import {
  PokemonEncounterSummary,
  PokemonLevelUpLearnset,
  PokemonProfileSummary
} from './PokemonHoverSections.jsx'

export function HoverCards({
  cancelHoverCardClose,
  formatDisplayName,
  formatEncounterLevelRange,
  gamesList,
  getLevelUpLearnsetForPokemon,
  getStatBarColorClass,
  getStatMax,
  getStatMin,
  hoverAbilities,
  hoverBst,
  hoverCardRef,
  hoverCardStyle,
  hoveredAbility,
  hoveredItemCard,
  hoveredItemInfo,
  hoveredLearnsetMove,
  hoveredLearnsetMoveInfo,
  hoveredMove,
  hoveredPokemonCard,
  hoveredPokemonInfo,
  hoveredPokemonNameKey,
  hoverGames,
  hoverLearnsetDetails,
  hoverProfileDetails,
  hoverStats,
  itemInfoCache,
  keepHoverMenuOpen,
  normalizeDisplayName,
  renderPokemonSprite,
  scheduleHoverCardClose,
  scheduleHoverMenuCancel,
  selectedGame,
  selectedGameDetails,
  setHoveredAbility,
  setHoveredLearnsetMove,
  shiftPressed
}) {
  return (
    <>
      {shiftPressed && hoveredPokemonCard?.pokemon && (
        <div
          className="pokemon-hover-card"
          ref={hoverCardRef}
          style={hoverCardStyle}
          onMouseEnter={() => { cancelHoverCardClose(); keepHoverMenuOpen() }}
          onMouseLeave={() => { scheduleHoverCardClose(); scheduleHoverMenuCancel() }}
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

              {<PokemonProfileSummary profileDetails={hoverProfileDetails} />}

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

            <div className="pokemon-hover-column pokemon-hover-column-secondary">
              {<PokemonLevelUpLearnset
                formatDisplayName={formatDisplayName}
                getLevelUpLearnsetForPokemon={getLevelUpLearnsetForPokemon}
                hoveredLearnsetMove={hoveredLearnsetMove}
                hoveredLearnsetMoveInfo={hoveredLearnsetMoveInfo}
                learnsetDetails={hoverLearnsetDetails}
                pokemon={hoveredPokemonCard.pokemon}
                setHoveredLearnsetMove={setHoveredLearnsetMove}
              />}

              {<PokemonEncounterSummary
                formatEncounterLevelRange={formatEncounterLevelRange}
                gamesList={gamesList}
                profileDetails={hoverProfileDetails}
                selectedGame={selectedGame}
                selectedGameDetails={selectedGameDetails}
              />}

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
            </div>
          </div>
        </div>
      )}

      {shiftPressed && hoveredItemCard?.item && !hoveredPokemonCard?.pokemon && (
        <div
          className="pokemon-hover-card item-hover-card"
          ref={hoverCardRef}
          style={hoverCardStyle}
          onMouseEnter={() => { cancelHoverCardClose(); keepHoverMenuOpen() }}
          onMouseLeave={() => { scheduleHoverCardClose(); scheduleHoverMenuCancel() }}
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
          onMouseEnter={() => { cancelHoverCardClose(); keepHoverMenuOpen() }}
          onMouseLeave={() => { scheduleHoverCardClose(); scheduleHoverMenuCancel() }}
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
    </>
  )
}
