import {
	Controller,
	Get,
	Body,
	Patch,
	Param,
	Delete,
	ParseIntPipe,
	NotFoundException,
	UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { ManageGuard } from './manage.guard';
import { AuthenticatedGuard } from 'src/auth/utils/authenticated.guard';
import { ContentTypeGuard } from './content-type.guard';

@Controller('users')
@ApiTags('users')
export class UsersController {
	constructor(private readonly users: UsersService) { }

	@Get()
	@UseGuards(AuthenticatedGuard)
	@ApiOkResponse({ type: UserEntity, isArray: true })
	findAll() {
		return this.users.findAllUsers();
	}

	@Get(':id')
	@UseGuards(AuthenticatedGuard)
	@ApiOkResponse({ type: UserEntity })
	async findOne(@Param('id', ParseIntPipe) id: number) {
		const user = await this.users.findOneUserById(id);
		if (!user)
			throw new NotFoundException(`User with id ${id} does not exist.`);
		return user;
	}

	@Patch(':id')
	@UseGuards(AuthenticatedGuard)
	@UseGuards(ManageGuard)
	@UseGuards(ContentTypeGuard)
	@ApiOkResponse({ type: UserEntity })
	update(
		@Param('id', ParseIntPipe) id: number,
		@Body() updateUserDto: UpdateUserDto,
	) {
		return this.users.updateUser(id, updateUserDto);
	}

	@Delete(':id')
	@UseGuards(AuthenticatedGuard)
	@UseGuards(ManageGuard)
	@UseGuards(ContentTypeGuard)
	@ApiOkResponse({ type: UserEntity })
	remove(@Param('id', ParseIntPipe) id: number) {
		return this.users.removeUser(id);
	}
}
