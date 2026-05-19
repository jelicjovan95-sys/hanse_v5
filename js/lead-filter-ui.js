/**
 * Lead Filter UI
 * 
 * Dynamically generates filter interface from schema.
 * Handles filter modal, controls rendering, chips, and results count.
 */

let currentFilterGroup = null;
let filteredLeadsCache = [];

/**
 * Open the filter modal
 */
function openFilterModal() {
    const modal = document.getElementById('filterModalBackdrop');
    if (!modal) {
        console.error('Filter modal not found in DOM');
        return;
    }

    // Initialize with first group
    const groups = getFilterGroups();
    if (groups.length > 0) {
        currentFilterGroup = groups[0];
    }

    renderFilterGroups();
    renderFilterControls();
    updateResultsCount();

    modal.classList.add('open');
}

/**
 * Close the filter modal
 */
function closeFilterModal() {
    const modal = document.getElementById('filterModalBackdrop');
    if (modal) {
        modal.classList.remove('open');
    }
}

/**
 * Render filter groups in left sidebar
 */
function renderFilterGroups() {
    const sidebar = document.getElementById('filterSidebar');
    if (!sidebar) return;

    const groups = getFilterGroups();

    sidebar.innerHTML = groups.map(group => {
        const isActive = group === currentFilterGroup;
        const fieldCount = getFieldsByGroup(group).length;

        // Count active filters in this group
        const activeCount = getFieldsByGroup(group).filter(field =>
            FilterState.activeFilters[field.key]
        ).length;

        return `
      <div class="filter-group-item ${isActive ? 'active' : ''}" onclick="selectFilterGroup('${group}')">
        <div class="filter-group-title">${group}</div>
        <div class="filter-group-meta">
          <span class="filter-group-count">${fieldCount} fields</span>
          ${activeCount > 0 ? `<span class="filter-group-badge">${activeCount}</span>` : ''}
        </div>
      </div>
    `;
    }).join('');
}

/**
 * Select a filter group
 */
function selectFilterGroup(groupName) {
    currentFilterGroup = groupName;
    renderFilterGroups();
    renderFilterControls();
}

/**
 * Render filter controls for current group
 */
function renderFilterControls() {
    const controlsDiv = document.getElementById('filterControls');
    if (!controlsDiv) return;

    if (!currentFilterGroup) {
        controlsDiv.innerHTML = '<div class="filter-empty">Select a filter group</div>';
        return;
    }

    const fields = getFieldsByGroup(currentFilterGroup);

    controlsDiv.innerHTML = `
    <div class="filter-controls-header">
      <h3>${currentFilterGroup}</h3>
      <p>Configure filters for ${currentFilterGroup.toLowerCase()} fields</p>
    </div>
    <div class="filter-controls-body">
      ${fields.map(field => renderFieldControl(field)).join('')}
    </div>
  `;
}

/**
 * Render a single field control based on its type
 */
function renderFieldControl(field) {
    const currentFilter = FilterState.activeFilters[field.key];

    switch (field.type) {
        case 'text':
            return renderTextControl(field, currentFilter);

        case 'enum':
            return renderEnumControl(field, currentFilter);

        case 'boolean':
            return renderBooleanControl(field, currentFilter);

        case 'date':
            return renderDateControl(field, currentFilter);

        case 'number':
            return renderNumberControl(field, currentFilter);

        default:
            return '';
    }
}

/**
 * Render text input control with matching mode
 */
function renderTextControl(field, currentFilter) {
    const value = currentFilter?.value || '';
    const mode = currentFilter?.mode || 'contains';

    return `
    <div class="filter-field">
      <label class="filter-label">${field.label}</label>
      <div class="filter-text-row">
        <input 
          type="text" 
          class="filter-input" 
          placeholder="Enter ${field.label.toLowerCase()}"
          value="${value}"
          onchange="updateTextFilter('${field.key}', this.value, document.getElementById('mode-${field.key}').value)"
        />
        <select 
          id="mode-${field.key}" 
          class="filter-select filter-mode-select"
          onchange="updateTextFilter('${field.key}', document.querySelector('.filter-text-row input').value, this.value)"
        >
          <option value="contains" ${mode === 'contains' ? 'selected' : ''}>Contains</option>
          <option value="equals" ${mode === 'equals' ? 'selected' : ''}>Equals</option>
          <option value="startsWith" ${mode === 'startsWith' ? 'selected' : ''}>Starts with</option>
        </select>
      </div>
    </div>
  `;
}

/**
 * Render enum multi-select control
 */
