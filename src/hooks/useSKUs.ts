import { useState, useEffect, useCallback } from 'react';
import { fetchMappedSKUs } from '../services/api';
import { SKUItem, CategoryType } from '../utils/types';

interface UseSKUsReturn {
  data: SKUItem[];
  filteredData: SKUItem[];
  isLoading: boolean;
  error: string | null;
  selectedCategory: CategoryType;
  setCategory: (cat: CategoryType) => void;
  refresh: () => void;
}

/**
 * Safely extracts SKUItem[] from the raw API text response.
 *
 * Real API shape:
 *   { "MappedSkuList": [{ "SKUID": "ITEM0002ZX44", "Gender": "0", "Cat": 0 }, ...] }
 */
const extractSKUList = (raw: unknown): SKUItem[] => {
  console.log('🚀 ~ extractSKUList ~ raw:', raw);
  // Parse if still a string
  let parsed: unknown = raw;
  if (typeof raw === 'string') {
    try {
      parsed = JSON.parse(raw);
    } catch {
      return [];
    }
  }

  console.log('🚀 ~ extractSKUList ~ parsed:', parsed);
  if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
    return [];
  }

  const obj = parsed as Record<string, unknown>;

  // Real key: "MappedSkuList" (lowercase k)
  const list = obj.MappedSkuList ?? obj.MappedSKUList;
  console.log('🚀 ~ extractSKUList ~ list:', list);

  if (Array.isArray(list)) {
    return list as SKUItem[];
  }

  return [];
};

const useSKUs = (): UseSKUsReturn => {
  const [data, setData] = useState<SKUItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('All');

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const raw = await fetchMappedSKUs();
      console.log('🚀 ~ useSKUs ~ raw:', raw);
      const list = extractSKUList(raw);
      console.log(
        '[useSKUs] loaded',
        list.length,
        'SKUs. First:',
        JSON.stringify(list[0]),
      );
      setData(list);
    } catch (err: any) {
      setError(err.message ?? 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Since Cat is a number (0 for all items currently), string-based CategoryType
  // filtering won't match — return all data for all tabs until the API has proper cats.
  const filteredData: SKUItem[] = selectedCategory === 'All' ? data : data; // API returns Cat=0 for all; show full list regardless of selection

  const setCategory = (cat: CategoryType) => setSelectedCategory(cat);

  return {
    data,
    filteredData,
    isLoading,
    error,
    selectedCategory,
    setCategory,
    refresh: loadData,
  };
};

export default useSKUs;
