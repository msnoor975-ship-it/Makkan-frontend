# Design System - Suz Real Estate

This document outlines the shared design system for the Suz Real Estate frontend. All components should reference these design tokens instead of hardcoded values to ensure visual consistency.

## Installation

The design system is built with Tailwind CSS. To use it:

1. **Tailwind CSS is already installed** with custom configuration in `tailwind.config.js`
2. **Import the directives** in your CSS (already done in `src/index.css`):
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

## Color Tokens

### Primary (Brand Color) - Teal/Emerald Green
Used for: Links, active navigation states, primary buttons, "For Sale" tags

| Token | Value | Usage |
|-------|-------|-------|
| `primary-500` | `#0EA97B` | Main brand color |
| `primary-600` | `#059669` | Hover states |
| `primary-50` to `primary-400` | Light shades | Backgrounds, badges |
| `primary-700` to `primary-900` | Dark shades | Dark backgrounds |

**Example usage:**
```jsx
<button className="bg-primary-500 hover:bg-primary-600 text-white">
  Primary Button
</button>
```

### Secondary - Navy/Dark Blue
Used for: Headings, footer background, secondary buttons

| Token | Value | Usage |
|-------|-------|-------|
| `secondary-500` | `#101A33` | Main secondary color |
| `secondary-600` | `#0f162e` | Hover states |
| `secondary-50` to `secondary-400` | Light shades | Accents |

**Example usage:**
```jsx
<h1 className="text-secondary-500">Heading</h1>
<footer className="bg-secondary-500 text-white">Footer</footer>
```

### Neutral Grays
Used for: Body text, backgrounds, borders

| Token | Value | Usage |
|-------|-------|-------|
| `neutral-50` | `#F9FAFB` | Light backgrounds |
| `neutral-100` to `neutral-300` | Light grays | Borders, dividers |
| `neutral-400` to `neutral-500` | Medium grays | Muted text |
| `neutral-600` | `#4B5563` | Body text |
| `neutral-700` to `neutral-900` | Dark grays | Dark text |

**Example usage:**
```jsx
<p className="text-neutral-600">Body text</p>
<div className="bg-neutral-50">Light background</div>
```

### Semantic Color Aliases
Convenient shortcuts for common use cases:

| Token | Value | Usage |
|-------|-------|-------|
| `ink` | `#101A33` | Headings, important text |
| `surface` | `#FFFFFF` | Card backgrounds, white surfaces |
| `muted` | `#6B7280` | Muted/disabled text |
| `muted-light` | `#F3F4F6` | Muted backgrounds |

**Example usage:**
```jsx
<h2 className="text-ink font-heading">Heading</h2>
<div className="bg-surface shadow-card rounded-xl p-6">Card</div>
<p className="text-muted">Muted text</p>
```

## Typography

### Font Families
- **Body text**: `Inter` (fallback to system fonts)
- **Headings**: `Poppins` (fallback to Inter)

```jsx
<p className="font-sans">Body text</p>
<h1 className="font-heading">Heading</h1>
```

### Font Sizes
- **Base**: 16px with 1.6 line-height (default body text)
- **Large**: 18px with 1.6 line-height
- **Extra Large**: 20px with 1.5 line-height

```jsx
<p className="text-base">Default body text</p>
<p className="text-lg">Large body text</p>
```

### Heading Hierarchy
- Use `font-heading` for all headings
- Use `text-ink` for heading color
- Use `font-bold` or `font-semibold` for weight

```jsx
<h1 className="text-ink font-heading font-bold text-3xl">Page Title</h1>
<h2 className="text-ink font-heading font-semibold text-2xl">Section Title</h2>
```

## Layout Rules

### Container
- Max width: `max-w-7xl` (1280px) or `max-w-6xl` (1152px)
- Centered: `mx-auto`
- Horizontal padding: `px-6` (mobile), `px-8` (desktop)

```jsx
<div className="max-w-7xl mx-auto px-6 lg:px-8">
  Content
</div>
```

### Section Spacing
- Vertical padding: `py-16` (64px) to `py-24` (96px) between major sections

