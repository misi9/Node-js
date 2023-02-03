import express, {Router} from "express";
import { PrismaClient } from "@prisma/client";
import {initMulterMiddleware} from "../lib/middleware/multer";

import {
    validate,
    planetSchema,
    PlanetData,
} from "../lib/validation"



const upload = initMulterMiddleware();

const app = express();
const prisma = new PrismaClient();
const router = Router();


router.get('/planets', async(request, response)=>{
   const planets = await prisma.planet.findMany()
   response.json(planets) 
})

router.get('/planets/:id', async(request, response)=>{
    const id = request.params
    const planet = await prisma.planet.findUnique({
        where: {
            id: +id 
        }
    })
    response.json(planet)
 })

router.post('/planets',validate({body: planetSchema}), async (request, response) => {
    const planetData :  PlanetData = request.body
    const planet = await prisma.planet.create({
        data: planetData
    })
    response.json(planet)
    
})

router.put('/planets/:id', async(request, response)=>{
    const id = request.params
    const {name,diameter,moons} = request.body
    const planet = await prisma.planet.update({
        where: {
          id: +id 
        },
        data:{
          name,
          diameter,
          moons
        }
    })
    response.json(planet)
})

router.delete('/planets/:id', async(request, response)=>{
    const id = request.params
    const planet = await prisma.planet.delete({
        where: {
          id: +id 
        }
    })
    response.json(planet)
})

router.post("/planets/:id/photo", 
upload.single("photo"), 
async (request, response) => {
    console.log("request.file", request.file)

    const photoFilename = request.file?.filename
    response.json({photoFilename})
})

export default router;
