export interface CourseLesson {
  id: string
  title: string
  duration: string
  summary: string
}

export interface CourseModule {
  week: string
  title: string
  topics: string[]
  project: string
  lessons?: CourseLesson[]
}

export interface PracticalProject {
  title: string
  description: string
  deliverable: string
}

export type CourseCategory =
  | 'Software Engineering'
  | 'Cloud & DevOps'
  | 'Networking & ISP Engineering'
  | 'Cybersecurity'
  | 'Database & Backend Engineering'
  | 'Applied AI & Automation'
  | 'Software Architecture'
  | 'AgriTech & Food Systems'
  | 'HealthTech'
  | 'FinTech & Digital Payments'
  | 'Data Science & Analytics'
  | 'Digital Business & Entrepreneurship'

export interface CourseItem {
  id: string
  slug: string
  title: string
  shortTitle: string
  category: CourseCategory
  image: string
  imageAlt: string
  badge?: string
  difficulty: 'Beginner' | 'Foundational to Intermediate' | 'Intermediate to Advanced' | 'Advanced / Professional'
  rating: number
  reviewCount: number
  enrolledStudents: number
  duration: string
  liveHours: string
  nextBatch: string
  originalPrice: number // In USD for international PayPal
  discountPrice: number // In USD for international PayPal
  priceTZS: number // In TZS for regional reference
  overview: string
  learningObjectives: string[]
  practicalProjects: PracticalProject[]
  prerequisites: string[]
  hardwareRequirements: string
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
  'Software Architecture',
  'AgriTech & Food Systems',
  'HealthTech',
  'FinTech & Digital Payments',
  'Data Science & Analytics',
  'Digital Business & Entrepreneurship'
] as const

const moduleSet = (items: [string, string[], string][]): CourseModule[] =>
  items.map(([title, topics, project], index) => ({
    week: `Module 0${index + 1}`,
    title,
    topics,
    project,
    lessons: topics.map((t, lIdx) => ({
      id: `lesson-${index + 1}-${lIdx + 1}`,
      title: t,
      duration: '45 mins',
      summary: `Hands-on practical walkthrough covering ${t.toLowerCase()} with live code exercises.`
    }))
  }))

