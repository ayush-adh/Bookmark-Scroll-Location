import { Homepage } from "./customElements/main";
import { syncStorage, getBookmarks } from "@utility/storage";
import fileDownload from "@utility/fileDownload";
import { FileDownloadType } from "@bm-types/utility";
import { CurrentViewAllowedValues } from "@bm-types/bookmark";

// Define custom elements
customElements.define("bm-homepage", Homepage);

// Define variables
const scrollBMState = new Proxy(
  { view: "bm-home" } as { view: CurrentViewAllowedValues },
  {
    set(target, prop, value) {
      if (prop === "view" && target[prop] !== value) {
        target[prop] = value;
        renderCurrentView(value);
        return true;
      }
      return false;
    }
  }
);

// Memoization
const bmComponents = {
  homepage: document.createElement("bm-homepage") as Homepage
};

// Define events
function onClickAddBM() {
  scrollBMState.view = "bm-edit";
}

function onClickBMImgs() {
  scrollBMState.view = "bm-imgs";
}

function onClickImport() {
}

function onClickExport() {
  getBookmarks().then((res) => {
    if (res.error || !res.data) {
      console.error("Error fetching bookmarks: ", res.error);
      return;
    }
    const fileData: FileDownloadType = {
      data: JSON.stringify(res.data),
      filename: `bookmark-scroll-location-data-${Date.now()}.json`,
      mimeType: "application/json"
    };
    fileDownload(fileData);
  });
}

function onClickSync(button: HTMLButtonElement) {
  syncStorage()
    .then(() => {
      button?.firstElementChild?.classList.replace(
        "bi-arrow-repeat",
        "bi-check-lg"
      );
      setTimeout(() => {
        button?.firstElementChild?.classList.replace(
          "bi-check-lg",
          "bi-arrow-repeat"
        );
      }, 1000);
    })
    .catch(() => {
      button?.firstElementChild?.classList.replace(
        "bi-arrow-repeat",
        "bi-x-lg"
      );
      setTimeout(() => {
        button?.firstElementChild?.classList.replace(
          "bi-x-lg",
          "bi-arrow-repeat"
        );
      }, 1000);
    });
}

// Helpers
function addHomepageEvents(): void {
  const addBMBtn = document.getElementById("add-bm-btn") as HTMLButtonElement;
  const bmImgsBtn = document.getElementById(
    "view-bm-imgs-btn"
  ) as HTMLButtonElement;
  const importBtn = document.getElementById(
    "import-bm-btn"
  ) as HTMLButtonElement;
  const exportBtn = document.getElementById(
    "export-bm-btn"
  ) as HTMLButtonElement;
  const syncBtn = document.getElementById("sync-bm-btn") as HTMLButtonElement;

  addBMBtn.addEventListener("click", onClickAddBM);
  bmImgsBtn.addEventListener("click", onClickBMImgs);
  importBtn.addEventListener("click", onClickImport);
  exportBtn.addEventListener("click", onClickExport);
  syncBtn.addEventListener("click", () => onClickSync(syncBtn));
}

function renderCurrentView(view: CurrentViewAllowedValues): void {
  const mainPanDiv = document.getElementById("pane-main");
  if (!mainPanDiv) {
    console.error("Main pane div not found");
    return;
  }
  mainPanDiv.innerHTML = "";
  switch (view) {
    case "bm-home":
      mainPanDiv.appendChild(bmComponents.homepage);
      addHomepageEvents();
      break;
    default:
      console.error("Invalid view: ", view);
  }
}

// Entry
window.onload = () => {
  renderCurrentView(scrollBMState.view);
};
