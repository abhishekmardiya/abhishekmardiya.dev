import Image from "next/image";
import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { highlight } from "sugar-high";
import { SITE_CONSTANTS } from "@/constants";
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
      className="font-medium text-2xl text-zinc-200 sm:text-4xl pt-6 mb-0!"
      {...props}
    />
  ),
  h2: ({ children, ...props }: HeadingProps) => {
    const slug = slugify(getHeadingSlug(children));

    return (
      <h2
        id={slug}
        className="group text-zinc-200 font-medium mt-6 mb-2 text-xl sm:mt-8 sm:mb-3 sm:text-2xl scroll-mt-6 flex items-center gap-2 cursor-pointer max-w-fit"
        {...props}
      >
        <Link
          href={`#${slug}`}
          className="ml-1 inline-flex shrink-0 items-center gap-2 justify-center rounded p-0.5 no-underline"
          aria-label={`Link to section: ${getHeadingSlug(children)}`}
        >
          <span>{children}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
            aria-hidden
          >
            <title>Link to section</title>
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
        className="text-zinc-200 font-medium mt-6 mb-2 text-base scroll-mt-6 sm:mt-8 sm:mb-3 sm:text-lg"
        {...props}
      >
        {children}
      </h3>
    );
  },
  p: (props: ParagraphProps) => (
    <p className="text-zinc-300 text-[15px] sm:text-base" {...props} />
  ),
  ul: (props: ListProps) => (
    <ul className="text-zinc-300 list-disc pl-5 space-y-1" {...props} />
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
      typeof children === "string" ? children.replace(/^`|`$/g, "") : children;
    return (
      <code className={className} {...props}>
        {text}
      </code>
    );
  },
  inlineCode: (props: ComponentPropsWithoutRef<"code">) => {
    const { children, ...rest } = props;
    const text =
      typeof children === "string"
        ? String(children).replace(/^`|`$/g, "")
        : children;
    return <code {...rest}>{text}</code>;
  },
  blockquote: (props: BlockquoteProps) => (
    <blockquote
      className="ml-[0.075em] border-l-3 border-zinc-600 pl-3 sm:pl-4 text-[15px] sm:text-base text-zinc-400 **:text-zinc-400!"
      {...props}
    />
  ),
  Image: (
    props: ComponentPropsWithoutRef<typeof Image> & {
      width?: number;
      height?: number;
    },
  ) => {
    const { width = 800, height = 450, ...rest } = props;
    return (
      <Image
        width={width}
        height={height}
        unoptimized
        {...rest}
        className="rounded-md"
      />
    );
  },
  DateStamp: ({ children, ...props }: ComponentPropsWithoutRef<"p">) => (
    <p className="text-zinc-500 text-sm pb-4" {...props}>
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
