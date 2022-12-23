const { Router } = require('express');
const { Videogame, Genero } = require("../db");
const { YOUR_API_KEY } = process.env;

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/videogames", async (req, res) => {

    const nombre = req.query.nombre;

    if (nombre) {
        const juego = await Videogame.findAll({
            where: { nombre: nombre }
        });

        if (juego.length === 0) {
            return res.status(404).send("juego no encontrado")
        }

        res.json(juego)
    }

    else {
        const juegos = await Videogame.findAll();

        if (juegos.length !== 0) {
            return res.json(juegos);
        };

        res.status(404).send("juegos no encotrados");
    }

});

router.get("/videogames/:id", async (req, res) => {

    const { id } = req.params;

    const juego = await Videogame.findAll({
        where: { id: id }
    });

    if (juego) {
        return res.json(juego)
    };

    res.status(404).send("juego no encontrado");
});


router.post("/videogames", async (req, res) => {

    const { nombre, descripcion, fecha_de_lanzamiento, rating, plataformas, genero } = req.body;

    if (!nombre || !descripcion || !fecha_de_lanzamiento || !rating || !plataformas || !genero) {
        return res.status(404).send("Falta enviar datos obligatorios");
    }

    console.log(req.body);


            try {
    
                const juegosInternos = await Videogame.findAll();
                const ultimoIDInterno = juegosInternos.length + 1;

                console.log(ultimoIDInterno);
        
                const juego = await Videogame.create({
                    ...req.body, id: ultimoIDInterno
                });
        
                console.log(juego);
                return res.status(201).json(juego);
        
            } catch (error) {
                console.log(error);
                return res.status(404).send("Error en alguno de los datos provistos");
            }
            
        });

router.get("/genres", async (req, res) => {

    fetch(`https://api.rawg.io/api/genres?key=${YOUR_API_KEY}`)
                .then(response => response.json())
                .then(async json => {

                    const apiGeneros = json;

                    try {

                        const generosMapeados = apiGeneros.results.map(genero => {
                            return genero.name
                        })

                        console.log(generosMapeados);

                        for (let i = 0; i < generosMapeados.length; i++) {

                            await Genero.findOrCreate({
                                where: { nombre: generosMapeados[i] },
                              });
                            
                        }

                        const generos = await Genero.findAll();
                                
                        res.status(200).json(generos);
                
                    } catch (error) {
                        console.log(error);
                        res.status(404).send("generos no encontrados");
                    }

                })  
    });


module.exports = router;