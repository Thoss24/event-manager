import classes from './Filter.module.css';
import { useState, useEffect } from "react";
import { FilterOptions, Filter as FilterType } from "../../types/filters";
import React from "react";

interface FilterProps {
  filters: FilterOptions[],
  applyFilter: (param: FilterType) => void
};

const Filter = ({filters, applyFilter}: FilterProps) => {

  // filter by event type, events I am booked to, in the next 7 days, in the next 1 month, all past events, all future events
  // by default, display all upcomming events
  // different pages should have more or less filters e.g., becasue the events page shows all events, it should only show events that havent happened yet

  // type will need a seperate filter becasue there are multiple types

  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set());

  const applyFilterHandler = (filter: FilterType) => {
    applyFilter(filter);
  };

  const toggleFilterCategory = (label: string) => {
    setOpenCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(label)) {
        newSet.delete(label)
      } else {
        newSet.add(label)
      }
      return newSet
    })
  };

  return (
    <div className={classes['filter-component']}>
      <div>
      <h3>Filter</h3>
      <ul className={classes['filter-container']}>
        {filters.map(filter => {
          if (filter.type === 'Type' || filter.type === 'Booked' || filter.type === 'Date') {
            return (
            <li key={filter.label} className={classes['filter-category']}>
              <span className={classes['filter-category-label']} onClick={() => toggleFilterCategory(filter.label)}>{filter.label}</span>
              <div className={`${classes['filter-area']} ${openCategories.has(filter.label) ? classes.showing : ''}`}>
                {openCategories.has(filter.label) && filter.values.map((value) => (
                  <label key={value} className={classes['filter-item']}>
                    <input type="checkbox" onChange={() => applyFilterHandler({"value": value, "type": filter.type})}/>
                    {value}
                  </label>
                ))}
              </div>
            </li>)
          } 
        })}
      </ul>
      </div>
    </div>
  )
}

export default Filter;