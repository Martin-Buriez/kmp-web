export default interface PostListType {
  content?: Array<{
    access: string;
    catalogue: Array<{
      id: number;
      category: string;
    }>;
    comments: string | null;
    id: number;
    value: string;
  }>;
  last: boolean;
  pageNo: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  length?: number;
}

export default interface PostType {
    id: number,
    access: string,
    value: string,
    comments: null,
    catalogue: [
      {
        id: number,
        category: string
      }
    ]
}