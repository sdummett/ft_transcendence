import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrismaModule } from 'nestjs-prisma';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { FriendsModule } from './modules/friends/friends.module';
import { ImagesModule } from './modules/images/images.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
	AuthModule, 
	PrismaModule,
	UsersModule,
	ImagesModule,
	FriendsModule,
	PassportModule.register({ session: true }),
	ThrottlerModule.forRoot({
		ttl: +process.env.THROTTLER_TTL,
		limit: +process.env.THROTTLE_LIMIT,
	}),
],
  providers: [AppService],
})
export class AppModule {}
