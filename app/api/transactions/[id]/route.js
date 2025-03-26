import db from "@/lib/server/database";
import { authenticateUser } from "@/lib/server/middleware";
import { NextResponse } from "next/server";

export async function POST(req){
    try {      
        const transaction = await req.json()
        const { userId, date, status, category, description, amount } = transaction
        if(!userId || !date || !status || !category || !amount){
            return NextResponse.json({message:"All fields are required"}, {status: 404})
        }
        
        await db.query("INSERT INTO transactions (user_id, date, status, category, description, amount) VALUES ($1, $2, $3, $4, $5, $6)", [userId, date, status, category, description, amount])
        
        return NextResponse.json({message: "Success adding new transaction"}, {status: 201})
    } catch (error) {
        return NextResponse.json({message: "Can't add new data to database :", error: error.message}, {status: 500})
    }
}

export async function PUT(req){
    try {
        const newTransaction = await req.json()

        const {status, category, description, amount, id } = newTransaction
        if(!status || !category || !amount){
            return NextResponse.json({message:"All fields are required"}, {status: 404})
        }
        
        const decodedUser = await authenticateUser(req)
        if(!decodedUser){
            return NextResponse.json({message: "User not authorize"}, {status: 401})
        }
        
        const response = await db.query("UPDATE transactions SET status = $1, category = $2, description = $3, amount = $4 WHERE id = $5 RETURNING *", [status, category, description, amount, id])
        const transaction = response.rows[0]
        return NextResponse.json({message: "Success updating transaction", transaction}, {status: 200})
    } catch (error) {
        return NextResponse.json({message: "Failed to update transaction :", error: error.message}, {status: 500})
    }
}

export async function DELETE(req){
    try {
        const authHeaders = req.headers.get("Authorization")
        if(!authHeaders){
            return NextResponse.json({message: "Authorization headers not found"}, {status: 404})
        }
        const token = authHeaders.split(" ")[1] 
        if(!token){
            return NextResponse.json({message: "Access Denied, Token Invalid"}, {status: 401})
        }
        
        const transaction = await req.json()
        const { id } = transaction

        if(!id){
            return NextResponse.json({message: "Transaction id not found"}, {status: 404})
        }
        
        //Check user authorize or not
        const decodedUser = await authenticateUser(req)
        
        if(!decodedUser){
            return NextResponse.json({message: "User not authorize"}, {status: 500})
        }
        await db.query("DELETE FROM transactions WHERE id=$1", [id])
        return NextResponse.json({message: "Success deleting transaction"}, {status: 200})
    } catch (error) {
        return NextResponse.json({message: "Server Error", error}, {status: 500})
    }
}