import authService from '../services/authService';

const createUser = async (req, res, next) => {
  const userData = req.body;
  try {
    const user = await authService.createUser(userData);
    res.status(201).json({ message: '유저 생성', user });
  } catch (error) {
    console.error(error);
    error.status = 500;
    next(error);
  }
};

const login = async (req, res, next) => {
    const userData = req.body;
    try {
        const user = await authService.login(userData);
        res.status(201).json({ message: '로그인', user});
    } catch(error){
        console.error(error);
        error.status = 500;
        next(error);
    }
}

module.exports = { createUser };