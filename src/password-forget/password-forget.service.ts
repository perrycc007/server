import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt'; // Assuming you have JWT module set up

@Injectable()
export class PasswordForgetService {
  bcrypt: any;
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async sendResetLink(email: string) {
    // Implement logic to send a password reset link to the user's email
    // Generate and send the token with the reset link
    const result = await this.prisma.user.findFirst({
      where: {
        email: email,
        // password:password
      },
    });
    console.log(result);
    if (result != null) {
      console.log(result.userid);
      const secret = process.env.RESET_PASSWORD_SECRET + result.password;
      const payload = {
        email: email,
        userid: result.userid,
      };
      const token = this.jwt.sign(payload,  { secret,expiresIn: "15m" });
  
      const link = `http://localhost:3000/resetPassword/${result.userid}/${token}`;
      // sendResetPasswordEmail(email, link)
      console.log(link);
      return("reset link is sent");
    } else {
      return ("user not found");
    }
  
  }

  async verifyToken(userid: string, token: string) {
    // Implement logic to verify the token and return the payload
  const result = await this.prisma.user.findFirst({
    where: {
      userid: parseInt(userid),
    },
  });
  if (result != null) {
    const secret = process.env.RESET_PASSWORD_SECRET + result.password;
    try {
      const payload = this.jwt.verify(token, { secret });
      return (payload);
    } catch (error) {
      return(error.message);
    }
  }
  }
  

  async resetPassword(userid: string, token: string, newPassword: string) {
    // Implement logic to reset the user's password based on the provided token and new password


    const salt = await this.bcrypt.genSalt(8);
    try {
      const encrypedPassword = await this.bcrypt.hash(newPassword, salt);
      const result = await this.prisma.user.findFirst({
        where: {
          userid: parseInt(userid),
        },
      });
      if (result != null) {
        const secret = process.env.RESET_PASSWORD_SECRET + result.password;
        try {
          const payload = this.jwt.verify(token, {secret});
          console.log(payload);
          if (userid == payload.userid) {
            const result = await this.prisma.user.update({
              where: {
                userid: parseInt(userid),
              },
              data: {
                password: encrypedPassword,
              },
            });
            return(result);
          }
        } catch (error) {
          return(error.message);
        }
      }
    } catch (error) {
      console.log(error.message);
      return(error.message);
    }
  }
  }
