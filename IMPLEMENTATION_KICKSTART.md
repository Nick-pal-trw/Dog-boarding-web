# The Pawsome Retreat - Implementation Kickstart

## Project Overview

**Project:** High-conversion, single-page React prototype for "The Pawsome Retreat"  
**Goal:** Booking Request Form signup (lead capture)  
**Type:** Frontend Marketing/Inquiry prototype with success notifications  
**Device Target:** Fully responsive (Mobile, Tablet, Desktop)

---

## 1. Design Token System

### Color Palette

| Token Name | Hex Value | OKLCH Value | Usage |
|------------|-----------|-------------|-------|
| **Deep Teal** | `#004D40` | `oklch(0.35 0.08 175)` | Primary brand, backgrounds, headers |
| **Cream** | `#FFFDD0` | `oklch(0.98 0.03 95)` | Background, card surfaces |
| **Safety Orange** | `#FF5722` | `oklch(0.65 0.22 35)` | **Primary CTA (ACCENT)** - All buttons |
| **Teal Dark** | `#00352C` | `oklch(0.25 0.06 175)` | Text on light backgrounds, footer |
| **Cream Light** | `#FFFEF5` | `oklch(0.99 0.02 95)` | Subtle section alternation |

### CSS Custom Properties (globals.css)

```css
:root {
  /* Brand Colors */
  --background: oklch(0.98 0.03 95);           /* Cream */
  --foreground: oklch(0.25 0.06 175);          /* Teal Dark - text */
  
  /* Card & Surfaces */
  --card: oklch(0.99 0.02 95);                 /* Cream Light */
  --card-foreground: oklch(0.25 0.06 175);    /* Teal Dark */
  
  /* Primary (Deep Teal) */
  --primary: oklch(0.35 0.08 175);             /* Deep Teal */
  --primary-foreground: oklch(0.98 0.03 95);  /* Cream */
  
  /* Secondary */
  --secondary: oklch(0.92 0.02 95);            /* Muted Cream */
  --secondary-foreground: oklch(0.35 0.08 175);
  
  /* ACCENT - Safety Orange (CTA Color) */
  --accent: oklch(0.65 0.22 35);               /* Safety Orange */
  --accent-foreground: oklch(0.99 0.01 95);   /* White/Cream */
  
  /* Muted */
  --muted: oklch(0.94 0.02 95);
  --muted-foreground: oklch(0.45 0.05 175);
  
  /* Borders & Inputs */
  --border: oklch(0.88 0.03 175);              /* Teal-tinted border */
  --input: oklch(0.95 0.02 95);
  --ring: oklch(0.65 0.22 35);                 /* Orange focus ring */
  
  /* Radius */
  --radius: 0.625rem;
}
```

### Accent Color Application Rules

The **Safety Orange (`--accent`)** is applied consistently to:
- All primary CTA buttons (Book a Suite, Check Availability, Submit Form)
- Hover states on interactive elements
- Focus rings on form inputs
- Highlight badges and important callouts
- Pulse animation on hero CTA

---

## 2. Typography System

### Font Stack

| Purpose | Font Family | Tailwind Class |
|---------|-------------|----------------|
| Headings & Body | Geist Sans | `font-sans` |
| Data/Mono Text | Geist Mono | `font-mono` |

### Type Scale

| Element | Size | Weight | Tracking | Line Height |
|---------|------|--------|----------|-------------|
| H1 (Hero) | `text-4xl` / `lg:text-6xl` | `font-bold` | `tracking-tight` | `leading-tight` |
| H2 (Section) | `text-3xl` / `lg:text-4xl` | `font-semibold` | `tracking-tight` | `leading-tight` |
| H3 (Card Title) | `text-xl` / `lg:text-2xl` | `font-semibold` | - | `leading-snug` |
| Body | `text-base` / `lg:text-lg` | `font-normal` | - | `leading-relaxed` |
| Caption | `text-sm` | `font-medium` | - | `leading-normal` |
| Mono Data | `text-sm` | `font-mono` | - | `leading-normal` |

---

## 3. CTA Placement Strategy (Minimum 3)

### CTA #1: Header
- **Location:** Fixed header, right side
- **Text:** "Book a Suite"
- **Action:** Opens Sheet (slide-in booking form)
- **Style:** `bg-accent text-accent-foreground` with hover scale

