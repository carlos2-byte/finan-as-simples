import { Home, BarChart3, CreditCard, Settings, TrendingUp, Wallet } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { APP_VERSION } from '@/lib/version';

const navItems = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/dashboard', icon: BarChart3, label: 'Relatório' },
  { to: '/investments', icon: TrendingUp, label: 'Invest.' },
  { to: '/cards', icon: CreditCard, label: 'Cartões' },
  { to: '/receitas', icon: Wallet, label: 'Receitas' },
  { to: '/settings', icon: Settings, label: 'Config' },
];

export function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[9999] border-t border-border bg-card/95 backdrop-blur-lg safe-bottom">
      {/* 1. CONTAINER DOS ÍCONES (Altura fixa de 64px/h-16) */}
      <div className="mx-auto flex h-16 max-w-lg items-center justify-around px-2">
        {navItems.map(({ to, icon: Icon, label }) => {
          const isActive = location.pathname === to;
          const isSettings = to === '/settings';
          
          return (
            <NavLink
              key={to}
              to={to}
              className={cn(
                'flex flex-col items-center justify-center gap-0.5 px-2 py-2 rounded-xl transition-all duration-200 tap-highlight-none min-w-0',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon
                className={cn(
                  'h-5 w-5 transition-transform',
                  isActive && 'scale-110'
                )}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className="text-[10px] font-medium truncate">{label}</span>
              {isSettings && (
                <span className="text-[7px] text-muted-foreground/60 -mt-0.5">v{APP_VERSION}</span>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* 2. ESPAÇO RESERVADO PARA O ADMOB (Banner) 
          A altura h-[60px] garante que o banner de 320x50 caiba com folga 
      */}
      <div className="h-[55px] w-full flex items-center justify-center border-t border-border/50 bg-black/5">
         {/* O componente AdMobBanner deve ser renderizado aqui via Portal ou Injeção direta */}
         <span className="text-[8px] text-muted-foreground uppercase tracking-widest">Anúncio</span>
      </div>
    </nav>
  );
}