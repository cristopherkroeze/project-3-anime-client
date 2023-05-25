import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { AuthContext } from "../context/auth.context";
import {useNavigate} from "react-router-dom"
import {useContext } from "react";
import { commentDelete} from "../services/authService";

function CommentCard({
  _id,
  title,
  comment,
  addedBy,
  animeId,
  setReload,
  viewWidth
}) {
  const {user} = useContext(AuthContext)
  const navigate = useNavigate();
  const newViewWidth = viewWidth - 5
  const deleteComment = () => {
    console.log("added by:", addedBy)
    console.log("user:", user);
    if(addedBy._id === user._id) {
      commentDelete(`/animes/deleteComment/${_id}`)
      .then(() => {
        setReload(prev => !prev)
      })
      .catch((error) => console.log(error));
    } else {
      alert("You are not the creator of this comment")
    }
  }

  return (
    <>
      <Card style={{ width: `${newViewWidth}vw` }}>

        <Card.Body>
        <Card.Title>{title}</Card.Title>
        {comment}
        </Card.Body>
        
        <ListGroup className="list-group-flush">
          <ListGroup.Item>Added By: {addedBy.userName}</ListGroup.Item>
          {animeId && <ListGroup.Item><button onClick = {deleteComment}>Delete</button></ListGroup.Item>}
        </ListGroup>
      </Card>
    </>
  );
}
  
  export default CommentCard;