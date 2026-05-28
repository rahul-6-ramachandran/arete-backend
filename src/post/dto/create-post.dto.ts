import { IsNotEmpty, isNotEmpty, IsString } from "class-validator";

export class CreatePostDto {

    @IsNotEmpty({ message: "URL cannot be empty" })
    @IsString({ message: "Caption must be a string" })
    caption!: string

    @IsNotEmpty({ message: "UserId cannot be empty" })
    @IsString({ message: "UserId must be a string" })
    userId!: string

}
