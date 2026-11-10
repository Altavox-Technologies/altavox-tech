export interface CourseModule {
  week: string
  title: string
  topics: string[]
  project: string
}

export type CourseCategory =
  | 'Software Engineering'
  | 'Cloud & DevOps'
  | 'Networking & ISP Engineering'
  | 'Cybersecurity'
  | 'Database & Backend Engineering'
  | 'Applied AI & Automation'
  | 'Software Architecture'

export interface CourseItem {
  id: string
  slug: string
  title: string
  shortTitle: string
  category: CourseCategory
  image: string
  imageAlt: string
  badge?: string
  rating: number
  reviewCount: number
  enrolledStudents: number
  duration: string
  liveHours: string
  nextBatch: string
  originalPrice: number
  discountPrice: number
  overview: string
  targetAudience: string[]
  careerRoles: string[]
  averageSalary: string
  skillsCovered: string[]
  certificationAlignment: string
  modules: CourseModule[]
}

export const courseCategories = [
  'All Courses',
  'Software Engineering',
  'Database & Backend Engineering',
  'Cloud & DevOps',
  'Cybersecurity',
  'Applied AI & Automation',
  'Networking & ISP Engineering',
  'Software Architecture'
] as const

const moduleSet = (items: [string, string[], string][]): CourseModule[] =>
  items.map(([title, topics, project], index) => ({
    week: `Module 0${index + 1}`,
    title,
    topics,
    project
  }))

