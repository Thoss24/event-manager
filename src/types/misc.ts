export type RouteParams = { // useParams id
  userId?: string; // Define userId as a string
}

export interface ErrorElementProps { // error element props type
  error: string;
}

export interface UpcommingEventsProps { // error element props type
  message: string;
}

export type getUserInfoData = { // get user info type - UserProfileInfo
  userId?: string
}

export type confirmationModalComponentProps = { // get user info type - UserProfileInfo
  confirmAction: (arg0: boolean) => {},
  message: string
}
