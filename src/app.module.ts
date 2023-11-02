import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TutorsController } from './tutors/tutors.controller';
import { ApplyController } from './apply/apply.controller';
import { StudentsController } from './students/students.controller';
import { FavouriteController } from './favourite/favourite.controller';
import { FavouriteService } from './favourite/favourite.service';
import {StudentsService} from './students/students.service';
import {TutorService} from './tutors/tutors.service';
import {ApplyService} from './apply/apply.service';
import {AuthService} from './auth/auth.service';
import { PasswordForgetController } from './password-forget/password-forget.controller';
import { PasswordResetController } from './password-reset/password-reset.controller';
import { HistoryController } from './history/history.controller';
import { ProfileController } from './profile/profile.controller';
import { MatchController } from './match/match.controller';
import { AdminController } from './admin/admin.controller';
// import { ResultController } from './result/result.controller';
import { HistoryService } from './history/history.service';
import { ProfileService } from './profile/profile.service';
import { MatchService } from './match/match.service';
import { AdminService } from './admin/admin.service';
// import { ResultService } from './result/result.service';
import { PasswordForgetService } from './password-forget/password-forget.service';
import{ PasswordResetService } from './password-reset/password-reset.service';
import { PrismaService } from './prisma/prisma.service';
@Module({
  imports: [
    JwtModule.register({
      secret: 'your-secret-key', // Replace with your actual secret key
      signOptions: { expiresIn: '1h' }, // Optional: Set token expiration
    }),],
  controllers: [AppController, AuthController, TutorsController, ApplyController, StudentsController, FavouriteController, PasswordForgetController, PasswordResetController, HistoryController, ProfileController, MatchController, AdminController, 
    // ResultController
  ],
  providers: [PrismaService,AppService,FavouriteService,StudentsService,TutorService,ApplyService,AuthService, HistoryService, ProfileService, MatchService, AdminService, PasswordForgetService,PasswordResetService,
    // ResultService
  ],
})
export class AppModule {}
