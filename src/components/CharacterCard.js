import Card from 'react-bootstrap/Card';

function CharacterCard({
  mainCharacter,
  viewWidth
}) {
    const img = mainCharacter.img
    const name = mainCharacter.name
    const voicedBy = mainCharacter.voicedBy
    viewWidth = viewWidth - 10
  return (
    <>
      <Card style={{ width: `${viewWidth}vw` }}>
        <Card.Img variant="top" src={img} />
        <Card.Body>
        <Card.Title>
        Main Character: {name}
        </Card.Title>
        Voiced By (Japanese): {voicedBy}
        </Card.Body>
      </Card>
    </>
  );
}
  
  export default CharacterCard;
