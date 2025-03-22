import db from "@/lib/server/database.js"
import bcrypt from "bcrypt"
import { NextResponse } from "next/server"

export async function POST(req){
            try {
                
                const {phone, password, name} = await req.json()

                const saltRounds = 10
                const hashPassword = await bcrypt.hash(password, saltRounds)
                const response = await db.query("INSERT INTO users (phone, password, name) VALUES ($1, $2, $3) RETURNING *", [phone, hashPassword, name])
                if(!response){
                    console.error("Failed to Sign Up")
                }

                return NextResponse.json(response.rows[0], {status: 200})
            } catch (error) {
                console.log("Failed to attemp Sign Up :", error)
                return NextResponse.json({message: "Sign Up Error : ", error}, {status: 500})
            }
}