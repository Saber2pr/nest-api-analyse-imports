import { Controller, Inject } from '@nestjs/common';

import { DownloadService } from './download.service';

@Controller('api/download')
export class DownloadController {
  constructor(
    @Inject(DownloadService) private readonly downloadService: DownloadService,
  ) {}
}
