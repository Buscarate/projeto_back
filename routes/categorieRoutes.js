import express from 'express';
import mongoose from "mongoose";
const router = express.Router();
// Este arquivo é uma rota

 const categorieSchema = new mongoose.Schema({
         title: String,
         description: String,
         categories: String,
     }) ;
     const Categorie = mongoose.model("Categorie", categorieSchema);

async function saveCategorie(req, res) {
    console.log(req.body);
   
     // Tudo q tem dentro do Schema vai para dentro da const e  conseguimos reconhecer os campos existentes no modelo
     const newCategorie = new Categorie({
         title: req.body.title,
         description: req.body.description,
         categories: req.body.categories,
     });
     // Criando uma nova-instancia(cópia) do postSchema
     try {
        await newCategorie.save();
         console.log("Deu boa!");
         res.status(200).send("Categoria Criada!");
     } catch (err) {
         console.log("Deu pau!", err);
         res.status(500).send("ERRO DE SERVIDOR!");
         // Res status é o comando para retornar o código 500 para o front + uma msg de err e finalizando o looping infinito
     };
     
     
};
async function deleteCategorie(req, res) {      
    //  mongoose.connect(process.env.URI_MONGO);
     console.log("Categorie deletado!");
     const categorieId = req.params.id;
     try{
         const deletedCategorie = await Categorie.deleteOne({_id:categorieId});
         if(deletedCategorie.deletedCount === 0){
             res.status(404).send("Nenhuma Categoria encontrado no banco!");
         }
         else{
             res.status(204).send("Categoria encontrada com sucesso!");
         }
     }
     catch(error){
         console.log(error);
          res.status(500).send();
     };
 };
async function getCategorie(req, res) {
    console.log("Categorie selecionado!");
    const categorieId = req.params.id;
    try{
        const categorie = await Categorie.findById(categorieId);    
        if(categorie){
            res.status(200).send(categorie);
        }     
        else{
            res.status(404).send("Nenhuma Categoria encontrada no banco!");
        }
    }
    catch(err){
        res.status(500).send(err);
    }
};
 async function getAllCategorie  (req, res){
    console.log("Todos os Categorias selecionadas!");
    try{
        const categorie = await Categorie.find();
        res.status(200).json(categorie);
    }
    catch(err){
        console.log("Nenhuma Categoria encontrada no banco!", err);
    }
};
async function updateCategorie (req, res) {
     console.log("Categoria atualizada!");
     // const userId = req.params.id;
     const categorieId = req.params.id;
     const updateData = req.body;
     try{
        const updatedCategorie = await Categorie.updateOne({_id:categorieId}, updateData);
        if(updatedCategorie.nModified === 0){
             res.status(404).send("Nenhuma categoria encontrada!")
        }
        else{
             res.status(200).json({message: "Categoria Atualizada!"})
        }
    }
     catch(err){
         console.log("Nenhuma categoria encontrado!", err);
         res.status(500).send(err);           
    }
};

router.post("/categorie", saveCategorie);
router.delete("/categorie/:id", deleteCategorie);
router.patch("/categorie/:id", updateCategorie);
router.get("/categorie/:id", getCategorie);
router.get("/categorie", getAllCategorie);

//Este é o mmnt q dizemos para a aplicação qual função sera acessada quando chamarmos a rota /Categorie com o método post

export default router;