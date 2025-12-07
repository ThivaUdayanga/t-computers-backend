import product from "../models/product.js";
import { isAdmin } from "../controllers/userController.js";

export async function createProduct (req, res){
    
    if(!isAdmin(req)){
        res.status(403).json({massage : "Access denied"})
        return;
    }
    try {
        const exsistingProduct = await product.findOne(
            {
                productId : req.body.productId
            }
        )
        if(exsistingProduct){
            res.status(400).json({massage : "Product with given productId already exsists"})
            return;
        }

        const data = {}

        data.productId = req.body.productId

        if(req.body.name == null){
            res.status(400).json({massage : "Product name is required"})
            return;
        }
        data.name = req.body.name

        data.discription = req.body.discription || ""
        data.altName = req.body.altName || []

        if (req.body.price == null){
            res.status(400).json({massage : "Product price is required"})
            return;
        }
        data.price = req.body.price
        data.category = req.body.category || "others"
        data.labelPrice = req.body.labelPrice || data.price
        data.images = req.body.images || ["/images/default-product-1.png","/images/default-product-2.png"]
        data.isVissible = req.body.isVissible
        data.brand = req.body.brand || "Generic"
        data.model = req.body.model || "Standard"

        const newProduct = new product(data)
        await newProduct.save()
        res.status(201).json({massage : "Product created successfully"})

    } catch (error) {
        res.status(500).json({error})
    }
}

export async function getProducts (req, res){
    try {

        if(isAdmin(req)){
            const productAdmin = await product.find()
            res.status(200).json(productAdmin)
        }else{
            const productUser = await product.find({isVissible : true})
            res.status(200).json(productUser)
        }
        
    } catch (error) {
        res.status(500).json({massage : "Server error"})
    }
}

export async function deleteProduct(req, res){
    if(!isAdmin(req)){
        res.status(403).json({massage : "Access denied"})
        return;
    }
    try {
        const ProductId = req.params.productId
        await product.deleteOne({ productId : ProductId})
        res.status(200).json({massage : "Product deleted successfully"})
    } catch (error) {
        res.status(500).json({massage : "Server error"})
    }
}

export async function updateProduct(req, res){
    if(!isAdmin(req)){
        res.status(403).json({massage : "Access denied"})
        return;
    }
    try {
        const productId = req.params.productId

        const data = {}

        if(req.body.name == null){
            res.status(400).json({massage : "Product name is required"})
            return;
        }
        data.name = req.body.name

        data.discription = req.body.discription || ""
        data.altName = req.body.altName || []

        if (req.body.price == null){
            res.status(400).json({massage : "Product price is required"})
            return;
        }
        data.price = req.body.price
        data.category = req.body.category || "others"
        data.labelPrice = req.body.labelPrice || data.price
        data.images = req.body.images || ["/images/default-product-1.png","/images/default-product-2.png"]
        data.isVissible = req.body.isVissible
        data.brand = req.body.brand || "Generic"
        data.model = req.body.model || "Standard"

        await product.updateOne({productId : productId}, data)
        res.status(201).json({massage : "Product updated successfully"})

    } catch (error) {
        res.status(500).json({error})
    }
}

export async function getProductById(req, res){
    try {
        const productId = req.params.productId
        const foundProduct = await product.findOne({productId : productId})

        if(foundProduct == null){
            res.status(404).json({massage : "Product not found"})
            return;
        }
        if(!foundProduct.isVissible){
            if(!isAdmin(req)){
                res.status(404).json({massage : "You are not autherized"})
                return;
            }
        }
        res.status(200).json(foundProduct)

    } catch (error) {
        res.status(500).json({massage : "Server error"})
    }
}