import mongoose, {model, Schema } from 'mongoose';

const teacherSchema = new Schema({
    name: {type: String, required: true},
    password: {type: String, required: true},
    phone_no: { type: Number, required: true},
    education: {type: String, required: true},
    experience: {type: String, required: true},
    leaves: { type:mongoose.Types.ObjectId, ref: "Teacher-leave"}
});

const teacherLeaves = new Schema({
    teacher: {type: Schema.Types.ObjectId, ref: 'Teacher'},
    leaves: {type: String, required: true},
    date: {type: Date, required: true},
    status: {type: String, required: true},
    reason: {type: String, required: true},
    approved_by: {type: String, required: true},
    approved_date: {type: Date, required: true},
})

export const Teacher = model('Teacher', teacherSchema);
export const TeacherLeave = model('Teacher-leave', teacherLeaves)