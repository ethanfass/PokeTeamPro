export function FeatureMenu({
  clickVolume,
  DESIGN_TEMPLATES,
  generations,
  includeZaMegas,
  menuOpen,
  menuRef,
  musicVolume,
  selectedDesignTemplate,
  selectedGeneration,
  setClickVolume,
  setIncludeZaMegas,
  setMenuOpen,
  setMusicVolume,
  setSelectedDesignTemplate,
  setSelectedGeneration,
  setShowAnalyzer,
  setShowComparison,
  setShowEliteFour,
  setShowGymLeaders,
  setShowItemDatabase,
  setShowMoveDatabase,
  setShowSavedTeams,
  setShowShinySprites,
  setShowSuggestedAdditions,
  setShowTypeColoredCards,
  setSortByGeneration,
  showAnalyzer,
  showComparison,
  showEliteFour,
  showGamePicker,
  showGymLeaders,
  showItemDatabase,
  showMoveDatabase,
  showSavedTeams,
  showShinySprites,
  showSuggestedAdditions,
  showTypeColoredCards,
  sortByGeneration
}) {
  return (
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
          <div className="feature-menu-section feature-menu-section-sound">
            <div className="feature-menu-group-label">Sound</div>
            <div className="feature-sound-controls">
              <label className="feature-volume-row">
                <span className="feature-volume-label">Music</span>
                <input
                  type="range"
                  className="feature-volume-slider"
                  min={0}
                  max={1}
                  step={0.01}
                  value={musicVolume}
                  onChange={(event) => setMusicVolume(Number(event.target.value))}
                />
                <span className="feature-volume-value">{Math.round(musicVolume * 100)}</span>
              </label>
              <label className="feature-volume-row">
                <span className="feature-volume-label">Click</span>
                <input
                  type="range"
                  className="feature-volume-slider"
                  min={0}
                  max={1}
                  step={0.01}
                  value={clickVolume}
                  onChange={(event) => setClickVolume(Number(event.target.value))}
                />
                <span className="feature-volume-value">{Math.round(clickVolume * 100)}</span>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
