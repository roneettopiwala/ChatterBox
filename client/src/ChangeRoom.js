import React, {useRef} from 'react'
import { Container,Form, Button} from 'react-bootstrap'
export default function ChangeRoom({changeRoomSubmit}) {

const roomRef = useRef()


function handleRoom(e){
    changeRoomSubmit(roomRef.current.value); 
}

function handleSubmit (e){
        e.preventDefault()
        handleRoom(e);
    
    } 
  return (
    <Container className='align-items-center d-flex' style = {{height: '100vh'}}>
        <Form onSubmit = {handleSubmit} className='w-100'>
        <Form.Group>
            <Form.Label>Change Room</Form.Label>
            <Form.Control type = "text" ref = {roomRef} required></Form.Control>
        </Form.Group>
        <Button type = "submit" className = "mr-2" >Change Room</Button>
        </Form>
    </Container>
  )
}
