import { useEffect, useState } from 'react';
import "./home.css";
import HomeCard from './homeCard';
import { Link } from 'react-router-dom';
import { getGames, getGenres } from "../store/actions";
import { useDispatch, useSelector } from "react-redux";

export default function Home(props) {

    var nextHandler;
    var prevHandler;
    var handleSearchNombre;
    var handleFilterGen;
    var handleFilterGame;
    var handleSortAsc;
    var handleSortDes;
    var handleDelete;
    var handleSortRating;
    var games;
    var allGames;
    var genres;

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(getGames());
        dispatch(getGenres());

    }, [dispatch]);

    allGames = useSelector((state) => state?.videogames);
    genres = useSelector((state) => state?.genres);

    useEffect(() => {
        if (allGames && allGames.length) {
            setItems([...allGames].splice(0, ITEMS_PER_PAGE));
        }
    }, [allGames]);


    const [items, setItems] = useState("");

    const [currentPage, setCurrentPage] = useState(0);

    if (Array.isArray(allGames) && allGames.length) {

        console.log(allGames);
        console.log(items);

        genres.sort((a, b) => {

            if (a.nombre.toLowerCase() > b.nombre.toLowerCase()) {
                return 1;
            }
            if (b.nombre.toLowerCase() > a.nombre.toLowerCase()) {
                return -1;
            }
            return 0;
        });

        games = allGames.map(game => {
            return game.nombre
        });

        games.sort((a, b) => {

            if (a > b) {
                return 1;
            }
            if (b > a) {
                return -1;
            }
            return 0;
        });

        var ITEMS_PER_PAGE = 15;

        nextHandler = () => {

            const totalElementos = allGames.length;

            const nextPage = currentPage + 1;

            const firstIndex = nextPage * ITEMS_PER_PAGE;

            if (nextPage >= totalElementos / ITEMS_PER_PAGE) return;

            allGames = allGames.splice(firstIndex, ITEMS_PER_PAGE)

            setItems([...allGames])
            setCurrentPage(nextPage);

        };

        prevHandler = () => {

            const prevPage = currentPage - 1;

            if (prevPage < 0) return;

            const firstIndex = prevPage * ITEMS_PER_PAGE;

            allGames = allGames.splice(firstIndex, ITEMS_PER_PAGE)

            setItems([...allGames])
            setCurrentPage(prevPage);

        };

        handleSearchNombre = (e) => {

            allGames = allGames.filter((dato) => {
                return dato.nombre.toLowerCase().includes(e.target.value.toLowerCase())
            })

            setItems([...allGames])
            setCurrentPage(0)
        };

        handleFilterGen = (e) => {

            allGames = allGames.filter((dato) => {
                return dato.genero.toLowerCase().includes(e.target.value.toLowerCase())
            })

            setItems([...allGames])
            setCurrentPage(0)
        };

        handleFilterGame = (e) => {

            allGames = allGames.filter((dato) => {
                return dato?.nombre?.toLowerCase().includes(e?.target?.value?.toLowerCase())
            })

            setItems([...allGames])
            setCurrentPage(0)
        };


        handleSortDes = (e) => {

            setCurrentPage(0);

            allGames.sort((a, b) => {

                if (a.nombre.toLowerCase() > b.nombre.toLowerCase()) {
                    return -1;
                }
                if (b.nombre.toLowerCase() > a.nombre.toLowerCase()) {
                    return 1;
                }
                return 0;
            });

            const totalElementos = allGames.length;

            const nextPage = currentPage;

            const firstIndex = nextPage * ITEMS_PER_PAGE;

            if (nextPage >= totalElementos / ITEMS_PER_PAGE) return;

            setItems([...allGames].splice(firstIndex, ITEMS_PER_PAGE))
        };




        handleSortAsc = (e) => {

            setCurrentPage(0);

            allGames.sort((a, b) => {

                if (a.nombre.toLowerCase() > b.nombre.toLowerCase()) {
                    return 1;
                }
                if (b.nombre.toLowerCase() > a.nombre.toLowerCase()) {
                    return -1;
                }
                return 0;
            });

            const totalElementos = allGames.length;

            const nextPage = currentPage;

            const firstIndex = nextPage * ITEMS_PER_PAGE;

            if (nextPage >= totalElementos / ITEMS_PER_PAGE) return;

            setItems([...allGames].splice(firstIndex, ITEMS_PER_PAGE))
        };


        handleSortRating = (e) => {

            setCurrentPage(0);

            allGames.sort((a, b) => {

                if (a.rating.toLowerCase() > b.rating.toLowerCase()) {
                    return 1;
                }
                if (b.rating.toLowerCase() > a.rating.toLowerCase()) {
                    return -1;
                }
                return 0;
            });

            const totalElementos = allGames.length;

            const nextPage = currentPage;

            const firstIndex = nextPage * ITEMS_PER_PAGE;

            if (nextPage >= totalElementos / ITEMS_PER_PAGE) return;

            setItems([...allGames].splice(firstIndex, ITEMS_PER_PAGE))
        };

        handleDelete = (e) => {
            window.location.reload(true);
        };

        return (

            <div className='home-color'>

                <div className='home-banner'>
                    <h1 className='h-1'>PI-Henry-Video Games</h1>
                </div>

                <main>

                    <div className='home-filters'>

                        <div >
                            <Link to="/form">
                                <button className="bgc-negro">Crea tu juego</button>
                            </Link>
                        </div>

                        <div className='home-page'>

                            <div>
                                <label>Busca tu juego</label>
                                <input placeholder='busca por nombre' name='search'
                                    onChange={handleSearchNombre} />
                            </div>

                        </div>

                        <select onClick={handleFilterGen}>

                            <option>Busca por Genero</option>

                            {genres && genres.map((g) => {
                                return (
                                    <option>
                                        {g.nombre}
                                    </option>
                                );
                            })}

                        </select>

                        <select onClick={handleFilterGame}>

                            <option>Busca por Juego</option>

                            {games && games.map((game) => {
                                return (
                                    <option>
                                        {game}
                                    </option>
                                );
                            })}

                        </select>

                        <button onClick={handleSortAsc} className="bgc-azul">
                            Ordena de A-Z
                        </button>

                        <button onClick={handleSortDes} className="bgc-azul">
                            Ordena de Z-A
                        </button>

                        <button onClick={handleSortRating} className="bgc-azul">
                            Ordena por rating
                        </button>

                        <button onClick={handleDelete} className="bgc-verde">Refresh</button>

                    </div>


                    <div className='home-cards'>

                        {

                            items && items.map((game) => {


                                return (

                                    <Link to={"/home/" + game.id}>
                                        <HomeCard img={game.imagen} nombre={game.nombre}
                                            generos={game.genero} />
                                    </Link>

                                )

                            })

                        }

                    </div>

                    <div className='home-paginado'>
                        <button onClick={prevHandler} className="bgc-gris">Prev</button>
                        {currentPage}
                        <button onClick={nextHandler} className="bgc-gris">Next</button>
                    </div>

                </main>

            </div>
        );

    } else return (
        <div>Loading...</div>
    )

};

