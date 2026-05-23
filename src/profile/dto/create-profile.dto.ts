import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateProfileDto {
    @IsString({message: 'Username must be a string'})
    @IsNotEmpty()
    username!: string;

    @IsString({message: 'Bio must be a string'})
    @IsNotEmpty()
    bio!: string;

    @IsString({message: 'Avatar URL must be a string'})
    @IsNotEmpty()
    avatarUrl!: string;

    @IsString({message: 'Account type must be a string'})
    @IsNotEmpty()
    accountType!: string;

    @IsString({message: 'User ID must be a string'})
    @IsNotEmpty()
    userId!: string;
}
