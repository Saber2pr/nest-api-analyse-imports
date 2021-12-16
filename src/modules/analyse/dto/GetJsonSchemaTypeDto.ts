import { ApiProperty } from '@nestjs/swagger';

export class GetJsonSchemaTypeDto {
  @ApiProperty({
    description: 'name',
    required: true,
  })
  name: string;

  @ApiProperty({
    description: 'json',
    required: true,
  })
  json: string;
}
