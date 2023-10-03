const {response} = require('express');
const bcrypt = require('bcryptjs')
const Usuario = require('../models/Usuario')
const {generarJWT} = require('../helpers/jwt')

const crearUsuario = async (req, res = response) => {

    const {email, password} = req.body;

    try {
        let usuario = await Usuario.findOne({email});

        if (usuario) {
            return res.status(400).json({
                ok:false,
                msg: 'um usuario existe con ese correo'
            });
        }

        usuario = new Usuario(req.body);
    
        //encriptar contrasena
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        //generar token
        const token = await generarJWT(usuario.id, usuario.name)
        console.log(token)
        
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'error'
        }
    )}
};

const loginUsuario = async (req, res = response) => {
  
    const { email, password} = req.body

    try {

        const usuario = await Usuario.findOne({email});

        if (!usuario) {
            return res.status(400).json({
                ok:false,
                msg: 'el usuario no existe con ese mail'
            });
        }

        //confirmar contrasenas
        const validPassword = bcrypt.compareSync(password, usuario.password);

        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'contrasena incorrecta'
            });
        }

        //generar nuestro jsn web token
        const token = await generarJWT(usuario.id, usuario.name);

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'error!!!!'
        })
    }

    
};

const revalidarToken = async (req, res = response) => {

    const {uid, name} = req;

    //generar un nuevo token
    const token = await generarJWT(uid, name);

    res.json({
        ok: true,
        token
    })
}


module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken,


}