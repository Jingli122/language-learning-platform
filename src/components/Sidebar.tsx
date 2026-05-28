import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  MessageSquare, 
  FileText, 
  BarChart3, 
  Settings,
  BookOpen,
  CheckSquare,
  Database,
  ChevronDown,
  Menu,
  X
} from 'lucide-react';

interface MenuItem {
  id: string;
  label: string;
  icon: any;
  path: string;
  children?: { label: string; path: string }[];
}

const menuItems: MenuItem[] = [
  { id: 'workbench', label: '工作台', icon: MessageSquare, path: '/' },
  { id: 'vouchers', label: '凭证列表', icon: FileText, path: '/vouchers' },
  { 
    id: 'reports', 
    label: '会计报表', 
    icon: BarChart3, 
    path: '/reports',
    children: [
      { label: '资产负债表', path: '/reports/balance' },
      { label: '现金流量表', path: '/reports/cashflow' },
      { label: '利润表', path: '/reports/profit' },
    ]
  },
  { 
    id: 'basic-settings', 
    label: '基础设置', 
    icon: Settings, 
    path: '/settings',
    children: [
      { label: '科目设置', path: '/settings/accounts' },
      { label: '辅助核算', path: '/settings/auxiliary' },
    ]
  },
  { id: 'account-set', label: '账套管理', icon: Database, path: '/account-set' },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>(['reports', 'basic-settings']);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSubmenu = (id: string) => {
    setExpandedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path);
  };

  return (
    <>
      <button
        className="fixed top-4 left-4 z-50 lg:hidden p-2 bg-white rounded-lg shadow-md"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      <aside 
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 z-40 transform transition-transform duration-300 lg:transform-none ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="h-16 flex items-center px-4 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-2">
              <span className="text-white font-bold text-sm">云</span>
            </div>
            <span className="font-bold text-gray-900">云财务</span>
          </div>
        </div>

        <nav className="p-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const hasChildren = item.children && item.children.length > 0;
            const isExpanded = expandedItems.includes(item.id);
            const active = isActive(item.path);

            return (
              <div key={item.id} className="mb-1">
                <button
                  onClick={() => {
                    if (hasChildren) {
                      toggleSubmenu(item.id);
                    } else {
                      navigate(item.path);
                      setMobileMenuOpen(false);
                    }
                  }}
                  className={`w-full flex items-center px-3 py-2.5 rounded-lg text-left transition-colors ${
                    active && !hasChildren
                      ? 'bg-orange-50 text-orange-600' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  <span className="flex-1 font-medium">{item.label}</span>
                  {hasChildren && (
                    <ChevronDown 
                      className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
                    />
                  )}
                </button>

                {hasChildren && isExpanded && (
                  <div className="ml-4 mt-1 space-y-1">
                    {item.children!.map((child, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          navigate(child.path);
                          setMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center px-3 py-2 rounded-lg text-left text-sm transition-colors ${
                          location.pathname === child.path
                            ? 'bg-orange-50 text-orange-600'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {child.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 px-4 py-3 border-t border-gray-200 text-xs text-gray-500">
          Copyright © 2026 云财务 版权所有
        </div>
      </aside>

      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
