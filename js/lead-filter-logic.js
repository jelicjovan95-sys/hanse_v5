/**
 * Lead Filter Logic
 * 
 * Implements filtering operations on lead data based on active filters.
 * - Default AND logic between different fields
 * - Default OR logic within same enum field
 * - Supports text matching modes, date ranges, number ranges
 * - Safe null/undefined handling
 */

/**
 * Global filter state
 */
const FilterState = {
    activeFilters: {},
    matchAny: false // Global OR toggle (optional)
};

/**
 * Text matching modes
 */
const TextMatchMode = {
    CONTAINS: 'contains',
    EQUALS: 'equals',
    STARTS_WITH: 'startsWith'
};

/**
 * Apply filters to a list of leads
 * @param {Array} leads - Array of lead objects
 * @param {Object} filters - Active filters object
 * @param {Boolean} matchAny - If true, use OR logic globally (optional)
 * @returns {Array} Filtered leads
 */
function applyFilters(leads, filters = FilterState.activeFilters, matchAny = FilterState.matchAny) {
    if (!filters || Object.keys(filters).length === 0) {
        return leads; // No filters active, return all
    }

    return leads.filter(lead => {
        const filterResults = [];

        // Process each active filter
        for (const [fieldKey, filterConfig] of Object.entries(filters)) {
            const fieldSchema = getFieldSchema(fieldKey);
            if (!fieldSchema) continue;

            const result = applyFieldFilter(lead, fieldKey, filterConfig, fieldSchema);
            filterResults.push(result);
        }

        // Apply global logic (AND by default, OR if matchAny is true)
        if (matchAny) {
            return filterResults.some(r => r === true); // OR: at least one filter matches
        } else {
            return filterResults.every(r => r === true); // AND: all filters must match
        }
    });
}

/**
 * Apply a single field filter to a lead
 * @param {Object} lead - Lead object
 * @param {String} fieldKey - Field key
 * @param {Object} filterConfig - Filter configuration
 * @param {Object} fieldSchema - Field schema
 * @returns {Boolean} True if lead passes this filter
 */
function applyFieldFilter(lead, fieldKey, filterConfig, fieldSchema) {
    const leadValue = lead[fieldKey];
    const fieldType = fieldSchema.type;

    switch (fieldType) {
        case 'text':
            return applyTextFilter(leadValue, filterConfig);

        case 'enum':
            return applyEnumFilter(leadValue, filterConfig);

        case 'boolean':
            return applyBooleanFilter(leadValue, filterConfig);

        case 'date':
            return applyDateFilter(leadValue, filterConfig);

        case 'number':
            return applyNumberFilter(leadValue, filterConfig);

        default:
            return true; // Unknown type, pass by default
    }
}

/**
 * Apply text filter
 * @param {String} leadValue - Lead field value
 * @param {Object} config - { value: string, mode: 'contains'|'equals'|'startsWith' }
 * @returns {Boolean}
 */
function applyTextFilter(leadValue, config) {
    if (!config.value || config.value.trim() === '') {
        return true; // Empty filter, pass all
    }

    // Handle null/undefined lead values
    if (leadValue == null) {
        return false;
    }

    const searchValue = config.value.toLowerCase().trim();
    const fieldValue = String(leadValue).toLowerCase();
    const mode = config.mode || TextMatchMode.CONTAINS;

    switch (mode) {
        case TextMatchMode.CONTAINS:
            return fieldValue.includes(searchValue);

        case TextMatchMode.EQUALS:
            return fieldValue === searchValue;

        case TextMatchMode.STARTS_WITH:
            return fieldValue.startsWith(searchValue);

        default:
            return fieldValue.includes(searchValue);
    }
}

/**
 * Apply enum filter (multi-select)
 * @param {String} leadValue - Lead field value
 * @param {Object} config - { selectedOptions: string[] }
 * @returns {Boolean}
 */
function applyEnumFilter(leadValue, config) {
    if (!config.selectedOptions || config.selectedOptions.length === 0) {
        return true; // No options selected, pass all
    }

    // Handle null/undefined lead values
    if (leadValue == null) {
        return false;
    }

    // OR logic within same field: lead value matches any selected option
    return config.selectedOptions.includes(leadValue);
}

/**
 * Apply boolean filter
 * @param {Boolean} leadValue - Lead field value
 * @param {Object} config - { value: true|false|null }
 * @returns {Boolean}
 */
function applyBooleanFilter(leadValue, config) {
    if (config.value == null) {
        return true; // No specific value set, pass all
    }

    // Convert to boolean for comparison
    const boolValue = Boolean(leadValue);
    return boolValue === config.value;
}

