import React from 'react';

interface DashboardSectionProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export default function DashboardSection({ 
  title, 
  subtitle, 
  children, 
  className = '' 
}: DashboardSectionProps) {
  return (
    <div className={`h-full overflow-y-auto ${className}`}>
      {/* 섹션 헤더 - 완전히 투명하게 */}
      <div className="sticky top-0 z-10 bg-transparent p-6">
        <h2 className="text-3xl font-bold text-white mb-2">{title}</h2>
        {subtitle && (
          <p className="text-white/60">{subtitle}</p>
        )}
      </div>

      {/* 섹션 컨텐츠 */}
      <div className="p-0">
        {children}
      </div>
    </div>
  );
} 