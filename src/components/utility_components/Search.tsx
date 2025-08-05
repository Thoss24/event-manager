import React from "react";
import { useState, useRef } from "react";
import { SearchComponentProps } from "../../types/filters";

const Search = ({searchEvents}: SearchComponentProps) => {

  const searchInputRef = useRef<HTMLInputElement>(null);

  const searchEventsHandler = () => {
    // take in search query here -> pass query up to EventsList component -> filter events based on search query
    searchInputRef.current && searchEvents(searchInputRef.current.value)
  }

  return (
    <div>
      <input type="text" ref={searchInputRef} onChange={searchEventsHandler}/>
    </div>
  )
}

export default Search;