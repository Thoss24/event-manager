export interface User {
  user_id?: number,
  email?: string, 
  first_name?: string,
  last_name?: string,
  account_type?: string,
  profile_image?: string,
  profile_color?: string
}

export interface MemberComponentProps {
  firstName: string,
  lastName: string,
  key: number,
  id: number,
  profileImgColor: string,
  profileImage: string,
  eventForm: boolean,
  addMemberToEvent?: () => void
}

export interface MemberType {
  firstName: string,
  lastName: string,
  id: number,
  profileImageColor: string,
  profileImage: string,
}
