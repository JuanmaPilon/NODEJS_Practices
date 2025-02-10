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
        res(games);
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

