'use client'

import { useState, useEffect } from 'react'
import { Shield, Plus, Search, Filter, Swords } from 'lucide-react'
import BattleCard from './components/BattleCard'
import BattleForm from './components/BattleForm'

const SAMPLE_BATTLES = [
  {
    id: '1',
    name: 'Isstvan III - Initial Bombardment',
    campaign: 'Isstvan Campaign',
    chronology: 'Early Heresy',
    date: '005.M31',
    factions: ['Iron Warriors (Traitor)', 'Iron Hands (Loyalist)', 'Salamanders (Loyalist)'],
    keyFigures: ['Perturabo', 'Ferrus Manus', 'Vulkan'],
    description: 'The opening bombardment of Isstvan III that initiated the treachery of the traitor legions. A devastating orbital strike preceded the drop of traitor forces.',
    notableIncidents: [
      'Orbital bombardment of civilian centers',
      'Initial landing of Iron Warriors forces',
      'Mobilization of loyalist forces',
      'Tragic destruction of forge complexes'
    ],
    sources: ['Horus Heresy Book One: Betrayal', 'Isstvan Campaign Book'],
    recommendedReading: ['Galaxy in Flames by Graham McNeill'],
    terrainTypes: ['Industrial', 'Urban', 'Forge World'],
    combatStyles: ['Orbital bombardment', 'Drop assault', 'Urban warfare'],
    scale: 'Major Engagement',
    tabletopAdaptations: {
      ageOfDarkness: 'Use Crusade army lists for Iron Warriors, Iron Hands, and Salamanders. Recommended points: 3000-5000. Focus on armored vehicles and tactical squads.',
      zoneMortalis: 'Adapted for underground forge complexes. Use Industrial terrain sets with bunkers and reinforced positions. 1500-2000 points recommended.',
      legionsImperialis: 'Epic-scale representation of the bombardment and initial landing waves. 2000-3000 army points for full campaign simulation.'
    }
  },
  {
    id: '2',
    name: 'Drop Site Massacre - Initial Landing',
    campaign: 'Drop Site Campaign',
    chronology: 'Early Heresy',
    date: '010.M31',
    factions: ['Iron Warriors (Traitor)', 'Night Lords (Traitor)', 'Iron Hands (Loyalist)', 'Salamanders (Loyalist)', 'Emperor\'s Children (Traitor)'],
    keyFigures: ['Perturabo', 'Curze', 'Ferrus Manus', 'Vulkan', 'Fulgrim'],
    description: 'The catastrophic drop site massacre where loyalist forces were ambushed and devastated by superior traitor numbers. One of the most brutal engagements of the Heresy.',
    notableIncidents: [
      'Loyalist orbital superiority lost',
      'Ferrus Manus falls to Fulgrim',
      'Iron Hands and Salamanders decimated',
      'Strategic turning point of the war'
    ],
    sources: ['Horus Heresy Book Two: Massacre', 'Drop Site Massacre Campaign Book'],
    recommendedReading: ['Vengeful Son by Graham McNeill', 'A Betrayal of Flesh by Frank Dunn'],
    terrainTypes: ['Volcanic plains', 'Industrial facility', 'Fortified position'],
    combatStyles: ['Ambush', 'Drop assault', 'Armor engagement', 'Close quarter combat'],
    scale: 'Campaign',
    tabletopAdaptations: {
      ageOfDarkness: 'Epic engagement requiring multiple games. Suggested 10,000-15,000 points per side across a campaign. Use primary detachments with heavy armor focus.',
      zoneMortalis: 'Recreate the combat in fortress-undercroft levels. Multiple linked games recommended. Excellent for narrative campaign play.',
      legionsImperialis: 'Perfect for Epic-scale representation. Massive engagement: 5000-8000 army points per side minimum. Incorporates air support and heavy armor.',
      supplementary: 'Consider using this as multi-round campaign event with scenario-based play progression.'
    }
  }
]

