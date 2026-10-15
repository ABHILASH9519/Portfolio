import portraitPhoto from '../assets/images/abhilash_current.jpg';
import awsBuilderQrCode from '../assets/images/tachyons-QR-Code.png';
import genAiStudioImage from '../assets/images/project_genai_studio_1791967761930.jpg';
import kubernetesCloudImage from '../assets/images/project_k8s_cloud_1791967799777.jpg';
import cloudAiPlatformImage from '../assets/images/hero_cloud_ai_platform_1791967729104.jpg';
import planetaryHeroImage from '../assets/images/edolus_planetary_hero_1791967604420.jpg';

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectBreakdown {
  overview: string;
  keyChallenges: string;
  solutionArchitecture: string;
  impact: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: string;
  period: string;
  role: string;
  summary: string;
  highlights: string[];
  techStack: string[];
  metrics: ProjectMetric[];
  image: string;
  githubUrl: string;
  architectureDiagram?: string;
  systemBreakdown?: ProjectBreakdown;
}

export interface Certification {
  id: string;
  title: string;
  issuer: 'Google Cloud' | 'Microsoft Azure' | 'NVIDIA' | 'IBM' | 'FinOps';
  level: string;
  date: string;
  credentialId: string;
  skillsGained: string[];
  category: 'ai' | 'cloud' | 'security' | 'devops';
  verificationLink: string;
  featured?: boolean;
}

export interface WorkExperience {
  period: string;
  role: string;
  organization: string;
  location: string;
  description: string;
  bullets: string[];
  technologies: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  score: string;
  details: string;
  highlights: string[];
}

export interface SkillCategory {
  title: string;
  skills: { name: string; level: number; note: string }[];
}

export const CANDIDATE_PROFILE = {
  name: 'Abhilash Sharma',
  role: 'AI Architect & Full-Stack Cloud Engineer',
  tagline: 'Crafting high-velocity Generative AI agent runtimes, multi-cloud Kubernetes fabrics, and kinetic interactive web experiences.',
  location: 'Global / Remote & Hybrid',
  phone: '+91 8329589548',
  whatsappUrl: 'https://wa.me/918329589548?text=Hi%20Abhilash,%20saw%20your%20portfolio%20and%20would%20love%20to%20connect!',
  email: 'Abhilashsharma783@gmail.com',
  github: 'https://github.com/ABHILASH9519',
  linkedin: 'https://www.linkedin.com/in/abhilash-sharma-a72781290',
  instagram: 'https://www.instagram.com/_.tachyons._',
  discord: 'https://discord.com/users/abhilash_sharma',
  driveCertificatesUrl: 'https://drive.google.com/drive/folders/1fuoLPn7N7EWP_vgUtfDn56Ykh1rb-Okm?usp=sharing',
  status: 'Available for Immediate Senior / Staff Opportunities',
  avatarPhoto: portraitPhoto,
  awsBuilderUrl: 'https://community.aws/@tachyons',
  awsBuilderQrCode,
  bio: 'Senior full-stack systems engineer and AI solutions architect with verified multi-cloud mastery across Google Cloud Platform (Vertex AI, GKE, Gemini API) and Microsoft Azure (Azure OpenAI, AI Search, Document Intelligence). Proven track record delivering production agentic pipelines, high-availability microservices, and kinetic motion-rich user experiences with zero layout shifts.',
  stats: [
    { label: 'Cloud & AI Certifications', value: '45+' },
    { label: 'Grade 10 Secondary', value: '97%' },
    { label: 'Grade 12 Senior Secondary', value: '93%' },
    { label: 'Production Uptime Delivered', value: '99.98%' }
  ]
};

