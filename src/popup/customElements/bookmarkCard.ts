import { BookmarkData } from "types/bookmark";

export class BookmarkCard extends HTMLElement {
  private bookmarkData: BookmarkData | null;

  constructor() {
    super();
    this.bookmarkData = null;
  }

  set data(data: BookmarkData) {
    this.bookmarkData = data;
    this.render();
  }

  get data(): BookmarkData | null {
    return this.bookmarkData;
  }

  connectedCallback(): void {
    this.render();
  }

  addEventListeners(): void {}

  render(): void {
    this.innerHTML = `
      <div class="bm-cards">
        
      </div>
    `;
    this.addEventListeners();
  }
}
