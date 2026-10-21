export type ModelStatus =
  | "Evaluated"
  | "Prototype"
  | "In Progress"
  | "Not Evaluated";

export interface Metric {
  name: string;
  value: string | number;
  unit?: string;
  dataset?: string;
  split?: string;
  method?: string;
  hardware?: string;
}

export interface ModelEntry {
  slug: string;
  name: string;
  version?: string;
  kind: "ML Model" | "LLM" | "Agent System";
  task: string;
  summary: string;
  status: ModelStatus;
  framework?: string[];
  tags: string[];
  intendedUse?: string;
  inputsOutputs?: string;
  datasetAndMethod?: string;
  trainingDetails?: string;
  architecture?: string;
  evaluationMethod?: string;
  metrics?: Metric[];
  limitations?: string[];
  failureCases?: string[];
  reproducibility?: string;
  repositoryUrl?: string;
  demoUrl?: string;
  updatedAt?: string;
}

export const MODELS: ModelEntry[] = [
  {
    slug: "netshield-phishing-classifier",
    name: "NetShield Threat Classifier",
    version: "v1.2.0",
    kind: "ML Model",
    task: "URL Threat Classification & Zero-Day Phishing Detection",
    summary:
      "High-throughput URL security classifier combining lexical token entropy extraction, domain structural anomaly heuristics, and ensemble gradient-boosted decision trees.",
    status: "Evaluated",
    framework: ["Scikit-Learn", "XGBoost", "FastAPI", "Python"],
    tags: ["Cybersecurity", "Ensemble ML", "URL Classification", "Tabular"],
    intendedUse:
      "Real-time evaluation of outbound browser navigations, email hyperlinks, and messaging payloads to identify phishing infrastructure prior to user rendering.",
    inputsOutputs:
      "Input: Raw URI string. Output: Probability score [0.0 - 1.0], categorical verdict (Benign, Suspicious, Malicious), and top-3 contributing feature weights.",
    datasetAndMethod:
      "Trained on combined public security datasets (Kaggle Phishing Corpus, PhishTank verified feeds, and Alexa/Tranco top-100k legitimate domains) comprising 120,000+ labeled samples.",
    trainingDetails:
      "80/20 train/test split with 5-fold stratified cross-validation. Hyperparameters tuned with Bayesian search for minimum false positive penalty.",
    architecture:
      "Multi-stage pipeline: (1) Lexical Feature Extractor -> (2) DNS & Domain Anomaly Heuristics -> (3) XGBoost Classifier Ensemble -> (4) Calibrated Softmax Threat Score.",
    evaluationMethod:
      "Evaluated against independent holdout test set with ROC-AUC analysis and false-positive sensitivity sweeps.",
    metrics: [
      {
        name: "Test Accuracy",
        value: "96.4%",
        dataset: "Holdout 24k Sample Set",
        split: "Test",
        method: "5-fold Stratified CV",
      },
      {
        name: "False Positive Rate",
        value: "1.8%",
        dataset: "Tranco Top 10k Crawl",
        split: "Evaluation",
        method: "Zero-tolerance boundary threshold",
      },
      {
        name: "Inference Latency",
        value: "18",
        unit: "ms/URL",
        hardware: "Standard Cloud CPU (Render)",
      },
    ],
    limitations: [
      "Cannot detect malicious dynamic JavaScript payloads injected post-navigation into initially clean domains.",
      "Vulnerable to multi-hop URL shorteners if redirection timeout is exceeded.",
    ],
    failureCases: [
      "Legitimate enterprise SSO login portals with obscure subdomains may occasionally trigger elevated suspicion.",
    ],
    reproducibility:
      "Fully reproducible using the public repository notebook and requirements lockfile.",
    repositoryUrl: "https://github.com/athrvas017/Code_Guardians",
    demoUrl: "https://netshield-67le.onrender.com",
    updatedAt: "2025-02-14",
  },
  {
    slug: "supplylens-graph-engine",
    name: "SupplyLens Risk Propagation DAG",
    version: "v2.0.1",
    kind: "ML Model",
    task: "Multi-Tier Supply Chain Disruption & Dependency Traversal",
    summary:
      "Directed acyclic graph risk engine computing node centrality, critical dependency depth, and regional shockwave cascades across manufacturing supply networks.",
    status: "Evaluated",
    framework: ["Python", "NetworkX", "D3.js", "FastAPI"],
    tags: ["Graph Algorithms", "Network Analysis", "DAG Traversal", "Risk Intelligence"],
    intendedUse:
      "Simulating tier-N component shortages and geographic disruptions to pinpoint single points of failure in complex procurement trees.",
    inputsOutputs:
      "Input: Supplier dependency adjacency matrix with capacity and lead-time edge weights. Output: Critical path vulnerability index, cascade propagation tree, and alternative supplier recommendations.",
    datasetAndMethod:
      "Evaluated on multi-tier manufacturing BOM topologies modeled after automotive and electronics assemblies (500+ nodes, 1,200+ edges).",
    trainingDetails:
      "Algorithmic graph traversal with topological sorting, betweenness centrality computation, and Monte Carlo disruption simulation.",
    architecture:
      "Adjacency Matrix -> Topological DAG Sorter -> Centrality Analyzer -> Downstream Cascade Propagation Simulator -> Interactive D3 Traversal Mesh.",
    evaluationMethod:
      "Synthetic regional bottleneck injection (simulating port shutdowns and factory outages) verifying cascade detection against known ground truth.",
    metrics: [
      {
        name: "Graph Traversal Latency",
        value: "14",
        unit: "ms",
        dataset: "500-Node Automotive Topology",
        hardware: "Local CPU",
      },
      {
        name: "Critical Path Recall",
        value: "100%",
        dataset: "Synthetic Failure Scenarios",
        split: "Test",
      },
      {
        name: "Hackathon Standing",
        value: "2nd Runner-Up",
        dataset: "SYN3RGY 3.0 Hackathon",
      },
    ],
    limitations: [
      "Assumes static edge capacities without non-linear spot-market price volatility modeling.",
    ],
    failureCases: [
      "Cyclic circular dependencies in legacy ERP vendor data require cycle-breaking heuristics.",
    ],
    reproducibility:
      "Source code available on GitHub with sample graph generation fixtures.",
    repositoryUrl: "https://github.com/athrvas017/SupplyChain360",
    updatedAt: "2025-01-20",
  },
  {
    slug: "zentrix-diagnostic-engine",
    name: "Zentrix Cognitive Diagnostic Engine",
    version: "v1.0-alpha",
    kind: "Agent System",
    task: "Cognitive Gap Identification & Adaptive Remediation Sequencing",
    summary:
      "Clinically-inspired diagnostic learning engine using Fault Tree Analysis (FTA), Knowledge DAGs, Item Response Theory (IRT), and Behavior Tree sequencers.",
    status: "In Progress",
    framework: ["Python", "Fault Tree Analysis", "Knowledge DAG", "PyTorch"],
    tags: ["Knowledge DAG", "Fault Tree Analysis", "IRT Latent Ability", "Behavior Tree"],
    intendedUse:
      "Mathematically identifying student cognitive gaps with zero hallucinations and selecting calibrated remediation questions.",
    inputsOutputs:
      "Input: Student assessment responses and telemetry interaction signals. Output: Latent cognitive gap taxonomy, calibrated question selections, and dynamic Drill/Remedy/Advance sequencing.",
    datasetAndMethod:
      "Calibrated with Item Response Theory (IRT) and structured Knowledge DAG misconception graphs.",
    architecture:
      "Fault Tree Analysis (FTA) Engine -> Knowledge DAG -> Latent Ability Estimator (IRT) -> Behavior Tree Sequencer (Drill / Remedy / Advance).",
    evaluationMethod:
      "Mathematical error isolation on simulated cognitive misconceptions with zero hallucination rate.",
    metrics: [
      {
        name: "Hallucination Rate",
        value: "0.0% (Deterministic FTA)",
        dataset: "Knowledge DAG Validation",
        method: "Mathematical Proof",
      },
      {
        name: "Ability Calibration",
        value: "IRT 2PL / 3PL",
        dataset: "Latent Response Space",
        method: "Maximum Likelihood Estimation",
      },
    ],
    limitations: [
      "Requires domain Knowledge DAG definitions for newly ingested subject matters.",
    ],
    failureCases: [
      "Rapid multi-concept guessing may require calibration baseline re-anchoring.",
    ],
    reproducibility:
      "Source repository and architecture specifications hosted on GitHub.",
    repositoryUrl: "https://github.com/athrvas017/Zentrix",
    updatedAt: "2025-02-20",
  },
  {
    slug: "medlearn-rag-system",
    name: "MedLearn Clinical Domain RAG",
    version: "v0.5.0-dev",
    kind: "Agent System",
    task: "Domain-Grounded Clinical Information Retrieval & Synthesis",
    summary:
      "Retrieval-augmented generation system tailored for clinical guidelines and research papers with hybrid dense/sparse search and citation-backed answer generation.",
    status: "In Progress",
    framework: ["Python", "HuggingFace", "ChromaDB / FAISS", "Next.js"],
    tags: ["RAG", "Dense Retrieval", "Clinical NLP", "Citation Grounding"],
    intendedUse:
      "Rapid evidence lookup for medical literature with exact paragraph-level source attribution.",
    inputsOutputs:
      "Input: Clinical inquiry query. Output: Evidence-grounded synthesis with direct passage citations and source confidence indicators.",
    datasetAndMethod:
      "Utilizes open-access biomedical literature and clinical protocol abstracts chunked with semantic boundaries.",
    architecture:
      "Semantic Chunker -> Dense Bi-Encoder Embeddings -> Hybrid BM25/Cosine Index -> Cross-Encoder Reranker -> Citation Generator.",
    evaluationMethod:
      "Retrieval Mean Reciprocal Rank (MRR@10) and hallucination incidence auditing under ongoing development.",
    metrics: [
      {
        name: "Status",
        value: "Active Development",
        dataset: "Open Biomedical Benchmark",
        method: "Hybrid Indexing in Progress",
      },
    ],
    limitations: [
      "Strictly non-diagnostic reference engine; must never be used for autonomous clinical decision-making.",
    ],
    failureCases: [
      "Queries with overlapping medical nomenclature require disambiguation prompting.",
    ],
    reproducibility:
      "Active open-source repository under development.",
    repositoryUrl: "https://github.com/athrvas017/MedLearn",
    updatedAt: "2025-02-10",
  },
];
