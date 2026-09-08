import React, { useState, useRef, useCallback } from 'react';
import MarkdownRenderer from './components/MarkdownRenderer';
import { preprocessMarkdown } from './utils/markdown';
import { generatePdf, type PdfOptions } from './utils/pdf';
import {
  FileText,
  Download,
  Settings,
  Upload,
  Eye,
  Edit3,
  X,
  Check,
  AlertCircle,
  Loader2,
  BookOpen,
  Palette,
  Hash,
  User,
  FileType,
  Ruler,
  Printer,
  ChevronDown,
  Copy,
  Trash2,
} from 'lucide-react';

const EXAMPLE_MARKDOWN = `# Markdown to PDF Converter — Feature Demo

Welcome to the **Markdown to PDF Converter**! This document demonstrates all supported features.

---

## Text Formatting

You can write **bold text**, *italic text*, and ~~strikethrough text~~. You can also combine them: ***bold and italic***.

Inline \`code\` looks like this. Here's a [link to GitHub](https://github.com).

---

## Lists

### Unordered List

- First item
- Second item
  - Nested item A
  - Nested item B
    - Deep nested item
- Third item

### Ordered List

1. Step one
2. Step two
   1. Sub-step A
   2. Sub-step B
3. Step three

### Task List

- [x] Write the markdown parser
- [x] Add syntax highlighting
- [ ] Add more themes
- [ ] Write documentation

---

## Blockquotes

> "The best way to predict the future is to invent it."
> — Alan Kay

> **Note:** Blockquotes can contain **formatted** text and even \`code\`.

---

## Code Blocks

### JavaScript

\`\`\`javascript
// Fibonacci sequence generator
function* fibonacci() {
  let [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

const fib = fibonacci();
for (let i = 0; i < 10; i++) {
  console.log(fib.next().value);
}
\`\`\`

### Python

\`\`\`python
from dataclasses import dataclass
from typing import List, Optional

@dataclass
class User:
    """A user in the system."""
    id: int
    name: str
    email: str
    roles: List[str] = []
    
    def has_role(self, role: str) -> bool:
        """Check if user has a specific role."""
        return role in self.roles

# Create users
admin = User(id=1, name="Admin", email="admin@example.com", roles=["admin", "user"])
print(f"Admin has admin role: {admin.has_role('admin')}")
\`\`\`

### C#

\`\`\`csharp
using System;
using System.Collections.Generic;
using System.Linq;

namespace MyApp.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public List<string> Roles { get; set; } = new();
        
        public bool HasRole(string role) => Roles.Contains(role);
        
        public override string ToString() => $"User({Id}, {Name})";
    }
    
    public class UserService
    {
        private readonly List<User> _users = new();
        
        public User? FindByEmail(string email) =>
            _users.FirstOrDefault(u => u.Email == email);
    }
}
\`\`\`

### SQL

\`\`\`sql
-- Complex query with joins and aggregations
SELECT 
    u.name AS user_name,
    COUNT(o.id) AS order_count,
    COALESCE(SUM(o.total_amount), 0) AS total_spent,
    MAX(o.created_at) AS last_order_date
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.created_at >= '2024-01-01'
  AND u.status = 'active'
GROUP BY u.id, u.name
HAVING COUNT(o.id) > 5
ORDER BY total_spent DESC
LIMIT 10;
\`\`\`

### TypeScript

\`\`\`typescript
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
  timestamp: Date;
}

type Result<T, E = Error> = 
  | { ok: true; value: T }
  | { ok: false; error: E };

async function fetchUser(id: number): Promise<Result<ApiResponse<User>>> {
  try {
    const response = await fetch(\`/api/users/\${id}\`);
    if (!response.ok) {
      return { ok: false, error: new Error(\`HTTP \${response.status}\`) };
    }
    const data = await response.json();
    return { ok: true, value: data };
  } catch (error) {
    return { ok: false, error: error as Error };
  }
}
\`\`\`

### Bash

\`\`\`bash
#!/bin/bash
# Deploy script

set -euo pipefail

ENV=\${1:-staging}
echo "Deploying to $ENV..."

if [[ "$ENV" == "production" ]]; then
  echo "⚠️  WARNING: Deploying to PRODUCTION"
  read -p "Are you sure? (y/N) " confirm
  [[ "$confirm" == "y" ]] || exit 1
fi

npm run build
docker build -t myapp:$ENV .
docker push myapp:$ENV
echo "✅ Deployed successfully!"
\`\`\`

### JSON

\`\`\`json
{
  "name": "markdown-to-pdf",
  "version": "1.0.0",
  "features": [
    "syntax-highlighting",
    "tables",
    "code-blocks",
    "unicode-support"
  ],
  "config": {
    "pageSize": "A4",
    "margin": 15,
    "theme": "light"
  }
}
\`\`\`

### YAML

\`\`\`yaml
# Docker Compose configuration
version: '3.8'
services:
  web:
    image: nginx:latest
    ports:
      - "80:80"
    volumes:
      - ./html:/usr/share/nginx/html
    environment:
      - NODE_ENV=production
    restart: unless-stopped
\`\`\`

---

## Tables

### Simple Table

| Feature | Status | Priority |
|---------|--------|----------|
| Headings | ✅ Done | High |
| Code Blocks | ✅ Done | High |
| Tables | ✅ Done | High |
| Images | ✅ Done | Medium |
| TOC | ✅ Done | Medium |
| Themes | 🔄 WIP | Low |

### Complex Table

| Language | Paradigm | Typing | Year | Popular For |
|----------|----------|--------|------|-------------|
| Python | Multi | Dynamic | 1991 | Data Science, AI |
| TypeScript | Multi | Static | 2012 | Web Development |
| C# | Multi | Static | 2000 | Enterprise, Games |
| Rust | Multi | Static | 2010 | Systems, Safety |
| Go | Compiled | Static | 2009 | Cloud, Microservices |

---

## Unicode & Internationalization

### Arabic

مرحبا بالعالم! هذا نص عربي.

### Mixed Content

The word "hello" in different languages:
- Arabic: مرحبا
- Chinese: 你好
- Japanese: こんにちは
- Korean: 안녕하세요
- Russian: Привет
- Greek: Γεια σου
- Hebrew: שלום

### Mathematical Symbols

The formula for the area of a circle: A = πr²

Common symbols: → ← ↑ ↓ ↔ ≤ ≥ ≠ ≈ ∞ ∑ ∏ √ ∫

---

## Images

![Placeholder](https://via.placeholder.com/600x200/2563eb/ffffff?text=Markdown+to+PDF+Converter)

---

## Long Content Test

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

### Nested Content Example

> This is a blockquote with a list inside:
> 
> - Item one
> - Item two
> - Item three
>
> And some **bold text** at the end.

---

*Generated by Markdown to PDF Converter*
`;

