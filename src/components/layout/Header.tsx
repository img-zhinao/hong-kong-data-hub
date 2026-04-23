import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search, Menu, X, ChevronDown, User, LogOut, Database, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MarketTicker } from './MarketTicker';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/toaster';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import logo from '@/assets/hkbde-logo.png';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, loading, signOut } = useAuth();
  const { toast } = useToast();
  const { t } = useTranslation();

  const navItems: Array<{ name: string; path: string; highlight?: boolean; children?: Array<{ name: string; path: string }> }> = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.products'), path: '/products' },
    { name: t('nav.tokenHub'), path: '/token-hub', highlight: true },
    { name: t('nav.dataAsset'), path: '/data-asset' },
    { name: t('nav.policy'), path: '/policy' },
    {
      name: t('nav.news'),
      path: '/news',
      children: [
        { name: t('nav.newsExchange'), path: '/news?tab=数交所动态' },
        { name: t('nav.newsIndustry'), path: '/news?tab=行业资讯' },
        { name: t('nav.newsEnterprise'), path: '/news?tab=企业快讯' },
        { name: t('nav.insights'), path: '/insights' },
      ],
    },
    {
      name: t('nav.merchants'),
      path: '/data-merchants',
      children: [
        { name: t('nav.merchants'), path: '/data-merchants' },
        { name: t('nav.opportunities'), path: '/opportunities' },
        { name: t('nav.events'), path: '/events' },
      ],
    },
    { name: t('nav.openclaw'), path: '/openclaw', highlight: true },
    { name: t('nav.about'), path: '/about' },
  ];

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: t('common.loggedOut'),
      description: t('common.loggedOutDesc'),
    });
    navigate('/');
  };

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    return name.charAt(0).toUpperCase();
  };

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
                {t('brand.name')}
              </h1>
              <p className="text-xs text-muted-foreground">
                {t('brand.nameEn')}
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
                    item.highlight
                      ? 'text-gold font-semibold border border-gold/50 rounded-md px-3 py-1 hover:bg-gold/10'
                      : location.pathname === item.path ? 'text-primary active' : 'text-foreground hover:text-primary'
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

          {/* Search, Language & User */}
          <div className="flex items-center gap-1">
            {isSearchOpen ? (
              <div className="flex items-center gap-2 animate-fade-in">
                <Input
                  placeholder={t('common.searchPlaceholder')}
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
                aria-label={t('common.search')}
              >
                <Search className="w-5 h-5" />
              </Button>
            )}

            <LanguageSwitcher />

            {/* User Authentication State */}
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
            ) : user ? (
              <>
                {/* Admin Link for admins */}
                {profile?.role === 'admin' || profile?.role === 'editor' ? (
                  <Link
                    to="/admin"
                    className="hidden md:inline-block text-sm text-primary hover:text-primary/80 px-3 py-2 transition-colors"
                  >
                    {t('common.admin')}
                  </Link>
                ) : null}

                {/* User Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                      <Avatar className="h-9 w-9 border border-primary/30">
                        <AvatarImage src={profile?.avatar_url || undefined} />
                        <AvatarFallback className="bg-primary/20 text-primary text-sm">
                          {getInitials(profile?.full_name)}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium text-foreground">
                          {profile?.full_name || t('common.noNameSet')}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {profile?.email}
                        </p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="flex items-center cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        {t('common.profile')}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/my-assets" className="flex items-center cursor-pointer">
                        <Database className="mr-2 h-4 w-4" />
                        {t('common.myAssets')}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleSignOut}
                      className="text-destructive focus:text-destructive cursor-pointer"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      {t('common.logout')}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Link to="/auth">
                <Button variant="outline" size="sm" className="hidden md:inline-flex border-primary/50 text-primary hover:bg-primary/10">
                  {t('common.loginRegister')}
                </Button>
              </Link>
            )}

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

              {/* Mobile Language Switcher */}
              <div className="pt-4 border-t border-border mt-4 px-4">
                <p className="text-xs text-muted-foreground mb-2">{t('common.language')}</p>
                <LanguageSwitcher variant="inline" />
              </div>

              {/* Mobile Auth */}
              <div className="pt-4 border-t border-border mt-4">
                {user ? (
                  <>
                    <Link
                      to="/profile"
                      className="block px-4 py-3 rounded-lg font-medium text-foreground hover:bg-accent"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t('common.profile')}
                    </Link>
                    <Link
                      to="/my-assets"
                      className="block px-4 py-3 rounded-lg font-medium text-foreground hover:bg-accent"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t('common.myAssets')}
                    </Link>
                    {(profile?.role === 'admin' || profile?.role === 'editor') && (
                      <Link
                        to="/admin"
                        className="block px-4 py-3 rounded-lg font-medium text-primary hover:bg-accent"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {t('common.admin')}
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        handleSignOut();
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-3 rounded-lg font-medium text-destructive hover:bg-accent"
                    >
                      {t('common.logout')}
                    </button>
                  </>
                ) : (
                  <Link
                    to="/auth"
                    className="block px-4 py-3 rounded-lg font-medium text-primary hover:bg-accent"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('common.loginRegister')}
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
