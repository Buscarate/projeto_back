import express from 'express';
import mongoose from "mongoose";
const router = express.Router();
// Este arquivo é uma rota]

const postSchema = new mongoose.Schema({
    title: String,
    description: String,
    categories: String,
}) ;
const Post = mongoose.model("Post", postSchema);
// Tudo q tem dentro do Schema vai para dentro da const e  conseguimos reconhecer os campos existentes no modelo

async function savePost(req, res) {
    console.log(req.body);
    
     const newPost = new Post({
         title: req.body.title,
         description: req.body.description,
         categories: req.body.categories,
     });
     // Criando uma nova-instancia(cópia) do postSchema
     try {
        await newPost.save();
         console.log("Deu boa!");
         res.status(200).send("Post Criado com sucesso!");
     } catch (err) {
         console.log("Deu pau!", err);
         res.status(500).send("ERRO DE SERVIDOR!");
         // Res status é o comando para retornar o código 500 para o front + uma msg de err e finalizando o looping infinito
     };        
};
async function deletePost(req, res) {      
    //  mongoose.connect(process.env.URI_MONGO);
     console.log("Post deletado!");
     const postId = req.params.id;
     try{
         const deletedPost = await Post.deleteOne({_id:postId});
         if(deletedPost.deletedCount === 0){
             res.status(404).send("Nenhum Post encontrado no banco!");
         }
         else{
             res.status(204).send("Post encontardo com sucesso!");
         }
     }
     catch(error){
         console.log(error);
          res.status(500).send(oieeeee);
     };
 };
async function getPost(req, res) {
    console.log("Post selecionado!");
    const postId = req.params.id;
    try{
        const post = await Post.findById(postId);    
        if(post){
            res.status(200).send(post);
        }     
        else{
            res.status(404).send("Nenhum Post encontrado no banco!");
        }
    }
    catch(err){
        res.status(500).send(err);
    }
};
 async function getAllPost  (req, res){
    console.log("Todos os Posts selecionados!");
    try{
        const post = await Post.find();
        res.status(200).json(post);
    }
    catch(err){
        console.log("Nenhum Post encontrado no banco!", err);
    }
};
async function updatePost (req, res) {
     console.log("Post atualizado!");
     // const userId = req.params.id;
     const postId = req.params.id;
     const updateData = req.body;
     try{
        const updatedPost = await Post.updateOne({_id:postId}, updateData);
        if(updatedPost.nModified === 0){
             res.status(404).send("Nenhum usuário encontrado!")
        }
        else{
             res.status(200).json({message: "Usuário Atalizado!"})
        }
    }
     catch(err){
         console.log("Nenhum usuário encontrado!", err);
         res.status(500).send(err);           
    }
};


router.post("/post", savePost);
router.delete("/post/:id", deletePost);
router.patch("/post/:id", updatePost);
router.get("/post/:id", getPost);
router.get("/post", getAllPost);

//Este é o mmnt q dizemos para a aplicação qual função sera acessada quando chamarmos a rota /post com o método post

export default router;