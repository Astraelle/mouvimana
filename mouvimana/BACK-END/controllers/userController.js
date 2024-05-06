import User from "../models/userData.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from '../config/config.js';

export const signUp = async (req, res) =>{
    try {
        const pwdHash = await bcrypt.hash(req.body.password, 10)
        const newUser = await User.create({
            ...req.body,
            password: pwdHash
        });
        res.status(201).json({message: "L'utilisateur à bien été créé", newUser})
    } catch (error) {
        res.status(500).json({message: "L'email utilisé exite déjà. Veuillez rentrer un autre email"})
    }
}

export const signIn = async (req, res) =>{
    try {
        const user = await User.findOne({email: req.body.email});
        !user && res.status(404).json("Utilisateur non trouvé");
        const passwordCompare = await bcrypt.compare(req.body.password, user.password)

        if (!passwordCompare) {
            return res.status(400).json("Les identifiants ne sont pas valides !")
        }
        const { password, ...others } = user._doc
        if (others.role === 1) {
            const adminToken = jwt.sign(
                {id: user._id},
                env.adminToken,
                {expiresIn: "2h"}
            )
            res.json({adminToken, others})
        }else{
            const token = jwt.sign(
                {id: user._id},
                env.token,
                {expiresIn: "2h"}
            )
            res.json({token, others});
        }
    } catch (error) {
        console.error(error);
    }
}

export const getUser = async(req, res)=>{
    try {
        const userData = await User.find();
        res.status(200).json(userData);
    } catch (error) {
        console.log(error);
    }
}