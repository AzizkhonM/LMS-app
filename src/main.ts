import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from "cookie-parser"

const start = async () => {
  try {
    const app = await NestFactory.create(AppModule)
    const PORT = process.env.PORT || 3020
    app.setGlobalPrefix("api")

    app.useGlobalPipes(new ValidationPipe())

    const config = new DocumentBuilder()
      .setTitle("MyTicket Project")
      .setDescription("Project MyTicket")
      .setVersion("1.0.0")
      .addTag("NodeJS, NestJS, Postgres, Sequelize")
      .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup("/api/docs", app, document)

    app.use(cookieParser)

    app.listen(PORT, () => {
      console.log("Server", PORT, "- portda");
    })
  } catch (error) {
    console.log(error);
  }
}

start()