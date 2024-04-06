import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { CreateUserReqDto } from './dto/createUserReq.dto';
import { UpdatePasswordReqDto } from './dto/updatePasswordReq.dto';
import { UpdateUserReqDto } from './dto/updateUserReq.dto';

/** @description 유저 생성 */
export class AuthService {
  constructor(private prismaClient: PrismaClient) {}

  async createUser(userData: CreateUserReqDto) {
    const { name, nickname, email, password } = userData;
    const existingUser = await this.prismaClient.user.findUnique({
      where: {
        email,
      },
    });
    const existingNickname = await this.prismaClient.user.findUnique({
      where: {
        nickname,
      },
    });
    if (existingUser) throw new Error('이미 존재하는 이메일입니다.');
    if (existingNickname) throw new Error('이미 존재하는 닉네임입니다.');

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      name,
      nickname,
      email,
      password: hashedPassword,
    };

    return this.prismaClient.user.create({
      data: newUser,
    });
  }

  async getUserByEmail(email: string) {
    this.prismaClient.user.findUnique({
      where: {
        email,
      },
    });
  }

  async updatePasswordTokenByEmail(email: string, token: string) {
    this.prismaClient.user.update({
      where: {
        email,
      },
      data: {
        passwordToken: token,
      },
    });
  }
  async updatePasswordValidByEmail(email: string) {
    this.prismaClient.user.update({
      where: {
        email,
      },
      data: {
        passwordValid: new Date(),
      },
    });
  }

  async changePassword(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.prismaClient.user.update({
      where: {
        email,
      },
      data: {
        password: hashedPassword,
      },
    });
  }

  async changePasswordByCheckOriginPassword(
    passwordData: UpdatePasswordReqDto,
  ) {
    const { id, password, newPassword } = passwordData;
    const passwordUser = await this.prismaClient.user.findUnique({
      where: {
        id,
      },
    });
    const isPasswordMatch = bcrypt.compare(password, passwordUser.password);

    if (!isPasswordMatch) {
      throw new Error('비밀번호가 틀렸습니다. 다시 입력해주세요');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    return this.prismaClient.user.update({
      where: {
        id,
      },
      data: {
        password: hashedPassword,
      },
    });
  }

  async getUserByPasswordToken(passwordToken: string) {
    this.prismaClient.user.findUnique({
      where: {
        passwordToken,
      },
    });
  }

  async changeInformation(user: UpdateUserReqDto) {
    const { id, name, nickname, about, activity, password } = user;
    const passwordUser = await this.prismaClient.user.findUnique({
      where: {
        id,
      },
    });
    if (!passwordUser) throw new Error('존재하지 않는 사용자입니다.');

    const isPasswordMatch = bcrypt.compare(password, passwordUser.password);

    if (!isPasswordMatch) {
      throw new Error('비밀번호가 틀렸습니다. 다시 입력해주세요');
    }

    return this.prismaClient.user.update({
      where: {
        id,
      },
      data: {
        name,
        nickname,
        about,
        activity,
      },
    });
  }

  async removeUser(id: string) {
    this.prismaClient.user.delete({
      where: {
        id,
      },
    });
  }

  async getGroupsByUserId(userId: string) {
    const user = await this.prismaClient.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        groups: true,
      },
    });
    return user.groups.map((group: any) => group.groupId);
  }

  async getFriendIdsByUserId(userId: string) {
    const user = await this.prismaClient.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        friendshipsA: {
          where: {
            isAccepted: true,
          },
          select: {
            userB: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    });

    return user.friendshipsA.map((friendship: any) => friendship.userB.id);
  }
}
