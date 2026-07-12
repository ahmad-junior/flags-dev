import Link from "next/link";
import { TbError404Off } from "react-icons/tb";
import { STATIC_PATHS } from "@/routes/index";
import SEO from "@/components/SEO";

const Custom404 = () => {
  return (
    <>
      <SEO title="404 | Page Not Found" noIndex />
      <div className="flex flex-col items-center justify-center h-screen p-6">
        <div className="text-8xl text-yellow-600 mb-6">
          <TbError404Off />
        </div>

        <h1 className="text-4xl font-semibold text-gray-800 mb-4">
          Oops! Page Not Found
        </h1>

        <p className="text-lg text-gray-600 mb-8">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>

        <Link
          href={STATIC_PATHS.home}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Go to Home
        </Link>
      </div>
    </>
  );
};

export default Custom404;
