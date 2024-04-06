import bcrypt from 'bcrypt';
import { CreateUserReqDto } from './dto/createUserReq.dto';
import { UpdateUserReqDto } from './dto/updateUserReq.dto';
import { AuthRepository } from './auth.repository';

export class AuthService {
  constructor(private authRepository: AuthRepository) {}

  async createUser(userData: CreateUserReqDto) {
    const existingUser = await this.authRepository.findUserByEmail(
      userData.email,
    );
    const existingNickname = await this.authRepository.findUserByNickname(
      userData.nickname,
    );
    if (existingUser) throw new Error('이미 존재하는 이메일입니다.');
    if (existingNickname) throw new Error('이미 존재하는 닉네임입니다.');

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser: CreateUserReqDto = {
      ...userData,
      password: hashedPassword,
    };

    return this.authRepository.createUser(newUser);
  }

  async getUserByEmail(email: string) {
    return this.authRepository.findUserByEmail(email);
  }

  async updatePasswordTokenByEmail(email: string, token: string) {
    return this.authRepository.updatePasswordTokenByEmail(email, token);
  }

  async updatePasswordValidByEmail(email: string) {
    return this.authRepository.updatePasswordValidByEmail(email);
  }

  async unLoginUpdatePassword(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.authRepository.changePasswordByEmail(email, hashedPassword);
  }

  async loginChangePassword(
    userID: string,
    password: string,
    newPassword: string,
  ) {
    const passwordUser = await this.authRepository.findUserByID(userID);
    const isPasswordMatch = bcrypt.compare(password, passwordUser.password);

    if (!isPasswordMatch) {
      throw new Error('비밀번호가 틀렸습니다. 다시 입력해주세요');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    return this.authRepository.changePasswordByID(userID, hashedPassword);
  }

  async getUserByPasswordToken(passwordToken: string) {
    return this.authRepository.findUserByPasswordToken(passwordToken);
  }

  async changeInformation(user: UpdateUserReqDto) {
    const passwordUser = await this.authRepository.findUserByID(user.id);
    if (!passwordUser) throw new Error('존재하지 않는 사용자입니다.');

    const isPasswordMatch = bcrypt.compare(
      user.password,
      passwordUser.password,
    );

    if (!isPasswordMatch) {
      throw new Error('비밀번호가 틀렸습니다. 다시 입력해주세요');
    }

    return this.authRepository.updateUserByID(user);
  }

  async removeUser(id: string) {
    return this.authRepository.deleteUserByID(id);
  }

  async getGroupsByUserId(userID: string) {
    const user = await this.authRepository.findGroupsByUserID(userID);
    return user.groups.map((group: any) => group.groupId);
  }

  async getFriendIdsByUserId(userID: string) {
    const user = await this.authRepository.findFriendIDByUserID(userID);

    return user.friendshipsA.map((friendship: any) => friendship.userB.id);
  }
}
