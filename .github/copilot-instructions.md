# EverTrace Copilot Instructions

EverTrace is a memorial tribute platform. Every implementation and UI decision should support a timeless, peaceful, elegant, emotionally warm experience.

## Product Priorities

- Memorial first, collaborative memory space second, product third.
- Emotional clarity over feature density.
- Keep interfaces soft, elegant, restrained, and readable.
- Avoid clutter, playful UI noise, dashboard-like patterns, and transactional tone.

## Technical Stack

- React + Vite
- Tailwind CSS
- React Router
- Firebase Firestore
- Firebase Storage

## Routing Conventions

Use and preserve these routes unless explicitly asked to change them:

- /create -> StartTribute flow
- /tribute/:tributeId -> tribute page
- /published/:tributeId -> publish success
- /:plaqueId -> plaque router for short printed plaque URLs

Do not duplicate conflicting routes. Keep route tables clean and intentional.

## Data Model Conventions

Tribute document fields may include:

- name
- birthYear
- passingYear
- relationship
- relationshipDetail
- highlights
- photoUrls
- photoCount
- message
- creatorName
- email
- ownerName
- ownerEmail
- visibility
- theme

Memories live in:

- tributes/{tributeId}/memories

Memory fields may include:

- contributorName
- memoryText
- photoUrl
- createdAt

## Behavior Rules

- Do not auto-create an initial memory from the main tribute message.
- The tribute message remains in the tribute document as the primary memorial text.
- Memories are separate community contributions.
- Visitors can add a memory and optionally include one photo.
- Optimize for emotional resonance, simplicity, and contribution flow.

## Coding and Architecture Preferences

- Return full file code blocks only when explicitly requested. Otherwise prefer concise, directly actionable edits.
- Preserve existing working architecture unless explicitly asked to change it.
- Prefer clean, readable React with straightforward state handling.
- Use Tailwind classes directly in JSX.
- Keep components emotionally polished while implementation stays simple.
- Avoid unnecessary abstractions and overengineering for MVP.
- Prefer production-friendly, paste-ready output.

## UI and Content Guidance

- Target a black-tie minimal, soft memorial elegance.
- Use generous spacing and strong typography hierarchy.
- Let photos and tribute text carry emotional focus.
- Keep CTAs calm and tasteful.
- Keep Add a Memory visible and easy to access.
- On public tribute pages, omit relationship labels by default unless explicitly provided for display.

## Delivery Expectations

When changing code:

- Keep solutions minimal and elegant.
- Match existing project patterns and naming.
- Do not introduce heavy frameworks or architecture shifts without explicit request.

## Growth Loop: Add a Memory

EverTrace grows through a memory contribution loop, not ad-driven acquisition.

Core loop:

- User creates tribute.
- User shares tribute with family and friends.
- Visitors add memories and optional photos.
- Contributors share again.
- More contributors join.
- Some contributors later create their own tributes.

Design and product implications:

- Keep Add a Memory and Share with Family prominent near top of tribute pages.
- Repeat contribution and sharing entry points after meaningful scroll depth.
- Treat contributors as future creators; optimize for low-friction contribution.
- Prefer collaborative language over single-owner language.
- Plaque conversion should follow emotional richness, not precede it.

## Product Framing and Conversion Order

- Emotion first, hardware second.
- Tribute page is the primary product.
- Plaque is a physical extension and later-stage upgrade.
- Preferred strategy: Tribute creation -> Memory contributions -> Plaque purchase.

Do not design flows where plaque purchase is the required first step.

## Key User Types

- Tribute Creator: starts memorial page.
- Contributor: adds memory, story, or photo.
- Visitor/Scanner: arrives from shared link or plaque scan.
- Plaque Buyer: purchases physical plaque after engagement.
- Family Archivist: one user managing multiple tributes for a family.

## Core Use Cases to Preserve

- Create tribute without requiring plaque purchase.
- View tribute by direct link.
- View tribute by short plaque route and resolver.
- Add a memory with optional single photo.
- Share tribute with family to drive collaborative growth.
- Convert free tribute to plaque purchase after emotional attachment.
- Support private tribute visibility options.
- Handle unclaimed or not-yet-linked plaque routes gracefully.
- Allow one owner to create and manage multiple tribute profiles.
- Support one owner buying multiple plaques over time.

## Multi-Tribute Ownership Model

Favor this mental model in feature design and data shaping:

- One user can own many tributes.
- One tribute can contain many memories and photos.
- One tribute may optionally link to one plaque.

When evolving schema, preserve compatibility with account-level management and repeat plaque purchases.

## Tribute Page Upgrade Priorities

When improving TributePage, prioritize emotional rendering quality over feature breadth.

Required hierarchy:

- Identity: name, years if present, and relationship detail fallback rules.
- Hero image: first photo as emotional anchor when available.
- Main tribute message: clear, central memorial text.
- Highlights: show only meaningful non-empty items.
- Community memories: contributions listed clearly below core memorial content.

Rendering rules:

- Do not render empty sections.
- Prefer fewer, higher-quality elements over dense layouts.
- Avoid dashboard-like card grids unless clearly justified.
- Keep memorial tone soft, spacious, and readable.

Non-goals for Tribute Page improvement passes unless explicitly requested:

- Plaque routing changes
- Admin/auth overhauls
- Payments/checkout
- Broad architecture refactors

## Success Signals

Treat these as product quality checks:

- Page feels like a real place to remember someone.
- Contribution prompts are obvious but tasteful.
- Family sharing naturally increases memory submissions.
- Richer tributes increase plaque intent over time.