export const coursesData: CourseItem[] = [
  {
    id: 'avx-01',
    slug: 'full-stack-web-development',
    title: 'Full-Stack Web Development',
    shortTitle: 'Full-Stack Web Dev',
    category: 'Software Engineering',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Modern developer workspace with clean code on display',
    badge: 'Production Web Systems',
    rating: 0,
    reviewCount: 0,
    enrolledStudents: 0,
    duration: 'Confirm with Academy',
    liveHours: 'Delivery format to be confirmed',
    nextBatch: 'Contact us for availability',
    originalPrice: 0,
    discountPrice: 0,
    overview: 'Master end-to-end web engineering from responsive semantic interfaces to server runtimes, REST/GraphQL APIs, and transactional databases. Designed around production constraints and maintainability.',
    targetAudience: ['Aspiring software engineers', 'Computer science students', 'IT specialists transitioning to engineering'],
    careerRoles: ['Junior Full-Stack Developer', 'Front-End Engineer', 'Web Applications Engineer'],
    averageSalary: 'Not published',
    skillsCovered: ['Semantic HTML & Tailwind CSS', 'JavaScript (ES2024) & TypeScript', 'React & Next.js App Router', 'RESTful API Engineering', 'PostgreSQL & Database Design', 'Git Version Control & CI/CD'],
    certificationAlignment: 'Course capstone defense and practical codebase assessment.',
    modules: moduleSet([
      ['Modern Web Architecture Foundations', ['Semantic layouts and modern CSS foundations', 'TypeScript type system and compilation', 'Asynchronous JavaScript & event loops'], 'Build an accessible responsive enterprise directory'],
      ['Full-Stack Application Development', ['React component architecture and state machines', 'Next.js server-side rendering and API handlers', 'Database schemas and relational queries in PostgreSQL'], 'Develop a multi-tenant client portal with auth'],
      ['Testing, Security & Production Deployment', ['OWASP top 10 web security safeguards', 'Automated testing and edge runtime builds', 'Containerization and production observability'], 'Deploy a production-ready web application on modern infrastructure']
    ])
  },
  {
    id: 'avx-02',
    slug: 'advanced-javascript-typescript',
    title: 'Advanced JavaScript and TypeScript',
    shortTitle: 'Advanced JS & TypeScript',
    category: 'Software Engineering',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Syntax highlighted TypeScript code on a high-resolution screen',
    badge: 'Deep Language Mastery',
    rating: 0,
    reviewCount: 0,
    enrolledStudents: 0,
    duration: 'Confirm with Academy',
    liveHours: 'Delivery format to be confirmed',
    nextBatch: 'Contact us for availability',
    originalPrice: 0,
    discountPrice: 0,
    overview: 'Dive deep into JavaScript engine internals, V8 optimizations, concurrency, memory profiling, and advanced TypeScript type gymnastics (generics, conditional types, template literal types, ASTs).',
    targetAudience: ['Practicing JavaScript developers', 'Front-end engineers scaling large codebases', 'Technical leads and code reviewers'],
    careerRoles: ['Senior TypeScript Engineer', 'Front-End Architect', 'Core Library Maintainer'],
    averageSalary: 'Not published',
    skillsCovered: ['V8 Internals & Memory Management', 'Generics, Conditional & Template Literal Types', 'Meta-programming & Proxy Patterns', 'Streams, Web Workers & Concurrency', 'Type-Level Unit Testing', 'Design Patterns in Functional & OOP'],
    certificationAlignment: 'Advanced TypeScript type-gymnastics laboratory and benchmark evaluation.',
    modules: moduleSet([
      ['Engine Internals & Concurrency', ['Memory model, garbage collection and heap profiling', 'Event loop, microtasks, macrotasks and scheduling', 'TypedArrays, ArrayBuffers and Web Workers'], 'Build a high-performance in-memory stream parser'],
      ['Advanced Type Engineering', ['Conditional types, mapped types and infer keyword', 'Template literal types and branded types', 'Compiler flags, declaration files and monorepo configurations'], 'Create a type-safe RPC library with automatic schema inference'],
      ['Architecture & Production Resilience', ['Structural design patterns and immutability', 'Runtime schema validators (Zod/Valibot)', 'Zero-dependency utility libraries and benchmarking'], 'Publish an enterprise-grade type-safe SDK']
    ])
  },
  {
    id: 'avx-03',
    slug: 'react-nextjs-engineering',
    title: 'React and Next.js Engineering',
    shortTitle: 'React & Next.js',
    category: 'Software Engineering',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'React and Next.js modern component architecture illustration',
    badge: 'Enterprise Frontend',
    rating: 0,
    reviewCount: 0,
    enrolledStudents: 0,
    duration: 'Confirm with Academy',
    liveHours: 'Delivery format to be confirmed',
    nextBatch: 'Contact us for availability',
    originalPrice: 0,
    discountPrice: 0,
    overview: 'Master React 19 and Next.js App Router. Learn Server Components, streaming SSR, Server Actions, route handlers, metadata, performance profiling, and sophisticated caching strategies.',
    targetAudience: ['Web developers aiming for elite modern React skills', 'Teams migrating from legacy SPAs to Next.js', 'Full-stack engineers'],
    careerRoles: ['React Specialist', 'Next.js Application Engineer', 'Front-End Lead'],
    averageSalary: 'Not published',
    skillsCovered: ['React 19 Hooks & Concurrent Features', 'Next.js App Router & Server Components', 'Streaming UI with Suspense', 'Server Actions & Optimistic Updates', 'Edge Caching & Revalidation Strategies', 'Core Web Vitals Optimization'],
    certificationAlignment: 'Production Next.js application audit and architecture defense.',
    modules: moduleSet([
      ['Server Components & App Router Architecture', ['Server vs Client Component boundaries', 'Parallel routes, intercepting routes and layouts', 'Next.js request lifecycle and headers handling'], 'Build a multi-region administrative dashboard'],
      ['Data Mutation & State Architecture', ['Server Actions and form state with useActionState', 'Optimistic UI updates and cache tag revalidation', 'URL state synchronization and shallow routing'], 'Architect a collaborative e-commerce workflow'],
      ['Edge Performance & Security', ['Bundle analysis and dynamic code splitting', 'Image, font and script optimization', 'Middleware authentication and route protection'], 'Ship a high-concurrency content portal with 100/100 Core Web Vitals']
    ])
  },
  {
    id: 'avx-04',
    slug: 'backend-engineering-nodejs',
    title: 'Backend Engineering with Node.js',
    shortTitle: 'Node.js Backend',
    category: 'Database & Backend Engineering',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'High-throughput backend server console and network pipelines',
    badge: 'High-Throughput Services',
    rating: 0,
    reviewCount: 0,
    enrolledStudents: 0,
    duration: 'Confirm with Academy',
    liveHours: 'Delivery format to be confirmed',
    nextBatch: 'Contact us for availability',
    originalPrice: 0,
    discountPrice: 0,
    overview: 'Build robust, highly scalable backend services using Node.js, Express, Fastify, and NestJS. Master asynchronous I/O, cluster modules, background job queues, rate limiting, and secure authentication.',
    targetAudience: ['Back-end developers', 'Systems programmers transitioning to web services', 'Full-stack engineers strengthening server skills'],
    careerRoles: ['Backend Engineer', 'Node.js Developer', 'API Platform Engineer'],
    averageSalary: 'Not published',
    skillsCovered: ['Node.js Event Loop & Cluster Module', 'Fastify & Express Enterprise Architecture', 'JWT, OAuth & Session Token Hygiene', 'BullMQ & Redis Background Queues', 'REST, GraphQL & WebSockets', 'Structured Logging & OpenTelemetry'],
    certificationAlignment: 'Stress-tested backend API project with comprehensive test suite.',
    modules: moduleSet([
      ['Asynchronous Runtimes & Server Design', ['Event loop phases, libuv and process threading', 'Modular project organization and environment handling', 'HTTP protocol specifications and response streaming'], 'Build a high-throughput webhook receiver and processor'],
      ['Authentication, Security & Middleware', ['Password hashing with Argon2 and timing attack prevention', 'Stateless JWT vs stateful session management', 'Rate limiting, CORS, and request sanitization'], 'Implement a robust role-based authentication microservice'],
      ['Distributed Processing & Observability', ['Redis caching strategies and pub/sub messaging', 'Distributed worker queues with BullMQ', 'Prometheus metrics and Pino structured logging'], 'Deploy a resilient asynchronous batch processing engine']
    ])
  },
  {
    id: 'avx-05',
    slug: 'database-engineering-supabase',
    title: 'Database Engineering and Supabase',
    shortTitle: 'Databases & Supabase',
    category: 'Database & Backend Engineering',
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Relational database schema diagrams and storage blocks',
    badge: 'Data Integrity & Scale',
    rating: 0,
    reviewCount: 0,
    enrolledStudents: 0,
    duration: 'Confirm with Academy',
    liveHours: 'Delivery format to be confirmed',
    nextBatch: 'Contact us for availability',
    originalPrice: 0,
    discountPrice: 0,
    overview: 'Comprehensive relational engineering with PostgreSQL and Supabase. Master schema design, normalization, ACID transactions, complex indexing, Row-Level Security (RLS), triggers, and real-time subscriptions.',
    targetAudience: ['Developers seeking data mastery', 'Full-stack developers using Supabase or Postgres', 'Data engineers'],
    careerRoles: ['Database Engineer', 'PostgreSQL Administrator', 'Backend Data Specialist'],
    averageSalary: 'Not published',
    skillsCovered: ['PostgreSQL Schema Design & Normalization', 'ACID Transactions & Isolation Levels', 'B-Tree, GIN, GiST Indexing & EXPLAIN ANALYZE', 'Supabase Row Level Security (RLS) Policies', 'Stored Procedures, Triggers & PL/pgSQL', 'Point-In-Time Recovery & Backup Automation'],
    certificationAlignment: 'Real-world schema modeling capstone and query tuning benchmark.',
    modules: moduleSet([
      ['Relational Modeling & Core SQL', ['Entity-relationship modeling and third normal form', 'Foreign keys, composite keys, and cascade behaviors', 'Complex joins, window functions and CTEs'], 'Design a multi-organization billing and inventory schema'],
      ['Security & Access Control with Supabase', ['Row-Level Security (RLS) policies and security definer functions', 'Supabase Auth integrations and JWT claim inspection', 'Real-time database replication and triggers'], 'Build a secure multi-tenant collaboration engine with strict RLS'],
      ['Performance Tuning & Disaster Recovery', ['Query planning with EXPLAIN (ANALYZE, BUFFERS)', 'Index selection, vacuuming and connection pooling with PgBouncer', 'Logical backups, replication and zero-data-loss failover'], 'Optimize a million-row transaction database to sub-10ms queries']
    ])
  },
  {
    id: 'avx-06',
    slug: 'cloud-infrastructure-devops',
    title: 'Cloud Infrastructure and DevOps',
    shortTitle: 'Cloud & DevOps',
    category: 'Cloud & DevOps',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Global telecommunications and cloud computing infrastructure grid',
    badge: 'Production Operations',
    rating: 0,
    reviewCount: 0,
    enrolledStudents: 0,
    duration: 'Confirm with Academy',
    liveHours: 'Delivery format to be confirmed',
    nextBatch: 'Contact us for availability',
    originalPrice: 0,
    discountPrice: 0,
    overview: 'Learn how to run mission-critical production systems. Covers Linux systems administration, Docker containerization, Infrastructure as Code, CI/CD automation, DNS, TLS automation, and monitoring.',
    targetAudience: ['System administrators', 'Software engineers adopting DevOps practices', 'NOC technicians'],
    careerRoles: ['DevOps Engineer', 'Cloud Infrastructure Engineer', 'Site Reliability Engineer'],
    averageSalary: 'Not published',
    skillsCovered: ['Linux Server Administration & Hardening', 'Docker Multi-stage Builds & Compose', 'Infrastructure as Code (Terraform)', 'GitHub Actions CI/CD Pipelines', 'Reverse Proxies (Nginx/Caddy) & TLS Automation', 'System Monitoring & Incident Response'],
    certificationAlignment: 'End-to-end cloud pipeline implementation and failover drill.',
    modules: moduleSet([
      ['Linux Administration & Server Hardening', ['SSH key management, iptables/UFW, and user permissions', 'Systemd unit configuration and service isolation', 'Storage volume management and kernel logging'], 'Provision and harden an autonomous cloud Linux instance'],
      ['Containers & Delivery Pipelines', ['Docker containerization with non-root security', 'Multi-stage builds for minimal attack surfaces', 'Automated testing and build pipelines with GitHub Actions'], 'Construct an automated CI/CD pipeline from commit to deployment'],
      ['Cloud Networking & Zero-Downtime Operations', ['DNS configuration, SSL/TLS certificate automation', 'Blue-green and rolling deployment strategies', 'Prometheus, Grafana, and automated incident alert trees'], 'Configure a self-healing cluster with automated health checks']
    ])
  },
  {
    id: 'avx-07',
    slug: 'cybersecurity-secure-software',
    title: 'Cybersecurity and Secure Software Development',
    shortTitle: 'Cybersecurity & AppSec',
    category: 'Cybersecurity',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Cybersecurity operations screen with cryptographic lock indicators',
    badge: 'Defensive Security',
    rating: 0,
    reviewCount: 0,
    enrolledStudents: 0,
    duration: 'Confirm with Academy',
    liveHours: 'Delivery format to be confirmed',
    nextBatch: 'Contact us for availability',
    originalPrice: 0,
    discountPrice: 0,
    overview: 'Master defensive engineering principles and secure software development lifecycle (SSDLC). Learn threat modeling, OWASP Top 10 mitigation, cryptography fundamentals, secure API design, and vulnerability auditing.',
    targetAudience: ['Software developers building secure services', 'IT administrators and security analysts', 'Security engineers'],
    careerRoles: ['Application Security Engineer', 'Cybersecurity Analyst', 'Security Operations Specialist'],
    averageSalary: 'Not published',
    skillsCovered: ['OWASP Top 10 & API Security Standards', 'Threat Modeling (STRIDE / DREAD)', 'Modern Cryptography (AES-GCM, RSA, Ed25519)', 'Vulnerability Scanning & SAST/DAST Tools', 'Identity & Access Management (OAuth2, OIDC)', 'Incident Response & Forensic Logging'],
    certificationAlignment: 'Practical security audit report and defensive lab verification.',
    modules: moduleSet([
      ['Defensive Foundations & Secure Coding', ['Threat modeling real-world software architectures', 'Preventing injection attacks, XSS, and CSRF vulnerabilities', 'Secure deserialization and input validation techniques'], 'Perform a vulnerability assessment on a simulated fintech service'],
      ['Applied Cryptography & Authentication', ['Symmetric and asymmetric encryption pipelines', 'Secure key storage, KMS, and hardware security modules', 'OAuth 2.0, OpenID Connect, and cryptographic token verification'], 'Build a zero-trust cryptographic signature verification engine'],
      ['Securing Networks & Incident Response', ['Network segmentation, firewalls, and bastion hosts', 'Security information event management (SIEM) basics', 'Incident triage, containment runbooks, and audit reporting'], 'Author an incident response report from a live security exercise']
    ])
  },
  {
    id: 'avx-08',
    slug: 'ai-engineering-local-systems',
    title: 'AI Engineering and Local AI Systems',
    shortTitle: 'AI & Local Systems',
    category: 'Applied AI & Automation',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Neural network weights visualization representing local AI models',
    badge: 'Practical Edge AI',
    rating: 0,
    reviewCount: 0,
    enrolledStudents: 0,
    duration: 'Confirm with Academy',
    liveHours: 'Delivery format to be confirmed',
    nextBatch: 'Contact us for availability',
    originalPrice: 0,
    discountPrice: 0,
    overview: 'Build real-world AI applications focused on privacy, local execution, and business automation. Learn Python, LLM orchestration, local inference with Ollama/llama.cpp, Retrieval-Augmented Generation (RAG), and tool-calling agents.',
    targetAudience: ['Software engineers integrating AI capabilities', 'Technical founders building autonomous tooling', 'System administrators exploring local AI'],
    careerRoles: ['AI Systems Engineer', 'Applied AI Developer', 'Automation Specialist'],
    averageSalary: 'Not published',
    skillsCovered: ['Python for AI & Numerical Computing', 'Local LLM Inference with Ollama & llama.cpp', 'Vector Embeddings & Semantic Search (pgvector)', 'Retrieval-Augmented Generation (RAG) Architecture', 'Deterministic Function Calling & Agent Tooling', 'Evaluation Benchmarks & Prompt Security'],
    certificationAlignment: 'Self-hosted offline RAG knowledge base project evaluation.',
    modules: moduleSet([
      ['Python Foundations & Local Inference', ['Python asynchronous programming and typing', 'Hardware requirements, quantization (GGUF, 4-bit) and vRAM sizing', 'Deploying and orchestrating local models with Ollama'], 'Run and benchmark a localized offline inference server'],
      ['Vector Embeddings & Private RAG Pipelines', ['Embedding generation and chunking strategies', 'Vector databases with PostgreSQL pgvector extension', 'Hybrid semantic and keyword search retrieval'], 'Build a completely offline RAG system for internal technical documentation'],
      ['Autonomous Agents & Workflow Automation', ['Deterministic tool calling and JSON schema contracts', 'Multi-step planning and human-in-the-loop validation', 'Guardrails, prompt injection mitigation, and telemetry'], 'Deploy an autonomous service desk assistant with verified action execution']
    ])
  },
  {
    id: 'avx-09',
    slug: 'isp-management-network-engineering',
    title: 'ISP Management and Network Engineering',
    shortTitle: 'ISP & Network Engineering',
    category: 'Networking & ISP Engineering',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'ISP server rack with fiber optic patch cords and switches',
    badge: 'Telecom & ISP Ops',
    rating: 0,
    reviewCount: 0,
    enrolledStudents: 0,
    duration: 'Confirm with Academy',
    liveHours: 'Delivery format to be confirmed',
    nextBatch: 'Contact us for availability',
    originalPrice: 0,
    discountPrice: 0,
    overview: 'Hands-on network engineering tailored for ISP and WISP operators. Master MikroTik RouterOS, IP subnetting, BGP/OSPF routing, PPPoE subscriber aggregation, RADIUS/AAA billing integration, and hotspot architectures.',
    targetAudience: ['NOC engineers and technicians', 'ISP founders and network administrators', 'Field telecom technicians'],
    careerRoles: ['ISP Network Engineer', 'NOC Support Lead', 'MikroTik Network Administrator'],
    averageSalary: 'Not published',
    skillsCovered: ['TCP/IP Subnetting & Supernetting', 'MikroTik RouterOS v7 Configuration', 'OSPF Dynamic Routing & BGP Peering Fundamentals', 'PPPoE Server & Subscriber Session Lifecycle', 'RADIUS AAA Integration & FreeRADIUS / Billing', 'Bandwidth Queues (PCQ, Simple Queues) & Traffic Shaping'],
    certificationAlignment: 'Comprehensive ISP lab topology simulation and configuration audit.',
    modules: moduleSet([
      ['Subnetting & Core RouterOS Configuration', ['IPv4/IPv6 address planning and CIDR allocation', 'VLAN segmentation, trunking, and bridging in RouterOS', 'Stateful firewall filter rules, NAT, and address lists'], 'Design and configure a hardened core router topology'],
      ['Subscriber Access & AAA Integration', ['PPPoE server configuration and IP pool assignment', 'Hotspot portal setup with walled garden rules', 'RADIUS client configuration, attributes, and session accounting'], 'Configure an authenticated subscriber access gateway with automated disconnect'],
      ['Traffic Engineering, Routing & NOC Monitoring', ['Queue trees, PCQ fair-share bandwidth allocation, and burst limits', 'Dynamic routing with OSPF and multi-WAN failover', 'SNMP monitoring, Syslog central logging, and automated backups'], 'Build a resilient multi-POP ISP network with automated link failover']
    ])
  },
  {
    id: 'avx-10',
    slug: 'software-architecture-system-design',
    title: 'Software Architecture and System Design',
    shortTitle: 'Software Architecture',
    category: 'Software Architecture',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Architectural blueprint and modern system diagrams on a planning desk',
    badge: 'Scale & Resilience',
    rating: 0,
    reviewCount: 0,
    enrolledStudents: 0,
    duration: 'Confirm with Academy',
    liveHours: 'Delivery format to be confirmed',
    nextBatch: 'Contact us for availability',
    originalPrice: 0,
    discountPrice: 0,
    overview: 'Learn how to architect resilient, maintainable, and cost-effective distributed systems. Covers domain-driven design (DDD), event-driven architectures, microservices vs modular monoliths, caching topologies, and disaster recovery.',
    targetAudience: ['Senior software engineers', 'Lead developers and engineering managers', 'Technical architects'],
    careerRoles: ['Principal Software Architect', 'Lead Solutions Architect', 'Staff Software Engineer'],
    averageSalary: 'Not published',
    skillsCovered: ['Modular Monolith vs Microservices Tradeoffs', 'Domain-Driven Design (Bounded Contexts & Aggregates)', 'Event-Driven Architectures & Message Brokers', 'Distributed Data Patterns (Saga, Outbox, CQRS)', 'High Availability, Redundancy & Disaster Recovery', 'Technical Documentation (RFCs, ADRs, C4 Model)'],
    certificationAlignment: 'Comprehensive distributed system design defense and ADR portfolio.',
    modules: moduleSet([
      ['Foundations of Architecture & Modular Design', ['Architectural characteristics: scalability, availability, maintainability', 'Domain-Driven Design (DDD) strategic and tactical patterns', 'Modular monolith architecture and boundaries enforcement'], 'Design a modular monolith for a high-volume financial transaction platform'],
      ['Distributed Data & Event Systems', ['CAP theorem, PACELC, and eventual consistency models', 'Transactional outbox pattern and idempotent message processing', 'Event sourcing and Command Query Responsibility Segregation (CQRS)'], 'Architect an asynchronous event-driven payment reconciliation system'],
      ['Resilience, Governance & System Evolution', ['Circuit breakers, bulkheads, rate limiters, and graceful degradation', 'Writing Architecture Decision Records (ADRs) and C4 diagrams', 'Capacity planning, cost optimization, and migration strategies'], 'Deliver a complete production architecture proposal with disaster recovery runbook']
    ])
  }
]
