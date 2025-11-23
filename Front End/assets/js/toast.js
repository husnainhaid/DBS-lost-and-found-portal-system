/**
 * Toast Notification Component
 * Provides a reusable toast notification system with multiple variants
 * and automatic dismissal functionality.
 */

class ToastManager {
  constructor() {
    this.container = null;
    this.toasts = [];
    this.init();
  }

  /**
   * Initialize the toast container
   */
  init() {
    // Create container if it doesn't exist
    if (!document.querySelector('.toast-container')) {
      this.container = document.createElement('div');
      this.container.className = 'toast-container';
      document.body.appendChild(this.container);
    } else {
      this.container = document.querySelector('.toast-container');
    }
  }

  /**
   * Show a toast notification
   * @param {string} message - The message to display
   * @param {string} type - Toast type: 'success', 'error', 'warning', 'info'
   * @param {number} duration - Duration in milliseconds (default: 4000)
   * @param {string} title - Optional title for the toast
   */
  show(message, type = 'info', duration = 4000, title = '') {
    const toast = this.createToast(message, type, duration, title);
    this.container.appendChild(toast);
    this.toasts.push(toast);

    // Trigger animation
    setTimeout(() => {
      toast.style.opacity = '1';
    }, 10);

    // Auto dismiss
    if (duration > 0) {
      setTimeout(() => {
        this.dismiss(toast);
      }, duration);
    }

    return toast;
  }

  /**
   * Create a toast element
   * @private
   */
  createToast(message, type, duration, title) {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    // Get icon based on type
    const icon = this.getIcon(type);

    // Determine title
    const toastTitle = title || this.getDefaultTitle(type);

    // Build toast HTML
    toast.innerHTML = `
      <div class="toast-icon">${icon}</div>
      <div class="toast-content">
        <div class="toast-title">${toastTitle}</div>
        <div class="toast-message">${message}</div>
      </div>
      <button class="toast-close" aria-label="Close">&times;</button>
      ${duration > 0 ? `<div class="toast-progress" style="animation-duration: ${duration}ms;"></div>` : ''}
    `;

    // Add close button handler
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
      this.dismiss(toast);
    });

    return toast;
  }

  /**
   * Get icon for toast type
   * @private
   */
  getIcon(type) {
    const icons = {
      success: '✓',
      error: '✕',
      warning: '⚠',
      info: 'ℹ'
    };
    return icons[type] || icons.info;
  }

  /**
   * Get default title for toast type
   * @private
   */
  getDefaultTitle(type) {
    const titles = {
      success: 'Success',
      error: 'Error',
      warning: 'Warning',
      info: 'Information'
    };
    return titles[type] || 'Notification';
  }

  /**
   * Dismiss a toast
   * @param {HTMLElement} toast - The toast element to dismiss
   */
  dismiss(toast) {
    toast.classList.add('removing');
    
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
      
      // Remove from array
      const index = this.toasts.indexOf(toast);
      if (index > -1) {
        this.toasts.splice(index, 1);
      }
    }, 300); // Match animation duration
  }

  /**
   * Dismiss all toasts
   */
  dismissAll() {
    this.toasts.forEach(toast => {
      this.dismiss(toast);
    });
  }
}

// Create global instance
const toastManager = new ToastManager();

/**
 * Convenience function to show toast
 * @param {string} message - The message to display
 * @param {string} type - Toast type: 'success', 'error', 'warning', 'info'
 * @param {number} duration - Duration in milliseconds
 * @param {string} title - Optional title
 */
function showToast(message, type = 'info', duration = 4000, title = '') {
  return toastManager.show(message, type, duration, title);
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ToastManager, showToast };
}
