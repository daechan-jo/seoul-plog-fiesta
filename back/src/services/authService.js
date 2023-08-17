const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const createUser = async (userData) => {
  const { name, nickname, email, password } = userData;
  const hashedPassword = await bcrypt.hash(password,10);
  try {
    return await prisma.user.create({
        data: {
            name,
            nickname,
            email,
            password: hashedPassword,
        }
    }) 
}catch (error) {
        throw error;
    }
};

const login = async(userData) => {
    const { email, password } = userData;
    
    try{
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new Error('User not found');
        } //추후 미들웨어로 빼기
    
        const passwordMatch = await bcrypt.compare(password, user.password);
    
        if (!passwordMatch) {
            throw new Error('Invalid password');
        } //추후 미들웨어로 빼기

        //const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return token;
    } catch (error) {
        throw error;
    }
  };

module.exports = { createUser, login };
