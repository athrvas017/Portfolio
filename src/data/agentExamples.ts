export interface PipelineStage {
  id: string;
  stepNumber: string;
  name: string;
  role: string;
  description: string;
  status: "Completed" | "Executing" | "Queued" | "Standby" | "Failed";
  latency?: string;
  inputDescription: string;
  outputDescription: string;
  details: {
    engine: string;
    targetArchitecture: string;
    guardrails: string[];
    failureModes: string[];
    benchmarkStatus: string;
  };
}

export interface TraceLog {
  id: string;
  stageTag: string;
  type: "init" | "stage" | "tool" | "running" | "override" | "success" | "error";
  title: string;
  content: string;
  timestamp: string;
  meta?: {
    status?: string;
    metricLabel?: string;
    metricValue?: string;
  };
}

export interface NeuralDomainNode {
  id: "agentic" | "models" | "llm" | "inference" | "tools";
  title: string;
  tag: string;
  subsystemId: string;
  subtext: string;
  cx: number;
  cy: number;
  r: number;
  strokeColor: string;
  label1: string;
  metric1: string;
  label2: string;
  metric2: string;
  repository: string;
  planningEngine: string;
}

export const NEURAL_DOMAIN_NODES: Record<string, NeuralDomainNode> = {
  agentic: {
    id: "agentic",
    title: "Agentic AI Systems",
    tag: "ACTIVE ARCHITECTURE",
    subsystemId: "SUBSYSTEM · 01",
    subtext:
      "Multi-agent orchestration engines utilizing dynamic DAG execution, reflexive tool selection, and stateful verification. Focused on bounded execution plans, deterministic recovery, and context isolation across asynchronous workers.",
    cx: 160,
    cy: 100,
    r: 36,
    strokeColor: "#FFB454",
    label1: "BENCHMARK STATUS",
    metric1: "EVALUATION IN PROGRESS",
    label2: "TARGET ARCHITECTURE",
    metric2: "DYNAMIC DAG EXECUTION",
    repository: "github.com/athrvas017/Portfolio",
    planningEngine: "Topological Sort · Deterministic",
  },
  models: {
    id: "models",
    title: "ML Models & Registry",
    tag: "REGISTRY · EVALS",
    subsystemId: "SUBSYSTEM · 02",
    subtext:
      "Versioned checkpoint repository for threat classifiers, graph traversal engines, quantization artifacts (AWQ / FP8), and reproducible benchmark evaluations across structured syntax and instruction benchmarks.",
    cx: 540,
    cy: 100,
    r: 34,
    strokeColor: "#79C9B0",
    label1: "CHECKPOINTS",
    metric1: "NETSHIELD & SUPPLYLENS",
    label2: "QUANTIZATION TIER",
    metric2: "INT4 & FP8 KERNELS",
    repository: "github.com/athrvas017/Code_Guardians",
    planningEngine: "XGBoost & Random Forest Ensemble",
  },
  llm: {
    id: "llm",
    title: "LLM Systems & Architectures",
    tag: "RESEARCH · REASONING",
    subsystemId: "SUBSYSTEM · 03",
    subtext:
      "Architectural designs for constrained generation, speculative decoding pipelines, and guided tree-search mechanisms to prevent repetitive degeneration in complex multi-step reasoning.",
    cx: 130,
    cy: 330,
    r: 34,
    strokeColor: "#85C2FF",
    label1: "TECH STACK",
    metric1: "PYTORCH · TRITON",
    label2: "METHODOLOGY",
    metric2: "CONSTRAINED DECODING",
    repository: "github.com/athrvas017/Portfolio",
    planningEngine: "Grammar-Guided AST Parsing",
  },
  inference: {
    id: "inference",
    title: "Inference Optimization",
    tag: "RUNTIME · COMPUTE",
    subsystemId: "SUBSYSTEM · 04",
    subtext:
      "Latency engineering with custom CUDA paged attention, TensorRT-LLM integration, continuous batching schedulers, and zero-redundancy KV-cache compression techniques.",
    cx: 570,
    cy: 330,
    r: 34,
    strokeColor: "#79C9B0",
    label1: "ACCELERATOR",
    metric1: "NVIDIA TENSORRT-LLM",
    label2: "TARGET LATENCY",
    metric2: "LOW FIRST-TOKEN OVERHEAD",
    repository: "github.com/athrvas017/SupplyChain360",
    planningEngine: "FastAPI Async Runtime",
  },
  tools: {
    id: "tools",
    title: "Autonomous Tool Sandboxes",
    tag: "EXECUTION · ENVIRONMENT",
    subsystemId: "SUBSYSTEM · 05",
    subtext:
      "Isolated runtime environments for automated AST transformation, code execution, structured schema extraction, and safe system boundary validation.",
    cx: 350,
    cy: 385,
    r: 30,
    strokeColor: "#FFB454",
    label1: "ISOLATION",
    metric1: "GVISOR / CONTAINER ENGINE",
    label2: "TOOL PROTOCOL",
    metric2: "JSON-RPC & STRICT SCHEMAS",
    repository: "github.com/athrvas017/Railway_Reservation_management",
    planningEngine: "ACID Transaction State Machine",
  },
};

