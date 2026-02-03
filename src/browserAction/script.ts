import { Homepage } from "./customElements/main";
import { BookmarkCard, BookmarkCardEditor } from "./customElements/bookmarkCard";

// Define custom elements
customElements.define("Homepage", Homepage);
customElements.define("BookmarkCard", BookmarkCard);
customElements.define("BookmarkCardEditor", BookmarkCardEditor);

// Define events

// Define variables
var currentView = "home";
var bookmarkList

// Main
const contentDiv = document.getElementById("conntent-div");