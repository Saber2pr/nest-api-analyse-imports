import { Injectable } from '@nestjs/common';

import { splitArray } from '../../utils/array';

@Injectable()
export class TaskQueueService {
  /**
   * 限制同时IO数量最多10个
   */
  async run<T, R>(values: T[], callback: (value: T) => Promise<R>) {
    const queues = splitArray(values, 10);
    const result: R[] = [];
    for (const queue of queues) {
      const ret = await Promise.all(queue.map(callback));
      result.push(...ret);
    }
    return result;
  }
}
