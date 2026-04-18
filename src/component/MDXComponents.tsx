import Image from "next/image";
import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { highlight } from "sugar-high";
import { SITE_CONSTANTS } from "@/constants";
import { REGEX } from "@/constants/regex";
import { slugify } from "@/utils";
import { CopyCodeBlock } from "./CopyCodeBlock";

function getHeadingText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(getHeadingText).join("");
  }
  if (node && typeof node === "object" && "props" in node && node.props) {
    return getHeadingText((node.props as { children?: ReactNode }).children);
  }
  return "";
}

function getHeadingSlug(children: ReactNode): string {
  return getHeadingText(children);
}

type HeadingProps = ComponentPropsWithoutRef<"h1">;
type ParagraphProps = ComponentPropsWithoutRef<"p">;
type ListProps = ComponentPropsWithoutRef<"ul">;
type ListItemProps = ComponentPropsWithoutRef<"li">;
type BlockquoteProps = ComponentPropsWithoutRef<"blockquote">;

const components = {
  h1: (props: HeadingProps) => (
    <h1
      className="font-medium text-2xl text-zinc-900 sm:text-4xl pt-6 mb-0! wrap-break-words dark:text-zinc-100"
      {...props}
    />
  ),
  h2: ({ children, className, ...props }: HeadingProps) => {
    const slug = slugify(getHeadingSlug(children));
    const headingClassName = [
      "font-medium mt-6 mb-2 text-xl sm:mt-8 sm:mb-3 sm:text-2xl scroll-mt-20 wrap-break-words max-w-full",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <h2 id={slug} className={headingClassName} {...props}>
        <Link
          href={`#${slug}`}
          className="group inline-flex max-w-full min-w-0 cursor-pointer items-center gap-1.5 no-underline outline-offset-2 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-blue-500 dark:focus-visible:outline-blue-400"
        >
          <span className="min-w-0 wrap-break-words">{children}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4 shrink-0 text-zinc-700 opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100 dark:text-zinc-300"
            aria-hidden
          >
            <title>Permalink</title>
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
        </Link>
      </h2>
    );
  },
  h3: ({ children, ...props }: HeadingProps) => {
    const slug = slugify(getHeadingSlug(children));
    return (
      <h3
        id={slug}
        className="font-medium mt-6 mb-2 text-base scroll-mt-6 sm:mt-8 sm:mb-3 sm:text-lg wrap-break-words"
        {...props}
      >
        {children}
      </h3>
    );
  },
  p: (props: ParagraphProps) => (
    <p
      className="text-zinc-700 dark:text-zinc-300 text-[15px] sm:text-base wrap-break-words"
      {...props}
    />
  ),
  ul: (props: ListProps) => (
    <ul
      className="text-zinc-700 dark:text-zinc-300 list-disc pl-5 space-y-1"
      {...props}
    />
  ),
  li: (props: ListItemProps) => <li className="pl-1" {...props} />,
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-medium" {...props} />
  ),
  pre: (props: ComponentPropsWithoutRef<"pre">) => <CopyCodeBlock {...props} />,
  code: ({
    children,
    className,
    ...props
  }: ComponentPropsWithoutRef<"code">) => {
    const isCodeBlock = className?.includes("language-");
    if (isCodeBlock) {
      const codeHTML = highlight(children as string);
      return (
        <code
          className={className}
          dangerouslySetInnerHTML={{ __html: codeHTML }}
          {...props}
        />
      );
    }
    const text =
      typeof children === "string"
        ? children.replace(REGEX.BACKTICKS, "")
        : children;
    return (
      <code className={`${className || ""} wrap-break-words`} {...props}>
        {text}
      </code>
    );
  },
  inlineCode: (props: ComponentPropsWithoutRef<"code">) => {
    const { children, className, ...rest } = props;
    const text =
      typeof children === "string"
        ? String(children).replace(REGEX.BACKTICKS, "")
        : children;
    return (
      <code className={`${className || ""} wrap-break-words`} {...rest}>
        {text}
      </code>
    );
  },
  blockquote: (props: BlockquoteProps) => (
    <blockquote
      className="ml-[0.075em] border-l-3 border-zinc-300 pl-3 sm:pl-4 text-[15px] sm:text-base text-zinc-600 **:text-zinc-600! dark:border-zinc-600 dark:text-zinc-400 dark:**:text-zinc-400!"
      {...props}
    />
  ),
  Image: (
    props: ComponentPropsWithoutRef<typeof Image> & {
      width?: number;
      height?: number;
    }
  ) => {
    const { width = 800, height = 450, ...rest } = props;
    return (
      <Image
        width={width}
        height={height}
        unoptimized
        {...rest}
        className="rounded-md max-w-full h-auto"
      />
    );
  },
  DateStamp: ({ children, ...props }: ComponentPropsWithoutRef<"p">) => (
    <p className="text-zinc-600 dark:text-zinc-500 text-sm pb-4" {...props}>
      {children} - {SITE_CONSTANTS.siteName}
    </p>
  ),
};

declare global {
  type MDXProvidedComponents = typeof components;
}

export const MDXComponents = (): MDXProvidedComponents => {
  return components;
};
