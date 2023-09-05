import express from 'express';
import mongoose from "mongoose";
const router = express.Router();

// Este arquivo é uma rota

const authSchema = new mongoose.Schema({
         name: String,
         email: String,
         password: String,
         permision: String, 
     }) ;
     const Auth = mongoose.model("Auth", authSchema);

async function login(req, res) {
    // console.log();
    try{
        const query = await Auth.findOne({
           email: req.body.email,
           password: req.body.password, 
        });
        
        console.log(query);  

        // const auth = await Auth.find();
        // res.status(200).json(auth);
        // console.log(auth);
        if(query){
             res.status(200).json({message:"Usuário Encontrado", token: ""}),
             console.log("Autenticação Completa!");
        }
        else{
             res.status(404).json({message: "Usuário não Encontrado!", token: ""}),
             console.log("Usuário não Encontrado!");
        };
    }
    catch(err){
        res.status(404).json({message:"Usuário não Encontrado!", token: ""});
        console.log(query);  
    };
};

router.post("/auth", login);

//Este é o mmnt q dizemos para a aplicação qual função sera acessada quando chamarmos a rota /post com o método post

export default router;