### CTA #2: Hero Section
- **Location:** Below hero sub-headline
- **Text:** "Check Availability"
- **Action:** Opens Sheet (slide-in booking form)
- **Style:** Large button with **pulse animation**, `bg-accent`

### CTA #3: Pricing Section
- **Location:** Within each pricing card
- **Text:** "Reserve Now"
- **Action:** Opens Sheet (slide-in booking form)
- **Style:** Full-width button in card footer, `bg-accent`

### CTA #4: Mid-Page Callout (Optional)
- **Location:** Between Features and Testimonials
- **Text:** "Ready to Book Your Pup's Stay?"
- **Action:** Opens Sheet
- **Style:** Centered banner with accent background

### CTA #5: Footer
- **Location:** Above legal links
- **Text:** "Start Your Reservation"
- **Action:** Opens Sheet
- **Style:** Prominent button in teal footer section

---

## 4. Component Architecture

```
app/
├── page.tsx                    # Main landing page (assembles all sections)
├── globals.css                 # Design tokens & base styles
├── layout.tsx                  # Root layout with Geist fonts
│
components/
├── sections/
│   ├── header.tsx              # Fixed header with logo + CTA
│   ├── hero.tsx                # Hero with headline, sub-headline, CTA
│   ├── social-proof-bar.tsx    # 4-column stats row
│   ├── features.tsx            # 3-card features grid
│   ├── pricing.tsx             # 2-card pricing comparison
│   ├── testimonials.tsx        # 3-card testimonial grid/carousel
│   ├── faq.tsx                 # Accordion FAQ section
│   └── footer.tsx              # Full-width footer with map placeholder
│
├── booking-form.tsx            # Sheet-based booking form (Zod validation)
├── mobile-nav.tsx              # Burger menu for mobile
└── ui/                         # shadcn/ui components (existing)
```

---

## 5. Responsive Breakpoints

| Breakpoint | Tailwind Prefix | Layout Behavior |
|------------|-----------------|-----------------|
| Mobile | `default` | Single column, stacked sections |
| Tablet | `md:` (768px+) | 2-column grids, side-by-side cards |
| Desktop | `lg:` (1024px+) | 3-column grids, full horizontal layouts |

### Section-Specific Responsive Rules

| Section | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Header | Burger menu | Burger menu | Full nav |
| Social Proof | 2x2 grid | 4-column | 4-column |
| Features | 1 column | 2 columns | 3 columns |
| Pricing | 1 column | 2 columns | 2 columns (centered) |
| Testimonials | Carousel | 2 columns | 3 columns |
| FAQ | Full width | Full width | Centered max-w-3xl |

---

## 6. Booking Form Specification

### Form Fields

| Field | Type | Validation | Required |
|-------|------|------------|----------|
| Dog Name | `Input` | Min 2 chars | Yes |
| Breed | `Input` | Min 2 chars | Yes |
| Check-in Date | `Input[type=date]` | Future date | Yes |
| Check-out Date | `Input[type=date]` | After check-in | Yes |
| Owner Email | `Input[type=email]` | Valid email | Yes |
| Special Notes | `Textarea` | Max 500 chars | No |

### Validation Schema (Zod)

```typescript
const bookingSchema = z.object({
  dogName: z.string().min(2, "Dog name is required"),
  breed: z.string().min(2, "Breed is required"),
  checkIn: z.string().min(1, "Check-in date is required"),
  checkOut: z.string().min(1, "Check-out date is required"),
  email: z.string().email("Valid email is required"),
  notes: z.string().max(500).optional(),
});
```

### Success State
- Display toast notification: "Thank you! We'll be in touch within 24 hours."
- Reset form to initial state
- Close Sheet after 2-second delay

---

## 7. Content Inventory

### Hero Section
- **Headline:** "Your Dog's Luxury Home Away From Home."
- **Sub-headline:** "The Peace-of-Mind Suite: 24/7 camera-monitored private cabins with daily digital pup-reports. Designed for the most anxious shadows."

### Social Proof Stats
| Stat | Value |
|------|-------|
| Happy Stays | 4,500+ |
| Star Rating | 4.9/5 |
| Safety Incidents | 0 |
| Team | Certified Canine Handlers |

