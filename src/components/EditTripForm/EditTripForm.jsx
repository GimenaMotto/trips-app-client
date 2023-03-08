import './EditTripForm.css'
import { Form, Row, Col, Button } from "react-bootstrap"
import tripsService from '../../services/trips.service'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

const EditTripForm = ({ fireFinalActions }) => {
    const navigate = useNavigate()

    const [newData, setNewData] = useState({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        images: [],
        budget: '',
        destination: ''
    })

    const { trip_id } = useParams()

    useEffect(() => {
        loadData()
    }, [])

    const loadData = () => {
        tripsService
            .getOneTrip(trip_id)
            .then(({ data }) => {
                console.log(data)
                let { title, description, startDate, budget, destination } = data
                if (!title) { title = '' }
                if (!description) { description = '' }
                if (!budget) { budget = '' }
                if (!destination) { destination = '' }
                if (!startDate) { startDate = '' }

                // hacer en utils una función para las fechas  cuando terminemos el crud o pasar en lugar de formatedDate '',
                // console.log(new Date(startDate).toLocaleDateString())
                const formatedDate = `${new Date(startDate).getFullYear()}-0${new Date(startDate).getMonth() + 1}-0${new Date(startDate).getDate()}`
                console.log(formatedDate)

                setNewData({ title, description, startDate: formatedDate, endDate: formatedDate, images: [], budget, destination })
            })
            .catch(err => console.log(err))
    }


    const handleInputChange = e => {
        const { value, name } = e.target
        setNewData({ ...newData, [name]: value })
            .then(({ data }) => {
                fireFinalActions()
                navigate('/viajes')

            })
            .catch(err => console.log(err))
    }

    const handleTripSubmit = e => {
        e.preventDefault()

        tripsService
            .editTrip(trip_id, newData)
            .then(({ data }) => {
                fireFinalActions()
                navigate('/viajes')
            })
            .catch(err => console.log(err))
    }
    return (
        <Form onSubmit={handleTripSubmit} >
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="title">
                        <Form.Label>Título del viaje:</Form.Label>
                        <Form.Control type="text" name="title" value={newData.title} onChange={handleInputChange} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>Imágenes del destino:</Form.Label>
                        <Form.Control type="file" value={newData.images} name="images" multiple onChange={handleInputChange} />
                    </Form.Group>
                </Col>
            </Row>
            <Form.Group className="mb-3" controlId="destination">
                <Form.Label>Destino:</Form.Label>
                <Form.Control type="text" name="destination" value={newData.destination} onChange={handleInputChange} />
            </Form.Group>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="startDate">
                        <Form.Label>Fecha de partida:</Form.Label>
                        <Form.Control type="date" name="startDate" value={newData.startDate} onChange={handleInputChange} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="endDate">
                        <Form.Label>Fecha de regreso:</Form.Label>
                        <Form.Control type="date" name="endDate" value={newData.endDate} onChange={handleInputChange} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="budget">
                        <Form.Label>Presupuesto:</Form.Label>
                        <Form.Control type="text" name="budget" value={newData.budget} onChange={handleInputChange} />
                    </Form.Group>
                </Col>
            </Row>
            <Form.Group className="mb-3" controlId="description">
                <Form.Label>Descripción:</Form.Label>
                <Form.Control type="textarea" rows={2} name="description" value={newData.description} onChange={handleInputChange} />
            </Form.Group>
            <div className="d-grid mb-5">
                <Button variant="dark" type="submit">Editar viaje</Button>
            </div>
        </Form>
    )
}

export default EditTripForm