/**
 * Apply date filter (range)
 * @param {String} leadValue - Lead field value (date string)
 * @param {Object} config - { from: 'YYYY-MM-DD', to: 'YYYY-MM-DD' }
 * @returns {Boolean}
 */
function applyDateFilter(leadValue, config) {
    if (!config.from && !config.to) {
        return true; // No range set, pass all
    }

    // Handle null/undefined lead values
    if (!leadValue) {
        return false;
    }

    const leadDate = new Date(leadValue);
    if (isNaN(leadDate.getTime())) {
        return false; // Invalid date
    }

    // Check from date
    if (config.from) {
        const fromDate = new Date(config.from);
        if (leadDate < fromDate) {
            return false;
        }
    }

    // Check to date
    if (config.to) {
        const toDate = new Date(config.to);
        // Set to end of day for inclusive comparison
        toDate.setHours(23, 59, 59, 999);
        if (leadDate > toDate) {
            return false;
        }
    }

    return true;
}

/**
 * Apply number filter (range)
 * @param {Number} leadValue - Lead field value
 * @param {Object} config - { min: number, max: number }
 * @returns {Boolean}
 */
function applyNumberFilter(leadValue, config) {
    if (config.min == null && config.max == null) {
        return true; // No range set, pass all
    }

    // Handle null/undefined lead values
    if (leadValue == null) {
        return false;
    }

    const numValue = Number(leadValue);
    if (isNaN(numValue)) {
        return false; // Invalid number
    }

    // Check min
    if (config.min != null && numValue < config.min) {
        return false;
    }

    // Check max
    if (config.max != null && numValue > config.max) {
        return false;
    }

    return true;
}

/**
 * Set a filter for a specific field
 * @param {String} fieldKey - Field key
 * @param {Object} config - Filter configuration
 */
function setFilter(fieldKey, config) {
    FilterState.activeFilters[fieldKey] = config;
}

/**
 * Remove a filter for a specific field
 * @param {String} fieldKey - Field key
 */
function removeFilter(fieldKey) {
    delete FilterState.activeFilters[fieldKey];
}

/**
 * Clear all filters
 */
function clearAllFilters() {
    FilterState.activeFilters = {};
    FilterState.matchAny = false;
}

/**
 * Get active filter count
 * @returns {Number}
 */
function getActiveFilterCount() {
    return Object.keys(FilterState.activeFilters).length;
}

/**
 * Get human-readable description of a filter
 * @param {String} fieldKey - Field key
 * @param {Object} config - Filter configuration
 * @returns {String}
 */
function getFilterDescription(fieldKey, config) {
    const fieldSchema = getFieldSchema(fieldKey);
    if (!fieldSchema) return '';

    const label = fieldSchema.label;
    const type = fieldSchema.type;

    switch (type) {
        case 'text':
            const mode = config.mode || 'contains';
            const modeLabel = mode === 'equals' ? '=' : mode === 'startsWith' ? 'starts with' : 'contains';
            return `${label} ${modeLabel} "${config.value}"`;

        case 'enum':
            if (config.selectedOptions.length === 1) {
                return `${label}: ${config.selectedOptions[0]}`;
            }
            return `${label}: ${config.selectedOptions.join(', ')}`;

        case 'boolean':
            return `${label}: ${config.value ? 'Yes' : 'No'}`;

        case 'date':
            if (config.from && config.to) {
                return `${label}: ${config.from} to ${config.to}`;
            } else if (config.from) {
                return `${label}: from ${config.from}`;
            } else if (config.to) {
                return `${label}: until ${config.to}`;
            }
            return label;

        case 'number':
            if (config.min != null && config.max != null) {
                return `${label}: ${config.min} - ${config.max}`;
            } else if (config.min != null) {
                return `${label}: ≥ ${config.min}`;
            } else if (config.max != null) {
                return `${label}: ≤ ${config.max}`;
            }
            return label;

        default:
            return label;
    }
}

/**
 * Serialize filters for saving (optional feature)
 * @returns {String} JSON string of filters
 */
function serializeFilters() {
    return JSON.stringify({
        filters: FilterState.activeFilters,
        matchAny: FilterState.matchAny
    });
}

/**
 * Deserialize filters from saved preset (optional feature)
 * @param {String} jsonString - JSON string of filters
 */
function deserializeFilters(jsonString) {
    try {
        const data = JSON.parse(jsonString);
        FilterState.activeFilters = data.filters || {};
        FilterState.matchAny = data.matchAny || false;
    } catch (e) {
        console.error('Failed to deserialize filters:', e);
    }
}
