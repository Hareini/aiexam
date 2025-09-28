# Design Guidelines for AI Exam Preparation Platform

## Design Approach
**Reference-Based Approach**: Drawing inspiration from educational platforms like Khan Academy and Coursera, combined with productivity tools like Notion and Linear for the dashboard experience. This balances the educational content focus with professional utility.

## Core Design Elements

### Color Palette
**Dark Mode Primary** (default theme):
- Primary: 220 100% 60% (vibrant blue for trust and focus)
- Background: 220 13% 9% (deep charcoal)
- Surface: 220 13% 14% (elevated cards)
- Text Primary: 0 0% 98% (near white)
- Text Secondary: 220 9% 65% (muted gray)

**Light Mode**:
- Primary: 220 100% 50% (deeper blue)
- Background: 0 0% 98% (off-white)
- Surface: 0 0% 100% (pure white)
- Text Primary: 220 26% 14% (dark charcoal)

**Accent Colors**:
- Success: 142 71% 45% (emerald for completed tasks)
- Warning: 38 92% 50% (amber for attention)
- Error: 0 84% 60% (red for alerts)

### Typography
- **Primary**: Inter (clean, readable for interfaces)
- **Secondary**: JetBrains Mono (code and technical content)
- **Headings**: 600-700 weight, generous line height
- **Body**: 400-500 weight, optimized for reading

### Layout System
**Tailwind Spacing**: Use units of 2, 4, 6, 8, 12, 16, 24 for consistent spacing rhythm.
- Micro spacing: 2, 4 (buttons, form elements)
- Component spacing: 6, 8 (between related elements)
- Section spacing: 12, 16, 24 (major layout areas)

### Component Library

**Navigation**: 
- Sidebar navigation with collapsible sections
- Breadcrumb navigation for deep content
- Tab navigation for related content areas

**Cards**: 
- Subtle shadows and rounded corners (rounded-lg)
- Clear content hierarchy with proper spacing
- Hover states with gentle elevation increase

**Forms**: 
- Floating labels for modern feel
- Consistent form validation styling
- Progress indicators for multi-step flows

**Data Displays**:
- Clean tables with alternating row colors
- Progress bars and completion indicators
- Statistics cards with clear metrics

**Proctoring Interface**:
- Full-screen, minimal distraction design
- Fixed timer in corner
- Camera preview in unobtrusive position
- High contrast emergency controls

**AI Chat Interface**:
- Conversational bubble design
- Clear distinction between user and AI messages
- Code syntax highlighting for technical content
- Mermaid diagram integration

### Animations
**Minimal Usage**: 
- Subtle fade-ins for content loading
- Smooth transitions between states (duration-200)
- Gentle hover effects on interactive elements
- NO distracting animations during exam/study sessions

## Images
**Dashboard Hero Section**: Small banner image (not full-screen) showing students collaborating, placed at top of dashboard with welcome message overlay.

**Empty States**: Simple illustrations for empty quiz lists, no active groups, etc. - clean line art style in primary color.

**Study Materials**: Placeholder thumbnails for uploaded content, consistent aspect ratios.

## Key Design Principles
1. **Focus-First**: Minimize distractions during study and exam sessions
2. **Accessibility**: High contrast ratios, keyboard navigation, screen reader support
3. **Progressive Disclosure**: Show relevant information at the right time
4. **Consistent Interactions**: Predictable UI patterns across all features
5. **Performance Awareness**: Lightweight components that don't impact learning flow

## Special Considerations
- **Proctoring UI**: Absolutely minimal, clinical appearance to maintain exam integrity
- **Group Study**: Collaborative feel with shared visual elements
- **Mobile Responsive**: Essential for voice recording and quick access features
- **Loading States**: Clear feedback during AI processing and file uploads