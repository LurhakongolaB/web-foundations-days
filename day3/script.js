// Starting notes data
let notes = [
    { id: 1, text: "Buy milk and bread", category: "personal" },
    { id: 2, text: "Finish the Day 3 assignment", category: "study" },
    { id: 3, text: "Email the project report to Grace", category: "work" },
    { id: 4, text: "Revise JavaScript arrays", category: "study" },
    { id: 5, text: "Call mum", category: "personal" }
];


// 1. Search notes
function searchNotes(word) {
    return notes.filter(note =>
        note.text.toLowerCase().includes(word.toLowerCase())
    );
}


// 2. Find the longest note
function longestNote() {
    if (notes.length === 0) {
        return null;
    }

    let longest = notes[0];

    for (let i = 1; i < notes.length; i++) {
        if (notes[i].text.length > longest.text.length) {
            longest = notes[i];
        }
    }

    return longest;
}


// 3. Count notes by category
function countByCategory() {
    let counts = {};

    for (let note of notes) {
        if (!counts[note.category]) {
            counts[note.category] = 0;
        }

        counts[note.category]++;
    }

    return counts;
}


// 4. Get summary
function getSummary() {
    let counts = countByCategory();
    let numberOfNotes = notes.length;
    let word = numberOfNotes === 1 ? "note" : "notes";

    return `${numberOfNotes} ${word}: ${counts.personal || 0} personal, ${counts.work || 0} work, ${counts.study || 0} study.`;
}


// 5. Check for duplicate note
function isDuplicate(text) {
    let cleanedText = text.trim().toLowerCase().replace(/\s+/g, " ");

    return notes.some(note =>
        note.text.trim().toLowerCase().replace(/\s+/g, " ") === cleanedText
    );
}


// 6. Add a note
function addNote(text, category) {
    let cleanedText = text.trim();

    if (cleanedText.length < 1 || cleanedText.length > 200) {
        console.log("Note not added: text must be between 1 and 200 characters.");
        return false;
    }

    if (isDuplicate(cleanedText)) {
        console.log("Note not added: duplicate note.");
        return false;
    }

    if (!["personal", "work", "study"].includes(category)) {
        console.log("Note not added: invalid category.");
        return false;
    }

    let newId = notes.length === 0
        ? 1
        : Math.max(...notes.map(note => note.id)) + 1;

    notes.push({
        id: newId,
        text: cleanedText,
        category: category
    });

    console.log("Note added successfully.");
    return true;
}


// =========================
// TESTS
// =========================

// 1. searchNotes
console.log(searchNotes("DAY 3"));
// Expected: [{ id: 2, text: "Finish the Day 3 assignment", category: "study" }]

console.log(searchNotes("pizza"));
// Expected: []

console.log(searchNotes("milk"));
// Expected: [{ id: 1, text: "Buy milk and bread", category: "personal" }]


// 2. longestNote
console.log(longestNote());
// Expected: { id: 3, text: "Email the project report to Grace", category: "work" }

let savedNotes = notes;
notes = [];

console.log(longestNote());
// Expected: null

notes = savedNotes;


// 3. countByCategory
console.log(countByCategory());
// Expected: { personal: 2, study: 2, work: 1 }

notes = [];

console.log(countByCategory());
// Expected: {}

notes = savedNotes;


// 4. getSummary
console.log(getSummary());
// Expected: "5 notes: 2 personal, 1 work, 2 study."

notes = [{ id: 1, text: "Test note", category: "personal" }];

console.log(getSummary());
// Expected: "1 note: 1 personal, 0 work, 0 study."

notes = savedNotes;


// 5. isDuplicate
console.log(isDuplicate("  BUY MILK AND BREAD  "));
// Expected: true

console.log(isDuplicate("Buy eggs"));
// Expected: false


// 6. addNote
console.log(addNote("Read a JavaScript book", "study"));
// Expected: true

console.log(addNote("  BUY   MILK AND BREAD  ", "personal"));
// Expected: false (duplicate)

console.log(addNote("This category is wrong", "school"));
// Expected: false (invalid category)

console.log(addNote("", "personal"));
// Expected: false (invalid length)