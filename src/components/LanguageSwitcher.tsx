import { Globe, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { SUPPORTED_LANGUAGES } from '@/i18n';

interface LanguageSwitcherProps {
  variant?: 'header' | 'inline';
}

export function LanguageSwitcher({ variant = 'header' }: LanguageSwitcherProps) {
  const { i18n } = useTranslation();
  const current = SUPPORTED_LANGUAGES.find((l) => l.code === i18n.language) ?? SUPPORTED_LANGUAGES[0];

  const change = (code: string) => {
    i18n.changeLanguage(code);
  };

  if (variant === 'inline') {
    return (
      <div className="flex items-center gap-2 flex-wrap">
        {SUPPORTED_LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            onClick={() => change(lang.code)}
            className={`px-3 py-1.5 rounded-md text-sm transition-colors border ${
              current.code === lang.code
                ? 'bg-primary text-primary-foreground border-primary'
                : 'border-border text-foreground hover:bg-accent'
            }`}
          >
            {lang.label}
          </button>
        ))}
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground hover:text-foreground">
          <Globe className="w-4 h-4" />
          <span className="hidden md:inline">{current.label}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[140px]">
        {SUPPORTED_LANGUAGES.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => change(lang.code)}
            className="cursor-pointer flex items-center justify-between"
          >
            <span>{lang.label}</span>
            {current.code === lang.code && <Check className="w-4 h-4 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
