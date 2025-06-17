

const Filter = (props) => {

  // filter by event type, events I am booked to, in the next 7 days, in the next 1 month, all past events, all future events
  // by default, display all upcomming events
  // different pages should have more or less filters e.g., becasue the events page shows all events, it should only show events that havent happened yet

  // type will need a seperate filter becasue there are multiple types

  const applyFilterHandler = (filter) => {
    props.applyFilter(filter)
  }

  return (
    <div>
      <h3>Filter</h3>
      <ul>
        {props.filters.map(filter => (
          <li key={filter} onClick={() => applyFilterHandler(filter)}>{filter}</li>
        ))}
      </ul>
    </div>
  )
}

export default Filter;