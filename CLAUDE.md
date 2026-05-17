# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (Vite HMR)
npm run build     # Type-check + production build (tsc -b && vite build)
npm run lint      # ESLint
npm run preview   # Preview production build
```

No test runner is configured.

## Architecture

**LabLog AI** is a Korean-language science lab report generation app (Vite + React 19 + TypeScript). The UI is entirely mock/static — no backend API calls exist yet; all data is hardcoded in page-level `MOCK_*` constants.

### Routing (`src/App.tsx`)

All routes are flat under `BrowserRouter`. Each route maps directly to a page component:

| Path | Page | Purpose |
|---|---|---|
| `/` | `HomePage` | Landing — links to upload, record, archive, drafts |
| `/upload` | `UploadPage` | Video upload entry point |
| `/record` | `RecordPage` | In-app camera recording |
| `/loading` | `LoadingPage` | Progress ring; accepts `location.state.phase` (`'upload'` \| `'analyze'`) |
| `/archive` | `ArchivePage` | Completed reports folder UI |
| `/drafts` | `DraftsPage` | In-progress reports list |
| `/report/:id` | `ReportDetailPage` | Structured science report view; `id` keys into `MOCK_REPORTS` |

### Shared components (`src/components/`)

- **`AppShell`** — full-screen wrapper with two variants: `'home'` (centered hero layout) and `'page'` (standard content layout). Most pages either use `AppShell` or replicate its structure inline.
- **`PageHeader`** — back-arrow + title bar; used on pages that sit inside `AppShell`. `backTo` defaults to `/`.
- **`LabLogLogo`** — SVG logo, only used on `HomePage`.

### Styling

Every component/page has a co-located CSS Module (`*.module.css`). Global design tokens are defined as CSS custom properties in `src/index.css`:

```
--lab-navy, --lab-lavender, --lab-white, --lab-badge,
--lab-side, --lab-paper-base, --lab-paper-mid,
--lab-text-logo, --lab-font
```

Font stack: Noto Sans KR → Apple SD Gothic Neo → system-ui. All content is in Korean.

### Data model

`ReportDetailPage` defines the `FinalReport` interface — the canonical shape for a lab report (실험제목, 실험목적, 준비물, 실험방법, 유의사항, plus student metadata). When real API integration lands, this interface is the contract to match.
