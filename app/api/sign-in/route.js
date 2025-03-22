import db from "@/lib/server/database.js"
import bcrypt from "bcrypt"
import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import "dotenv/config"

export async function POST(req){
         try {                
                const {phone, password} = await req.json()
                if(!phone || !password){
                    console.log("You have to fill the credentials")
                    return NextResponse.json({message: "Fill the required credentials"})
                }
                const result = await db.query(`SELECT * FROM users WHERE phone=$1`, [phone])
                
                const data = result.rows[0]
                if(result.rows.length === 0){
                    return NextResponse.json({message: "User with phone number doesn't exist"}, {status: 404})
                }

                const checkPassword = await bcrypt.compare(password, data.password)
                if(!checkPassword){
                    console.error("Invalid credentials")
                    return NextResponse.json({message: "Invalid Credentials"}, {status: 401})
                }
                
                const accessToken = jwt.sign({user: data.name, phone: data.phone, userId: data.user_id}, process.env.ACTIVE_TOKEN, {expiresIn:"1h"})
                //Error pertama, import jwt gk pake {}
                //Error kedua, env variable gk kebaca next
                const {password: _, ...userData} = data
                
                return NextResponse.json({user: userData, accessToken}, {status: 200})
            } catch (error) {
                return NextResponse.json({message: "Internal Server Error :", error: error.message}, {status: 500}) // In App Route NEXTJS, ga bisa pake res.status().json()
            } 
    }   