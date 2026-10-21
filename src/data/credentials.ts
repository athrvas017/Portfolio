export type CredentialCategory =
  | "AI/ML"
  | "Agentic AI"
  | "Cloud"
  | "Programming"
  | "Other";

export interface Credential {
  slug: string;
  name: string;
  issuer: string;
  category: CredentialCategory;
  date: string;
  credentialId?: string;
  verificationUrl?: string;
  pdfUrl?: string;
  imageUrl?: string;
  skills: string[];
  status: "Verified" | "Active" | "Pending";
  description: string;
}

export const CREDENTIALS: Credential[] = [
  {
    slug: "agentic-ai-langchain-langgraph",
    name: "Agentic AI with LangChain and LangGraph",
    issuer: "IBM / Coursera",
    category: "Agentic AI",
    date: "2025",
    pdfUrl: "/certificates/Agentic AI with LangChain and LangGraph Certificate.pdf",
    skills: ["LangChain", "LangGraph", "Multi-Agent Systems", "Stateful Graphs", "Tool Calling"],
    status: "Verified",
    description:
      "Production-grade agentic architectures utilizing LangChain and LangGraph: autonomous multi-step reasoning loops, tool dispatch protocols, and state persistence across graph cycles.",
  },
  {
    slug: "fundamentals-building-ai-agents",
    name: "Fundamentals of Building AI Agents",
    issuer: "IBM / Coursera",
    category: "Agentic AI",
    date: "2025",
    pdfUrl: "/certificates/Fundamentals of Building AI Agents Certififcate.pdf",
    skills: ["Autonomous Agents", "Goal Decomposition", "Memory Architectures", "Orchestration"],
    status: "Verified",
    description:
      "Core principles of autonomous agent engineering: planning horizons, short/long-term memory buffers, tool integration, and deterministic execution boundaries.",
  },
  {
    slug: "advanced-rag-vector-databases",
    name: "Advanced RAG with Vector Databases and Retrievers",
    issuer: "IBM / Coursera",
    category: "AI/ML",
    date: "2025",
    pdfUrl: "/certificates/Advanced RAG with Vector Databases and Retrievers Certificate.pdf",
    skills: ["Advanced RAG", "Dense Retrievers", "Hybrid Search", "Vector DBs", "Re-ranking"],
    status: "Verified",
    description:
      "Advanced retrieval-augmented generation systems: dense bi-encoder embeddings, hybrid BM25/cosine retrieval, cross-encoder re-ranking pipelines, and vector index tuning.",
  },
  {
    slug: "vector-databases-rag-introduction",
    name: "Vector Databases for RAG — Introduction",
    issuer: "IBM / Coursera",
    category: "AI/ML",
    date: "2025",
    pdfUrl: "/certificates/Vector Databases for RAG An Introduction Certificate.pdf",
    skills: ["Vector Embeddings", "HNSW / IVF Indexing", "Semantic Search", "Milvus / Chroma"],
    status: "Verified",
    description:
      "Vector embeddings generation, high-dimensional similarity metrics, approximate nearest neighbor (ANN) indexing structures, and integrating vector stores into LLM workflows.",
  },
  {
    slug: "build-rag-applications",
    name: "Build RAG Applications — Get Started",
    issuer: "IBM / Coursera",
    category: "AI/ML",
    date: "2025",
    pdfUrl: "/certificates/Build RAG Applications Get Started Certificate.pdf",
    skills: ["Document Ingestion", "Chunking Strategies", "LLM Generation", "RAG Pipelines"],
    status: "Verified",
    description:
      "End-to-end RAG architecture engineering: document ingestion, token boundary chunking strategies, embedding generation, and hallucination-mitigated LLM response generation.",
  },
  {
    slug: "develop-generative-ai-applications",
    name: "Develop Generative AI Applications — Get Started",
    issuer: "IBM / Coursera",
    category: "AI/ML",
    date: "2025",
    pdfUrl: "/certificates/Develop Generative AI Applications Get Started Certificate.pdf",
    skills: ["Generative AI", "Prompt Engineering", "API Integration", "Model Deployment"],
    status: "Verified",
    description:
      "Applied GenAI engineering: structured prompt engineering, API orchestration, token budget optimization, and deployment architectures for production foundation models.",
  },
  {
    slug: "build-multimodal-genai-applications",
    name: "Build Multimodal Generative AI Applications",
    issuer: "IBM / Coursera",
    category: "AI/ML",
    date: "2025",
    pdfUrl: "/certificates/Build Multimodal Generative AI Applications Certificate.pdf",
    skills: ["Multimodal AI", "Vision-Language Models", "Structured Context", "GenAI"],
    status: "Verified",
    description:
      "Multimodal generative AI systems combining vision, text, and structured metadata for context-grounded reasoning and automated document analysis.",
  },
  {
    slug: "python-for-data-science-ai",
    name: "Python for Data Science, AI & Development",
    issuer: "IBM / Coursera",
    category: "Programming",
    date: "2024",
    pdfUrl: "/certificates/Python for Data Science, AI & Development Certificate.pdf",
    skills: ["Python", "NumPy", "Pandas", "Matplotlib", "REST APIs"],
    status: "Verified",
    description:
      "Comprehensive Python programming for scientific and AI computation: vectorised data manipulation with NumPy/Pandas, statistical visualisation, and asynchronous API clients.",
  },
  {
    slug: "data-science-bootcamp",
    name: "Data Science Bootcamp",
    issuer: "GeeksforGeeks",
    category: "AI/ML",
    date: "2024",
    pdfUrl: "/certificates/Data Science BootCamp Certificate.pdf",
    skills: ["Exploratory Data Analysis", "Statistical Modeling", "Machine Learning", "Scikit-Learn"],
    status: "Verified",
    description:
      "Rigorous data science and machine learning curriculum: statistical inference, exploratory data analysis, feature engineering, regression, and classification pipelines.",
  },
  {
    slug: "tensorflow-fundamentals",
    name: "TensorFlow Fundamentals",
    issuer: "GeeksforGeeks",
    category: "AI/ML",
    date: "2024",
    pdfUrl: "/certificates/TensorFlow_certificate.pdf",
    skills: ["TensorFlow", "Keras", "Deep Learning", "Neural Networks"],
    status: "Verified",
    description:
      "Deep learning model development with TensorFlow and Keras: multilayer perceptrons, convolutional layers, gradient descent optimizers, and model serialization.",
  },
  {
    slug: "cpp-programming",
    name: "C++ Programming",
    issuer: "GeeksforGeeks",
    category: "Programming",
    date: "2024",
    pdfUrl: "/certificates/C++ Certificate.pdf",
    skills: ["C++", "Object-Oriented Programming", "STL", "Memory Management", "Templates"],
    status: "Verified",
    description:
      "High-performance systems programming in C++: object-oriented design, standard template library (STL) algorithms and data structures, pointers, and memory layout optimization.",
  },
  {
    slug: "python-programming",
    name: "Python Programming",
    issuer: "GeeksforGeeks",
    category: "Programming",
    date: "2024",
    pdfUrl: "/certificates/Python Certificate.pdf",
    skills: ["Python", "Data Structures", "Functional Patterns", "File I/O", "Automation"],
    status: "Verified",
    description:
      "Advanced Python language patterns: custom data structure implementations, recursion, functional utilities, modular software architecture, and scripting.",
  },
  {
    slug: "exploring-networking-cisco-packet-tracer",
    name: "Exploring Networking with Cisco Packet Tracer",
    issuer: "Cisco",
    category: "Other",
    date: "2026",
    credentialId: "613c6a6b-ba6a-4f5b-b777-8e4376880b70",
    pdfUrl:
      "/certificates/Exploring_Networking_with_Cisco_Packet_Tracer_certificate_athrvas017-gmail-com_613c6a6b-ba6a-4f5b-b777-8e4376880b70.pdf",
    skills: ["Computer Networking", "Cisco Packet Tracer", "Router Configuration", "Switching"],
    status: "Verified",
    description:
      "Fundamental networking architectures: packet flow traversal, router and switch configuration, IPv4/IPv6 subnetting, and network topology simulation.",
  },
  {
    slug: "getting-started-cisco-packet-tracer",
    name: "Getting Started with Cisco Packet Tracer",
    issuer: "Cisco",
    category: "Other",
    date: "2026",
    credentialId: "c045e4f9-923d-4e08-9edb-86eacd8c1192",
    pdfUrl:
      "/certificates/Getting_Started_with_Cisco_Packet_Tracer_certificate_athrvas017-gmail-com_c045e4f9-923d-4e08-9edb-86eacd8c1192.pdf",
    skills: ["Network Simulation", "Topology Design", "Device Interconnection", "Packet Tracer"],
    status: "Verified",
    description:
      "Hands-on network simulation: designing end-device connection graphs, protocol inspection, ping latency analysis, and network device addressing.",
  },
];
