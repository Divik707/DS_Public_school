import { Teacher } from "@/model/teacher-model";
import { NextRequest } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";

const schema = z.object({
    name: z.string(),
    password: z.string(),
    phone_no: z.string(),
    education: z.string(),
    experience: z.string()
})

export async function POST(request: NextRequest) {
    const requestBody = await request.json();
    const verifiedTeacher = schema.safeParse(requestBody);
    if(verifiedTeacher.success) {
        const { name, password, phone_no, education, experience } = verifiedTeacher.data;
        const registered = await Teacher.find({
            name,phone_no
        })
        if(registered) {
            return Response.json({
                message: "teacher already registered"
            })
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            await Teacher.create({
                name, password: hashedPassword, phone_no, education, experience
            })
            return Response.json({
                message : "teacher registred"
            })
        }
    } else {
        return Response.json({
            message: "invlaid input from teacher"
        })
    }
}