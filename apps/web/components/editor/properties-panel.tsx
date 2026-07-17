import { Placeholder } from '@/types/placeholders.types'
import React from 'react'

type PanelProps = {
    placeholder: Placeholder | undefined;
    onUpdate: (updated: Placeholder) => void;
}

/*
Placeholder

Name
Key

Position
X
Y

Size
Width
Height */
function PropertiesPanel({ placeholder, onUpdate }: PanelProps) {
    return (
        <div className="w-64 border-l bg-background p-4">
            <h2 className="mb-4 text-lg font-semibold">Properties</h2>
            
            {placeholder ? (
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            value={placeholder.name}
                            onChange={(e) => onUpdate({ ...placeholder, name: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Key</label>
                        <input
                            type="text"
                            value={placeholder.key}
                            onChange={(e) => onUpdate({ ...placeholder, key: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>

                    {/* Rest properties are just displayed, user cannot edit them */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Position</label>
                        <div className="mt-1 grid grid-cols-2 gap-2">
                            <div>
                                <label className="block text-xs text-gray-500">X</label>
                                <input
                                    type="number"
                                    value={placeholder.x}
                                    onChange={(e) => onUpdate({ ...placeholder, x: parseInt(e.target.value) })}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-500">Y</label>
                                <input
                                    type="number"
                                    value={placeholder.y}
                                    onChange={(e) => onUpdate({ ...placeholder, y: parseInt(e.target.value) })}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Size</label>
                        <div className="mt-1 grid grid-cols-2 gap-2">
                            <div>
                                <label className="block text-xs text-gray-500">Width</label>
                                <input
                                    type="number"
                                    value={placeholder.width}
                                    onChange={(e) => onUpdate({ ...placeholder, width: parseInt(e.target.value) })}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-500">Height</label>
                                <input
                                    type="number"
                                    value={placeholder.height}
                                    onChange={(e) => onUpdate({ ...placeholder, height: parseInt(e.target.value) })}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Font Size</label>
                        <input
                            type="number"
                            value={placeholder.fontSize}
                            onChange={(e) => onUpdate({ ...placeholder, fontSize: parseInt(e.target.value) })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                </div>
            ) : (
                <p className="text-sm text-gray-500">Select a placeholder to edit its properties.</p>
            )}
        </div>
    )
}

export default PropertiesPanel