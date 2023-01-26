export default interface UserType {
  name: string,
  lastName: string,
  birthday?: string | null, 
  address?: string | null, 
  zipCode?: string | null, 
  email: string,
  password: string,
  roles?: Array<string>
}