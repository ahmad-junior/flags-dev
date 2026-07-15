import { IconType } from "react-icons";

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
  role: "Creator" | "Maintainer" | "Contributor";
  email?: string;
}

export interface ToolDefinition {
  slug: string;
  title: string;
  description: string;
  category: string;
  icon: IconType;

  badges?: string[];

  features?: ToolFeature[];
  faqs?: ToolFaq[];

  lastUpdated: string;

  contributors?: ToolContributor[];
  openSource?: boolean;
}
