import React from "react";
import { useParams } from "react-router-dom";

const UserProfileInfo = () => {
  let { userId } = useParams();

  return (
    <div>
      {userId}
    </div>
  )
}

export default UserProfileInfo;