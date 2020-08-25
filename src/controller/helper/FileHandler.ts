import { promises as fs, PathLike } from 'fs'; 
import { FileHandle } from 'fs/promises';
import { BaseEncodingOptions, Mode, OpenMode, Stats, WriteVResult, ReadVResult } from 'fs';

export class FileHandler {
    private _path: PathLike;
    private fileHandle: FileHandle;
    
    get fd(): number {
        return this.fileHandle.fd;
    }

    get path(): PathLike {
        return this._path;
    }

    public static async open(path: PathLike, flags: string | number, mode?: string | number): Promise<FileHandler> {
        return new FileHandler(path, await fs.open(path, flags, mode));
    }

    private constructor(path: PathLike, fileHandle: FileHandle) {
        this._path = path;
        this.fileHandle = fileHandle;
    }

    public appendFile(data: string | Uint8Array, options?: BaseEncodingOptions & { mode?: Mode, flag?: OpenMode } | BufferEncoding | null): Promise<void> {
        return this.fileHandle.appendFile(data, options);
    }

    public chown(uid: number, gid: number): Promise<void> {
        return this.fileHandle.chown(uid, gid);
    }

    public chmod(mode: Mode): Promise<void> {
        return this.fileHandle.chmod(mode);
    }

    public datasync(): Promise<void> {
        return this.fileHandle.datasync();
    }

    public sync(): Promise<void> {
        return this.fileHandle.sync();
    }

    public read<TBuffer extends Uint8Array>(buffer: TBuffer, offset?: number | null, length?: number | null, position?: number | null): Promise<{ bytesRead: number, buffer: TBuffer }> {
        return this.fileHandle.read(buffer, offset, length, position);
    }

    public readFile(options?: { encoding?: null, flag?: OpenMode } | null): Promise<Buffer>;
    public readFile(options: { encoding: BufferEncoding, flag?: OpenMode } | BufferEncoding): Promise<string>;
    public readFile(options?: BaseEncodingOptions & { flag?: OpenMode } | BufferEncoding | null): Promise<string | Buffer> {
        return this.fileHandle.readFile(options);
    }

    public stat(): Promise<Stats> {
        return this.fileHandle.stat();
    }

    public truncate(len?: number): Promise<void> {
        return this.fileHandle.truncate(len);
    }

    public utimes(atime: string | number | Date, mtime: string | number | Date): Promise<void> {
        return this.fileHandle.utimes(atime, mtime);
    }

    public write(data: string | Uint8Array, position?: number | null, encoding?: BufferEncoding | null): Promise<{ bytesWritten: number, buffer: string }> {
        return this.fileHandle.write(data, position, encoding);
    }

    public writeFile(data: string | Uint8Array, options?: BaseEncodingOptions & { mode?: Mode, flag?: OpenMode } | BufferEncoding | null): Promise<void> {
        return this.fileHandle.writeFile(data, options);
    }

    public writev(buffers: NodeJS.ArrayBufferView[], position?: number): Promise<WriteVResult> {
        return this.fileHandle.writev(buffers, position);
    }

    public readv(buffers: NodeJS.ArrayBufferView[], position?: number): Promise<ReadVResult> {
        return this.fileHandle.readv(buffers, position);
    }

    public close(): Promise<void> {
        return this.fileHandle.close();
    }
}
