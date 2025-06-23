import { Student } from "@/model/student-model";
import { NextRequest} from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";
import { connect } from "@/dbConfig/dbConfig";

const zodverified = z.object({
    name: z.string(),
    password: z.string(),
    phone_no: z.string(),
    class: z.string()
})

connect();

export async function POST(request: NextRequest) {
    try {
        const requestBody = await request.json();
        const zod_data  = zodverified.safeParse(requestBody);

        if (!zod_data.success) {
           return Response.json({ message: 'invalid input from student' });
        }

        else {
          const {name, password, phone_no, class: studentClass} = zod_data.data;
          const student_registered = await Student.find({
            name, phone_no, class: studentClass
        })

        if(student_registered) {
            return Response.json({
                message: "student already register"
            })

        } else {
            const hashedPassword = await bcrypt.hash(password,10);
            await Student.create({
                name, password: hashedPassword, phone_no, class: studentClass
            })
            return Response.json({
                message: "student registered"
            })
        }
    }
    } catch (error) {
        console.error(error);
        return Response.json({ message: 'error' });
    }
}