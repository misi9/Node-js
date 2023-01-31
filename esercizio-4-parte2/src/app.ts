import express from "express";
import {PrismaClient} from "@prisma/client";
import cors from "cors";
import {
    validate,
    planetSchema,
    PlanetData,
    validationErrorMiddleware,

} from "./lib/validation"

const corsOption = {
    origin: "http://localhost:8080"
};

const app = express();
const prisma = new PrismaClient();
app.use(cors(corsOption));

app.get('/planets', async(request, response)=>{
   const planets = await prisma.planet.findMany()
   response.json(planets) 
})

app.get('/planets/:id', async(request, response)=>{
    const id = request.params
    const planet = await prisma.planet.findUnique({
        where: {
            id: +id 
        }
    })
    response.json(planet)
 })

app.post('/planets',validate({body: planetSchema}), async (request, response) => {
    const planetData :  PlanetData = request.body
    const planet = await prisma.planet.create({
        data: planetData
    })
    response.json(planet)
    
})

app.put('/planets/:id', async(request, response)=>{
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

app.delete('/planets/:id', async(request, response)=>{
    const id = request.params
    const planet = await prisma.planet.delete({
        where: {
          id: +id 
        }
    })
    response.json(planet)
})

app.use(validationErrorMiddleware);


app.listen(3000, ()=>{
    console.log('running at port 3000')
})

