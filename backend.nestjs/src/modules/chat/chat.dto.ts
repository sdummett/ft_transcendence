import * as  Joi from 'joi';

export class CreateRoomDto {
	name: string;
	isPublic: boolean;
	password?: string;
}

export const CreateRoomSchema = Joi.object({
	name: Joi.string().min(1).max(32).required(),
	isPublic: Joi.boolean().required(),
	password: Joi.string().min(1).max(32).optional(),
});

export class LeaveRoomDto {
	name: string;
}

export const LeaveRoomSchema = Joi.object({
	name: Joi.string().min(1).max(32).required(),
});

export class JoinRoomDto {
	name: string;
	password?: string;
}

export const JoinRoomSchema = Joi.object({
	name: Joi.string().min(1).max(32).required(),
	password: Joi.string().min(1).max(32).optional(),
});

export class BanUserDto {
	name: string;
	userId: number;
}

export const BanUserSchema = Joi.object({
	name: Joi.string().min(1).max(32).required(),
	userId: Joi.number().required(),
});

export class MuteUserDto {
	name: string;
	userId: number;
}

export const MuteUserSchema = Joi.object({
	name: Joi.string().min(1).max(32).required(),
	userId: Joi.number().required(),
});

export class InviteUserDto {
	name: string;
	userId: number;
}

export const InviteUserSchema = Joi.object({
	name: Joi.string().min(1).max(32).required(),
	userId: Joi.number().required(),
});