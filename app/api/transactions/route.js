import db from "@/lib/server/database.js"
import { authenticateUser } from "@/lib/server/middleware";
import { NextResponse } from "next/server";

export async function GET(req){
            try {
                const decodedUser = await authenticateUser(req);
                if(!decodedUser) {
                    return NextResponse.json({message: "User is not authorize"}, {status: 400})
                }
                const request = await db.query('SELECT * FROM transactions WHERE user_id=$1 ORDER BY id ASC', [decodedUser.userId]);
                const transaction = request.rows
                if(request.length < 1){
                    console.log("No transaction was found")
                    return NextResponse.json({error: "No transaction was found"})
                }
                
                return NextResponse.json(transaction)
            } catch (err) {
                return NextResponse.json({error: err.message})
            }
}