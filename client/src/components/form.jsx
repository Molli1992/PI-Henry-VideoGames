import React from 'react';
import "./form.css";
import axios from "axios";
import { Link } from 'react-router-dom';
import { getGames, getGenres } from "../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';



function validate(input) {

    let errors = {};

    if (!input.nombre) {
        errors.nombre = 'se requiere el nombre';
    }

    if (!input.descripcion) {
        errors.descripcion = 'se requiere descripcion';
    } else if (!isNaN(input.descripcion)) {
        errors.descripcion = 'descripcion debe ser texto';
    } else if (input.descripcion.length < 3) {
        errors.descripcion = "debe contener al menos 3 letras"
    }

    if (!input.fecha_de_lanzamiento) {
        errors.fecha_de_lanzamiento = 'se requiere fecha';
    } else if (input.fecha_de_lanzamiento.length < 8) {
        errors.fecha_de_lanzamiento = "debe contener al menos 8 caracteres ej: 22/05/92"
    }

    if (!input.rating) {
        errors.rating = 'se requiere rating';
    } else if (isNaN(input.rating)) {
        errors.rating = 'rating incorrecta (ej 4.57)';
    } else if (input.rating.length < 4) {
        errors.rating = "debe contener al menos 4 caracteres"
    }

    return errors;
};

export default function Form() {

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(getGames());
        dispatch(getGenres())

    }, [dispatch]);


    const allGames = useSelector((state) => state?.videogames);
    const genres = useSelector((state) => state?.genres);

    const [input, setInput] = useState({
        nombre: "",
        descripcion: "",
        fecha_de_lanzamiento: "",
        rating: "",
        genero: "",
        plataformas: ""
    });

    const [errors, setErrors] = useState({});

    var handleInputChange;
    var handleSubmit;
    var onChangeGeneros;
    var onChangePlatafromas;
    var StringPlataformas;
    var SplitPlataformas;
    var SetPlataformas = [];
    var ArrayPlataformas;
    var BorrarGenero;
    var BorrarPlataformas;

    if (Array.isArray(allGames) && genres.length > 5) {

        //console.log(genres);

        ArrayPlataformas = [];

        for (let i = 0; i < allGames.length; i++) {
            ArrayPlataformas.push(allGames[i].plataformas)
        };

        StringPlataformas = ArrayPlataformas.toString();

        SplitPlataformas = StringPlataformas.split(",");

        SetPlataformas = [...new Set(SplitPlataformas)];

        const indexToSlice = SetPlataformas.lastIndexOf('Android');
        const arrayMasCorto = [];
        for (let i = 0; i < indexToSlice; i++) {
            arrayMasCorto.push(SetPlataformas[i])
        }

        SetPlataformas.sort((a, b) => {

            if (a > b) {
                return 1;
            }
            if (b > a) {
                return -1;
            }
            return 0;
        })



        SetPlataformas = arrayMasCorto;

        genres.sort((a, b) => {

            if (a.nombre > b.nombre) {
                return 1;
            }
            if (b.nombre > a.nombre) {
                return -1;
            }
            return 0;
        });

        /*console.log(ArrayPlataformas);
        console.log(StringPlataformas);
        console.log(SplitPlataformas);
        console.log(SetPlataformas);*/

        handleInputChange = (e) => {

            setInput({
                ...input,
                [e.target.name]: e.target.value
            });

            setErrors(validate({
                ...input,
                [e.target.name]: e.target.value
            }));

        };

        handleSubmit = (e) => {
            e.preventDefault();
            axios.post("http://localhost:3001/videogames", input)
                .then(res => console.log(res.data))
                .catch(err => console.log(err))

            setInput({
                nombre: "",
                descripcion: "",
                fecha_de_lanzamiento: "",
                rating: "",
                genero: "",
                plataformas: ""
            })

            const selectGeneros = document.getElementById('select-generos');
            const selectPlataformas = document.getElementById('select-plataformas');
            selectGeneros.value = "";
            selectPlataformas.value = "";
        };

        onChangeGeneros = (e) => {
            setInput({
                ...input,
                genero: `${input.genero}, ${e.target.value}`
            });
            console.log(input.genero)
        };

        onChangePlatafromas = (e) => {
            setInput({
                ...input,
                plataformas: `${input.plataformas}, ${e.target.value}`
            });
            console.log(input.plataformas)
        };

        BorrarGenero = (e) => {
            e.preventDefault();
            console.log(input.genero)
            setInput({
                ...input,
                genero: input.genero.slice(0, input.genero.length - 1)
            });
        };

        BorrarPlataformas = (e) => {
            e.preventDefault();
            console.log(input.plataformas)
            setInput({
                ...input,
                plataformas: input.plataformas.slice(0, input.plataformas.length - 1)
            });
        };
    }


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

                <select onChange={onChangeGeneros} id="select-generos">

                    <option value="">Encontra tu genero:</option>

                    {genres && genres.map((g) => {
                        return (
                            <option>
                                {g.nombre}
                            </option>
                        );
                    })}

                </select>
                {input.genero}  <button onClick={BorrarGenero}>borrar</button>


                <select onChange={onChangePlatafromas} id="select-plataformas">

                    <option value="">Encontra tu plataforma:</option>

                    {SetPlataformas && SetPlataformas.map((p) => {
                        return (
                            <option>
                                {p}
                            </option>
                        );
                    })}

                </select>
                {input.plataformas}  <button onClick={BorrarPlataformas}>borrar</button>

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