import { BOOKMARK_STORAGE_VAR } from "../../utility/constants";
import { getBookmarks } from "../../utility/storage";
import { BookmarkData } from "types/bookmark";

export class Homepage extends HTMLElement {
  private sortSelected: Set<"az" | "date">;

  constructor() {
    super();
    this.sortSelected = new Set();
    browser.storage.onChanged.addListener((changes, area) => {
      if (area === "local" && changes[BOOKMARK_STORAGE_VAR]) {
        this.render();
      }
    });
  }

  connectedCallback(): void {
    this.render();
  }

  addEventListeners(): void {
    const searchInput = this.querySelector("#search-text-input") as HTMLInputElement;
    const searchBtn = this.querySelector("#search-bm-btn") as HTMLElement;
    const sortAZBtn = this.querySelector("#sort-az") as HTMLElement;
    const sortDateBtn = this.querySelector("#sort-date") as HTMLElement;

    searchBtn.addEventListener("click", () => {
      const query = searchInput.value.trim();
      if (query) this.render();
    });

    sortAZBtn.addEventListener("click", () => {
      if (this.sortSelected.has("az")) {
        this.sortSelected.delete("az");
      } else {
        this.sortSelected.add("az");
      }
      this.render();
    });

    sortDateBtn.addEventListener("click", () => {
      if (this.sortSelected.has("date")) {
        this.sortSelected.delete("date");
      } else {
        this.sortSelected.add("date");
      }
      this.render();
    });
  }

  getBMsToRender(): Array<BookmarkData> {
    const searchString = (
      this.querySelector("#search-text-input") as HTMLInputElement
    )?.value.trim().toLowerCase() || "";
    let bmsToRender: Array<BookmarkData> = [];

    getBookmarks().then((res) => {
      if (res.error || !res.data) {
        console.error("Error fetching bookmarks: ", res.error);
        return;
      }
      bmsToRender = res.data;
      if (searchString) {
        bmsToRender = bmsToRender.filter((bm) => {
          const searchRegex = new RegExp(searchString, "ig");
          return (
            searchRegex.test(JSON.stringify(bm))
          );
        });
      }
      if (this.sortSelected.has("az")) {
        if (this.sortSelected.has("date")) {
          bmsToRender.sort((a, b) => {
            return a.name.localeCompare(b.name) || a.date.getTime() - b.date.getTime();
          });
        }
        bmsToRender.sort((a, b) => a.name.localeCompare(b.name));
      } else if (this.sortSelected.has("date")) {
        bmsToRender.sort((a, b) => a.date.getTime() - b.date.getTime());
      }
    });

    return bmsToRender;
  }

  render(): void {
    const bmToRender = this.getBMsToRender();
    this.innerHTML = `
      <div id="search-sort">
        <div class="px-1" id="search-text-div">
          <i
            class="bi bi-search mx-1"
            data-bs-toggle="tooltip"
            title="Search"
          ></i>
          <input
            type="text"
            id="search-text-input"
            placeholder="Search for bookmarks..."
          />
          <i
            id="search-bm-btn"
            class="bi bi-arrow-right-circle-fill mx-1 pointer"
            data-bs-toggle="tooltip"
            title="Go"
          ></i>
        </div>
        <div class="sort-buttons">
          <button 
            type="button" 
            class="custom-btn ${this.sortSelected.has("az") ? "active" : ""}" 
            id="sort-az"
          >
            <i
              style="font-size: larger"
              class="bi bi-sort-alpha-down mx-1"
              data-bs-toggle="tooltip"
              title="Sort by Name"
            ></i>
          </button>
          <button 
            type="button" 
            class="custom-btn ${this.sortSelected.has("date") ? "active" : ""}"
            id="sort-date"
          >
            <i
              style="font-size: larger"
              class="bi bi-sort-numeric-down mx-1"
              data-bs-toggle="tooltip"
              title="Sort by Date"
            ></i>
          </button>
        </div>
      </div>
      <div id="bookmarks-list">
        <div class="bm-cards" id="no-bm-msg">
          You have no saved bookmarks...
        </div>
      </div>
    `;
    this.addEventListeners();
  }
}
