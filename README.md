# 📄 Markdown → PDF Converter

A beautiful, full-featured **Markdown to PDF converter** that runs entirely in your browser. Paste your Markdown, preview it live, and export it as a professionally formatted PDF — no server required.

![Built with React](https://img.shields.io/badge/Built%20with-React-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178c6)
![No Server](https://img.shields.io/badge/No%20Server-Required-brightgreen)

---

## ✨ Features

### Markdown Rendering
- **Headings** — H1 through H6 with proper hierarchy
- **Text formatting** — Bold, italic, strikethrough, inline code
- **Lists** — Ordered, unordered, nested, and task/checkbox lists
- **Blockquotes** — Styled callout blocks
- **Code blocks** — Syntax-highlighted for 15+ languages
- **Tables** — Properly formatted with headers and alignment
- **Links** — Clickable, with external link detection
- **Images** — With graceful error handling for broken images
- **Horizontal rules** — Visual section dividers
- **Escaped characters** — Full Markdown escape support

### Code Highlighting
Syntax highlighting powered by [highlight.js](https://highlightjs.org/) with support for:
- C#, JavaScript, TypeScript, Python, SQL
- HTML, CSS, JSON, Bash, YAML, Markdown
- And many more languages

### PDF Export
- **Two export modes:**
  - 🖨️ **Print to PDF** — Uses the browser's native print dialog for pixel-perfect output with selectable text and clickable links
  - 📥 **Download PDF** — Generates a PDF file directly using html2pdf.js
- **Table of Contents** — Auto-generated from headings
- **Page numbers** — Toggleable footer
- **Custom metadata** — Set title and author
- **Theme selection** — Light or dark mode preview
- **Page size** — A4 or US Letter
- **Adjustable margins** — Fine-tune spacing

### Editor Features
- **Split-pane layout** — Side-by-side editor and preview
- **Live preview** — See changes as you type
- **File upload** — Load `.md` files from your computer
- **Copy to clipboard** — Quick copy of rendered HTML
- **Clear editor** — Start fresh with one click
- **Word & character count** — Track document length
- **Responsive design** — Works on desktop and tablet

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd markdown-to-pdf

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Usage

1. **Open the app** in your browser (default: `http://localhost:5173`)
2. **Write or paste** your Markdown in the left panel
3. **Preview** the rendered output in the right panel
4. **Configure** export options in the settings panel:
   - Toggle Table of Contents
   - Set document title and author
   - Choose theme (light/dark)
   - Select page size (A4/Letter)
   - Adjust margins
   - Toggle page numbers
5. **Export** using either:
   - **Print to PDF** — Best quality, selectable text, clickable links
   - **Download PDF** — Direct file download

---

## 📋 Supported Markdown Features

| Feature | Syntax | Status |
|---------|--------|--------|
| Headings | `# H1` through `###### H6` | ✅ |
| Bold | `**text**` | ✅ |
| Italic | `*text*` | ✅ |
| Strikethrough | `~~text~~` | ✅ |
| Inline Code | `` `code` `` | ✅ |
| Code Blocks | ```` ```lang ```` | ✅ |
| Syntax Highlighting | Language-tagged code blocks | ✅ |
| Unordered Lists | `- item` | ✅ |
| Ordered Lists | `1. item` | ✅ |
| Nested Lists | Indented items | ✅ |
| Task Lists | `- [x] done` | ✅ |
| Blockquotes | `> quote` | ✅ |
| Horizontal Rules | `---` | ✅ |
| Links | `[text](url)` | ✅ |
| Images | `![alt](src)` | ✅ |
| Tables | Pipe syntax | ✅ |
| Escaped Characters | `\*not bold\*` | ✅ |

---

## 🎨 Themes

The converter supports two themes:

- **Light** — Clean white background, ideal for printing
- **Dark** — Dark background with light text, great for screen viewing

The theme affects both the preview and the exported PDF.

---

## 📐 Page Layout

Generated PDFs use professional document formatting:

- **Page size:** A4 (210 × 297mm) or US Letter (215.9 × 279.4mm)
- **Margins:** Configurable (default: 15mm)
- **Typography:** System font stack for body, monospace for code
- **Page breaks:** Automatic, avoiding breaks inside code blocks, tables, and headings
- **Page numbers:** Optional footer with page numbering

---

## 🏗️ Architecture

```
src/
├── App.tsx                      # Main application component
├── main.tsx                     # Entry point
├── index.css                    # Global styles + Markdown rendering CSS
├── components/
│   └── MarkdownRenderer.tsx     # Markdown → HTML renderer with custom components
├── utils/
│   ├── markdown.ts              # TOC generation, heading extraction, preprocessing
│   └── pdf.ts                   # PDF generation utilities (html2pdf.js wrapper)
└── types/
    └── html2pdf.d.ts            # TypeScript declarations for html2pdf.js
```

### Key Libraries

| Library | Purpose |
|---------|---------|
| [React](https://react.dev) | UI framework |
| [react-markdown](https://github.com/remarkjs/react-markdown) | Markdown parsing and rendering |
| [remark-gfm](https://github.com/remarkjs/remark-gfm) | GitHub Flavored Markdown support (tables, task lists, strikethrough) |
| [rehype-highlight](https://github.com/rehypejs/rehype-highlight) | Code syntax highlighting |
| [html2pdf.js](https://github.com/eKoopmans/html2-pdf.js) | Client-side PDF generation |
| [highlight.js](https://highlightjs.org) | Syntax highlighting engine |
| [lucide-react](https://lucide.dev) | Icon library |
| [Tailwind CSS](https://tailwindcss.com) | Utility-first CSS |

---

## 🌐 Unicode & Internationalization

The converter fully supports Unicode text, including:
- Arabic (العربية)
- Chinese (中文)
- Japanese (日本語)
- Korean (한국어)
- Emoji (🎉📄✨)
- Mixed RTL/LTR content

The system font stack ensures proper glyph rendering across platforms.

---

## 🖨️ Print vs Download — Which to Use?

### Print to PDF (Recommended)
- ✅ Selectable, searchable text
- ✅ Clickable hyperlinks
- ✅ Best typography quality
- ✅ Smaller file size
- ✅ Native browser rendering
- ⚠️ Opens browser print dialog

### Download PDF
- ✅ Direct file save, no dialog
- ✅ Works in automated workflows
- ⚠️ Text rendered as images (not selectable)
- ⚠️ Larger file size
- ⚠️ Links may not be clickable

**For most use cases, "Print to PDF" gives the best results.**

---

## 🔧 Configuration

### CLI / Build Options

```bash
# Development with hot reload
npm run dev

# Production build
npm run build

# Type checking
npm run typecheck
```

### In-App Settings

| Setting | Description | Default |
|---------|-------------|---------|
| Table of Contents | Auto-generate TOC from headings | Off |
| Title | Document title (PDF metadata) | "Markdown Document" |
| Author | Document author (PDF metadata) | "" |
| Theme | Light or Dark | Light |
| Page Size | A4 or Letter | A4 |
| Margins | Page margin in mm | 15 |
| Page Numbers | Show page numbers in footer | On |

---

## 🐛 Troubleshooting

### PDF looks different from preview
The "Download PDF" mode renders the page as an image. Use "Print to PDF" for exact fidelity.

### Images not showing in PDF
- Images must be accessible via URL (the app runs in a browser)
- For local images, use base64 data URIs or host them online
- Broken images show a placeholder with the filename

### Code block overflow
- Long lines wrap automatically in the PDF
- For very wide code, consider breaking it into shorter lines

### Table doesn't fit on page
- Tables automatically wrap text within cells
- Very wide tables may need fewer columns

### Large documents are slow
- The preview updates in real-time; very large documents may lag slightly
- For very large documents, consider splitting into sections

---

## 📝 Example Usage

### Quick Start
1. Open the app
2. Paste your Markdown
3. Click "Print to PDF" → Save as PDF

### With TOC
1. Open settings panel
2. Enable "Table of Contents"
3. Export — TOC will be auto-generated from your headings

### Custom Styling
1. Choose your preferred theme (Light/Dark)
2. Adjust margins if needed
3. Set title and author for PDF metadata
4. Export

---

## 📄 License

MIT License — free for personal and commercial use.

---

## 🙏 Acknowledgments

- [react-markdown](https://github.com/remarkjs/react-markdown) for excellent Markdown rendering
- [highlight.js](https://highlightjs.org) for syntax highlighting
- [html2pdf.js](https://github.com/eKoopmans/html2-pdf.js) for client-side PDF generation
- [lucide](https://lucide.dev) for beautiful icons
