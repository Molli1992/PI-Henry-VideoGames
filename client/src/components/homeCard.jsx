import "./HomeCard.css";
import React from 'react';

function HomeCard(props) {


    return (
        <article key="" className="card">

            <div className="card-header">
                <img src={props.img} alt="" />
            </div>

            <div className="card-info">
                <ul>

                    <li>
                        <span>
                            Nombre:
                        </span>
                        {props.nombre}
                    </li>

                    <li>
                        <span>
                            Genero:
                        </span>
                        {props.generos}
                    </li>

                </ul>
            </div>

        </article>
    )
}

export default HomeCard;