const App: React.FC = () => {
  const [markdown, setMarkdown] = useState(EXAMPLE_MARKDOWN);
  const [showOptions, setShowOptions] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const previewRef = useRef<HTMLDivElement>(null);
  const pdfContainerRef = useRef<HTMLDivElement>(null);
  const printRef = useRef<HTMLDivElement>(null);

  // PDF Options
  const [pdfOptions, setPdfOptions] = useState({
    title: '',
    author: '',
    includeToc: false,
    includePageNumbers: true,
    theme: 'light' as 'light' | 'dark',
    pageSize: 'a4' as 'a4' | 'letter',
    margin: 15,
  });

  const showNotification = useCallback((type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  }, []);

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.md') && !file.name.endsWith('.markdown') && !file.name.endsWith('.txt')) {
      showNotification('error', 'Please upload a Markdown file (.md, .markdown, or .txt)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setMarkdown(content);
      showNotification('success', `Loaded: ${file.name}`);
    };
    reader.onerror = () => {
      showNotification('error', 'Failed to read the file');
    };
    reader.readAsText(file);
    e.target.value = '';
  }, [showNotification]);

  const handleGeneratePdf = useCallback(async () => {
    if (!pdfContainerRef.current) {
      showNotification('error', 'PDF container not available');
      return;
    }

    setIsGenerating(true);
    setShowExportMenu(false);
    try {
      await new Promise(resolve => setTimeout(resolve, 300));

      const container = pdfContainerRef.current;
      if (!container) throw new Error('PDF container not found');

      const filename = pdfOptions.title
        ? `${pdfOptions.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.pdf`
        : 'document.pdf';

      await generatePdf(container, pdfOptions, filename);
      showNotification('success', 'PDF generated successfully!');
    } catch (error) {
      console.error('PDF generation failed:', error);
      showNotification('error', 'Failed to generate PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  }, [pdfOptions, showNotification]);

  const handlePrintPdf = useCallback(() => {
    setShowExportMenu(false);
    // Use browser's print functionality for better quality
    const printContent = printRef.current;
    if (!printContent) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      showNotification('error', 'Pop-up blocked. Please allow pop-ups for this site.');
      return;
    }

    const processedMd = preprocessMarkdown(markdown, pdfOptions.includeToc);
    
    // Create a complete HTML document for printing
    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${pdfOptions.title || 'Markdown Document'}</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css">
  <style>
    @page {
      size: ${pdfOptions.pageSize === 'letter' ? 'letter' : 'A4'};
      margin: 0;
    }
    @page :first {
      margin-top: 0;
    }
    * { box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif;
      font-size: 12px;
      line-height: 1.6;
      color: #1e293b;
      max-width: 100%;
      margin: 0;
      padding: ${pdfOptions.margin}mm;
    }
    ${pdfOptions.title ? `
    .title-page {
      text-align: center;
      padding-bottom: 2em;
      margin-bottom: 2em;
      border-bottom: 2px solid #e2e8f0;
    }
    .title-page h1 { font-size: 2em; font-weight: 700; margin: 0 0 0.3em; color: #0f172a; }
    .title-page .author { font-size: 1.1em; color: #64748b; margin: 0.5em 0; }
    .title-page .date { font-size: 0.9em; color: #94a3b8; margin-top: 0.5em; }
    ` : ''}
    h1 { font-size: 1.8em; font-weight: 700; margin: 1.5em 0 0.5em; padding-bottom: 0.3em; border-bottom: 2px solid #e2e8f0; color: #0f172a; }
    h2 { font-size: 1.4em; font-weight: 600; margin: 1.4em 0 0.5em; padding-bottom: 0.25em; border-bottom: 1px solid #e2e8f0; color: #0f172a; }
    h3 { font-size: 1.2em; font-weight: 600; margin: 1.3em 0 0.4em; color: #1e293b; }
    h4 { font-size: 1.1em; font-weight: 600; margin: 1.2em 0 0.4em; color: #1e293b; }
    p { margin: 0 0 1em; }
    a { color: #2563eb; text-decoration: none; }
    strong { font-weight: 600; color: #0f172a; }
    del { text-decoration: line-through; color: #64748b; }
    blockquote { margin: 1em 0; padding: 0.5em 1em; border-left: 4px solid #2563eb; background: #f1f5f9; color: #475569; border-radius: 0 4px 4px 0; }
    blockquote p:last-child { margin-bottom: 0; }
    ul, ol { margin: 0.5em 0; padding-left: 2em; }
    li { margin-bottom: 0.3em; }
    code { font-family: 'JetBrains Mono', 'Consolas', monospace; font-size: 0.875em; padding: 0.2em 0.4em; background: #f1f5f9; border: 1px solid #e2e8f0; border-radius: 4px; color: #be185d; }
    pre { margin: 1em 0; padding: 1em; background: #1e293b; border-radius: 8px; overflow-x: auto; border: 1px solid #334155; page-break-inside: avoid; }
    pre code { padding: 0; background: transparent; border: none; border-radius: 0; color: #e2e8f0; font-size: 11px; line-height: 1.5; white-space: pre; }
    table { width: 100%; border-collapse: collapse; margin: 1em 0; font-size: 11px; border: 1px solid #e2e8f0; border-radius: 6px; overflow: hidden; page-break-inside: avoid; }
    thead { background: #f8fafc; }
    th { font-weight: 600; text-align: left; padding: 0.75em 1em; border-bottom: 2px solid #e2e8f0; color: #1e293b; }
    td { padding: 0.6em 1em; border-bottom: 1px solid #e2e8f0; color: #334155; }
    tbody tr:last-child td { border-bottom: none; }
    hr { margin: 2em 0; border: none; border-top: 2px solid #e2e8f0; }
    img { max-width: 100%; height: auto; border-radius: 6px; margin: 1em 0; }
    .task-list-item { list-style-type: none; margin-left: -1.5em; }
    .task-list-item input { margin-right: 0.5em; }
    @media print {
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      pre { page-break-inside: avoid; }
      h1, h2, h3, h4 { page-break-after: avoid; }
      table { page-break-inside: avoid; }
    }
  </style>
</head>
<body>
  ${pdfOptions.title ? `
  <div class="title-page">
    <h1>${pdfOptions.title}</h1>
    ${pdfOptions.author ? `<p class="author">by ${pdfOptions.author}</p>` : ''}
    <p class="date">${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
  </div>
  ` : ''}
  <div id="content"></div>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/marked/12.0.0/marked.min.js"><\/script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"><\/script>
  <script>
    const md = ${JSON.stringify(processedMd)};
    marked.setOptions({
      gfm: true,
      breaks: false,
      highlight: function(code, lang) {
        if (lang && hljs.getLanguage(lang)) {
          return hljs.highlight(code, { language: lang }).value;
        }
        return hljs.highlightAuto(code).value;
      }
    });
    document.getElementById('content').innerHTML = marked.parse(md);
    // Auto-print after content is rendered
    setTimeout(function() { window.print(); }, 500);
  <\/script>
</body>
</html>`;

    printWindow.document.write(html);
    printWindow.document.close();
  }, [markdown, pdfOptions, showNotification]);

  const handleCopyMarkdown = useCallback(() => {
    navigator.clipboard.writeText(markdown).then(() => {
      showNotification('success', 'Markdown copied to clipboard!');
    }).catch(() => {
      showNotification('error', 'Failed to copy to clipboard');
    });
  }, [markdown, showNotification]);

  const handleClear = useCallback(() => {
    if (markdown.trim() && !confirm('Are you sure you want to clear the editor?')) return;
    setMarkdown('');
    showNotification('success', 'Editor cleared');
  }, [markdown, showNotification]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && (file.name.endsWith('.md') || file.name.endsWith('.markdown') || file.name.endsWith('.txt'))) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setMarkdown(event.target?.result as string);
        showNotification('success', `Loaded: ${file.name}`);
      };
      reader.readAsText(file);
    } else {
      showNotification('error', 'Please drop a Markdown file (.md)');
    }
  }, [showNotification]);

  // Processed markdown for preview and PDF
  const processedMarkdown = preprocessMarkdown(markdown, pdfOptions.includeToc);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Hidden PDF container for html2pdf generation */}
      <div
        ref={pdfContainerRef}
        style={{
          position: 'absolute',
          left: '-9999px',
          top: '0',
          width: '794px',
          backgroundColor: 'white',
          padding: '40px 50px',
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif",
        }}
      >
        {pdfOptions.title && (
          <div style={{ textAlign: 'center', paddingBottom: '2em', marginBottom: '2em', borderBottom: '2px solid #e2e8f0' }}>
            <h1 style={{ fontSize: '2em', fontWeight: 700, marginBottom: '0.3em', color: '#0f172a', marginTop: 0 }}>
              {pdfOptions.title}
            </h1>
            {pdfOptions.author && (
              <p style={{ fontSize: '1.1em', color: '#64748b', margin: '0.5em 0' }}>by {pdfOptions.author}</p>
            )}
            <p style={{ fontSize: '0.9em', color: '#94a3b8', marginTop: '0.5em' }}>
              {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        )}
        <MarkdownRenderer content={processedMarkdown} />
      </div>

      {/* Hidden print reference */}
      <div ref={printRef} style={{ display: 'none' }}>
        <MarkdownRenderer content={processedMarkdown} />
      </div>

      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <FileText className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Markdown to PDF</h1>
            <p className="text-xs text-gray-500 hidden sm:block">Convert Markdown to beautifully formatted PDFs</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* File Upload */}
          <label className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors">
            <Upload className="w-4 h-4" />
            <span className="hidden sm:inline">Upload</span>
            <input
              type="file"
              accept=".md,.markdown,.txt"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>

          {/* Editor Actions */}
          <button
            onClick={handleCopyMarkdown}
            className="flex items-center gap-1.5 px-2.5 py-2 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            title="Copy Markdown"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleClear}
            className="flex items-center gap-1.5 px-2.5 py-2 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            title="Clear editor"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>

          {/* Options Toggle */}
          <button
            onClick={() => setShowOptions(!showOptions)}
            className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${
              showOptions ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">Options</span>
          </button>

          {/* Export Button with dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              disabled={isGenerating}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 rounded-lg transition-colors"
            >
              {isGenerating ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              <span className="hidden sm:inline">{isGenerating ? 'Generating...' : 'Export'}</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {showExportMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowExportMenu(false)} />
                <div className="absolute right-0 top-full mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-1 fade-in">
                  <button
                    onClick={handleGeneratePdf}
                    disabled={isGenerating}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Download className="w-4 h-4 text-blue-600" />
                    <div className="text-left">
                      <div className="font-medium">Download PDF</div>
                      <div className="text-xs text-gray-500">Using html2pdf.js</div>
                    </div>
                  </button>
                  <button
                    onClick={handlePrintPdf}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Printer className="w-4 h-4 text-green-600" />
                    <div className="text-left">
                      <div className="font-medium">Print / Save as PDF</div>
                      <div className="text-xs text-gray-500">Higher quality, selectable text</div>
                    </div>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Options Panel */}
      {showOptions && (
        <div className="bg-white border-b border-gray-200 px-4 py-4 fade-in">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Settings className="w-4 h-4" />
                PDF Options
              </h3>
              <button onClick={() => setShowOptions(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Title */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-medium text-gray-600 mb-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  Document Title
                </label>
                <input
                  type="text"
                  value={pdfOptions.title}
                  onChange={(e) => setPdfOptions({ ...pdfOptions, title: e.target.value })}
                  placeholder="Optional title page"
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Author */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-medium text-gray-600 mb-1.5">
                  <User className="w-3.5 h-3.5" />
                  Author
                </label>
                <input
                  type="text"
                  value={pdfOptions.author}
                  onChange={(e) => setPdfOptions({ ...pdfOptions, author: e.target.value })}
                  placeholder="Author name"
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Page Size */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-medium text-gray-600 mb-1.5">
                  <FileType className="w-3.5 h-3.5" />
                  Page Size
                </label>
                <select
                  value={pdfOptions.pageSize}
                  onChange={(e) => setPdfOptions({ ...pdfOptions, pageSize: e.target.value as 'a4' | 'letter' })}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="a4">A4 (210 × 297 mm)</option>
                  <option value="letter">Letter (8.5 × 11 in)</option>
                </select>
              </div>

              {/* Margin */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-medium text-gray-600 mb-1.5">
                  <Ruler className="w-3.5 h-3.5" />
                  Margin ({pdfOptions.margin}mm)
                </label>
                <input
                  type="range"
                  min="5"
                  max="30"
                  value={pdfOptions.margin}
                  onChange={(e) => setPdfOptions({ ...pdfOptions, margin: Number(e.target.value) })}
                  className="w-full mt-2 accent-blue-600"
                />
              </div>
            </div>

            {/* Checkboxes */}
            <div className="flex flex-wrap gap-6 mt-4 pt-3 border-t border-gray-100">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={pdfOptions.includeToc}
                    onChange={(e) => setPdfOptions({ ...pdfOptions, includeToc: e.target.checked })}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                </div>
                <span className="text-sm text-gray-700 flex items-center gap-1.5 group-hover:text-gray-900">
                  <Hash className="w-3.5 h-3.5 text-gray-400" />
                  Table of Contents
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={pdfOptions.includePageNumbers}
                  onChange={(e) => setPdfOptions({ ...pdfOptions, includePageNumbers: e.target.checked })}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900">Page Numbers</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={pdfOptions.theme === 'dark'}
                  onChange={(e) => setPdfOptions({ ...pdfOptions, theme: e.target.checked ? 'dark' : 'light' })}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 flex items-center gap-1.5 group-hover:text-gray-900">
                  <Palette className="w-3.5 h-3.5 text-gray-400" />
                  Dark Code Theme
                </span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Tab Switcher */}
      <div className="lg:hidden flex border-b border-gray-200 bg-white">
        <button
          onClick={() => setActiveTab('editor')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
            activeTab === 'editor'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500'
          }`}
        >
          <Edit3 className="w-4 h-4" />
          Editor
        </button>
        <button
          onClick={() => setActiveTab('preview')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
            activeTab === 'preview'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500'
          }`}
        >
          <Eye className="w-4 h-4" />
          Preview
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Editor Panel */}
        <div className={`${activeTab === 'editor' ? 'flex' : 'hidden'} lg:flex flex-col w-full lg:w-1/2 border-r border-gray-200`}>
          <div className="px-4 py-2 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide flex items-center gap-1.5">
              <Edit3 className="w-3 h-3" />
              Markdown
            </span>
            <span className="text-xs text-gray-400">{markdown.split('\n').length} lines · {markdown.length} chars</span>
          </div>
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="editor-textarea flex-1 w-full p-4 bg-white text-gray-800 border-0 focus:outline-none"
            placeholder="Type or paste your Markdown here, or drag & drop a .md file..."
            spellCheck={false}
          />
        </div>

        {/* Preview Panel */}
        <div className={`${activeTab === 'preview' ? 'flex' : 'hidden'} lg:flex flex-col w-full lg:w-1/2`}>
          <div className="px-4 py-2 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide flex items-center gap-1.5">
              <Eye className="w-3 h-3" />
              Preview
            </span>
            <span className="text-xs text-gray-400">Live render</span>
          </div>
          <div className="flex-1 overflow-auto bg-white p-6">
            <div ref={previewRef} className="max-w-none">
              {markdown.trim() ? (
                <MarkdownRenderer content={processedMarkdown} />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <FileText className="w-12 h-12 mb-3 opacity-50" />
                  <p className="text-sm">Start typing or upload a Markdown file</p>
                  <p className="text-xs mt-1">Preview will appear here</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div className={`fixed bottom-4 right-4 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg fade-in z-50 ${
          notification.type === 'success'
            ? 'bg-green-600 text-white'
            : 'bg-red-600 text-white'
        }`}>
          {notification.type === 'success' ? (
            <Check className="w-4 h-4" />
          ) : (
            <AlertCircle className="w-4 h-4" />
          )}
          <span className="text-sm font-medium">{notification.message}</span>
          <button onClick={() => setNotification(null)} className="ml-2 opacity-70 hover:opacity-100">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
