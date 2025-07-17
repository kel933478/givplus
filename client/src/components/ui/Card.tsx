import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'neo' | 'elevated' | 'glass' | 'gradient';
  padding?: 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  className,
  ...props
}) => {
  const baseClasses = 'rounded-xl border transition-all duration-300 hover:shadow-xl';
  
  const variants = {
    default: 'bg-gradient-to-br from-white to-gray-50/50 border-gray-200/60 shadow-lg hover:shadow-2xl hover:scale-[1.02]',
    neo: 'bg-gradient-to-br from-white via-gray-50/30 to-white shadow-neo hover:shadow-xl hover:scale-[1.01]',
    elevated: 'bg-gradient-to-br from-white to-blue-50/20 border-blue-100/50 shadow-xl hover:shadow-2xl hover:scale-[1.01]',
    glass: 'bg-white/80 backdrop-blur-sm border-white/20 shadow-lg hover:bg-white/90 hover:shadow-2xl',
    gradient: 'bg-gradient-to-br from-primary-50/50 via-white to-success-50/30 border-primary-100/40 shadow-lg hover:shadow-2xl hover:scale-[1.01]',
  };

  const paddings = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={cn(
        baseClasses,
        variants[variant],
        paddings[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};