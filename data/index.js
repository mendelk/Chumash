export const SCHEMAS = [
  require("./schemas/Genesis"),
  require("./schemas/Exodus"),
  require("./schemas/Leviticus"),
  require("./schemas/Numbers"),
  require("./schemas/Deuteronomy")
];

export const TEXTS_HE = [
  require("./text/Genesis_Hebrew"),
  require("./text/Exodus_Hebrew"),
  require("./text/Leviticus_Hebrew"),
  require("./text/Numbers_Hebrew"),
  require("./text/Deuteronomy_Hebrew")
];

export const TEXTS_EN = [
  require("./text/Genesis_English"),
  require("./text/Exodus_English"),
  require("./text/Leviticus_English"),
  require("./text/Numbers_English"),
  require("./text/Deuteronomy_English")
];

const REFS_RE = /[0-9]+/g;

export function convertRef(refs) {
  let [a,b,c,d] = refs.match(REFS_RE).map((n) => parseInt(n));
  // If ends in same chapter, `toChapter` is omitted
  return d ? [[a,b],[c,d]] : [[a,b],[a,c]];
}
