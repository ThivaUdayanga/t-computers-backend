import User from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export function createUser(req, res){

    const hashPassword = bcrypt.hashSync(req.body.password, 10)

    const user = new User(
        {
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: hashPassword,
        }
    )
    user.save().then(
        ()=>{
            res.json(
                {
                    massage : "User created successfully"
                }
            )
        }
    ).catch(
        ()=>{
            res.json(
                {
                    massage : "User creation failed"
                }
            )
        }
    )
}

export function loginUser(req, res){
    User.findOne(
        {
            email : req.body.email
        }
    ).then(
        (user)=>{
            // console.log(user)
            if(user == null){
                res.json(
                    {
                        massage : "User with given email not found"
                    }
                )
            }else{
                const isPasswordValid = bcrypt.compareSync(req.body.password , user.password)

                // res.json(
                //     {
                //         massage : isPasswordValid
                //     }
                // )

                if(isPasswordValid){

                    const token = jwt.sign(
                        {
                            email : user.email,
                            firstName : user.firstName,
                            lastName : user.lastName,
                            role: user.role,
                            image : user.image,
                            isEmailVerified : user.isEmailVerified
                        } , process.env.JWT_SECRET
                    )

                    res.json(
                        {
                            massage : token,
                        }
                    )
                }else{
                    res.status(401).json(
                        {
                            massage : "Invalid Password"
                        }
                    )
                }
            }
        }
    ).catch(
        ()=>{
            res.status(500).json(
                {
                    massage : "Invalid server error"
                }
            )
        }  
    )
}

export function isAdmin(req, res){
    if(req.user == null){
        return false;
    }

    if(req.user.role == "admin"){
        return true;
    }
}