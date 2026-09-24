/** Search input/API text: turn + or %20 (any %XX) into normal spaces. */
export const normalizeSearch = (val) => {
  if (val == null || val === "") return "";

  let s = String(val);

  if (s.includes("+")) s = s.replace(/\+/g, " ");

  if (s.includes("%")) {
    try {
      s = decodeURIComponent(s);
    } catch {
      s = s.replace(/%20/gi, " ");
    }
  }

  return s.replace(/\s+/g, " ").trim();
};
