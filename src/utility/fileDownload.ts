import { FileDownloadType } from '../types/utility';

export default function fileDownload(file: FileDownloadType): void {
  const { data, filename, mimeType, bom } = file;
  const blobData = (typeof bom !== 'undefined') ? [bom, data] : [data];
  const blob = new Blob(blobData as BlobPart[], { type: mimeType || 'application/octet-stream' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 200);
}