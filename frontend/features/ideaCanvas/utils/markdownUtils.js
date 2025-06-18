// src/utils/markdownUtils.js

/**
 * Strips common Markdown formatting from a string to return plain text.
 * @param {string} markdown - The markdown string to strip.
 * @returns {string} - The plain text string.
 */
export const stripMarkdown = (markdown) => {
  if (!markdown) return "";
  return markdown
    .replace(/#{1,6}\s?/g, "") // Headings
    .replace(/\[(.*?)\]\(.*?\)/g, "$1") // Links (keep text, remove URL)
    .replace(/!\[(.*?)\]\(.*?\)/g, "$1") // Images (keep alt text)
    .replace(/(\*\*|__)(.*?)\1/g, "$2") // Bold
    .replace(/(\*|_)(.*?)\1/g, "$2") // Italic
    .replace(/~{2}(.*?)(~{2})/g, "$1") // Strikethrough
    .replace(/`{1,3}(.*?)(`{1,3})/g, "$1") // Inline code/code blocks
    .replace(/^>\s?/g, "") // Blockquotes
    .replace(/-\s?/g, "") // Unordered list items
    .replace(/\d+\.\s?/g, "") // Ordered list items
    .replace(/[\r\n]+/g, " ") // Newlines to spaces
    .trim();
};
