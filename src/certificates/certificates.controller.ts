import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

import { CertificatesService } from './certificates.service';
import { AdminGuard } from '../auth/admin.guard';
import { CreateCertificateDto } from './dto/create-certificate.dto';

@Controller()
export class CertificatesController {
  constructor(private readonly service: CertificatesService) { }

  // 🌍 Public endpoint
  @Get('certificates')
  getAll() {
    return this.service.findAll();
  }

  // 🔐 Admin create certificate
  // @UseGuards(AdminGuard)
  // @Post('admin/certificates')
  // create(@Body() body: CreateCertificateDto) {
  //   return this.service.create(body);
  // }

  // ADMIN UPLOAD
  @UseGuards(AdminGuard)
  @Post("admin/certificates")
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./uploads/certificates",
        filename: (req, file, cb) => {

          const unique =
            Date.now() + "-" + Math.round(Math.random() * 1e9);

          cb(null, unique + extname(file.originalname));
        },
      }),
    }),
  )
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() body,
  ) {

    return this.service.create({
      ...body,
      file: file ? `/uploads/certificates/${file.filename}` : null,
    });

  }

  // 🔐 Admin delete certificate
  @UseGuards(AdminGuard)
  @Delete('admin/certificates/:id')
  remove(@Param('id') id: number) {
    return this.service.remove(+id);
  }
}