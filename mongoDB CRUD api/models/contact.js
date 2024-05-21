import mongoose from "mongoose";
import Schema from "mongoose";

const contactSchema = Schema.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"],
        trim: true,
        minlength: 3,
        maxlength: 20,
        validate:{
            validator: (v) =>{
              const nameRegex = /^[a-zA-Z\s]*$/;  
              return nameRegex.test(v);
            },
            message: "First name must contain only alphabetic characters"
        }

    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
        trim:true,
        minlength: 3,
        maxlength: 20,
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        trim: true,
        unique: true
    },
    age:{
        type: Number,
        required: false
    }
});

const contact = mongoose.model('contact', contactSchema);
export default contact;