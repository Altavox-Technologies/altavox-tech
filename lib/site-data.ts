export interface ProjectItem {
  slug: string
  name: string
  category: string
  client: string
  summary: string
  description: string
  engineeringChallenge?: string
  engineeringSolution?: string
  status: 'In development' | 'Production' | 'Exploration' | 'Archived'
  projectGroup: 'client' | 'ecosystem'
  visibility?: 'public' | 'private'
  url: string
  screenshotUrl?: string
  tags: string[]
  metrics?: { label: string; value: string }[]
  architecture?: {
    frontend: string
    backend: string
    database: string
    infrastructure: string
  }
  keyFeatures: string[]
}

export const projects: ProjectItem[] = [
  {
    slug: 'jaslyn-net',
    name: 'Jaslyn Net',
    category: 'ISP Management & Telecom Automation',
    client: 'Jaslyn Net',
    summary: 'A comprehensive ISP management, Wi-Fi billing, AAA, subscriber management, and network automation platform.',
    description: 'Jaslyn Net connects subscriber lifecycle, automated mobile-money billing reconciliation, RADIUS AAA authentication, bandwidth quota enforcement, and multi-vendor router provisioning into an integrated operational control plane.',
    engineeringChallenge: 'Real-time synchronization between asynchronous mobile payment confirmations, subscriber session accounting, and router rate-limiting queues across distributed physical access points without packet drop or billing race conditions.',
    engineeringSolution: 'Event-driven webhook ingestion pipeline with cryptographic signature verification, idempotent transactional database state updates, and asynchronous RouterOS API queues with automated retry backoffs.',
    status: 'Production',
    projectGroup: 'client',
    visibility: 'public',
    url: 'https://jaslyn-net.altavox.space',
    screenshotUrl: '/projects/jaslyn-net-live.png',
    tags: ['ISP Management', 'Wi-Fi Billing', 'RADIUS / AAA', 'Subscriber Management', 'Network Automation', 'MikroTik RouterOS'],
    architecture: {
      frontend: 'Next.js, TypeScript, Tailwind CSS',
      backend: 'Node.js, REST APIs, RouterOS API Engine',
      database: 'PostgreSQL with connection pooling',
      infrastructure: 'Self-hosted Linux server, Docker containers, TLS automation'
    },
    keyFeatures: [
      'Subscriber lifecycle and bandwidth tier management',
      'Automated mobile-money payment reconciliation workflows',
      'RADIUS / AAA session accounting and access enforcement',
      'RouterOS API automation for hotspot and PPPoE subscribers',
      'Operational visibility for support and NOC diagnostics'
    ]
  },
  {
    slug: 'sammena',
    name: 'Sammena School',
    category: 'Educational Technology & Management',
    client: 'Sammena Pre & Primary School',
    summary: 'A modern school management and educational platform designed for unified administration, public communications, and academic record tracking.',
    description: 'Sammena School provides an institutional portal uniting public admissions information, notices, calendar publications, student academic records, attendance management, and parent communication under strict role-based access control.',
    engineeringChallenge: 'Providing a responsive, high-availability platform that serves simultaneous heavy parent traffic during exam release windows while maintaining strict student privacy and offline-tolerant record entry for teaching staff.',
    engineeringSolution: 'Modern static generation with on-demand incremental cache revalidation for public announcements, combined with strict PostgreSQL Row-Level Security (RLS) policies and indexed reporting queries for academic records.',
    status: 'Production',
    projectGroup: 'client',
    visibility: 'public',
    url: 'https://sammena.altavox.space',
    screenshotUrl: '/projects/sammena-live.png',
    tags: ['School Management', 'SIMS', 'Admissions', 'Academic Records', 'Role-Based Access', 'Parent Portal'],
    architecture: {
      frontend: 'Next.js App Router, React, Tailwind CSS',
      backend: 'Node.js Server Actions & API Handlers',
      database: 'PostgreSQL with Row-Level Security (RLS)',
      infrastructure: 'Edge CDN distribution, automated container deployments'
    },
    keyFeatures: [
      'Public school information, curriculum overview, and admissions workflows',
      'Centralized publishing pipeline for announcements and academic calendars',
      'School Information Management System (SIMS) for student records and enrollment',
      'Role-based access control for administrators, teachers, and guardians',
      'Responsive interface optimized for low-bandwidth mobile connections'
    ]
  },
  {
    slug: 'mrisho-art-gallery',
    name: 'Mrisho Art Gallery',
    category: 'Art, Culture & Creative Portfolio',
    client: 'Mrisho Art Gallery',
    summary: 'An online gallery and creative commerce showcase presenting original East African artwork and collections from Arusha, Tanzania.',
    description: 'Mrisho Art Gallery provides a digital showcase for discovering curated collections, artist provenance, exhibition notes, and direct acquisition enquiries with PayPal and regional consultation pathways.',
    engineeringChallenge: 'Presenting high-resolution fine-art textures with fast mobile page loads across East African networks while isolating public gallery embeds safely from parent session state.',
    engineeringSolution: 'Progressive responsive image pipelines paired with sandboxed read-only iframe previews and direct structured gallery enquiry routing.',
    status: 'Production',
    projectGroup: 'client',
    visibility: 'public',
    url: 'https://mrishoart.altavox.space',
    screenshotUrl: '/projects/mrisho-art-live.png',
    tags: ['Art Gallery', 'Artwork Portfolio', 'Creative Commerce', 'Arusha, Tanzania', 'Next.js'],
    architecture: {
      frontend: 'Next.js, React, Responsive Image Pipeline',
      backend: 'Serverless API Enquiry & Catalog Handlers',
      database: 'Structured JSON / PostgreSQL Exhibition Index',
      infrastructure: 'Edge CDN distribution with TLS 1.3'
    },
    keyFeatures: [
      'Digital presentation of the gallery and curated artwork collections',
      'Responsive artwork discovery optimized for international collectors',
      'Gallery provenance, exhibition context, and visitor information',
      'Direct enquiry pathway for commission and acquisition requests'
    ]
  },
  {
    slug: 'altavox-wifi',
    name: 'Altavox WiFi',
    category: 'Hotspot Controller & Captive Portal',
    client: 'Altavox Technologies',
    summary: 'Managed captive portal, micro-voucher provisioning, and multi-site hotspot controller built for commercial Wi-Fi operators.',
    description: 'Altavox WiFi unifies MikroTik hotspot gateways, automated voucher issuance, time/data bundle enforcement, and customer reconnect portals into a single self-hosted web controller.',
    engineeringChallenge: 'Issuing instant Wi-Fi access tokens without router state drift when subscribers roam between distributed access points.',
    engineeringSolution: 'Centralized RADIUS session tracking paired with atomic voucher state machine and automated MikroTik API synchronization.',
    status: 'Production',
    projectGroup: 'ecosystem',
    visibility: 'public',
    url: 'https://altavox.space/wifi',
    screenshotUrl: '/projects/jaslyn-net-live.png',
    tags: ['Hotspot Captive Portal', 'MikroTik', 'Vouchers', 'RADIUS', 'Wi-Fi Controller'],
    architecture: {
      frontend: 'Next.js App Router, Tailwind CSS',
      backend: 'Node.js Controller & MikroTik RouterOS Connector',
      database: 'PostgreSQL Voucher & Session Store',
      infrastructure: 'Dockerized Edge Gateway & FreeRADIUS'
    },
    keyFeatures: [
      'Self-service captive portal bundle selection and status checks',
      'Batch voucher generation and automated expiration enforcement',
      'Multi-site MikroTik NAS health visibility',
      'Real-time active subscriber session inspection'
    ]
  },
  {
    slug: 'altavox-academy',
    name: 'Altavox Academy',
    category: 'Technical Education & LMS',
    client: 'Altavox Technologies',
    summary: '20-track practical engineering academy, student LMS dashboard, interactive code classrooms, and verifiable engineering certificates.',
    description: 'Altavox Academy delivers structured engineering training across Full-Stack Software, ISP Networking, Cloud DevOps, PostgreSQL Architecture, Cybersecurity, and AI Systems with PayPal enrollment and hands-on lab classrooms.',
    engineeringChallenge: 'Synchronizing interactive multi-module lesson progression, authenticated student enrollments, PayPal order verification, and public certificate authenticity checks.',
    engineeringSolution: 'Server-verified PayPal Checkout integration paired with Firebase Firestore student progress, enrollment records, and hashed certificate verification routes.',
    status: 'Production',
    projectGroup: 'ecosystem',
    visibility: 'public',
    url: 'https://altavox.space/academy',
    tags: ['Education LMS', '20 Courses', 'PayPal Checkout', 'Firebase Firestore', 'Certification'],
    architecture: {
      frontend: 'Next.js App Router, TypeScript, Motion, Tailwind CSS',
      backend: 'Next.js API Routes & PayPal REST Integration',
      database: 'Firebase Firestore & PostgreSQL',
      infrastructure: 'Vercel / Cloud Run with TLS & strict security rules'
    },
    keyFeatures: [
      '20 industry-aligned technical courses with complete syllabi',
      'Interactive classroom viewer with per-lesson progress tracking',
      'Server-verified PayPal Business enrollment and receipts',
      'Public cryptographic certificate verification portal'
    ]
  },
  {
    slug: 'altavox-bookstore',
    name: 'Altavox Bookstore',
    category: 'Digital Publishing & Engineering Manuals',
    client: 'Altavox Technologies',
    summary: 'Curated catalog of technical handbooks, systems architecture manuals, and educational print and digital books.',
    description: 'Altavox Bookstore publishes technical field guides covering MikroTik ISP networking, PostgreSQL schema engineering, Linux infrastructure, and applied computer systems for East African practitioners and students.',
    engineeringChallenge: 'Managing both digital edition checkout and physical stock reservations cleanly without duplicate inventory accounting.',
    engineeringSolution: 'Unified bookstore catalog API with PayPal digital checkout pricing validation and administrative inventory controls.',
    status: 'Production',
    projectGroup: 'ecosystem',
    visibility: 'public',
    url: 'https://altavox.space/marketplace',
    tags: ['Technical Books', 'Digital Publishing', 'Marketplace', 'PayPal Checkout'],
    architecture: {
      frontend: 'Next.js App Router, Tailwind CSS',
      backend: 'Next.js REST Endpoints & PayPal Orders API',
      database: 'PostgreSQL & Static Verified Catalog',
      infrastructure: 'Vercel Edge Network'
    },
    keyFeatures: [
      '6+ engineering and systems reference publications with ISBN metadata',
      'Server-quoted pricing calculation for digital editions',
      'Integrated physical copy reservation & direct order fulfillment',
      'Administrative stock visibility'
    ]
  },
  {
    slug: 'altavox-computer-desk',
    name: 'Altavox Computer Engineering Desk',
    category: 'Hardware Engineering & Technical Support',
    client: 'Altavox Technologies',
    summary: 'Structured intake, hardware diagnostics, workstation procurement, and infrastructure field support portal in Arusha.',
    description: 'The Computer Engineering Desk connects organizations and individuals with vetted Linux workstations, MikroTik routing hardware sourcing, server diagnostics, and scheduled maintenance requests.',
    engineeringChallenge: 'Capturing structured hardware specifications, failure symptoms, and urgency tiers cleanly so field engineers arrive prepared.',
    engineeringSolution: 'Validated intake API backed by PostgreSQL persistence and administrative triage queues.',
    status: 'Production',
    projectGroup: 'ecosystem',
    visibility: 'public',
    url: 'https://altavox.space/computer',
    tags: ['Hardware Desk', 'Diagnostics', 'MikroTik Hardware', 'Arusha Lab'],
    architecture: {
      frontend: 'Next.js Client Forms, Tailwind CSS',
      backend: 'Validated Request API Handlers',
      database: 'PostgreSQL Service Queue',
      infrastructure: 'Arusha Field Operations Integration'
    },
    keyFeatures: [
      'Hardware diagnostics and repair intake workflow',
      'Router and server sizing consultations',
      'Direct WhatsApp & phone desk escalation',
      'Persistent administrative service tracking'
    ]
  },
  {
    slug: 'netbill-noc',
    name: 'NetBill NOC',
    category: 'Network Operations & Billing Telemetry',
    client: 'Altavox Telecom Operators',
    summary: 'Unified network operations, RADIUS accounting, and recurring subscriber billing control workbench for ISPs and WISPs.',
    description: 'NetBill NOC brings edge prober latency diagnostics, RouterOS queue generation, subscriber invoices, and outage triage workflows into a coherent operator toolkit.',
    engineeringChallenge: 'Correlating live edge latency telemetry and router provisioning rules with automated subscriber billing cycles.',
    engineeringSolution: 'Modular RouterOS configuration generator paired with real-time HTTP edge latency probers and billing reconciliation hooks.',
    status: 'In development',
    projectGroup: 'ecosystem',
    visibility: 'public',
    url: 'https://altavox.space/launchpad',
    tags: ['NOC Telemetry', 'ISP Billing', 'RouterOS Scripts', 'Latency Probing'],
    architecture: {
      frontend: 'React Interactive Diagnostic Workspace',
      backend: 'Edge Probing & Billing API Routes',
      database: 'PostgreSQL & Time-Series Metrics',
      infrastructure: 'Multi-POP MikroTik & Linux Nodes'
    },
    keyFeatures: [
      'East African telecom edge latency prober',
      'Automated RouterOS v7 configuration generator',
      'ISP sizing & ROI architecture calculator',
      'NOC alert and incident logging workflow'
    ]
  },
  {
    slug: 'nexora-cloud',
    name: 'Nexora Cloud',
    category: 'Cloud Infrastructure & Managed Deployments',
    client: 'Altavox Cloud Services',
    summary: 'Containerized Linux deployment workflows, automated TLS ingress, and managed VPS foundations for regional SaaS teams.',
    description: 'Nexora Cloud structures repeatable Docker deployment pipelines, PostgreSQL backup automation, reverse-proxy TLS termination, and deployment desk workflows for businesses running sovereignty-first infrastructure.',
    engineeringChallenge: 'Providing simple, auditable Linux container deployments without brittle manual SSH configuration drift.',
    engineeringSolution: 'Declarative Git-to-Docker deployment manifests, automated certificate renewal, and documented deployment desk intake.',
    status: 'In development',
    projectGroup: 'ecosystem',
    visibility: 'public',
    url: 'https://altavox.space/cloud',
    tags: ['Cloud Infrastructure', 'Docker', 'TLS Automation', 'PostgreSQL Backups'],
    architecture: {
      frontend: 'Next.js Cloud Console & Deployment Desk',
      backend: 'Deployment Desk API & Build Webhooks',
      database: 'PostgreSQL Deployment Audit Store',
      infrastructure: 'Hardened Linux Containers & Reverse Proxy'
    },
    keyFeatures: [
      'Containerized workload deployment blueprints',
      'Automated SSL/TLS lifecycle orchestration',
      'Structured deployment request & review desk',
      'Regional POP connectivity and backup planning'
    ]
  }
]

