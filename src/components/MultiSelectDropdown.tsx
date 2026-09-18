import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, X } from 'lucide-react';

interface MultiSelectDropdownProps {
  options: { value: string; label: string }[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  className?: string;
}

export default function MultiSelectDropdown({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  className = '',
}: MultiSelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (optionValue: string) => {
    if (value.includes(optionValue)) {
      // Remove from selection
      onChange(value.filter(v => v !== optionValue));
    } else {
      // Add to selection
      onChange([...value, optionValue]);
    }
  };

  const handleRemove = (optionValue: string, event: React.MouseEvent) => {
    event.stopPropagation();
    onChange(value.filter(v => v !== optionValue));
  };

  const getDisplayText = () => {
    if (value.length === 0) {
      return placeholder;
    }
    if (value.length === 1) {
      return options.find(opt => opt.value === value[0])?.label || value[0];
    }
    return `${value.length} selected`;
  };

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      {/* Dropdown Trigger */}
      <button
        type="button"
        onClick={handleToggle}
        className="w-full px-3 py-2 text-left border border-gray-300 rounded-lg bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors flex items-center justify-between"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={`flex-1 truncate ${value.length === 0 ? 'text-gray-400' : 'text-gray-900'}`}>
          {getDisplayText()}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          <ul role="listbox" aria-multiselectable="true" className="py-1">
            {options.map((option) => {
              const isSelected = value.includes(option.value);
              return (
                <li
                  key={option.value}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(option.value)}
                  className={`px-3 py-2 cursor-pointer hover:bg-gray-100 flex items-center justify-between ${
                    isSelected ? 'bg-blue-50' : ''
                  }`}
                >
                  <span className="flex-1">{option.label}</span>
                  {isSelected && (
                    <button
                      type="button"
                      onClick={(e) => handleRemove(option.value, e)}
                      className="ml-2 text-gray-400 hover:text-gray-600"
                      aria-label={`Remove ${option.label}`}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Selected Tags */}
      {value.length > 1 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {value.map((val) => {
            const option = options.find(opt => opt.value === val);
            return (
              <span
                key={val}
                className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded"
              >
                {option?.label || val}
                <button
                  type="button"
                  onClick={(e) => handleRemove(val, e)}
                  className="hover:text-blue-900"
                  aria-label={`Remove ${option?.label || val}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
