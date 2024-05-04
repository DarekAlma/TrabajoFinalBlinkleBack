app.use(express.urlencoded({ extended: true })); // para acceder al body
app.use(express.json);

const users= require("../index").users;

const express=require ("express");
const router =express.Router();


// Ruta para registrar un nuevo usuario
router.post('/', (req, res) => {
    const { username, email, password } = req.body;
    // Verificar si el usuario ya está registrado
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).json({ message: 'El usuario ya está registrado' });
    }
    // Crear un nuevo usuario con un array vacío de tweets
    const newUser = { username, email, password, blinks: [] };
    users.push(newUser);
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
});

module.exports = router;