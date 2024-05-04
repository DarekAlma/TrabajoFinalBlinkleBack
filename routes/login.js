app.use(express.urlencoded({ extended: true })); // para acceder al body
app.use(express.json);

const users= require("../index").users;

const express=require ("express");

const router =express.Router();

// Ruta para iniciar sesión
router.post('/', (req, res) => {
    const { email, password } = req.body;
    // Verificar si el usuario existe
    const user = users.find(user => user.email === email && user.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
    }
    res.status(200).json({ message: 'Inicio de sesión exitoso' });
});

module.exports = router;