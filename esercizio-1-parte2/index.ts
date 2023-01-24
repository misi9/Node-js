import express from "express";
import {PrismaClient} from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.get('/', async(request, response)=>{
   const planets = await prisma.planet.findMany()
   response.json(planets) 
})

app.listen(3000, ()=>{
    console.log('running at port 3000')
})

