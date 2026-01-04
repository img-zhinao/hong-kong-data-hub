import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MarketTicker } from './MarketTicker';
import logo from '@/assets/hkbde-logo.png';

const navItems = [
  { name: '首页', path: '/' },
  { name: '政策法规', path: '/policy' },
  { 
    name: '行业动态', 
    path: '/news',
    children: [
      { name: '数交所动态', path: '/news?tab=exchange' },
      { name: '行业资讯', path: '/news?tab=industry' },
      { name: '企业快讯', path: '/news?tab=enterprise' },
    ]
  },
  { name: '专家观点', path: '/insights' },
  { name: '数商生态', path: '/data-merchants' },
  { name: '活动会议', path: '/events' },
  { name: '关于我们', path: '/about' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50">
      {/* Market Ticker */}
      <MarketTicker />

      {/* Main Header */}
      <div className="bg-card border-b shadow-sm">
        <div className="container flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src={logo} 
              alt="HKBDE Logo" 
              className="h-14 w-auto transition-transform duration-300 group-hover:scale-105"
            />
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-foreground leading-tight">
                香港大数据交易所
              </h1>
              <p className="text-xs text-muted-foreground">
                Hong Kong Big Data Exchange
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center">
            {navItems.map((item) => (
              <div key={item.path} className="relative group">
                <Link
                  to={item.path}
                  className={`nav-link flex items-center gap-1 ${
                    location.pathname === item.path ? 'text-primary active' : 'text-foreground hover:text-primary'
                  }`}
                >
                  {item.name}
                  {item.children && <ChevronDown className="w-3 h-3" />}
                </Link>
                {item.children && (
                  <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="bg-card rounded-lg shadow-lg border py-2 min-w-[160px]">
                      {item.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-primary transition-colors"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Search, Language & Admin */}
          <div className="flex items-center gap-1">
            {isSearchOpen ? (
              <div className="flex items-center gap-2 animate-fade-in">
                <Input 
                  placeholder="搜索..." 
                  className="w-48 h-9"
                  autoFocus
                />
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setIsSearchOpen(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="w-5 h-5" />
              </Button>
            )}

            <span className="hidden md:inline-block text-sm text-muted-foreground px-3 py-2 hover:text-foreground cursor-pointer transition-colors">
              English
            </span>
            <Link 
              to="/admin" 
              className="hidden md:inline-block text-sm text-primary hover:text-primary/80 px-3 py-2 transition-colors"
            >
              管理后台
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t bg-card animate-slide-up">
            <nav className="container py-4 space-y-1">
              {navItems.map((item) => (
                <div key={item.path}>
                  <Link
                    to={item.path}
                    className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                      location.pathname === item.path 
                        ? 'bg-primary/10 text-primary' 
                        : 'text-foreground hover:bg-accent'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.children && (
                    <div className="pl-6 space-y-1 mt-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
