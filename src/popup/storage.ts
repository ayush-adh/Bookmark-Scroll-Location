import { BookmarkData, BookmarkImgData } from "types/bookmark";
import {
  ErrorReturnType,
  StorageBMReturnType,
  StorageImgReturnType
} from "types/storage";
import { BOOKMARK_STORAGE_VAR, BOOKMARK_STORAGE_IMGS_VAR } from "../constants";

export async function addBookmark(bm: BookmarkData): Promise<ErrorReturnType> {
  try {
    const result = await browser.storage.local.get(BOOKMARK_STORAGE_VAR);
    let bookmarks: Array<BookmarkData> = [];
    if (result && result[BOOKMARK_STORAGE_VAR] !== undefined) {
      bookmarks = result[BOOKMARK_STORAGE_VAR];
    }
    await browser.storage.local.set({
      [BOOKMARK_STORAGE_VAR]: [...bookmarks, bm]
    });
    return null;
  } catch (error) {
    return error as ErrorReturnType;
  }
}

export async function removeBookmark(bmID: string): Promise<ErrorReturnType> {
  try {
    const result = await browser.storage.local.get(BOOKMARK_STORAGE_VAR);
    let bookmarks: Array<BookmarkData> = [];
    if (result && result[BOOKMARK_STORAGE_VAR] !== undefined) {
      bookmarks = result[BOOKMARK_STORAGE_VAR];
    }
    const filteredBookmarks = bookmarks.filter((bm) => bm.id !== bmID);
    await browser.storage.local.set({
      [BOOKMARK_STORAGE_VAR]: filteredBookmarks
    });
    return null;
  } catch (error) {
    return error as ErrorReturnType;
  }
}

export async function editBookmark(
  bmID: string,
  newData: Partial<BookmarkData>
): Promise<ErrorReturnType> {
  try {
    const result = await browser.storage.local.get(BOOKMARK_STORAGE_VAR);
    let bookmarks: Array<BookmarkData> = [];
    if (result && result[BOOKMARK_STORAGE_VAR] !== undefined) {
      bookmarks = result[BOOKMARK_STORAGE_VAR];
    }
    const updatedBookmarks = bookmarks.map((bm) => {
      if (bm.id === bmID) {
        return { ...bm, ...newData };
      }
      return bm;
    });
    await browser.storage.local.set({
      [BOOKMARK_STORAGE_VAR]: updatedBookmarks
    });
    return null;
  } catch (error) {
    return error as ErrorReturnType;
  }
}

export async function getBookmarks(): Promise<StorageBMReturnType> {
  try {
    const result = await browser.storage.local.get(BOOKMARK_STORAGE_VAR);
    if (!result || result[BOOKMARK_STORAGE_VAR] === undefined)
      browser.storage.local.set({ BOOKMARK_STORAGE_VAR: [] });
    return { error: null, data: [] } as StorageBMReturnType;
  } catch (error) {
    return { error, data: null } as StorageBMReturnType;
  }
}

export async function addBookmarkImg(
  data: BookmarkImgData
): Promise<ErrorReturnType> {
  try {
    const result = await browser.storage.local.get(BOOKMARK_STORAGE_IMGS_VAR);
    let bookmarkImgs: Array<BookmarkImgData> = [];
    if (result && result[BOOKMARK_STORAGE_IMGS_VAR] !== undefined) {
      bookmarkImgs = result[BOOKMARK_STORAGE_IMGS_VAR];
    }
    await browser.storage.local.set({
      [BOOKMARK_STORAGE_IMGS_VAR]: [...bookmarkImgs, data]
    });
    return null;
  } catch (error) {
    return error as ErrorReturnType;
  }
}

export async function removeBookmarkImg(
  imgID: string
): Promise<ErrorReturnType> {
  try {
    const result = await browser.storage.local.get(BOOKMARK_STORAGE_IMGS_VAR);
    let bookmarkImgs: Array<BookmarkImgData> = [];
    if (result && result[BOOKMARK_STORAGE_IMGS_VAR] !== undefined) {
      bookmarkImgs = result[BOOKMARK_STORAGE_IMGS_VAR];
    }
    const filteredBookmarks = bookmarkImgs.filter((img) => img.id !== imgID);
    await browser.storage.local.set({
      [BOOKMARK_STORAGE_IMGS_VAR]: filteredBookmarks
    });
    return null;
  } catch (error) {
    return error as ErrorReturnType;
  }
}

export async function editBookmarkImage(
  bmID: string,
  newData: Partial<BookmarkImgData>
): Promise<ErrorReturnType> {
  try {
    const result = await browser.storage.local.get(BOOKMARK_STORAGE_IMGS_VAR);
    let bookmarkImgs: Array<BookmarkImgData> = [];
    if (result && result[BOOKMARK_STORAGE_IMGS_VAR] !== undefined) {
      bookmarkImgs = result[BOOKMARK_STORAGE_IMGS_VAR];
    }
    const updatedBookmarkImgs = bookmarkImgs.map((img) => {
      if (img.id === bmID) {
        return { ...img, ...newData };
      }
      return img;
    });
    await browser.storage.local.set({
      [BOOKMARK_STORAGE_IMGS_VAR]: updatedBookmarkImgs
    });
    return null;
  } catch (error) {
    return error as ErrorReturnType;
  }
}

export async function getBookmarkImgs(): Promise<StorageImgReturnType> {
  try {
    const result = await browser.storage.local.get(BOOKMARK_STORAGE_IMGS_VAR);
    if (!result || result[BOOKMARK_STORAGE_IMGS_VAR] === undefined)
      browser.storage.local.set({ BOOKMARK_STORAGE_IMGS_VAR: [] });
    return { error: null, data: [] } as StorageImgReturnType;
  } catch (error) {
    return { error, data: null } as StorageImgReturnType;
  }
}

export async function syncStorage() {
  const localBookmarks = await getBookmarks();
  const localBookmarkImgs = await getBookmarkImgs();
  await browser.storage.sync.set({
    [BOOKMARK_STORAGE_VAR]: localBookmarks.data || [],
    [BOOKMARK_STORAGE_IMGS_VAR]: localBookmarkImgs.data || []
  });
}
