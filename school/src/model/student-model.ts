import mongoose, { Schema, model } from "mongoose"
import { Teacher } from "./teacher-model"

const studentSchema = new Schema({
    name: { type: String, required: true},
    password: {type: String, required: true},
    phone_no: { type: Number, required: true },
    class: { type: String, required: true },
    attendence: {type: mongoose.Types.ObjectId, ref :'Attendence'},
    leave: { type: mongoose.Types.ObjectId, ref: 'Leave'},
    marks : {type: Schema.Types.ObjectId, ref: 'Student-Marks'},
    teacher: { type: mongoose.Types.ObjectId, ref: 'Teacher'},
    homework: {type: Schema.Types.ObjectId, ref: 'Student-Homework'}
})

const studentMarks = new Schema({
    student_id: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    subject: { type: String, required: true },
    Testmarks: { type: Number, required: true },
    Final: { type: Number, required: true }
})

const homework = new Schema({
    student_id: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    subject: { type: String, required: true },
    homework: { type: String, required: true },
    deadline: { type: Date, required: true }
})

const attendence = new Schema({
    student_id: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    date: { type: Date, required: true },
    status: { type: String, required: true }
})

const leave = new Schema({
    student_id: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    date: { type: Date, required: true },
    reason: { type: String, required: true }
})

export const Student = model('Student', studentSchema)
export const StudentMarks = model('Student-Marks', studentMarks)
export const Homework = model('Student-Homework', homework);
export const Attendence = model('Attendence', attendence);
export const Leave = model('Leave', leave);
