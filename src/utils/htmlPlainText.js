/** Decode HTML entities, strip tags, collapse whitespace (preview text from rich HTML). */
export function htmlToPlainText(html) {
  if (html == null || html === "") return "";
  const s = String(html);
  if (typeof document === "undefined") {
    return s
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }
  const ta = document.createElement("textarea");
  ta.innerHTML = s;
  const decoded = ta.value;
  const div = document.createElement("div");
  div.innerHTML = decoded;
  return (div.textContent || div.innerText || "")
    .replace(/\s+/g, " ")
    .trim();
}
