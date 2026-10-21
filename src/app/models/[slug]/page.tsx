import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MODELS, ModelEntry } from "@/data/models";
import { PROJECTS } from "@/data/projects";
import { SiteHeader } from "@/components/shell/SiteHeader";
import { SiteFooter } from "@/components/shell/SiteFooter";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Github,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Cpu,
  Layers,
  Terminal,
  Database,
  Sliders,
  Sparkles,
} from "lucide-react";

export async function generateStaticParams() {
  return MODELS.map((model) => ({
    slug: model.slug,
  }));
}

export default async function ModelDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const modelIndex = MODELS.findIndex((m) => m.slug === slug);

  if (modelIndex === -1) {
    notFound();
  }

  const model = MODELS[modelIndex];
  const nextModel = MODELS[(modelIndex + 1) % MODELS.length];
  const prevModel = MODELS[(modelIndex - 1 + MODELS.length) % MODELS.length];

  // Check for corresponding project
  const relatedProject = PROJECTS.find(
    (p) =>
      p.slug.toLowerCase().includes(model.slug.split("-")[0].toLowerCase()) ||
      (model.slug.includes("netshield") && p.slug === "netshield") ||
      (model.slug.includes("supplylens") && p.slug === "supplylens360") ||
      (model.slug.includes("zenith") && p.slug === "zenith") ||
      (model.slug.includes("medlearn") && p.slug === "medlearn")
  );

  const statusStyle = {
    Evaluated: "bg-[#79C9B0]/15 border-[#79C9B0]/30 text-[#79C9B0]",
    Prototype: "bg-[#FFB454]/15 border-[#FFB454]/30 text-[#FFB454]",
    "In Progress": "bg-[#85C2FF]/15 border-[#85C2FF]/30 text-[#85C2FF]",
    "Not Evaluated": "bg-[#6E737A]/15 border-[#6E737A]/30 text-[#6E737A]",
  }[model.status];

  return (
    <div className="bg-[#101113] text-[#F0EDE6] min-h-screen relative overflow-x-hidden">
      {/* Blueprint grid */}
      <div className="fixed inset-0 pointer-events-none bg-blueprint-grid opacity-30 z-0" />
      <div className="fixed top-0 left-0 w-96 h-96 bg-[#79C9B0]/5 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Header */}
      <SiteHeader />

      <main className="relative z-10 w-full pt-20 pb-16">
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Back button */}
          <div className="flex items-center justify-between text-xs font-mono text-[#A5A8AC]">
            <Link
              href="/models"
              className="inline-flex items-center gap-1.5 hover:text-[#79C9B0] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Model Registry</span>
            </Link>
            <span className="text-[#6E737A]">
              CHECKPOINT · {model.slug.toUpperCase()}
            </span>
          </div>

          {/* Model Card Header Card */}
          <div className="rounded-xl border border-[#383D43] bg-[#1B1E22]/90 backdrop-blur-md p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#383D43] pb-4">
              <div className="flex items-center gap-2">
                <span
                  className={`font-mono text-xs px-2.5 py-0.5 rounded border font-medium ${statusStyle}`}
                >
                  {model.status.toUpperCase()}
                </span>
                <span className="font-mono text-xs text-[#79C9B0]">
                  TYPE: {model.kind.toUpperCase()}
                </span>
                {model.version && (
                  <span className="font-mono text-xs text-[#6E737A]">
                    VERSION: {model.version}
                  </span>
                )}
              </div>

              {/* External source actions */}
              <div className="flex items-center gap-3 font-mono text-xs">
                {model.repositoryUrl && (
                  <a
                    href={model.repositoryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#25292E] border border-[#383D43] text-[#F0EDE6] hover:text-[#79C9B0] hover:border-[#79C9B0]/40 transition-all"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>View Repository</span>
                    <ArrowUpRight className="w-3 h-3 text-[#6E737A]" />
                  </a>
                )}
                {model.demoUrl && (
                  <a
                    href={model.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#79C9B0]/10 border border-[#79C9B0]/30 text-[#79C9B0] hover:bg-[#79C9B0]/20 transition-all font-semibold"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Live Service</span>
                  </a>
                )}
              </div>
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-[#F0EDE6] tracking-tight">
                {model.name}
              </h1>
              <p className="text-base text-[#79C9B0] font-mono mt-1">
                {model.task}
              </p>
              <p className="text-sm text-[#A5A8AC] mt-3 leading-relaxed">
                {model.summary}
              </p>
            </div>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 font-mono text-xs">
              <div className="p-3 rounded bg-[#15171A] border border-[#383D43]/60">
                <span className="text-[#6E737A] text-[10px] block uppercase">Frameworks</span>
                <span className="text-[#F0EDE6] font-medium mt-0.5 block">
                  {model.framework ? model.framework.join(" · ") : "Custom Architecture"}
                </span>
              </div>
              <div className="p-3 rounded bg-[#15171A] border border-[#383D43]/60">
                <span className="text-[#6E737A] text-[10px] block uppercase">Tags &amp; Domain</span>
                <span className="text-[#FFB454] font-medium mt-0.5 block">
                  {model.tags.join(" · ")}
                </span>
              </div>
              <div className="p-3 rounded bg-[#15171A] border border-[#383D43]/60">
                <span className="text-[#6E737A] text-[10px] block uppercase">Last Checkpoint Update</span>
                <span className="text-[#79C9B0] font-medium mt-0.5 block">
                  {model.updatedAt || "Current Release"}
                </span>
              </div>
            </div>
          </div>

          {/* ── Model Card Details (Standard Model Card Specification) ── */}
          <div className="space-y-6">
            {/* 1. Intended Use */}
            {model.intendedUse && (
              <div className="rounded-xl border border-[#383D43] bg-[#1B1E22]/90 p-6 space-y-3">
                <div className="flex items-center gap-2 font-mono text-xs text-[#79C9B0] uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  <span>01 · INTENDED USE &amp; OPERATIONAL BOUNDARIES</span>
                </div>
                <p className="text-sm sm:text-base text-[#A5A8AC] leading-relaxed">
                  {model.intendedUse}
                </p>
              </div>
            )}

            {/* 2. Inputs & Outputs */}
            {model.inputsOutputs && (
              <div className="rounded-xl border border-[#383D43] bg-[#1B1E22]/90 p-6 space-y-3">
                <div className="flex items-center gap-2 font-mono text-xs text-[#FFB454] uppercase tracking-wider">
                  <Cpu className="w-4 h-4" />
                  <span>02 · INPUTS &amp; OUTPUTS SPECIFICATION</span>
                </div>
                <p className="text-sm text-[#F0EDE6] font-mono leading-relaxed bg-[#15171A] p-3 rounded border border-[#383D43]/60">
                  {model.inputsOutputs}
                </p>
              </div>
            )}

            {/* 3. Dataset Provenance & Preprocessing */}
            {model.datasetAndMethod && (
              <div className="rounded-xl border border-[#383D43] bg-[#1B1E22]/90 p-6 space-y-3">
                <div className="flex items-center gap-2 font-mono text-xs text-[#85C2FF] uppercase tracking-wider">
                  <Database className="w-4 h-4" />
                  <span>03 · DATASET PROVENANCE &amp; PREPROCESSING</span>
                </div>
                <p className="text-sm sm:text-base text-[#A5A8AC] leading-relaxed">
                  {model.datasetAndMethod}
                </p>
              </div>
            )}

            {/* 4. Empirical Evaluation & Metrics with Benchmark Context */}
            {model.metrics && model.metrics.length > 0 && (
              <div className="rounded-xl border border-[#383D43] bg-[#1B1E22]/90 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-mono text-xs text-[#79C9B0] uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>04 · EVALUATION RESULTS &amp; BENCHMARKS</span>
                  </div>
                  <span className="font-mono text-[10px] text-[#6E737A]">
                    TRUTHFUL VERIFICATION CONTEXT
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {model.metrics.map((metric, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-lg bg-[#15171A] border border-[#383D43] space-y-1 font-mono"
                    >
                      <div className="text-[11px] text-[#6E737A]">{metric.name}</div>
                      <div className="text-2xl font-bold text-[#79C9B0]">
                        {metric.value} {metric.unit || ""}
                      </div>
                      {metric.dataset && (
                        <div className="text-[10px] text-[#A5A8AC] pt-1 border-t border-[#383D43]/40">
                          Dataset: {metric.dataset}
                        </div>
                      )}
                      {metric.method && (
                        <div className="text-[10px] text-[#6E737A]">
                          Method: {metric.method}
                        </div>
                      )}
                      {metric.hardware && (
                        <div className="text-[10px] text-[#6E737A]">
                          Hardware: {metric.hardware}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. Architecture & Pipeline */}
            {model.architecture && (
              <div className="rounded-xl border border-[#383D43] bg-[#1B1E22]/90 p-6 space-y-3">
                <div className="flex items-center gap-2 font-mono text-xs text-[#FFB454] uppercase tracking-wider">
                  <Layers className="w-4 h-4" />
                  <span>05 · MODEL PIPELINE &amp; ARCHITECTURE</span>
                </div>
                <p className="text-sm font-mono text-[#F0EDE6] leading-relaxed bg-[#15171A] p-3.5 rounded border border-[#383D43]/60">
                  {model.architecture}
                </p>
              </div>
            )}

            {/* 6. Limitations & Failure Cases */}
            {(model.limitations || model.failureCases) && (
              <div className="rounded-xl border border-[#383D43] bg-[#1B1E22]/90 p-6 space-y-4">
                <div className="flex items-center gap-2 font-mono text-xs text-[#F08D8D] uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4" />
                  <span>06 · LIMITATIONS &amp; KNOWN FAILURE MODES</span>
                </div>

                {model.limitations && (
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-mono text-[#6E737A] uppercase">
                      Known Limitations:
                    </span>
                    {model.limitations.map((lim, i) => (
                      <div
                        key={i}
                        className="p-3 rounded bg-[#15171A] border border-[#383D43]/60 text-xs text-[#A5A8AC]"
                      >
                        • {lim}
                      </div>
                    ))}
                  </div>
                )}

                {model.failureCases && (
                  <div className="space-y-1.5 pt-2">
                    <span className="text-[11px] font-mono text-[#6E737A] uppercase">
                      Edge-Case Failure Behaviors:
                    </span>
                    {model.failureCases.map((fc, i) => (
                      <div
                        key={i}
                        className="p-3 rounded bg-[#15171A] border border-[#383D43]/60 text-xs text-[#A5A8AC]"
                      >
                        • {fc}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 7. Reproducibility Notes */}
            {model.reproducibility && (
              <div className="rounded-xl border border-[#383D43] bg-[#1B1E22]/90 p-6 space-y-3 font-mono text-xs">
                <span className="text-[#79C9B0] uppercase font-semibold block">
                  07 · REPRODUCIBILITY NOTES
                </span>
                <p className="text-[#A5A8AC] leading-relaxed">
                  {model.reproducibility}
                </p>
              </div>
            )}

            {/* 8. Related Project Link */}
            {relatedProject && (
              <div className="rounded-xl border border-[#79C9B0]/40 bg-[#1F2329] p-6 space-y-3 shadow-[0_0_20px_rgba(121,201,176,0.08)]">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#79C9B0] uppercase tracking-wider">
                    CORRESPONDING SYSTEM BUILD
                  </span>
                  <span className="font-mono text-[10px] text-[#FFB454] px-2 py-0.5 rounded bg-[#FFB454]/10 border border-[#FFB454]/30">
                    {relatedProject.status}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#F0EDE6]">{relatedProject.title}</h3>
                  <p className="text-xs text-[#A5A8AC] mt-1">{relatedProject.oneLiner}</p>
                </div>
                <div className="pt-2">
                  <Link
                    href={`/projects/${relatedProject.slug}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#79C9B0] text-[#101113] font-mono text-xs font-bold hover:bg-[#90E1C7] transition-all"
                  >
                    <span>Read Full Engineering Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Pagination */}
          <div className="pt-6 border-t border-[#383D43] flex items-center justify-between font-mono text-xs">
            <Link
              href={`/models/${prevModel.slug}`}
              className="inline-flex items-center gap-2 text-[#A5A8AC] hover:text-[#79C9B0] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Prev: {prevModel.name}</span>
            </Link>

            <Link
              href={`/models/${nextModel.slug}`}
              className="inline-flex items-center gap-2 text-[#A5A8AC] hover:text-[#79C9B0] transition-colors"
            >
              <span>Next: {nextModel.name}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
