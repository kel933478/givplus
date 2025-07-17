import { useState } from 'react';
import { 
  Search, 
  Filter,
  SortAsc,
  Calendar,
  Target,
  Users,
  X
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface SearchFiltersProps {
  onSearch: (query: string) => void;
  onFilter: (filters: FilterOptions) => void;
  onSort: (sort: SortOption) => void;
}

interface FilterOptions {
  status: string[];
  dateRange: {
    start: string;
    end: string;
  };
  amountRange: {
    min: number;
    max: number;
  };
  categories: string[];
}

interface SortOption {
  field: string;
  direction: 'asc' | 'desc';
}

export const SearchAndFilters = ({ onSearch, onFilter, onSort }: SearchFiltersProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    status: [],
    dateRange: { start: '', end: '' },
    amountRange: { min: 0, max: 100000 },
    categories: []
  });

  const [sortOption, setSortOption] = useState<SortOption>({
    field: 'createdAt',
    direction: 'desc'
  });

  const statusOptions = [
    { value: 'active', label: 'Actives', color: 'green' },
    { value: 'completed', label: 'Terminées', color: 'blue' },
    { value: 'paused', label: 'En pause', color: 'yellow' },
    { value: 'draft', label: 'Brouillons', color: 'gray' }
  ];

  const categoryOptions = [
    { value: 'education', label: 'Éducation' },
    { value: 'health', label: 'Santé' },
    { value: 'environment', label: 'Environnement' },
    { value: 'social', label: 'Social' },
    { value: 'culture', label: 'Culture' },
    { value: 'emergency', label: 'Urgence' }
  ];

  const sortOptions = [
    { value: 'createdAt:desc', label: 'Plus récentes' },
    { value: 'createdAt:asc', label: 'Plus anciennes' },
    { value: 'target:desc', label: 'Objectif décroissant' },
    { value: 'target:asc', label: 'Objectif croissant' },
    { value: 'raised:desc', label: 'Montant collecté décroissant' },
    { value: 'raised:asc', label: 'Montant collecté croissant' },
    { value: 'progress:desc', label: 'Progression décroissante' },
    { value: 'progress:asc', label: 'Progression croissante' }
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch(query);
  };

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const handleSortChange = (sortValue: string) => {
    const [field, direction] = sortValue.split(':');
    const newSort = { field, direction: direction as 'asc' | 'desc' };
    setSortOption(newSort);
    onSort(newSort);
  };

  const clearFilters = () => {
    const clearedFilters = {
      status: [],
      dateRange: { start: '', end: '' },
      amountRange: { min: 0, max: 100000 },
      categories: []
    };
    setFilters(clearedFilters);
    setSearchQuery('');
    onFilter(clearedFilters);
    onSearch('');
  };

  const toggleStatus = (status: string) => {
    const newStatus = filters.status.includes(status)
      ? filters.status.filter(s => s !== status)
      : [...filters.status, status];
    handleFilterChange('status', newStatus);
  };

  const toggleCategory = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    handleFilterChange('categories', newCategories);
  };

  const activeFiltersCount = 
    filters.status.length + 
    filters.categories.length + 
    (filters.dateRange.start || filters.dateRange.end ? 1 : 0) +
    (filters.amountRange.min > 0 || filters.amountRange.max < 100000 ? 1 : 0);

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <Card variant="elevated">
        <div className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Rechercher des campagnes, donateurs, ou mots-clés..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300"
              />
            </div>
            
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 relative"
              >
                <Filter className="h-4 w-4" />
                <span>Filtres</span>
                {activeFiltersCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-primary-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </Button>
              
              <select
                value={`${sortOption.field}:${sortOption.direction}`}
                onChange={(e) => handleSortChange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </Card>

      {/* Advanced Filters */}
      {showFilters && (
        <Card variant="elevated">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Filtres avancés</h3>
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Effacer tout
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setShowFilters(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Statut des campagnes
                </label>
                <div className="space-y-2">
                  {statusOptions.map(status => (
                    <label key={status.value} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.status.includes(status.value)}
                        onChange={() => toggleStatus(status.value)}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{status.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Date Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  <Calendar className="inline h-4 w-4 mr-1" />
                  Période
                </label>
                <div className="space-y-2">
                  <input
                    type="date"
                    value={filters.dateRange.start}
                    onChange={(e) => handleFilterChange('dateRange', { ...filters.dateRange, start: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                  <input
                    type="date"
                    value={filters.dateRange.end}
                    onChange={(e) => handleFilterChange('dateRange', { ...filters.dateRange, end: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>

              {/* Amount Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  <Target className="inline h-4 w-4 mr-1" />
                  Montant objectif (€)
                </label>
                <div className="space-y-2">
                  <input
                    type="number"
                    placeholder="Minimum"
                    value={filters.amountRange.min || ''}
                    onChange={(e) => handleFilterChange('amountRange', { ...filters.amountRange, min: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                  <input
                    type="number"
                    placeholder="Maximum"
                    value={filters.amountRange.max === 100000 ? '' : filters.amountRange.max}
                    onChange={(e) => handleFilterChange('amountRange', { ...filters.amountRange, max: parseInt(e.target.value) || 100000 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>

              {/* Categories */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Catégories
                </label>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {categoryOptions.map(category => (
                    <label key={category.value} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.categories.includes(category.value)}
                        onChange={() => toggleCategory(category.value)}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{category.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};