export const projectsData = [
  // --- Hackathon Projects ---
  {
    slug: "sanket-civiclens",
    title: "SANKET × CivicLens",
    headline: "Evidence-Driven Civic Intelligence Platform",
    category: "CIVIC INTELLIGENCE PLATFORM",
    event: "ByteBuild 1.0 (ByteXL × Chandigarh University)",
    team: "InfraNova",
    badge: "BYTEBUILD 2026",
    isHackathon: true,
    isIuxoa: false,
    shortDescription: "An evidence-driven civic intelligence platform that turns citizen reports into verified, prioritized and actionable civic intelligence.",
    image: "/images/sanket_cover.jpg",
    overview: "SANKET × CivicLens bridges the communication gap between citizens and municipal authorities. Instead of traditional static complaint portals that lead to backlog fatigue, SANKET uses multimodal inputs (geo-tagged photos, natural language descriptions, and sensor telemetry) to automatically validate evidence, detect and cluster duplicate issues, compute composite Civic Risk scores, and prioritize municipal dispatch.",
    contribution: "Architected the civic reporting pipeline and backend intelligence workflow. Integrated geospatial clustering to aggregate isolated citizen submissions into unified incident heatmaps, reducing redundant ticket dispatches by municipal teams.",
    techStack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Supabase", "PostgreSQL", "FastAPI", "OpenCV", "Geospatial Clustering"],
    features: [
      {
        title: "Multimodal Civic Reporting",
        description: "Enables citizens to submit photo evidence with automatic GPS extraction, timestamp verification, and NLP description parsing."
      },
      {
        title: "Automated Evidence Validation",
        description: "Uses computer vision heuristics to filter out spam, improper captures, and non-civic media before tickets are created."
      },
      {
        title: "Deduplication & Incident Clustering",
        description: "Clusters related reports occurring within geographic proximity and temporal windows into a single master ticket."
      },
      {
        title: "Civic Risk & Urgency Scoring",
        description: "Calculates an objective risk score based on hazard type, pedestrian footfall, road classification, and public impact."
      },
      {
        title: "Authority Decision-Support Dashboard",
        description: "Provides municipal supervisors with an interactive map, severity heatmaps, workforce assignment, and resolution verification."
      }
    ],
    learnings: "Deepened practical knowledge of geospatial data pipelines, clustering algorithms (DBSCAN), and handling real-world noisy sensor inputs. Gained hands-on experience designing intuitive public-sector software dashboards.",
    gallery: [
      { src: "/images/sanket_cover.jpg", caption: "SANKET × CivicLens Civic Intelligence Platform Cover & Overview" }
    ],
    presentation: {
      type: "pdf",
      title: "SANKET Pitch Deck & System Architecture",
      file: "/SANKET.pdf",
      fileName: "SANKET.pdf",
      preview: "/images/sanket_presentation_preview.png",
      format: "PDF Presentation Deck"
    },
    links: {
      github: null,
      demo: "https://sanket-w8uy.vercel.app/"
    }
  },
  {
    slug: "ecdat",
    title: "ECDAT",
    fullTitle: "Enterprise Cryptographic Discovery & Analysis Tool",
    headline: "Enterprise Cryptographic Posture Management Platform",
    category: "CYBERSECURITY & POSTURE MANAGEMENT",
    event: "Tekathon 5.0",
    problemStatement: "Tekathon 5.0 — Enterprise Cryptographic Discovery & Analysis Tool",
    theme: "Blockchain & Cybersecurity",
    badge: "TEKATHON 5.0",
    isHackathon: true,
    isIuxoa: false,
    shortDescription: "An enterprise cryptographic posture management platform designed to discover cryptographic assets, analyze risk, map dependencies and support future-proof cryptographic migration.",
    image: "/images/ecdat_cover.jpg",
    overview: "Enterprise systems contain vast, undocumented cryptographic assets—legacy ciphers (MD5, SHA-1, RSA-1024), hardcoded secret keys, and vulnerable protocols. With the looming advent of quantum computing, adversaries engage in 'Harvest Now, Decrypt Later' (HNDL) attacks. ECDAT provides enterprise-wide tri-modal discovery to build a live Cryptographic Bill of Materials (CBOM), assess quantum vulnerabilities, and execute guarded migration to Post-Quantum Cryptography (PQC).",
    contribution: "Co-architected the cryptographic knowledge graph system and quantum risk evaluation framework. Designed the data structures mapping dependencies between algorithmic primitives, certificate authorities, key storage, and microservices.",
    techStack: ["Python", "Network Graph Analysis", "Static Analysis (AST Parsing)", "CBOM Standards", "React", "Tailwind CSS", "Cryptography.io"],
    features: [
      {
        title: "Tri-Modal Cryptographic Discovery",
        description: "Discovers crypto assets across three dimensions: static source code analysis, dynamic runtime network traffic interception, and key/certificate store inspection."
      },
      {
        title: "Cryptographic Knowledge Graph",
        description: "Maps interconnected dependencies between cryptographic primitives, microservices, protocols, and data stores to identify single points of failure."
      },
      {
        title: "Quantum Risk & HNDL Scoring",
        description: "Calculates exposure to 'Harvest Now, Decrypt Later' threats using data shelf-life metrics and quantum computing progress projections."
      },
      {
        title: "Blast-Radius Analysis",
        description: "Simulates the cascading security and architectural impact if an algorithmic standard (e.g., RSA-2048 or ECC) is deprecated or broken."
      },
      {
        title: "PQC Migration Simulation",
        description: "Simulates migration pathways to NIST Post-Quantum standards (ML-KEM, ML-DSA, SLH-DSA), estimating payload overhead and performance impact."
      },
      {
        title: "Guarded Remediation",
        description: "Generates automated policy-as-code rules and pull requests with safety rollbacks to modernize deprecated cipher suites without breaking production."
      }
    ],
    learnings: "Gained comprehensive expertise in cryptographic algorithms, post-quantum standards, graph theory for dependency analysis, and the security implications of hardware architectural shifts.",
    gallery: [
      { src: "/images/ecdat_cover.jpg", caption: "ECDAT Cryptographic Discovery & Posture Management Platform Interface" }
    ],
    presentation: {
      type: "pptx",
      title: "ECDAT Enterprise Cryptographic Posture Deck",
      file: "/ecdat.pptx",
      fileName: "ecdat.pptx",
      preview: null,
      format: "PowerPoint Presentation (PPTX)"
    },
    links: {
      github: null,
      demo: "https://ecdat-virid.vercel.app/dashboard"
    }
  },
  {
    slug: "satquery",
    title: "SatQuery",
    headline: "Interactive Satellite Intelligence Workspace",
    category: "SATELLITE INTELLIGENCE WORKSPACE",
    event: "Project Expo 2026",
    team: "Cognitrail",
    badge: "PROJECT EXPO 2026",
    isHackathon: true,
    isIuxoa: false,
    shortDescription: "An interactive satellite intelligence workspace combining satellite imagery exploration, natural-language querying and evidence-transparent analysis.",
    image: "/images/satquery_cover.jpg",
    overview: "SatQuery transforms complex Earth Observation (EO) data into an accessible, interactive workspace. By integrating SpatioTemporal Asset Catalogs (STAC) from Sentinel-1 (Synthetic Aperture Radar) and Sentinel-2 (Multispectral Optical), SatQuery allows analysts and researchers to query satellite data using natural language, explore 3D Earth visualizations, and review AI-driven explanations backed by verified pixel evidence.",
    contribution: "Developed the frontend geospatial workspace and interactive map visualization pipelines. Implemented multi-spectral band combination visualizers (NDVI, urban indices) and the evidence-transparent reporting interface.",
    techStack: ["React", "CesiumJS (3D Globe)", "Leaflet Maps", "Python", "STAC API", "Copernicus Open Access Hub", "Tailwind CSS"],
    features: [
      {
        title: "Natural-Language Geospatial Queries",
        description: "Translates conversational questions (e.g., 'Show flood progression in Assam over June 2026') into precise STAC catalog search parameters."
      },
      {
        title: "Multi-Spectral Sensor Fusion",
        description: "Combines optical multispectral data from Sentinel-2 with all-weather radar data from Sentinel-1 for deep land and water analysis."
      },
      {
        title: "Interactive 3D Earth & 2D Precision Maps",
        description: "Seamlessly switches between high-altitude planetary orbit in CesiumJS and localized centimeter-precision GIS layers in Leaflet."
      },
      {
        title: "Evidence-Transparent AI Explanations",
        description: "Every AI inference links directly to underlying multispectral pixel data, solar zenith angles, and reflectance matrices to prevent hallucinations."
      },
      {
        title: "Automated Temporal Change Detection",
        description: "Calculates differential indices (NDVI, NDWI) across multiple satellite passes to detect deforestation, urban expansion, and water body shifts."
      },
      {
        title: "Gesture-Controlled Navigation",
        description: "Supports touch-free gesture interactions for collaborative mission control room presentations and command center operations."
      }
    ],
    learnings: "Mastered large-scale geospatial raster rendering, multispectral reflectance indices, web-based 3D globe coordinate systems, and verifiable AI auditing.",
    gallery: [
      { src: "/images/satquery_cover.jpg", caption: "SatQuery Earth Intelligence & SpatioTemporal Query Workspace" }
    ],
    presentation: {
      type: "pptx",
      title: "SatQuery Earth Intelligence Presentation",
      file: "/SatQuery_Earth_Presentation.pptx",
      fileName: "SatQuery_Earth_Presentation.pptx",
      preview: null,
      format: "PowerPoint Presentation (PPTX)"
    },
    links: {
      github: null,
      demo: "https://sat-query-dwr4keowb-auctor28-s-projects1.vercel.app/"
    }
  },

  // --- Professional Projects (IuXoa) ---
  {
    slug: "trapmate",
    title: "TrapMate",
    headline: "Original Two-Player Strategy Board Game",
    category: "STRATEGY BOARD GAME",
    event: "Product Engineering",
    badge: "MADE WITH IuXoa",
    status: "New Version Under Development",
    availabilityNote: "A new version of TrapMate is currently under active development at IuXoa Studio. Source code is proprietary and private to the studio.",
    isHackathon: false,
    isIuxoa: true,
    shortDescription: "An original multiplayer strategy board game inspired by tactical positioning, piece trapping, and dynamic territory control mechanics. A new version is currently under active development.",
    image: "/images/trapmate_ui.png",
    overview: "TrapMate is an original strategy board game that blends the deliberate forethought of Chess with the territorial flipping dynamics of Othello. Featuring custom piece archetypes, Sentinel influence zones, and special Base-flipping conditions, TrapMate challenges players to balance offensive encirclement with positional defense. A brand-new version is currently under active development.",
    contribution: "Core product development, interactive game board state management, turn resolution algorithms, and real-time multiplayer room synchronization.",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL", "Prisma", "Firebase"],
    features: [
      {
        title: "Deterministic Game Logic Engine",
        description: "Client-side and server-authoritative rule verification ensuring zero illegal piece movements or desync states."
      },
      {
        title: "Real-Time Room Matchmaking",
        description: "Instantaneous WebSocket room creation, public lobbies, and private code-based match pairing."
      },
      {
        title: "Tactical Trapping Mechanics",
        description: "Algorithmic detection of surrounded opposing pieces, triggering dynamic piece flipping and territory control gains."
      },
      {
        title: "Adaptive Bot AI",
        description: "Built-in heuristic bot utilizing minimax search and board evaluation matrices for single-player practice."
      }
    ],
    learnings: "Deepened expertise in turn-based game loop architecture, high-frequency state synchronization, and deterministic board game algorithms.",
    gallery: [
      { src: "/images/trapmate_ui.png", caption: "TrapMate Strategy & Identity Interface" }
    ],
    links: {
      github: null,
      demo: null
    }
  },
  {
    slug: "woink",
    title: "Woink!",
    headline: "Multiplayer Party & Arcade Gaming Platform",
    category: "MULTIPLAYER GAMING PLATFORM",
    event: "IuXoa Studio",
    badge: "MADE WITH IuXoa",
    isHackathon: false,
    isIuxoa: true,
    shortDescription: "A vibrant multiplayer gaming platform featuring real-time matchmaking, custom lobbies, and modular game session infrastructure.",
    image: "/images/woink.png",
    overview: "Woink is an engaging multiplayer gaming platform built for quick matchmaking, competitive party modes, and vibrant visual interactions. Engineered at IuXoa Studio, the platform hosts dynamic game rooms, character customizations, and real-time player leaderboards.",
    contribution: "Frontend Developer (Officially recognized by IuXoa Studio). Revamped the interface and multiplayer gameplay workflow, creating over 20+ responsive UI components, dual matchmaking workflows, and custom avatar profiles.",
    techStack: ["React", "JavaScript", "Tailwind CSS", "WebSockets", "Redux", "Session State Architecture"],
    features: [
      {
        title: "Dual Matchmaking Workflows",
        description: "Allows instantaneous random matchmaking as well as private party lobby room creation with custom rules."
      },
      {
        title: "20+ Reusable UI Components",
        description: "Designed and built modular game HUD, player cards, room selector, and dynamic result screens."
      },
      {
        title: "Character & Avatar Customizer",
        description: "Rich customizer with animated character presets, color palettes, and cosmetic badge progression."
      },
      {
        title: "Low-Latency Session State",
        description: "Synchronized countdown timers, player ready-checks, and in-game status notifications."
      }
    ],
    learnings: "Enhanced practical skills in state synchronization across distributed clients, designing responsive game HUDs, and collaborating with cross-functional teams under tight production cycles.",
    gallery: [
      { src: "/images/woink.png", caption: "Woink Game Platform Interface" }
    ],
    certificate: {
      id: "IUXOA-COA-E2T6",
      title: "Certificate of Contribution — Frontend Developer",
      role: "Frontend Developer",
      issuer: "IuXoa Studio (Ayush Mahanta, Founder & CEO)",
      date: "May 25, 2025",
      image: "/images/certificate_woink_e2t6.png"
    },
    links: {
      github: null,
      demo: null
    }
  },
  {
    slug: "runox",
    title: "Runox",
    headline: "Fitness & Milestone Tracking Application",
    category: "FITNESS TRACKING & MAPS",
    event: "IuXoa Studio",
    badge: "MADE WITH IuXoa",
    isHackathon: false,
    isIuxoa: true,
    shortDescription: "A fitness and milestone tracking application featuring precise map integration, route tracking, cadence metrics, and real-time backend synchronization.",
    image: "/images/runox.png",
    overview: "Runox is a performance-focused fitness and running companion application. It tracks user routes, calculates real-time pace and elevation metrics, rewards fitness milestones, and offers community leaderboards.",
    contribution: "Backend Developer & Map Integration (Officially recognized by IuXoa Studio). Developed backend endpoints, location telemetry aggregation, and integrated precision map services.",
    techStack: ["Kotlin / Android", "Node.js", "Firebase / Firestore", "Google Maps API", "Geospatial Telemetry"],
    features: [
      {
        title: "Real-Time Route Telemetry",
        description: "High-precision GPS coordinate smoothing and distance calculation using the Haversine formula."
      },
      {
        title: "Milestone & Badge Engine",
        description: "Backend rules assessing pace, distance streaks, and elevation gain to award dynamic milestone badges."
      },
      {
        title: "Cloud Sync & Offline Caching",
        description: "Ensures runner data is never lost during cellular dead zones by syncing once network connectivity resumes."
      },
      {
        title: "Social Leaderboard System",
        description: "Optimized database queries for fast weekly and monthly leaderboard calculations across runners."
      }
    ],
    learnings: "Strengthened knowledge of geospatial coordinate systems, mobile battery optimization during continuous GPS polling, and scalable NoSQL database modeling.",
    gallery: [
      { src: "/images/runox.png", caption: "Runox Fitness Tracker Interface" }
    ],
    certificate: {
      id: "IUXOA-COA-3KFR",
      title: "Certificate of Contribution — Backend Developer, Map Integration",
      role: "Backend Developer & Map Integration",
      issuer: "IuXoa Studio (Ayush Mahanta, Founder & CEO)",
      date: "May 25, 2025",
      image: "/images/certificate_runox_3kfr.png"
    },
    links: {
      github: null,
      demo: null
    }
  },
  {
    slug: "paradox",
    title: "Paradox",
    headline: "Accessible Puzzle Game Interface",
    category: "ACCESSIBLE PUZZLE INTERFACE",
    event: "IuXoa Studio",
    badge: "MADE WITH IuXoa",
    isHackathon: false,
    isIuxoa: true,
    shortDescription: "An accessible puzzle game interface spanning 15+ gameplay screens with high-contrast accessibility modes, tactile feedback, and ergonomic layout systems.",
    image: "/images/paradox.jpg",
    overview: "Paradox is an intellect-driven puzzle title engineered with an uncompromising focus on accessibility, clarity, and cognitive comfort. Designed to be enjoyable for players of all abilities, Paradox incorporates WCAG AAA contrast standards, screen reader compatibility, and tactile response cues.",
    contribution: "Frontend Developer (Officially recognized by IuXoa Studio). Engineered the responsive interface across 15+ game screens, partnering closely with the design team to ensure complete accessibility compliance.",
    techStack: ["React", "JavaScript", "Responsive UI", "Web Accessibility (WCAG / a11y)", "Tactile Haptics", "Game HUD"],
    features: [
      {
        title: "15+ Accessible Game Screens",
        description: "Consistent, low-strain layouts spanning main menu, level select, gameplay HUD, pause overlays, and victory dialogs."
      },
      {
        title: "Accessibility-First Design System",
        description: "High-contrast color modes, customizable font scaling, and full keyboard/gamepad navigation compliance."
      },
      {
        title: "Tactile Audio & Visual Cues",
        description: "Dual-channel feedback ensuring colorblind players can identify board tile states without relying purely on hue."
      },
      {
        title: "Ergonomic Layouts",
        description: "Thumb-zone optimized button placement ensuring comfortable interaction on mobile and desktop viewports."
      }
    ],
    learnings: "Gained deep practical insights into web accessibility guidelines (a11y), inclusive design thinking, and engineering resilient UI layouts that accommodate diverse user needs.",
    gallery: [
      { src: "/images/paradox.jpg", caption: "Paradox Mandala & Visual Identity" }
    ],
    certificate: {
      id: "IUXOA-COA-4FE5",
      title: "Certificate of Contribution — Frontend Developer",
      role: "Frontend Developer",
      issuer: "IuXoa Studio (Ayush Mahanta, Founder & CEO)",
      date: "May 25, 2025",
      image: "/images/certificate_paradox_4fe5.png"
    },
    links: {
      github: null,
      demo: null
    }
  }
];
