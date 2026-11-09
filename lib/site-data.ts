export interface ProjectItem {
  slug: string
  name: string
  category: string
  client: string
  summary: string
  description: string
  status: 'In development' | 'Production' | 'Exploration'
  url?: string
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
    category: 'ISP operations & connectivity',
    client: 'Jaslyn Net',
    summary: 'A unified ISP operations and billing platform designed to connect subscriber management, payments, AAA services, and network automation.',
    description: 'Jaslyn Net brings the operational lifecycle together: payment reconciliation, service identity, network provisioning, session accounting, and enforcement. The platform is being developed for ISP workflows and integrations used across East Africa.',
    status: 'In development',
    url: 'https://jaslyn-net.altavox.space',
    tags: ['ISP operations', 'Subscriber management', 'Billing', 'AAA', 'Network automation'],
    keyFeatures: [
      'Subscriber lifecycle and service-plan management',
      'Billing and mobile-money payment integration workflows',
      'RADIUS/AAA session accounting and access enforcement',
      'Network automation integrations for supported router platforms',
      'Operational visibility for support and NOC workflows'
    ]
  },
  {
    slug: 'sammena',
    name: 'Sammena Pre & Primary School',
    category: 'Education technology',
    client: 'Sammena Pre & Primary School',
    summary: 'A school website and School Information Management System (SIMS) initiative for public information and connected school administration.',
    description: 'The project brings the school website, admissions information, announcements, and planned administration workflows into a consistent digital platform. Student and parent-facing functions are designed around secure access and a shared source of school data.',
    status: 'In development',
    url: 'https://sammena.altavox.space',
    tags: ['School website', 'SIMS', 'Admissions', 'School communications', 'Role-based access'],
    keyFeatures: [
      'Public school information and admissions pages',
      'Central publishing workflow for news, notices, and calendar items',
      'SIMS direction for student and parent services',
      'Role-based administration and controlled publishing',
      'Responsive access for parents, staff, and school administrators'
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
  'Custom software development',
  'Websites & web applications',
  'Backend API development',
  'Database design & management',
  'Cloud deployment & infrastructure',
  'Network engineering & automation',
  'ISP billing & subscriber systems',
  'Business process automation',
  'Systems integration',
  'Security engineering & maintenance'
]

export const serviceDetails = [
  {
    title: 'Custom Software Development',
    category: 'Engineering',
    summary: 'Tailor-made web systems, business portals, and desktop management tools designed for high operational clarity.',
    deliverables: ['Custom web architectures', 'Internal company workflows', 'Cross-platform responsive apps', 'Maintainable TypeScript codebases'],
    highlight: 'Built for longevity and maintainability by your team.'
  },
  {
    title: 'ISP Billing & Subscriber Systems',
    category: 'Telecom & ISP',
    summary: 'Comprehensive software for Internet Service Providers: user authentication, hotspot management, and automated payment gateways.',
    deliverables: ['MikroTik RouterOS API integrations', 'M-Pesa & Mobile Money webhooks', 'Hotspot voucher generation', 'Customer self-service portals'],
    highlight: 'Eliminates revenue leakage and manual reconnection tasks.'
  },
  {
    title: 'Cloud Deployment & Infrastructure',
    category: 'Infrastructure',
    summary: 'Predictable, self-hosted or cloud-native infrastructure with CI/CD automation, Docker runtimes, and instant rollback safety.',
    deliverables: ['Containerized deployments', 'Automated SSL & custom domains', 'Zero-downtime release pipelines', 'Environment secrets governance'],
    highlight: 'Keep data sovereign, secure, and independent.'
  },
  {
    title: 'Network Engineering & NOC Automation',
    category: 'Telecom & ISP',
    summary: 'Remote network monitoring, telemetry collection, incident alerting, and automated failover routing for mission-critical setups.',
    deliverables: ['SNMP and ping reachability probers', 'RADIUS AAA accounting systems', 'Telegram/WhatsApp alerts bot', 'Topology status visualization'],
    highlight: 'Spot anomalies before customers notice service degradation.'
  },
  {
    title: 'Database Architecture & Data Pipelines',
    category: 'Data & Security',
    summary: 'Relational database schema modeling, connection pooling, high-performance indexing, and secure automated backup schedules.',
    deliverables: ['PostgreSQL & SQLite design', 'Drizzle/Prisma type-safe migrations', 'Automated encryption at rest', 'Audit logging & compliance data'],
    highlight: 'Rock-solid data integrity with zero guesswork.'
  },
  {
    title: 'Security Engineering & Governance',
    category: 'Data & Security',
    summary: 'Robust authentication, role-based authorization, rate limiting, and security policy checks built directly into the foundation.',
    deliverables: ['Role-based access control (RBAC)', 'Session encryption & cookie hygiene', 'Penetration testing & audit trail', 'Disaster recovery runbooks'],
    highlight: 'Security embedded by default, never an afterthought.'
  }
]

