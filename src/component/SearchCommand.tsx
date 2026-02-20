"use client";

import * as Dialog from "@radix-ui/react-dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "cmdk";
import FlexSearch, { type Index } from "flexsearch";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

type SearchPage = {
  type: "page";
  id: string;
  title: string;
  slug: string;
  excerpt: string;
};

type SearchSection = {
  type: "section";
  id: string;
  parentSlug: string;
  parentTitle: string;
  heading: string;
  snippet: string;
};

type SearchDoc = SearchPage | SearchSection;

const DocumentIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <title>Document</title>
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
  </svg>
);

const SearchIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <title>Search</title>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const HashIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <title>Section</title>
    <path d="M4 9h16" />
    <path d="M4 15h16" />
    <path d="M10 3L8 21" />
    <path d="M16 3l-2 18" />
  </svg>
);

export function SearchCommand() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [docs, setDocs] = useState<SearchDoc[]>([]);
  const [index, setIndex] = useState<Index | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function loadIndex() {
      const res = await fetch("/search-index.json");
      const data = (await res.json()) as SearchDoc[];
      setDocs(data);

      const idx = new FlexSearch.Index({ tokenize: "forward" });
      data.forEach((doc, i) => {
        const searchText =
          doc.type === "page"
            ? `${doc.title} ${doc.excerpt}`
            : `${doc.parentTitle} ${doc.heading} ${doc.snippet}`;
        idx.add(i, searchText);
      });
      setIndex(idx);
    }
    loadIndex();
  }, []);

  const groupedResults = useMemo(() => {
    if (!query.trim()) {
      return docs
        .filter((d): d is SearchPage => d.type === "page")
        .map((page) => ({
          slug: page.slug,
          title: page.title,
          excerpt: page.excerpt,
          sections: [] as SearchSection[],
        }));
    }
    if (!index) {
      return [];
    }
    const ids = index.search(query, { limit: 25 }) as number[];
    const matched = ids.map((i) => docs[i]).filter(Boolean) as SearchDoc[];

    const groupMap = new Map<
      string,
      {
        slug: string;
        title: string;
        excerpt: string;
        sections: SearchSection[];
      }
    >();

    for (const doc of matched) {
      if (doc.type === "page") {
        const existing = groupMap.get(doc.slug);
        groupMap.set(doc.slug, {
          slug: doc.slug,
          title: doc.title,
          excerpt: doc.excerpt,
          sections: existing?.sections ?? [],
        });
      } else {
        const existing = groupMap.get(doc.parentSlug);
        if (existing) {
          existing.sections.push(doc);
        } else {
          groupMap.set(doc.parentSlug, {
            slug: doc.parentSlug,
            title: doc.parentTitle,
            excerpt: "",
            sections: [doc],
          });
        }
      }
    }

    return Array.from(groupMap.values());
  }, [query, docs, index]);

  const handleSelect = useCallback(
    (slug: string) => {
      setOpen(false);
      setQuery("");
      router.push(slug);
    },
    [router],
  );

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setOpen(true);
        }}
        className="inline-flex min-w-fit items-center justify-between gap-2 rounded-md border border-zinc-700 bg-zinc-900/80 px-4 py-2 text-sm text-zinc-400 transition-colors hover:border-zinc-600 hover:text-zinc-200 cursor-pointer sm:gap-10"
        aria-label="Search blog (⌘K)"
      >
        <span className="flex items-center gap-2">
          <SearchIcon className="size-4 shrink-0 sm:hidden" />
          Search blog...
        </span>
        <kbd className="hidden font-mono text-xs sm:inline-block">⌘K</kbd>
      </button>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60" />
          <Dialog.Content
            className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-140 -translate-x-1/2 -translate-y-1/2 rounded-lg border border-zinc-700 bg-zinc-900 p-0 shadow-xl"
            aria-describedby={undefined}
          >
            <Dialog.Title className="sr-only">Search</Dialog.Title>
            <Command shouldFilter={false} label="Search">
              <CommandInput
                placeholder="Search..."
                value={query}
                onValueChange={setQuery}
                className="border-b border-zinc-800 px-4 py-3 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-0 min-w-full"
              />
              <CommandList className="max-h-80 overflow-y-auto p-2">
                <CommandEmpty className="py-6 text-center text-sm text-zinc-500">
                  No results found.
                </CommandEmpty>
                {groupedResults.map((group) => (
                  <CommandGroup key={group.slug}>
                    <CommandItem
                      value={`${group.slug}-page`}
                      onSelect={() => {
                        handleSelect(group.slug);
                      }}
                      className="flex cursor-pointer flex-col items-start gap-0.5 rounded-md px-3 py-2.5 pl-6 text-zinc-200 aria-selected:bg-zinc-800 aria-selected:text-zinc-100"
                    >
                      <span className="flex items-center gap-2 font-medium">
                        <DocumentIcon className="size-4 shrink-0 text-zinc-500" />
                        {group.title}
                      </span>
                      {group.excerpt && (
                        <span className="line-clamp-1 pl-6 text-xs text-zinc-400">
                          {group.excerpt}
                        </span>
                      )}
                    </CommandItem>
                    {group.sections.map((section) => (
                      <CommandItem
                        key={section.id}
                        value={section.id}
                        onSelect={() => {
                          handleSelect(section.id);
                        }}
                        className="flex cursor-pointer flex-col items-start gap-0.5 rounded-md px-3 py-2.5 pl-6 text-zinc-200 aria-selected:bg-zinc-800 aria-selected:text-zinc-100"
                      >
                        <span className="flex items-center gap-2 font-medium">
                          <HashIcon className="size-4 shrink-0 text-zinc-500" />
                          {section.heading}
                        </span>
                        <span className="line-clamp-1 pl-6 text-xs text-zinc-400">
                          {section.snippet}
                        </span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ))}
              </CommandList>
            </Command>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
