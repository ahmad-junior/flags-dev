import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { IconType } from "react-icons";

interface HeaderProps {
  title: string;
  homeHref?: string;
  hoverText?: string;
  icon?: IconType;
  textSize?: number;
}

export default function CustomTopHeader({
  title,
  homeHref = "/",
  hoverText = "Go to home",
  icon: Icon = FaHome,
  textSize = 3,
}: HeaderProps) {
  return (
    <section>
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-10">
        <Link href={homeHref} className="group relative">
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-all duration-200 hover:border-blue-500 hover:bg-blue-500 hover:text-white">
            <Icon size={18} />
          </div>

          <span className="pointer-events-none absolute left-1/2 top-full mt-3 -translate-x-1/2 rounded-md bg-slate-900 px-3 py-1.5 text-xs whitespace-nowrap text-white opacity-0 transition-all duration-200 group-hover:translate-y-1 group-hover:opacity-100">
            {hoverText}
          </span>
        </Link>

        <h1 className={`text-${textSize}xl font-bold text-slate-900`}>
          {title}
        </h1>
      </div>
    </section>
  );
}
