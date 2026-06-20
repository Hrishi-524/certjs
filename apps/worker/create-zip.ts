import { ZipArchive } from "archiver";
import { PassThrough } from "stream";

export async function createZip(
    files: {
        name: string;
        buffer: Buffer;
    }[]
) {
    return new Promise<Buffer>((resolve, reject) => {

        const archive = new ZipArchive({ zlib: { level: 9 } }); // compression level

        const stream = new PassThrough();

        const chunks: Buffer[] = [];

        stream.on("data", chunk => {
            chunks.push(chunk);
        });

        stream.on("end", () => {
            resolve(Buffer.concat(chunks));
        });

        archive.on("error", reject);

        archive.pipe(stream);

        for (const file of files) {
            archive.append(
                file.buffer,
                {
                    name: file.name
                }
            );
        }

        archive.finalize();
    });
}