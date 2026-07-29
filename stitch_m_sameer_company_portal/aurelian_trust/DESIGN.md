---
name: Aurelian Trust
colors:
  surface: '#faf9f6'
  surface-dim: '#dbdad7'
  surface-bright: '#faf9f6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f3f1'
  surface-container: '#efeeeb'
  surface-container-high: '#e9e8e5'
  surface-container-highest: '#e3e2e0'
  on-surface: '#1a1c1a'
  on-surface-variant: '#4e4634'
  inverse-surface: '#2f312f'
  inverse-on-surface: '#f1f1ee'
  outline: '#807661'
  outline-variant: '#d1c5ad'
  surface-tint: '#755b00'
  primary: '#755b00'
  on-primary: '#ffffff'
  primary-container: '#f4c430'
  on-primary-container: '#695200'
  inverse-primary: '#f0c12c'
  secondary: '#535f6f'
  on-secondary: '#ffffff'
  secondary-container: '#d4e1f4'
  on-secondary-container: '#576474'
  tertiary: '#006c4a'
  on-tertiary: '#ffffff'
  tertiary-container: '#68dfab'
  on-tertiary-container: '#006142'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdf90'
  primary-fixed-dim: '#f0c12c'
  on-primary-fixed: '#241a00'
  on-primary-fixed-variant: '#584400'
  secondary-fixed: '#d7e3f6'
  secondary-fixed-dim: '#bbc7da'
  on-secondary-fixed: '#101c2a'
  on-secondary-fixed-variant: '#3c4857'
  tertiary-fixed: '#82f9c2'
  tertiary-fixed-dim: '#65dca8'
  on-tertiary-fixed: '#002114'
  on-tertiary-fixed-variant: '#005237'
  background: '#faf9f6'
  on-background: '#1a1c1a'
  surface-variant: '#e3e2e0'
typography:
  headline-xl:
    fontFamily: Playfair Display
    fontSize: 64px
    fontWeight: '700'
    lineHeight: 72px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 56px
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 30px
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  label-caps:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 20px
    letterSpacing: 0.1em
  nav-link:
    fontFamily: Manrope
    fontSize: 15px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1280px
  section-gap: 120px
  section-gap-mobile: 64px
  gutter: 24px
  card-padding: 32px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 24px
---

## Brand & Style
The design system is engineered to project an image of impeccable reliability, high-end precision, and approachable modern expertise for a premium Chartered Accountancy firm. The visual narrative combines the weight of traditional financial authority with a forward-leaning, tactile digital experience.

The style is defined as **Modern Tactile Corporate**. It utilizes soft 3D extrusions and layered glassmorphism to move away from "flat" corporate tropes. By employing subtle isometric depth and light-refractive surfaces, the UI creates a sense of "physical" security—as if the data and services are tangible assets. The interface prioritizes generous white space and a calm, airy atmosphere to reduce the perceived complexity of financial services.

## Colors
The palette is rooted in a "Warm Luxury" spectrum. 

- **Primary Gold Gradient:** Used exclusively for high-priority calls to action and critical highlights. It represents value, growth, and the premium nature of the firm.
- **Deep Navy:** Provides the "anchor" for the system. It is used for all primary headings and structural elements (like the footer) to instill a sense of heritage and stability.
- **Off-White & Cream:** These act as the canvas. Use `#FBFAF7` for section backgrounds to distinguish them from the pure white (`#FFFFFF`) of elevated 3D cards.
- **Success Teal:** Reserved for verification badges, positive trend indicators, and "Trusted" status markers.

## Typography
The typography strategy employs a high-contrast pairing to balance tradition and modernity. 

**Headings** use a refined Serif to evoke the feel of prestigious legal and financial documents. For the largest displays, a slight negative letter-spacing is applied to keep the letterforms tight and authoritative.

**Body Text** utilizes a geometric Sans-Serif for maximum legibility in data-heavy contexts. **Section Eyebrows** and **Navigation Labels** should always use the `label-caps` or `nav-link` tokens with increased letter-spacing to create a sophisticated, editorial rhythm.

## Layout & Spacing
The layout follows a 12-column fluid grid for desktop, transitioning to 4 columns for mobile. 

- **Generous Breathing Room:** Sections are separated by a minimum of 120px to maintain a premium, unhurried feel. 
- **Content Alignment:** Center-aligned layouts are reserved for hero sections and introductory testimonials. Practical service descriptions and data tables should follow a left-aligned, structured grid.
- **Inner Padding:** Cards and containers use a minimum of 32px padding (`card-padding`) to ensure content never feels cramped against the 3D-styled borders.

## Elevation & Depth
This design system relies on "Layered Tactility" rather than flat surfaces.

- **Level 1 (Base):** Off-white background with subtle, organic gradient blobs in the corners (low opacity Gold and Navy).
- **Level 2 (Cards):** Pure white surfaces with a "micro-extrusion" effect. This is achieved using a two-part shadow: a soft, wide-spread ambient shadow (10% opacity Navy) and a tighter, more saturated shadow (5% Gold) at the bottom to simulate a gold-tinted reflection from the surface.
- **Level 3 (Interactive):** On hover, elements should lift (translateY: -4px) and the shadow should become more diffused and slightly larger.
- **Glassmorphism:** Navigation bars and modal overlays use a 20px backdrop blur with a 60% white tint and a 1px solid white border at 20% opacity to define the edge.

## Shapes
The shape language is consistently rounded to soften the "cold" nature of financial data. 

- **Primary Containers:** 20px - 24px corner radius.
- **Small Elements (Chips/Badges):** Fully pill-shaped.
- **Visual Continuity:** Every interactive element must avoid sharp 90-degree angles. Icons should be encased in "Squircle" shapes or soft-edged 3D isometric containers.

## Components

### Buttons
- **Primary:** Pill-shaped with the `accent_gradient`. Text is Deep Navy for high contrast. On hover, apply a subtle inner-glow to simulate light hitting a 3D surface.
- **Secondary:** Transparent background with a 2px Deep Navy border. Use the `nav-link` typography style.

### Cards
- **Structure:** 16-20px corner radius, white background. 
- **Iconography:** Each card features a "3D Chip" at the top left—a small, soft-rounded square containing a 3D isometric icon, tinted with a 10% gold background.

### Navigation
- **Floating Bar:** The navbar is a floating "pill" or edge-to-edge frosted glass panel. It features a thin 1px bottom border (`#1E2A38` at 10% opacity) to separate it from the content as users scroll.

### Form Inputs
- **Style:** Subtle inset shadow to create a "pressed" look into the surface, contrasted by the "raised" look of the cards. Focus states should transition the border color to Primary Gold.

### Icons
- **Style:** Icons must be 3D isometric representations. They should look like soft plastic or glass objects with gentle highlights on the top edges and soft shadows underneath.