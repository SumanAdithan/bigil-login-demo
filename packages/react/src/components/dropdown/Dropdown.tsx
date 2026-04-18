import * as React from 'react';
import { ChevronDown, X, Shield, Edit3, Eye, Users, ShieldCheck } from 'lucide-react';
import { cn } from '../../lib/utils';
import { DropdownMenu, DropdownMenuItem } from '../dropdown-menu';

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
    const [anchorRect, setAnchorRect] = React.useState<{ top: number; left: number; width: number } | undefined>();
    
    const triggerRef = React.useRef<HTMLDivElement>(null);

    // Sync internal state with prop value
    React.useEffect(() => {
      if (value !== undefined) {
        setSelectedValues(Array.isArray(value) ? value : [value]);
      }
    }, [value]);

    const updatePosition = React.useCallback(() => {
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        setAnchorRect({
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
    
    const getIcon = (iconName: string) => {
      const iconSize = 18;
      const iconColor = '#64748B';
      
      const iconMap: Record<string, React.ReactNode> = {
        'shield': <Shield size={iconSize} color={iconColor} />,
        'edit': <Edit3 size={iconSize} color={iconColor} />,
        'eye': <Eye size={iconSize} color={iconColor} />,
        'users': <Users size={iconSize} color={iconColor} />,
        'shield-check': <ShieldCheck size={iconSize} color={iconColor} />
      };

      return iconMap[iconName] || <div style={{ width: 18, height: 18, borderRadius: '50%', backgroundColor: '#E2E8F0' }} />;
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

        <DropdownMenu 
          isOpen={isOpen} 
          onClose={() => setIsOpen(false)}
          anchorRect={anchorRect}
        >
          {options.map(option => {
            const isSelected = selectedValues.includes(option.value);
            return (
              <DropdownMenuItem
                key={option.value}
                selected={isSelected}
                variant={type === 'multi' ? 'checkbox' : 'single'}
                icon={option.icon ? getIcon(option.icon) : undefined}
                supportText={option.support}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect(option);
                }}
              >
                {option.label}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenu>
      </div>
    );
  }
);

Dropdown.displayName = 'Dropdown';

export default Dropdown;
