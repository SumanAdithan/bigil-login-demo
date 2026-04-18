import * as React from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown, X, Check, Shield, Edit3, Eye, Users, ShieldCheck } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface DropdownOption {
  label: string;
  value: string;
  icon?: string;
  support?: string;
}

export interface DropdownProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  label?: string;
  placeholder?: string;
  options: DropdownOption[];
  type?: 'single' | 'multi';
  error?: boolean;
  hint?: string;
  disabled?: boolean;
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
}

const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
  ({ 
    label, 
    placeholder = 'Select an option', 
    options = [], 
    type = 'single', 
    error, 
    hint, 
    disabled,
    value,
    onChange,
    className,
    ...props 
  }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [selectedValues, setSelectedValues] = React.useState<string[]>([]);
    const [menuCoords, setMenuCoords] = React.useState({ top: 0, left: 0, width: 0 });
    
    const triggerRef = React.useRef<HTMLDivElement>(null);
    const menuRef = React.useRef<HTMLDivElement>(null);

    // Sync internal state with prop value
    React.useEffect(() => {
      if (value !== undefined) {
        setSelectedValues(Array.isArray(value) ? value : [value]);
      }
    }, [value]);

    const updatePosition = React.useCallback(() => {
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        setMenuCoords({
          top: rect.bottom + 4,
          left: rect.left,
          width: rect.width
        });
      }
    }, []);

    React.useEffect(() => {
      if (isOpen) {
        updatePosition();
        window.addEventListener('scroll', updatePosition, true);
        window.addEventListener('resize', updatePosition);
      }
      return () => {
        window.removeEventListener('scroll', updatePosition, true);
        window.removeEventListener('resize', updatePosition);
      };
    }, [isOpen, updatePosition]);

    // Handle outside clicks
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          triggerRef.current && !triggerRef.current.contains(event.target as Node) &&
          menuRef.current && !menuRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener('click', handleClickOutside);
      }
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }, [isOpen]);

    const toggleOpen = () => {
      if (!disabled) setIsOpen(!isOpen);
    };

    const handleSelect = (option: DropdownOption) => {
      let newValues: string[];
      if (type === 'single') {
        newValues = [option.value];
        setIsOpen(false);
      } else {
        newValues = selectedValues.includes(option.value)
          ? selectedValues.filter(v => v !== option.value)
          : [...selectedValues, option.value];
      }
      
      if (value === undefined) setSelectedValues(newValues);
      if (onChange) onChange(type === 'single' ? newValues[0] : newValues);
    };

    const handleRemoveTag = (e: React.MouseEvent, val: string) => {
      e.stopPropagation();
      const newValues = selectedValues.filter(v => v !== val);
      if (value === undefined) setSelectedValues(newValues);
      if (onChange) onChange(newValues);
    };

    const handleClearAll = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (value === undefined) setSelectedValues([]);
      if (onChange) onChange([]);
    };

    const selectedOptions = options.filter(opt => selectedValues.includes(opt.value));
    
    const renderIcon = (iconName: string) => {
      const iconSize = 18;
      const iconColor = '#64748B';
      
      // Mapping for sample icons
      const iconMap: Record<string, React.ReactNode> = {
        'shield': <Shield size={iconSize} color={iconColor} />,
        'edit': <Edit3 size={iconSize} color={iconColor} />,
        'eye': <Eye size={iconSize} color={iconColor} />,
        'users': <Users size={iconSize} color={iconColor} />,
        'shield-check': <ShieldCheck size={iconSize} color={iconColor} />
      };

      return (
        <div className="dropdown-menu-item__icon">
          {iconMap[iconName] || <div style={{ width: 18, height: 18, borderRadius: '50%', backgroundColor: '#E2E8F0' }} />}
        </div>
      );
    };

    return (
      <div className={cn('dropdown-input-container', error && 'dropdown-input-container--error', className)} ref={ref} {...props}>
        {label && <label className="dropdown-input-label">{label}</label>}
        
        <div 
          ref={triggerRef}
          className={cn(
            'dropdown-input-wrapper',
            isOpen && 'dropdown-input-wrapper--open',
            disabled && 'dropdown-input-wrapper--disabled',
            error && 'dropdown-input-wrapper--error'
          )}
          onClick={toggleOpen}
          tabIndex={disabled ? -1 : 0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              toggleOpen();
            } else if (e.key === 'Escape') {
              setIsOpen(false);
            }
          }}
        >
          {type === 'single' ? (
            <>
              {selectedOptions.length > 0 ? (
                <span className="dropdown-input-value">{selectedOptions[0].label}</span>
              ) : (
                <span className="dropdown-input-placeholder">{placeholder}</span>
              )}
            </>
          ) : (
            <>
              {selectedValues.length > 0 ? (
                <div className="dropdown-input-tags">
                  {selectedOptions.map(opt => (
                    <div key={opt.value} className="dropdown-input-tag">
                      {opt.label}
                      <span className="dropdown-input-tag-close" onClick={(e) => handleRemoveTag(e, opt.value)}>
                        <X size={12} />
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <span className="dropdown-input-placeholder">{placeholder}</span>
              )}
            </>
          )}

          <div className="dropdown-input-multi-controls">
            {type === 'multi' && selectedValues.length > 0 && (
              <>
                <div className="dropdown-input-tag-close dropdown-input-clear-all" onClick={handleClearAll} title="Clear all">
                  <X size={16} />
                </div>
                <div className="dropdown-input-separator" />
              </>
            )}
            <div className="dropdown-input-chevron">
              <ChevronDown size={16} />
            </div>
          </div>
        </div>

        {hint && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
             {error && (
               <div className="dropdown-input-error-icon">!</div>
             )}
             <span className="dropdown-input-hint">{hint}</span>
          </div>
        )}

        {isOpen && createPortal(
          <div 
            ref={menuRef}
            className="dropdown-menu dropdown-menu--open"
            style={{
              position: 'fixed',
              top: menuCoords.top,
              left: menuCoords.left,
              width: menuCoords.width,
              zIndex: 9999
            }}
          >
            {options.map(option => {
              const isSelected = selectedValues.includes(option.value);
              return (
                <button
                  key={option.value}
                  className={cn(
                    'dropdown-menu-item',
                    type === 'single' && isSelected && 'dropdown-menu-item--selected-single',
                    type === 'multi' && isSelected && 'dropdown-menu-item--selected-checkbox'
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(option);
                  }}
                >
                  {type === 'multi' && (
                    <div className="checkbox-wrapper">
                      {isSelected && <Check size={12} />}
                    </div>
                  )}
                  
                  {option.icon && renderIcon(option.icon)}

                  <div className="dropdown-menu-item__content">
                    <span className="dropdown-menu-item__text">{option.label}</span>
                    {option.support && <span className="dropdown-menu-item__support-text">{option.support}</span>}
                  </div>
                </button>
              );
            })}
          </div>,
          document.body
        )}
      </div>
    );
  }
);

Dropdown.displayName = 'Dropdown';

export default Dropdown;
