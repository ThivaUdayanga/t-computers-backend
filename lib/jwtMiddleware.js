import jwt from 'jsonwebtoken'

export default function Autherization(req,res, next){
        const header = req.header("Authorization")

        if (header != null){
            const token = header.replace("Bearer ", "")

            jwt.verify(token, "t-computers-54", 
                (err , decoded)=>{
                    
                    if(decoded == null){
                        res.status(401).json(
                            {
                                massage : "invalid token please login again"
                            }
                        )
                    }else{
                        req.user = decoded
                        next()
                    }
                }
            )
        }else{
            next()
        }
    }
