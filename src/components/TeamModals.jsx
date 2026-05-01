export function TeamModals({
  activeBuildEditorEvs,
  activeBuildEditorPokemon,
  activeBuildEditorSummary,
  applyLoadSavedTeam,
  BUILD_STAT_ROWS,
  closeDeleteTeamModal,
  closeExportTeamModal,
  closeImportTeamModal,
  closeLoadTeamModal,
  closeSaveTeamModal,
  closeTeamBuildEditor,
  confirmDeleteSavedTeam,
  copyExportTeamText,
  editingBuildSlotIndex,
  existingPendingSavedTeam,
  formatDisplayName,
  importTeamError,
  importTeamText,
  pendingDeleteTeam,
  pendingExportTeam,
  pendingLoadTeam,
  pendingTeamName,
  normalizeTeamNature,
  resetTeamPokemonEvs,
  setImportTeamError,
  setImportTeamText,
  setPendingTeamName,
  setShowTeamFullModal,
  showImportTeamModal,
  showSaveTeamModal,
  showTeamFullModal,
  submitImportTeam,
  submitSaveTeam,
  teamExportStatus,
  teamExportText,
  TEAM_NATURES,
  updateTeamPokemonEv,
  updateTeamPokemonNature
}) {
  return (
    <>
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
    </>
  )
}
