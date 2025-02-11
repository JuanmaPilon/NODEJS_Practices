const express = require('express');
const router = express.Router();
const Game = require('../models/game.model');

// MIDDLEWARE

const getGame = async (req, res, next) => {
    let game;
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ message: 'ID invalido' });
    }
    try {
        game = await Game.findById(id);
        if (!game) {
            return res.status(404).json({ message: 'Juego no encontrado' });
        }

    } catch (error){
        return res.status(500).json({ message: error.message }); 
    }

    res.game = game;
    next();
}

// GET all games
router.get('/', async (req, res) => {
    try {
        const games = await Game.find();
        console.log(games);
        if (games.length === 0) {
            return res.status(204).json([]);
        }
        res.json(games);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST a game

router.post('/', async (req, res) => {

    const {title, platform, score, genre, editors_choice} = req?.body;

   if (!title || !platform || !score || !genre || !editors_choice) {
       return res.status(400).json({ message: 'Todos los campos son requeridos' });
   }

   const game = new Game({
    title: req.body.title,
    platform: req.body.platform,
    score: req.body.score,
    genre: req.body.genre,
    editors_choice: req.body.editors_choice
});

try {
    const newGame = await game.save();
    res.status(201).json(newGame);
} catch (error) {
    res.status(400).json({ message: error.message });
}


});

// GET by ID
router.get('/:id', getGame, async(req, res) => {
    res.json(res.game);
});

// PUT by ID
router.put('/:id', getGame, async(req, res) => {
    try {
        const game = res.game;
        game.title = req.body.title || game.title; // solo actualiza los campos que se envian, sino queda el default, lo mismo para los de abajo
        game.platform = req.body.platform || game.platform;
        game.score = req.body.score || game.score;
        game.genre = req.body.genre || game.genre;
        game.editors_choice = req.body.editors_choice || game.editors_choice;
        const updatedGame = await game.save();
        res.json(updatedGame);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PATCH by ID
router.patch('/:id', getGame, async(req, res) => {
    try {
        const game = res.game;
        if (req.body.title) {
            game.title = req.body.title;
        }
        if (req.body.platform) {
            game.platform = req.body.platform;
        }
        if (req.body.score) {
            game.score = req.body.score;
        }
        if (req.body.genre) {
            game.genre = req.body.genre;
        }
        if (req.body.editors_choice) {
            game.editors_choice = req.body.editors_choice;
        }
        const updatedGame = await game.save();
        res.json(updatedGame);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE by ID
router.delete('/:id', getGame, async(req, res) => {
    try {
        const game = res.game;
        await game.remove();
        res.json({ message: 'Juego eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;