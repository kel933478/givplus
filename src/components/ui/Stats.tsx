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
    <Card variant="neo" padding="md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className={cn('text-sm', changeColors[changeType])}>
              {change}
            </p>
          )}
        </div>
        {icon && (
          <div className="h-12 w-12 bg-primary-50 rounded-lg flex items-center justify-center">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
};