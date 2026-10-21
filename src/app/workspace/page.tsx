import React from "react";
import { FutureOsWorkspace } from "@/components/workspace/FutureOsWorkspace";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Workspace | Athrva Sarade",
  description:
    "Interactive technical workstation with Agent Lab DAG execution trace, Projects explorer, Model Registry checkpoints, and system telemetry.",
};

export default function WorkspacePage() {
  return <FutureOsWorkspace />;
}
