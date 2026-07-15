import { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
}

export default function ToolSection({ title, children }: Props) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-14">
      <h2 className="mb-8 text-3xl font-bold">{title}</h2>

      {children}
    </section>
  );
}
