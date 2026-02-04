export class BookmarkCard extends HTMLElement {
  connectedCallback() {
    const timestamp =
      this.getAttribute("timestamp") || new Date().toLocaleString();
    const name = this.getAttribute("name") || `Unnamed Bookmark ${timestamp}`;
    const bookmarkImg = this.getAttribute("bookmarkImg") || "default-bm.png";
    const url = this.getAttribute("url") || "#";
    const onDelete = this.getAttribute("onDelete");
    const onEdit = this.getAttribute("onEdit");
    this.innerHTML = `

    `;
  }
}

export class BookmarkCardEditor extends HTMLElement {
  connectedCallback() {
    const timestamp =
      this.getAttribute("timestamp") || new Date().toLocaleString();
    const name = this.getAttribute("name") || `Unnamed Bookmark ${timestamp}`;
    const bookmarkImg = this.getAttribute("bookmarkImg") || "default-bm.png";
    const url = this.getAttribute("url") || "#";
    const onSave = this.getAttribute("onSave");
    const onCancel = this.getAttribute("onCancel");
    this.innerHTML = `
        
    `;
  }
}
