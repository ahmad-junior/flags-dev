import ToolCard from "./ToolCard";
import { ToolDefinition } from "../tool-layout/types";

interface Props {
  tools: ToolDefinition[];
}

export default function ToolGrid({ tools }: Props) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {tools.map((tool) => (
        <ToolCard key={tool.slug} tool={tool} />
      ))}
    </div>
  );
}
