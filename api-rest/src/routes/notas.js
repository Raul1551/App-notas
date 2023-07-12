import { Router } from "express";
import Nota from "../models/notas.js";

// Routes
const router = Router();

// Peticiones de tipo Get
router.get('/notas', async (req, res) => {
    const notas = await Nota.find();
    res.send(notas)
})

// Peticiones de tipo Post
router.post('/notas', async (req, res) => {
    const nota = new Nota({
        title: req.body.title,
        content: req.body.content
    })
    await nota.save()
    res.send(nota)
})

// Peticiones de tipo Get para obtener un elemento
router.get('/notas/:id', async (req, res) => {
    const nota = await Nota.findOne({ _id: req.params.id })
    res.send(nota)
})

// Peticiones de tipo Patch
router.patch('/notas/:id', async (req, res) => {
    try {
        const nota = await Nota.findOne({ _id: req.params.id })
        if (req.body.title) {
            nota.title = req.body.title
        }
        if (req.body.content) {
            nota.content = req.body.content
        }

        nota.save()
        res.send(nota)
    } catch {
        res.send('La nota no está registrada')
    }

})

// Peticiones de tipo Delete
router.delete('/notas/:id', async (req, res) => {
    try {
        const nota = await Nota.deleteOne({ _id: req.params.id })
        res.send(nota)
    } catch {
        res.send('La nota no está eliminada')
    }

})

export default router;