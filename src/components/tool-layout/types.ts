import { ComponentType } from "react";

export interface ToolFeature {
  title: string;
  description: string;
}

export interface ToolFaq {
  question: string;
  answer: string;
}

export interface ToolContributor {
  name: string;
  role: string;
  email?: string;
}

export interface ToolTab {
  id: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
}

export interface ToolDefinition {
  slug: string;
  title: string;
  description: string;
  category: string;
  icon: ComponentType<{ className?: string }>;

  badges?: string[];

  features?: ToolFeature[];
  faqs?: ToolFaq[];

  lastUpdated: string;

  contributors?: ToolContributor[];
  openSource?: boolean;
}
