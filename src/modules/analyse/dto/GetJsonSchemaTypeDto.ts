import { ApiProperty } from '@nestjs/swagger';

export class GetJsonSchemaTypeDto {
  @ApiProperty({
    description: 'json',
    required: true,
  })
  json: string;
}
