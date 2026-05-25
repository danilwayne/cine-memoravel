import './SectionHeader.css'

export interface TabOption {
  id: string
  label: string
}

interface SectionHeaderProps {
  title: string
  tabs?: TabOption[]
  activeTab?: string
  onTabChange?: (id: string) => void
  variant?: 'light' | 'dark'
}

export function SectionHeader({
  title,
  tabs,
  activeTab,
  onTabChange,
  variant = 'light',
}: SectionHeaderProps) {
  return (
    <div className={`section-header section-header--${variant}`}>
      <h2 className="section-header__title">{title}</h2>

      {tabs && tabs.length > 0 && (
        <div className="section-header__tabs" role="tablist">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              className={
                activeTab === tab.id
                  ? 'section-header__tab section-header__tab--active'
                  : 'section-header__tab'
              }
              onClick={() => onTabChange?.(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
