/**
 * Form Helper Functions for Lead Card Modal
 * Reusable field generators and utilities
 */

// ======================
// FIELD GENERATORS
// ======================

const FormFields = {
    /**
     * Generate a text input field
     */
    text: (label, value = '', required = false) => `
    <div class="field">
      <div class="field-label ${required ? 'field-required' : ''}">${label}</div>
      <input type="text" class="field-input" value="${value || ''}" placeholder="${label}">
    </div>
  `,

    /**
     * Generate an email input field
     */
    email: (label, value = '', required = false) => `
    <div class="field">
      <div class="field-label ${required ? 'field-required' : ''}">${label}</div>
      <input type="email" class="field-input" value="${value || ''}" placeholder="${label}">
    </div>
  `,

    /**
     * Generate a phone input field
     */
    phone: (label, value = '', required = false) => `
    <div class="field">
      <div class="field-label ${required ? 'field-required' : ''}">${label}</div>
      <input type="tel" class="field-input" value="${value || ''}" placeholder="${label}">
    </div>
  `,

    /**
     * Generate a number input field
     */
    number: (label, value = '', required = false) => `
    <div class="field">
      <div class="field-label ${required ? 'field-required' : ''}">${label}</div>
      <input type="number" class="field-input" value="${value || ''}" placeholder="${label}">
    </div>
  `,

    /**
     * Generate a currency input field
     */
    currency: (label, value = '', required = false) => `
    <div class="field">
      <div class="field-label ${required ? 'field-required' : ''}">${label}</div>
      <input type="text" class="field-input" value="${value || ''}" placeholder="$0.00">
    </div>
  `,

    /**
     * Generate a date input field with optional expiration warning
     */
    date: (label, value = '', required = false, showWarning = false) => `
    <div class="field">
      <div class="field-label ${required ? 'field-required' : ''}">${label}</div>
      <input type="date" class="field-input" value="${value || ''}">
      ${showWarning ? '<div class="expiration-warning">⚠ Expiring soon</div>' : ''}
    </div>
  `,

    /**
     * Generate a dropdown/select field
     */
    dropdown: (label, options = [], selected = '', required = false) => `
    <div class="field">
      <div class="field-label ${required ? 'field-required' : ''}">${label}</div>
      <select class="field-select">
        ${options.map(opt => `<option ${opt === selected ? 'selected' : ''}>${opt}</option>`).join('')}
      </select>
    </div>
  `,

    /**
     * Generate a secure/password input field
     */
    secure: (label, value = '', required = false) => `
    <div class="field">
      <div class="field-label ${required ? 'field-required' : ''}">${label}</div>
      <input type="password" class="field-input secure-input" value="${value || ''}" placeholder="••••••••">
    </div>
  `,

    /**
     * Generate a file upload field with preview
     */
    upload: (label, required = false, hasFile = false, fileName = '') => `
    <div class="field file-upload-field">
      <div class="field-label ${required ? 'field-required' : ''}">${label}</div>
      <input type="file" class="file-upload-input" id="upload-${label.replace(/\s/g, '-')}">
      <label for="upload-${label.replace(/\s/g, '-')}" class="file-upload-label">
        <span class="file-upload-icon">📎</span>
        <span class="file-upload-text">${hasFile ? fileName : 'Click to upload or drag file here'}</span>
      </label>
      ${hasFile ? `<div class="file-preview"><span class="file-preview-icon">📄</span><span>${fileName}</span><span class="file-remove">×</span></div>` : ''}
    </div>
  `,

    /**
     * Generate a checkbox field
     */
    checkbox: (label, checked = false) => `
    <div class="checkbox-field">
      <input type="checkbox" ${checked ? 'checked' : ''}>
      <label class="checkbox-label">${label}</label>
    </div>
  `,

    /**
     * Generate a URL input field
     */
    url: (label, value = '', required = false) => `
    <div class="field">
      <div class="field-label ${required ? 'field-required' : ''}">${label}</div>
      <input type="url" class="field-input" value="${value || ''}" placeholder="https://">
    </div>
  `,

    /**
     * Create a row with multiple fields side-by-side
     */
    row: (...fields) => `
    <div class="field-row">
      ${fields.join('')}
    </div>
  `
};

// ======================
// PROGRESS CALCULATION
// ======================

/**
 * Calculate completion percentage for a department
 * @param {Array} fieldKeys - Array of field keys to check
 * @param {Object} leadData - Lead data object
 * @returns {Number} Percentage (0-100)
 */
function calculateDeptProgress(fieldKeys, leadData) {
    if (!fieldKeys || fieldKeys.length === 0) return 0;
    let completed = 0;
    fieldKeys.forEach(field => {
        if (leadData[field] && leadData[field] !== '') completed++;
    });
    return Math.round((completed / fieldKeys.length) * 100);
}

/**
 * Generate SVG progress circle
 * @param {Number} percentage - Progress percentage (0-100)
 * @returns {String} SVG HTML string
 */
function progressCircle(percentage) {
    const radius = 18;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;
    return `
    <svg width="42" height="42" viewBox="0 0 42 42">
      <circle cx="21" cy="21" r="${radius}" fill="none" stroke="rgba(15, 23, 42, .08)" stroke-width="4"/>
      <circle cx="21" cy="21" r="${radius}" fill="none" stroke="#2f5ea9" stroke-width="4"
              stroke-dasharray="${circumference}" stroke-dashoffset="${offset}"
              stroke-linecap="round" style="transition: stroke-dashoffset 0.5s ease;"/>
    </svg>
  `;
}

// ======================
// DEPARTMENT SECTION
// ======================

/**
 * Create a collapsible department section
 * @param {String} deptId - Department ID
 * @param {String} icon - Emoji or icon
 * @param {String} title - Department title
 * @param {String} subtitle - Department subtitle
 * @param {Number} progress - Completion percentage
 * @param {String} content - HTML content
 * @param {Boolean} isLocked - Whether section is locked
 * @returns {String} HTML string
 */
function createDeptSection(deptId, icon, title, subtitle, progress, content, isLocked = false) {
    return `
    <div class="dept-section ${isLocked ? 'locked' : ''}" id="dept-${deptId}" data-dept="${deptId}">
      <div class="dept-header" onclick="toggleDepartment('${deptId}')">
        <div class="dept-header-left">
          <div class="dept-icon">${icon}</div>
          <div class="dept-title-wrap">
            <div class="dept-title">${title}</div>
            <div class="dept-subtitle">${subtitle}</div>
          </div>
        </div>
        <div class="dept-progress-wrap">
          ${isLocked ? '<span class="dept-locked-badge">🔒 Locked</span>' : ''}
          <div class="dept-progress-circle">
            ${progressCircle(progress)}
            <div class="dept-progress-text">${progress}%</div>
          </div>
          <div class="dept-toggle">▼</div>
        </div>
      </div>
      <div class="dept-content">
        ${content}
      </div>
    </div>
  `;
}

/**
 * Toggle department section collapse/expand
 * @param {String} deptId - Department ID
 */
function toggleDepartment(deptId) {
    const section = document.getElementById(`dept-${deptId}`);
    if (section && !section.classList.contains('locked')) {
        section.classList.toggle('collapsed');
    }
}
