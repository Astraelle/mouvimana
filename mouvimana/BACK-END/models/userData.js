import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const userSchema = mongoose.Schema(
    {
        username: { type: String, require: true },
        password: { type: String, require: true },
        email: { type: String, require: true, unique: true },
        role: { type: Number, require: true, default: 0},
    },
    { timestamps: { createdAt: true }}
);

userSchema.plugin(mongooseUniqueValidator);

export default mongoose.model("User", userSchema);