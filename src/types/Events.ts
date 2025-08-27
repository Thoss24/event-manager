export interface Event {
  created_at: string,
  creator_user_id: number,
  event_date: string,
  event_description: string,
  event_id: number,
  event_img: string,
  event_name: string,
  event_time: string,
  event_type: string
};

export interface EventsListProps {
  pageType: string;
  userId?: string
}

export interface BookedEventsListProps {
  events: Event[];
}

export interface BookedEventsListItemProps {
  key: number;
  id: number;
  name: string;
  description: string;
  eventDate: string;
  eventImg: string;
  eventTime: string
}

export interface BookedEventDetailsProps{
  id: number;
  name: string;
  date: string;
}

export interface RemoveBookedEventResponse {
  message: string;
}