# SnoopyRank Design Guidelines

## Design Approach

**Reference-Based Approach**: Drawing inspiration from playful, cartoon-themed applications with heavy animation emphasis - think Duolingo's character interactions meets Tinder's card mechanics with a Peanuts visual language.

## Core Design Principles

1. **Playful Cartoon Aesthetic**: Round, friendly shapes reminiscent of Peanuts comics
2. **High Energy Animations**: Continuous subtle motion, bouncy transitions, particle effects
3. **Warm, Inviting Experience**: Fun rating system that feels lighthearted, not judgmental
4. **Clear Visual Hierarchy**: Despite heavy animations, information remains easily scannable

## Typography

**Primary Font**: "Comic Neue" or "Bubblegum Sans" from Google Fonts (playful, cartoon-like)
**Secondary Font**: "Poppins" (clean, modern, readable for UI elements)

- Headings: Bold, 2xl-4xl sizes with slight letter-spacing
- Body Text: Regular weight, base to lg sizes
- Labels/Buttons: Medium weight, sm to base sizes
- Numbers (ratings): Extra bold, emphasize with larger sizing

## Layout System

**Spacing Primitives**: Tailwind units of 3, 4, 6, 8, 12 for consistent rhythm

**Container Strategy**:
- Max-width: 6xl for main content areas
- Card-based layouts with generous padding (p-6 to p-8)
- Mobile: Single column with p-4 spacing
- Desktop: Centered layouts with breathing room

## Component Library

### Navigation
- Fixed top header with Snoopy silhouette logo (left)
- Mode toggle (Tinder/Selection) - pill-style switcher (center)
- Minimal, clean nav with rounded corners and backdrop blur

### Tinder Mode - Card Stack
- Large cards (80vh mobile, 70vh desktop) with rounded-3xl corners
- Shadow-2xl with subtle glow effects
- Person name in bold at top
- Photo placeholder area (rounded-2xl)
- Swipe indicators: left (thumbs down icon with red glow), right (heart icon with pink glow)
- Card stack shows 2-3 cards behind with scale transform (0.95, 0.9)

### Selection Mode - Grid Layout
- Search bar with rounded-full input, magnifying glass icon
- Two-column grid (mobile), three-column (tablet), four-column (desktop)
- Person cards with hover lift effect (translateY -2)
- Each card: avatar placeholder, name, "Rate" button with arrow

### Rating Modal
- Full-screen overlay with backdrop blur
- Centered card (max-w-2xl) with rounded-3xl
- Person name at top with animated underline
- Four slider inputs (Beauté, Drôle, Personnalité, Intelligence)
- Each slider: 1-10 scale with number display, custom thumb (Snoopy paw print)
- Calculated average displayed prominently (text-6xl, animated count-up)
- Comment textarea (rounded-2xl, border with glow on focus)
- Submit button with confetti trigger

### Special Effect Indicators
- **Théo**: Golden border (border-4 border-yellow-400), animated rotating sparkle particles
- **Magata**: Pink/purple gradient glow, floating heart particles (pink, rose colors)
- **FANNYYYY**: Dark purple/black aura, subtle shadow pulse
- **GREGOIREEEEEEE**: Random glitch effect on hover, emoji rain (👈ﾟヮﾟ👈)

### Snoopy Elements
- Loading screen: Bouncing Snoopy silhouette with "Chargement..." text
- Background: Scattered faint Snoopy silhouettes (opacity-5)
- Confetti: Snoopy-shaped confetti + dog bones on rating submission
- Corner decorations: Small Snoopy on doghouse illustrations

## Animations

**Framer Motion Specifications**:
- Page transitions: slide + fade (duration 0.3s)
- Card swipes: spring animation (stiffness: 300, damping: 20)
- Button hovers: scale 1.05 with bounce
- Particles: continuous floating motion with random paths
- Glow effects: pulsing opacity (0.5 to 1, duration 2s, infinite)
- Rating submission: confetti burst (100+ pieces, gravity effect)
- Number counters: animated count-up for averages

**Particle Systems**:
- Stars/sparkles for Théo: 20-30 golden particles, slow orbit
- Hearts for Magata: 10-15 hearts, floating upward with fade
- Dark wisps for FANNYYYY: 8-12 purple particles, swirling motion

## Images

**Hero Section**: Full-width illustrated banner (h-80) featuring cartoon Snoopy on his doghouse with cloud background, comic-style sunburst patterns. Overlay gradient for text readability.

**Person Avatars**: Circular placeholders (w-32 h-32 for cards, w-20 h-20 for grid) with initials if no photo, soft border-4 with person-specific glow colors.

**Background Patterns**: Subtle repeating Snoopy silhouettes, comic book dots (Ben-Day dots pattern), scattered bone shapes - all at very low opacity (5-10%).

## Responsive Behavior

**Mobile** (< 768px):
- Single column layouts
- Full-screen cards for Tinder mode
- Simplified particle effects (fewer particles)
- Touch-optimized swipe gestures

**Desktop** (≥ 768px):
- Multi-column grids
- Larger, more elaborate animations
- Mouse hover effects active
- Enhanced particle density

## Accessibility Notes

- Maintain WCAG AA contrast despite playful colors
- Animations respect prefers-reduced-motion
- Clear focus states on all interactive elements
- Semantic HTML with proper labels