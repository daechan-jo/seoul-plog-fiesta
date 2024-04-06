import { PrismaClient } from '@prisma/client';
import { CreateUserReqDto } from './dto/createUserReq.dto';
import { UpdateUserReqDto } from './dto/updateUserReq.dto';

export class AuthRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findUserByID(userID: string) {
    return await this.prisma.user.findUnique({
      where: {
        userID,
      },
    });
  }

  async findUserByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findUserByNickname(nickname: string) {
    return await this.prisma.user.findUnique({
      where: {
        nickname,
      },
    });
  }

  async findUserByPasswordToken(passwordToken: string) {
    return this.prisma.user.findUnique({
      where: {
        passwordToken,
      },
    });
  }

  async createUser(userData: CreateUserReqDto) {
    return await this.prisma.user.create({
      data: userData,
    });
  }

  async updatePasswordTokenByEmail(email: string, token: string) {
    return this.prisma.user.update({
      where: {
        email,
      },
      data: {
        passwordToken: token,
      },
    });
  }

  async updatePasswordValidByEmail(email: string) {
    return this.prisma.user.update({
      where: {
        email,
      },
      data: {
        passwordValid: new Date(),
      },
    });
  }

  async changePasswordByEmail(email: string, newPassword: string) {
    return this.prisma.user.update({
      where: {
        email,
      },
      data: {
        password: newPassword,
      },
    });
  }

  async changePasswordByID(id: string, newPassword: string) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        password: newPassword,
      },
    });
  }

  async updateUserByID(user: UpdateUserReqDto) {
    return this.prisma.user.update({
      data: {
        user,
      },
    });
  }

  async deleteUserByID(id: string) {
    return this.prisma.delete({
      where: {
        id,
      },
    });
  }

  async findGroupsByUserID(id: string) {
    return this.prisma.findUnique({
      where: {
        id,
      },
      include: {
        groups: true,
      },
    });
  }

  async findFriendIDByUserID(id: string) {
    return this.prisma.findUnique({
      where: {
        id,
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
  }
}
