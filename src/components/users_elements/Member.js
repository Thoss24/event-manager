import classes from "./Members.module.css";

const Member = (props) => {

    const firstNameCapitalized = props.firstName.charAt(0).toUpperCase() + props.firstName.slice(1);
    const lastNameCapitalized = props.lastName.charAt(0).toUpperCase() + props.lastName.slice(1);

    const addMemberToEvent = () => {
        const member = {
            id:props.id,
            profileImage:props.profileImage,
            firstName: props.firstName,
            lastName: props.lastName,
            profileImageColor: props.profileImgColor
        }
        props.addMemberToEvent(member)
    }

    return (
        <div className={classes['member']} onClick={props.addMemberToEvent && addMemberToEvent}>
            <div style={{backgroundColor: `#${props.profileImgColor}`}} className={classes['profile_image']}>{props.profileImage}</div>
            <div className={classes.name}>
            <p>{firstNameCapitalized}</p>
            <p>{lastNameCapitalized}</p>
            </div>
        </div>
    )
}

export default Member;