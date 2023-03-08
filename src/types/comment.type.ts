export default interface CommentListType {
    value: string, 
    id: number,
    user: {
        id: number,
        name: string,
        lastName: string,
    },
}