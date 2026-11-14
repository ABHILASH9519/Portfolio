import portraitPhoto from '../assets/images/file_00000000a8388208afeea3a8dc5f9e66.jpg';
import awsBuilderQrCode from '../assets/images/tachyons-QR-Code.png';

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
  liveUrl?: string;
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
    id: "cloudsentinels",
    title: "CloudSentinels",
    tagline: "Incident-management and observability console for cloud workloads and Kubernetes clusters.",
    category: "AI & Agentic",
    period: 'Public repo',
    role: "Full-Stack Developer",
    summary: "React/TypeScript frontend with a Motoko backend on the Internet Computer: Internet Identity sign-in, incident lifecycle, alert and metric records, and AI insight fields. Ships a Prometheus Operator ruleset for Kubernetes monitoring.",
    highlights: ["Incident creation, status updates, comments and admin-only deletion with role/permission checks in backend methods.", "Dashboard summaries over alert and metric records with periodic frontend refresh.", "Prometheus rules for pod crash loops, unavailable replicas and high CPU/memory against requests."],
    techStack: ["React", "TypeScript", "Motoko", "Internet Computer", "Prometheus", "Kubernetes"],
    metrics: [{ label: "Frontend", value: "React + TS" }, { label: "Backend", value: "Motoko" }, { label: "Monitoring", value: "Prometheus rules" }],
    image: `${import.meta.env.BASE_URL}projects/cloudsentinels.svg`,
    githubUrl: "https://github.com/ABHILASH9519/cloudsentinels",
    architectureDiagram: "Browser (React) ⇄ Internet Identity ⇄ Motoko canister ⇄ in-memory records · Prometheus rules → Alertmanager (adapter not yet built)",
    systemBreakdown: { overview: "An incident console for teams operating cloud workloads and Kubernetes clusters.", keyChallenges: "The README is explicit that records live in canister memory, and that Prometheus alerts are not yet ingested into the UI.", solutionArchitecture: "Caller-scoped profiles, role checks in backend methods, and a starter Prometheus Operator ruleset documented under deploy/kubernetes.", impact: "Working incident workflow and monitoring starter; production persistence and alert ingestion are documented as future work." }
  },
  {
    id: "echo-assist",
    title: "Echo Assist",
    tagline: "Productivity command center with a task dashboard, REST API and MCP task tools.",
    category: "AI & Agentic",
    period: 'Public repo',
    role: "Developer",
    summary: "Node.js app with natural-language task commands, a daily agenda endpoint, an MCP Streamable HTTP endpoint exposing add/list/complete task tools, optional PostgreSQL persistence and optional Amazon Bedrock responses.",
    highlights: ["Create, search, complete and delete tasks with priority and due dates.", "POST /mcp endpoint exposing add_task, list_tasks and complete_task tools.", "PostgreSQL when DATABASE_URL is set; JSON-file fallback for local prototyping."],
    techStack: ["Node.js", "MCP", "PostgreSQL", "Amazon Bedrock", "REST API"],
    metrics: [{ label: "Runtime", value: "Node.js 22+" }, { label: "Protocol", value: "MCP over HTTP" }, { label: "Storage", value: "PostgreSQL / JSON" }],
    image: `${import.meta.env.BASE_URL}projects/echo-assist.svg`,
    githubUrl: "https://github.com/ABHILASH9519/echo-assist",
    architectureDiagram: "Dashboard UI ⇄ REST API + /mcp ⇄ PostgreSQL (or JSON file) · optional Amazon Bedrock Converse API",
    systemBreakdown: { overview: "A small assistant that manages tasks through a UI, a REST API and MCP tools.", keyChallenges: "Keeping one task model consistent across the dashboard, natural-language commands and MCP tools.", solutionArchitecture: "Single Node server exposing REST and MCP endpoints over a shared task store with Postgres or file fallback.", impact: "A working MCP-enabled task assistant; Bedrock responses are optional and need AWS configuration." }
  },
  {
    id: "nexus-research-engine",
    title: "Nexus Research Engine",
    tagline: "Research workspace with projects, document search, AI chat and agent runs.",
    category: "AI & Agentic",
    period: 'Public repo',
    role: "Full-Stack Developer",
    summary: "React/TypeScript frontend and Motoko backend with project management, document upload and search, chat history, agent runs with metrics, and dashboard, analytics and admin pages.",
    highlights: ["Backend API for projects, documents, search, chat and agent runs.", "Agent run tracking and agent metrics endpoints.", "Landing, dashboard, workspace, analytics, auth and admin-settings pages."],
    techStack: ["React", "TypeScript", "Motoko", "Internet Computer", "pnpm"],
    metrics: [{ label: "Frontend", value: "React + TS" }, { label: "Backend", value: "Motoko" }, { label: "Pages", value: "6 views" }],
    image: `${import.meta.env.BASE_URL}projects/nexus-research-engine.svg`,
    githubUrl: "https://github.com/ABHILASH9519/Nexus-research-engine",
    architectureDiagram: "React UI ⇄ generated bindings ⇄ Motoko canister (projects · documents · chat · agent runs)",
    systemBreakdown: { overview: "A workspace for organising research projects, documents and AI-assisted analysis.", keyChallenges: "Connecting a typed frontend to canister methods through generated bindings.", solutionArchitecture: "Typed Motoko mixins per domain (projects, documents, chat, agents, analytics) behind one actor.", impact: "Source-available prototype of a research workspace; no deployment claims." }
  },
  {
    id: "lunarreg-workbench",
    title: "LunarRegWorkbench",
    tagline: "Automated lunar image registration and correspondence analysis.",
    category: "AI & Agentic",
    period: 'Public repo',
    role: "Developer",
    summary: "Computer-vision workbench for aligning lunar images from different missions and sensors (e.g. Chandrayaan-2, LRO, SELENE): feature detection, matching, geometric verification, transformation estimation and visual evaluation.",
    highlights: ["SIFT, ORB and AKAZE feature extraction with ratio-test and cross-check matching.", "RANSAC outlier rejection with similarity, affine or homography models.", "Original, reference, registered, overlay, difference and checkerboard views."],
    techStack: ["Computer Vision", "SIFT / ORB / AKAZE", "RANSAC", "React", "TypeScript", "Motoko"],
    metrics: [{ label: "Detectors", value: "SIFT · ORB · AKAZE" }, { label: "Models", value: "Similarity · Affine · Homography" }, { label: "Views", value: "6 comparisons" }],
    image: `${import.meta.env.BASE_URL}projects/lunarreg-workbench.svg`,
    githubUrl: "https://github.com/ABHILASH9519/lunarreg-workbench",
    architectureDiagram: "Source + reference image → preprocessing → features → matching → RANSAC → transform → registered output + evaluation views",
    systemBreakdown: { overview: "Images of the same lunar region differ by sensor, scale and illumination, making alignment hard.", keyChallenges: "Cross-sensor differences in illumination, viewing angle and resolution.", solutionArchitecture: "Multi-scale preprocessing, multiple detectors, grid-based match selection and geometric verification.", impact: "A registration and evaluation workflow; see the repo README for what is implemented." }
  },
  {
    id: "full-cicd-jenkins-docker-k8s",
    title: "Full CI/CD with Jenkins, Docker & Kubernetes",
    tagline: "Security-first delivery pipeline for a containerised Python service.",
    category: "Cloud & DevOps",
    period: 'Public repo',
    role: "DevOps Engineer",
    summary: "Jenkins declarative pipeline plus GitHub Actions validating, testing and building a Flask/Gunicorn API, with Ruff, Bandit, pip-audit, a hardened non-root Docker image and Kubernetes manifests.",
    highlights: ["Ruff linting, Bandit static security checks, pip-audit dependency checks and pytest with JUnit reports.", "Non-root, slim, health-checked container image.", "Kubernetes manifests with two replicas, probes, resource limits, rolling updates and a PodDisruptionBudget."],
    techStack: ["Jenkins", "GitHub Actions", "Docker", "Kubernetes", "Python", "Flask", "pytest"],
    metrics: [{ label: "CI", value: "Jenkins + Actions" }, { label: "Security", value: "Bandit · pip-audit" }, { label: "Replicas", value: "2 + PDB" }],
    image: `${import.meta.env.BASE_URL}projects/full-cicd-jenkins-docker-k8s.svg`,
    githubUrl: "https://github.com/ABHILASH9519/Full-CI-CD-Pipeline-with-Jenkins-Docker-and-Kubernetes",
    architectureDiagram: "Commit → lint → test → security scan → Docker build → Kubernetes manifests (probes · limits · rolling update)",
    systemBreakdown: { overview: "A production-minded workflow for validating and packaging a containerised API before release.", keyChallenges: "Putting security and quality gates in the pipeline without slowing delivery.", solutionArchitecture: "Declarative Jenkins pipeline mirrored by GitHub Actions, with a hardened container and resilient Kubernetes manifests.", impact: "A complete reference pipeline with documented checks." }
  },
  {
    id: "terraform-aws-iac",
    title: "Terraform AWS Infrastructure",
    tagline: "Reusable, environment-aware IaC with security-conscious defaults.",
    category: "Cloud & DevOps",
    period: 'Public repo',
    role: "Cloud Engineer",
    summary: "Terraform modules for a VPC (public/private subnets, routes, IGW) and an optional EC2 instance (no public IP, IMDSv2 required, encrypted root EBS) with separate dev and prod roots.",
    highlights: ["Input validation for CIDRs, subnet/AZ lists and AMI.", "GitHub Actions format and validate for both environments.", "Checkov scan fails CI on policy findings."],
    techStack: ["Terraform", "AWS", "GitHub Actions", "Checkov"],
    metrics: [{ label: "Environments", value: "dev + prod" }, { label: "EC2 defaults", value: "IMDSv2 · encrypted EBS" }, { label: "CI", value: "fmt · validate · Checkov" }],
    image: `${import.meta.env.BASE_URL}projects/terraform-aws-iac.svg`,
    githubUrl: "https://github.com/ABHILASH9519/Infrastructure-as-Code-with-Terraform-and-AWS",
    architectureDiagram: "dev / prod root modules → VPC module (+ optional EC2 module) → AWS, gated by fmt, validate and Checkov in CI",
    systemBreakdown: { overview: "Reusable AWS infrastructure meant to be reviewed and validated before any human-approved deployment.", keyChallenges: "Safe defaults without blocking reuse across environments.", solutionArchitecture: "Small composable modules with validated inputs and policy scanning in CI.", impact: "Reviewable IaC; no deployment is performed by the repo itself." }
  },
  {
    id: "ansible-server-automation",
    title: "Ansible Server Automation",
    tagline: "Repeatable Linux baseline configuration and managed Nginx with Ansible roles.",
    category: "Cloud & DevOps",
    period: 'Public repo',
    role: "DevOps Engineer",
    summary: "Role-based Ansible project: base packages, optional operations user and Nginx site configuration, inventory-driven targeting, templates, handlers and a /healthz endpoint.",
    highlights: ["Reusable roles with shared defaults and inventory-driven targets.", "Pytest regression tests and Ansible syntax validation in GitHub Actions.", "Documented check-mode, rollout and rollback practices."],
    techStack: ["Ansible", "Nginx", "Linux", "pytest", "GitHub Actions"],
    metrics: [{ label: "Roles", value: "base · ops user · nginx" }, { label: "Health", value: "/healthz :8080" }, { label: "CI", value: "tests + syntax check" }],
    image: `${import.meta.env.BASE_URL}projects/ansible-server-automation.svg`,
    githubUrl: "https://github.com/ABHILASH9519/Ansible-server-Automation",
    architectureDiagram: "Inventory → playbook → roles (base · user · nginx) → managed templates + handlers → /healthz",
    systemBreakdown: { overview: "Configuring servers by hand is slow and drifts over time.", keyChallenges: "Making runs safe to repeat and easy to review.", solutionArchitecture: "Roles, templates and handlers with check-mode first-run guidance.", impact: "A tested baseline and Nginx landing page automation." }
  },
  {
    id: "code-to-cluster",
    title: "Code to Cluster: EKS with Jenkins & Terraform",
    tagline: "Guided lab: EKS cluster and app deployment with CI/CD via Jenkins and Terraform.",
    category: "Cloud & DevOps",
    period: 'Public repo',
    role: "Guided DevOps lab",
    summary: "Hands-on lab covering a Terraform-provisioned Jenkins server, a private-subnet EKS cluster, Kubernetes manifests for an Nginx app and a Jenkins pipeline.",
    highlights: ["Jenkins server on EC2 with Java, AWS CLI, Terraform, Docker, Sonar, Helm, Trivy and kubectl.", "EKS cluster in a private subnet via Terraform.", "Jenkinsfile and manifests for an Nginx deployment."],
    techStack: ["Terraform", "AWS EKS", "Jenkins", "Kubernetes", "Helm", "Trivy"],
    metrics: [{ label: "Type", value: "Guided lab" }, { label: "Cluster", value: "AWS EKS" }, { label: "IaC", value: "Terraform" }],
    image: `${import.meta.env.BASE_URL}projects/code-to-cluster.svg`,
    githubUrl: "https://github.com/ABHILASH9519/Code-To-Cluster",
    architectureDiagram: "Terraform → Jenkins EC2 + EKS (private subnet) → Jenkins pipeline → Kubernetes Nginx deployment",
    systemBreakdown: { overview: "An end-to-end walkthrough from infrastructure to a deployed containerised app.", keyChallenges: "Wiring cluster creation, tooling and pipeline together.", solutionArchitecture: "Terraform for infra, Jenkins for delivery, manifests for the app.", impact: "Learning project following a public step-by-step guide." }
  },
  {
    id: "ci-cd-automator",
    title: "CI/CD Automator",
    tagline: "Guided lab: multi-tool CI/CD with Terraform, Ansible, Jenkins, Maven and SonarQube.",
    category: "Cloud & DevOps",
    period: 'Public repo',
    role: "Guided DevOps lab",
    summary: "Implementation of a public DevOps project: Terraform-provisioned infrastructure, Ansible-configured Jenkins master/agents, multibranch pipeline with webhooks, SonarQube analysis and Kubernetes deployment files.",
    highlights: ["Jenkins master and Maven build agent configured with Ansible.", "Multibranch pipeline triggered by GitHub webhooks.", "Dockerfile, Jenkinsfile and Kubernetes manifests included."],
    techStack: ["Jenkins", "Terraform", "Ansible", "Maven", "SonarQube", "Kubernetes"],
    metrics: [{ label: "Type", value: "Guided lab" }, { label: "Build", value: "Maven" }, { label: "Quality", value: "SonarQube" }],
    image: `${import.meta.env.BASE_URL}projects/ci-cd-automator.svg`,
    githubUrl: "https://github.com/ABHILASH9519/CI-CD-Automator",
    architectureDiagram: "Terraform → Jenkins master + agent (Ansible) → Maven build → SonarQube → Docker → Kubernetes",
    systemBreakdown: { overview: "A full pipeline built by following an established DevOps reference project.", keyChallenges: "Coordinating many tools into one flow.", solutionArchitecture: "Infra as code, configuration management and a multibranch pipeline.", impact: "Learning project based on a public guide." }
  },
  {
    id: "jenkins-argocd-helm",
    title: "Jenkins + Argo CD + Helm Java Pipeline",
    tagline: "Guided lab: GitOps pipeline for a Spring Boot app with SonarQube, Helm and Argo CD.",
    category: "Cloud & DevOps",
    period: 'Public repo',
    role: "Guided DevOps lab",
    summary: "Pipeline for a Java application using Maven, SonarQube, Helm and Argo CD with Kubernetes manifests; the repo contains a Spring Boot app and its manifests.",
    highlights: ["Maven build, unit tests and SonarQube analysis stages.", "Helm-based deployment promoted through Argo CD.", "Spring Boot app plus Kubernetes manifests in the repo."],
    techStack: ["Jenkins", "Maven", "SonarQube", "Helm", "Argo CD", "Spring Boot"],
    metrics: [{ label: "Type", value: "Guided lab" }, { label: "Deploy", value: "Helm + Argo CD" }, { label: "App", value: "Spring Boot" }],
    image: `${import.meta.env.BASE_URL}projects/jenkins-argocd-helm.svg`,
    githubUrl: "https://github.com/ABHILASH9519/animated-fiesta",
    architectureDiagram: "Git → Jenkins (build · test · Sonar) → Helm → Argo CD → Kubernetes",
    systemBreakdown: { overview: "A GitOps-style pipeline for a Java service.", keyChallenges: "Chaining CI, quality gates and GitOps deployment.", solutionArchitecture: "Jenkins for CI with Argo CD performing the deployment.", impact: "Learning project following a public guide." }
  },
  {
    id: "distributed-mapreduce",
    title: "Distributed MapReduce Framework",
    tagline: "Distributed word-count engine in Go with leased tasks and fencing tokens.",
    category: "Systems & Backend",
    period: 'Public repo',
    role: "Systems Developer",
    summary: "Coordinator and independent worker processes using Go standard-library RPC. Tasks are leased, expired leases are reassigned, and unique fencing tokens reject stale workers; reduce output is published atomically.",
    highlights: ["Lease expiry with reassignment of abandoned work.", "Completion validated by worker ID, task ID, kind and lease token.", "Atomic output via temp file and rename; no third-party dependencies."],
    techStack: ["Go", "RPC", "Concurrency", "Distributed Systems"],
    metrics: [{ label: "Language", value: "Go 1.22+" }, { label: "Dependencies", value: "None" }, { label: "Checks", value: "vet · test -race" }],
    image: `${import.meta.env.BASE_URL}projects/distributed-mapreduce.svg`,
    githubUrl: "https://github.com/ABHILASH9519/Distributed-MapReduce-Framework",
    architectureDiagram: "Input → Coordinator (map leases) → Workers → word counts → Reduce → sorted output",
    systemBreakdown: { overview: "A small MapReduce-style engine to explore fault tolerance.", keyChallenges: "Reassigning work safely without double-publishing results.", solutionArchitecture: "Time-limited leases with fencing tokens and atomic publish.", impact: "Educational framework with race-tested coordination logic." }
  },
  {
    id: "multithreaded-network-server",
    title: "Multithreaded Network Server (C++)",
    tagline: "TCP server with a bounded worker pool and a line protocol.",
    category: "Systems & Backend",
    period: 'Public repo',
    role: "Systems Developer",
    summary: "C++ socket server with getaddrinfo (IPv4/IPv6) resolution, a fixed-size worker pool, 4 KiB request limit, signal-triggered shutdown, CMake build, CTest tests and CI.",
    highlights: ["Bounded concurrency via a fixed worker pool.", "Empty and oversized request handling.", "Local socket-pair tests for normal, empty, oversized and shutdown cases."],
    techStack: ["C++", "CMake", "CTest", "Sockets", "GitHub Actions"],
    metrics: [{ label: "Language", value: "C++" }, { label: "Payload limit", value: "4 KiB" }, { label: "Tests", value: "CTest" }],
    image: `${import.meta.env.BASE_URL}projects/multithreaded-network-server.svg`,
    githubUrl: "https://github.com/ABHILASH9519/Multithreaded-Network-Server",
    architectureDiagram: "Client ⇄ TCP listener → bounded worker pool → line-protocol handler",
    systemBreakdown: { overview: "An educational project on socket programming and worker-pool lifecycle.", keyChallenges: "Bounding concurrency and handling bad input safely.", solutionArchitecture: "A fixed pool with a newline-delimited protocol and clean shutdown path.", impact: "Educational; the README notes it is not a hardened internet-facing service." }
  },
  {
    id: "cloud-access-saas",
    title: "Cloud Access SaaS Platform",
    tagline: "Node.js/Express auth API scaffold with JWT and Prisma on PostgreSQL.",
    category: "Systems & Backend",
    period: 'Public repo',
    role: "Backend Developer",
    summary: "Registration and login endpoints with bcrypt password hashing, JWT issuance, input validation and a Prisma User model on PostgreSQL. The README states that IAM provisioning, tenant isolation and billing are not implemented.",
    highlights: ["POST /api/auth/register and /api/auth/login with seven-day JWTs.", "Email normalisation, password rules and bcrypt 72-byte limit enforced.", "Configurable CORS and a 32 KB JSON body limit; Node test runner tests."],
    techStack: ["Node.js", "Express", "Prisma", "PostgreSQL", "JWT", "bcrypt"],
    metrics: [{ label: "Auth", value: "JWT + bcrypt" }, { label: "ORM", value: "Prisma" }, { label: "DB", value: "PostgreSQL" }],
    image: `${import.meta.env.BASE_URL}projects/cloud-access-saas.svg`,
    githubUrl: "https://github.com/ABHILASH9519/Cloud-Access-SaaS-Platform",
    architectureDiagram: "Client ⇄ Express API (validation · bcrypt · JWT) ⇄ Prisma ⇄ PostgreSQL",
    systemBreakdown: { overview: "A starting point for an access-management SaaS.", keyChallenges: "Getting authentication fundamentals right before building more.", solutionArchitecture: "Small Express service with validated credentials and Prisma-backed users.", impact: "Auth basics implemented and tested; the README lists what remains out of scope." }
  },
  {
    id: "api-automation-testing",
    title: "API Automation Testing Framework",
    tagline: "Reusable Pytest framework with a deterministic local demo API.",
    category: "Systems & Backend",
    period: 'Public repo',
    role: "QA Automation",
    summary: "Python/Pytest suite for REST API validation with a FastAPI demo service, reusable fixtures, a Postman collection with executable assertions and a GitHub Actions regression workflow.",
    highlights: ["Contract, create/read, not-found, missing-field and boundary checks.", "Isolated test state with reusable fixtures.", "Postman collection runnable against the local demo API."],
    techStack: ["Python", "Pytest", "FastAPI", "Postman", "GitHub Actions"],
    metrics: [{ label: "Framework", value: "Pytest" }, { label: "Demo API", value: "FastAPI" }, { label: "CI", value: "GitHub Actions" }],
    image: `${import.meta.env.BASE_URL}projects/api-automation-testing.svg`,
    githubUrl: "https://github.com/ABHILASH9519/API-Automation-Testing-Framework",
    architectureDiagram: "Pytest fixtures ⇄ FastAPI demo API (in-memory) · Postman collection · GitHub Actions regression run",
    systemBreakdown: { overview: "API tests that run without external accounts or keys.", keyChallenges: "Keeping tests deterministic and isolated.", solutionArchitecture: "A local demo API plus fixtures so the suite is self-contained.", impact: "Reusable regression suite and Postman collection." }
  },
  {
    id: "job-application-evidence-planner",
    title: "Job Application Evidence Planner",
    tagline: "Privacy-first tracker that maps job requirements to concrete evidence.",
    category: "Full-Stack Web",
    period: 'Public repo',
    role: "Full-Stack Developer",
    summary: "Browser app for tracking applications and linking role requirements to project, experience or evidence links. Data stays in IndexedDB with explicit JSON export and merge.",
    highlights: ["Pipeline stages, follow-up dates, overdue indicators and per-application readiness.", "Requirement-to-evidence mapping with contribution notes and progress.", "No account or backend; JSON export and backup merge."],
    techStack: ["React", "TypeScript", "Vite", "IndexedDB", "Vitest", "Vercel"],
    metrics: [{ label: "Storage", value: "IndexedDB (local)" }, { label: "Backend", value: "None" }, { label: "Hosting", value: "Vercel" }],
    image: `${import.meta.env.BASE_URL}projects/job-application-evidence-planner.svg`,
    githubUrl: "https://github.com/ABHILASH9519/Job-Application-Evidence-Planner",
    liveUrl: "https://job-application-evidence-planner.vercel.app/",
    architectureDiagram: "React UI ⇄ IndexedDB (browser) · explicit JSON export / merge · static hosting on Vercel",
    systemBreakdown: { overview: "Applications are easier when every requirement has real evidence behind it.", keyChallenges: "Keeping personal data private while still allowing backups.", solutionArchitecture: "A local-first app with explicit export instead of a server.", impact: "Deployed on Vercel; the README documents verified behaviour and remaining test gaps." }
  },
  {
    id: "xetech-club",
    title: "XeTech Club Website",
    tagline: "Single-page site for a student technology community.",
    category: "Full-Stack Web",
    period: 'Public repo',
    role: "Frontend Developer",
    summary: "React 19, TypeScript, Tailwind CSS v4 and Vite site with a DevOps/AI terminal simulator, canvas particle background, masterclass portal, project showcase and learning roadmap, deployable to GitHub Pages via Actions.",
    highlights: ["Interactive terminal simulator and canvas neural-mesh background that respects reduced motion.", "Student project showcase and learning roadmap sections.", "GitHub Actions workflow for Pages deployment."],
    techStack: ["React 19", "TypeScript", "Tailwind CSS v4", "Vite", "GitHub Pages"],
    metrics: [{ label: "Framework", value: "React 19" }, { label: "Styling", value: "Tailwind v4" }, { label: "Deploy", value: "GitHub Pages" }],
    image: `${import.meta.env.BASE_URL}projects/xetech-club.svg`,
    githubUrl: "https://github.com/ABHILASH9519/xetech-club",
    architectureDiagram: "Vite + React SPA → GitHub Actions → GitHub Pages",
    systemBreakdown: { overview: "A home for a student community focused on cloud, DevOps and AI.", keyChallenges: "Making a visually rich site that stays accessible.", solutionArchitecture: "Canvas visuals gated by prefers-reduced-motion and a simple static deploy.", impact: "Community site built and maintained in the open." }
  },
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
