import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateMediaDto {
    
    @IsString()
    @IsNotEmpty()
    postId!: String

    @IsString()
    @IsNotEmpty()
    mimeType!: String

    @IsString()
    @IsOptional()
    url!: String

    @IsString()
    @IsOptional()
    key!: String

    @IsNotEmpty()
    size!: Number

    @IsString()
    @IsOptional()
    uploadedBy!: String
}
