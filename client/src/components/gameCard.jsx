import "./gameCard.css";
import { Link } from "react-router-dom";
import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { getVideogamesDetail } from "../store/actions";


export default function GameCard() {

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
                        <img src={game[0].imagen} />
                    </div>

                    <div>

                        <ul>

                            <li>
                                <span>Nombre: </span>
                                {game[0].nombre}
                            </li>

                            <li>
                                <span>Genero: </span>
                                {game[0].genero}
                            </li>

                            <li>
                                <span>Descripcion: </span>
                                {game[0].descripcion}
                            </li>

                            <li>
                                <span>Fecha de lanzamiento: </span>
                                {game[0].fecha_de_lanzamiento}
                            </li>

                            <li>
                                <span>Rating: </span>
                                {game[0].rating}
                            </li>

                            <li>
                                <span>Plataformas </span>
                                {game[0].plataformas}
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