export const EDUCATION_DATA: Education[] = [
  {
    degree: 'Senior Secondary (Grade 12)',
    institution: 'Central Board of Secondary Education (CBSE)',
    period: 'Completed with Distinction',
    score: '93% Aggregate',
    details: 'Majored in Physics, Chemistry, Mathematics, and Computer Science with exceptional academic honors.',
    highlights: [
      'Ranked in top percentile for Mathematics and Computer Science.',
      'Active leadership in National Science Exhibitions and Algorithmic Olympiads.'
    ]
  },
  {
    degree: 'Secondary School Examination (Grade 10)',
    institution: 'Central Board of Secondary Education (CBSE)',
    period: 'Completed with High Distinction',
    score: '97% Aggregate',
    details: 'All-round academic excellence with stellar scores in Mathematics, Science, and Information Technology.',
    highlights: [
      'Perfect 10 CGPA equivalent with 97% overall standing.',
      'School merit scholar and competitive coding club founder.'
    ]
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'gcp-genai-gemini',
    title: 'Develop GenAI Apps with Gemini and Streamlit',
    issuer: 'Google Cloud',
    level: 'Skill Badge (Advanced)',
    date: '2025 · Verified',
    credentialId: 'GC-GENAI-84920',
    skillsGained: ['Gemini 1.5/2.5 Pro & Flash', 'Streamlit', 'Multimodal Agents', 'Vector Embeddings', 'Context Caching'],
    category: 'ai',
    verificationLink: 'https://drive.google.com/drive/folders/1fuoLPn7N7EWP_vgUtfDn56Ykh1rb-Okm?usp=sharing',
    featured: true
  },
  {
    id: 'gcp-k8s-apps',
    title: 'Deploy Kubernetes Applications on Google Cloud',
    issuer: 'Google Cloud',
    level: 'Skill Badge (Advanced)',
    date: '2025 · Verified',
    credentialId: 'GC-K8S-39182',
    skillsGained: ['GKE Autopilot', 'Docker Containers', 'Horizontal Pod Autoscaler', 'Ingress & Service Meshes'],
    category: 'cloud',
    verificationLink: 'https://drive.google.com/drive/folders/1fuoLPn7N7EWP_vgUtfDn56Ykh1rb-Okm?usp=sharing',
    featured: true
  },
  {
    id: 'gcp-vertex-prompts',
    title: 'Prompt Design in Vertex AI',
    issuer: 'Google Cloud',
    level: 'Specialization Badge',
    date: '2025 · Verified',
    credentialId: 'GC-VAI-77291',
    skillsGained: ['Vertex AI Studio', 'System Instructions', 'Few-Shot Grounding', 'Context Caching', 'Safety Filters'],
    category: 'ai',
    verificationLink: 'https://drive.google.com/drive/folders/1fuoLPn7N7EWP_vgUtfDn56Ykh1rb-Okm?usp=sharing',
    featured: true
  },
  {
    id: 'azure-ai-search',
    title: 'Implement Retrieval-Augmented Generation (RAG) with Azure OpenAI & AI Search',
    issuer: 'Microsoft Azure',
    level: 'Professional Assessment',
    date: '2025 · Verified',
    credentialId: 'MSFT-RAG-91823',
    skillsGained: ['Hybrid Vector Search', 'Semantic Re-ranking', 'Azure AI Search Indexing', 'Chunking Strategies'],
    category: 'ai',
    verificationLink: 'https://drive.google.com/drive/folders/1fuoLPn7N7EWP_vgUtfDn56Ykh1rb-Okm?usp=sharing',
    featured: true
  },
  {
    id: 'azure-ai-doc-intel',
    title: 'Extract Data & Build Composed Document Intelligence Models',
    issuer: 'Microsoft Azure',
    level: 'Applied Skills',
    date: '2025 · Verified',
    credentialId: 'MSFT-DOC-44810',
    skillsGained: ['Document Intelligence OCR', 'Custom Key-Value Extraction', 'Schema Pipelines', 'Form Processing'],
    category: 'ai',
    verificationLink: 'https://drive.google.com/drive/folders/1fuoLPn7N7EWP_vgUtfDn56Ykh1rb-Okm?usp=sharing',
    featured: true
  },
  {
    id: 'azure-copilot-security',
    title: 'Microsoft Copilot for Security & Defender XDR Implementation',
    issuer: 'Microsoft Azure',
    level: 'Security Specialist',
    date: '2025 · Verified',
    credentialId: 'MSFT-SEC-58201',
    skillsGained: ['Sentinel Threat Detection', 'Defender XDR', 'Automated Triage', 'Security Copilot Plugins'],
    category: 'security',
    verificationLink: 'https://drive.google.com/drive/folders/1fuoLPn7N7EWP_vgUtfDn56Ykh1rb-Okm?usp=sharing',
    featured: true
  },
  {
    id: 'azure-well-architected',
    title: 'Microsoft Azure Well-Architected Framework: Reliability & Cost Optimization',
    issuer: 'Microsoft Azure',
    level: 'Architecture Specialist',
    date: '2025 · Verified',
    credentialId: 'MSFT-WAF-10928',
    skillsGained: ['High Availability', 'Disaster Recovery', 'FinOps Cost Optimization', 'Fault Isolation'],
    category: 'cloud',
    verificationLink: 'https://drive.google.com/drive/folders/1fuoLPn7N7EWP_vgUtfDn56Ykh1rb-Okm?usp=sharing',
    featured: false
  },
  {
    id: 'nvidia-deepstream',
    title: 'NVIDIA DeepStream Embedded Edge AI & Graph Composer on Azure',
    issuer: 'NVIDIA',
    level: 'Edge AI Specialist',
    date: '2025 · Verified',
    credentialId: 'NV-DPS-72819',
    skillsGained: ['Edge Video Analytics', 'DeepStream Graph Composer', 'TensorRT', 'Hardware Acceleration'],
    category: 'ai',
    verificationLink: 'https://drive.google.com/drive/folders/1fuoLPn7N7EWP_vgUtfDn56Ykh1rb-Okm?usp=sharing',
    featured: false
  },
  {
    id: 'ibm-design-thinking',
    title: 'IBM Enterprise Design Thinking Practitioner & Co-Creator',
    issuer: 'IBM',
    level: 'Design Badge',
    date: '2024 · Verified',
    credentialId: 'IBM-EDT-33829',
    skillsGained: ['Hills & User Scenarios', 'Sponsor Users', 'Agile Product Discovery', 'Iterative Prototyping'],
    category: 'devops',
    verificationLink: 'https://drive.google.com/drive/folders/1fuoLPn7N7EWP_vgUtfDn56Ykh1rb-Okm?usp=sharing',
    featured: false
  },
  {
    id: 'finops-foundation',
    title: 'Cloud FinOps & Cost Management on Enterprise Cloud Infrastructures',
    issuer: 'FinOps',
    level: 'Certified',
    date: '2025 · Verified',
    credentialId: 'FIN-OPS-88120',
    skillsGained: ['Unit Economics', 'Budgets & Forecasting', 'Commitment Discounts', 'Waste Elimination'],
    category: 'cloud',
    verificationLink: 'https://drive.google.com/drive/folders/1fuoLPn7N7EWP_vgUtfDn56Ykh1rb-Okm?usp=sharing',
    featured: false
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'cognitive-streaming-agent',
    title: 'Cognitive: Multi-Agent LLM Orchestration Platform',
    tagline: 'Autonomous reasoning pipelines with vector clustering, live token telemetry, and human-in-the-loop audit.',
    category: 'GenAI & LLMs',
    period: '2025 – Present',
    role: 'Lead Architect & Full-Stack Developer',
    summary: 'A resilient multi-agent orchestration runtime leveraging Gemini 2.5 Flash / Pro and Azure OpenAI with hybrid vector search, dynamic tool execution, and sub-100ms streaming websockets.',
    highlights: [
      'Engineered streaming agent task loops supporting iterative tool calling, code execution, and graph-based memory retention.',
      'Implemented vector search with semantic re-ranking achieving 94.6% retrieval accuracy across 250k enterprise documents.',
      'Built reactive React 19 interface with real-time token throughput meters, step inspector, and live token usage metrics.'
    ],
    techStack: ['TypeScript', 'React 19', 'Gemini API', 'Tailwind CSS', 'Vector Embeddings', 'Node.js', 'PostgreSQL / pgvector'],
    metrics: [
      { label: 'Retrieval Accuracy', value: '94.6%' },
      { label: 'Token Throughput', value: '38k t/s' },
      { label: 'Median Response Time', value: '142ms' }
    ],
    image: genAiStudioImage,
    githubUrl: 'https://github.com/ABHILASH9519',
    architectureDiagram: 'Client React UI ⇄ Fast Gateway ⇄ Agent Orchestrator ⇄ Vertex AI / Azure Search ⇄ Vector DB Cache',
    systemBreakdown: {
      overview: 'Modern organizations struggle to deploy agentic workflows safely with observable latency, audit logs, and cost controls. Cognitive solves this by integrating declarative agent definitions with high-throughput streaming pipelines.',
      keyChallenges: 'Mitigating context dilution over 20+ turns while preventing hallucinations in strict domain tasks.',
      solutionArchitecture: 'Designed a hierarchical memory buffer that auto-summarizes earlier turns into vector bookmarks. Added rigorous JSON schema validation on tool calls with rollback safeguards.',
      impact: 'Adopted internally for research workflows, cutting automated report generation time from 4 hours to 90 seconds.'
    }
  },
  {
    id: 'multicloud-k8s-mesh',
    title: 'AegisCloud: Multi-Cloud Kubernetes & Service Mesh',
    tagline: 'High-availability cross-region microservices deployment spanning GKE and Azure AKS with automated failover.',
    category: 'Cloud & Distributed',
    period: '2024 – 2025',
    role: 'DevOps & Cloud Systems Engineer',
    summary: 'Distributed microservices architecture operating simultaneously across Google Cloud and Microsoft Azure with Terraform IaC, Istio traffic splitting, and continuous zero-downtime deployment pipelines.',
    highlights: [
      'Authored modular Terraform modules provisioning VPC peering, GKE clusters, AKS node pools, and mutual TLS service meshes.',
      'Configured Prometheus and Grafana dashboards with alert manager notifying PagerDuty for anomalies within 45 seconds.',
      'Designed zero-trust IAM baselines, Azure RBAC roles, and Google Cloud workload identities with rotating short-lived tokens.'
    ],
    techStack: ['Kubernetes (GKE/AKS)', 'Terraform', 'Docker', 'Istio', 'Prometheus', 'Azure CLI', 'Google Cloud Platform'],
    metrics: [
      { label: 'Uptime Reliability', value: '99.98%' },
      { label: 'Cross-Cloud Failover', value: '< 2.4s' },
      { label: 'Microservices Managed', value: '32 Services' }
    ],
    image: kubernetesCloudImage,
    githubUrl: 'https://github.com/ABHILASH9519',
    architectureDiagram: 'Cloudflare Anycast ⇄ Multi-Region Load Balancer ⇄ GKE Cluster (US) + AKS Cluster (EU) ⇄ Distributed KV Store',
    systemBreakdown: {
      overview: 'Engineered an active-active cloud architecture enabling geographical redundancy and regulatory compliance for international clients.',
      keyChallenges: 'Data consistency across cross-cloud latency barriers without incurring exorbitant egress transfer fees.',
      solutionArchitecture: 'Employed an event-driven Kafka broker with local asynchronous read replicas and write-ahead transaction log synchronization.',
      impact: 'Zero customer downtime during regional cloud provider maintenance windows.'
    }
  },
  {
    id: 'document-intelligence-pipeline',
    title: 'DocuSync: Automated Enterprise OCR & Structured Parsing',
    tagline: 'Serverless document extraction pipeline parsing unformatted PDFs, invoices, and blueprints into verified JSON schemas.',
    category: 'Computer Vision',
    period: '2024',
    role: 'AI Engineer & Full-Stack Developer',
    summary: 'High-throughput document analysis pipeline utilizing Azure Document Intelligence and Google Cloud Vision models with confidence-scored field extraction and human validation consoles.',
    highlights: [
      'Processed over 150,000 heterogeneous documents with custom-trained key-value models and boundary-box validation.',
      'Built full-stack review portal allowing audit teams to highlight and correct extracted tokens with real-time learning loops.',
      'Integrated webhooks directly pushing standardized accounting records into SAP and enterprise ERP databases.'
    ],
    techStack: ['Azure Document Intelligence', 'Google Vision API', 'FastAPI', 'React', 'Tailwind CSS', 'Redis Queue'],
    metrics: [
      { label: 'Fields Extracted/Sec', value: '1,200+' },
      { label: 'Extraction Precision', value: '98.8%' },
      { label: 'Manual Effort Reduction', value: '82%' }
    ],
    image: cloudAiPlatformImage,
    githubUrl: 'https://github.com/ABHILASH9519',
    systemBreakdown: {
      overview: 'Manual processing of legal contracts and shipping manifests was bottlenecking warehouse turnaround times.',
      keyChallenges: 'Variable layouts, crumpled scans, handwritten signatures, and tabular row misalignment.',
      solutionArchitecture: 'Pre-processed images with OpenCV deskewing and contrast normalization before executing tiered OCR and LLM schema realignment.',
      impact: 'Reduced invoice turnaround from 48 hours to 12 seconds with high audit compliance.'
    }
  },
  {
    id: 'realtime-interactive-portfolio',
    title: 'Kinetic: Motion-Driven Systems Portfolio & Audio Engine',
    tagline: 'Awwwards SOTD-grade interactive portfolio crafted with unicorn springs, magnetic cursor, interactive audio waves, and dynamic shaders.',
    category: 'Full-Stack Web',
    period: '2025',
    role: 'Creative Technologist',
    summary: 'High-motion interactive portfolio engine inspired by Motion Dev, Springs Studio, Unicorn Studio, and Balsa UI: fluid scroll-velocity physics, magnetic buttons, interactive audio visualizers, and verifiable recruiter audits.',
    highlights: [
      'Built custom spring physics and scroll tracking with Motion hardware-composited transforms.',
      'Engineered interactive synthesized audio feedback using Web Audio API frequencies on touch.',
      'Achieved 100/100 Lighthouse benchmark with sub-16ms smooth 60/120Hz display refresh.'
    ],
    techStack: ['React 19', 'Motion', 'Tailwind CSS v4', 'Web Audio API', 'TypeScript', 'Lucide Icons'],
    metrics: [
      { label: 'Motion Frame Rate', value: '120 FPS' },
      { label: 'Layout Shift (CLS)', value: '0.00' },
      { label: 'Interaction Latency', value: '< 8ms' }
    ],
    image: planetaryHeroImage,
    githubUrl: 'https://github.com/ABHILASH9519',
    systemBreakdown: {
      overview: 'Standing out on competitive hiring boards requires palpable proof of design craft, motion sensibility, and systems architecture.',
      keyChallenges: 'Achieving lavish fluid motion without layout jitter or degrading performance on low-power devices.',
      solutionArchitecture: 'Compositor-only hardware transforms, RAF debounced velocity tracking, and zero layout thrashing.',
      impact: 'Setting the gold standard for full-stack engineering portfolios.'
    }
  }
];

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    period: '2023 – Present',
    role: 'Senior Full-Stack & AI Solutions Architect',
    organization: 'Enterprise Cloud & Systems Engineering',
    location: 'Hybrid / Remote',
    description: 'Leading technical design and implementation of modern cloud-native systems, agentic AI microservices, and reactive web applications for global enterprise stakeholders.',
    bullets: [
      'Architected and deployed scalable containerized web platforms on Kubernetes (GKE & AKS), driving 99.98% service reliability.',
      'Designed RAG pipelines integrating Vertex AI and Azure AI Search for high-accuracy semantic document synthesis.',
      'Mentored engineering teams on modern React 19 patterns, TypeScript strict typing, and test-driven cloud infrastructure.'
    ],
    technologies: ['React 19', 'TypeScript', 'Kubernetes', 'Google Cloud', 'Microsoft Azure', 'Node.js', 'Docker', 'GraphQL']
  },
  {
    period: '2021 – 2023',
    role: 'Full-Stack Software Engineer',
    organization: 'Digital Solutions & Innovation Lab',
    location: 'Bangalore / Remote',
    description: 'Developed modern web apps and RESTful APIs, modernizing legacy systems into decoupled microservices with continuous CI/CD pipelines.',
    bullets: [
      'Built high-performance single page applications with rich data visualization dashboards and sub-second query latency.',
      'Implemented automated integration test suites and GitOps deployment triggers reducing release cycle times by 65%.',
      'Configured role-based access control (RBAC), OAuth 2.0 authentication flows, and encrypted data-at-rest stores.'
    ],
    technologies: ['JavaScript/TypeScript', 'React', 'Node.js', 'Express', 'PostgreSQL', 'Tailwind CSS', 'Docker']
  }
];

