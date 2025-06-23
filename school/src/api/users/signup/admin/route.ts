import { Teacher } from "@/model/teacher-model";
import { NextRequest } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";
import { Admin } from "@/model/admin-model";

const schema = z.object({
   name: z.string(),
   password: z.string(),
})

export async function POST(request: NextRequest) {
    const requestBody = await request.json();
    const verifiedadmin = schema.safeParse(requestBody);
    if(verifiedadmin.success) {
        const { name, password } = verifiedadmin.data;
        const registered = await Admin.find({
            name
        })
        if(registered) {
            return Response.json({
                message: "admin already registered"
            })
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            await Admin.create({
                name, password: hashedPassword
            })
            return Response.json({
                message : "admin registred"
            })
        }
    } else {
        return Response.json({
            message: "invlaid input from admin"
        })
    }
}