const { response } = require("express");
const Evento = require('../models/Evento')


const obtenerEvento = (req, res = response) => {
    
    res.json({
        ok: true,
        msg: 'getEventos'
    });
}


const nuevoEvento = async (req, res = response) => {

    // verificar que tengo el evento
    const evento = new Evento(req.body);

    try {

        evento.user = req.uid;

      const eventoGuardado =  await evento.save();

      res.json({
        ok: true,
        evento: eventoGuardado,
      })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'hable con el admin'
        })
    }

    res.json({
        ok: true,
        msg: 'nuevoEvento'
    });
}

const actualizarEvento = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'actualizar evento'
    });
}

const borrarEvento = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'borrar evento'
    });
}


module.exports = {
    obtenerEvento,
    nuevoEvento,
    actualizarEvento,
    borrarEvento
}
