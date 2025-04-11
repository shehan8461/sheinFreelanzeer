import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
    authId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    userId: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    user_email: {
        type: String,
        required: true,
        trim: true
    },
    contact: {
        type: String,
        required: true,
        trim: true
    },
    project_type: {
        type: String,
        required: true,
        trim: true
    },
    budget_range: {
        type: String,
        required: true,
        trim: true
    },
    project_timeline: {
        type: String,
        required: true,
        trim: true
    },
    preferred_communication_mode: {
        type: String,
        required: true,
        trim: true
    },
    project_details: {
        type: String,
        required: true,
        trim: true
    },
    profilePicture: {
        type: String,
        default: 'https://media.istockphoto.com/id/1294866141/vector/picture-reload.jpg?s=612x612&w=is&k=20&c=Ei6q4n6VkP3B0R30d1VdZ4i11CFbyaEoAFy6_WEbArE=',
    },
   
}, { timestamps: true });

const Requets = mongoose.model("Requets", requestSchema);

export default Requets;