function renderEnumControl(field, currentFilter) {
    const selectedOptions = currentFilter?.selectedOptions || [];

    return `
    <div class="filter-field">
      <label class="filter-label">${field.label}</label>
      <div class="filter-checkbox-list">
        ${field.options.map(option => {
        const isChecked = selectedOptions.includes(option);
        return `
            <label class="filter-checkbox-item">
              <input 
                type="checkbox" 
                ${isChecked ? 'checked' : ''}
                onchange="updateEnumFilter('${field.key}', '${option}', this.checked)"
              />
              <span>${option}</span>
            </label>
          `;
    }).join('')}
      </div>
    </div>
  `;
}

/**
 * Render boolean toggle control
 */
function renderBooleanControl(field, currentFilter) {
    const value = currentFilter?.value;
    const isYes = value === true;
    const isNo = value === false;
    const isAny = value == null;

    return `
    <div class="filter-field">
      <label class="filter-label">${field.label}</label>
      <div class="filter-boolean-group">
        <label class="filter-radio-item">
          <input 
            type="radio" 
            name="bool-${field.key}"
            ${isAny ? 'checked' : ''}
            onchange="updateBooleanFilter('${field.key}', null)"
          />
          <span>Any</span>
        </label>
        <label class="filter-radio-item">
          <input 
            type="radio" 
            name="bool-${field.key}"
            ${isYes ? 'checked' : ''}
            onchange="updateBooleanFilter('${field.key}', true)"
          />
          <span>Yes</span>
        </label>
        <label class="filter-radio-item">
          <input 
            type="radio" 
            name="bool-${field.key}"
            ${isNo ? 'checked' : ''}
            onchange="updateBooleanFilter('${field.key}', false)"
          />
          <span>No</span>
        </label>
      </div>
    </div>
  `;
}

/**
 * Render date range control
 */
function renderDateControl(field, currentFilter) {
    const from = currentFilter?.from || '';
    const to = currentFilter?.to || '';

    return `
    <div class="filter-field">
      <label class="filter-label">${field.label}</label>
      <div class="filter-date-range">
        <input 
          type="date" 
          class="filter-input filter-date-input" 
          placeholder="From"
          value="${from}"
          onchange="updateDateFilter('${field.key}', this.value, document.getElementById('date-to-${field.key}').value)"
        />
        <span class="filter-range-separator">to</span>
        <input 
          type="date" 
          id="date-to-${field.key}"
          class="filter-input filter-date-input" 
          placeholder="To"
          value="${to}"
          onchange="updateDateFilter('${field.key}', document.querySelector('.filter-date-range input').value, this.value)"
        />
      </div>
    </div>
  `;
}

/**
 * Render number range control
 */
function renderNumberControl(field, currentFilter) {
    const min = currentFilter?.min ?? '';
    const max = currentFilter?.max ?? '';

    return `
    <div class="filter-field">
      <label class="filter-label">${field.label}</label>
      <div class="filter-number-range">
        <input 
          type="number" 
          class="filter-input filter-number-input" 
          placeholder="Min"
          value="${min}"
          onchange="updateNumberFilter('${field.key}', this.value, document.getElementById('num-max-${field.key}').value)"
        />
        <span class="filter-range-separator">to</span>
        <input 
          type="number" 
          id="num-max-${field.key}"
          class="filter-input filter-number-input" 
          placeholder="Max"
          value="${max}"
          onchange="updateNumberFilter('${field.key}', document.querySelector('.filter-number-range input').value, this.value)"
        />
      </div>
    </div>
  `;
}

/**
 * Update text filter
 */
function updateTextFilter(fieldKey, value, mode) {
    if (!value || value.trim() === '') {
        removeFilter(fieldKey);
    } else {
        setFilter(fieldKey, { value, mode });
    }
    updateResultsCount();
    renderFilterGroups(); // Update badge counts
}

/**
 * Update enum filter
 */
function updateEnumFilter(fieldKey, option, isChecked) {
    const currentFilter = FilterState.activeFilters[fieldKey];
    let selectedOptions = currentFilter?.selectedOptions || [];

    if (isChecked) {
        if (!selectedOptions.includes(option)) {
            selectedOptions.push(option);
        }
    } else {
        selectedOptions = selectedOptions.filter(opt => opt !== option);
    }

    if (selectedOptions.length === 0) {
        removeFilter(fieldKey);
    } else {
        setFilter(fieldKey, { selectedOptions });
    }

    updateResultsCount();
    renderFilterGroups(); // Update badge counts
}

