export interface NPMPackage {
  name: string;
  version: string;
  description: string;
  author?: {
    name: string;
  };
  keywords?: string[];
  date: string;
  links: {
    npm: string;
    homepage?: string;
    repository?: string;
  };
  publisher: {
    username: string;
    email: string;
  };
  maintainers: Array<{
    username: string;
    email: string;
  }>;
}

export interface NPMSearchResponse {
  objects: Array<{
    package: NPMPackage;
    score: {
      final: number;
      detail: {
        quality: number;
        popularity: number;
        maintenance: number;
      };
    };
    searchScore: number;
  }>;
  total: number;
  time: string;
}

export interface FavoritePackage {
  id: string;
  name: string;
  description: string;
  reason: string;
  addedAt: string;
  npmUrl: string;
  version: string;
}
