import {
  Controller,
  Delete,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { FileInterceptor } from '@nestjs/platform-express';
import JwtAuthenticationGuard from 'src/authentication/jwt-authentication.guard';
import RequestWithUser from 'src/authentication/requestWithUser.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('avatar')
  @UseGuards(JwtAuthenticationGuard)
  @UseInterceptors(FileInterceptor('file'))
  async addAvatar(
    @Req() request: RequestWithUser,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.usersService.addAvatar(
      request.user.id,
      file.buffer,
      file.originalname,
    );
  }

  @Delete('avatar')
  @UseGuards(JwtAuthenticationGuard)
  async deleteAvatar(@Req() request: RequestWithUser) {
    return this.usersService.deleteAvatar(request.user.id);
  }

  // @Post('files')
  // @UseGuards(JwtAuthenticationGuard)
  // @UseInterceptors(FileInterceptor('file'))
  // async addPrivateFile(
  //   @Req() request: RequestWithUser,
  //   @UploadedFile() file: Express.Multer.File,
  // ) {
  //   return this.usersService.addPrivateFile(
  //     request.user.id,
  //     file.buffer,
  //     file.originalname,
  //   );
  // }
}