export const services = [
  'Custom Software Development',
  'Enterprise Web Applications',
  'Mobile Application Development',
  'SaaS Product Development',
  'ISP and Network Management Systems',
  'Cloud Infrastructure',
  'DevOps and Deployment Automation',
  'Database Architecture',
  'API Development and Integration',
  'Technical Consulting'
]

export interface ServiceDetail {
  title: string
  category: string
  slug: string
  summary: string
  deliverables: string[]
  engineeringApproach: string
  businessValue: string
}

export const serviceDetails: ServiceDetail[] = [
  {
    title: 'Custom Software Development',
    category: 'Software Engineering',
    slug: 'custom-software-development',
    summary: 'Bespoke software systems built from scratch to address specific operational bottlenecks and institutional requirements.',
    deliverables: [
      'Domain-specific software architectures',
      'Maintainable TypeScript & Go codebases',
      'Comprehensive automated test suites',
      'Developer handoff documentation & source code ownership'
    ],
    engineeringApproach: 'We begin with thorough operational discovery, eliminating speculative abstractions and building domain-focused data models that precisely map your business processes.',
    businessValue: 'Eliminate manual workarounds, reduce operational licensing friction, and own proprietary technology assets aligned with your company goals.'
  },
  {
    title: 'Enterprise Web Applications',
    category: 'Software Engineering',
    slug: 'enterprise-web-applications',
    summary: 'High-performance, accessible, and secure web applications built on modern frameworks designed for complex workflows and high concurrency.',
    deliverables: [
      'Next.js & React App Router applications',
      'Complex multi-step workflow interfaces',
      'Strict role-based access control (RBAC)',
      'Sub-second page load times and Core Web Vitals optimization'
    ],
    engineeringApproach: 'Server-side rendering, deterministic state management, and edge delivery to guarantee fast response times across desktop and mobile devices.',
    businessValue: 'Empower internal teams and external customers with responsive, intuitive web tools that operate reliably at scale.'
  },
  {
    title: 'Mobile Application Development',
    category: 'Software Engineering',
    slug: 'mobile-application-development',
    summary: 'Cross-platform mobile applications that deliver native performance, offline resilience, and secure device integrations.',
    deliverables: [
      'Cross-platform iOS and Android applications',
      'Offline-first data synchronization',
      'Push notification & background sync services',
      'App store deployment and release management'
    ],
    engineeringApproach: 'Engineered with strict network awareness, minimal battery consumption, and responsive touch feedback tailored for varying mobile hardware.',
    businessValue: 'Reach customers and mobile field operators anywhere with reliable apps that function even with intermittent internet connectivity.'
  },
  {
    title: 'SaaS Product Development',
    category: 'Product Engineering',
    slug: 'saas-product-development',
    summary: 'End-to-end multi-tenant Software-as-a-Service platforms from foundational architecture to automated subscriber billing.',
    deliverables: [
      'Multi-tenant database isolation models',
      'Subscription management & billing webhook integration',
      'Self-service tenant onboarding & user invitation flows',
      'Usage metering and subscription analytics'
    ],
    engineeringApproach: 'Tenant data isolation at the database layer, resilient background job queues, and modular subscription billing integration.',
    businessValue: 'Accelerate time-to-market for digital products with an enterprise-ready multi-tenant foundation.'
  },
  {
    title: 'ISP and Network Management Systems',
    category: 'Telecom & Networks',
    slug: 'isp-network-management',
    summary: 'Specialized software and automation solutions for Internet Service Providers, WISPs, and commercial hotspot operators.',
    deliverables: [
      'MikroTik RouterOS API automation engines',
      'Subscriber lifecycle & bandwidth quota management',
      'RADIUS AAA authentication & session accounting',
      'Automated mobile-money payment gateways (M-Pesa, Airtel Money, Tigo Pesa)'
    ],
    engineeringApproach: 'Reliable API and RADIUS socket integration, handling session lifecycles, real-time disconnect requests (CoA/PoD), and queue shaping.',
    businessValue: 'Eliminate manual bandwidth provisioning, automate payment reconnections, and stop revenue leakage.'
  },
  {
    title: 'Cloud Infrastructure',
    category: 'Infrastructure',
    slug: 'cloud-infrastructure',
    summary: 'Reliable, cost-conscious cloud architecture and virtual private server environments designed for predictability and sovereignty.',
    deliverables: [
      'Containerized Linux server architectures',
      'Virtual Private Cloud (VPC) & network firewall configuration',
      'Automated SSL/TLS certificate lifecycle management',
      'Disaster recovery plans and scheduled offsite backup routines'
    ],
    engineeringApproach: 'Infrastructure as Code, immutable deployments, and zero-trust firewall configurations to protect workloads from unauthorized access.',
    businessValue: 'Prevent vendor lock-in, eliminate unnecessary cloud spending, and keep mission-critical workloads available 24/7.'
  },
  {
    title: 'DevOps and Deployment Automation',
    category: 'DevOps',
    slug: 'devops-automation',
    summary: 'Continuous integration, continuous deployment (CI/CD) pipelines, and container runtimes that make releases predictable and safe.',
    deliverables: [
      'Automated GitHub Actions CI/CD pipelines',
      'Zero-downtime rolling and blue-green releases',
      'Multi-stage Docker container builds',
      'Automated linting, type-checking, and regression test suites'
    ],
    engineeringApproach: 'Strict pipeline stages that gate every code change with automated tests, artifact verification, and one-click rollback capabilities.',
    businessValue: 'Ship new software features safely and frequently without causing unexpected production downtime.'
  },
  {
    title: 'Database Architecture',
    category: 'Data & Security',
    slug: 'database-architecture',
    summary: 'Relational data modeling, query optimization, connection management, and data integrity safeguards for transactional workloads.',
    deliverables: [
      'Normalized PostgreSQL database schemas',
      'Type-safe migrations and data seeding scripts',
      'Index strategy and EXPLAIN query plan tuning',
      'Automated continuous backup and point-in-time recovery testing'
    ],
    engineeringApproach: 'Foreign key constraints, domain-specific check constraints, and optimal index selection to preserve data consistency under high concurrent load.',
    businessValue: 'Protect your organization’s most valuable digital asset—its data—against corruption, concurrency bugs, and query slowdowns.'
  },
  {
    title: 'API Development and Integration',
    category: 'Software Engineering',
    slug: 'api-development-integration',
    summary: 'Robust RESTful and event-driven APIs that connect third-party platforms, payment processors, and legacy business software.',
    deliverables: [
      'REST & webhook communication architectures',
      'OpenAPI / Swagger interactive documentation',
      'Idempotency controls and rate-limiting middleware',
      'Third-party payment, SMS, and cloud service integrations'
    ],
    engineeringApproach: 'Strict request payload validation, deterministic error contracts, and cryptographic signature verification on all incoming webhooks.',
    businessValue: 'Unify disparate software tools into a coherent automated digital ecosystem without manual data re-entry.'
  },
  {
    title: 'Technical Consulting',
    category: 'Advisory',
    slug: 'technical-consulting',
    summary: 'Independent technical audits, architectural reviews, technology stack evaluations, and roadmap planning for executive leadership.',
    deliverables: [
      'Comprehensive codebase and infrastructure audit reports',
      'Security posture and vulnerability assessments',
      'Technology stack selection and feasibility studies',
      'Engineering hiring guidance and technical roadmap planning'
    ],
    engineeringApproach: 'Evidence-based analysis of existing systems, identifying real architectural bottlenecks and presenting prioritized actionable remediation paths.',
    businessValue: 'Make informed technology investments with confidence, avoiding expensive technical debt and unmaintainable architectures.'
  }
]
