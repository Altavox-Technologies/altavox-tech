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
  | 'School Information Systems'
  | 'FinTech & Business Systems'
  | 'UI/UX & Product Design'
  | 'IT Support & Systems Administration'
  | 'Digital Foundations'
  | 'Agriculture & Food Systems'
  | 'Health & Wellbeing'
  | 'Education & Skills'
  | 'Energy, Water & Climate'
  | 'Finance & Enterprise'
  | 'Software, Data & AI'
  | 'Connectivity & Infrastructure'
  | 'Cybersecurity & Digital Trust'
  | 'Industry & Logistics'

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
  'Cloud & DevOps',
  'Networking & ISP Engineering',
  'Cybersecurity',
  'Database & Backend Engineering',
  'Applied AI & Automation',
  'School Information Systems',
  'FinTech & Business Systems',
  'UI/UX & Product Design',
  'IT Support & Systems Administration',
  'Digital Foundations',
  'Agriculture & Food Systems',
  'Health & Wellbeing',
  'Education & Skills',
  'Energy, Water & Climate',
  'Finance & Enterprise',
  'Software, Data & AI',
  'Connectivity & Infrastructure',
  'Cybersecurity & Digital Trust',
  'Industry & Logistics'
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
    shortTitle: 'Full-Stack Development',
    category: 'Software Engineering',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Developer workspace with code on a laptop',
    badge: 'Build real applications',
    rating: 0, reviewCount: 0, enrolledStudents: 0,
    duration: 'Confirm with Academy', liveHours: 'Delivery format to be confirmed', nextBatch: 'Contact us for availability',
    originalPrice: 0, discountPrice: 0,
    overview: 'Learn to design, build, test and deploy complete web applications, from responsive interfaces to secure APIs and database-backed features. Practical work covers the same technologies used to build modern business platforms.',
    targetAudience: ['Beginners with basic computer skills', 'Aspiring web developers', 'Designers or IT staff moving into software development'],
    careerRoles: ['Junior Front-End Developer', 'Junior Back-End Developer', 'Full-Stack Developer'],
    averageSalary: 'Not published',
    skillsCovered: ['HTML, CSS & responsive layouts', 'JavaScript & TypeScript', 'React & Next.js', 'Node.js APIs', 'PostgreSQL & Supabase', 'Git, testing & deployment'],
    certificationAlignment: 'Practical portfolio project and skills assessment. External certification is not included unless separately confirmed.',
    modules: moduleSet([
      ['Web foundations and interface development', ['Semantic HTML and accessible structure', 'CSS layout, responsive design and browser tools', 'JavaScript fundamentals and DOM interaction'], 'Build a responsive multi-page business website'],
      ['Modern front-end engineering', ['TypeScript and component design', 'React state, forms and data fetching', 'Next.js routing, rendering and metadata'], 'Build a searchable service or product catalogue'],
      ['Backend, data and release workflow', ['REST API design and validation', 'PostgreSQL schema, queries and access control', 'Git workflow, automated checks and deployment'], 'Deploy a full-stack application with a database']
    ])
  },
  {
    id: 'avx-02',
    slug: 'cloud-engineering-devops',
    title: 'Cloud Engineering & DevOps',
    shortTitle: 'Cloud & DevOps',
    category: 'Cloud & DevOps',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Digital globe representing cloud infrastructure',
    badge: 'Infrastructure skills',
    rating: 0, reviewCount: 0, enrolledStudents: 0,
    duration: 'Confirm with Academy', liveHours: 'Delivery format to be confirmed', nextBatch: 'Contact us for availability',
    originalPrice: 0, discountPrice: 0,
    overview: 'Understand how applications run in production. Learn Linux administration, cloud fundamentals, containers, CI/CD, DNS, TLS, monitoring, backups and reliable deployment practices.',
    targetAudience: ['IT support and system administrators', 'Developers learning production operations', 'Technical teams responsible for deployments'],
    careerRoles: ['Cloud Support Associate', 'DevOps Engineer (junior pathway)', 'Systems Administrator', 'Site Reliability Associate'],
    averageSalary: 'Not published',
    skillsCovered: ['Linux administration', 'Cloud networking and compute', 'Docker and containers', 'CI/CD pipelines', 'DNS, domains and TLS', 'Monitoring and backup planning'],
    certificationAlignment: 'Vendor-neutral practical labs. Cloud vendor exam preparation can be scoped separately.',
    modules: moduleSet([
      ['Linux and infrastructure foundations', ['Shell, users, permissions and services', 'Processes, storage and system logs', 'SSH, firewall and server hardening'], 'Provision and secure a Linux server'],
      ['Cloud, containers and delivery', ['Cloud compute, storage and networking concepts', 'Docker images, volumes and networks', 'Build and release pipelines with Git'], 'Containerise and deploy a web service'],
      ['Reliability and operations', ['DNS, HTTPS and certificate lifecycle', 'Monitoring, alerting and log analysis', 'Backup, restore and incident runbooks'], 'Create an operations-ready deployment with recovery notes']
    ])
  },
  {
    id: 'avx-03',
    slug: 'mikrotik-isp-network-engineering',
    title: 'MikroTik, ISP & Network Engineering',
    shortTitle: 'ISP & Network Engineering',
    category: 'Networking & ISP Engineering',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Network servers and connectivity equipment',
    badge: 'Network operations',
    rating: 0, reviewCount: 0, enrolledStudents: 0,
    duration: 'Confirm with Academy', liveHours: 'Delivery format to be confirmed', nextBatch: 'Contact us for availability',
    originalPrice: 0, discountPrice: 0,
    overview: 'Build practical networking knowledge for offices, hotspots and internet service providers. Topics include IP planning, routing, MikroTik configuration, subscriber access, RADIUS and network monitoring.',
    targetAudience: ['Network support technicians', 'Aspiring ISP operators and NOC staff', 'IT professionals managing routers and Wi-Fi'],
    careerRoles: ['Network Technician', 'NOC Support Engineer', 'Junior Network Administrator', 'ISP Technical Support'],
    averageSalary: 'Not published',
    skillsCovered: ['TCP/IP and subnetting', 'MikroTik RouterOS', 'Routing, NAT and firewalling', 'Wireless and hotspot design', 'PPPoE and RADIUS concepts', 'Monitoring and troubleshooting'],
    certificationAlignment: 'Hands-on lab assessment. MikroTik certification exams are separate and not represented as included.',
    modules: moduleSet([
      ['Network fundamentals and design', ['IPv4 addressing and subnetting', 'Switching, routing and VLAN concepts', 'Wireless coverage and capacity planning'], 'Design a small office and hotspot network'],
      ['Router configuration and subscriber access', ['RouterOS setup and firewall rules', 'NAT, queues and bandwidth policy', 'Hotspot, PPPoE and RADIUS architecture'], 'Configure a segmented subscriber access lab'],
      ['ISP operations and troubleshooting', ['Monitoring and fault isolation', 'AAA accounting and session lifecycle', 'Documentation, backups and change control'], 'Prepare an ISP network operations runbook']
    ])
  },
  {
    id: 'avx-04',
    slug: 'cybersecurity-foundations',
    title: 'Cybersecurity & Defensive Security',
    shortTitle: 'Cybersecurity',
    category: 'Cybersecurity',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Cybersecurity concept with digital lock',
    badge: 'Defensive security',
    rating: 0, reviewCount: 0, enrolledStudents: 0,
    duration: 'Confirm with Academy', liveHours: 'Delivery format to be confirmed', nextBatch: 'Contact us for availability',
    originalPrice: 0, discountPrice: 0,
    overview: 'Learn to reduce security risks across computers, networks and web applications. The course introduces threat modelling, secure configuration, vulnerability assessment, access control, logging and incident response in authorised lab environments.',
    targetAudience: ['IT support and network technicians', 'Developers who need secure coding practices', 'Learners beginning a cybersecurity pathway'],
    careerRoles: ['IT Security Support', 'Junior SOC Analyst pathway', 'Security Administrator assistant'],
    averageSalary: 'Not published',
    skillsCovered: ['Security fundamentals and risk', 'Linux and endpoint hardening', 'OWASP web security', 'Network security basics', 'Identity and access management', 'Logging and incident response'],
    certificationAlignment: 'Practical security assessment. Third-party certification is not included unless separately confirmed.',
    modules: moduleSet([
      ['Security principles and hardening', ['Threats, vulnerabilities and risk', 'Account security, MFA and least privilege', 'Windows and Linux baseline hardening'], 'Create a workstation security checklist'],
      ['Network and application security', ['Firewall and network segmentation', 'OWASP web application risks', 'Safe vulnerability scanning in a lab'], 'Assess a deliberately vulnerable training application'],
      ['Monitoring and incident handling', ['Security logs and alert triage', 'Evidence handling and incident timeline', 'Containment, recovery and reporting'], 'Write an incident response report from a lab scenario']
    ])
  },
  {
    id: 'avx-05',
    slug: 'database-backend-engineering',
    title: 'Database & Backend Engineering',
    shortTitle: 'Backend & Databases',
    category: 'Database & Backend Engineering',
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Database and data infrastructure visual',
    badge: 'Data foundations',
    rating: 0, reviewCount: 0, enrolledStudents: 0,
    duration: 'Confirm with Academy', liveHours: 'Delivery format to be confirmed', nextBatch: 'Contact us for availability',
    originalPrice: 0, discountPrice: 0,
    overview: 'Learn to structure reliable data systems and build backend services. Work through relational modelling, SQL, API design, authentication, transactions, performance, backups and secure data access.',
    targetAudience: ['Developers building database-backed apps', 'IT professionals moving into backend work', 'Analysts who want stronger SQL skills'],
    careerRoles: ['Junior Backend Developer', 'SQL / Database Support', 'API Developer'],
    averageSalary: 'Not published',
    skillsCovered: ['PostgreSQL and SQL', 'Relational data modelling', 'REST API design', 'Authentication and authorization', 'Transactions and indexing', 'Backups and query performance'],
    certificationAlignment: 'Portfolio project and database/API assessment.',
    modules: moduleSet([
      ['Relational database design', ['Tables, keys and relationships', 'Normalization and constraints', 'SQL joins, grouping and subqueries'], 'Design a normalized business database'],
      ['Backend APIs and security', ['HTTP, REST and request validation', 'Authentication, roles and permissions', 'Transactions and error handling'], 'Build a secure CRUD API'],
      ['Production data operations', ['Indexes and query plans', 'Migrations, backups and recovery', 'Audit trails and data integrity'], 'Deploy an API with a documented database recovery plan']
    ])
  },
  {
    id: 'avx-06',
    slug: 'applied-ai-automation',
    title: 'Applied AI, Local AI & Workflow Automation',
    shortTitle: 'AI & Automation',
    category: 'Applied AI & Automation',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Abstract artificial intelligence network illustration',
    badge: 'Applied technology',
    rating: 0, reviewCount: 0, enrolledStudents: 0,
    duration: 'Confirm with Academy', liveHours: 'Delivery format to be confirmed', nextBatch: 'Contact us for availability',
    originalPrice: 0, discountPrice: 0,
    overview: 'Explore practical AI engineering: Python foundations, model concepts, prompt design, local language models, retrieval, tool calling and automation workflows. Emphasis is on useful, testable systems rather than AI hype.',
    targetAudience: ['Developers and technical founders', 'IT professionals exploring automation', 'Learners with basic programming knowledge'],
    careerRoles: ['Automation Developer', 'AI Application Developer pathway', 'Technical Workflow Specialist'],
    averageSalary: 'Not published',
    skillsCovered: ['Python foundations', 'LLM concepts and prompt design', 'Local AI with llama.cpp or Ollama', 'Embeddings and retrieval concepts', 'Tool calling and workflow automation', 'Evaluation, privacy and guardrails'],
    certificationAlignment: 'Build and demonstrate an applied AI prototype. No vendor certification is implied.',
    modules: moduleSet([
      ['Python and AI foundations', ['Python scripting and APIs', 'Model, token and context concepts', 'Prompt design and structured outputs'], 'Build a small AI-assisted utility'],
      ['Local models and retrieval', ['Running local models within hardware limits', 'Embeddings and document retrieval concepts', 'Data privacy and prompt-injection awareness'], 'Create a local document question-answering prototype'],
      ['Agents and workflow automation', ['Tool calling and controlled actions', 'Workflow design and error handling', 'Evaluation, logging and human approval'], 'Build an automation workflow with a verification step']
    ])
  },
  {
    id: 'avx-07',
    slug: 'school-information-management-systems',
    title: 'School Information Management Systems (SIMS)',
    shortTitle: 'School Management Systems',
    category: 'School Information Systems',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Modern classroom prepared for learning',
    badge: 'Education technology',
    rating: 0, reviewCount: 0, enrolledStudents: 0,
    duration: 'Confirm with Academy', liveHours: 'Delivery format to be confirmed', nextBatch: 'Contact us for availability',
    originalPrice: 0, discountPrice: 0,
    overview: 'Understand how to plan and build a school information system that connects student records, admissions, attendance, fees, results, parent communication and reporting with strong privacy and role-based access.',
    targetAudience: ['School administrators and ICT staff', 'Software developers serving education', 'Education entrepreneurs and system implementers'],
    careerRoles: ['School ICT Administrator', 'Education Systems Support', 'Junior SIMS Implementer'],
    averageSalary: 'Not published',
    skillsCovered: ['Student lifecycle and records', 'Admissions and attendance workflows', 'Fees and payment reconciliation concepts', 'Results and academic reporting', 'Parent/student portals', 'Role-based access and audit logs'],
    certificationAlignment: 'System design exercise and workflow prototype assessment.',
    modules: moduleSet([
      ['School operations and data model', ['Student identity and enrollment lifecycle', 'Classes, subjects and academic years', 'Data quality and record ownership'], 'Model a school database structure'],
      ['Academic and administrative workflows', ['Attendance, assessments and results', 'Fees, invoices and payment status', 'Admissions and document management'], 'Prototype an admissions-to-enrollment workflow'],
      ['Portals, privacy and reporting', ['Parent and student portal permissions', 'Roles, audit trails and data protection', 'Dashboards and operational reports'], 'Design a secure school management portal']
    ])
  },
  {
    id: 'avx-08',
    slug: 'fintech-business-systems',
    title: 'FinTech, Payments & Business Systems',
    shortTitle: 'FinTech & Business Systems',
    category: 'FinTech & Business Systems',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Business payment terminal at a checkout counter',
    badge: 'Business technology',
    rating: 0, reviewCount: 0, enrolledStudents: 0,
    duration: 'Confirm with Academy', liveHours: 'Delivery format to be confirmed', nextBatch: 'Contact us for availability',
    originalPrice: 0, discountPrice: 0,
    overview: 'Learn the architecture behind business software such as POS, inventory, invoicing, subscriptions and digital payment integrations. Focus on transaction integrity, reconciliation, security and operational visibility.',
    targetAudience: ['Developers building business applications', 'Small business technology operators', 'IT professionals supporting payment and billing systems'],
    careerRoles: ['Business Systems Support', 'FinTech Application Developer pathway', 'POS / ERP Implementer'],
    averageSalary: 'Not published',
    skillsCovered: ['POS and inventory workflows', 'Invoices and subscription billing', 'Payment API integration concepts', 'Webhook verification and idempotency', 'Reconciliation and audit trails', 'Multi-tenant SaaS fundamentals'],
    certificationAlignment: 'Practical business workflow prototype. Payment provider approval and live credentials are separate.',
    modules: moduleSet([
      ['Business process and system design', ['Products, stock and sales lifecycle', 'Customers, invoices and receivables', 'Tenant and user permission models'], 'Map a small retail POS workflow'],
      ['Payments and transaction integrity', ['Payment request and callback lifecycle', 'Webhook signatures and idempotency', 'Refunds, reversals and reconciliation'], 'Build a simulated payment integration in a test environment'],
      ['Operations and reporting', ['Ledger concepts and audit records', 'Inventory and sales reporting', 'Failure handling and support workflows'], 'Create a reconciliation and exception report']
    ])
  },
  {
    id: 'avx-09',
    slug: 'ui-ux-product-design',
    title: 'UI/UX & Digital Product Design',
    shortTitle: 'UI/UX & Product Design',
    category: 'UI/UX & Product Design',
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Digital product interface design on a desktop screen',
    badge: 'Design systems',
    rating: 0, reviewCount: 0, enrolledStudents: 0,
    duration: 'Confirm with Academy', liveHours: 'Delivery format to be confirmed', nextBatch: 'Contact us for availability',
    originalPrice: 0, discountPrice: 0,
    overview: 'Learn to turn user needs into clear digital experiences. Practice research, information architecture, wireframes, visual systems, responsive interface design, accessibility and prototype testing.',
    targetAudience: ['Aspiring UI/UX designers', 'Developers who build user interfaces', 'Business owners planning digital products'],
    careerRoles: ['Junior UI Designer', 'UX Design Assistant', 'Product Design Associate'],
    averageSalary: 'Not published',
    skillsCovered: ['User research and personas', 'Information architecture', 'Wireframing and prototyping', 'Typography and visual hierarchy', 'Responsive design and accessibility', 'Usability testing and design systems'],
    certificationAlignment: 'Portfolio case study and usability review.',
    modules: moduleSet([
      ['Research and experience structure', ['User goals and research methods', 'Personas, journeys and task flows', 'Information architecture and navigation'], 'Create a user journey and sitemap'],
      ['Interface and design systems', ['Wireframes and high-fidelity screens', 'Typography, spacing and visual hierarchy', 'Reusable components and responsive layouts'], 'Design a responsive service dashboard'],
      ['Prototyping and validation', ['Interactive prototypes', 'Accessibility checks and usability tests', 'Design handoff and iteration'], 'Present a tested product design case study']
    ])
  },
  {
    id: 'avx-10',
    slug: 'it-support-systems-administration',
    title: 'IT Support & Systems Administration',
    shortTitle: 'IT Support & Systems Admin',
    category: 'IT Support & Systems Administration',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Technician working on computer hardware',
    badge: 'Practical IT skills',
    rating: 0, reviewCount: 0, enrolledStudents: 0,
    duration: 'Confirm with Academy', liveHours: 'Delivery format to be confirmed', nextBatch: 'Contact us for availability',
    originalPrice: 0, discountPrice: 0,
    overview: 'Develop practical skills for maintaining computers and supporting users. Learn diagnostics, Windows installation and configuration, software deployment, endpoint protection, networking basics, backups and service desk procedures.',
    targetAudience: ['Beginners entering IT support', 'Office and school ICT support staff', 'Technicians strengthening troubleshooting skills'],
    careerRoles: ['IT Support Technician', 'Desktop Support Associate', 'Junior Systems Administrator'],
    averageSalary: 'Not published',
    skillsCovered: ['PC hardware diagnostics', 'Windows installation and configuration', 'Drivers, updates and software management', 'Endpoint security and backups', 'LAN and Wi-Fi troubleshooting', 'Ticketing and user support'],
    certificationAlignment: 'Practical troubleshooting assessment and documented service procedure.',
    modules: moduleSet([
      ['Computer hardware and diagnostics', ['PC components and compatibility', 'Fault isolation and diagnostic tools', 'Storage, memory and peripheral maintenance'], 'Diagnose and document a simulated PC fault'],
      ['Operating systems and endpoint care', ['Windows installation and activation compliance', 'Drivers, updates and user profiles', 'Security software, permissions and backups'], 'Prepare a secure workstation setup checklist'],
      ['Networking and service desk operations', ['IP, Wi-Fi and connectivity troubleshooting', 'Remote support safety and user consent', 'Ticket lifecycle and technical documentation'], 'Resolve and document a sample support ticket']
    ])
  },

  {
    id: 'avx-11',
    slug: 'digital-foundations-for-work-and-life',
    title: 'Digital Foundations for Work, Learning and Everyday Life',
    shortTitle: 'Digital Foundations',
    category: 'Digital Foundations',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Learners working together with laptops in a digital skills session',
    badge: 'Start Here',
    rating: 0, reviewCount: 0, enrolledStudents: 0,
    duration: 'Confirm with Academy',
    liveHours: 'Delivery format to be confirmed',
    nextBatch: 'Contact us for availability',
    originalPrice: 0, discountPrice: 0,
    overview: 'Build the practical digital confidence needed to participate safely and productively in modern life and work. Designed for learners, job seekers, small-business owners and community organisations, including people with limited prior computer experience. Activities account for mobile-first access, data costs and intermittent connectivity.',
    targetAudience: ['Beginners and adult learners', 'Students and job seekers', 'Micro and small-business owners', 'Community trainers and frontline workers'],
    careerRoles: ['Digital Skills Facilitator', 'Office and Operations Assistant', 'Digital Customer Support Assistant'],
    averageSalary: 'Not published; outcomes depend on local demand and experience',
    skillsCovered: ['Computer and smartphone fundamentals', 'Files, email, documents and spreadsheets', 'Online research and information verification', 'Digital collaboration and remote work', 'Privacy, scams and account security', 'Accessible and low-bandwidth workflows'],
    certificationAlignment: 'Portfolio-based practical assessment. Any certificate, recognition or accreditation must be confirmed by the Academy before enrolment.',
    modules: moduleSet([
      ['Confident use of digital devices', ['Operating systems, settings, files and cloud storage', 'Typing, documents, spreadsheets and presentations', 'Email, calendars, video meetings and online collaboration'], 'Create a job-ready digital portfolio with a CV, budget spreadsheet and presentation'],
      ['Internet, information and communication', ['Search strategies and source credibility checks', 'Online forms, public information and digital services', 'Mobile-first workflows and responsible data use'], 'Complete a simulated online application and produce a verified information brief'],
      ['Safety, accessibility and practical productivity', ['Strong passwords, MFA, phishing and device updates', 'Accessibility tools and inclusive digital communication', 'Working offline, backing up files and managing data costs'], 'Prepare a personal digital safety plan and an offline-ready work toolkit']
    ])
  },
  {
    id: 'avx-12',
    slug: 'agritech-food-systems',
    title: 'AgriTech, Climate-Smart Farming and Food Systems',
    shortTitle: 'AgriTech & Food Systems',
    category: 'Agriculture & Food Systems',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Smallholder farmland and crop rows in a rural landscape',
    badge: 'Food Security & Livelihoods',
    rating: 0, reviewCount: 0, enrolledStudents: 0,
    duration: 'Confirm with Academy',
    liveHours: 'Delivery format to be confirmed',
    nextBatch: 'Contact us for availability',
    originalPrice: 0, discountPrice: 0,
    overview: 'Apply practical technology and sound agronomic decision-making to challenges across the food value chain: low productivity, weather risk, post-harvest loss, market access and traceability. Learners work with locally relevant crops and data; digital tools support, rather than replace, extension officers and farmer knowledge.',
    targetAudience: ['Farmers and cooperative groups', 'Agricultural extension workers', 'Agri-business founders and students', 'Food processors and market operators'],
    careerRoles: ['AgriTech Field Officer', 'Farm Operations Coordinator', 'Agricultural Data Assistant', 'Food Supply Chain Assistant'],
    averageSalary: 'Not published; income varies by crop, region and business model',
    skillsCovered: ['Farm records and cost-of-production analysis', 'Weather and climate-risk information', 'Soil, water and input-use planning', 'Pest observation and integrated pest management principles', 'Post-harvest handling and storage tracking', 'Market information and digital traceability'],
    certificationAlignment: 'Field logbook, farm improvement plan and measured capstone review. Agronomic recommendations must be locally validated.',
    modules: moduleSet([
      ['Understand the farm and its constraints', ['Farm mapping, crop calendars and baseline records', 'Soil health, water use and safe input management', 'Weather information, climate risks and decision thresholds'], 'Create a seasonal farm plan and simple input-cost baseline for a selected crop'],
      ['Improve production and reduce losses', ['Integrated pest management and safe scouting records', 'Harvest timing, grading, storage and post-harvest loss', 'Low-cost sensors and responsible use of farm data'], 'Design a practical post-harvest loss reduction pilot with monitoring indicators'],
      ['Connect farmers to markets and finance', ['Cooperative records, aggregation and quality standards', 'Market research, pricing and buyer requirements', 'Traceability, digital payments and business cash-flow basics'], 'Build a traceable farm-to-market plan with a buyer profile and break-even analysis']
    ])
  },
  {
    id: 'avx-13',
    slug: 'healthtech-community-health-data',
    title: 'HealthTech, Community Health and Responsible Health Data',
    shortTitle: 'HealthTech',
    category: 'Health & Wellbeing',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Healthcare professional using a digital tablet in a clinical setting',
    badge: 'People-Centred Health',
    rating: 0, reviewCount: 0, enrolledStudents: 0,
    duration: 'Confirm with Academy',
    liveHours: 'Delivery format to be confirmed',
    nextBatch: 'Contact us for availability',
    originalPrice: 0, discountPrice: 0,
    overview: 'Explore how responsible digital systems can strengthen health information workflows, appointment access, supply visibility, community outreach and service continuity. This is a technology and service-design course, not clinical training. It does not qualify learners to diagnose, prescribe or replace licensed health professionals.',
    targetAudience: ['Health administrators and records staff', 'Community health programme teams', 'Software developers and designers', 'Public health and health informatics students'],
    careerRoles: ['Health Information Assistant', 'HealthTech Product Support', 'Digital Health Project Assistant', 'Health Data Quality Officer'],
    averageSalary: 'Not published; roles and requirements vary by health system',
    skillsCovered: ['Patient-centred service journey mapping', 'Health data quality and interoperability concepts', 'Privacy, consent and role-based access', 'Appointment and referral workflow design', 'Medicine and essential-supply inventory visibility', 'Monitoring, evaluation and responsible AI limits'],
    certificationAlignment: 'Privacy-reviewed prototype and workflow assessment. No clinical or professional health licence is awarded.',
    modules: moduleSet([
      ['Understand care journeys and service gaps', ['Patient journey mapping and service accessibility', 'Health information systems and data quality basics', 'Offline-first workflows for low-connectivity settings'], 'Map a clinic appointment, referral or outreach workflow and identify measurable bottlenecks'],
      ['Design safe and useful digital workflows', ['Consent, confidentiality and minimum-necessary data', 'User roles, audit trails and secure information exchange', 'Inventory, appointment and referral process design'], 'Prototype a privacy-conscious appointment and essential-supplies tracking workflow using synthetic data'],
      ['Evaluate impact and protect people', ['Data quality checks and meaningful service indicators', 'Human oversight, bias and limits of AI in health', 'Incident reporting, continuity and change management'], 'Present a pilot proposal with safeguards, baseline measures and an evaluation plan']
    ])
  },
  {
    id: 'avx-14',
    slug: 'edtech-learning-systems',
    title: 'Education Technology, Digital Learning and School Systems',
    shortTitle: 'EdTech & Learning Systems',
    category: 'Education & Skills',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Students learning together in a classroom',
    badge: 'Learning for Every Learner',
    rating: 0, reviewCount: 0, enrolledStudents: 0,
    duration: 'Confirm with Academy',
    liveHours: 'Delivery format to be confirmed',
    nextBatch: 'Contact us for availability',
    originalPrice: 0, discountPrice: 0,
    overview: 'Design practical, inclusive learning experiences and school information workflows that work in real classrooms. Address access gaps, teacher workload, learning-resource quality, assessment feedback and school administration while protecting children’s data and keeping teachers in control.',
    targetAudience: ['Teachers and school leaders', 'Education administrators', 'Instructional designers and tutors', 'Developers building education products'],
    careerRoles: ['Digital Learning Coordinator', 'Education Technology Support', 'Learning Content Developer', 'School Systems Assistant'],
    averageSalary: 'Not published; depends on role, qualifications and institution',
    skillsCovered: ['Learning objectives and lesson design', 'Low-bandwidth and offline learning resources', 'Digital assessment and feedback', 'School data and records workflow design', 'Child safeguarding and learner privacy', 'Learning analytics with responsible interpretation'],
    certificationAlignment: 'Teaching-resource portfolio and school workflow prototype. This course does not replace teacher registration or other statutory qualifications.',
    modules: moduleSet([
      ['Design learning that works', ['Learning outcomes, curriculum alignment and assessment', 'Inclusive design and differentiated learning', 'Offline-first digital content and accessible formats'], 'Create a complete lesson resource pack for a defined learner group'],
      ['Build practical school workflows', ['Admissions, attendance, timetables and communication', 'Assessment records, reporting and data quality', 'Permissions, backups and child-data protection'], 'Prototype a school administration workflow using fictional learner records'],
      ['Measure learning and improve delivery', ['Formative assessment and useful feedback loops', 'Interpreting learning evidence without overclaiming', 'Teacher training, adoption and continuous improvement'], 'Present a school improvement pilot with teacher feedback and measurable indicators']
    ])
  },
  {
    id: 'avx-15',
    slug: 'clean-energy-water-climate-tech',
    title: 'Clean Energy, Water Systems and Climate Resilience',
    shortTitle: 'Energy, Water & Climate',
    category: 'Energy, Water & Climate',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Solar panels under a bright sky',
    badge: 'Resilient Communities',
    rating: 0, reviewCount: 0, enrolledStudents: 0,
    duration: 'Confirm with Academy',
    liveHours: 'Delivery format to be confirmed',
    nextBatch: 'Contact us for availability',
    originalPrice: 0, discountPrice: 0,
    overview: 'Learn to assess community-scale energy, water and climate challenges and plan maintainable, measurable interventions. Topics include solar project fundamentals, efficient energy use, water monitoring, early-warning information and climate adaptation. Technical installations must be designed or approved by appropriately qualified professionals.',
    targetAudience: ['Energy and water technicians', 'Community organisations and local projects', 'Environmental science students', 'Social enterprise founders'],
    careerRoles: ['Renewable Energy Project Assistant', 'Water Monitoring Technician', 'Climate Data Assistant', 'Sustainability Project Coordinator'],
    averageSalary: 'Not published; project and technical roles have varied requirements',
    skillsCovered: ['Energy needs assessment and basic load estimation', 'Solar PV system components and safety principles', 'Water-use monitoring and loss reporting', 'Climate-risk mapping and adaptation planning', 'Sensor data and maintenance logs', 'Project costing and impact measurement'],
    certificationAlignment: 'Site assessment and project proposal. It is not an electrical installation licence or engineering accreditation.',
    modules: moduleSet([
      ['Assess local needs and resources', ['Community energy and water-use baselines', 'Climate hazards, exposure and vulnerability', 'Data collection, consent and site observation'], 'Prepare a needs assessment for a school, clinic, farm or community facility'],
      ['Plan appropriate technical interventions', ['Solar PV components, load profiles and system sizing concepts', 'Water storage, conservation and monitoring options', 'Safety, maintenance schedules and lifecycle costs'], 'Compare two feasible intervention options with transparent assumptions and costs'],
      ['Build resilience and measure outcomes', ['Early-warning information and response communication', 'Monitoring indicators, maintenance and responsible procurement', 'Community participation and long-term operating models'], 'Deliver a climate-resilience project plan with risk register and maintenance model']
    ])
  },
  {
    id: 'avx-16',
    slug: 'fintech-financial-inclusion-enterprise',
    title: 'FinTech, Financial Inclusion and Digital Enterprise',
    shortTitle: 'FinTech & Enterprise',
    category: 'Finance & Enterprise',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Small business owner using a digital payment terminal',
    badge: 'Inclusive Digital Economy',
    rating: 0, reviewCount: 0, enrolledStudents: 0,
    duration: 'Confirm with Academy',
    liveHours: 'Delivery format to be confirmed',
    nextBatch: 'Contact us for availability',
    originalPrice: 0, discountPrice: 0,
    overview: 'Understand how digital payments, bookkeeping, responsible financial products and business software can improve access and accountability for households and small enterprises. Learn payment integration concepts and reconciliation without handling real customer funds during training.',
    targetAudience: ['Entrepreneurs and small-business operators', 'Developers building payment products', 'Finance and operations staff', 'FinTech and business students'],
    careerRoles: ['FinTech Support Analyst', 'Digital Payments Operations Assistant', 'Business Systems Developer', 'SME Digital Operations Officer'],
    averageSalary: 'Not published; no income or credit approval is guaranteed',
    skillsCovered: ['Business models and cash-flow planning', 'Digital payment lifecycle and reconciliation', 'Merchant onboarding and customer protection', 'Bookkeeping and inventory integration', 'Fraud awareness and transaction controls', 'API integration using sandbox environments'],
    certificationAlignment: 'Working sandbox demonstration and reconciliation exercise. No financial-services licence or investment advice qualification is awarded.',
    modules: moduleSet([
      ['Understand enterprise and inclusion needs', ['Customer discovery and inclusive service design', 'Revenue, costs, cash flow and unit economics', 'Digital finance ecosystem and payment rails'], 'Build a simple business model and cash-flow forecast for a local enterprise'],
      ['Design trustworthy payment workflows', ['Payment initiation, callbacks, settlement and refunds', 'Idempotency, reconciliation and audit records', 'Sandbox API integration and failure handling'], 'Build a sandbox-only payment checkout and transaction reconciliation demo'],
      ['Protect customers and grow responsibly', ['Fraud patterns, disputes and customer support', 'Data minimisation, access control and consent', 'Business reporting, controls and responsible growth'], 'Present a small-business digital operations system with risk controls and a monthly report']
    ])
  },
  {
    id: 'avx-17',
    slug: 'software-data-ai-for-social-impact',
    title: 'Software Engineering, Data Science and Applied AI',
    shortTitle: 'Software, Data & AI',
    category: 'Software, Data & AI',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Abstract artificial intelligence and data network visualization',
    badge: 'Build Useful Technology',
    rating: 0, reviewCount: 0, enrolledStudents: 0,
    duration: 'Confirm with Academy',
    liveHours: 'Delivery format to be confirmed',
    nextBatch: 'Contact us for availability',
    originalPrice: 0, discountPrice: 0,
    overview: 'Learn to identify a real user problem, build reliable software, work with data and apply AI only where it adds measurable value. Projects emphasise affordability, local language and context, maintainability, accessibility, privacy and low-resource deployment rather than technology demonstrations for their own sake.',
    targetAudience: ['Aspiring and practising developers', 'Data and computer science students', 'Technical founders and product teams', 'Professionals automating repetitive work'],
    careerRoles: ['Software Developer', 'Data Analyst', 'Applied AI Developer', 'Product Engineer'],
    averageSalary: 'Not published; employment outcomes depend on skill, portfolio and market demand',
    skillsCovered: ['Programming with Python and TypeScript', 'Web applications, APIs and databases', 'Data cleaning, analysis and visualisation', 'AI, machine learning and model evaluation basics', 'Local-language and low-bandwidth product design', 'Testing, deployment and software maintenance'],
    certificationAlignment: 'Code review, tested working product and project defence. Any certificate or accreditation must be confirmed before enrolment.',
    modules: moduleSet([
      ['Problem discovery and software foundations', ['User research, problem statements and requirements', 'Programming fundamentals, Git and collaborative development', 'Accessible interfaces and API fundamentals'], 'Build a small working application for a validated community or business need'],
      ['Data and applied intelligence', ['Data collection, cleaning, quality and visualisation', 'Machine learning concepts, evaluation and bias', 'LLMs, retrieval, local inference and human review'], 'Create a data-informed feature and document its limitations and evaluation'],
      ['Reliable delivery and responsible operations', ['Database security, testing and observability', 'Deployment, backups, cost and performance management', 'Privacy, licensing, documentation and maintenance'], 'Deploy and demonstrate a tested product with user documentation and an operations plan']
    ])
  },
  {
    id: 'avx-18',
    slug: 'connectivity-isp-network-engineering',
    title: 'Connectivity, ISP Operations and Network Engineering',
    shortTitle: 'Connectivity & Networks',
    category: 'Connectivity & Infrastructure',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Network infrastructure racks and fibre connectivity',
    badge: 'Connect Communities',
    rating: 0, reviewCount: 0, enrolledStudents: 0,
    duration: 'Confirm with Academy',
    liveHours: 'Delivery format to be confirmed',
    nextBatch: 'Contact us for availability',
    originalPrice: 0, discountPrice: 0,
    overview: 'Develop the skills to plan, operate and troubleshoot reliable connectivity for homes, schools, clinics, businesses and internet service providers. Focus on practical network design, affordability, service quality, resilient power and safe operations in both urban and rural settings.',
    targetAudience: ['ISP and WISP operators', 'Network technicians and NOC teams', 'School and enterprise IT staff', 'Telecommunications students'],
    careerRoles: ['Network Technician', 'NOC Support Engineer', 'ISP Operations Assistant', 'Network Administrator'],
    averageSalary: 'Not published; depends on experience, certification and local employer',
    skillsCovered: ['TCP/IP, IPv4/IPv6 and subnetting', 'Wi-Fi planning, VLANs and switching', 'MikroTik RouterOS and routing fundamentals', 'Fibre and wireless link planning concepts', 'RADIUS, subscriber lifecycle and service monitoring', 'Network security, backups and fault diagnosis'],
    certificationAlignment: 'Configured lab topology, troubleshooting evidence and network documentation. Vendor certifications are separate and not implied.',
    modules: moduleSet([
      ['Network fundamentals and planning', ['Addressing, subnetting, switching and VLANs', 'Wi-Fi coverage, interference and capacity basics', 'Fibre, point-to-point wireless and site survey principles'], 'Design a connectivity plan for a school or rural community facility'],
      ['Build and operate access networks', ['Router configuration, routing and firewall fundamentals', 'Subscriber authentication, RADIUS and service accounting', 'Bandwidth management, quality of service and monitoring'], 'Configure a lab ISP with subscriber authentication and service policies'],
      ['Reliability, affordability and support', ['Power resilience, backups and equipment lifecycle', 'Incident triage, escalation and service-level indicators', 'Customer support, acceptable use and network documentation'], 'Run a simulated outage exercise and submit a verified recovery report']
    ])
  },
  {
    id: 'avx-19',
    slug: 'cybersecurity-privacy-digital-trust',
    title: 'Cybersecurity, Privacy and Digital Trust',
    shortTitle: 'Cybersecurity',
    category: 'Cybersecurity & Digital Trust',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Digital security concept with protected online transactions',
    badge: 'Protect People & Systems',
    rating: 0, reviewCount: 0, enrolledStudents: 0,
    duration: 'Confirm with Academy',
    liveHours: 'Delivery format to be confirmed',
    nextBatch: 'Contact us for availability',
    originalPrice: 0, discountPrice: 0,
    overview: 'Build defensive security skills for the systems people depend on: schools, clinics, small businesses, public services and digital platforms. Learn practical risk reduction, secure configuration, incident response and privacy. All offensive-security exercises must remain inside authorised, isolated training labs.',
    targetAudience: ['IT support and system administrators', 'Software developers', 'Small-business owners and managers', 'Students beginning a security career'],
    careerRoles: ['Junior Security Analyst', 'IT Security Support', 'Application Security Assistant', 'Incident Response Trainee'],
    averageSalary: 'Not published; no job placement or certification is guaranteed',
    skillsCovered: ['Threat modelling and risk assessment', 'Account security, MFA and access control', 'Secure networks, devices and backups', 'OWASP secure development principles', 'Phishing awareness and incident response', 'Privacy, evidence handling and security policies'],
    certificationAlignment: 'Defensive lab assessment and incident-response portfolio. This course does not confer a professional security certification.',
    modules: moduleSet([
      ['Security fundamentals and risk', ['Threats, vulnerabilities, likelihood and impact', 'Asset inventory and practical threat modelling', 'Identity, MFA, permissions and secure configuration'], 'Complete a risk assessment for a small organisation and prioritise mitigations'],
      ['Protect applications, networks and data', ['Secure coding and common web application weaknesses', 'Network segmentation, endpoint protection and backups', 'Encryption, secrets handling and privacy principles'], 'Harden a deliberately vulnerable training application in an authorised lab'],
      ['Detect, respond and recover', ['Logging, alert triage and evidence preservation', 'Incident containment, communication and recovery', 'Security awareness and continuous improvement'], 'Conduct a tabletop incident exercise and write a recovery and lessons-learned report']
    ])
  },
  {
    id: 'avx-20',
    slug: 'manufacturing-logistics-digital-operations',
    title: 'Digital Manufacturing, Logistics and Supply Chain Operations',
    shortTitle: 'Industry & Logistics',
    category: 'Industry & Logistics',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Warehouse logistics and organised inventory operations',
    badge: 'Productivity & Local Industry',
    rating: 0, reviewCount: 0, enrolledStudents: 0,
    duration: 'Confirm with Academy',
    liveHours: 'Delivery format to be confirmed',
    nextBatch: 'Contact us for availability',
    originalPrice: 0, discountPrice: 0,
    overview: 'Use process improvement and digital tools to strengthen local production, inventory, transport, procurement and delivery. Learners examine real operational constraints such as unreliable data, manual records, delays, quality variation, equipment downtime and working-capital pressure.',
    targetAudience: ['SME owners and operations teams', 'Warehouse and transport staff', 'Manufacturing and engineering students', 'Procurement and supply-chain professionals'],
    careerRoles: ['Operations Analyst', 'Inventory Controller', 'Logistics Coordinator', 'Digital Transformation Assistant'],
    averageSalary: 'Not published; varies by sector, employer and experience',
    skillsCovered: ['Process mapping and bottleneck analysis', 'Inventory control and demand planning basics', 'Procurement and supplier records', 'Quality control and traceability', 'Transport planning and delivery tracking', 'Operational dashboards and continuous improvement'],
    certificationAlignment: 'Measured process-improvement project and operational dashboard demonstration. Industry-specific licences remain separate.',
    modules: moduleSet([
      ['Map operations and identify waste', ['Process mapping, workflow observation and root-cause analysis', 'Production planning, capacity and basic quality concepts', 'Safety, standard operating procedures and record keeping'], 'Map a real or simulated production or delivery process and identify improvement opportunities'],
      ['Control inventory and movement', ['Stock records, reorder points and cycle counts', 'Supplier evaluation, procurement and traceability', 'Dispatch, route planning and proof of delivery'], 'Build an inventory and order-tracking prototype using sample data'],
      ['Measure performance and improve', ['Operational KPIs, dashboards and data quality', 'Downtime, maintenance planning and service continuity', 'Cost-benefit analysis and change management'], 'Present a measurable 90-day improvement plan with baseline and target indicators']
    ])
  }
]
