import { BookmarkData, BookmarkImgData } from "./bookmark";

export type ErrorReturnType = string | null;

export interface StorageBMReturnType {
  error: ErrorReturnType;
  data: Array<BookmarkData> | null;
}

export interface StorageImgReturnType {
  error: ErrorReturnType;
  data: Array<BookmarkImgData> | null;
}