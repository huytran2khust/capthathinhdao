import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CaptionModule } from './caption/caption.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot({ isGlobal: true })],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'mongodb',
          host: configService.get<string>('MONGODB_HOST'),
          username: configService.get<string>('MONGO_INITDB_ROOT_USERNAME'),
          password: configService.get<string>('MONGO_INITDB_ROOT_PASSWORD'),
          autoLoadEntities: true, //* TRY AUTO LOAD ENTITIES
          entities: [__dirname + '**/*/entities/*.entity{.js, .ts}'],
          migrations: ['src/db/migrations/*.js'],
          ssl: true,
          authSource: 'admin',
          // synchronize: true,
          cli: {
            migrationsDir: 'src/db/migrations',
          },
        };
      },
      inject: [ConfigService],
    }),
    CaptionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