/**
 * Update boolean filter
 */
function updateBooleanFilter(fieldKey, value) {
    if (value == null) {
        removeFilter(fieldKey);
    } else {
        setFilter(fieldKey, { value });
    }
    updateResultsCount();
    renderFilterGroups(); // Update badge counts
}

/**
 * Update date filter
 */
function updateDateFilter(fieldKey, from, to) {
    if (!from && !to) {
        removeFilter(fieldKey);
    } else {
        setFilter(fieldKey, { from, to });
    }
    updateResultsCount();
    renderFilterGroups(); // Update badge counts
}

/**
 * Update number filter
 */
function updateNumberFilter(fieldKey, min, max) {
    const minVal = min !== '' ? Number(min) : null;
    const maxVal = max !== '' ? Number(max) : null;

    if (minVal == null && maxVal == null) {
        removeFilter(fieldKey);
    } else {
        setFilter(fieldKey, { min: minVal, max: maxVal });
    }
    updateResultsCount();
    renderFilterGroups(); // Update badge counts
}

/**
 * Apply filters and update dashboard
 */
function applyFiltersToLeads() {
    if (typeof dashboardLeads === 'undefined') {
        console.error('dashboardLeads not found');
        return;
    }

    filteredLeadsCache = applyFilters(dashboardLeads);
    renderFilterChips();
    renderDashboardLeads(filteredLeadsCache);
    closeFilterModal();
}

/**
 * Reset all filters
 */
function resetAllFilters() {
    clearAllFilters();
    renderFilterGroups();
    renderFilterControls();
    updateResultsCount();
    renderFilterChips();
}

/**
 * Update results count in sticky footer
 */
function updateResultsCount() {
    const countDiv = document.getElementById('filterResultsCount');
    if (!countDiv) return;

    if (typeof dashboardLeads === 'undefined') {
        countDiv.textContent = 'Showing 0 leads';
        return;
    }

    const filtered = applyFilters(dashboardLeads);
    const count = filtered.length;
    const total = dashboardLeads.length;

    if (getActiveFilterCount() === 0) {
        countDiv.textContent = `Showing all ${total} leads`;
    } else {
        countDiv.textContent = `Showing ${count} of ${total} leads`;
    }
}

/**
 * Render active filter chips above dashboard
 */
function renderFilterChips() {
    const chipsContainer = document.getElementById('filterChipsContainer');
    if (!chipsContainer) return;

    const activeFilters = FilterState.activeFilters;
    const filterCount = Object.keys(activeFilters).length;

    if (filterCount === 0) {
        chipsContainer.innerHTML = '';
        chipsContainer.style.display = 'none';
        return;
    }

    chipsContainer.style.display = 'flex';

    const chips = Object.entries(activeFilters).map(([fieldKey, config]) => {
        const description = getFilterDescription(fieldKey, config);
        return `
      <div class="filter-chip">
        <span>${description}</span>
        <button class="filter-chip-remove" onclick="removeFilterChip('${fieldKey}')" aria-label="Remove filter">×</button>
      </div>
    `;
    }).join('');

    chipsContainer.innerHTML = `
    ${chips}
    <button class="filter-chip-clear-all" onclick="clearAllFiltersAndRefresh()">Clear all</button>
  `;
}

/**
 * Remove a single filter chip
 */
function removeFilterChip(fieldKey) {
    removeFilter(fieldKey);
    renderFilterChips();
    applyFiltersToLeads();
}

/**
 * Clear all filters and refresh
 */
function clearAllFiltersAndRefresh() {
    clearAllFilters();
    renderFilterChips();
    applyFiltersToLeads();
}

// Event listeners for modal buttons
document.addEventListener('DOMContentLoaded', () => {
    // Open filter button
    const openBtn = document.getElementById('openFilterBtn');
    if (openBtn) {
        openBtn.addEventListener('click', openFilterModal);
    }

    // Close filter button
    const closeBtn = document.getElementById('closeFilterBtn');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeFilterModal);
    }

    // Apply filters button
    const applyBtn = document.getElementById('applyFiltersBtn');
    if (applyBtn) {
        applyBtn.addEventListener('click', applyFiltersToLeads);
    }

    // Reset filters button
    const resetBtn = document.getElementById('resetFiltersBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetAllFilters);
    }

    // Close modal when clicking backdrop
    const backdrop = document.getElementById('filterModalBackdrop');
    if (backdrop) {
        backdrop.addEventListener('click', (e) => {
            if (e.target === backdrop) {
                closeFilterModal();
            }
        });
    }
});
