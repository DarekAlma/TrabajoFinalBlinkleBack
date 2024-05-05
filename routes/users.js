const express=require ("express");
const router =express.Router();

router.use(express.urlencoded({ extended: true })); // para acceder al body
router.use(express.json);

let users= require("./signin").users;

router.get('/', (req, res) => {
    res.send(users);
});

// Ruta para obtener un usuario específico
router.get('/:userId', (req, res) => {
    const userId = req.params.userId;
    const user = users.find(user => user.id === userId);
    if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(user);
});

module.exports = router;

