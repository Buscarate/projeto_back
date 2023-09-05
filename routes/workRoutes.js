import express from 'express';
import mongoose from "mongoose";
const router = express.Router();
// Este arquivo é uma rota

const workSchema = new mongoose.Schema({
         title: String,
         description: String,
         categories: String,
     }) ;
     const Work = mongoose.model("Work", workSchema);

async function saveWork(req, res) {
    console.log(req.body);
    
     // Tudo q tem dentro do Schema vai para dentro da const e  conseguimos reconhecer os campos existentes no modelo
     const newWork = new Work({
         title: req.body.title,
         description: req.body.description,
         categories: req.body.categories,
     });
     // Criando uma nova-instancia(cópia) do postSchema
     try {
        await newWork.save();
         console.log("Deu boa!");
         res.status(200).send("Work criado!");
     } catch (err) {
         console.log("Deu pau!", err);
         res.status(500).send("ERRO DE SERVIDOR!");
         // Res status é o comando para retornar o código 500 para o front + uma msg de err e finalizando o looping infinito
     }; 
};
async function deleteWork(req, res) {      
    //  mongoose.connect(process.env.URI_MONGO);
     console.log("Work deletado!");
     const workId = req.params.id;
     try{
         const deletedWork = await Work.deleteOne({_id:workId});
         
         if(deletedWork.deletedCount === 0){
             res.status(404).send("Nenhum Work encontrado no banco!");
         }
         else{
             res.status(204).send("Work encontardo com sucesso!");
         }
     }
     catch(error){
         console.log(error);
          res.status(500).send();
     };
 };
async function getWork(req, res) {
    console.log("Work selecionado!");
    const workId = req.params.id;
    try{
        const work = await Work.findById(workId);    
        if(work){
            res.status(200).send(work);
        }     
        else{
            res.status(404).send("Nenhum Work encontrado no banco!");
        }
    }
    catch(err){
        res.status(500).send(err);
    }
};
 async function getAllWork  (req, res){
    console.log("Todos os Works selecionados!");
    try{
        const work = await Work.find();
        res.status(200).json(work);
    }
    catch(err){
        console.log("Nenhum Work encontrado no banco!", err);
    }
};
async function updateWork (req, res) {
     console.log("Work atualizado!");
     // const userId = req.params.id;
     const workId = req.params.id;
     const updateData = req.body;
     try{
        const updatedWork = await Work.updateOne({_id:workId}, updateData);
        if(updatedWork.nModified === 0){
             res.status(404).send("Nenhum Work encontrado!")
        }
        else{
             res.status(200).json({message: "Work Atalizado!"})
        }
    }
     catch(err){
         console.log("Nenhum work encontrado!", err);
         res.status(500).send(err);           
    }
};

router.post("/work", saveWork);
router.delete("/work/:id", deleteWork);
router.patch("/work/:id", updateWork);
router.get("/work/:id", getWork);
router.get("/work", getAllWork);
//Este é o mmnt q dizemos para a aplicação qual função sera acessada quando chamarmos a rota /Work com o método post

export default router;