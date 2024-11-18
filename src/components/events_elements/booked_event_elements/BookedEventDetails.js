
const BookedEventDetails = (props) => {

    return (
        <div>
            <h1>{props.name}</h1>
            <h1>{props.date}</h1>
            <button>Delete</button>
        </div>
    )
};

export default BookedEventDetails