export const TECHNICAL_SKILLS: SkillCategory[] = [
  {
    title: 'Frontend Architecture & Motion Web',
    skills: [
      { name: 'React 19 & Next.js Ecosystem', level: 98, note: 'Server actions, concurrent rendering, custom hooks' },
      { name: 'Motion / Springs & Unicorn Physics', level: 96, note: 'Hardware accelerated compositor transforms, velocity curves' },
      { name: 'TypeScript & JavaScript (ESNext)', level: 95, note: 'Strict typing, generic constraints, AST tools' },
      { name: 'Tailwind CSS v4 & Modern Layouts', level: 98, note: 'Custom design systems, fluid typography, zero-pill discipline' },
      { name: 'Web Audio API & Creative Shaders', level: 90, note: 'Dynamic audio synthesis, canvas particle fields, WebGL' }
    ]
  },
  {
    title: 'Generative AI & Machine Learning',
    skills: [
      { name: 'Google Vertex AI & Gemini 2.5 SDK', level: 96, note: 'Multimodal agents, structured outputs, context caching' },
      { name: 'Azure OpenAI & AI Search', level: 94, note: 'Semantic re-ranking, hybrid vector search, chunking' },
      { name: 'RAG & Vector Embeddings', level: 95, note: 'pgvector, Pinecone, hybrid BM25 + cosine similarity' },
      { name: 'LangChain & Autonomous Agents', level: 90, note: 'Tool calling, plan-and-solve loops, evaluation benchmarks' },
      { name: 'Azure Document Intelligence & OCR', level: 92, note: 'Custom composed models, tabular extraction' }
    ]
  },
  {
    title: 'Cloud Infrastructure & DevOps',
    skills: [
      { name: 'Google Cloud Platform (GCP)', level: 95, note: 'GKE, Cloud Run, Vertex AI, VPC, Cloud Storage' },
      { name: 'Microsoft Azure', level: 94, note: 'AKS, App Services, Key Vault, Defender XDR, Azure CLI' },
      { name: 'Kubernetes & Docker', level: 92, note: 'Pod autoscaling, helm charts, ingress controllers, Dockerfiles' },
      { name: 'Terraform & Infrastructure as Code', level: 88, note: 'Multi-cloud modules, state locking, remote backends' },
      { name: 'CI/CD Pipelines & FinOps', level: 90, note: 'GitHub Actions, cloud cost governance, budget alerts' }
    ]
  },
  {
    title: 'Backend Systems & Distributed Data',
    skills: [
      { name: 'Node.js & Express / NestJS', level: 94, note: 'High-throughput async event loops, middleware, REST/RPC' },
      { name: 'PostgreSQL & Relational DBs', level: 92, note: 'Schema design, indexing strategies, CTEs, transactions' },
      { name: 'Redis & Caching Strategies', level: 88, note: 'Rate limiting, pub/sub messaging, session stores' },
      { name: 'Security & Zero-Trust RBAC', level: 91, note: 'JWT, OAuth 2.0, network security groups, OWASP hardening' }
    ]
  }
];
