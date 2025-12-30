# Horus Heresy Battle Repository - Design Document

## Project Overview

Build a React-based web application for cataloging battles, engagements, and campaigns from the Horus Heresy (Warhammer 40K), with tabletop gaming adaptation notes for three game systems: Age of Darkness 3.0, Zone Mortalis, and Legions Imperialis.

## Tech Stack

- **Framework**: React with hooks (useState, useEffect)
- **Styling**: Tailwind CSS
- **Icons**: lucide-react
- **Storage**: localStorage for data persistence
- **Deployment**: Vercel-ready (static React app)

## Core Functionality

### Data Structure

Each battle entry contains:

```javascript
{
  id: string,
  name: string,
  campaign: string,
  chronology: string, // e.g., "Early Heresy", "Siege of Terra"
  date: string, // e.g., "005.M31"
  factions: string[], // Legion names with (Loyalist)/(Traitor) tags
  keyFigures: string[], // Character names
  description: string,
  notableIncidents: string[],
  sources: string[], // Rulebooks, Forge World books
  recommendedReading: string[], // Black Library novels
  terrainTypes: string[],
  combatStyles: string[], // e.g., "Siege warfare", "Drop assault"
  scale: string, // "Skirmish", "Engagement", "Major Engagement", "Campaign"
  tabletopAdaptations: {
    ageOfDarkness: string,
    zoneMortalis: string,
    legionsImperialis: string
  }
}
```

### Features

#### 1. Battle Display

- Card-based layout with expandable details
- Collapsed state shows: name, campaign, date, chronology, description, combat styles
- Expanded state adds: factions, key figures, incidents, terrain, tabletop adaptations, sources, reading list
- Edit/Delete buttons on each card

#### 2. Search & Filtering

- Text search across: name, campaign, description
- Filter dropdowns for:
  - Chronological period (dynamically populated from data)
  - Faction (searches within faction arrays)
  - Combat style (searches within combat style arrays)
- All filters work together (AND logic)

#### 3. CRUD Operations

- **Create**: Modal form with “Add Battle” button
- **Read**: Main battle list view
- **Update**: Modal form pre-filled with battle data
- **Delete**: Confirmation dialog before removal

#### 4. Form Design

- Two-column grid layout for basic fields
- Array inputs with “+”/remove buttons for: factions, key figures, incidents, terrain, combat styles, sources, reading
- Separate textareas for each tabletop system adaptation
- “Enter” key adds items to arrays
- Visual tags display added array items with remove (×) button

#### 5. Data Persistence

- Load from localStorage on mount
- Save to localStorage on any data change
- Initialize with 2 sample battles if no stored data

## Visual Design

### Theme

- Dark grimdark aesthetic (31st millennium)
- Color scheme:
  - Background: gradient from slate-900 via red-950 to slate-900
  - Primary accent: red-500/600/700
  - Cards: slate-800 with slate-700 borders
  - Text: gray-100/300/400
  - System-specific colors:
    - Age of Darkness: yellow-500
    - Zone Mortalis: blue-400
    - Legions Imperialis: green-400

### Layout

- Max-width container (7xl)
- Header with Shield icon, title “HORUS HERESY”, subtitle “BATTLE REPOSITORY // M31”
- Search bar and “Add Battle” button row
- Filter dropdown row with Filter icon
- Battle cards grid (vertical stack)
- Modal forms centered, scrollable

### UI Components

- Rounded corners on cards (lg) and inputs
- Hover effects on buttons and cards
- Transition animations
- Icons from lucide-react: Plus, Edit2, Trash2, Search, Filter, BookOpen, Swords, Shield, Map

## Sample Data

Include 2 initial battles:

1. **Isstvan III - Initial Bombardment** (Campaign scale, early heresy)
1. **Drop Site Massacre - Initial Landing** (Major Engagement, early heresy)

Populate with appropriate factions (loyalist/traitor designations), key figures (primarchs, captains), terrain, combat styles, and system adaptations.

## User Experience

### Battle Cards

- Click “Show More Details” to expand
- Click “Show Less” to collapse
- Edit icon opens pre-filled form
- Delete icon shows confirmation

### Forms

- Required fields: name, campaign, date, chronology, scale, description, all 3 tabletop adaptations
- Optional arrays can be empty
- Cancel button closes form without saving
- Submit button validates and saves

### Filtering

- “All” option for each filter as default
- Dropdowns dynamically populate based on existing battles
- Search clears on filter change or vice versa (they work together)

## Deployment Notes

- No backend required
- Pure client-side React app
- localStorage persists data in browser only
- Export as static build for Vercel
- No environment variables needed

## File Structure

```
src/
  App.jsx (main component with state management)
  components/
    BattleCard.jsx (display component)
    BattleForm.jsx (add/edit form)
    ArrayInput.jsx (reusable array input field)
```

Alternatively, can be single-file React component for simplicity.

## Edge Cases

- Empty states: show “No battles found” with Swords icon
- Delete confirmation prevents accidental deletion
- Array inputs ignore empty/whitespace-only entries
- Filters show all options even if some produce no results

## Accessibility

- Semantic HTML (form labels, buttons)
- Focus states on inputs (red-600 border)
- Readable contrast ratios
- Hover states for interactive elements