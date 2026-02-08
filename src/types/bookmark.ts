export type CurrentViewAllowedValues = "bm-home" | "bm-edit" | "bm-imgs" | "bm-import";

export interface BMDataImgMetadata {
  name: string;
  color: string;
  width: number;
  height: number;
  angle: number;
}

export interface BookmarkData {
  id: string;
  name: string;
  lastUpdatedDate: number;
  createdDate: number;
  imgData: BMDataImgMetadata;
  url: string;
}

export interface BookmarkImgData {
  id: string;
  name: string;
  createdDate: number;
  lastUpdatedDate: number;
  imgData: string;
}
