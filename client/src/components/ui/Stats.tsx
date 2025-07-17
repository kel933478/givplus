import React from 'react';
import { Card } from './Card';
import { cn } from '../../utils/cn';

interface StatsProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: React.ReactNode;
}

export const Stats: React.FC<StatsProps> = ({
  title,
  value,
  change,
  changeType = 'neutral',
  icon,
}) => {
  const changeColors = {
    positive: 'text-success-600',
    negative: 'text-red-600',
    neutral: 'text-gray-500',
  };

  return (
    <Card variant="gradient" padding="lg" className="hover:scale-105 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {change && (
            <p className={cn('text-sm font-medium mt-1', changeColors[changeType])}>
              {change}
            </p>
          )}
        </div>
        {icon && (
          <div className="h-16 w-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center shadow-lg">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
};