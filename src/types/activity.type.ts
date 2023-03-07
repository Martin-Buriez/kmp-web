export interface UserActivity {
    id: string;
    created: boolean;
    liked: boolean;
    shared: boolean;
    blocked: boolean;
    resource: {
      value: string;
      catalogue: CatalogueType[];
    };
  }
  
  export interface CatalogueType {
    id: string;
    category: string;
  }