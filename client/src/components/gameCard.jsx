import "./DogCard.css";
import { Link } from "react-router-dom";
import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { getVideogamesDetail } from "../store/actions";


export default function DogCard() {

    const dispatch = useDispatch();

    const { id } = useParams();

    useEffect(() => {

        dispatch(getVideogamesDetail(id))

    }, [dispatch]);

    const game = useSelector((state) => state?.videogamesDetail);

    if (Array.isArray(game)) {

        console.log(game);

        return (

            <div className="dog-detail">

                <article className="card-detail">

                    <div className="card-header">
                        <img src="" />
                    </div>

                    <div>

                        <ul>

                            <li>
                                <span>Nombre: </span>
                                {game.nombre}
                            </li>

                            <li>
                                <span>Genero: </span>
                                {game.genero}
                            </li>

                            <li>
                                <span>Descripcion: </span>
                                {game.descripcion}
                            </li>

                            <li>
                                <span>Fecha de lanzamiento: </span>
                                {game.fecha_de_lanzamiento}
                            </li>

                            <li>
                                <span>Rating: </span>
                                {game.rating}
                            </li>

                            <li>
                                <span>Plataformas </span>
                                {game.plataforma}
                            </li>

                        </ul>


                    </div>


                </article>

                <div>
                    <Link to="/home">
                        <button className='bgc-negro'>Home</button>
                    </Link>
                </div>

            </div>

        )

    } else return (
        <div>Game not foound</div>
    )

};