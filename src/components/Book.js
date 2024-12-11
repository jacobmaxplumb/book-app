export const Book = (props) => {
    return <div>
        <h3>{props.title}</h3>
        <img src={props.cover} />
        <h5>By: {props.author}</h5>
        <p>{props.rating} / 5</p>
    </div>
}