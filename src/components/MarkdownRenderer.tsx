import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import type { Components } from 'react-markdown';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

// Custom components for rendering markdown elements
const components: Components = {
  // Handle task list items
  li({ children, ...props }) {
    const isTaskItem = React.isValidElement(children) && 
      (children as any).props?.type === 'checkbox';
    
    // Check if any child is a checkbox
    const hasCheckbox = React.Children.toArray(children).some(
      child => React.isValidElement(child) && (child as any).props?.type === 'checkbox'
    );

    if (hasCheckbox || isTaskItem) {
      return (
        <li className="task-list-item" style={{ listStyleType: 'none', marginLeft: '-1.5em' }}>
          {children}
        </li>
      );
    }
    return <li {...props}>{children}</li>;
  },
  // Handle images with error fallback
  img({ src, alt, ...props }) {
    const [hasError, setHasError] = React.useState(false);

    if (hasError) {
      return (
        <div style={{
          padding: '1em',
          border: '1px dashed #cbd5e1',
          borderRadius: '6px',
          backgroundColor: '#f8fafc',
          color: '#64748b',
          fontSize: '0.875em',
          textAlign: 'center',
          margin: '1em 0',
        }}>
          📷 Image not found: {alt || src}
        </div>
      );
    }

    return (
      <img
        src={src}
        alt={alt || ''}
        onError={() => setHasError(true)}
        style={{ maxWidth: '100%', height: 'auto' }}
        {...props}
      />
    );
  },
  // Add IDs to headings for TOC links
  h1({ children, ...props }) {
    const text = extractText(children);
    const id = slugify(text);
    return <h1 id={id} {...props}>{children}</h1>;
  },
  h2({ children, ...props }) {
    const text = extractText(children);
    const id = slugify(text);
    return <h2 id={id} {...props}>{children}</h2>;
  },
  h3({ children, ...props }) {
    const text = extractText(children);
    const id = slugify(text);
    return <h3 id={id} {...props}>{children}</h3>;
  },
  h4({ children, ...props }) {
    const text = extractText(children);
    const id = slugify(text);
    return <h4 id={id} {...props}>{children}</h4>;
  },
  h5({ children, ...props }) {
    const text = extractText(children);
    const id = slugify(text);
    return <h5 id={id} {...props}>{children}</h5>;
  },
  h6({ children, ...props }) {
    const text = extractText(children);
    const id = slugify(text);
    return <h6 id={id} {...props}>{children}</h6>;
  },
  // Make links open in new tab
  a({ children, href, ...props }) {
    const isExternal = href?.startsWith('http://') || href?.startsWith('https://');
    return (
      <a
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        {...props}
      >
        {children}
      </a>
    );
  },
};

function extractText(children: React.ReactNode): string {
  if (typeof children === 'string') return children;
  if (typeof children === 'number') return String(children);
  if (Array.isArray(children)) return children.map(extractText).join('');
  if (React.isValidElement(children) && children.props.children) {
    return extractText(children.props.children);
  }
  return '';
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = '' }) => {
  return (
    <div className={`markdown-body ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
