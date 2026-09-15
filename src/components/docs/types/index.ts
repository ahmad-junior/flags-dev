export interface DocsNavigationItem {
  title: string;
  href: string;
  description?: string;
}

export interface DocsLayoutProps {
  children: React.ReactNode;

  title: string;
  description: string;
  toolUrl: string;
  updatedAt?: string;
  readTime?: string;

  sections?: {
    id: string;
    title: string;
  }[];
}

export interface DocsHeaderProps {
  title: string;
  description: string;
  toolUrl: string;
  updatedAt?: string;
  readTime?: string;
}

export interface DocsImageProps {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

export interface DocsSidebarProps {
  sections: {
    id: string;
    title: string;
  }[];
}

interface DocsStep {
  title: string;
  description: React.ReactNode;
}

export interface DocsStepsProps {
  steps: DocsStep[];
}

export interface DocsTableOfContentsProps {
  sections: {
    id: string;
    title: string;
  }[];
}
