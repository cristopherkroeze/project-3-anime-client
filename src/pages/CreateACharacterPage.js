import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import AddCharacter from "../components/AddCharacter"

function CreateACharacterPage() {
    return (
      <div className = "CreateACharacterPage">
      <AddCharacter />
      </div>
    );
  }
   
export default CreateACharacterPage;