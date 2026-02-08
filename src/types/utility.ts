export interface FileDownloadType {
  data: string | ArrayBuffer | ArrayBufferView | Blob;
  filename: string;
  mimeType?: string;
  bom?: string;
}
