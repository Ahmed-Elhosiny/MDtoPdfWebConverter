export interface TocItem {
  level: number;
  text: string;
  id: string;
}

/**
 * Extract headings from markdown content for TOC generation
 */
export function extractHeadings(markdown: string): TocItem[] {
  const headings: TocItem[] = [];
  const lines = markdown.split('\n');
  let inCodeBlock = false;

  for (const line of lines) {
    if (line.startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    const match = line.match(/^(#{1,6})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      headings.push({ level, text, id });
    }
  }

  return headings;
}

/**
 * Generate a Table of Contents markdown string
 */
export function generateTocMarkdown(headings: TocItem[]): string {
  if (headings.length === 0) return '';

  const minLevel = Math.min(...headings.map(h => h.level));
  let toc = '## Table of Contents\n\n';

  for (const heading of headings) {
    const indent = '  '.repeat(heading.level - minLevel);
    const id = heading.text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
    toc += `${indent}- [${heading.text}](#${id})\n`;
  }

  return toc + '\n---\n\n';
}

/**
 * Preprocess markdown to add TOC if requested
 */
export function preprocessMarkdown(markdown: string, includeToc: boolean): string {
  if (!includeToc) return markdown;

  const headings = extractHeadings(markdown);
  if (headings.length < 2) return markdown;

  // Find position after first heading
  const lines = markdown.split('\n');
  let insertPos = 0;
  let foundFirstHeading = false;

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].match(/^#{1,6}\s+/) && !foundFirstHeading) {
      foundFirstHeading = true;
      insertPos = i + 1;
      // Skip any content immediately after the first heading until next heading or blank line
      while (insertPos < lines.length && lines[insertPos].trim() !== '' && !lines[insertPos].match(/^#{1,6}\s+/)) {
        insertPos++;
      }
      break;
    }
  }

  const tocMarkdown = generateTocMarkdown(headings);
  const before = lines.slice(0, insertPos).join('\n');
  const after = lines.slice(insertPos).join('\n');

  return before + '\n' + tocMarkdown + after;
}

/**
 * Resolve image paths relative to the markdown file's directory
 */
export function resolveImagePath(src: string, baseDir: string | null): string {
  if (!baseDir) return src;
  if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:')) {
    return src;
  }
  // For web usage, we can't resolve local paths, so return as-is
  return src;
}

/**
 * Slugify text for anchor links
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}
