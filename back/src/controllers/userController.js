import db from "../models";

const User = db.users;

const addUser = async (req, res, next) => {
    try {
        const { name, email, password, provider, snsId } = req.body;
        const user = await User.create({
            name,
            email,
            password,
            provider,
            snsId,
        });
        res.status(201).json({ user });
    } catch (error) {
        next(error);
    }
};

module.exports = { addUser };
