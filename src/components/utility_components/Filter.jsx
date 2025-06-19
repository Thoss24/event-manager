

const Filter = (props) => {

  // filter by event type, events I am booked to, in the next 7 days, in the next 1 month, all past events, all future events
  // by default, display all upcomming events
  // different pages should have more or less filters e.g., becasue the events page shows all events, it should only show events that havent happened yet

  // type will need a seperate filter becasue there are multiple types

  const applyFilterHandler = (filter) => {
    props.applyFilter(filter)
  }

  //console.log(props.filters)

  return (
    <div>
      <h3>Filter</h3>
      <ul>
        {props.filters.map(filter => {
          if (filter.type === 'Type' || filter.type === 'Booked') {
            return (
            <li key={filter.label}>
              <span>{filter.label}:</span>
              {filter.values.map((value) => (
                <label key={value}>
                  <input type="checkbox" onChange={() => applyFilterHandler({"value": value, "type": filter.type})}/>
                  {value}
                </label>
              ))}
            </li>)
          } 
        })}
      </ul>
    </div>
  )
}

export default Filter;