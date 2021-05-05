const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Repo = require('../models/repoModel');

router.use(express.json())

// get profile repositories
router.get('/', async(req,res) =>{
    try{
        const Db = await Repo.find({})
        res.status(200).send(Db)
    } catch (err){
        console.error(err)
        res.status(500).send('there is a problem')
    }  
})

// add repository to profile
router.post('/', async(req,res) => {
    const repo = new Repo(req.body)
    try{
        const savedRepo = await repo.save();
        console.log(savedRepo)
        res.send(savedRepo)
    } catch (err) {
        console.error(err)
    }
})

// modify repository comment
router.put('/:id', async (req, res) => {
    try {
        const filter = {repoId: req.params.id}
        const repo = await Repo.findOneAndUpdate(filter, req.body, { new: true });
        res.status(200).send(repo)
    } catch (err) {
        console.log(err)
        res.status(500)
    }
})

// remove repository from profile
router.delete('/:id', async (req, res) => {
	try {
		const result = await Repo.findOne({ repoId: req.params.id });
        await result.remove();
        const Db = await Repo.find({})
		res.status(200).send(Db);
    } catch (err) {
        res.status(500)
    }
})

module.exports = router;