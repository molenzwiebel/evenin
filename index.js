"use strict";

const fs = require("fs");
const TrieSearch = require("trie-search");

// Create a simple array for languages, create a trie indexed by "phrase" for fast lookup.
const languages = [];
const trie = new TrieSearch(["phrase"], {
    splitOnRegEx: false
});

// For every letter of the alphabet...
for (const letter of "abcdefghijklmnopqrstuvwxyz") {
    // Read the data from that file and parse it as JSON...
    const contents = JSON.parse(fs.readFileSync(`data/${letter}.json`, "utf8"));

    // Add the languages starting with this letter to the list of languages
    languages.push(...contents);

    // Map every phrase to its own object. This converts something like:
    // [{ name: "A", phrases: [{ a }, { b }] }]
    // Into:
    // [{ language: { name: "A" }, a }, { language: { name: "A" }, b }]
    // Note that since the language object is a reference, this isn't too hard on memory.
    const mapped = [].concat(...contents.map(language => {
        return language.greetings.map(x => ({
            ...x,
            language
        }));
    }));

    // Index the parsed greetings into our trie. This takes the majority of startup time.
    trie.addAll(mapped);
}

/**
 * Returns whether or not the specified text contains a greeting. 
 * @param {string} text the text to search in
 * @returns {boolean} whether or not the text contains a greeting
 */
function hasGreeting(text) {
    // Step 0: Normalize the text a little.
    text = text.replace(/\s+/g, " ").trim().toLowerCase();

    // Step 1: Split the input into words and find partial greetings for those words.
    // Ignore words of length 1 (especially 'a') since they clutter too much.
    const potentialMatches = [];

    for (const word of text.split(/\s+/)) {
        potentialMatches.push(...matchGreetings(word));
    }

    // Now see if any of the potential matches is fully contained inside the text.
    // We use a regex based approach here to prevent matches inside words.
    return potentialMatches.some(match => {
        // Construct a regex of the format /\b<phrase>\b/i
        const regex = new RegExp("\\b" + match.phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b", "i");

        // Return if that regex matches.
        return regex.test(text);
    });
}

/**
 * Checks if the specified text is found as an exact greeting. Note that this is
 * an case-insensitive match and does not trim the input string.
 * @param {String} text the greeting to search for
 * @returns {boolean} whether or not the text is a greeting
 */
function isGreeting(text) {
    // Return true if we can find an exact match.
    return findGreetings(text).length > 0;
}

/**
 * Finds all greetings across all supported languages that are exactly the given
 * input. Case-insensitive comparison is used, but inputs are not trimmed or normalized.
 * @param {String} text the greeting to search for
 */
function findGreetings(text) {
    // Find all potential greetings.
    const greetings = matchGreetings(text);

    // Return only the ones that match exactly.
    return greetings.filter(x => x.phrase.toLowerCase() === text.toLowerCase());
}

/**
 * Finds all greetings that start with the specified substring. Case-insensitive comparison
 * is used, but inputs are not trimmed or normalized.
 * @param {String} text the prefix to search for
 */
function matchGreetings(text) {
    return trie.get(text);
}

/**
 * Finds the language with the specified name. The language name needs to match exactly, 
 * barring case difference.
 * @param {string} language the language name
 */
function getLanguage(language) {
    return languages.find(x => x.name.toLowerCase() === language.toLowerCase()) || null;
}

// Export our methods as a simple API.
module.exports = {
    hasGreeting,
    isGreeting,
    findGreetings,
    matchGreetings,
    getLanguage
};