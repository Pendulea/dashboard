export function myChunk<T>(array: T[], chunks: number): T[][] {
    if (chunks <= 0) return [];
    if (chunks === 1) return [array];
    if (chunks >= array.length) return array.map(item => [item]);

    const result: T[][] = [];
    let startIndex = 0;
    const baseChunkSize = Math.floor(array.length / chunks);
    let remainder = array.length % chunks; // Number of extra elements to distribute

    for (let i = 0; i < chunks; i++) {
        // Calculate current chunk size
        const currentChunkSize = baseChunkSize + (i >= chunks - remainder ? 1 : 0);
        result.push(array.slice(startIndex, startIndex + currentChunkSize));
        startIndex += currentChunkSize;
    }

    return result;
}