import mongoose from "mongoose"

const productSchema = new mongoose.Schema(
    {
        productId : {
            type : String,
            required : true,
            unique : true
        },
        name : {
            type : String,
            required : true
        },
        description : {
            type : String,
            required : false,
            default : ""    
        },
        altNames : {
            type : [String],
            required : false,
            default : []
        },
        price : {
            type : Number,
            required : true
        },
        labelPrice : {
            type : Number
        },
        category : {
            type : String,
            default : "Others"
        },
        images : {
            type : [String],
            default : ["images/default-product-1.png","images/default-product-2.png"]
        },
        isVissible : {
            type : Boolean,
            default : true,
            required : true
        },
        brand : {
            type : String,
            default : "Generic"
        },
        model : {
            type : String,
            default : "Standard"
        }
    }
)

const product = mongoose.model("product", productSchema)

export default product