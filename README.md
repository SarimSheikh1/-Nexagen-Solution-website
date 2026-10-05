# Nexagen Solution

Redesigned in the original HTML/CSS/JavaScript architecture. No application framework, runtime dependencies, private credentials or server integration are required.

## Run and verify

Requires Node.js 22 or later. In Windows PowerShell use `npm.cmd` if execution policy blocks `npm`.

```powershell
npm.cmd install
npm.cmd run dev
```

Open http://127.0.0.1:4173. Keep the preview running in one terminal, then run these in another:

```powershell
npm.cmd run check
npm.cmd test
npm.cmd run build
```

The browser tests use installed Google Chrome at `C:/Program Files/Google/Chrome/Application/chrome.exe`. Adjust `tools/verify.mjs` if Chrome is elsewhere. No browser download is required. Production output is in `dist/`; serve that directory with any static web host. No publishing has been performed.

## Changed files and organization

- `index.html`: semantic shared header, footer, contact dock and help panel.
- `style.css`: unified tokens, responsive layout, focus states, reduced motion and reserved contact dock.
- `script.js`: hash routing, page rendering, search, filters, inquiry validation and handoff, accessible menus and local feedback.
- `content.js`: editable service offerings, genuine partner names/roles/photos, client logo collection and editorial drafts, extracted from the supplied source.
- `package.json`, `package-lock.json`: development and verification commands; Playwright is development-only.
- `tools/serve.mjs`, `tools/build.mjs`, `tools/verify.mjs`: preview, production packaging and browser verification.
- `robots.txt`, `sitemap.xml`, `.env.example`, `.gitignore`: static-site support and configuration notes.
- `qa/verification.json`, `qa/screenshots/`: actual browser results and representative screenshots.
- `reference-original/`: unchanged original HTML, CSS and JavaScript for review. It is excluded from production output. Original assets are retained.

## Implemented repairs

Removed forced opening screens, cursor effects, click audio, blocking transitions, flip-only service descriptions, conflicting click handlers, fabricated newsletter confirmations and the simulated local chatbot. Replaced 140 KB of conflicting CSS with a shared visual system. Navigation now has reloadable hash URLs, active states, back/forward support and a not-found screen. The mobile menu and help panel support Escape and focus restoration. The separate contact dock reserves screen space rather than overlapping content.

Home now leads with a distinctive navy illustration composition and Explore Our Work / Discuss Your Project actions, then featured client identities, service overview, working principles, delivery process, partners and FAQs. About and the dedicated Partners page preserve all five named profiles. Hussnain and Jamshaid remain centered in the first desktop row, with the other three partners in the second; approved responsibilities work on hover, by keyboard and by tap. All 17 source-supported services have detail routes with specific discovery questions, scope discussion, process, FAQs and service-prefilled inquiries. Portfolio preserves 94 distinct supplied client names and logos with real categories and progressive loading; every client name has a real client-profile destination. Profiles are clearly distinct from project case studies and make no undocumented outcome claims. Insights retains the original Blog route, with search/category filtering and a reader for the one full draft. Site search covers services, clients and editorial topics.

The original main logo is served without CSS cropping, offsets, recoloring or internal animation, at its natural proportions. `qa/brand-baseline.json` checks its exact bytes and all partner photograph bytes/names/roles against the pre-change baseline. The client collection has 36 smaller WebP derivatives; original image files are retained and the main logo/partner images are excluded from optimization. The complete served client-image collection saves 5,135,570 bytes. `tools/optimize-assets.py` is optional and requires Pillow; normal installation, preview, build and tests do not require Python.

See `PRESENTATION.md` for a short presentation walkthrough and the precise remaining content requirements. CSS selectors and responsive rules have been consolidated into a readable stylesheet. Partner cards and featured-client cards are shared rendering helpers; approved responsibilities and service planning questions are stored in `content.js`.

## Contact, data and integration requirements

The original project has no receiving API, subscription provider, analytics or real chatbot. The form now validates required name/email/description and prepares a WhatsApp or email draft. Visitors explicitly open, review and send it in their chosen application. It never reports delivery. Values remain in memory in the current browser tab across navigation and are lost on reload. No credentials are required. If direct delivery is needed, the owner must choose a receiving service and supply its public form configuration or backend endpoint; private keys belong on that backend.

Existing visitor feedback remains under the original `nexagenClientFeedback` local-storage key, accessible for editing/removal from Contact. It is clearly identified as browser-local, not submitted or publicly published. No existing local entries are deleted. The original fabricated chatbot's old storage is left untouched but is no longer read or written.

The address, two phone numbers, two emails, office hours, Instagram and LinkedIn destinations match the supplied source; their ownership and present availability have not been independently confirmed. The map now uses the same coordinates as the original Open in Maps link and loads only when requested. External message delivery, live social destinations and the Google Maps service require a real network and are not guaranteed by local checks.

## Content and SEO review

This refinement used the earlier partner-layout reference, the supplied source and new browser captures. The latest pasted brief included no additional screenshots. The six blog summaries have no full articles, verified authors or publication dates; these are displayed as outlines. The one existing full insight is a draft with a reading time calculated from its actual words. Blog drafts and legal drafts have `noindex` metadata. Privacy and Terms describe actual current behavior and require owner review. Original testimonial claims, numerical achievements and package prices are retained in `reference-original/index.html` for review, rather than promoted as verified claims in the redesign.

`nexagensolution.com` comes from the original canonical URL. Confirm that this is the production domain before deployment. The sitemap lists only the root: hash routes are reliable for static hosting but do not provide independent crawler URLs or server-rendered metadata. Titles/descriptions update in the browser; social crawlers generally see the shared root preview. If independent page indexing and previews are required, use generated standalone pages in a separate authorized SEO pass. No invented case-study outcomes, endorsements or structured business claims have been added.

## Verification scope

See `qa/verification.json` for measured results. The suite checks seven main pages at 360, 390, 768, 1024 and 1440px, full-logo visibility/proportions, images, horizontal overflow, contact-control separation, all 17 service and 94 client-profile routes, portfolio filters/load more, blog search/clear/draft reading, contact validation and encoded handoff links, mobile navigation, browser history/reload, partner row placement and hover/keyboard/tap disclosure, help Escape/focus restoration, legal/not-found pages and landscape layout. Brand image bytes are checked against the pre-change baseline. Screenshots were visually inspected. No test sends a message. These checks do not constitute a complete screen-reader audit, legal review, delivery test or performance-score guarantee. Local load timings are observations in the test environment, not a Lighthouse score or production performance promise.

GitHub publishing: main branch. Vercel build configuration is provided in vercel.json. Import this repository using the repository root; npm run build produces dist. Navigation uses hash routes, including #/portal.
