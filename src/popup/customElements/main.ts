export class Homepage extends HTMLElement {
  constructor() {
    super();
    this._bookmarks = [];
    this._callbacks = {};
    this._searchText = "";
    this._sortSelected = [];
  }

  set bookmarks(value) {
    if (!Array.isArray(value)) return;
    this._bookmarks = value;
    this.render();
  }

  get bookmarks() {
    return this._bookmarks;
  }

  set callbacks(obj) {
    if (
      !(
        typeof variable === "object" &&
        variable !== null &&
        !Array.isArray(variable)
      )
    )
      return;
    this._callbacks = obj;
    this.render();
  }

  get callbacks() {
    return this._callbacks;
  }

  set searchText(value) {
    if (typeof value !== "string") return;
    this._searchText = value;
    this.render();
  }

  get searchText() {
    return this._searchText;
  }

  set sortSelected(value) {
    if (!Array.isArray(value)) return;
    this._sortSelected = value;
    this.render();
  }

  get sortSelected() {
    return this.sortSelected;
  }

  handleClick(e) {
    const id = e.currentTarget.dataset.id;
    if (typeof this.callbacks[id] == "function") this.callbacks[id](e);
  }

  connectedCallback() {
    this.render();
    Object.keys(this.callbacks).forEach((x) => {
      const btn = this.querySelector(`#${x}`);
      btn.removeEventListener("click", this.handleClick);
      btn.addEventListener("click", this.handleClick);
    });
  }

  disconnectedCallback() {
    Object.keys(this.callbacks).forEach((x) => {
      this.querySelector(`#${x}`).removeEventListener(
        "click",
        this.handleClick
      );
    });
  }

  render() {
    this.innerHTML = `
      <div id="pane-main" class="content-panes">
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
              class="bi bi-arrow-right-circle-fill mx-1 pointer"
              data-bs-toggle="tooltip"
              title="Go"
            ></i>
          </div>
          <div class="sort-buttons">
            <button type="button" class="custom-btn" id="sort-az">
              <i
                style="font-size: larger"
                class="bi bi-sort-alpha-down mx-1"
                data-bs-toggle="tooltip"
                title="Sort by Name"
              ></i>
            </button>
            <button type="button" class="custom-btn" id="sort-date">
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
          <ul class="list-group"></ul>
        </div>
        <div id="utility-buttons">
          <button
            type="button"
            class="custom-btn flex-grow-1"
            data-bs-toggle="tooltip"
            title="Add New Bookmark"
          >
            <i
              style="font-size: larger"
              class="bi bi-bookmark-plus-fill mx-1"
            ></i>
            <b>Add Bookmarks</b>
          </button>
          <button
            type="button"
            class="custom-btn flex-fill"
            data-bs-toggle="tooltip"
            title="View Saved Bookmarks"
          >
            <i style="font-size: larger" class="bi bi-bookmarks-fill mx-1"></i>
          </button>
          <div id="bm-import-export">
            <button
              type="button"
              class="custom-btn flex-fill"
              data-bs-toggle="tooltip"
              title="Import Bookmarks"
            >
              <i
                style="font-size: medium"
                class="bi bi-box-arrow-in-left mx-1"
              ></i>
            </button>
            <button
              type="button"
              class="custom-btn flex-fill"
              data-bs-toggle="tooltip"
              title="Export Bookmarks"
            >
              <i
                style="font-size: medium"
                class="bi bi-box-arrow-right mx-1"
              ></i>
            </button>
          </div>
          <div id="bm-sync-git">
            <button
              type="button"
              class="custom-btn flex-fill"
              data-bs-toggle="tooltip"
              title="Sync Data"
            >
              <i style="font-size: medium" class="bi bi-arrow-repeat mx-1"></i>
            </button>
            <button
              type="button"
              class="custom-btn flex-fill"
              data-bs-toggle="tooltip"
              title="Open Git Repo"
            >
              <i style="font-size: medium" class="bi bi-github mx-1"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }
}
