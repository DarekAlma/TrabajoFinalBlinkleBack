const express=require ("express");
const router =express.Router();
const { v4: uuidv4 } = require('uuid');

router.use(express.urlencoded({ extended: true })); // para acceder al body
router.use(express.json);

let users = require('../usersData');

// Ruta para publicar un tweet
router.post('/', (req, res) => {
    const { userId, message } = req.body;
    // Verificar si el usuario existe
    const user = users.find(user => user.id === userId);
    if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    // Generar un identificador único para el nuevo tweet
    const blinkId = uuidv4();
    // Crear un nuevo tweet y agregarlo al array de tweets del usuario
    const newBlink = { id: blinkId ,message };
    user.blinks.push(newBlink);
    res.status(201).json({ message: 'Blink publicado exitosamente' });
});

router.get('/', (req, res) => {
    let allBlinks = [];
    // Iterar sobre todos los usuarios
    users.forEach(user => {
        // Obtener los tweets del usuario actual y agregarlos a la lista de tweets
        allBlinks = allBlinks.concat(user.blinks);
    });
    // Devolver todos los tweets como respuesta
    res.json(allTweets);
});

// Ruta para editar un tweet
router.patch('/:blinkId', (req, res) => {
    const { userId, blinkId } = req.params;
    const { message } = req.body;
    // Verificar si el usuario existe
    const user = users.find(user => user.id === userId);
    if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    // Buscar el tweet dentro del array de tweets del usuario
    const blink = user.blinks.find(blink => blink.id === blinkId);
    if (!blink) {
        return res.status(404).json({ message: 'Blink no encontrado' });
    }
    // Actualizar el mensaje del tweet
    blink.message = message;
    res.status(200).json({ message: 'Blink editado exitosamente' });
});



module.exports = router;