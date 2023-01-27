const { Videogame } = require("../db");
const { YOUR_API_KEY } = process.env;

const populate = async function () {

    try {

        const obtengoJuegos = await Videogame.findAll();

        if (obtengoJuegos.length === 0) {

            for (let i = 1; i < 54; i++) {

                fetch(`https://api.rawg.io/api/games?key=${YOUR_API_KEY}&page=${i}`)
                    .then(response => response.json())
                    .then(async json => {

                        const juegosMapeados = json.results.map(juego => {

                            return {
                                nombre: juego.name,
                                descripcion: juego.tags.map((tag) => {
                                    return tag.name || "not found"
                                }).join(", ").slice(0, 250),
                                fecha_de_lanzamiento: juego.released,
                                rating: juego.rating,
                                plataformas: juego.platforms.map((plataforma) => {
                                    return plataforma.platform.name || "not found"
                                }).join(", "),
                                genero: juego.genres.map((genre) => {
                                    return genre.name || "not found"
                                }).join(", "),
                                imagen: juego.background_image
                            }

                        })

                        try {
                            const juegosGuardados = await Videogame.bulkCreate(juegosMapeados);
                            console.log(juegosGuardados);
                        } catch (error) {
                            console.log("guardando juegos", error);
                        }

                    });
            }



        }

    } catch (error) {

        console.log("obteniendo juegos", error)

    }

};

module.exports = {
    populate: populate
}