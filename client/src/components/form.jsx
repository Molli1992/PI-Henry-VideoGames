import React from 'react';
import "./form.css";
import axios from "axios";
import { Link } from 'react-router-dom';



function validate(input) {

    let errors = {};

    if (!input.nombre) {
        errors.nombre = 'se requiere el nombre';
    } else if (typeof input.nombre !== "string") {
        errors.nombre = 'nombre debe ser texto';
    } else if (input.nombre.length < 4) {
        errors.nombre = "debe contener al menos 4 letras"
    }

    if (!input.descripcion) {
        errors.descripcion = 'se requiere peso min';
    } else if (isNaN(input.descripcion)) {
        errors.descripcion = 'peso min incorrecto';
    } else if (input.descripcion < 1) {
        errors.descripcion = 'debe ser mayor a 0'
    }

    if (!input.fecha_de_lanzamiento) {
        errors.fecha_de_lanzamiento = 'se requiere peso max';
    } else if (isNaN(input.fecha_de_lanzamiento)) {
        errors.fecha_de_lanzamiento = 'peso max incorrecto';
    } else if (input.fecha_de_lanzamiento >= 100) {
        errors.fecha_de_lanzamiento = 'debe ser menor a 100'
    } else if (input.fecha_de_lanzamiento <= 1) {
        errors.fecha_de_lanzamiento = 'debe ser mayor a 1'
    }



    if (!input.rating) {
        errors.rating = 'se requiere peso min';
    } else if (isNaN(input.rating)) {
        errors.rating = 'peso min incorrecto';
    } else if (input.rating < 1) {
        errors.rating = 'debe ser mayor a 0'
    }

    return errors;
};

export default function Form() {

    const [input, setInput] = React.useState({
        nombre: "",
        descripcion: "",
        fecha_de_lanzamiento: "",
        rating: ""
    });

    const [errors, setErrors] = React.useState({});

    function handleInputChange(e) {

        setInput({
            ...input,
            [e.target.name]: e.target.value
        });

        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));

    };

    function handleSubmit(e) {

        axios.post("http://localhost:3001/videogames", input)
            .then(res => console.log(res.data))
            .cath(err => console.log(err))

    };

    return (
        <div className='form-container'>

            <form>

                <h2>Crea tu juego</h2>

                <div>
                    <label>Nombre:</label>
                    <div className="input-container">
                        <input type="text" name="nombre" value={input.nombre}
                            onChange={handleInputChange} />
                        {errors.nombre && (<p className="danger">{errors.nombre}</p>)}
                    </div>
                </div>

                <div>
                    <label>Descripcion:</label>
                    <div className='input-container'>
                        <input type="text" name="descripcion" value={input.descripcion}
                            onChange={handleInputChange} />
                        {errors.descripcion && (<p className="danger">{errors.descripcion}</p>)}
                    </div>
                </div>

                <div>
                    <label>Fecha de lanzamiento:</label>
                    <div className='input-container'>
                        <input type="text" name="fecha_de_lanzamiento" value={input.fecha_de_lanzamiento}
                            onChange={handleInputChange} />
                        {errors.fecha_de_lanzamiento && (<p className="danger">{errors.fecha_de_lanzamiento}</p>)}
                    </div>
                </div>

                <div>
                    <label>Rating:</label>
                    <div className='input-container'>
                        <input type="text" name="rating" value={input.rating}
                            onChange={handleInputChange} />
                        {errors.rating && (<p className="danger">{errors.rating}</p>)}
                    </div>
                </div>

                <div className='form-actions'>
                    <button onClick={handleSubmit} className='button-form'>Enviar</button>
                    <Link to="/home">
                        <button className='button-form'>Home</button>
                    </Link>
                </div>

            </form>

        </div>

    );

};