export const PIPELINE_STAGES: PipelineStage[] = [
  {
    id: "intake",
    stepNumber: "01",
    name: "Goal Dissector",
    role: "INTAKE",
    description: "Deconstructs high-level objective into prompt boundaries, sub-goals & security scope.",
    status: "Completed",
    latency: "32ms",
    inputDescription: "Natural language user instruction or prompt payload.",
    outputDescription: "Validated goal AST with parameter schemas and safety boundaries.",
    details: {
      engine: "Claude 3.5 Sonnet / Token Slicer",
      targetArchitecture: "Hierarchical Goal Decomposer",
      guardrails: ["Input Length Bounds", "Injection Boundary Filter"],
      failureModes: ["Unclear goal intent", "Out-of-scope system commands"],
      benchmarkStatus: "Pass (Deterministic validation)",
    },
  },
  {
    id: "planner",
    stepNumber: "02",
    name: "DAG Decomposition",
    role: "PLANNER",
    description: "Generates executable dependency tree with tool dispatch requirements and zero cycles.",
    status: "Completed",
    latency: "115ms",
    inputDescription: "Validated goal AST and available tool registries.",
    outputDescription: "Topologically sorted DAG with typed inter-node dependencies.",
    details: {
      engine: "Deterministic DAG Compiler v2.4",
      targetArchitecture: "Topological Sort & Dependency Matrix",
      guardrails: ["Cycle Detection", "Max Depth Limitation (<= 6)"],
      failureModes: ["Deadlock dependencies", "Missing tool prerequisites"],
      benchmarkStatus: "Pass (0 cyclics detected)",
    },
  },
  {
    id: "tool_run",
    stepNumber: "03",
    name: "Dynamic Tool Dispatch",
    role: "TOOL RUN",
    description: "Invoking sandboxed tool execution, model artifact fetch & verification REPL.",
    status: "Executing",
    latency: "248ms",
    inputDescription: "Tool payload: model_registry.fetch_artifact('netshield-checkpoint').",
    outputDescription: "Target checkpoint SHA256 verified; weights mapped to memory buffer.",
    details: {
      engine: "Sandboxed JSON-RPC Tool Executor",
      targetArchitecture: "gVisor-isolated Micro-Worker",
      guardrails: ["Egress Network Filter", "Execution Timeout (15s)"],
      failureModes: ["Network timeout", "Checksum verification mismatch"],
      benchmarkStatus: "Executing (Cosine matrix running)",
    },
  },
  {
    id: "synthesis",
    stepNumber: "04",
    name: "Context Stitcher",
    role: "SYNTHESIS",
    description: "Fuses multi-modal observations into structured model payload.",
    status: "Queued",
    latency: "--",
    inputDescription: "Tool execution outputs, intermediate memory buffers.",
    outputDescription: "Structured unified response payload matching schema.",
    details: {
      engine: "Context Compressor v3",
      targetArchitecture: "Attention-Weighted Memory Stitcher",
      guardrails: ["Token Budget Clamping", "Deduplication Window"],
      failureModes: ["Context window overflow", "Conflicting observation data"],
      benchmarkStatus: "Queued for Stage 03 completion",
    },
  },
  {
    id: "verifier",
    stepNumber: "05",
    name: "Reflexion Loop",
    role: "VERIFIER",
    description: "Applies deterministic JSON schema checks and ground-truth validation gates.",
    status: "Standby",
    latency: "--",
    inputDescription: "Synthesized candidate output and validation schema contract.",
    outputDescription: "Verified output payload or reflexive correction prompt.",
    details: {
      engine: "Formal Schema Validator (Pydantic / Zod)",
      targetArchitecture: "Deterministic Output Verifier",
      guardrails: ["Strict Type Conformance", "PII Redaction Engine"],
      failureModes: ["Schema violation", "Hallucinated assertion keys"],
      benchmarkStatus: "Standby",
    },
  },
];

export const INITIAL_TRACE_LOGS: TraceLog[] = [
  {
    id: "log-1",
    stageTag: "INIT",
    type: "init",
    title: "Session Initialization",
    content: "Session loaded context window (32k token boundary allocated). Replay environment active.",
    timestamp: "14:28:09.112",
  },
  {
    id: "log-2",
    stageTag: "STAGE 01",
    type: "stage",
    title: "Query Intake & Goal Parsing",
    content:
      "\"Load checkpoint artifacts for 'netshield-threat-classifier' from storage, calculate cosine matrix against reference benchmark, and confirm parameter stability.\"",
    timestamp: "14:28:09.184",
  },
  {
    id: "log-3",
    stageTag: "STAGE 02",
    type: "stage",
    title: "DAG Planner Resolved",
    content: "Planner compiled deterministic sub-tasks. Dependency tree generated with 0 cyclics and 5 stages.",
    timestamp: "14:28:09.308",
  },
  {
    id: "log-4",
    stageTag: "STAGE 03",
    type: "tool",
    title: "Tool Dispatch: model_registry.fetch_artifact()",
    content: "Target checkpoint SHA256 verified. Model parameters mapped to memory buffer.",
    timestamp: "14:28:09.560",
    meta: {
      status: "HTTP 200 OK",
      metricLabel: "WEIGHT STABILITY INDEX:",
      metricValue: "0.9982 (HIGH CONVERGENCE)",
    },
  },
  {
    id: "log-5",
    stageTag: "CURRENT EXECUTION",
    type: "running",
    title: "Active Kernel",
    content: "Running cosine matrix across 120 reference vectors in sandboxed worker runtime...",
    timestamp: "14:28:09.780",
  },
];
