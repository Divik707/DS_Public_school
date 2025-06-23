import { model, Schema } from "mongoose";

const admin = new Schema({
    name: { type: String, required: true },
    password: {type: String, required: true}
})

const adminMessages = new Schema({
    message: { type: String, required: true },
    sender: { type: Schema.Types.ObjectId, ref: 'admin', required: true }
})

export const Admin = model('Admin', admin);
export const AdminMessages = model('Admin-Messages', adminMessages)