export const coursesData: CourseItem[] = [
  // ==========================================
  // EXISTING 10 COURSES (avx-01 to avx-10)
  // ==========================================
  {
    id: 'avx-01',
    slug: 'full-stack-web-development',
    title: 'Full-Stack Web Development',
    shortTitle: 'Full-Stack Web Dev',
    category: 'Software Engineering',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Modern developer workspace with clean code on display',
    badge: 'Production Web Systems',
    difficulty: 'Foundational to Intermediate',
    rating: 0,
    reviewCount: 0,
    enrolledStudents: 0,
    duration: '10 Weeks (Live + Lab)',
    liveHours: '40 Live Hours + 60 Lab Hours',
    nextBatch: 'Weekly Intakes Available',
    originalPrice: 199,
    discountPrice: 149,
    priceTZS: 380000,
    overview: 'Master end-to-end web engineering from responsive semantic interfaces to server runtimes, REST/GraphQL APIs, and transactional databases. Designed around production constraints and maintainability.',
    learningObjectives: [
      'Architect robust web applications using semantic HTML5, modern CSS, and strict TypeScript.',
      'Build performant client-server applications using React 19 and Next.js App Router.',
      'Design normalized PostgreSQL database schemas and write efficient relational queries.',
      'Implement secure authentication, session management, and role-based access control (RBAC).',
      'Deploy containerized applications with automated CI/CD pipelines on modern cloud infrastructure.'
    ],
    practicalProjects: [
      {
        title: 'Multi-Tenant Client Portal & Directory',
        description: 'A full-stack business portal with company profiles, service search, role-based access control, and dynamic data filtering.',
        deliverable: 'Production-ready Next.js application with PostgreSQL database and live staging deployment.'
      },
      {
        title: 'Transactional E-Commerce Order Management',
        description: 'End-to-end shopping catalog with inventory locks, cart state synchronization, and mock mobile-money webhook processing.',
        deliverable: 'Audited codebase with automated integration test suite and structured schema migrations.'
      }
    ],
    prerequisites: [
      'Basic computer literacy and understanding of internet protocols.',
      'Familiarity with general programming concepts (variables, loops, functions).',
      'Willingness to write code daily in terminal and editor environments.'
    ],
    hardwareRequirements: '64-bit laptop (Windows 10/11, macOS 12+, or Ubuntu Linux 22+), minimum 8 GB RAM (16 GB recommended), 50 GB free SSD storage.',
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
    difficulty: 'Intermediate to Advanced',
    rating: 0,
    reviewCount: 0,
    enrolledStudents: 0,
    duration: '8 Weeks (Intensive)',
    liveHours: '32 Live Hours + 48 Lab Hours',
    nextBatch: 'Weekly Intakes Available',
    originalPrice: 189,
    discountPrice: 139,
    priceTZS: 350000,
    overview: 'Dive deep into JavaScript engine internals, V8 optimizations, concurrency, memory profiling, and advanced TypeScript type gymnastics (generics, conditional types, template literal types, ASTs).',
    learningObjectives: [
      'Master the V8 execution pipeline: bytecode interpretation, TurboFan optimization, and inline caching.',
      'Engineer complex type-safe systems using conditional types, mapped types, template literals, and distributive inference.',
      'Profile memory allocations, detect memory leaks, and optimize garbage collection cycles.',
      'Design robust asynchronous architectures with Web Workers, TypedArrays, and backpressure-aware streams.',
      'Author and publish type-safe open-source libraries with strict tsconfig compliance.'
    ],
    practicalProjects: [
      {
        title: 'High-Throughput Binary Stream Parser',
        description: 'In-memory zero-copy binary packet parser using ArrayBuffers, DataViews, and TypedArrays for network telemetry.',
        deliverable: 'Benchmarked TypeScript library achieving sub-millisecond parsing with zero memory leaks.'
      },
      {
        title: 'Type-Safe RPC Library with Automatic Schema Inference',
        description: 'End-to-end typesafe contract library providing compile-time parameter and return type validation across HTTP boundaries.',
        deliverable: 'Packaged NPM module with complete declaration maps and type-level test suite.'
      }
    ],
    prerequisites: [
      'At least 1 year of practical JavaScript programming experience.',
      'Solid understanding of Promises, closures, and ES6+ syntax.',
      'Basic familiarity with static typing concepts.'
    ],
    hardwareRequirements: 'Laptop with Node.js 20+ runtime installed, minimum 8 GB RAM, 20 GB free storage.',
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
    difficulty: 'Intermediate to Advanced',
    rating: 0,
    reviewCount: 0,
    enrolledStudents: 0,
    duration: '8 Weeks',
    liveHours: '32 Live Hours + 50 Lab Hours',
    nextBatch: 'Weekly Intakes Available',
    originalPrice: 199,
    discountPrice: 149,
    priceTZS: 380000,
    overview: 'Master React 19 and Next.js App Router. Learn Server Components, streaming SSR, Server Actions, route handlers, metadata, performance profiling, and sophisticated caching strategies.',
    learningObjectives: [
      'Harness React 19 architectural paradigms: React Server Components (RSC), Actions, useOptimistic, and Suspense streaming.',
      'Structure scalable Next.js App Router applications with nested layouts, parallel routes, and route interceptors.',
      'Implement fine-grained caching topologies: Request Memoization, Data Cache, Full Route Cache, and Router Cache.',
      'Achieve 100/100 Core Web Vitals (LCP, INP, CLS) through font subsetting, image optimization, and bundle audits.',
      'Implement enterprise-grade route protection, middleware authorization, and CSRF defense.'
    ],
    practicalProjects: [
      {
        title: 'Multi-Region Enterprise SaaS Workspace',
        description: 'High-performance administrative dashboard with real-time analytics streaming, nested team layouts, and optimistic state updates.',
        deliverable: 'Audited Next.js production build achieving sub-1.2s Largest Contentful Paint (LCP).'
      },
      {
        title: 'Collaborative Document & Workflow Engine',
        description: 'Server Actions-driven workflow management system with instant optimistic feedback, revalidation tags, and edge auth checks.',
        deliverable: 'Full GitHub repository with end-to-end Playwright test coverage and CI deployment.'
      }
    ],
    prerequisites: [
      'Intermediate proficiency in modern JavaScript/TypeScript.',
      'Experience building basic React components with Hooks (useState, useEffect).',
      'Understanding of client vs. server web fundamentals.'
    ],
    hardwareRequirements: 'Laptop with modern browser and Node.js 20+ installed, minimum 8 GB RAM (16 GB recommended).',
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
    difficulty: 'Intermediate to Advanced',
    rating: 0,
    reviewCount: 0,
    enrolledStudents: 0,
    duration: '8 Weeks',
    liveHours: '32 Live Hours + 50 Lab Hours',
    nextBatch: 'Weekly Intakes Available',
    originalPrice: 199,
    discountPrice: 149,
    priceTZS: 380000,
    overview: 'Build robust, highly scalable backend services using Node.js, Express, Fastify, and NestJS. Master asynchronous I/O, cluster modules, background job queues, rate limiting, and secure authentication.',
    learningObjectives: [
      'Master Node.js internals: libuv thread pool, event loop phases, and non-blocking asynchronous I/O.',
      'Build high-performance RESTful and WebSocket microservices using Fastify and NestJS.',
      'Implement distributed task queues and background worker pipelines with Redis and BullMQ.',
      'Harden backend security: Argon2 password hashing, rate limiting, CORS configuration, and timing attack prevention.',
      'Implement structured telemetry: Pino JSON logging, Prometheus metrics, and OpenTelemetry distributed tracing.'
    ],
    practicalProjects: [
      {
        title: 'High-Throughput Webhook Ingestion & Processing Engine',
        description: 'Scalable service accepting thousands of mobile-money payment webhooks per second with idempotent processing and deduplication.',
        deliverable: 'Load-tested Node.js service capable of sustaining 5,000 req/sec with under 25ms p99 latency.'
      },
      {
        title: 'Distributed Background Job Processing Architecture',
        description: 'Asynchronous report generator utilizing BullMQ worker pools, automatic retry exponential backoff, and dead-letter queues.',
        deliverable: 'Dockerized microservice with health checks, Prometheus telemetry, and Grafana dashboard.'
      }
    ],
    prerequisites: [
      'Proficiency in JavaScript or TypeScript programming.',
      'Understanding of HTTP status codes, headers, and JSON formatting.',
      'Basic familiarity with command line terminal operations.'
    ],
    hardwareRequirements: 'Laptop with Linux, macOS, or WSL2 on Windows, minimum 8 GB RAM, Docker Desktop installed.',
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
    difficulty: 'Intermediate to Advanced',
    rating: 0,
    reviewCount: 0,
    enrolledStudents: 0,
    duration: '8 Weeks',
    liveHours: '32 Live Hours + 45 Lab Hours',
    nextBatch: 'Weekly Intakes Available',
    originalPrice: 189,
    discountPrice: 139,
    priceTZS: 350000,
    overview: 'Comprehensive relational engineering with PostgreSQL and Supabase. Master schema design, normalization, ACID transactions, complex indexing, Row-Level Security (RLS), triggers, and real-time subscriptions.',
    learningObjectives: [
      'Design fully normalized relational database schemas adhering to 3NF standards with strict integrity constraints.',
      'Optimize complex queries using EXPLAIN (ANALYZE, BUFFERS) and implement B-Tree, GIN, and GiST indexes.',
      'Write bulletproof Row-Level Security (RLS) policies in Supabase/PostgreSQL for secure multi-tenant isolation.',
      'Author PostgreSQL triggers, stored functions (PL/pgSQL), and materialized views for real-time aggregation.',
      'Manage connection pooling (PgBouncer), logical backups, and automated point-in-time recovery.'
    ],
    practicalProjects: [
      {
        title: 'Institutional Financial Ledger & Audit Database',
        description: 'Double-entry bookkeeping schema in PostgreSQL with immutable ledger tables, ledger audit triggers, and strict foreign constraints.',
        deliverable: 'Complete DDL schema file with reproducible seed data and stress-tested transaction integrity.'
      },
      {
        title: 'Multi-Tenant Collaborative SaaS Backend on Supabase',
        description: 'Complete Supabase backend featuring JWT role verification, fine-grained RLS access control, and real-time event subscriptions.',
        deliverable: 'Production database deployment with zero client-side data leakage across customer tenants.'
      }
    ],
    prerequisites: [
      'Basic familiarity with SQL syntax (SELECT, INSERT, UPDATE, DELETE).',
      'Understanding of relational concepts like tables, rows, and columns.',
      'Basic experience integrating a database with any backend language.'
    ],
    hardwareRequirements: 'Laptop with PostgreSQL 16+ or Docker installed, minimum 8 GB RAM, 30 GB free storage.',
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
    difficulty: 'Intermediate to Advanced',
    rating: 0,
    reviewCount: 0,
    enrolledStudents: 0,
    duration: '10 Weeks',
    liveHours: '40 Live Hours + 60 Lab Hours',
    nextBatch: 'Weekly Intakes Available',
    originalPrice: 219,
    discountPrice: 169,
    priceTZS: 420000,
    overview: 'Learn how to run mission-critical production systems. Covers Linux systems administration, Docker containerization, Infrastructure as Code, CI/CD automation, DNS, TLS automation, and monitoring.',
    learningObjectives: [
      'Administer, secure, and monitor production Linux servers using systemd, UFW, and audit logs.',
      'Containerize complex microservices with Docker multi-stage builds and non-root security profiles.',
      'Automate infrastructure provisioning using declarative Infrastructure-as-Code (Terraform).',
      'Build resilient CI/CD pipelines with GitHub Actions for automated linting, testing, and zero-downtime deployment.',
      'Configure reverse proxies (Nginx / Caddy), automated Let’s Encrypt TLS certificates, and edge CDN routing.'
    ],
    practicalProjects: [
      {
        title: 'Hardened Production Linux Cluster Deployment',
        description: 'Autonomous cloud server configuration with SSH key hardening, fail2ban intrusion prevention, and systemd service supervision.',
        deliverable: 'Automated bash and Ansible runbooks producing a production-hardened server instance.'
      },
      {
        title: 'Complete Zero-Downtime CI/CD Blue-Green Deployment',
        description: 'End-to-end GitHub Actions pipeline that builds Docker images, runs integration tests, and deploys with zero downtime.',
        deliverable: 'Fully functional pipeline repository with automated health check verification and rollback triggers.'
      }
    ],
    prerequisites: [
      'Basic comfort working in a Linux/Unix command-line terminal.',
      'Understanding of client-server networking (IP addresses, ports, DNS).',
      'Experience with Git version control fundamentals.'
    ],
    hardwareRequirements: 'Laptop with 64-bit OS capable of running Docker and virtualization, minimum 8 GB RAM (16 GB recommended).',
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
    difficulty: 'Intermediate to Advanced',
    rating: 0,
    reviewCount: 0,
    enrolledStudents: 0,
    duration: '10 Weeks',
    liveHours: '40 Live Hours + 60 Lab Hours',
    nextBatch: 'Weekly Intakes Available',
    originalPrice: 229,
    discountPrice: 179,
    priceTZS: 450000,
    overview: 'Master defensive engineering principles and secure software development lifecycle (SSDLC). Learn threat modeling, OWASP Top 10 mitigation, cryptography fundamentals, secure API design, and vulnerability auditing.',
    learningObjectives: [
      'Conduct formal threat modeling using STRIDE and DREAD methodologies across modern application stacks.',
      'Defend against OWASP Top 10 vulnerabilities (SQLi, XSS, CSRF, SSRF, broken object level authorization).',
      'Implement real-world cryptographic patterns: AES-256-GCM authenticated encryption, Ed25519 digital signatures, and KMS.',
      'Audit web applications and APIs using Static Analysis (SAST) and Dynamic Analysis (DAST) tooling.',
      'Establish incident response protocols, forensic audit logging, and security containment playbooks.'
    ],
    practicalProjects: [
      {
        title: 'Full Application Security Vulnerability Audit & Defense',
        description: 'Audit a simulated financial portal, exploit deliberate architectural flaws in a sandbox, and engineer permanent source code patches.',
        deliverable: 'Professional Application Security Assessment report with CVSS scoring and verified patched pull requests.'
      },
      {
        title: 'Zero-Trust Cryptographic API Gateway',
        description: 'Microservice middleware enforcing mutual TLS, cryptographic payload signatures, and tamper-evident audit logs.',
        deliverable: 'Audited source code with reproducible cryptographic unit tests and attack resilience validation.'
      }
    ],
    prerequisites: [
      'Basic knowledge of web technologies and client-server HTTP communications.',
      'Familiarity with at least one programming language (TypeScript, Python, or Go).',
      'Basic understanding of networking concepts.'
    ],
    hardwareRequirements: 'Laptop with minimum 8 GB RAM, virtualization enabled for security testing sandbox containers.',
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
    difficulty: 'Intermediate to Advanced',
    rating: 0,
    reviewCount: 0,
    enrolledStudents: 0,
    duration: '10 Weeks',
    liveHours: '40 Live Hours + 60 Lab Hours',
    nextBatch: 'Weekly Intakes Available',
    originalPrice: 249,
    discountPrice: 189,
    priceTZS: 480000,
    overview: 'Build real-world AI applications focused on privacy, local execution, and business automation. Learn Python, LLM orchestration, local inference with Ollama/llama.cpp, Retrieval-Augmented Generation (RAG), and tool-calling agents.',
    learningObjectives: [
      'Deploy and orchestrate local open-weights language models (Llama 3, Mistral, Qwen) on private workstations and servers.',
      'Understand model quantization formats (GGUF, AWQ, 4-bit) and calculate hardware vRAM/compute budgets.',
      'Engineer private Retrieval-Augmented Generation (RAG) pipelines using PostgreSQL pgvector and local embedding models.',
      'Implement deterministic function-calling agents with strict JSON schema validation and human-in-the-loop gates.',
      'Harden AI applications against prompt injections, data leakage, and hallucinated operational actions.'
    ],
    practicalProjects: [
      {
        title: 'Offline Air-Gapped Enterprise Knowledge Base (RAG)',
        description: 'Complete document question-answering system operating 100% offline using Ollama, LangChain/LlamaIndex, and pgvector.',
        deliverable: 'Private containerized knowledge system capable of indexing PDF manuals and answering with source citations.'
      },
      {
        title: 'Autonomous Infrastructure Diagnostic Agent',
        description: 'Tool-calling AI assistant that inspects server logs, queries network status APIs, and proposes verified mitigation commands.',
        deliverable: 'Audited agentic system with deterministic execution barriers and live logging.'
      }
    ],
    prerequisites: [
      'Proficiency in Python programming (functions, dictionaries, virtual environments).',
      'Basic familiarity with REST APIs and JSON data structures.',
      'Eagerness to explore open-source machine learning tooling.'
    ],
    hardwareRequirements: 'Laptop or desktop with minimum 16 GB RAM (Apple Silicon M1/M2/M3/M4 or dedicated NVIDIA GPU with 6GB+ VRAM strongly recommended).',
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
    difficulty: 'Foundational to Intermediate',
    rating: 0,
    reviewCount: 0,
    enrolledStudents: 0,
    duration: '10 Weeks',
    liveHours: '40 Live Hours + 60 Lab Hours',
    nextBatch: 'Weekly Intakes Available',
    originalPrice: 229,
    discountPrice: 179,
    priceTZS: 450000,
    overview: 'Hands-on network engineering tailored for ISP and WISP operators. Master MikroTik RouterOS, IP subnetting, BGP/OSPF routing, PPPoE subscriber aggregation, RADIUS/AAA billing integration, and hotspot architectures.',
    learningObjectives: [
      'Design carrier-grade IPv4 and IPv6 subnetting plans for multi-POP regional internet service providers.',
      'Configure enterprise MikroTik RouterOS v7 routing, VLAN trunking, bridging, and stateful firewall rules.',
      'Deploy PPPoE aggregation servers and captive hotspot portals with walled-garden payment redirection.',
      'Integrate FreeRADIUS AAA servers with automated mobile-money billing webhooks and CoA/PoD disconnects.',
      'Implement traffic shaping using simple queues, queue trees, and Per-Connection Queue (PCQ) algorithms.'
    ],
    practicalProjects: [
      {
        title: 'Complete Carrier-Grade Multi-POP ISP Network Topology',
        description: 'Simulated ISP deployment in RouterOS v7/GNS3 featuring core routing, edge PPPoE servers, and multi-WAN failover.',
        deliverable: 'Fully validated RouterOS `.rsc` backup script with verified packet traversal and firewall isolation.'
      },
      {
        title: 'Automated Hotspot & PPPoE Billing AAA Gateway',
        description: 'Live RADIUS integration pairing MikroTik RouterOS with an automated subscriber billing system and instant renewal triggers.',
        deliverable: 'Audited integration demonstration with zero packet loss during bandwidth queue transitions.'
      }
    ],
    prerequisites: [
      'Basic understanding of networking basics (IP addresses, default gateway, Wi-Fi).',
      'Familiarity with network cables, routers, and basic computer settings.',
      'Interest in telecommunications and commercial internet provision.'
    ],
    hardwareRequirements: 'Laptop with Ethernet port (or USB-to-Ethernet adapter), Winbox 3+ installed, minimum 8 GB RAM.',
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
    difficulty: 'Advanced / Professional',
    rating: 0,
    reviewCount: 0,
    enrolledStudents: 0,
    duration: '8 Weeks (Executive & Lead)',
    liveHours: '32 Live Hours + 45 Lab Hours',
    nextBatch: 'Weekly Intakes Available',
    originalPrice: 249,
    discountPrice: 199,
    priceTZS: 500000,
    overview: 'Learn how to architect resilient, maintainable, and cost-effective distributed systems. Covers domain-driven design (DDD), event-driven architectures, microservices vs modular monoliths, caching topologies, and disaster recovery.',
    learningObjectives: [
      'Evaluate architectural tradeoffs: modular monoliths vs. microservices, synchronous REST/gRPC vs. asynchronous messaging.',
      'Apply Domain-Driven Design (DDD) strategic design: bounded contexts, ubiquitous language, and aggregate roots.',
      'Architect distributed transactional consistency using Saga patterns, Outbox patterns, and idempotent event consumers.',
      'Design fault-tolerant infrastructures with circuit breakers, bulkheads, rate limiting, and automated failover.',
      'Produce professional architectural documentation: Architecture Decision Records (ADRs), C4 models, and disaster runbooks.'
    ],
    practicalProjects: [
      {
        title: 'Distributed High-Volume Payment Processing Architecture',
        description: 'Complete system design specification for an East African fintech platform handling multi-currency and mobile-money settlement.',
        deliverable: 'C4 model architectural diagrams, sequence diagrams, and formal Architecture Decision Records (ADRs).'
      },
      {
        title: 'Modular Monolith to Event-Driven System Migration Blueprint',
        description: 'Strategic decomposition plan decoupling legacy relational tables into autonomous event-driven operational services.',
        deliverable: 'Comprehensive technical blueprint including database migration runbooks and disaster recovery SLAs.'
      }
    ],
    prerequisites: [
      'At least 2-3 years of practical software development experience.',
      'Solid grasp of relational databases, caching, and API design.',
      'Experience working on production systems that serve real users.'
    ],
    hardwareRequirements: 'Laptop with diagramming tools (draw.io, Mermaid, or Excalidraw) and modern development environment.',
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
  },

  // ==========================================
  // NEW 10 COURSES (avx-11 to avx-20)
  // EXACTLY AS SPECIFIED IN USER REQUEST
  // ==========================================
  {
    id: 'avx-11',
    slug: 'agritech-food-systems',
    title: 'AgriTech & Food Systems',
    shortTitle: 'AgriTech & Food Systems',
    category: 'AgriTech & Food Systems',
    image: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Automated solar irrigation and smart farm sensor monitoring crops',
    badge: 'Modern Agriculture & Food Security',
    difficulty: 'Foundational to Intermediate',
    rating: 0,
    reviewCount: 0,
    enrolledStudents: 0,
    duration: '8 Weeks',
    liveHours: '32 Live Hours + 40 Field/Lab Hours',
    nextBatch: 'Weekly Intakes Available',
    originalPrice: 179,
    discountPrice: 129,
    priceTZS: 320000,
    overview: 'Modern agriculture, food security, automated irrigation, agricultural markets, farm technology, weather telemetry, and reducing post-harvest losses through digitized inventory and cold-chain monitoring.',
    learningObjectives: [
      'Design IoT sensor networks for automated soil moisture, humidity, and microclimate telemetry.',
      'Architect automated solar irrigation control loops integrated with localized weather forecasting APIs.',
      'Build digital commodity aggregation platforms connecting smallholder cooperatives to regional buyers.',
      'Implement cold-chain temperature telemetry tracking to eliminate post-harvest agricultural losses.',
      'Develop offline-tolerant mobile crop scouting applications for field extension officers.'
    ],
    practicalProjects: [
      {
        title: 'Autonomous Solar Drip-Irrigation Telemetry Controller',
        description: 'Embedded microcontroller and cloud dashboard scheduling irrigation based on soil matrix suction and evapotranspiration data.',
        deliverable: 'Functional IoT firmware repository, MQTT telemetry broker, and Next.js farm telemetry dashboard.'
      },
      {
        title: 'Agricultural Market Commodity Exchange Portal',
        description: 'Digital produce trading platform matching farm cooperatives with wholesale aggregators featuring SMS/USSD price broadcast.',
        deliverable: 'Full-stack marketplace application with produce grade classification and mobile-money settlement.'
      }
    ],
    prerequisites: [
      'Interest in agricultural technology, agribusiness, or IoT systems.',
      'Basic familiarity with computer applications and mobile technology.',
      'No prior hardware engineering experience required.'
    ],
    hardwareRequirements: 'Laptop with USB port for microcontroller flashing, minimum 8 GB RAM.',
    targetAudience: ['Agribusiness operators and farm managers', 'Agronomists and cooperative officers', 'Software engineers building rural digital services'],
    careerRoles: ['AgriTech Solutions Specialist', 'Smart Farming Systems Lead', 'Rural Digital Product Coordinator'],
    averageSalary: 'Not published',
    skillsCovered: ['IoT Soil & Weather Telemetry', 'Automated Irrigation Logic', 'Cold-Chain Temperature Tracking', 'Agricultural Commodity Marketplaces', 'Offline Mobile Farm Data Collection', 'Solar & Low-Power Field Deployments'],
    certificationAlignment: 'Practical smart farm deployment plan and telemetry architecture capstone.',
    modules: moduleSet([
      ['Smart Farm Sensing & Soil Telemetry', ['Soil moisture, electrical conductivity and NPK sensing', 'Low-power telemetry protocols (LoRaWAN, MQTT, cellular NB-IoT)', 'Solar power sizing and battery management for rural stations'], 'Deploy a live solar-powered microclimate sensor node'],
      ['Automated Irrigation & Water Stewardship', ['Evapotranspiration calculations and valve actuation', 'Pump automation, pressure sensors and filter backwash control', 'Mobile remote override and alert thresholds via SMS'], 'Engineer a rule-based automated drip irrigation control schedule'],
      ['Digital Commodity Markets & Supply Chains', ['Post-harvest inventory logging and cold-storage tracking', 'Market price aggregation and wholesale buyer matching', 'Traceability from farm harvest lot to retail packaging'], 'Build an agricultural aggregation and harvest tracking portal']
    ])
  },
  {
    id: 'avx-12',
    slug: 'healthtech',
    title: 'HealthTech',
    shortTitle: 'HealthTech',
    category: 'HealthTech',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Medical clinician using tablet computer for digital patient records in clinic',
    badge: 'Clinical Systems & Digital Health',
    difficulty: 'Intermediate to Advanced',
    rating: 0,
    reviewCount: 0,
    enrolledStudents: 0,
    duration: '8 Weeks',
    liveHours: '32 Live Hours + 45 Lab Hours',
    nextBatch: 'Weekly Intakes Available',
    originalPrice: 199,
    discountPrice: 149,
    priceTZS: 380000,
    overview: 'Healthcare systems, electronic medical records (EMR), clinic management, digital health services, pharmacy dispensing tracking, patient data privacy (HIPAA / GDPR compliance), and medicine inventory management.',
    learningObjectives: [
      'Architect standardized electronic patient health records adhering to HL7 and FHIR specifications.',
      'Build comprehensive clinic workflow management platforms: triage, consultation, laboratory orders, and billing.',
      'Implement pharmaceutical inventory tracking with batch expiry monitoring and automated stock replenishment.',
      'Engineer robust patient data protection with field-level encryption and strict clinician role boundaries.',
      'Design telemedicine appointment dispatch and digital prescription verification systems.'
    ],
    practicalProjects: [
      {
        title: 'Outpatient Clinic Information Management System (CIMS)',
        description: 'Complete clinic operational system managing patient queues, clinical encounter notes, diagnostic orders, and pharmacy billing.',
        deliverable: 'Deployable multi-role clinic application with audit-logged patient record modifications.'
      },
      {
        title: 'Pharmaceutical Cold-Chain & Expiry Control Registry',
        description: 'Pharmacy inventory system tracking medicine batch numbers, expiry dates, batch recalls, and temperature alerts.',
        deliverable: 'Audited database schema and real-time inventory management dashboard.'
      }
    ],
    prerequisites: [
      'Basic understanding of web technologies or database concepts.',
      'Interest in healthcare administration, clinical informatics, or public health systems.',
      'Familiarity with medical confidentiality principles.'
    ],
    hardwareRequirements: 'Standard 64-bit laptop, minimum 8 GB RAM, modern web browser.',
    targetAudience: ['Health informatics officers and hospital administrators', 'Software engineers developing clinical systems', 'Healthcare professionals transitioning to digital health'],
    careerRoles: ['HealthTech Systems Engineer', 'Clinical Informatics Specialist', 'Hospital EMR Administrator'],
    averageSalary: 'Not published',
    skillsCovered: ['Electronic Medical Records (EMR)', 'FHIR / HL7 Data Standards', 'Patient Privacy & Field Encryption', 'Clinic Workflow & Triage Automation', 'Pharmacy Dispensing & Batch Tracking', 'Telemedicine & Diagnostic Routing'],
    certificationAlignment: 'Complete clinical information management system defense and security audit.',
    modules: moduleSet([
      ['Clinical Workflows & Patient Master Index', ['Patient registration, national ID linkage and demographic records', 'Outpatient triage, vital sign recording and queue dispatch', 'Encounter documentation and ICD-10 diagnostic coding'], 'Build an outpatient patient registration and triage queue module'],
      ['Pharmacy, Laboratory & Diagnostic Workflows', ['Prescription order routing, drug interaction safety checks', 'Laboratory test ordering, specimen tracking and report publication', 'Pharmaceutical inventory, batch expiry and minimum reorder points'], 'Implement an integrated pharmacy dispensing and stock tracking engine'],
      ['Health Data Security, Privacy & Telehealth', ['Role-based medical record isolation and audit access trails', 'End-to-end encryption for telemedicine video and chat', 'Interoperability via RESTful FHIR resources and health exchange'], 'Author an institutional health data governance and audit log playbook']
    ])
  },
  {
    id: 'avx-13',
    slug: 'fintech-digital-payments',
    title: 'FinTech & Digital Payments',
    shortTitle: 'FinTech & Payments',
    category: 'FinTech & Digital Payments',
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Point of sale digital card terminal and mobile payment transaction confirmation',
    badge: 'Mobile Money & Payment Rails',
    difficulty: 'Intermediate to Advanced',
    rating: 0,
    reviewCount: 0,
    enrolledStudents: 0,
    duration: '10 Weeks',
    liveHours: '40 Live Hours + 60 Lab Hours',
    nextBatch: 'Weekly Intakes Available',
    originalPrice: 229,
    discountPrice: 179,
    priceTZS: 450000,
    overview: 'Financial technology, digital payments, financial inclusion, payment systems, double-entry ledgers, mobile-money gateway integration (M-Pesa Daraja, Tigo Pesa, Airtel Money, PayPal), and secure financial transactions.',
    learningObjectives: [
      'Architect immutable double-entry financial ledgers adhering to strict ACID transaction guarantees.',
      'Integrate production mobile-money gateways (Daraja, Airtel Money, Tigo Pesa) with idempotent webhook handling.',
      'Implement international payment gateways (PayPal, Stripe) with server-side authorization and capture.',
      'Design fraud detection and anomaly scoring engines for high-frequency payment channels.',
      'Establish financial compliance protocols: KYC verification, AML screening, and automated bank reconciliation.'
    ],
    practicalProjects: [
      {
        title: 'Enterprise Multi-Rail Payment Gateway & Settlement Engine',
        description: 'Payment orchestration platform routing customer transactions across mobile money and PayPal with automated status polling and ledger updates.',
        deliverable: 'Production-tested payment gateway microservice with zero double-charge guarantee.'
      },
      {
        title: 'Core Immutable Double-Entry Ledger Service',
        description: 'High-volume transaction ledger recording debit and credit legs with cryptographic hash chaining and audit reconciliation.',
        deliverable: 'Audited PostgreSQL database schema and transaction engine supporting concurrent account transfers.'
      }
    ],
    prerequisites: [
      'Proficiency in at least one backend language (TypeScript, Node.js, Python, or Go).',
      'Solid grasp of relational databases and ACID transaction concepts.',
      'Familiarity with REST APIs, webhooks, and asynchronous HTTP calls.'
    ],
    hardwareRequirements: 'Laptop with Linux, macOS, or Windows with Docker, minimum 8 GB RAM.',
    targetAudience: ['Fintech software engineers', 'Payment systems integration leads', 'Banking software developers and founders'],
    careerRoles: ['FinTech Systems Engineer', 'Payments Integration Specialist', 'Core Banking Infrastructure Lead'],
    averageSalary: 'Not published',
    skillsCovered: ['Double-Entry Accounting Ledgers', 'Mobile Money Gateway APIs (Daraja/M-Pesa)', 'PayPal & Card Processing Rails', 'Idempotent Webhook Processing', 'Anti-Money Laundering (AML) Rules', 'Financial Reconciliation & Audit Trails'],
    certificationAlignment: 'Stress-tested multi-rail payment engine capstone and settlement reconciliation audit.',
    modules: moduleSet([
      ['Financial Data Modeling & Ledger Architecture', ['Double-entry ledger rules: assets, liabilities, equity, revenue, expenses', 'ACID transaction isolation levels and row-level lock contention', 'Immutable journal entries and audit trails with cryptographic checksums'], 'Build an immutable double-entry ledger in PostgreSQL with balance verification'],
      ['Mobile Money & International Payment Rails', ['M-Pesa Daraja C2B/B2C API integration and callback handling', 'PayPal Orders API v2 server-side authorization and capture', 'Idempotency keys, duplicate payment prevention and retry mechanisms'], 'Deploy an automated payment webhook processor handling concurrent callbacks'],
      ['Reconciliation, Fraud & Regulatory Compliance', ['End-of-day bank statement parsing and automated reconciliation', 'Velocity checks, geographical anomaly detection and fraud alerts', 'PCI-DSS, tokenization and customer KYC verification workflows'], 'Implement an automated daily financial reconciliation report generator']
    ])
  },
  {
    id: 'avx-14',
    slug: 'artificial-intelligence-machine-learning',
    title: 'Artificial Intelligence & Machine Learning',
    shortTitle: 'AI & Machine Learning',
    category: 'Applied AI & Automation',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Digital neural network visualization representing deep machine learning algorithms',
    badge: 'Applied ML & Predictive Modeling',
    difficulty: 'Intermediate to Advanced',
    rating: 0,
    reviewCount: 0,
    enrolledStudents: 0,
    duration: '10 Weeks',
    liveHours: '40 Live Hours + 60 Lab Hours',
    nextBatch: 'Weekly Intakes Available',
    originalPrice: 249,
    discountPrice: 189,
    priceTZS: 480000,
    overview: 'AI fundamentals, supervised and unsupervised machine learning, automation, feature engineering, intelligent systems, computer vision, natural language processing, and practical real-world AI applications.',
    learningObjectives: [
      'Master data preparation, statistical feature engineering, and exploratory analysis in Python (NumPy, Pandas, Scikit-Learn).',
      'Train, evaluate, and tune machine learning models for regression, classification, and customer churn prediction.',
      'Implement deep learning architectures for image classification and object recognition with PyTorch.',
      'Deploy machine learning models as production REST APIs with low-latency inference containers.',
      'Establish MLOps pipelines: model versioning, drift detection, and automated retraining workflows.'
    ],
    practicalProjects: [
      {
        title: 'Automated Agricultural Crop Disease Detection Model',
        description: 'Convolutional neural network (CNN) trained to identify plant leaf diseases from field smartphone photos with 94%+ accuracy.',
        deliverable: 'Trained PyTorch model export and containerized inference API with image upload endpoint.'
      },
      {
        title: 'Customer Churn & Default Risk Prediction System',
        description: 'Supervised gradient-boosting ensemble model predicting customer subscription cancellation with explainable SHAP values.',
        deliverable: 'End-to-end machine learning pipeline with automated data preprocessing and inference dashboard.'
      }
    ],
    prerequisites: [
      'Basic programming fluency in Python (syntax, lists, functions).',
      'High school level mathematics (linear algebra, probability, statistics).',
      'Familiarity with data manipulation in spreadsheets or basic SQL.'
    ],
    hardwareRequirements: 'Laptop with minimum 8 GB RAM (16 GB recommended), Python 3.11+ installed.',
    targetAudience: ['Software developers entering machine learning', 'Data analysts transitioning to predictive modeling', 'Engineers building intelligent automated systems'],
    careerRoles: ['Machine Learning Engineer', 'Applied AI Specialist', 'Predictive Modeling Developer'],
    averageSalary: 'Not published',
    skillsCovered: ['Python Data Stack (NumPy, Pandas, Scikit-Learn)', 'Supervised & Unsupervised Algorithms', 'Deep Learning with PyTorch', 'Model Evaluation & Hyperparameter Tuning', 'REST API Model Serving (FastAPI)', 'MLOps & Performance Monitoring'],
    certificationAlignment: 'Trained model defense with benchmark evaluation metrics and live inference API.',
    modules: moduleSet([
      ['Feature Engineering & Classical ML', ['Data cleaning, imputation, normalization and categorical encoding', 'Regression, decision trees, random forests and XGBoost ensembles', 'Cross-validation, ROC-AUC, precision-recall and confusion matrices'], 'Train and tune a telecom subscriber churn prediction model'],
      ['Deep Learning & Computer Vision', ['Neural network architectures: feedforward, backpropagation and activations', 'Convolutional neural networks (CNNs) and transfer learning', 'Object detection and image segmentation pipelines'], 'Fine-tune a vision model for automatic document classification'],
      ['Production Model Deployment & MLOps', ['Packaging models with ONNX and TorchScript for high throughput', 'Serving models via FastAPI with asynchronous batch inference', 'Monitoring prediction drift and automated retraining triggers'], 'Deploy a scalable containerized machine learning API with swagger docs']
    ])
  },
  {
    id: 'avx-15',
    slug: 'cybersecurity-digital-forensics',
    title: 'Cybersecurity & Digital Forensics',
    shortTitle: 'Cyber & Forensics',
    category: 'Cybersecurity',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Digital forensic laboratory equipment displaying binary code analysis and storage disk evidence',
    badge: 'Threat Detection & Incident Response',
    difficulty: 'Intermediate to Advanced',
    rating: 0,
    reviewCount: 0,
    enrolledStudents: 0,
    duration: '10 Weeks',
    liveHours: '40 Live Hours + 60 Lab Hours',
    nextBatch: 'Weekly Intakes Available',
    originalPrice: 229,
    discountPrice: 179,
    priceTZS: 450000,
    overview: 'Information security, network protection, threat detection, digital investigations, memory acquisition, hard drive disk imaging, chain of custody, reverse engineering malware, and incident response.',
    learningObjectives: [
      'Execute bit-stream disk imaging and volatile RAM acquisition while preserving strict legal chain of custody.',
      'Analyze Windows, Linux, and mobile file system artifacts to reconstruct malicious intrusion timelines.',
      'Investigate network packet captures (PCAP) to detect command-and-control (C2) communication and data exfiltration.',
      'Perform static and dynamic malware triage in an isolated hypervisor sandbox.',
      'Author professional digital forensics incident reports admissible in institutional and legal proceedings.'
    ],
    practicalProjects: [
      {
        title: 'Enterprise Ransomware Intrusion Forensic Investigation',
        description: 'Examine disk image and memory dump of a breached server to determine initial access vector, lateral movement, and compromised credentials.',
        deliverable: 'Forensic timeline analysis report with IOC indicators (hashes, IPs, registry keys) and remediation steps.'
      },
      {
        title: 'Network Traffic Exfiltration & Packet Forensics Lab',
        description: 'Reconstruct fragmented DNS tunneling and covert HTTP exfiltration streams from multi-gigabyte PCAP files.',
        deliverable: 'Wireshark packet dissection report and automated Snort/Suricata detection rules.'
      }
    ],
    prerequisites: [
      'Solid understanding of TCP/IP networking protocols and operating system internals.',
      'Familiarity with command line tools on Linux and Windows.',
      'Commitment to ethical cybersecurity standards and legal compliance.'
    ],
    hardwareRequirements: 'Laptop with 16 GB RAM recommended, 60 GB free SSD storage for forensic image analysis.',
    targetAudience: ['Cybersecurity analysts and incident responders', 'System administrators investigating security incidents', 'Law enforcement and corporate IT compliance personnel'],
    careerRoles: ['Digital Forensics Analyst', 'Incident Response Specialist', 'SOC Tier-2 Threat Investigator'],
    averageSalary: 'Not published',
    skillsCovered: ['Forensic Disk & Memory Acquisition', 'Artifact Analysis ($MFT, Registry, Syslog)', 'PCAP Network Packet Dissection', 'Malware Sandbox Triage', 'Chain of Custody & Evidence Documentation', 'Incident Containment & Remediation'],
    certificationAlignment: 'Complete forensic case investigation report and evidence timeline presentation.',
    modules: moduleSet([
      ['Evidence Acquisition & Legal Integrity', ['Order of volatility: CPU registers, RAM, disk and persistent storage', 'Write-blockers, FTK Imager, dd and dc3dd bit-stream cloning', 'SHA-256 evidence hashing and strict chain of custody documentation'], 'Acquire and verify a forensic image of a compromised virtual workstation'],
      ['Disk, Memory & Artifact Forensics', ['File systems: NTFS, ext4, APFS, and deleted file carving', 'Memory analysis with Volatility framework: process trees, sockets, DLLs', 'Event log correlation, prefetch files and browser history forensics'], 'Reconstruct a complete lateral movement timeline from a memory capture'],
      ['Network Packet Forensics & Incident Reporting', ['Deep packet inspection (DPI) with Wireshark and TShark', 'Detecting covert channels, beaconing malware and encrypted tunnels', 'Authoring courtroom-grade digital forensic expert reports'], 'Deliver an end-to-end security breach investigation and findings document']
    ])
  },
  {
    id: 'avx-16',
    slug: 'cloud-computing-devops',
    title: 'Cloud Computing & DevOps',
    shortTitle: 'Cloud Computing & DevOps',
    category: 'Cloud & DevOps',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Cloud data center server infrastructure rack with high-speed fiber interlinks',
    badge: 'Multi-Cloud & Container Orchestration',
    difficulty: 'Intermediate to Advanced',
    rating: 0,
    reviewCount: 0,
    enrolledStudents: 0,
    duration: '10 Weeks',
    liveHours: '40 Live Hours + 60 Lab Hours',
    nextBatch: 'Weekly Intakes Available',
    originalPrice: 219,
    discountPrice: 169,
    priceTZS: 420000,
    overview: 'Cloud architecture, infrastructure as code, continuous integration and deployment (CI/CD), Docker containers, Kubernetes orchestration, deployment automation, cloud monitoring, and high availability systems.',
    learningObjectives: [
      'Architect highly available multi-tier cloud applications with auto-scaling and managed load balancers.',
      'Provision reproducible cloud infrastructure across AWS/GCP/DigitalOcean using Terraform and OpenTofu.',
      'Orchestrate containerized services with Kubernetes: Pods, Deployments, Services, Ingress, and ConfigMaps.',
      'Build end-to-end automated testing and deployment pipelines using GitHub Actions and ArgoCD.',
      'Implement full-stack observability with Prometheus metrics, Grafana dashboards, and centralized Loki logging.'
    ],
    practicalProjects: [
      {
        title: 'Automated Kubernetes Multi-Service Cluster Deployment',
        description: 'Production-ready Kubernetes cluster featuring ingress controller, cert-manager automated TLS, and persistent volumes.',
        deliverable: 'Declarative GitOps repository with Helm charts and automated ArgoCD synchronization.'
      },
      {
        title: 'Terraform Cloud Infrastructure Blueprint with Zero Downtime',
        description: 'Modular Terraform templates provisioning VPC, private subnets, bastion hosts, and managed PostgreSQL clusters.',
        deliverable: 'Audited IaC codebase with security compliance checks (tfsec) and state locking.'
      }
    ],
    prerequisites: [
      'Basic Linux operating system navigation and shell scripting.',
      'Understanding of basic networking (VPC, CIDR, subnets, gateways).',
      'Familiarity with Git repositories and version control.'
    ],
    hardwareRequirements: 'Laptop with minimum 8 GB RAM (16 GB recommended), terminal shell, Docker Desktop.',
    targetAudience: ['DevOps practitioners and cloud engineers', 'Software engineers transitioning to cloud operations', 'System administrators adopting containerization'],
    careerRoles: ['Cloud Solutions Architect', 'DevOps Specialist', 'Kubernetes Administrator'],
    averageSalary: 'Not published',
    skillsCovered: ['Cloud Architecture (VPC, IAM, S3, RDS)', 'Terraform Infrastructure as Code', 'Docker & Multi-Stage Image Builds', 'Kubernetes Cluster Administration', 'GitOps & CI/CD Pipelines (ArgoCD)', 'Prometheus, Grafana & Cloud Telemetry'],
    certificationAlignment: 'Kubernetes deployment capstone and automated Terraform pipeline evaluation.',
    modules: moduleSet([
      ['Cloud Networking, IAM & Virtual Private Clouds', ['Cloud security boundary: IAM roles, policies, and least-privilege access', 'Virtual Private Clouds (VPC), public/private subnets and NAT gateways', 'Object storage policies, lifecycle rules and CDN distribution'], 'Provision an isolated multi-subnet cloud VPC with bastion host access'],
      ['Declarative Infrastructure with Terraform', ['Terraform state management, remote backends and state locking', 'Reusable modules for VPC, compute clusters and managed databases', 'Automated security linting with tfsec and cost estimation with Infracost'], 'Deploy an automated multi-tier cloud environment via Terraform'],
      ['Kubernetes Orchestration & GitOps Pipelines', ['Kubernetes core primitives: Pods, Deployments, StatefulSets and Services', 'Ingress controllers, TLS cert-manager and horizontal pod autoscalers', 'Continuous deployment pipelines using GitHub Actions and ArgoCD'], 'Configure a self-healing Kubernetes cluster with automated rolling updates']
    ])
  },
  {
    id: 'avx-17',
    slug: 'software-engineering-web-development',
    title: 'Software Engineering & Web Development',
    shortTitle: 'Software Engineering & Web',
    category: 'Software Engineering',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Software engineer programming enterprise web applications on dual monitors',
    badge: 'Enterprise Engineering & Clean Code',
    difficulty: 'Foundational to Intermediate',
    rating: 0,
    reviewCount: 0,
    enrolledStudents: 0,
    duration: '10 Weeks',
    liveHours: '40 Live Hours + 60 Lab Hours',
    nextBatch: 'Weekly Intakes Available',
    originalPrice: 199,
    discountPrice: 149,
    priceTZS: 380000,
    overview: 'Programming, software architecture, frontend development, backend systems, APIs, test-driven development (TDD), data structures, algorithms, and robust commercial application development.',
    learningObjectives: [
      'Write clean, maintainable, and modular software adhering to SOLID principles and design patterns.',
      'Develop modern responsive frontend interfaces using React, Next.js, and strict TypeScript.',
      'Build robust RESTful and GraphQL backend web services with input validation and rate limiting.',
      'Implement Test-Driven Development (TDD) with unit, integration, and end-to-end automated test suites.',
      'Manage complex software projects using Git branching models, code reviews, and CI/CD automation.'
    ],
    practicalProjects: [
      {
        title: 'Enterprise Multi-User Project Collaboration Platform',
        description: 'Complete web application with real-time task boards, team permissions, comment threads, and email notifications.',
        deliverable: 'Full GitHub repository with 85%+ unit test coverage and automated deployment.'
      },
      {
        title: 'Commercial RESTful API with Automated Test Suite',
        description: 'Backend service with OpenAPI/Swagger specifications, JWT authentication, and comprehensive integration tests.',
        deliverable: 'Audited API microservice with Postman test collection and load-testing report.'
      }
    ],
    prerequisites: [
      'Basic programming knowledge in any language (syntax, loops, functions).',
      'Desire to master clean code practices and enterprise development standards.',
      'Comfortable using computers for daily study.'
    ],
    hardwareRequirements: 'Standard 64-bit laptop with modern web browser and VS Code, minimum 8 GB RAM.',
    targetAudience: ['Junior developers aiming for mid-level software roles', 'Self-taught programmers seeking formal engineering rigor', 'Computer science graduates preparing for tech interviews'],
    careerRoles: ['Software Engineer', 'Full-Stack Developer', 'Application Programmer'],
    averageSalary: 'Not published',
    skillsCovered: ['SOLID Principles & Design Patterns', 'Modern JavaScript / TypeScript Standards', 'React & Next.js Web Frameworks', 'RESTful API Design & OpenAPI Spec', 'Test-Driven Development (Jest / Vitest)', 'Git Branching & Peer Code Reviews'],
    certificationAlignment: 'Enterprise codebase audit, automated test coverage report, and architecture defense.',
    modules: moduleSet([
      ['Clean Code & Software Design Patterns', ['SOLID principles: Single Responsibility to Dependency Inversion', 'Creational, structural and behavioral design patterns in TypeScript', 'Refactoring legacy codebases and eliminating code smells'], 'Refactor a monolithic script into modular, pattern-driven classes'],
      ['Full-Stack API & Interface Engineering', ['REST architectural constraints and HTTP method semantics', 'State management, client caching and optimistic UI updates', 'Database access layers, ORMs and transactional boundaries'], 'Build a full-stack booking and scheduling application'],
      ['Automated Testing, CI/CD & Delivery', ['Unit testing with Vitest/Jest, mock dependencies and test doubles', 'Integration testing of database endpoints and authentication routes', 'Automated GitHub Actions workflows enforcing linting and test passes'], 'Establish an automated quality-gate CI pipeline with test reporting']
    ])
  },
  {
    id: 'avx-18',
    slug: 'data-science-analytics',
    title: 'Data Science & Analytics',
    shortTitle: 'Data Science & Analytics',
    category: 'Data Science & Analytics',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Business intelligence dashboard with interactive metric graphs and data charts',
    badge: 'Business Intelligence & Insights',
    difficulty: 'Foundational to Intermediate',
    rating: 0,
    reviewCount: 0,
    enrolledStudents: 0,
    duration: '8 Weeks',
    liveHours: '32 Live Hours + 45 Lab Hours',
    nextBatch: 'Weekly Intakes Available',
    originalPrice: 189,
    discountPrice: 139,
    priceTZS: 350000,
    overview: 'Data processing, database analytics, statistics, executive dashboards, data visualization, business intelligence (Power BI / Metabase), and data-driven decision-making for commercial and institutional leadership.',
    learningObjectives: [
      'Extract, clean, and transform messy real-world datasets using Python (Pandas) and advanced SQL.',
      'Perform statistical hypothesis testing, A/B test analysis, and descriptive statistical modeling.',
      'Design clear, intuitive executive dashboards that highlight key performance indicators (KPIs).',
      'Automate repetitive data collection and reporting workflows with scheduled cron scripts.',
      'Translate technical data findings into actionable strategic recommendations for executive leadership.'
    ],
    practicalProjects: [
      {
        title: 'Executive Business Intelligence & Revenue Dashboard',
        description: 'Interactive dashboard analyzing multi-year sales transactions, customer cohorts, and gross margin trends.',
        deliverable: 'Live interactive dashboard with drill-down filters and automated weekly email summary reports.'
      },
      {
        title: 'Automated Data Extraction & Cleansing Pipeline (ETL)',
        description: 'Python script extracting raw CSV/Excel dumps, validating data schemas, and loading sanitized records into PostgreSQL.',
        deliverable: 'Automated ETL pipeline with data quality assertions and error logging.'
      }
    ],
    prerequisites: [
      'Familiarity with spreadsheets (Excel or Google Sheets).',
      'Basic arithmetic and introductory algebra understanding.',
      'No prior programming background required.'
    ],
    hardwareRequirements: 'Laptop with Excel, Google Chrome, and Python 3.10+ installed, minimum 8 GB RAM.',
    targetAudience: ['Business analysts and operations coordinators', 'Marketing and sales managers seeking data skills', 'Finance and accounting professionals'],
    careerRoles: ['Data Analyst', 'Business Intelligence Developer', 'Operations Analytics Specialist'],
    averageSalary: 'Not published',
    skillsCovered: ['Advanced SQL (Window Functions, CTEs)', 'Python Data Analysis (Pandas, NumPy)', 'Data Visualization (Seaborn, Matplotlib)', 'Dashboard Design (Metabase / Power BI)', 'Statistical Hypothesis & Cohort Analysis', 'Automated ETL Pipelines'],
    certificationAlignment: 'Interactive business intelligence dashboard presentation and data insights defense.',
    modules: moduleSet([
      ['Advanced SQL & Relational Analytics', ['Complex joins, grouping, aggregations and window functions', 'Common Table Expressions (CTEs) and recursive queries', 'Database performance for analytical queries and indexing'], 'Write analytical SQL queries answering complex business revenue questions'],
      ['Python for Data Wrangling & Exploration', ['Loading, cleaning and transforming messy CSV and JSON datasets', 'Handling missing values, outliers and datetime manipulations', 'Exploratory data analysis (EDA) and correlation heatmaps'], 'Clean and analyze a 100,000-record customer transaction dataset'],
      ['Visual Storytelling & Executive Dashboards', ['Principles of effective data visualization: color, layout, clarity', 'Building interactive dashboards in Metabase, Power BI or Streamlit', 'Authoring executive insight summaries with clear business ROI'], 'Deliver an end-to-end executive board presentation with live interactive dashboard']
    ])
  },
  {
    id: 'avx-19',
    slug: 'networking-telecommunications',
    title: 'Networking & Telecommunications',
    shortTitle: 'Networking & Telecom',
    category: 'Networking & ISP Engineering',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'High-speed fiber optic cables and telecommunication routing switches in data cabinet',
    badge: 'Enterprise Routing & Switching',
    difficulty: 'Foundational to Intermediate',
    rating: 0,
    reviewCount: 0,
    enrolledStudents: 0,
    duration: '10 Weeks',
    liveHours: '40 Live Hours + 60 Lab Hours',
    nextBatch: 'Weekly Intakes Available',
    originalPrice: 229,
    discountPrice: 179,
    priceTZS: 450000,
    overview: 'Computer networks, routing, switching, wireless connectivity, network infrastructure, ISP operations, fiber optic fundamentals, IP subnetting, VLANs, OSPF, and commercial telecom infrastructure.',
    learningObjectives: [
      'Master the OSI and TCP/IP models, packet encapsulation, and Ethernet frame structure.',
      'Calculate complex IPv4 and IPv6 subnetting plans, VLSM, and route summarization.',
      'Configure enterprise VLANs, 802.1Q trunking, spanning tree protocol (STP), and link aggregation.',
      'Implement dynamic interior gateway routing protocols (OSPF v2/v3) with multi-area design.',
      'Troubleshoot network connectivity issues using packet capture analysis, ping, traceroute, and cable testers.'
    ],
    practicalProjects: [
      {
        title: 'Multi-Building Enterprise Campus Network Architecture',
        description: 'Comprehensive design and configuration of a multi-switch campus network with redundant links, VLANs, and inter-VLAN routing.',
        deliverable: 'Validated network topology simulation script (Packet Tracer / GNS3) with zero routing loops.'
      },
      {
        title: 'Secure Wireless LAN Controller & Guest Portal Setup',
        description: 'Enterprise Wi-Fi deployment featuring 802.1X WPA3 Enterprise authentication and isolated guest network.',
        deliverable: 'Audited configuration file with RF power planning and captive portal isolation.'
      }
    ],
    prerequisites: [
      'Basic computer literacy and understanding of internet usage.',
      'Familiarity with network hardware (routers, switches, Ethernet cables).',
      'Enthusiasm for telecommunications infrastructure.'
    ],
    hardwareRequirements: 'Laptop with Ethernet port (or USB-C adapter), Packet Tracer installed, minimum 8 GB RAM.',
    targetAudience: ['Network technicians and field support engineers', 'IT administrators managing office connectivity', 'Aspiring telecommunications engineers'],
    careerRoles: ['Network Engineer', 'Telecommunications Specialist', 'Field Network Administrator'],
    averageSalary: 'Not published',
    skillsCovered: ['OSI & TCP/IP Protocol Analysis', 'IPv4/IPv6 Subnetting & VLSM', 'Switching: VLANs, 802.1Q, Trunking, STP', 'Dynamic Routing with OSPF v2/v3', 'Enterprise Wireless (WPA3 Enterprise)', 'Network Troubleshooting & Packet Capture'],
    certificationAlignment: 'Enterprise campus network design defense and live routing troubleshooting drill.',
    modules: moduleSet([
      ['Network Fundamentals & IP Addressing', ['OSI 7-layer model, encapsulation and packet headers', 'Binary math, IPv4 subnetting, VLSM and IPv6 addressing architecture', 'Transmission media: twisted pair, single-mode and multi-mode fiber'], 'Design an optimized IP addressing scheme for a 1,000-host enterprise'],
      ['Switching & Local Area Network Design', ['Switch operations, MAC address tables and frame forwarding', 'VLAN segmentation, 802.1Q trunking and Inter-VLAN routing', 'Spanning Tree Protocol (RSTP) and link aggregation (LACP)'], 'Configure a redundant dual-switch core topology with VLAN isolation'],
      ['Dynamic Routing & Wireless Engineering', ['Static routing vs dynamic routing protocols: distance vector vs link state', 'OSPF multi-area configuration, neighbor adjacencies and metric calculation', 'Enterprise Wi-Fi: channels, RF attenuation, roaming and security'], 'Deploy a multi-area OSPF routed network with automated link failover']
    ])
  },
  {
    id: 'avx-20',
    slug: 'digital-business-entrepreneurship',
    title: 'Digital Business & Entrepreneurship',
    shortTitle: 'Digital Business',
    category: 'Digital Business & Entrepreneurship',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Business founder reviewing digital analytics dashboard and product growth metrics on laptop',
    badge: 'Technology Ventures & Scale',
    difficulty: 'Foundational to Intermediate',
    rating: 0,
    reviewCount: 0,
    enrolledStudents: 0,
    duration: '8 Weeks',
    liveHours: '32 Live Hours + 40 Strategy Hours',
    nextBatch: 'Weekly Intakes Available',
    originalPrice: 179,
    discountPrice: 129,
    priceTZS: 320000,
    overview: 'Digital business models, online businesses, business automation, product development, digital marketing, sales funnels, financial forecasting, and technology entrepreneurship in emerging markets.',
    learningObjectives: [
      'Validate technology product ideas using customer discovery interviews and Lean Canvas methodology.',
      'Design modern digital business models: subscription SaaS, marketplace commissions, and usage-based billing.',
      'Automate commercial workflows using modern low-code tools, email sequences, and CRM systems.',
      'Formulate go-to-market strategies and organic customer acquisition funnels.',
      'Build realistic financial operating models: customer acquisition cost (CAC), lifetime value (LTV), and cash runway.'
    ],
    practicalProjects: [
      {
        title: 'Technology Venture Lean Canvas & Go-To-Market Plan',
        description: 'Comprehensive business model plan for a technology startup addressing a verified operational challenge in East Africa.',
        deliverable: 'Professional investment-ready pitch deck, financial model spreadsheet, and go-to-market timeline.'
      },
      {
        title: 'Automated Inbound Lead & Customer Acquisition Engine',
        description: 'Digital sales funnel featuring landing page, automated CRM lead capture, and personalized email onboarding sequence.',
        deliverable: 'Live lead acquisition portal integrated with automated email dispatch and analytics tracking.'
      }
    ],
    prerequisites: [
      'Ambition to launch, scale, or automate a digital product or business venture.',
      'Basic familiarity with digital platforms, email, and social media.',
      'No prior coding or technical degree required.'
    ],
    hardwareRequirements: 'Standard laptop or desktop with internet access and office software.',
    targetAudience: ['Aspiring technology entrepreneurs and founders', 'Business owners digitizing legacy operations', 'Product managers and growth specialists'],
    careerRoles: ['Technology Founder / CEO', 'Digital Product Manager', 'Business Growth Strategist'],
    averageSalary: 'Not published',
    skillsCovered: ['Lean Canvas & Idea Validation', 'Digital Business Models (SaaS / Marketplace)', 'Customer Discovery & Market Sizing', 'Workflow Automation & CRM Setup', 'Unit Economics (CAC, LTV, Churn)', 'Pitch Deck & Capital Fundraising'],
    certificationAlignment: 'Technology business pitch presentation and unit economics defense.',
    modules: moduleSet([
      ['Idea Validation & Customer Discovery', ['Identifying painful commercial bottlenecks and market sizing (TAM/SAM/SOM)', 'Customer discovery interviews without confirmation bias', 'Lean Canvas: value propositions, unfair advantage and revenue streams'], 'Author and validate a complete Lean Canvas for an African tech product'],
      ['Business Model Design & Unit Economics', ['Pricing psychology: tiered subscriptions, per-seat and usage models', 'Unit economics math: calculating CAC, LTV, gross margin and payback period', 'Legal structure, shareholder agreements and intellectual property basics'], 'Build a 3-year dynamic financial forecast and cash runway spreadsheet'],
      ['Growth, Automation & Venture Launch', ['Building minimum viable products (MVPs) with rapid turnaround', 'Automating sales funnels, CRM pipelines and customer onboarding', 'Preparing investor pitch decks and presenting to strategic partners'], 'Pitch your digital business model to a panel of technology executives']
    ])
  }
]
