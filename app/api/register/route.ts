import { NextResponse } from "next/server";

export async function POST(req: Request){
    const {name, email, phone, password} = await req.json();
    console.log(name, email, phone, password)
try {
    return NextResponse.json(name, {status: 201})
} catch (error) {
    console.log(error)
    return NextResponse.json({message:"An error occured!"}, {status: 500})
}
} 