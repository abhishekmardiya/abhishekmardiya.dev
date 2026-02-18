import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { highlight } from "sugar-high";

type HeadingProps = ComponentPropsWithoutRef<"h1">;
type ParagraphProps = ComponentPropsWithoutRef<"p">;
type ListProps = ComponentPropsWithoutRef<"ul">;
type ListItemProps = ComponentPropsWithoutRef<"li">;
type AnchorProps = ComponentPropsWithoutRef<"a">;
type BlockquoteProps = ComponentPropsWithoutRef<"blockquote">;

const components = {
  h1: (props: HeadingProps) => (
    <h1
      className="font-medium text-2xl text-zinc-200 pt-8 mb-6 sm:text-4xl sm:pt-12 sm:mb-10"
      {...props}
    />
  ),
  h2: (props: HeadingProps) => (
    <h2
      className="text-zinc-200 font-medium mt-6 mb-2 text-lg sm:mt-8 sm:mb-3 sm:text-xl"
      {...props}
    />
  ),
  h3: (props: HeadingProps) => (
    <h3
      className="text-zinc-200 font-medium mt-6 mb-2 text-base sm:mt-8 sm:mb-3 sm:text-lg"
      {...props}
    />
  ),
  h4: (props: HeadingProps) => <h4 className="font-medium" {...props} />,
  p: (props: ParagraphProps) => (
    <p className="text-zinc-300 text-[15px] leading-relaxed sm:text-base sm:leading-snug" {...props} />
  ),
  ol: (props: ListProps) => (
    <ol className="text-zinc-300 list-decimal pl-5 space-y-2" {...props} />
  ),
  ul: (props: ListProps) => (
    <ul className="text-zinc-300 list-disc pl-5 space-y-1" {...props} />
  ),
  li: (props: ListItemProps) => <li className="pl-1" {...props} />,
  em: (props: ComponentPropsWithoutRef<"em">) => (
    <em className="font-medium" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-medium" {...props} />
  ),
  a: ({ href, children, ...props }: AnchorProps) => {
    const className = "underline hover:text-blue-500";
    if (href?.startsWith("/")) {
      return (
        <Link href={href} className={className} {...props}>
          {children}
        </Link>
      );
    }

    if (href?.startsWith("#")) {
      return (
        <Link href={href} className={className} {...props}>
          {children}
        </Link>
      );
    }

    return (
      <Link
        href={href || "/"}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...props}
      >
        {children}
      </Link>
    );
  },
  code: ({ children, className, ...props }: ComponentPropsWithoutRef<"code">) => {
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
      typeof children === "string" ? String(children).replace(/^`|`$/g, "") : children;
    return <code {...rest}>{text}</code>;
  },
  Table: ({ data }: { data: { headers: string[]; rows: string[][] } }) => (
    <table>
      <thead>
        <tr>
          {data.headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.rows.map((row, index) => (
          <tr key={index}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ),
  blockquote: (props: BlockquoteProps) => (
    <blockquote
      className="ml-[0.075em] border-l-3 border-zinc-600 pl-3 sm:pl-4 text-zinc-300 text-[15px] sm:text-base"
      {...props}
    />
  ),
};

declare global {
  type MDXProvidedComponents = typeof components;
}

export const MDXComponents = (): MDXProvidedComponents => {
  return components;
};
