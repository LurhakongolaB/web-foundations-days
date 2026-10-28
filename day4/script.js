// 1. Select the required HTML elements
const noteText = document.getElementById("note-text");
const charCount = document.getElementById("char-count");
const wordCount = document.getElementById("word-count");
const clearBtn = document.getElementById("clear-btn");
const themeToggle = document.getElementById("theme-toggle");

// 2. Settings and localStorage keys
const MAX_CHARACTERS = 200;
const WARNING_THRESHOLD = 180;

const DRAFT_KEY = "quicknotes-day4-draft";
const THEME_KEY = "quicknotes-day4-theme";

// 3. Update character and word counts
function updateCounts() {
    const text = noteText.value;
    const characters = text.length;
    const trimmedText = text.trim();

    const words = trimmedText === ""
        ? 0
        : trimmedText.split(/\s+/).length;

    charCount.textContent =
        `${characters} / ${MAX_CHARACTERS} characters`;

    wordCount.textContent = `${words} words`;

    // Remove previous warning classes
    charCount.classList.remove("warning", "over");

    // Apply the correct character warning
    if (characters > MAX_CHARACTERS) {
        charCount.classList.add("over");
    } else if (characters > WARNING_THRESHOLD) {
        charCount.classList.add("warning");
    }
}

// 4. Update counts and save the draft on every input event
noteText.addEventListener("input", function () {
    updateCounts();
    localStorage.setItem(DRAFT_KEY, noteText.value);
});

// 5. Clear the note, counters and saved draft
function clearNote() {
    noteText.value = "";

    updateCounts();

    localStorage.removeItem(DRAFT_KEY);

    noteText.focus();
}

// Clear button
clearBtn.addEventListener("click", clearNote);

// 6. Escape key also clears the note
noteText.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        event.preventDefault();
        clearNote();
    }
});

// 7. Update the theme button's label
function updateThemeButton() {
    if (document.body.classList.contains("dark")) {
        themeToggle.textContent = "Light mode";
    } else {
        themeToggle.textContent = "Dark mode";
    }
}

// 8. Toggle dark mode and remember the choice
themeToggle.addEventListener("click", function () {
    const darkModeEnabled = document.body.classList.toggle("dark");

    localStorage.setItem(
        THEME_KEY,
        darkModeEnabled ? "dark" : "light"
    );

    updateThemeButton();
});

// 9. Restore a saved draft when the page loads
const savedDraft = localStorage.getItem(DRAFT_KEY);

if (savedDraft !== null) {
    noteText.value = savedDraft;
}

// 10. Restore the saved theme when the page loads
const savedTheme = localStorage.getItem(THEME_KEY);

if (savedTheme === "dark") {
    document.body.classList.add("dark");
}

// 11. Initialize counters and theme button
updateCounts();
updateThemeButton();
