import React from "react";
import { ResponseParams } from "../../types/misc";

interface ResponseListProps {
  response?: string,
  key: number
}

const ResponseListItem = ({response}: ResponseListProps) => {
  return (
    <div>
      {response}
    </div>
  )
}

export default ResponseListItem;