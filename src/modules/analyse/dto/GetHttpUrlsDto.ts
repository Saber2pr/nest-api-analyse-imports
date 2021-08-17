import { ApiProperty } from '@nestjs/swagger';

export class GetHttpUrlsDto {
  @ApiProperty({ required: true, description: '源代码tarball地址' })
  readonly url: string;

  @ApiProperty({ description: '过滤条件' })
  readonly filter: string;

  @ApiProperty({ description: '渲染格式' })
  readonly render: 'html' | 'json' = 'json';
}
