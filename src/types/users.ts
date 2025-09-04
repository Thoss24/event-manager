export interface User {
  user_id?: number,
  email?: string, 
  first_name?: string,
  last_name?: string,
  account_type?: string,
  profile_image?: string,
  profile_color?: string
}

export interface MemberType {
  firstName: string | undefined,
  lastName: string | undefined,
  id: number | undefined,
  profileImageColor: string | undefined,
  profileImage: string | undefined,
}

export interface MemberComponentProps {
  firstName: string | undefined,
  lastName: string | undefined,
  key: number | undefined,
  id: number | undefined,
  profileImgColor: string | undefined,
  profileImage: string | undefined,
  eventForm?: boolean | undefined,
  addMemberToEvent?: (props: MemberType) => void
}
