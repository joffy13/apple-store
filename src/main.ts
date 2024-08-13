import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './lib/filters/all-exception.filter';
import { ResponseInterceptor } from './lib/interceptors/response.interceptor';
import { CustomValidationPipe } from './lib/pipes/custom-validation.pipe';

async function bootstrap() {
    try {
        const app = await NestFactory.create(AppModule, {});
        app.enableCors({ origin: '*' });
        const configService = app.get(ConfigService);
        const port = configService.get('APP_PORT', 8000);
        const config = new DocumentBuilder()
            .setTitle('Apple backend')
            .setVersion('1.0')
            .addBearerAuth()
            .build()

        const document = SwaggerModule.createDocument(app, config);
        app.useGlobalFilters(new AllExceptionsFilter());
        app.useGlobalInterceptors(new ResponseInterceptor());
        // app.useGlobalPipes(
        //     new ValidationPipe({
        //         transform: true,
        //     }),
        // );
        app.useGlobalPipes(
            new CustomValidationPipe()
        )
        SwaggerModule.setup('api', app, document);

        await app.listen(port);
        Logger.log(`Backend started at port: ${port}`);
    } catch (err) {
        Logger.error(`Starting Backend error: ${err}`);
    }
}
bootstrap();
