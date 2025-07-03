import { NPMSearchResponse } from '@/types';

const NPM_SEARCH_API = 'https://registry.npmjs.org/-/v1/search';

export const searchNPMPackages = async (
  query: string,
  limit: number = 20
): Promise<NPMSearchResponse> => {
  if (!query.trim() || query.trim().length === 0) {
    return {
      objects: [],
      total: 0,
      time: new Date().toISOString(),
    };
  }

  try {
    const response = await fetch(
      `${NPM_SEARCH_API}?text=${encodeURIComponent(query)}&size=${limit}`
    );

    if (!response.ok) {
      if (response.status === 400) {
        throw new Error('Search term too short. Please use at least 2 characters.');
      }
      throw new Error(`Search failed with status: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.objects) {
      return {
        objects: [],
        total: 0,
        time: new Date().toISOString(),
      };
    }
    
    return data;
  } catch (error) {
    console.error('Error searching NPM packages:', error);
    throw error;
  }
};