### Features (3 Cards)
1. **Stay-and-Play Daycare** - Indoor/outdoor social play with temperament testing
2. **Peace-of-Mind Suite** - Sound-proof cabins, 24/7 webcam, orthopedic beds
3. **Premium Wellness** - Daily health checks, medication administration

### Pricing (2 Cards)
1. **Standard Luxury** - $75/night - Full suite, webcam, group play
2. **VIP (Very Important Pup)** - $110/night - 1-on-1 walks, nightly grooming

### Testimonials (3 Cards)
1. **Sarah M.** - "I was terrified to leave Barnaby. Seeing him on the 24/7 camera changed everything. He came home happy and relaxed!"
2. **Michael R.** - "The daily reports and photos gave me such peace of mind during my business trip. Truly exceptional care."
3. **Jessica T.** - "My anxious rescue finally found a place where he feels safe. The staff truly understands dogs with special needs."

### FAQ Questions (5)
1. Do you specialize in dogs with separation anxiety?
2. Is there 24/7 staff on-site?
3. How do the webcam and daily reports work?
4. Do you accommodate dogs who aren't social with others?
5. What happens in a medical emergency?

### Trust Badges (Aspirational)
- PACCC Certified
- Fear-Free Certified Facility
- Best of Orange County 2025

---

## 8. Animation & Interaction Specs

### CTA Pulse Animation
```css
@keyframes pulse-accent {
  0%, 100% { box-shadow: 0 0 0 0 oklch(0.65 0.22 35 / 0.4); }
  50% { box-shadow: 0 0 0 12px oklch(0.65 0.22 35 / 0); }
}
.animate-pulse-accent {
  animation: pulse-accent 2s ease-in-out infinite;
}
```

### Card Hover
```css
.card-hover {
  @apply transition-transform duration-200 hover:scale-[1.02];
}
```

### Focus States
- All interactive elements use `ring-accent` for focus visibility
- Keyboard navigation fully supported

---

## 9. Implementation Order

### Phase 1: Foundation
1. Update `globals.css` with design tokens
2. Update `layout.tsx` with Geist fonts and metadata
3. Create base page structure in `page.tsx`

### Phase 2: Core Sections
4. Build `Header` with mobile burger menu
5. Build `Hero` section with animated CTA
6. Build `SocialProofBar` component
7. Build `Features` grid section

### Phase 3: Conversion Elements
8. Build `Pricing` cards section
9. Build `BookingForm` Sheet component with Zod validation
10. Connect all CTAs to BookingForm

### Phase 4: Trust & Footer
11. Build `Testimonials` section
12. Build `FAQ` accordion section
13. Build full-width `Footer`

### Phase 5: Polish
14. Add animations and transitions
15. Test responsive breakpoints
16. Accessibility audit (ARIA, keyboard nav)

---

## 10. Dependencies

### Required Packages (Already Available)
- `next` - App Router
- `tailwindcss` - Styling
- `@shadcn/ui` - Components (Accordion, Button, Card, Input, Sheet, Form)
- `lucide-react` - Icons
- `zod` - Form validation
- `react-hook-form` - Form state management
- `@hookform/resolvers` - Zod integration

### shadcn/ui Components to Use
- `Button` - All CTAs
- `Card` - Features, Pricing, Testimonials
- `Sheet` - Booking form slide-in
- `Accordion` - FAQ section
- `Input` - Form fields
- `Textarea` - Notes field
- `Badge` - Trust badges, pricing labels
- `Separator` - Section dividers

---

## 11. Accessibility Checklist

- [ ] All images have descriptive alt text
- [ ] Color contrast meets WCAG AA (verified: Teal/Cream)
- [ ] All interactive elements are keyboard accessible
- [ ] Focus states are visible (orange ring)
- [ ] ARIA labels on icon-only buttons
- [ ] Form fields have associated labels
- [ ] Error messages are announced to screen readers
- [ ] Skip-to-content link in header
- [ ] Semantic HTML structure (header, main, footer, sections)

---

## Ready to Build

This document serves as the complete implementation reference. All design decisions, content, and technical specifications are finalized. Proceed with Phase 1: Foundation.
