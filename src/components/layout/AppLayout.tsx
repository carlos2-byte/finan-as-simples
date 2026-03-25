import { ReactNode } from 'react';
import { BottomNav } from './BottomNav';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="relative min-h-screen min-h-dvh w-full bg-background overflow-x-hidden">
      {/* 1. Conteúdo principal do app */}
      <div className="pb-4">
        {children}
      </div>

      {/* 2. Menu de navegação com elevação extra para evitar sobreposição do banner */}
      <BottomNav />

      {/* 3. Espaço de segurança para o banner do AdMob - GARANTE que nunca cubra o menu */}
      {/* Este espaço é posicionado ABAIXO da navegação e cria uma barreira física */}
      <div
        className="fixed left-0 right-0 bg-background z-30"
        style={{
          bottom: '0px',
          height: '65px',
          marginTop: '-65px',
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />
    </div>
  );
}
