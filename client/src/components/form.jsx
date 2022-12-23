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
        errors.descripcion = 'se requiere el descripcion';
    } else if (typeof input.descripcion !== "string") {
        errors.descripcion = 'descripcion debe ser texto';
    } else if (input.descripcion.length < 4) {
        errors.descripcion = "debe contener al menos 4 letras"
    }

    if (!input.fecha_de_lanzamiento) {
        errors.fecha_de_lanzamiento = 'se requiere fecha';
    } else if (input.fecha_de_lanzamiento.length < 8) {
        errors.fecha_de_lanzamiento = "debe contener al menos 8 caracteres"
    }



    if (!input.rating) {
        errors.rating = 'se requiere rating';
    } else if (isNaN(input.rating)) {
        errors.rating = 'rating incorrecta (ej 4.57)';
    } else if (input.rating.length < 4) {
        errors.rating = "debe contener al menos 4 caracteres"
    }


    if (!input.genero) {
        errors.genero = 'se requiere el genero';
    } else if (typeof input.genero !== "string") {
        errors.genero = 'genero debe ser texto';
    } else if (input.genero.length < 4) {
        errors.genero = "debe contener al menos 4 letras"
    }


    if (!input.plataformas) {
        errors.plataformas = 'se requiere el plataforma';
    } else if (input.plataformas.length < 4) {
        errors.plataformas = "debe contener al menos 4 letras"
    }

    return errors;
};

export default function Form() {

    const [input, setInput] = React.useState({
        nombre: "",
        descripcion: "",
        fecha_de_lanzamiento: "",
        rating: "",
        genero: "",
        plataformas: ""
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

                <div>
                    <label>Generos:</label>
                    <div className='input-container'>
                        <input type="text" name="genero" value={input.genero}
                            onChange={handleInputChange} />
                        {errors.genero && (<p className="danger">{errors.genero}</p>)}
                    </div>
                </div>

                <div>
                    <label>Plataformas:</label>
                    <div className='input-container'>
                        <input type="text" name="plataformas" value={input.plataformas}
                            onChange={handleInputChange} />
                        {errors.plataformas && (<p className="danger">{errors.plataformas}</p>)}
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