import { BookmarkData, BookmarkImgData } from "@bm-types/bookmark";
import { BOOKMARK_STORAGE_VAR, BOOKMARK_STORAGE_IMGS_VAR } from "@utility/constants";
import BM_IMG_1 from "@assets/bm-style-1.svg?raw";
import BM_IMG_2 from "@assets/bm-style-2.svg?raw";
import BM_IMG_3 from "@assets/bm-style-3.svg?raw";
import BM_IMG_4 from "@assets/bm-style-4.svg?raw";

function toBase64Uri(rawSvg: string): string {
  const base64 = encodeURIComponent(rawSvg)
    .replace(/%0A/g, "")
    .replace(/%20/g, " ")
    .replace(/%3D/g, "=")
    .replace(/%3A/g, ":") 
    .replace(/%2F/g, "/");
  return `data:image/svg+xml;base64,${base64}`;
}

const runtime = chrome?.runtime || browser.runtime;
runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    // Set default values for storage on first install
    const bmImgs: Array<BookmarkImgData> = [
      {
        id: "bm-default-1",
        name: "Default Style 1",
        createdDate: Date.now(),
        lastUpdatedDate: Date.now(),
        imgData: toBase64Uri(BM_IMG_1)
      },
      {
        id: "bm-default-2",
        name: "Default Style 2",
        createdDate: Date.now(),
        lastUpdatedDate: Date.now(),
        imgData: toBase64Uri(BM_IMG_2)
      },
      {
        id: "bm-default-3",
        name: "Default Style 3",
        createdDate: Date.now(),
        lastUpdatedDate: Date.now(),
        imgData: toBase64Uri(BM_IMG_3)
      },
      {
        id: "bm-default-4",
        name: "Default Style 4",
        createdDate: Date.now(),
        lastUpdatedDate: Date.now(),
        imgData: toBase64Uri(BM_IMG_4)
      }
    ];

    browser.storage.local.set({
      [BOOKMARK_STORAGE_VAR]: [] as Array<BookmarkData>,
      [BOOKMARK_STORAGE_IMGS_VAR]: bmImgs
    });
  }
});