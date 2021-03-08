const express = require('express');
const chirpsStore = require('./chirpsstore');
const router = express.Router();

router.get('/:id?', (req, res) => {
    let id = req.params.id
    if (id) {
        res.json(chirpsStore.GetChirp(id));
    } else {
        res.send(chirpsStore.GetChirps());
    }
});

router.post('/', (req, res) => {
    chirpsStore.CreateChirp(req.body);
    res.sendStatus(200);
});


router.put('/:id', (req, res) => {
    let id = req.params.id;
    let chirp = chirpsStore.GetChirp(id);

    if (!chirp || Object.keys(chirp).length === 0) {
        return res.sendStatus(404);
    }

    chirpsStore.UpdateChirp(id, req.body);

    return res.sendStatus(200);
});


router.delete('/:id', (req, res) => {
    let id = req.params.id;
    let chirp = chirpsStore.GetChirp(id);
    chirpsStore.DeleteChirp(id, req.body);
    return res.sendStatus(200);
});


module.exports = router;