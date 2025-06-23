import { Admin } from "@/model/admin-model";
import { NextRequest } from "next/server";
import bcrypt from "bcrypt";
import { Teacher } from "@/model/teacher-model";
import { Student } from "@/model/student-model";
import { connect } from "@/dbConfig/dbConfig";
import jwt from "jsonwebtoken";

connect()

const secretKEY = process.env.JWT_SECRET as string;
export async function POST(request: NextRequest) {
    try {
    const requestBody = await request.json();
    const { name, password, role} = requestBody;

    if(role === 'admin') {
        const adminregistred = await Admin.findOne({
            name
        });
        if(adminregistred) {
            const passwordCheck = await bcrypt.compare(password, adminregistred.password);
            if(passwordCheck) {
                const token = jwt.sign({
                    id: adminregistred._id,
                }, secretKEY, { expiresIn: '30d' })
                return Response.json({
                    message: "admin login in",
                    token
                })
            } else {
                return Response.json({
                    message: "Invalid password"
                })
            }
        } else {
            return Response.json({
                message: "no such admin found"
            })
        }
        
    } else if(role === 'teacher') {
        const teacherregistred = await Teacher.findOne({
            name
        });
        if(teacherregistred) {
            const passwordCheck = await bcrypt.compare(password, teacherregistred.password);
            if(passwordCheck) {
                const token = jwt.sign({
                    id: teacherregistred._id,
                }, secretKEY, { expiresIn: '30d' })
                return Response.json({
                    message: "teacher login in",
                    token
                })
            } else {
                return Response.json({
                    message: "Invalid password"
                })
            }
        } else {
            return Response.json({
                message: "no such teacher found"
            })
        }
    } else if(role === 'student') {
        const studentregistered = await Student.findOne({
            name
        });
        if(studentregistered) {
            const passwordCheck = await bcrypt.compare(password, studentregistered.password);
            if(passwordCheck) {
                const token = jwt.sign({
                    id: studentregistered._id,
                }, secretKEY, { expiresIn: '30d' })
                return Response.json({
                    message: "student login in",
                    token
                })
            } else {
                return Response.json({
                    message: "Invalid password"
                })
            }
        } else {
            return Response.json({
                message: "no such student found"
            })
        }
    } else {
        return Response.json({
            message: "invalid role"
        })
    }
    } catch(err) {
        console.error(err);
        return  Response.json({
            message: "error"
    });
    }
}