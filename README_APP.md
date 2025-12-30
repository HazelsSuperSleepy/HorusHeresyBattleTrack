# Horus Heresy Battle Repository

A React-based web application for cataloging battles, engagements, and campaigns from the Horus Heresy (Warhammer 40K), with tabletop gaming adaptation notes for three game systems: Age of Darkness 3.0, Zone Mortalis, and Legions Imperialis.

## Features

- **Battle Catalog**: Card-based display of Horus Heresy battles with expandable details
- **Search & Filtering**: Text search and dropdowns for chronology, factions, and combat styles
- **CRUD Operations**: Add, edit, and delete battles with data persistence
- **Tabletop Adaptations**: Specific rules and notes for three game systems
- **Dark Aesthetic**: Grimdark 31st millennium themed UI
- **Browser Storage**: All data persists in localStorage

## Tech Stack

- Next.js 14 (React)
- Tailwind CSS
- lucide-react (Icons)
- localStorage (Client-side persistence)

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The application will be available at `http://localhost:3000`

## Deployment

This project is configured for Vercel deployment:

1. Push to GitHub
2. Connect repository to Vercel
3. Deploy - no environment variables needed

## Usage

### Adding Battles

1. Click "Add Battle" button
2. Fill in required fields (marked with *)
3. Use the + button or Enter key to add items to array fields
4. Provide adaptations for all three tabletop systems
5. Click "Create Battle"

### Searching & Filtering

- Use the search bar for text search across name, campaign, and description
- Use dropdown filters for chronological period, faction, or combat style
- Filters work together (AND logic)

### Editing & Deleting

- Click the edit icon (pencil) to modify a battle
- Click the delete icon (trash) to remove a battle (requires confirmation)

### Expanding Details

- Click "Show More Details" on any battle card to see:
  - Full faction list with loyalist/traitor indicators
  - Key figures and commanders
  - Terrain types
  - Notable incidents
  - Tabletop system-specific adaptations
  - Sources and recommended reading
  - Battle scale classification

## Data Structure

Each battle contains:

- Basic information: name, campaign, date, chronology, scale
- Factions, key figures, terrain types, combat styles
- Description and notable incidents
- Sources and recommended Black Library novels
- Tabletop adaptations for three game systems

## Local Data Persistence

All battles are stored in the browser's localStorage. Clearing browser data will remove stored battles. The app initializes with 2 sample battles on first load.

## Accessibility

- Semantic HTML with proper form labels
- Focus states on all interactive elements
- Readable contrast ratios following WCAG standards
- Keyboard navigation support

## Browser Support

Works on all modern browsers that support ES6 and localStorage:
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## License

This project is part of the Warhammer 40K fan community and respects Games Workshop's intellectual property.
