export interface ProjectItem {
  slug: string
  name: string
  category: string
  client: string
  summary: string
  description: string
  engineeringChallenge: string
  engineeringSolution: string
  status: 'In development' | 'Production' | 'Exploration'
  url: string
  screenshotUrl: string
  tags: string[]
  metrics?: { label: string; value: string }[]
  architecture: {
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
    status: 'In development',
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
    status: 'In development',
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
    category: 'Art, culture & creative portfolio',
    client: 'Mrisho Art Gallery',
    summary: 'An online gallery and portfolio presenting artwork and collections from Arusha, Tanzania.',
    description: 'The website gives Mrisho Art Gallery a digital presence for discovering featured artwork and learning about the gallery. Artwork availability, pricing, and purchase arrangements should be confirmed directly with the gallery.',
    status: 'In development',
    url: 'https://mrishoart.altavox.space',
    tags: ['Art gallery', 'Artwork portfolio', 'Creative showcase', 'Arusha, Tanzania'],
    keyFeatures: [
      'Digital presentation of the gallery and its artwork',
      'Artwork and collection discovery',
      'Gallery identity and visitor information',
      'Direct enquiry pathway for artwork questions'
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