```jsx
<section className="py-16 lg:py-24">
  Section content
</section>
```

### Cards
- Background: `bg-surface` (white)
- Border radius: `rounded-xl` (0.75rem) or `rounded-2xl` (1rem)
- Shadow: `shadow-card` or `shadow-medium`
- Padding: `p-5` to `p-6`

```jsx
<div className="bg-surface shadow-card rounded-xl p-6">
  Card content
</div>
```

## Buttons

### Primary Button
- Background: `bg-primary-500`
- Hover: `hover:bg-primary-600`
- Text: `text-white`
- Border radius: `rounded-lg` or `rounded-full` (pill)
- Padding: `px-6 py-2.5` or `px-8 py-3`

```jsx
<button className="bg-primary-500 hover:bg-primary-600 text-white rounded-lg px-6 py-2.5 font-semibold transition-colors">
  Primary Button
</button>
```

### Secondary Button
- Background: `bg-secondary-500` or `bg-transparent`
- Hover: `hover:bg-secondary-600`
- Text: `text-white` or `text-secondary-500`
- Border radius: `rounded-lg` or `rounded-full`
- For outlined: `border-2 border-secondary-500 text-secondary-500`

```jsx
<button className="bg-secondary-500 hover:bg-secondary-600 text-white rounded-lg px-6 py-2.5 font-semibold transition-colors">
  Secondary Button
</button>

<button className="border-2 border-secondary-500 text-secondary-500 rounded-lg px-6 py-2.5 font-semibold hover:bg-secondary-50 transition-colors">
  Outlined Button
</button>
```

## Icons

Use `lucide-react` for consistent icon styling. Install if not already:

```bash
npm install lucide-react
```

**Example usage:**
```jsx
import { Home, User, Settings } from 'lucide-react'

<Home className="w-5 h-5 text-primary-500" />
<User className="w-6 h-6 text-neutral-600" />
```

## Component Examples

### Navigation Link
```jsx
<Link className="text-neutral-600 hover:text-primary-500 font-medium transition-colors">
  Navigation
</Link>
```

### Card Component
```jsx
<div className="bg-surface shadow-card rounded-xl p-6 border border-neutral-200">
  <h3 className="text-ink font-heading font-semibold text-xl mb-2">Card Title</h3>
  <p className="text-neutral-600">Card description text goes here.</p>
</div>
```

### Status Badge
```jsx
<span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
  For Sale
</span>

<span className="bg-neutral-100 text-neutral-700 px-3 py-1 rounded-full text-sm font-medium">
  Pending
</span>
```

### Form Input
```jsx
<input 
  className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
  placeholder="Enter text"
/>
```

## Best Practices

1. **Always use design tokens** - Never hardcode colors, use the semantic tokens
2. **Maintain spacing consistency** - Use the defined spacing scale
3. **Keep typography hierarchy** - Use `font-heading` for headings, `font-sans` for body
4. **Use semantic color names** - Prefer `ink`, `surface`, `muted` over specific hex values
5. **Maintain accessibility** - Ensure sufficient contrast ratios (primary colors meet WCAG AA)
6. **Responsive design** - Always consider mobile-first approach with Tailwind's responsive prefixes

## Migration Guide

When updating existing components to use the design system:

1. Replace hardcoded colors with design tokens
2. Update font families to use `font-sans` or `font-heading`
3. Standardize border radius to `rounded-xl` or `rounded-lg`
4. Update shadows to use `shadow-card` or `shadow-medium`
5. Ensure consistent padding using the spacing scale

**Before:**
```jsx
<div style={{ background: '#ffffff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
  <h2 style={{ color: '#101A33', fontFamily: 'Poppins', fontWeight: 600 }}>Title</h2>
</div>
```

**After:**
```jsx
<div className="bg-surface shadow-card rounded-xl p-6">
  <h2 className="text-ink font-heading font-semibold">Title</h2>
</div>
```

## Additional Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Lucide React Icons](https://lucide.dev/)
- [Inter Font](https://rsms.me/inter/)
- [Poppins Font](https://fonts.google.com/specimen/Poppins)
