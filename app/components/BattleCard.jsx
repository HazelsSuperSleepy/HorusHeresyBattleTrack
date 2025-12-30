'use client'

import { useState } from 'react'
import { Edit2, Trash2, ChevronDown, ChevronUp } from 'lucide-react'

export default function BattleCard({ battle, onEdit, onDeleteClick }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden hover:border-red-600/50 transition">
      {/* Collapsed View */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-red-500 mb-1">{battle.name}</h3>
            <p className="text-sm text-gray-400 mb-2">{battle.campaign} • {battle.date}</p>
            <p className="text-sm text-gray-400 mb-3">{battle.chronology}</p>
          </div>
          <div className="flex gap-2 ml-4">
            <button
              onClick={() => onEdit(battle)}
              className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition"
              title="Edit"
            >
              <Edit2 className="w-5 h-5 text-yellow-500" />
            </button>
            <button
              onClick={() => onDeleteClick()}
              className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition"
              title="Delete"
            >
              <Trash2 className="w-5 h-5 text-red-500" />
            </button>
          </div>
        </div>

        <p className="text-gray-300 text-sm mb-4 line-clamp-2">{battle.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {battle.combatStyles.map((style, idx) => (
            <span key={idx} className="px-2 py-1 bg-red-900/40 text-red-300 text-xs rounded">
              {style}
            </span>
          ))}
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-red-500 hover:text-red-400 transition text-sm font-medium"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-4 h-4" />
              Show Less Details
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              Show More Details
            </>
          )}
        </button>
      </div>

      {/* Expanded View */}
      {isExpanded && (
        <div className="border-t border-slate-700 px-6 py-4 bg-slate-900/50 space-y-4">
          {/* Factions */}
          {battle.factions.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-2">FACTIONS</h4>
              <div className="flex flex-wrap gap-2">
                {battle.factions.map((faction, idx) => (
                  <span
                    key={idx}
                    className={`px-3 py-1 rounded text-sm ${
                      faction.includes('Loyalist')
                        ? 'bg-blue-900/40 text-blue-300'
                        : 'bg-red-900/40 text-red-300'
                    }`}
                  >
                    {faction}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Key Figures */}
          {battle.keyFigures.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-2">KEY FIGURES</h4>
              <p className="text-gray-400 text-sm">{battle.keyFigures.join(', ')}</p>
            </div>
          )}

          {/* Terrain */}
          {battle.terrainTypes.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-2">TERRAIN</h4>
              <div className="flex flex-wrap gap-2">
                {battle.terrainTypes.map((terrain, idx) => (
                  <span key={idx} className="px-3 py-1 bg-green-900/40 text-green-300 rounded text-sm">
                    {terrain}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Notable Incidents */}
          {battle.notableIncidents.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-2">NOTABLE INCIDENTS</h4>
              <ul className="text-gray-400 text-sm space-y-1">
                {battle.notableIncidents.map((incident, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="text-red-500 flex-shrink-0">•</span>
                    <span>{incident}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tabletop Adaptations */}
          <div>
            <h4 className="text-sm font-semibold text-gray-300 mb-3">TABLETOP ADAPTATIONS</h4>
            <div className="space-y-3">
              {battle.tabletopAdaptations.ageOfDarkness && (
                <div className="bg-slate-800/50 p-3 rounded border border-yellow-900/30">
                  <p className="text-yellow-500 text-sm font-semibold mb-1">Age of Darkness 3.0</p>
                  <p className="text-gray-400 text-sm">{battle.tabletopAdaptations.ageOfDarkness}</p>
                </div>
              )}
              {battle.tabletopAdaptations.zoneMortalis && (
                <div className="bg-slate-800/50 p-3 rounded border border-blue-900/30">
                  <p className="text-blue-400 text-sm font-semibold mb-1">Zone Mortalis</p>
                  <p className="text-gray-400 text-sm">{battle.tabletopAdaptations.zoneMortalis}</p>
                </div>
              )}
              {battle.tabletopAdaptations.legionsImperialis && (
                <div className="bg-slate-800/50 p-3 rounded border border-green-900/30">
                  <p className="text-green-400 text-sm font-semibold mb-1">Legions Imperialis</p>
                  <p className="text-gray-400 text-sm">{battle.tabletopAdaptations.legionsImperialis}</p>
                </div>
              )}
            </div>
          </div>

          {/* Sources */}
          {battle.sources.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-2">SOURCES</h4>
              <ul className="text-gray-400 text-sm space-y-1">
                {battle.sources.map((source, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="text-gray-500 flex-shrink-0">▪</span>
                    <span>{source}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Recommended Reading */}
          {battle.recommendedReading.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-2">RECOMMENDED READING</h4>
              <ul className="text-gray-400 text-sm space-y-1">
                {battle.recommendedReading.map((reading, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="text-purple-500 flex-shrink-0">📖</span>
                    <span>{reading}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Scale */}
          <div className="pt-2 border-t border-slate-700">
            <p className="text-gray-400 text-sm">
              <span className="text-gray-300 font-semibold">Scale:</span> {battle.scale}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
