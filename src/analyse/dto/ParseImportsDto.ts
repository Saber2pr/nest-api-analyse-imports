import { ApiProperty } from '@nestjs/swagger';

export class ParseImportsDto {
  @ApiProperty({ required: true, description: '源代码tarball地址' })
  readonly url: string;
}