export default function Home() {
  const [battles, setBattles] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [chronologyFilter, setChronologyFilter] = useState('All')
  const [factionFilter, setFactionFilter] = useState('All')
  const [combatStyleFilter, setCombatStyleFilter] = useState('All')
  const [showForm, setShowForm] = useState(false)
  const [editingBattle, setEditingBattle] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null)

  // Load battles from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('horusHeresyBattles')
    if (stored) {
      try {
        setBattles(JSON.parse(stored))
      } catch (e) {
        setBattles(SAMPLE_BATTLES)
        localStorage.setItem('horusHeresyBattles', JSON.stringify(SAMPLE_BATTLES))
      }
    } else {
      setBattles(SAMPLE_BATTLES)
      localStorage.setItem('horusHeresyBattles', JSON.stringify(SAMPLE_BATTLES))
    }
  }, [])

  // Save battles to localStorage
  const saveBattles = (newBattles) => {
    setBattles(newBattles)
    localStorage.setItem('horusHeresyBattles', JSON.stringify(newBattles))
  }

  // Get unique values for filters
  const getAllChronologies = () => {
    const chronologies = new Set(battles.map(b => b.chronology))
    return ['All', ...Array.from(chronologies).sort()]
  }

  const getAllFactions = () => {
    const factions = new Set()
    battles.forEach(b => {
      b.factions.forEach(f => {
        const baseFaction = f.replace(' (Loyalist)', '').replace(' (Traitor)', '')
        factions.add(baseFaction)
      })
    })
    return ['All', ...Array.from(factions).sort()]
  }

  const getAllCombatStyles = () => {
    const styles = new Set()
    battles.forEach(b => {
      b.combatStyles.forEach(style => styles.add(style))
    })
    return ['All', ...Array.from(styles).sort()]
  }

  // Filter battles
  const filteredBattles = battles.filter(battle => {
    const matchesSearch = 
      searchTerm === '' ||
      battle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      battle.campaign.toLowerCase().includes(searchTerm.toLowerCase()) ||
      battle.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesChronology = 
      chronologyFilter === 'All' || 
      battle.chronology === chronologyFilter

    const matchesFaction =
      factionFilter === 'All' ||
      battle.factions.some(f => f.includes(factionFilter))

    const matchesCombatStyle =
      combatStyleFilter === 'All' ||
      battle.combatStyles.includes(combatStyleFilter)

    return matchesSearch && matchesChronology && matchesFaction && matchesCombatStyle
  })

  const handleAddBattle = (battleData) => {
    const newBattle = {
      ...battleData,
      id: Date.now().toString()
    }
    saveBattles([...battles, newBattle])
    setShowForm(false)
  }

  const handleUpdateBattle = (battleData) => {
    const updated = battles.map(b => b.id === editingBattle.id ? { ...battleData, id: b.id } : b)
    saveBattles(updated)
    setEditingBattle(null)
    setShowForm(false)
  }

  const handleDeleteBattle = (id) => {
    saveBattles(battles.filter(b => b.id !== id))
    setShowDeleteConfirm(null)
  }

  const handleEditClick = (battle) => {
    setEditingBattle(battle)
    setShowForm(true)
  }

  const handleFormClose = () => {
    setShowForm(false)
    setEditingBattle(null)
  }

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="border-b border-red-900/50 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Shield className="w-8 h-8 text-red-600" />
            <h1 className="text-4xl font-bold text-red-500">HORUS HERESY</h1>
            <Shield className="w-8 h-8 text-red-600" />
          </div>
          <p className="text-center text-gray-400 text-sm tracking-widest">BATTLE REPOSITORY // M31</p>
        </div>
      </header>

      {/* Controls */}
      <div className="border-b border-red-900/50 py-6 px-4 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          {/* Search and Add */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search battles by name, campaign, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-red-600 transition"
              />
            </div>
            <button
              onClick={() => {
                setEditingBattle(null)
                setShowForm(true)
              }}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition font-medium"
            >
              <Plus className="w-5 h-5" />
              Add Battle
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Filter className="w-4 h-4" />
              <span>Filters:</span>
            </div>
            <select
              value={chronologyFilter}
              onChange={(e) => setChronologyFilter(e.target.value)}
              className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-gray-100 text-sm focus:outline-none focus:border-red-600 transition"
            >
              {getAllChronologies().map(chrono => (
                <option key={chrono} value={chrono}>{chrono || 'Chronology'}</option>
              ))}
            </select>
            <select
              value={factionFilter}
              onChange={(e) => setFactionFilter(e.target.value)}
              className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-gray-100 text-sm focus:outline-none focus:border-red-600 transition"
            >
              {getAllFactions().map(faction => (
                <option key={faction} value={faction}>{faction || 'Faction'}</option>
              ))}
            </select>
            <select
              value={combatStyleFilter}
              onChange={(e) => setCombatStyleFilter(e.target.value)}
              className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-gray-100 text-sm focus:outline-none focus:border-red-600 transition"
            >
              {getAllCombatStyles().map(style => (
                <option key={style} value={style}>{style || 'Combat Style'}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Battles Grid */}
      <div className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {filteredBattles.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Swords className="w-12 h-12 text-red-600 mb-4" />
              <p className="text-gray-400 text-lg">No battles found matching your criteria.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBattles.map(battle => (
                <BattleCard
                  key={battle.id}
                  battle={battle}
                  onEdit={handleEditClick}
                  onDeleteClick={() => setShowDeleteConfirm(battle.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 max-w-sm w-full">
            <p className="text-gray-100 mb-6">Are you sure you want to delete this battle? This action cannot be undone.</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-gray-100 rounded-lg transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteBattle(showDeleteConfirm)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Battle Form Modal */}
      {showForm && (
        <BattleForm
          battle={editingBattle}
          onSubmit={editingBattle ? handleUpdateBattle : handleAddBattle}
          onClose={handleFormClose}
        />
      )}
    </main>
  )
}
