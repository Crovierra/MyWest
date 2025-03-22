import jwt from "jsonwebtoken"
import { NextResponse } from "next/server"


export async function GET(req){
    try {
        
        const authHeader = req.headers.get("Authorization")
        const token = authHeader.split(" ")[1]
        
        if(!authHeader){
            return NextResponse.json({message:"Missing auth headers"}, {status: 404})
        }
        if(!token){
            return NextResponse.json({message: "Missing token"}, {status: 404})
        }
    
        const decoded = jwt.verify(token, process.env.ACTIVE_TOKEN)
        if(!decoded){
            return NextResponse.json({message: "Invalid token"}, {status: 401})
        }
        
        return NextResponse.json({user: decoded}, {status: 200})
    } catch (error) {
        console.error("Error :", error)
        return NextResponse.json({status: 500})
    }
}