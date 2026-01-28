document.addEventListener("DOMContentLoaded", () => {
  const card = document.querySelector(".qt9-timeline-card");
  if (!card) return;

  // ===== Subtask Library by Industry Type =====
  // Universal default tasks + industry-specific variations
  const defaultTasks = {
    phase1: [
      "Discovery tasks",
      "On-site assessment planning",
      "Requirements gathering",
      "Stakeholder alignment",
    ],
    phase2: [
      "Centralize data",
      "Data clean up",
      "Process mapping",
      "Import",
      "Integration testing",
    ],
    phase3: [
      "Bill of Material training",
      "Purchasing training",
      "Jobs & Shop Floor training",
      "Traceability training",
      "User training sessions",
    ],
    phase4: [
      "Master Data",
      "General Ledger",
      "Inventory Counts",
      "Accounting Cutovers",
      "On-site Readiness Checks",
    ],
  };

  const subtaskLibrary = {
    general: {
      phase1: [
        ...defaultTasks.phase1,
        "Manufacturing workflow analysis",
        "Production scheduling setup",
        "KPI definition",
      ],
      phase2: [
        ...defaultTasks.phase2,
        "Custom module development",
        "Report customization",
        "Security configuration",
        "Workflow automation",
      ],
      phase3: [
        ...defaultTasks.phase3,
        "Quality control training",
        "Production reporting setup",
        "Admin training",
        "Pilot deployment",
      ],
      phase4: [
        ...defaultTasks.phase4,
        "Performance monitoring",
        "Post-launch review",
        "Production deployment",
        "24/7 support coverage",
      ],
    },
    cannabis: {
      phase1: [
        ...defaultTasks.phase1,
        "Seed-to-sale compliance review",
        "METRC integration planning",
        "State regulatory mapping",
        "License verification",
      ],
      phase2: [
        ...defaultTasks.phase2,
        "COA Customization",
        "Track & trace configuration",
        "Waste tracking system",
        "Plant tag management",
        "Packaging & labeling automation",
      ],
      phase3: [
        ...defaultTasks.phase3,
        "METRC sync training",
        "Compliance certification",
        "State inspection prep",
        "Inventory reconciliation training",
      ],
      phase4: [
        ...defaultTasks.phase4,
        "Go-live with METRC",
        "State reporting automation",
        "Continuous compliance monitoring",
        "Regulatory audit support",
      ],
    },
    medical: {
      phase1: [
        ...defaultTasks.phase1,
        "FDA QSR requirements analysis",
        "ISO 13485 gap assessment",
        "Risk management planning",
        "Design control mapping",
      ],
      phase2: [
        ...defaultTasks.phase2,
        "DHR (Device History Record) setup",
        "CAPA workflow implementation",
        "Validation protocols",
        "Supplier management system",
        "Non-conformance tracking",
      ],
      phase3: [
        ...defaultTasks.phase3,
        "QMS validation training",
        "FDA inspection readiness",
        "Change control certification",
        "Internal audit preparation",
      ],
      phase4: [
        ...defaultTasks.phase4,
        "Post-market surveillance",
        "FDA audit support",
        "MDR compliance monitoring",
        "Adverse event reporting setup",
      ],
    },
    pharma: {
      phase1: [
        ...defaultTasks.phase1,
        "GMP compliance assessment",
        "21 CFR Part 11 evaluation",
        "Validation master plan",
        "Data integrity review",
      ],
      phase2: [
        ...defaultTasks.phase2,
        "Label Customization",
        "Batch record management",
        "Electronic signatures (Part 11)",
        "OOS investigation system",
        "Stability testing modules",
        "Deviation management",
      ],
      phase3: [
        ...defaultTasks.phase3,
        "GMP validation training",
        "FDA inspection prep",
        "Data integrity validation",
        "SOP development",
        "Pre-approval inspection prep",
      ],
      phase4: [
        ...defaultTasks.phase4,
        "Commercial release",
        "Ongoing GMP compliance",
        "Annual product review",
        "Post-market monitoring",
      ],
    },
    food: {
      phase1: [
        ...defaultTasks.phase1,
        "HACCP plan review",
        "FSMA compliance mapping",
        "Food safety team formation",
        "Supplier qualification criteria",
        "Ingredient specification review",
      ],
      phase2: [
        ...defaultTasks.phase2,
        "Allergen management",
        "Recall system configuration",
        "Temperature monitoring",
        "Lot traceability setup",
        "Sanitation scheduling",
        "Batch record management",
        "Expiration date tracking",
      ],
      phase3: [
        ...defaultTasks.phase3,
        "HACCP validation training",
        "SQF/GFSI prep",
        "Crisis management prep",
        "Supplier verification training",
        "Food safety documentation",
        "Label compliance training",
      ],
      phase4: [
        ...defaultTasks.phase4,
        "Third-party audit support",
        "Recall readiness",
        "Regulatory compliance monitoring",
        "Environmental monitoring setup",
        "Food safety certification prep",
      ],
    },
  };

  // ===== Implementation Type Data =====
  const implementationTypes = {
    general: {
      name: "General Manufacturing",
      description: "Implementing QT9 for general manufacturing focuses on key scope & discovery tasks, AP & AR training, and mapping your business model to the system. This implementation streamlines production workflows, inventory management, and financial processes.",
      maxWeeks: 22,
      phases: [
        {
          start: 0,
          span: 2,
          subtasks: subtaskLibrary.general.phase1,
        },
        {
          start: 2,
          span: 6,
          subtasks: subtaskLibrary.general.phase2,
        },
        {
          start: 8,
          span: 8,
          subtasks: subtaskLibrary.general.phase3,
        },
        {
          start: 16,
          span: 6,
          subtasks: subtaskLibrary.general.phase4,
        },
      ],
    },
    cannabis: {
      name: "Cannabis",
      description: "Implementing QT9 for cannabis manufacturing accounts for Certificate of Analysis customizations and accommodates destruction of material reports. This implementation ensures full seed-to-sale traceability, METRC compliance, and state regulatory reporting.",
      maxWeeks: 28,
      phases: [
        {
          start: 0,
          span: 3,
          subtasks: subtaskLibrary.cannabis.phase1,
        },
        {
          start: 3,
          span: 8,
          subtasks: subtaskLibrary.cannabis.phase2,
        },
        {
          start: 11,
          span: 10,
          subtasks: subtaskLibrary.cannabis.phase3,
        },
        {
          start: 21,
          span: 7,
          subtasks: subtaskLibrary.cannabis.phase4,
        },
      ],
    },
    medical: {
      name: "Medical Device",
      description: "Medical device implementation may include complex BOM refinements and advanced lot tracking, as well as robust FDA-compliant batch record automation setups. This implementation ensures full traceability, quality system compliance, and regulatory readiness for FDA inspections.",
      maxWeeks: 32,
      phases: [
        {
          start: 0,
          span: 4,
          subtasks: subtaskLibrary.medical.phase1,
        },
        {
          start: 4,
          span: 10,
          subtasks: subtaskLibrary.medical.phase2,
        },
        {
          start: 14,
          span: 12,
          subtasks: subtaskLibrary.medical.phase3,
        },
        {
          start: 26,
          span: 6,
          subtasks: subtaskLibrary.medical.phase4,
        },
      ],
    },
    pharma: {
      name: "Pharmaceutical",
      description: "Pharmaceutical implementation emphasizes GMP compliance, 21 CFR Part 11 electronic signatures, and comprehensive validation protocols. This implementation ensures data integrity, batch record management, and FDA audit readiness for commercial production release.",
      maxWeeks: 36,
      phases: [
        {
          start: 0,
          span: 4,
          subtasks: subtaskLibrary.pharma.phase1,
        },
        {
          start: 4,
          span: 12,
          subtasks: subtaskLibrary.pharma.phase2,
        },
        {
          start: 16,
          span: 14,
          subtasks: subtaskLibrary.pharma.phase3,
        },
        {
          start: 30,
          span: 6,
          subtasks: subtaskLibrary.pharma.phase4,
        },
      ],
    },
    food: {
      name: "Food",
      description: "Food manufacturing implementation emphasizes FSMA compliance, HACCP plan integration, and comprehensive allergen management. This implementation ensures full lot traceability, temperature monitoring, recall readiness, and SQF/GFSI audit preparation for food safety certification.",
      maxWeeks: 24,
      phases: [
        {
          start: 0,
          span: 2,
          subtasks: subtaskLibrary.food.phase1,
        },
        {
          start: 2,
          span: 7,
          subtasks: subtaskLibrary.food.phase2,
        },
        {
          start: 9,
          span: 9,
          subtasks: subtaskLibrary.food.phase3,
        },
        {
          start: 18,
          span: 6,
          subtasks: subtaskLibrary.food.phase4,
        },
      ],
    },
  };

  // ===== Setup helper functions first =====
  // Read CSS variables dynamically on each call to handle responsive changes
  const getBounds = () => {
    const css = getComputedStyle(card);
    const labelCol = parseFloat(css.getPropertyValue("--label-col")) || 170;
    const colGap = parseFloat(css.getPropertyValue("--col-gap")) || 12;
    const pad = parseFloat(css.getPropertyValue("--card-pad")) || 18;
    
    const rect = card.getBoundingClientRect();
    
    // Use the timeline ruler (qt9-ticks) element's bounds for detection area
    // This automatically follows the same CSS grid rules that position the ruler correctly
    const ticksElement = card.querySelector(".qt9-ticks");
    if (ticksElement) {
      const ticksRect = ticksElement.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      // Calculate position relative to card - ticks element spans the correct timeline area
      const minX = ticksRect.left - cardRect.left;
      const maxX = ticksRect.right - cardRect.left;
      return { rect, minX, maxX, labelCol, colGap, pad };
    }
    
    // Fallback: use CSS variables if ticks element not found
    const minX = pad + labelCol + colGap;
    const maxX = rect.width - pad;
    
    return { rect, minX, maxX, labelCol, colGap, pad };
  };

  // ===== Tab Switching =====
  const tabs = card.querySelectorAll(".qt9-tab");
  let currentType = "general";
  let weeks = 22;
  let expandedLane = null;
  let activePhase = null;
  let phaseConfig = [];

  // Initialize phase config - must be defined before updateTimeline
  const initPhaseConfig = () => {
    const lanes = card.querySelectorAll(".qt9-lane");
    const config = implementationTypes[currentType];
    if (!config) {
      phaseConfig = [];
      return;
    }

    if (lanes.length === 0) {
      // DOM not ready yet, will be called again after updateTimeline
      return;
    }

    phaseConfig = config.phases.map((phase, index) => {
      const lane = lanes[index];
      const bar = card.querySelector(`.bar-${index + 1}`);
      const row = lane?.closest(".qt9-row");
      const label = row?.querySelector(".qt9-label");
      const chip = label?.querySelector(".qt9-bar-chip");
      return {
        start: phase.start,
        span: phase.span,
        lane: lane || null,
        bar: bar || null,
        chip: chip || null,
      };
    });
  };

  const updateTimeline = (type) => {
    currentType = type;
    const config = implementationTypes[type];
    if (!config) return;

    weeks = config.maxWeeks;
    card.style.setProperty("--weeks", weeks.toString());

    // Update week ticks
    const ticksContainer = card.querySelector("#week-ticks");
    if (ticksContainer) {
      ticksContainer.innerHTML = "";
      for (let i = 1; i <= weeks; i++) {
        const tick = document.createElement("div");
        tick.className = "qt9-tick";
        // Only show number for even weeks, but keep all tick marks visible
        tick.innerHTML = (i % 2 === 0) ? `<span>${i}</span>` : `<span></span>`;
        ticksContainer.appendChild(tick);
      }
    }

    // Update bars and subtasks
    const lanes = card.querySelectorAll(".qt9-lane");
    config.phases.forEach((phase, index) => {
      const lane = lanes[index];
      if (!lane) return;

      const bar = lane.querySelector(".qt9-bar");
      const hitbox = lane.querySelector(".qt9-swimlane-hitbox");
      const subtasksContainer = lane.querySelector(".qt9-subtasks");

      // Update bar position and span
      if (bar) {
        bar.style.setProperty("--start", phase.start.toString());
        bar.style.setProperty("--span", phase.span.toString());
      }
      if (hitbox) {
        hitbox.style.setProperty("--start", phase.start.toString());
        hitbox.style.setProperty("--span", phase.span.toString());
      }

      // Update subtasks
      if (subtasksContainer) {
        subtasksContainer.innerHTML = "";
        const defaultPhaseTasks = defaultTasks[`phase${index + 1}`] || [];
        phase.subtasks.forEach((subtask) => {
          const taskEl = document.createElement("div");
          const isIndustrySpecific = !defaultPhaseTasks.includes(subtask);
          taskEl.className = `qt9-subtask${isIndustrySpecific ? " qt9-subtask-industry" : ""}`;
          taskEl.textContent = subtask;
          subtasksContainer.appendChild(taskEl);
        });
      }
    });

    // Reset expanded state
    lanes.forEach((lane) => {
      lane.classList.remove("expanded");
    });
    document.querySelectorAll(".qt9-bar").forEach((bar) => {
      bar.classList.remove("hovered");
    });
    document.querySelectorAll(".qt9-bar-chip").forEach((chip) => {
      chip.classList.remove("active");
    });

    // Update active tab
    tabs.forEach((tab) => {
      tab.classList.toggle("active", tab.dataset.type === type);
    });

    // Update implementation description
    const descriptionEl = card.querySelector("#implementation-description");
    if (descriptionEl && config.description) {
      descriptionEl.textContent = config.description;
    }

    // Reinitialize phase config for hover detection after DOM updates
    // Use requestAnimationFrame to ensure DOM is fully updated
    requestAnimationFrame(() => {
      initPhaseConfig();
      // Reset hover state variables
      expandedLane = null;
      activePhase = null;
      lastPhase = null;
    });

    // Update dependency arrows
    if (renderDeps) {
      renderDeps();
    }

    // Update progress line bounds
    const lineEl = card.querySelector(".qt9-progress-line");
    if (lineEl) {
      const { minX } = getBounds();
      // Position at the start of week 1
      lineEl.style.setProperty("--cursor-x", `${minX}px`);
    }

    // Reattach subtask hover handlers after DOM update
    setTimeout(() => {
      attachSubtasksHandlers();
    }, 0);
  };

  // ===== Attach subtask hover handlers =====
  // Note: Expansion is now controlled solely by X-coordinate (week position)
  // This function is kept for potential future use but doesn't interfere with scrubbing
  let subtaskHandlersAttached = false;
  const attachSubtasksHandlers = () => {
    // Handlers removed - expansion is now controlled only by lateral mouse position
    subtaskHandlersAttached = true;
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      updateTimeline(tab.dataset.type);
    });
  });

  // ===== Dependency arrows setup (define before updateTimeline) =====
  const svg = card.querySelector(".qt9-deps");
  let renderDeps = null;

  if (svg) {
    const NS = "http://www.w3.org/2000/svg";
    const el = (name) => document.createElementNS(NS, name);

    renderDeps = () => {
      const bars = [
        card.querySelector(".bar-1"),
        card.querySelector(".bar-2"),
        card.querySelector(".bar-3"),
        card.querySelector(".bar-4"),
      ];

      if (!bars.every((b) => b)) return;

      // Clear
      while (svg.firstChild) svg.removeChild(svg.firstChild);

      svg.setAttribute("viewBox", `0 0 ${card.clientWidth} ${card.clientHeight}`);
      svg.setAttribute("preserveAspectRatio", "none");

      // defs + arrowhead
      const defs = el("defs");
      const marker = el("marker");
      marker.setAttribute("id", "qt9ArrowHead");
      marker.setAttribute("markerWidth", "10");
      marker.setAttribute("markerHeight", "10");
      marker.setAttribute("refX", "8");
      marker.setAttribute("refY", "5");
      marker.setAttribute("orient", "auto");
      marker.setAttribute("markerUnits", "strokeWidth");

      const head = el("path");
      head.setAttribute("d", "M 0 0 L 10 5 L 0 10 z");
      head.setAttribute("fill", "rgba(11,18,32,.35)");
      marker.appendChild(head);
      defs.appendChild(marker);
      svg.appendChild(defs);

      const cardRect = card.getBoundingClientRect();

      const draw = (fromEl, toEl) => {
        const a = fromEl.getBoundingClientRect();
        const b = toEl.getBoundingClientRect();

        // Anchor: right-middle of predecessor -> left-middle of successor
        const x1 = a.right - cardRect.left;
        const y1 = a.top + a.height / 2 - cardRect.top;
        const x2 = b.left - cardRect.left;
        const y2 = b.top + b.height / 2 - cardRect.top;

        const dx = Math.max(46, (x2 - x1) * 0.42);
        const lift = 22;

        const c1x = x1 + dx;
        const c1y = y1 - lift;
        const c2x = x2 - dx;
        const c2y = y2 - lift;

        const d = `M ${x1} ${y1} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${x2} ${y2}`;

        // Simple bezier curve path
        const path = el("path");
        path.setAttribute("d", d);
        path.setAttribute("fill", "none");
        path.setAttribute("stroke", "rgba(11,18,32,.35)");
        path.setAttribute("stroke-width", "1.8");
        path.setAttribute("stroke-linecap", "round");
        path.setAttribute("marker-end", "url(#qt9ArrowHead)");

        svg.appendChild(path);
      };

      draw(bars[0], bars[1]);
      draw(bars[1], bars[2]);
      draw(bars[2], bars[3]);
    };
  }

  // Initialize with default type
  updateTimeline("general");
  
  // Ensure phase config is initialized after DOM is ready
  setTimeout(() => {
    initPhaseConfig();
  }, 0);

  // ===== Cursor-tracking progress line (snaps to week columns) =====
  const line = card.querySelector(".qt9-progress-line");

  const snapToWeek = (x, minX, maxX) => {
    const clamped = Math.min(Math.max(x, minX), maxX);
    const span = maxX - minX;
    const currentWeeks = parseInt(card.style.getPropertyValue("--weeks")) || weeks;
    const weekWidth = span / currentWeeks;
    const snapped = Math.round((clamped - minX) / weekWidth) * weekWidth;
    return snapped + minX;
  };

  if (line) {
    const { minX } = getBounds();
    // Position at the start of week 1 (left edge of timeline area)
    line.style.setProperty("--cursor-x", `${minX}px`);

    card.addEventListener("mousemove", (e) => {
      const { rect, minX, maxX } = getBounds();
      const x = e.clientX - rect.left;
      const snappedX = snapToWeek(x, minX, maxX);
      line.style.setProperty("--cursor-x", `${snappedX}px`);
    });

    card.addEventListener("mouseleave", () => {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/5215b819-0085-4d65-a6e9-6b5b576fdca2',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.js:634',message:'Progress line mouseleave',data:{expandedLane:expandedLane?.className||null},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
      // #endregion
      const { minX } = getBounds();
      // Return to start of week 1 when mouse leaves
      line.style.setProperty("--cursor-x", `${minX}px`);
    });
  }

  // Render once, then keep arrows glued to the bars even while bars translate on hover.
  let rafId = null;
  let stopTimeout = null;
  const loop = () => {
    if (renderDeps) {
      renderDeps();
    }
    rafId = requestAnimationFrame(loop);
  };

  // Always visible, always tracking: run loop while pointer is over the card.
  const start = () => {
    // Clear any pending stop timeout
    if (stopTimeout) {
      clearTimeout(stopTimeout);
      stopTimeout = null;
    }
    if (rafId == null) rafId = requestAnimationFrame(loop);
  };
  const stop = () => {
    // Don't stop immediately - continue updating for the duration of the bar transition
    // This ensures arrows match the final position after bars finish animating
    if (stopTimeout) {
      clearTimeout(stopTimeout);
    }
    // Bar transitions are 380ms, continue for slightly longer to catch the end
    stopTimeout = setTimeout(() => {
      if (rafId != null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      // Final render to ensure arrows are in correct position
      if (renderDeps) {
        renderDeps();
      }
      stopTimeout = null;
    }, 450); // Slightly longer than the 380ms transition + buffer
  };

  // Initial draw + responsive redraw
  renderDeps();
  window.addEventListener("resize", () => {
    renderDeps();
  });
  card.addEventListener("mouseenter", start);
  card.addEventListener("mouseleave", stop);

  // ===== X-coordinate based hover: expand phase based on week position =====
  // Note: expandedLane, activePhase, phaseConfig, and initPhaseConfig are defined above in the Tab Switching section

  const getWeekFromX = (x, minX, maxX, currentWeeks = weeks) => {
    const span = maxX - minX;
    const weekWidth = span / currentWeeks;
    const relativeX = x - minX;
    // Use Math.round for more accurate week detection at boundaries
    const weekIndex = Math.round(relativeX / weekWidth);
    return Math.max(0, Math.min(currentWeeks - 1, weekIndex));
  };

  const getPhaseForWeek = (weekIndex) => {
    // Find phase that contains this week index (inclusive ranges)
    return phaseConfig.find(
      (phase) =>
        weekIndex >= phase.start && weekIndex < phase.start + phase.span
    );
  };


  // Throttle mousemove to reduce glitchiness
  let hoverRafId = null;
  let lastPhase = null;
  let paddingTimeouts = []; // Track padding calculation timeouts to cancel them

  const handleMouseMove = (e) => {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/5215b819-0085-4d65-a6e9-6b5b576fdca2',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.js:698',message:'handleMouseMove called',data:{clientX:e.clientX,clientY:e.clientY,expandedLane:expandedLane?.className||null},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
    // #endregion
    if (hoverRafId) return; // Skip if already scheduled

    hoverRafId = requestAnimationFrame(() => {
      hoverRafId = null;
      const { rect, minX, maxX } = getBounds();
      const x = e.clientX - rect.left;

      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/5215b819-0085-4d65-a6e9-6b5b576fdca2',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.js:707',message:'Bounds check',data:{x:x,minX:minX,maxX:maxX,isOutside:x<minX||x>maxX,expandedLane:expandedLane?.className||null},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
      // #endregion

      // Only process if mouse is over the timeline area (not label column)
      if (x < minX || x > maxX) {
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/5215b819-0085-4d65-a6e9-6b5b576fdca2',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.js:710',message:'Mouse outside bounds - collapsing',data:{expandedLane:expandedLane?.className||null,pendingTimeouts:paddingTimeouts.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'C'})}).catch(()=>{});
        // #endregion
        if (expandedLane) {
          // Cancel any pending padding calculations
          paddingTimeouts.forEach(timeout => clearTimeout(timeout));
          paddingTimeouts = [];
          expandedLane.classList.remove("expanded");
          // #region agent log
          fetch('http://127.0.0.1:7242/ingest/5215b819-0085-4d65-a6e9-6b5b576fdca2',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.js:712',message:'Removed expanded class',data:{laneHasExpanded:expandedLane.classList.contains('expanded')},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'C'})}).catch(()=>{});
          // #endregion
          expandedLane = null;
          activePhase = null;
          lastPhase = null;
          // Remove margin-bottom from any expanded row when no lane is expanded
          const allRows = card.querySelectorAll(".qt9-row");
          allRows.forEach(row => {
            row.style.marginBottom = "";
          });
          // #region agent log
          fetch('http://127.0.0.1:7242/ingest/5215b819-0085-4d65-a6e9-6b5b576fdca2',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.js:717',message:'Reset row margins',data:{rowsReset:allRows.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'C'})}).catch(()=>{});
          // #endregion
          // Remove hover state from all bars and chips
          phaseConfig.forEach((p) => {
            if (p.bar) p.bar.classList.remove("hovered");
            if (p.chip) p.chip.classList.remove("active");
          });
        }
        return;
      }

      const currentWeeks = parseInt(card.style.getPropertyValue("--weeks")) || weeks;
      const weekIndex = getWeekFromX(x, minX, maxX, currentWeeks);
      
      // Reinitialize if phaseConfig is empty (shouldn't happen, but safety check)
      if (phaseConfig.length === 0) {
        initPhaseConfig();
      }
      
      // Get phase from X coordinate (week position) - simple lateral scrubbing
      const phase = getPhaseForWeek(weekIndex);

      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/5215b819-0085-4d65-a6e9-6b5b576fdca2',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.js:736',message:'Phase detection',data:{weekIndex:weekIndex,phaseFound:!!phase,phaseStart:phase?.start,phaseSpan:phase?.span,lastPhase:lastPhase?.start,expandedLane:expandedLane?.className||null},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
      // #endregion

      // Only update if phase changed
      if (phase === lastPhase) return;
      lastPhase = phase;

      if (phase && phase.lane) {
        // Update expanded lane - collapse previous, expand new
        if (expandedLane && expandedLane !== phase.lane) {
          // Cancel pending margin calculations for previous phase
          paddingTimeouts.forEach(timeout => clearTimeout(timeout));
          paddingTimeouts = [];
          expandedLane.classList.remove("expanded");
          // Immediately reset margin-bottom on the previous row when switching phases
          const previousRow = expandedLane.closest(".qt9-row");
          if (previousRow) {
            previousRow.style.marginBottom = "";
          }
        }
        
        // Expand the phase lane that matches the week range
        phase.lane.classList.add("expanded");
        expandedLane = phase.lane;
        
        // #region agent log
        const subtasksCheck = phase.lane.querySelector(".qt9-subtasks");
        const computedStyle = window.getComputedStyle(subtasksCheck || document.body);
        fetch('http://127.0.0.1:7242/ingest/5215b819-0085-4d65-a6e9-6b5b576fdca2',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.js:750',message:'Lane expanded',data:{laneHasExpanded:phase.lane.classList.contains('expanded'),subtasksExists:!!subtasksCheck,subtasksVisibility:subtasksCheck?computedStyle.visibility:null,subtasksOpacity:subtasksCheck?computedStyle.opacity:null,subtasksHeight:subtasksCheck?computedStyle.height:null,subtasksDisplay:subtasksCheck?computedStyle.display:null,phaseStart:phase.start},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'D'})}).catch(()=>{});
        // #endregion
        
        // Update the row containing the expanded lane to create space directly under it
        const expandedRow = expandedLane.closest(".qt9-row");
        if (expandedRow && expandedLane) {
          const subtasks = expandedLane.querySelector(".qt9-subtasks");
          // #region agent log
          fetch('http://127.0.0.1:7242/ingest/5215b819-0085-4d65-a6e9-6b5b576fdca2',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.js:753',message:'Checking subtasks',data:{subtasksExists:!!subtasks,subtasksClasses:subtasks?.className||null,subtasksVisibility:subtasks?.style.visibility||'not-set',subtasksHeight:subtasks?.offsetHeight||0,subtasksInnerHTML:subtasks?.innerHTML.length||0,phaseStart:phase.start},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'E'})}).catch(()=>{});
          // #endregion
          if (subtasks) {
            // Cancel any pending padding calculations from previous phase
            paddingTimeouts.forEach(timeout => clearTimeout(timeout));
            paddingTimeouts = [];
            
            // Store reference to current phase and row for validation
            const currentPhaseRef = phase;
            const currentRowRef = expandedRow;
            
            // Calculate margin-bottom for the row to create space directly under the expanded phase
            const calculateRowMargin = () => {
              // Only calculate if this lane is still expanded and matches current phase
              if (!expandedLane || !expandedLane.classList.contains("expanded") || expandedLane !== currentPhaseRef.lane) {
                // #region agent log
                fetch('http://127.0.0.1:7242/ingest/5215b819-0085-4d65-a6e9-6b5b576fdca2',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.js:790',message:'Skipping margin calc - lane no longer expanded',data:{expandedLane:expandedLane?.className||null,phaseLane:currentPhaseRef.lane?.className||null,phaseStart:currentPhaseRef.start},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'E'})}).catch(()=>{});
                // #endregion
                return;
              }
              
              // Ensure subtasks are visible for measurement
              const wasHidden = subtasks.style.visibility === 'hidden';
              if (wasHidden) {
                subtasks.style.visibility = 'visible';
                subtasks.style.height = 'auto';
                subtasks.style.opacity = '1';
              }
              
              // Force a reflow to get accurate measurements
              void subtasks.offsetHeight;
              
              // Use multiple methods to get accurate height
              const scrollHeight = subtasks.scrollHeight;
              const offsetHeight = subtasks.offsetHeight;
              const clientHeight = subtasks.clientHeight;
              
              // #region agent log
              fetch('http://127.0.0.1:7242/ingest/5215b819-0085-4d65-a6e9-6b5b576fdca2',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.js:776',message:'Subtask height calculation',data:{scrollHeight:scrollHeight,offsetHeight:offsetHeight,clientHeight:clientHeight,computedHeight:Math.max(scrollHeight,offsetHeight,clientHeight,100),hasExpandedClass:expandedLane?.classList.contains('expanded'),currentPhase:currentPhaseRef.start},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'E'})}).catch(()=>{});
              // #endregion
              
              // Use the largest value to ensure full visibility
              const subtasksHeight = Math.max(scrollHeight, offsetHeight, clientHeight, 100);
              
              // Add extra margin for spacing (10px gap + 20px buffer)
              const marginBottom = Math.max(subtasksHeight + 30, 150);
              
              // Apply margin-bottom to the row containing the expanded lane
              // This creates space directly under the expanded phase
              currentRowRef.style.marginBottom = `${marginBottom}px`;
              
              // #region agent log
              fetch('http://127.0.0.1:7242/ingest/5215b819-0085-4d65-a6e9-6b5b576fdca2',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.js:780',message:'Row margin set',data:{marginBottom:marginBottom,subtasksHeight:subtasksHeight,rowMarginBottom:currentRowRef.style.marginBottom,currentPhase:currentPhaseRef.start},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'E'})}).catch(()=>{});
              // #endregion
              
              // Restore original visibility if it was hidden
              if (wasHidden) {
                subtasks.style.visibility = '';
                subtasks.style.height = '';
                subtasks.style.opacity = '';
              }
            };
            
            // Set initial margin immediately
            requestAnimationFrame(() => {
              calculateRowMargin();
              // Refine after content renders
              const timeout1 = setTimeout(calculateRowMargin, 50);
              paddingTimeouts.push(timeout1);
              // Final refinement after transition completes
              const timeout2 = setTimeout(calculateRowMargin, 450);
              paddingTimeouts.push(timeout2);
            });
          }
        }

        // Update bar and chip hover states
        if (activePhase !== phase) {
          phaseConfig.forEach((p) => {
            if (p.bar) {
              p.bar.classList.remove("hovered");
            }
            if (p.chip) {
              p.chip.classList.remove("active");
            }
          });
          if (phase.bar) {
            phase.bar.classList.add("hovered");
          }
          if (phase.chip) {
            phase.chip.classList.add("active");
          }
          activePhase = phase;
        }
      } else {
        // No phase for this week - collapse if expanded
        if (expandedLane) {
          // Cancel any pending margin calculations
          paddingTimeouts.forEach(timeout => clearTimeout(timeout));
          paddingTimeouts = [];
          expandedLane.classList.remove("expanded");
          // Reset margin-bottom on the row when collapsing
          const previousRow = expandedLane.closest(".qt9-row");
          if (previousRow) {
            previousRow.style.marginBottom = "";
          }
          expandedLane = null;
        }
        phaseConfig.forEach((p) => {
          if (p.bar) p.bar.classList.remove("hovered");
          if (p.chip) p.chip.classList.remove("active");
        });
        activePhase = null;
      }
    });
  };

  const handleMouseLeave = (e) => {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/5215b819-0085-4d65-a6e9-6b5b576fdca2',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.js:874',message:'handleMouseLeave called',data:{relatedTarget:e.relatedTarget?.tagName||null,expandedLane:expandedLane?.className||null,pendingTimeouts:paddingTimeouts.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    // Cancel any pending animation frame
    if (hoverRafId) {
      cancelAnimationFrame(hoverRafId);
      hoverRafId = null;
    }

    // Cancel all pending margin calculations
    paddingTimeouts.forEach(timeout => clearTimeout(timeout));
    paddingTimeouts = [];

    // Collapse all expanded lanes and reset to normal spacing
    // Reset margin-bottom on all rows
    const allRows = card.querySelectorAll(".qt9-row");
    allRows.forEach(row => {
      row.style.marginBottom = "";
    });
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/5215b819-0085-4d65-a6e9-6b5b576fdca2',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.js:882',message:'Reset row margins in mouseleave',data:{rowsReset:allRows.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    
    // Collapse all lanes
    const allLanes = card.querySelectorAll(".qt9-lane.expanded");
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/5215b819-0085-4d65-a6e9-6b5b576fdca2',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.js:886',message:'Found expanded lanes',data:{expandedLaneCount:allLanes.length,expandedLane:expandedLane?.className||null},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    allLanes.forEach((lane) => {
      lane.classList.remove("expanded");
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/5215b819-0085-4d65-a6e9-6b5b576fdca2',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.js:889',message:'Removed expanded from lane',data:{laneStillHasExpanded:lane.classList.contains('expanded')},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'A'})}).catch(()=>{});
      // #endregion
    });
    
    expandedLane = null;
    activePhase = null;
    lastPhase = null;
    
    // Remove hover state from all bars and chips
    phaseConfig.forEach((p) => {
      if (p.bar) p.bar.classList.remove("hovered");
      if (p.chip) p.chip.classList.remove("active");
    });
  };

  // Initial attachment of subtask handlers
  attachSubtasksHandlers();

  // Listen to mousemove on the card (to include axis and bars areas)
  card.addEventListener("mousemove", handleMouseMove);
  card.addEventListener("mouseleave", handleMouseLeave);
});
