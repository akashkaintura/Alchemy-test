import { Injectable, Logger } from '@nestjs/common';
import { createReadStream, createWriteStream } from 'fs';

@Injectable()
export class SortService {
  private readonly logger = new Logger(SortService.name);

  private chunkSize = 10000000; // 10 MB

  async sortFile(filePath: string): Promise<void> {
    const chunkCount = Math.ceil((10 * 1024 * 1024 * 1024) / this.chunkSize);
    const chunks = [];

    // Read and sort chunks of data
    for (let i = 0; i < chunkCount; i++) {
      const chunkStart = i * this.chunkSize;
      const chunk = await this.readChunk(filePath, chunkStart, this.chunkSize);
      chunks.push(chunk.sort((a, b) => a - b));
    }

    // Merge and write sorted data to disk
    const sortedFile = createWriteStream('sorted.dat');
    while (chunks.length > 0) {
      let minValue = Number.MAX_SAFE_INTEGER;
      let minChunk = -1;

      // Find chunk with minimum first element
      for (let i = 0; i < chunks.length; i++) {
        if (chunks[i][0] < minValue) {
          minValue = chunks[i][0];
          minChunk = i;
        }
      }

      // Write minimum value to output file
      await new Promise<void>((resolve, reject) => {
        sortedFile.write(`${minValue}\n`, (err) => {
          if (err) reject(err);
          else resolve();
        });
      });

      // Remove first element from selected chunk
      chunks[minChunk].shift();

      // If chunk is empty, remove it
      if (chunks[minChunk].length === 0) {
        chunks.splice(minChunk, 1);
      }
    }

    // Close output file
    sortedFile.end();
  }

  async readChunk(
    filePath: string,
    start: number,
    size: number,
  ): Promise<number[]> {
    return new Promise<number[]>(async (resolve, reject) => {
      const chunk: number[] = [];
      const stream = createReadStream(filePath, { start, end: start + size });
      stream.on('data', (data) => {
        const values = data.toString().split('\n');
        chunk.push(...values.map((val) => parseInt(val, 10)));
      });
      stream.on('end', () => resolve(chunk));
      stream.on('error', reject);
    });
  }
}
