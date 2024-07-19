import classes from "./Members.module.css";

const Member = (props) => {

    // "user_id": 5,
    // "email": "t.fogarty23@outlook.com",
    // "password": "$2b$10$EAgquQ7hFWQN2diESCvJQ.Ipd4/ENu7S5iRhqjyWq4gaypG97EVHG",
    // "first_name": "Thomas",
    // "last_name": "Fogarty",
    // "account_type": "admin",
    // "profile_image": "TF"

    // style={{backgroundColor: `#${generateProfileIconColor()}`}}

    const firstNameCapitalized = props.firstName.charAt(0).toUpperCase() + props.firstName.slice(1);
    const lastNameCapitalized = props.lastName.charAt(0).toUpperCase() + props.lastName.slice(1);

    const addMemberToEvent = () => {
        props.addMemberToEvent(props.id)
    }

    return (
        <div className={classes['member']} onClick={addMemberToEvent}>
            <div style={{backgroundColor: `#${props.profileImgColor}`}} className={classes['profile_image']}>{props.profileImage}</div>
            <div className={classes.name}>
            <p>{firstNameCapitalized}</p>
            <p>{lastNameCapitalized}</p>
            </div>
        </div>
    )
}

export default Member;