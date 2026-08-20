# PRD — Feeding Trends Marketing Website

## Original Problem Statement
Build a modern, responsive single-page marketing website for Feeding Trends, a fashion & lifestyle consulting firm founded by Shreya Srivastava (Bengaluru, India). Tagline: "Brand, marketing & data consulting for fashion and lifestyle brands." Tone: young, creative, conversational, first-person. Light/airy cream palette with a soft blush pink accent (user-selected). Illustration/typography-driven visuals — no stock photography. Sections: kinetic hero, founder bio, two service groups (Marketing & Brand; Data & ML in plain English), two client groups (in-house brand experience vs consulting clients), working contact form storing timestamped entries appended to a .txt file in AWS S3 via env-var credentials (with local fallback until keys are provided), footer with socials.

## Architecture
- Frontend: React (CRA/craco) + Tailwind, framer-motion (kinetic hero, scroll reveals), lenis (smooth momentum scrolling), react-fast-marquee (editorial marquees), Shadcn UI form components, Cormorant Garamond display + Manrope body fonts.
- Backend: FastAPI. POST /api/contact validates (Pydantic + EmailStr), formats a timestamped text block, appends to S3 object (boto3, get-then-put) when AWS env vars are set; otherwise appends to local fallback /app/backend/data/contact-submissions.txt. GET /api/ health reports active storage mode.
- Env: backend/.env holds AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, S3_BUCKET_NAME, S3_OBJECT_KEY (empty = local fallback). No database used, per requirement.

## User Personas
- Fashion/lifestyle brand founders seeking marketing or data consulting.
- Potential collaborators/press browsing Shreya's credentials.

## Core Requirements (static)
1. Conversational first-person copy, no jargon. 2. Cream + blush pink palette. 3. Two visually distinct service groups. 4. Two visually distinct client groups. 5. Contact form: Name*, Email*, Phone, Company, Service dropdown (10 services + "Not sure yet"), Message*. 6. Append-only text record in S3, env-based credentials, friendly success/error states. 7. Fully responsive, fast, generous whitespace.

## Implemented
- 2026-07: Full single-page site — kinetic masked-reveal hero with parallax shapes, editorial ticker marquee, founder chapter (01), services chapter (02) with editorial list + Data & ML bento cards, clients chapter (03) with in-house marquee + consulting card grid, contact chapter (04) with working form + success/error states, footer. Backend /api/contact with S3 append logic + local fallback. Verified end-to-end (curl + browser flow).
- 2026-07: Rebranded to Bravelily Studios ("A Feeding Trends product"), added founder portrait photo with hand-drawn arch frame + hand-drawn doodle accents across sections, rephrased About paragraph 2 (diverse background = client edge), wired real LinkedIn + Gmail contact, removed Instagram.
- 2026-07: Added hand-drawn lily line-illustration motif (parallax lily in hero, lily beside footer wordmark), added Uplift Modelling and Demand Forecasting (Time Series) to Data & ML services and the contact form dropdown (now 12 services).
- 2026-07: Hardened contact form for EC2 self-hosting — API base falls back to same-origin (window.location.origin) when REACT_APP_BACKEND_URL is unset, and error messages now distinguish "can't reach the server" (backend down/unreachable/mixed-content) from HTTP status errors, to make EC2 deployment issues diagnosable from the UI.
- 2026-07: Threaded small lily doodles through all section dividers (About chips row, Marketing & Brand label, both Clients labels, Say hello eyebrow) and replaced the dots on consulting client cards with mini lilies.

## Backlog
- P0 (LIVE since 2026-07): S3 storage is active. Each enquiry is stored as its own per-person file: s3://bravelily-studios-inquiries/inquiries/<name-slug>.txt (ap-south-1), e.g. inquiries/jane-doe.txt; repeat messages from the same name append into their own file. Verified live: two test submissions from one name both landed in the shared per-name file, read back from the bucket. Static keys in backend/.env (boto3 default chain → EC2 IAM role also supported). S3 failures fall back to local per-name files under backend/data/ with storage:"local-fallback" in the API response. Note: the earlier single-file inquiries/contact-submissions.txt from initial testing still exists in the bucket and can be deleted.
- P2: Case studies / testimonials section.
- P2: SEO meta tags + OG image.

## Next Tasks
1. Add AWS keys and flip storage to S3. 2. Swap placeholder social links/email. 3. Add real imagery when available.
