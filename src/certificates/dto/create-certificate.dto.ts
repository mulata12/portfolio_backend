import { IsString, IsOptional, IsUrl } from 'class-validator';

export class CreateCertificateDto {


    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    issuer?: string;

    @IsOptional()
    @IsUrl()
    link?: string;

    @IsOptional()
    @IsString()
    file?: string;

}