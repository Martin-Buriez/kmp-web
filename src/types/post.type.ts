export default interface PostListType {
    content: [{
        access: string 
        catalogue: [{
            id: number, 
            category: string
        }]
        comments: string | null
        id: number 
        value: string
    }]
    last: boolean,
    pageNo: number,
    pageSize: number,
    totalElements: number,
    totalPages: number,
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