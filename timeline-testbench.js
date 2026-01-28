/**
 * Timeline Testbench Controls
 * Debugging and troubleshooting controls for the timeline component
 * Can be easily removed by deleting this file and its script tag
 */

(function() {
  'use strict';

  // Add CSS for padding visualization
  const style = document.createElement('style');
  style.id = 'qt9-testbench-styles';
  style.textContent = `
    .qt9-testbench-padding-overlay {
      position: absolute;
      left: 0;
      right: 0;
      background: rgba(255, 200, 0, 0.2);
      border-top: 2px dashed rgba(255, 200, 0, 0.8);
      pointer-events: none;
      z-index: 9998;
      transition: height 400ms cubic-bezier(0.2, 0.8, 0.2, 1),
                  top 400ms cubic-bezier(0.2, 0.8, 0.2, 1);
    }
  `;
  document.head.appendChild(style);

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    const card = document.querySelector('.qt9-timeline-card');
    if (!card) {
      console.warn('Timeline testbench: Card not found');
      return;
    }

    // Create testbench container
    const testbench = document.createElement('div');
    testbench.id = 'qt9-testbench';
    testbench.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: rgba(255, 255, 255, 0.95);
      border: 2px solid rgba(28, 95, 212, 0.3);
      border-radius: 12px;
      padding: 16px;
      box-shadow: 0 8px 24px rgba(2, 8, 23, 0.15);
      z-index: 10001;
      font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
      font-size: 12px;
      min-width: 240px;
      max-width: 300px;
    `;

    // Title
    const title = document.createElement('div');
    title.textContent = 'Timeline Testbench';
    title.style.cssText = `
      font-weight: 600;
      font-size: 14px;
      color: rgba(11, 18, 32, 0.9);
      margin-bottom: 12px;
      padding-bottom: 8px;
      border-bottom: 1px solid rgba(15, 23, 42, 0.1);
    `;
    testbench.appendChild(title);

    // State for overlays
    const overlays = {
      detectionArea: null,
      phaseBorders: [],
      paddingBorders: []
    };

    // Create controls
    const controls = [
      {
        id: 'toggle-detection',
        label: 'Timeline Detection Border',
        color: 'rgba(255, 0, 255, 0.8)',
        bgColor: 'rgba(255, 0, 255, 0.1)',
        toggle: function(enabled) {
          if (enabled) {
            showDetectionArea();
          } else {
            hideDetectionArea();
          }
        }
      },
      {
        id: 'toggle-phases',
        label: 'Phase Detection Borders',
        color: 'rgba(0, 255, 255, 0.8)',
        bgColor: 'rgba(0, 255, 255, 0.1)',
        toggle: function(enabled) {
          if (enabled) {
            showPhaseBorders();
          } else {
            hidePhaseBorders();
          }
        }
      },
      {
        id: 'toggle-padding',
        label: 'Padding Borders',
        color: 'rgba(255, 200, 0, 0.8)',
        bgColor: 'rgba(255, 200, 0, 0.1)',
        toggle: function(enabled) {
          if (enabled) {
            showPaddingBorders();
          } else {
            hidePaddingBorders();
          }
        }
      }
    ];

    // Create control toggles
    controls.forEach(control => {
      const container = document.createElement('div');
      container.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
        padding: 8px;
        background: rgba(15, 23, 42, 0.02);
        border-radius: 6px;
      `;

      const label = document.createElement('label');
      label.textContent = control.label;
      label.style.cssText = `
        flex: 1;
        color: rgba(11, 18, 32, 0.75);
        cursor: pointer;
        user-select: none;
      `;

      const toggle = document.createElement('input');
      toggle.type = 'checkbox';
      toggle.id = control.id;
      toggle.style.cssText = `
        width: 40px;
        height: 20px;
        cursor: pointer;
      `;

      toggle.addEventListener('change', (e) => {
        control.toggle(e.target.checked);
      });

      label.setAttribute('for', control.id);
      container.appendChild(label);
      container.appendChild(toggle);
      testbench.appendChild(container);
    });

    // Add close button
    const closeBtn = document.createElement('button');
    closeBtn.textContent = '×';
    closeBtn.style.cssText = `
      position: absolute;
      top: 8px;
      right: 8px;
      width: 24px;
      height: 24px;
      border: none;
      background: rgba(15, 23, 42, 0.1);
      border-radius: 4px;
      cursor: pointer;
      font-size: 18px;
      line-height: 1;
      color: rgba(11, 18, 32, 0.7);
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    `;
    closeBtn.addEventListener('click', () => {
      testbench.style.display = 'none';
    });
    closeBtn.addEventListener('mouseenter', () => {
      closeBtn.style.background = 'rgba(15, 23, 42, 0.15)';
    });
    closeBtn.addEventListener('mouseleave', () => {
      closeBtn.style.background = 'rgba(15, 23, 42, 0.1)';
    });
    testbench.appendChild(closeBtn);

    // Insert testbench after card
    const cardParent = card.parentElement;
    if (cardParent) {
      cardParent.appendChild(testbench);
    } else {
      document.body.appendChild(testbench);
    }

    // Track current state for dynamic updates
    let currentWeeks = parseInt(card.style.getPropertyValue('--weeks')) || 22;
    let currentBarsCount = card.querySelectorAll('.qt9-bar').length;
    let currentRowsCount = card.querySelectorAll('.qt9-row').length;
    let refreshTimeout = null;

    // Function to refresh all overlays when timeline changes
    function refreshAllOverlays(immediate = false) {
      // Debounce rapid updates
      if (refreshTimeout && !immediate) {
        clearTimeout(refreshTimeout);
        refreshTimeout = setTimeout(() => refreshAllOverlays(true), 50);
        return;
      }
      refreshTimeout = null;
      const newWeeks = parseInt(card.style.getPropertyValue('--weeks')) || 22;
      const newBarsCount = card.querySelectorAll('.qt9-bar').length;
      const newRowsCount = card.querySelectorAll('.qt9-row').length;
      
      // Check if timeline structure changed
      const structureChanged = 
        newWeeks !== currentWeeks || 
        newBarsCount !== currentBarsCount || 
        newRowsCount !== currentRowsCount;
      
      if (structureChanged) {
        // Update detection area if visible
        if (overlays.detectionArea && overlays.detectionArea.style.display !== 'none') {
          updateDetectionArea();
        }
        
        // Recreate phase borders if visible (phases may have changed)
        if (overlays.phaseBorders.length > 0) {
          const wasVisible = overlays.phaseBorders[0] && overlays.phaseBorders[0].style.display !== 'none';
          // Remove old borders
          overlays.phaseBorders.forEach(border => {
            if (border && border.parentElement) {
              border.remove();
            }
          });
          overlays.phaseBorders = [];
          // Recreate if they were visible
          if (wasVisible) {
            showPhaseBorders();
          }
        }
        
        // Recreate padding borders if visible (rows may have changed)
        if (overlays.paddingBorders.length > 0) {
          const wasVisible = overlays.paddingBorders[0] && 
            (overlays.paddingBorders[0].style.display !== 'none' && 
             overlays.paddingBorders[0].style.opacity !== '0');
          // Hide and cleanup
          hidePaddingBorders();
          // Recreate if they were visible
          if (wasVisible) {
            showPaddingBorders();
          }
        }
        
        // Update tracked state
        currentWeeks = newWeeks;
        currentBarsCount = newBarsCount;
        currentRowsCount = newRowsCount;
      } else {
        // Just update positions/sizes without recreating
        if (overlays.detectionArea && overlays.detectionArea.style.display !== 'none') {
          updateDetectionArea();
        }
        overlays.phaseBorders.forEach(border => {
          if (border && border.style.display !== 'none') {
            updatePhaseBorder(border);
          }
        });
        overlays.paddingBorders.forEach(overlay => {
          if (overlay && overlay.style.display !== 'none') {
            updatePaddingBorder(overlay);
          }
        });
      }
    }

    // Listen for tab changes (timeline type changes)
    const tabs = card.querySelectorAll('.qt9-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Wait for timeline to update, then refresh overlays
        setTimeout(() => {
          refreshAllOverlays(true);
        }, 150);
      });
    });

    // Observe timeline card for changes (weeks, phases, etc.)
    const timelineObserver = new MutationObserver(() => {
      refreshAllOverlays();
    });
    
    timelineObserver.observe(card, {
      attributes: true,
      attributeFilter: ['style'],
      childList: true,
      subtree: true
    });

    // Observe week ticks container for changes
    const ticksContainer = card.querySelector('#week-ticks');
    if (ticksContainer) {
      timelineObserver.observe(ticksContainer, {
        childList: true
      });
    }

    // Functions to show/hide overlays
    function showDetectionArea() {
      if (overlays.detectionArea) {
        overlays.detectionArea.style.display = 'block';
        return;
      }

      const overlay = document.createElement('div');
      overlay.id = 'qt9-testbench-detection';
      overlay.style.cssText = `
        position: absolute;
        border: 2px solid rgba(255, 0, 255, 0.8);
        background: rgba(255, 0, 255, 0.1);
        pointer-events: none;
        z-index: 10000;
        box-sizing: border-box;
      `;
      
      card.style.position = 'relative';
      card.appendChild(overlay);
      overlays.detectionArea = overlay;
      
      updateDetectionArea();
      
      // Update on resize
      const resizeObserver = new ResizeObserver(() => {
        updateDetectionArea();
      });
      resizeObserver.observe(card);
      resizeObserver.observe(document.querySelector('.qt9-ticks') || card);
    }

    function hideDetectionArea() {
      if (overlays.detectionArea) {
        overlays.detectionArea.style.display = 'none';
      }
    }

    function updateDetectionArea() {
      if (!overlays.detectionArea) return;
      
      const ticksElement = card.querySelector('.qt9-ticks');
      const barsContainer = card.querySelector('.qt9-bars');
      const axis = card.querySelector('.qt9-axis');
      
      if (ticksElement && barsContainer) {
        const ticksRect = ticksElement.getBoundingClientRect();
        const cardRect = card.getBoundingClientRect();
        const barsRect = barsContainer.getBoundingClientRect();
        const axisTop = axis ? axis.getBoundingClientRect().top - cardRect.top : barsRect.top - cardRect.top;
        const barsBottom = barsRect.bottom - cardRect.top;
        
        overlays.detectionArea.style.left = `${ticksRect.left - cardRect.left}px`;
        overlays.detectionArea.style.top = `${axisTop}px`;
        overlays.detectionArea.style.width = `${ticksRect.right - ticksRect.left}px`;
        overlays.detectionArea.style.height = `${barsBottom - axisTop}px`;
      }
    }

    function showPhaseBorders() {
      if (overlays.phaseBorders.length > 0) {
        overlays.phaseBorders.forEach(border => {
          if (border && border.parentElement) {
            border.style.display = 'block';
            updatePhaseBorder(border);
          }
        });
        return;
      }

      // Get phase data from bars (they have --start and --span CSS variables)
      const bars = card.querySelectorAll('.qt9-bar');
      bars.forEach((bar, index) => {
        const border = document.createElement('div');
        border.className = 'qt9-testbench-phase-border';
        border.dataset.barIndex = index;
        border.style.cssText = `
          position: absolute;
          border-left: 2px solid rgba(0, 255, 255, 0.8);
          border-right: 2px solid rgba(0, 255, 255, 0.8);
          background: rgba(0, 255, 255, 0.05);
          pointer-events: none;
          z-index: 9999;
          box-sizing: border-box;
        `;
        
        card.style.position = 'relative';
        card.appendChild(border);
        overlays.phaseBorders.push(border);
        
        updatePhaseBorder(border);
      });
    }

    function hidePhaseBorders() {
      overlays.phaseBorders.forEach(border => {
        if (border) border.style.display = 'none';
      });
    }

    function updatePhaseBorder(border) {
      const barIndex = parseInt(border.dataset.barIndex);
      const bars = card.querySelectorAll('.qt9-bar');
      const bar = bars[barIndex];
      if (!bar) {
        // Bar doesn't exist anymore, hide border
        border.style.display = 'none';
        return;
      }
      
      // Get phase time span from CSS variables
      const computedStyle = window.getComputedStyle(bar);
      const start = parseFloat(computedStyle.getPropertyValue('--start')) || 0;
      const span = parseFloat(computedStyle.getPropertyValue('--span')) || 0;
      
      // Get timeline bounds
      const ticksElement = card.querySelector('.qt9-ticks');
      const barsContainer = card.querySelector('.qt9-bars');
      const axis = card.querySelector('.qt9-axis');
      
      if (!ticksElement || !barsContainer) return;
      
      const ticksRect = ticksElement.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      const barsRect = barsContainer.getBoundingClientRect();
      const axisTop = axis ? axis.getBoundingClientRect().top - cardRect.top : barsRect.top - cardRect.top;
      const barsBottom = barsRect.bottom - cardRect.top;
      
      // Calculate timeline width and week width
      const timelineWidth = ticksRect.width;
      const weeks = parseInt(card.style.getPropertyValue('--weeks')) || 22;
      if (weeks === 0) return; // Avoid division by zero
      const weekWidth = timelineWidth / weeks;
      
      // Calculate position based on time span
      const left = ticksRect.left - cardRect.left + (start * weekWidth);
      const width = span * weekWidth;
      
      border.style.left = `${left}px`;
      border.style.top = `${axisTop}px`;
      border.style.width = `${width}px`;
      border.style.height = `${barsBottom - axisTop}px`;
      border.style.display = 'block';
    }

    function showPaddingBorders() {
      // Remove existing overlays if any
      overlays.paddingBorders.forEach(overlay => {
        if (overlay && overlay.parentElement) {
          overlay.remove();
        }
      });
      overlays.paddingBorders = [];
      
      // Disconnect existing observers
      if (window.qt9PaddingObserver) {
        window.qt9PaddingObserver.disconnect();
        window.qt9PaddingObserver = null;
      }
      if (window.qt9PaddingResizeObserver) {
        window.qt9PaddingResizeObserver.disconnect();
        window.qt9PaddingResizeObserver = null;
      }

      // Create overlay elements for each row's padding area
      const rows = card.querySelectorAll('.qt9-row');
      rows.forEach((row, index) => {
        const overlay = document.createElement('div');
        overlay.className = 'qt9-testbench-padding-overlay';
        overlay.dataset.rowIndex = index;
        overlay.style.cssText = `
          position: absolute;
          left: 0;
          right: 0;
          background: rgba(255, 200, 0, 0.3);
          border-top: 2px dashed rgba(255, 200, 0, 0.9);
          border-bottom: 2px dashed rgba(255, 200, 0, 0.9);
          pointer-events: none;
          z-index: 9998;
          transition: height 400ms cubic-bezier(0.2, 0.8, 0.2, 1),
                      top 400ms cubic-bezier(0.2, 0.8, 0.2, 1),
                      opacity 200ms ease;
          opacity: 0;
        `;
        
        card.style.position = 'relative';
        card.appendChild(overlay);
        overlays.paddingBorders.push(overlay);
        
        // Initial update
        updatePaddingBorder(overlay);
      });
      
      // Observe margin-bottom changes on rows using MutationObserver
      window.qt9PaddingObserver = new MutationObserver((mutations) => {
        mutations.forEach(mutation => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
            const row = mutation.target;
            const rowIndex = Array.from(card.querySelectorAll('.qt9-row')).indexOf(row);
            const overlay = overlays.paddingBorders[rowIndex];
            if (overlay) {
              updatePaddingBorder(overlay);
            }
          }
        });
      });
      
      // Observe all rows for style attribute changes
      rows.forEach(row => {
        window.qt9PaddingObserver.observe(row, {
          attributes: true,
          attributeFilter: ['style']
        });
      });
      
      // Use ResizeObserver to catch layout changes (margin-bottom affects layout)
      window.qt9PaddingResizeObserver = new ResizeObserver(() => {
        overlays.paddingBorders.forEach(overlay => {
          if (overlay && overlay.style.display !== 'none') {
            updatePaddingBorder(overlay);
          }
        });
      });
      
      rows.forEach(row => {
        window.qt9PaddingResizeObserver.observe(row);
      });
      
      // Also poll for changes as a fallback (margin-bottom might change without triggering mutation)
      if (window.qt9PaddingPollInterval) {
        clearInterval(window.qt9PaddingPollInterval);
      }
      
      window.qt9PaddingPollInterval = setInterval(() => {
        overlays.paddingBorders.forEach(overlay => {
          if (overlay && overlay.style.display !== 'none') {
            updatePaddingBorder(overlay);
          }
        });
      }, 100); // Check every 100ms
    }

    function hidePaddingBorders() {
      overlays.paddingBorders.forEach(overlay => {
        if (overlay) overlay.style.display = 'none';
      });
      
      if (window.qt9PaddingObserver) {
        window.qt9PaddingObserver.disconnect();
        window.qt9PaddingObserver = null;
      }
      
      if (window.qt9PaddingResizeObserver) {
        window.qt9PaddingResizeObserver.disconnect();
        window.qt9PaddingResizeObserver = null;
      }
      
      if (window.qt9PaddingPollInterval) {
        clearInterval(window.qt9PaddingPollInterval);
        window.qt9PaddingPollInterval = null;
      }
    }

    function updatePaddingBorder(overlay) {
      const rowIndex = parseInt(overlay.dataset.rowIndex);
      const rows = card.querySelectorAll('.qt9-row');
      const row = rows[rowIndex];
      if (!row) {
        // Row doesn't exist anymore, hide overlay
        overlay.style.display = 'none';
        overlay.style.opacity = '0';
        return;
      }
      
      const rowRect = row.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      const computedStyle = window.getComputedStyle(row);
      const marginBottom = parseFloat(computedStyle.marginBottom) || 0;
      
      // Position overlay below the row, sized to match margin-bottom
      if (marginBottom > 0) {
        overlay.style.top = `${rowRect.bottom - cardRect.top}px`;
        overlay.style.left = `${rowRect.left - cardRect.left}px`;
        overlay.style.width = `${rowRect.width}px`;
        overlay.style.height = `${marginBottom}px`;
        overlay.style.display = 'block';
        overlay.style.opacity = '1';
      } else {
        overlay.style.opacity = '0';
        // Keep it positioned but invisible so transition works
        overlay.style.top = `${rowRect.bottom - cardRect.top}px`;
        overlay.style.left = `${rowRect.left - cardRect.left}px`;
        overlay.style.width = `${rowRect.width}px`;
        overlay.style.height = '0px';
      }
    }

    // Update overlays on window resize
    window.addEventListener('resize', () => {
      refreshAllOverlays();
    });

    // Update detection area on mousemove (to catch dynamic changes)
    card.addEventListener('mousemove', () => {
      if (overlays.detectionArea && overlays.detectionArea.style.display !== 'none') {
        updateDetectionArea();
      }
    });

    // Periodic refresh to catch any missed updates (fallback)
    // Only refresh if overlays are visible
    setInterval(() => {
      const hasVisibleOverlays = 
        (overlays.detectionArea && overlays.detectionArea.style.display !== 'none') ||
        (overlays.phaseBorders.length > 0 && overlays.phaseBorders[0] && overlays.phaseBorders[0].style.display !== 'none') ||
        (overlays.paddingBorders.length > 0 && overlays.paddingBorders[0] && overlays.paddingBorders[0].style.display !== 'none');
      
      if (hasVisibleOverlays) {
        refreshAllOverlays();
      }
    }, 1000);
  }
})();
