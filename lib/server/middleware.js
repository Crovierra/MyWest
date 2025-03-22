import jwt from "jsonwebtoken"
import { NextResponse } from 'next/server'


export async function authenticateUser(req){
    const authHeaders = req.headers.get("Authorization")
    const token = authHeaders.split(" ")[1]

    if(!token){
        return NextResponse.json({message: "Token not found"}, {status: 404})
    }
    const decoded = jwt.verify(token, process.env.ACTIVE_TOKEN)
    
    if(!decoded){
        return NextResponse.json({message: "Invalid Token"}, {status: 401})
    }

    return decoded;
}