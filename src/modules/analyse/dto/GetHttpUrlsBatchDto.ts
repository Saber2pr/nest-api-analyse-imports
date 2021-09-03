import { ApiProperty } from '@nestjs/swagger';

export class GetHttpUrlsBatchDto {
  @ApiProperty({
    required: true,
    description: '源代码tarball地址列表',
  })
  readonly urls: string[];

  @ApiProperty({ description: '过滤条件', required: false })
  readonly filter?: string;
}
