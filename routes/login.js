
const express=require ("express");

const router =express.Router();

router.use(express.urlencoded({ extended: true })); // para acceder al body
router.use(express.json);

let users= require("./signin").users;


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