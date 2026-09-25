"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
    ArrowRight,
    BookOpen,
    FileText,
    Search,
    Sparkles,
    ShieldCheck,
    Layers,
    SlidersHorizontal,
} from "lucide-react";

import SEO from "@/components/SEO";
import AdsenseAd from "@/components/adds/AdsenseAd";
import { DOC_CATEGORIES } from "@/pages/docs/constants";
import { STATIC_PATHS, CANONICAL_PATHS } from "@/routes";

export default function DocsIndexPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");

    const filteredCategories = useMemo(() => {
        return DOC_CATEGORIES.map((category) => {
            if (selectedCategory !== "all" && category.title.toLowerCase() !== selectedCategory.toLowerCase()) {
                return null;
            }

            const filteredDocs = category.docs.filter((doc) => {
                const matchesSearch =
                    doc.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    doc.help?.label?.toLowerCase().includes(searchQuery.toLowerCase());
                return matchesSearch;
            });

            if (filteredDocs.length === 0) return null;

            return {
                ...category,
                docs: filteredDocs,
            };
        }).filter(Boolean);
    }, [searchQuery, selectedCategory]);

    const totalVisibleTools = useMemo(() => {
        return filteredCategories.reduce((acc, cat) => acc + (cat?.docs.length || 0), 0);
    }, [filteredCategories]);

    return (
        <main className="min-h-screen bg-slate-50/50 selection:bg-green-500 selection:text-white">
            <SEO
                title="Documentation & Guides — Privacy First Browser Tools"
                description="Explore step-by-step guides and documentation for FlagsDev's privacy-first browser utilities. Learn how to securely manage, process, and optimize your files locally."
                keywords="FlagsDev documentation, browser tools guides, privacy-first software, client-side file processing, PDF tools help, local file utilities, FlagsDev help center"
                canonical={CANONICAL_PATHS.docs}
            />
            <section className="relative overflow-hidden border-b border-slate-200/80 bg-white">
                <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
                <div className="relative mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10">
                    <div className="max-w-3xl">
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50/80 px-3.5 py-1.5 text-xs font-semibold tracking-wide uppercase text-green-700 shadow-sm backdrop-blur-sm">
                            <BookOpen className="h-4 w-4" />
                            Documentation & Guides Hub
                        </div>

                        <h1 className="text-4xl font-extrabold tracking-tight text-slate-950 sm:text-6xl">
                            Master every FlagsDev tool
                        </h1>

                        <p className="mt-6 text-lg leading-relaxed text-slate-600 sm:text-xl">
                            Explore comprehensive guides, security details, and usage workflows designed for our suite of privacy-first browser utilities.
                        </p>

                        <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                            <div className="relative flex-1">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search guides by tool name (e.g., Merge, Compress, Extract)..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full rounded-xl border border-slate-300 bg-white py-3.5 pl-12 pr-4 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-600/20"
                                />
                            </div>
                            <div className="flex items-center gap-2 px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-600 shrink-0">
                                <SlidersHorizontal className="h-4 w-4 text-slate-500" />
                                <span>{totalVisibleTools} Guides Available</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <AdsenseAd />

            <div className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/90 backdrop-blur-md shadow-xs">
                <div className="mx-auto max-w-7xl px-6 py-3.5 sm:px-8 lg:px-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                    <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                            Filter by:
                        </span>
                        <p className="text-xs font-semibold text-slate-900">
                            {selectedCategory === "all" ? "All Categories" : selectedCategory}
                        </p>
                    </div>

                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
                        <button
                            onClick={() => setSelectedCategory("all")}
                            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer ${selectedCategory === "all"
                                ? "bg-slate-950 text-white shadow-sm"
                                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                }`}
                        >
                            All Categories
                        </button>
                        {DOC_CATEGORIES.map((cat) => (
                            <button
                                key={cat.title}
                                onClick={() => setSelectedCategory(cat.title)}
                                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer ${selectedCategory.toLowerCase() === cat.title.toLowerCase()
                                    ? "bg-slate-950 text-white shadow-sm"
                                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                    }`}
                            >
                                {cat.title}
                            </button>
                        ))}
                    </div>


                </div>
            </div>



            {searchQuery === "" && selectedCategory === "all" && (
                <section className="mx-auto max-w-7xl px-6 pt-10 sm:px-8 lg:px-10">
                    <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-br from-white via-white to-slate-50/80 p-6 shadow-sm sm:p-8">
                        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-100/60 text-green-700 shadow-inner">
                                    <Sparkles className="h-6 w-6" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-slate-950">
                                        New to FlagsDev?
                                    </h2>
                                    <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-600">
                                        Read our primer on client-side browser execution to see how your data remains completely private.
                                    </p>
                                </div>
                            </div>
                            <Link
                                href={STATIC_PATHS.about}
                                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-slate-800 hover:shadow"
                            >
                                Learn architecture
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            <section className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-10">
                {filteredCategories.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
                        <Layers className="mx-auto h-12 w-12 text-slate-300 mb-4" />
                        <h3 className="text-lg font-semibold text-slate-900">No tools found</h3>
                        <p className="text-sm text-slate-500 mt-1">
                            Try adjusting your search query or choosing a different category.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-16">
                        {filteredCategories.map((category) => {
                            if (!category) return null;
                            const CategoryIcon = category.icon || FileText;

                            return (
                                <section key={category.title} className="space-y-6">
                                    {/* Category Section Header */}
                                    <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
                                        <div className="flex items-center gap-4">
                                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white shadow-sm">
                                                <CategoryIcon className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold tracking-tight text-slate-950 flex items-center gap-2">
                                                    {category.title}
                                                    <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                                                        {category.docs.length} tools
                                                    </span>
                                                </h3>
                                                <p className="text-sm text-slate-600 mt-0.5">
                                                    {category.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                                        {category.docs.map((doc) => {
                                            const Icon = doc.icon;
                                            const targetHref = doc.help?.href || STATIC_PATHS.home;
                                            const descriptionText = doc.help?.label || `Complete step-by-step documentation for managing ${doc.label.toLowerCase()} securely inside your browser.`;

                                            return (
                                                <Link
                                                    key={doc.id || doc.label}
                                                    href={targetHref}
                                                    className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/50"
                                                >
                                                    <div>
                                                        <div className="flex items-start justify-between gap-4">
                                                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition-colors duration-300 group-hover:bg-green-50 group-hover:text-green-600">
                                                                <Icon className="h-6 w-6" />
                                                            </div>
                                                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-slate-100 text-slate-600 group-hover:bg-green-100 group-hover:text-green-800 transition-colors">
                                                                Client side
                                                            </span>
                                                        </div>

                                                        <h4 className="mt-5 text-base font-bold text-slate-950 group-hover:text-green-700 transition-colors">
                                                            {doc.label}
                                                        </h4>

                                                        <p className="mt-2 text-sm leading-relaxed text-slate-600 line-clamp-2">
                                                            {descriptionText}
                                                        </p>
                                                    </div>

                                                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                                                        <span className="text-xs font-semibold uppercase tracking-wider text-green-600 group-hover:underline">
                                                            Read guide
                                                        </span>
                                                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-50 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:bg-green-50 text-green-600">
                                                            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                                                        </div>
                                                    </div>
                                                </Link>
                                            );
                                        })}
                                    </div>

                                    <AdsenseAd />

                                </section>
                            );
                        })}
                    </div>
                )}
            </section>

            <section className="border-t border-slate-200/80 bg-white mt-12">
                <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-10">
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-600 ring-8 ring-green-50/50">
                            <ShieldCheck className="h-6 w-6" />
                        </div>
                        <div>
                            <h2 className="text-base font-bold text-slate-950">
                                Privacy first by design architecture
                            </h2>
                            <p className="mt-1 max-w-3xl text-sm leading-relaxed text-slate-600">
                                Whether you are managing 5 or 100+ tools, FlagsDev maintains zero server side uploads for supported client processes. Your data stays entirely on your machine.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}