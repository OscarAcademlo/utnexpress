var express = require('express');
var router = express.Router();
var novedadesModels = require('../../models/novedadesModels')

// get novedades
router.get('/', async function (req, res, next)  {
    var novedades = await novedadesModels.getNovedades();
    res.render('admin/novedades', {
        layout: 'admin/layout',
        persona: req.session.nombre,
        novedades
        
    });
});

// delete novedades
router.get('/eliminar/:id', async (req, res, next) =>  {
    const id = req.params.id;
    await novedadesModels.deleteNovedadesById(id);
    res.redirect('/admin/novedades')
    
    });
// Pagina agregar
    router.get('/agregar', async  (req, res, next) => {
       
        res.render('admin/agregar', {
            layout: 'admin/layout',
        })
    });

    // Inserta la novedad en bd

    router.post('/agregar',async (req,res,next) => {
        try {
            
            if( req.body.titulo != "" && req.body.subtitulo != "" && req.body.cuerpo != ""){
                await novedadesModels.insertNovedad(req.body);
                res.redirect('/admin/novedades')
            }else{
                res.render('admin/agregar', {
                    layout: 'admin/layout',
                    error:true,
                    message: 'Todos los campos son requeridos'
                })
            }
            


        } catch (error) {
            console.log(error);
            res.render('admin/agregar', {
            layout: 'admin/layout',
            error:true,
            message:'No se cargo la novedad'
            
        })
    }
})

// Trae novedad a modificar
router.get('/modificar/:id', async (req,res,next) =>{
    var id = req.params.id;
    var novedad = await novedadesModels.getNovedadesById(id);
    res.render('admin/modificar', {
     layout: 'admin/layout',
     novedad
    })

} )

// Actualiza novedades

router.post('/modificar', async (req,res,next)=>{
try {
    var obj = {
        titulo:req.body.titulo,
        subtitulo:req.body.subtitulo,
        cuerpo:req.body.cuerpo

    }
await novedadesModels.modificarNovedadesById (obj, req.body.id);
res.redirect('/admin/novedades');

} catch (error) {
    console.log(error);
    res.render('admin/modificar', {
        layout:'admin/layout',
        error: true,
        message:'No se modifico la novedad'
    })
}
})

    module.exports = router;