export interface BookItem {
  id: string
  slug: string
  title: string
  author: string
  description: string
  cover_image_url: string
  format: 'ebook' | 'print' | 'both'
  category: string
  language: string
  digital_price: string
  print_price: string
  stock_quantity: number
  status: 'published'
  isbn: string
  pages: number
  publicationDate: string
  chapters: string[]
  sampleExcerpt: string
  targetAudience: string[]
  keyTakeaways: string[]
}

export const bookstoreCategories = [
  'All Titles',
  'ISP & Telecom',
  'Software Architecture',
  'Education Technology',
  'Cybersecurity',
  'Swahili Editions'
] as const

export const publishedBooks: BookItem[] = [
  {
    id: 'bk-01',
    slug: 'mikrotik-routeros-isp-engineering',
    title: 'MikroTik RouterOS v7 Engineering & ISP Operations',
    author: 'Altavox Telecom Systems Lab',
    description: 'Comprehensive technical manual for deploying, scaling, and automating carrier-grade ISP networks using MikroTik RouterOS v7. Covers multi-POP OSPF dynamic routing, PPPoE subscriber aggregation, FreeRADIUS AAA integration, bandwidth queue trees (PCQ), firewall security, and automated mobile-money billing webhooks.',
    cover_image_url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
    format: 'both',
    category: 'ISP & Telecom',
    language: 'English',
    digital_price: '35000',
    print_price: '65000',
    stock_quantity: 42,
    status: 'published',
    isbn: '978-9912-780-01-2',
    pages: 368,
    publicationDate: 'October 2026',
    chapters: [
      '1. IPv4 / IPv6 Subnetting & Address Allocation for Regional ISPs',
      '2. VLAN Segmentation & Bridge Architecture in RouterOS v7',
      '3. PPPoE Server Configuration & Subscriber IP Pooling',
      '4. Hotspot Gateways & Walled Garden Payment Redirection',
      '5. FreeRADIUS AAA Accounting & Session Disconnect Requests (CoA/PoD)',
      '6. Simple Queues vs Queue Trees & Fair-Share Bandwidth Shaping (PCQ)',
      '7. Multi-WAN BGP Peering & Automated Link Failover',
      '8. Automated Link Health Probing & NOC Alert Telegram Bots'
    ],
    sampleExcerpt: 'In production ISP deployments, queue flap during subscriber renewal causes noticeable packet delay and jitter for active VoIP and video streams. By modifying simple queue target rates in-place via non-blocking RouterOS API socket calls rather than tearing down active queue entries, existing TCP sessions remain completely undisturbed while enforcing new bandwidth ceilings instantly.',
    targetAudience: [
      'ISP Network Engineers & NOC Administrators',
      'WISP Founders & Commercial Hotspot Operators',
      'Field Telecom Technicians & Systems Integrators'
    ],
    keyTakeaways: [
      'Zero-downtime subscriber renewal pipelines',
      'Deterministic MikroTik RouterOS v7 socket automation',
      'Production RADIUS accounting & packet of disconnect (PoD)',
      'Fair-share bandwidth queue trees (PCQ)'
    ]
  },
  {
    id: 'bk-02',
    slug: 'school-information-systems-architecture',
    title: 'Modern School Information Systems: Architecture & Implementation',
    author: 'Yurian Arshad & Altavox Engineering Desk',
    description: 'The complete engineering blueprint for building and running institutional School Information Management Systems (SIMS). Covers normalized relational database schema design in PostgreSQL, student lifecycle enrollment, automated fee billing reconciliation, exam report generation, parent communication portals, and strict Row-Level Security (RLS) data governance.',
    cover_image_url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
    format: 'both',
    category: 'Education Technology',
    language: 'English',
    digital_price: '28000',
    print_price: '55000',
    stock_quantity: 35,
    status: 'published',
    isbn: '978-9912-780-02-9',
    pages: 312,
    publicationDate: 'September 2026',
    chapters: [
      '1. Institutional Needs Analysis & Administrative Workflows',
      '2. Student Entity Data Modeling & Academic Years Normalization',
      '3. Fee Schedules, Invoice Generation & Ledger Reconciliation',
      '4. Examination Grading Engines & Dynamic PDF Report Cards',
      '5. Role-Based Access Control (Admins, Teachers, Guardians, Students)',
      '6. Offline-First Desktop Data Entry & Cloud Synchronization',
      '7. Parent Notification Webhooks & SMS Broadcast Pipelines',
      '8. Regulatory Compliance, Backup Automation & Disaster Recovery'
    ],
    sampleExcerpt: 'School administrative platforms face unique operational surges—notably during end-of-term examination release windows when hundreds of parents simultaneously query grade records. Utilizing incremental cache revalidation paired with indexed materialized views ensures query responses under 50 milliseconds while insulating backend transactional tables from connection pool exhaustion.',
    targetAudience: [
      'School Administrators & ICT Coordinators',
      'Educational Software Engineers & System Builders',
      'EdTech Entrepreneurs & Digital Transformation Leads'
    ],
    keyTakeaways: [
      'Normalized schema design for student academic history',
      'PostgreSQL Row-Level Security (RLS) for parent/teacher privacy',
      'Automated fee reconciliation & receipt generation',
      'Offline-tolerant data synchronization architectures'
    ]
  },
  {
    id: 'bk-03',
    slug: 'mwongozo-uhandisi-mifumo-mtandao-usalama',
    title: 'Mwongozo wa Uhandisi wa Mifumo ya Mtandao na Usalama',
    author: 'Altavox Tech Research Desk',
    description: 'Mwongozo wa kwanza wa kina kwa lugha ya Kiswahili unaofafanua misingi ya uhandisi wa programu, usanidi wa ruta za kibiashara za MikroTik, ulinzi wa mifumo ya kompyuta dhidi ya mashambulizi ya kimtandao (cybersecurity), na ujenzi wa miundombinu thabiti ya TEHAMA kwa wafanyabiashara na taasisi za Afrika Mashariki.',
    cover_image_url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    format: 'both',
    category: 'Swahili Editions',
    language: 'Swahili (Kiswahili)',
    digital_price: '25000',
    print_price: '48000',
    stock_quantity: 50,
    status: 'published',
    isbn: '978-9912-780-03-6',
    pages: 284,
    publicationDate: 'Novemba 2026',
    chapters: [
      '1. Utangulizi wa Miundombinu ya Mitandao na Mifumo ya Mawasiliano',
      '2. Usanidi wa Awali wa Seva za Linux na Vifaa vya MikroTik',
      '3. Usimamizi wa IP Anwani na Ugawaji wa Masafa (Subnetting & VLANs)',
      '4. Usalama wa Mifumo na Kinga Dhidi ya Wadukuzi (Cybersecurity Baselines)',
      '5. Usimamizi wa Data na Kanuni za Uhifadhi Salama (PostgreSQL)',
      '6. Muunganisho wa Mifumo ya Malipo ya Simu (M-Pesa, Tigo Pesa, Airtel Money)',
      '7. Ufuatiliaji wa Utendaji wa Seva na Utatuzi wa Matatizo (Troubleshooting)',
      '8. Mwongozo wa Hatua kwa Hatua wa Kurejesha Mifumo Baada ya Hitilafu'
    ],
    sampleExcerpt: 'Usalama wa mfumo hauanzi na programu ya kuzuia virusi (antivirus), bali huanza na nidhamu ya kusanidi haki za watumiaji, kufunga milango (ports) isiyotumika kwenye firewalls, na kuhakikisha kila muamala unarekodiwa kwenye mifumo ya kumbukumbu (audit logs) isiyoweza kufutwa kirahisi na mshambuliaji.',
    targetAudience: [
      'Wanafunzi wa TEHAMA na Uhandisi wa Programu',
      'Wamiliki wa Biashara na Mameneja wa Teknolojia',
      'Wataalamu wa Mitandao Wanaopendelea Kujifunza kwa Kiswahili'
    ],
    keyTakeaways: [
      'Misingi imara ya usanidi wa seva za Linux na MikroTik',
      'Kinga halisi dhidi ya udukuzi wa mtandao na upotevu wa data',
      'Ushirikishaji wa malipo ya simu (M-Pesa / Tigo Pesa) kwenye mifumo',
      'Mipango thabiti ya nakala rudufu (backups) na kurejesha mifumo'
    ]
  },
  {
    id: 'bk-04',
    slug: 'network-automation-mobile-money-billing',
    title: 'Network Automation & Mobile-Money Billing Gateways',
    author: 'Altavox Systems Architecture Team',
    description: 'A deep technical guide to designing high-availability payment webhook receivers and network automated provisioning engines. Learn cryptographic HMAC-SHA256 signature verification, idempotency handling under carrier network retries, and socket-level bandwidth queue provisioning.',
    cover_image_url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80',
    format: 'both',
    category: 'ISP & Telecom',
    language: 'English',
    digital_price: '32000',
    print_price: '60000',
    stock_quantity: 28,
    status: 'published',
    isbn: '978-9912-780-04-3',
    pages: 296,
    publicationDate: 'Agosti 2026',
    chapters: [
      '1. Asynchronous Mobile-Money Webhook Lifecycle & Carrier Protocols',
      '2. Cryptographic HMAC Verification & Replay Attack Prevention',
      '3. Idempotent State Transitions & Database Concurrency Locks',
      '4. MikroTik RouterOS API Sockets & Batch Command Queues',
      '5. RADIUS Session Disconnect (PoD) & Attribute Mutation',
      '6. Real-Time SMS Receipt Generation & Customer Notifications',
      '7. Accounting Reconciliation & Handling Failed Transaction Callbacks',
      '8. High-Concurrency Stress Testing & Monitoring Runbooks'
    ],
    sampleExcerpt: 'Network retries from mobile payment aggregators frequently result in duplicate webhook callbacks within milliseconds. By enforcing unique transaction reference constraints at the PostgreSQL database layer coupled with distributed Redis lock keys, duplicate credit allocations are deterministically prevented regardless of carrier callback retries.',
    targetAudience: [
      'Fintech Developers & Payment Gateway Engineers',
      'ISP Billing Software Implementers',
      'Backend Engineers Designing Webhook Handlers'
    ],
    keyTakeaways: [
      'Idempotent transactional architecture design',
      'Cryptographic webhook validation workflows',
      'Automated MikroTik queue rate modifications',
      'Zero-revenue-leakage reconciliation loops'
    ]
  },
  {
    id: 'bk-05',
    slug: 'full-stack-web-systems-nextjs-postgres',
    title: 'Full-Stack Web Systems with Next.js and PostgreSQL',
    author: 'Altavox Engineering Desk',
    description: 'Production software architecture using modern Next.js App Router and PostgreSQL. Covers Server Components boundaries, Server Actions transaction safety, Drizzle type-safe schema modeling, connection pooling with PgBouncer, and zero-downtime deployment strategies.',
    cover_image_url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    format: 'both',
    category: 'Software Architecture',
    language: 'English',
    digital_price: '30000',
    print_price: '58000',
    stock_quantity: 40,
    status: 'published',
    isbn: '978-9912-780-05-0',
    pages: 340,
    publicationDate: 'Julai 2026',
    chapters: [
      '1. Architecture Boundaries: Server Components vs Client Interactive Leaves',
      '2. Relational Modeling, Foreign Keys & Check Constraints',
      '3. Server Actions Mutation Lifecycle & Optimistic Updates',
      '4. Safe Authentication & Session Cookie Encryption Hygiene',
      '5. Connection Pooling, PgBouncer & Query Optimization (EXPLAIN ANALYZE)',
      '6. Edge CDN Caching, Tag Revalidation & Core Web Vitals',
      '7. Containerized Docker Multi-Stage Deployments on Linux',
      '8. Observability: Structured Logging, Health Checks & Audit Trails'
    ],
    sampleExcerpt: 'Reliable web applications rely on database constraints rather than application-layer validation alone. A check constraint or foreign key in PostgreSQL guarantees data consistency regardless of concurrency race conditions or background worker execution, preventing orphaned states before they can reach production records.',
    targetAudience: [
      'Senior Web Developers & Technical Leads',
      'Full-Stack Engineers Migrating from SPAs to App Router',
      'Software Architects Designing Enterprise Portals'
    ],
    keyTakeaways: [
      'Clean separation of Server Components and client interactivity',
      'Transactional integrity with Drizzle ORM and PostgreSQL',
      'Sub-second Core Web Vitals optimization techniques',
      'Containerized Linux release pipelines'
    ]
  },
  {
    id: 'bk-06',
    slug: 'cybersecurity-threat-defense-enterprise',
    title: 'Cybersecurity & Threat Defense for African Enterprise Infrastructures',
    author: 'Altavox Defensive Security Lab',
    description: 'A practical defensive security guide tailored to corporate networks, financial institutions, and telecommunication providers operating across East and Southern Africa. Covers threat modeling, OWASP mitigation, edge firewall architectures, bastion host configurations, and forensic incident containment.',
    cover_image_url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80',
    format: 'both',
    category: 'Cybersecurity',
    language: 'English',
    digital_price: '38000',
    print_price: '70000',
    stock_quantity: 25,
    status: 'published',
    isbn: '978-9912-780-06-7',
    pages: 380,
    publicationDate: 'Juni 2026',
    chapters: [
      '1. Threat Landscape & Attack Vectors Targeting Regional Enterprises',
      '2. Zero-Trust Network Segmentation & Perimeter Defense',
      '3. Linux Server Hardening & Secure Bastion SSH Architectures',
      '4. OWASP Top 10 Web Application Safeguards & API Armor',
      '5. Modern Cryptography: AES-GCM, Ed25519, Key Rotation & Secrets Management',
      '6. Centralized Syslog Aggregation & SIEM Alerting Trees',
      '7. Ransomware Containment Runbooks & Offline Backup Verification',
      '8. Incident Response Protocol, Evidence Preservation & Post-Mortems'
    ],
    sampleExcerpt: 'A hardened perimeter is meaningless if internal network segments allow unrestricted lateral movement. Implementing VLAN micro-segmentation and strict ingress/egress firewall policies restricts an endpoint compromise from escalating into a domain-wide incident, providing security teams with containment time.',
    targetAudience: [
      'Security Operations Center (SOC) Analysts',
      'Enterprise Systems Administrators & IT Directors',
      'Compliance Officers & Infrastructure Engineers'
    ],
    keyTakeaways: [
      'Zero-trust segmentation tailored for real budgets',
      'Defensive Linux hardening checklists and automation',
      'Ransomware defense and immutable offline backup runbooks',
      'Incident triage, evidence preservation, and post-mortem reporting'
    ]
  }
]
