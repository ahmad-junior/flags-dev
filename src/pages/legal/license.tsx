import SEO from "@/components/SEO";

const LAST_UPDATED_LICENCE = "12 - July - 2026";

export default function LicensePage() {
  return (
    <>
      <SEO
        title="License"
        description="FlagsDev is an open-source project released under the MIT License."
      />

      <main className="mx-auto max-w-4xl px-6 py-20">
        <div>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900">
            License
          </h1>

          <p className="mt-4 text-slate-600">
            Last updated: {LAST_UPDATED_LICENCE}
          </p>
        </div>

        <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-8">
          <h2 className="text-2xl font-semibold text-slate-900">MIT License</h2>

          <p className="mt-6 leading-8 text-slate-600">
            FlagsDev is an open-source project released under the MIT License.
            You are free to use, copy, modify, merge, publish, distribute,
            sublicense, and sell copies of the software, provided that the
            original copyright notice and license are included.
          </p>

          <p className="mt-6 leading-8 text-slate-600">
            The software is provided <strong>&quot;AS IS&quot;</strong>, without
            warranty of any kind, express or implied, including but not limited
            to the warranties of merchantability, fitness for a particular
            purpose, and non-infringement.
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-8">
          <h2 className="text-xl font-semibold text-slate-900">
            What this means
          </h2>

          <ul className="mt-6 list-disc space-y-3 pl-6 text-slate-600">
            <li>You can use FlagsDev for personal or commercial purposes.</li>
            <li>You can modify and distribute the source code.</li>
            <li>You can contribute improvements back to the project.</li>
            <li>You must include the original copyright and license notice.</li>
            <li>The software is provided without any warranty.</li>
          </ul>
        </div>

        <div className="mt-8 rounded-2xl border border-blue-200 bg-blue-50 p-8">
          <h2 className="text-xl font-semibold text-slate-900">
            Official License
          </h2>

          <p className="mt-4 leading-8 text-slate-600">
            The complete license text is included in the{" "}
            <code className="rounded bg-slate-200 px-2 py-1">LICENSE</code> file
            located in the root of the GitHub repository.
          </p>
        </div>
      </main>
    </>
  );
}
