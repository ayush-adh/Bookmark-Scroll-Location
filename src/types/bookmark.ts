export interface BookmarkData {
  id: string;
  name: string;
  date: Date;
  imgName: string;
  uri: string;
}

export interface BookmarkImgData {
  id: string;
  name: string;
  date: string;
  imgData: Blob;
}
