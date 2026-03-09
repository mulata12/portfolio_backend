import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Security headers
  app.use(helmet());

  // CORS for frontend later
  app.enableCors({
    origin: '*', // Later restrict to your frontend domain
    credentials: true,
  });

  // API prefix
  app.setGlobalPrefix('api');

  // Global validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useStaticAssets(join(__dirname, "..", "uploads"), {
    prefix: "/uploads/",
  });
  const port = process.env.PORT || 8000;
  await app.listen(port);
  app.enableCors({
    origin: "http://localhost:3000",
  });

  console.log(`🚀 Server running on http://localhost:${port}/api`);
}
bootstrap();
