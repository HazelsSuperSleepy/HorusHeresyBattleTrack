'use client'

import { useState } from 'react'
import { X, Plus } from 'lucide-react'

export default function BattleForm({ battle, onSubmit, onClose }) {
  const isEditMode = !!battle

  const [formData, setFormData] = useState(
    battle || {
      name: '',
      campaign: '',
      chronology: '',
      date: '',
      factions: [],
      keyFigures: [],
      description: '',
      notableIncidents: [],
      sources: [],
      recommendedReading: [],
      terrainTypes: [],
      combatStyles: [],
      scale: 'Skirmish',
      tabletopAdaptations: {
        ageOfDarkness: '',
        zoneMortalis: '',
        legionsImperialis: ''
      }
    }
  )

  const [tempArrayInputs, setTempArrayInputs] = useState({
    factions: '',
    keyFigures: '',
    notableIncidents: '',
    sources: '',
    recommendedReading: '',
    terrainTypes: '',
    combatStyles: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name in formData.tabletopAdaptations) {
      setFormData(prev => ({
        ...prev,
        tabletopAdaptations: {
          ...prev.tabletopAdaptations,
          [name]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleArrayInputChange = (field, value) => {
    setTempArrayInputs(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleArrayInputKeyDown = (e, field) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addArrayItem(field)
    }
  }

  const addArrayItem = (field) => {
    const value = tempArrayInputs[field].trim()
    if (value) {
      setFormData(prev => ({
        ...prev,
        [field]: [...prev[field], value]
      }))
      setTempArrayInputs(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  const removeArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validation
    if (!formData.name.trim()) {
      alert('Battle name is required')
      return
    }
    if (!formData.campaign.trim()) {
      alert('Campaign is required')
      return
    }
    if (!formData.date.trim()) {
      alert('Date is required')
      return
    }
    if (!formData.chronology.trim()) {
      alert('Chronology is required')
      return
    }
    if (!formData.scale.trim()) {
      alert('Scale is required')
      return
    }
    if (!formData.description.trim()) {
      alert('Description is required')
      return
    }
    if (!formData.tabletopAdaptations.ageOfDarkness.trim()) {
      alert('Age of Darkness adaptation is required')
      return
    }
    if (!formData.tabletopAdaptations.zoneMortalis.trim()) {
      alert('Zone Mortalis adaptation is required')
      return
    }
    if (!formData.tabletopAdaptations.legionsImperialis.trim()) {
      alert('Legions Imperialis adaptation is required')
      return
    }

    onSubmit(formData)
  }

  const arrayFields = [
    { key: 'factions', label: 'FACTIONS' },
    { key: 'keyFigures', label: 'KEY FIGURES' },
    { key: 'notableIncidents', label: 'NOTABLE INCIDENTS' },
    { key: 'terrainTypes', label: 'TERRAIN TYPES' },
    { key: 'combatStyles', label: 'COMBAT STYLES' },
    { key: 'sources', label: 'SOURCES' },
    { key: 'recommendedReading', label: 'RECOMMENDED READING' }
  ]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 border border-slate-700 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-slate-900 border-b border-slate-700 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-red-500">
            {isEditMode ? 'EDIT BATTLE' : 'NEW BATTLE'}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-700 rounded transition"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Fields - Two Column */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Battle Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-red-600 transition"
                placeholder="e.g., Isstvan III - Initial Bombardment"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Campaign *</label>
              <input
                type="text"
                name="campaign"
                value={formData.campaign}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-red-600 transition"
                placeholder="e.g., Isstvan Campaign"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Date *</label>
              <input
                type="text"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-red-600 transition"
                placeholder="e.g., 005.M31"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Chronology *</label>
              <input
                type="text"
                name="chronology"
                value={formData.chronology}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-red-600 transition"
                placeholder="e.g., Early Heresy"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Scale *</label>
              <select
                name="scale"
                value={formData.scale}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-gray-100 focus:outline-none focus:border-red-600 transition"
                required
              >
                <option value="Skirmish">Skirmish</option>
                <option value="Engagement">Engagement</option>
                <option value="Major Engagement">Major Engagement</option>
                <option value="Campaign">Campaign</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-red-600 transition h-24 resize-none"
              placeholder="Detailed description of the battle..."
              required
            />
          </div>

          {/* Array Fields */}
          {arrayFields.map(field => (
            <div key={field.key}>
              <label className="block text-sm font-semibold text-gray-300 mb-2">{field.label}</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={tempArrayInputs[field.key]}
                  onChange={(e) => handleArrayInputChange(field.key, e.target.value)}
                  onKeyDown={(e) => handleArrayInputKeyDown(e, field.key)}
                  className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-red-600 transition"
                  placeholder={`Add ${field.label.toLowerCase()}... (press Enter)`}
                />
                <button
                  type="button"
                  onClick={() => addArrayItem(field.key)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              {formData[field.key].length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData[field.key].map((item, index) => (
                    <div
                      key={index}
                      className="px-3 py-1 bg-red-900/40 text-red-300 rounded-full flex items-center gap-2"
                    >
                      <span className="text-sm">{item}</span>
                      <button
                        type="button"
                        onClick={() => removeArrayItem(field.key, index)}
                        className="hover:text-red-200 transition"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Tabletop Adaptations */}
          <div className="space-y-4 pt-4 border-t border-slate-700">
            <h3 className="text-lg font-bold text-red-500">TABLETOP ADAPTATIONS</h3>
            
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Age of Darkness 3.0 *</label>
              <textarea
                name="ageOfDarkness"
                value={formData.tabletopAdaptations.ageOfDarkness}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-yellow-600 transition h-24 resize-none"
                placeholder="Adaptation notes for Age of Darkness 3.0..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Zone Mortalis *</label>
              <textarea
                name="zoneMortalis"
                value={formData.tabletopAdaptations.zoneMortalis}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-600 transition h-24 resize-none"
                placeholder="Adaptation notes for Zone Mortalis..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Legions Imperialis *</label>
              <textarea
                name="legionsImperialis"
                value={formData.tabletopAdaptations.legionsImperialis}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-green-600 transition h-24 resize-none"
                placeholder="Adaptation notes for Legions Imperialis..."
                required
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 justify-end pt-4 border-t border-slate-700">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-gray-100 rounded-lg transition font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition font-medium"
            >
              {isEditMode ? 'Update Battle' : 'Create Battle'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
