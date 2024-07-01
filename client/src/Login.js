import React, {useRef} from 'react'

import { Container,Form, Button} from 'react-bootstrap'
export default function Login({onIdSubmit, onRoomSubmit}) {

    const idRef = useRef()
    const roomRef = useRef()

    function handleId(e){
        onIdSubmit(idRef.current.value)
    }

    function handleRoom(e){
        onRoomSubmit(roomRef.current.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        handleId(e);
        handleRoom(e);
    }
  return (
    <Container  className=' align-items-center d-flex' style={{height:
        '100vh'}}>
        <Form onSubmit={handleSubmit} className='w-100'>

        <Form.Group className = "mb-2" >
            <Form.Label>Enter your Name</Form.Label>
            
            <Form.Control type = "text" placeholder='Enter name' ref = {idRef} required></Form.Control>
        </Form.Group>
       

        <Form.Group className='mb-2'>
            <Form.Label>Room</Form.Label>
            <Form.Control type = "text" placeholder='Room' ref= {roomRef} required>

            </Form.Control>
        </Form.Group>
        <Button type = "submit" className = "mr-2" >Join Room</Button>
        </Form>
    </Container>
  )
}
