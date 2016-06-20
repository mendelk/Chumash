const SCHEMAS = [
  require("./schemas/Genesis"),
  require("./schemas/Exodus"),
  require("./schemas/Leviticus"),
  require("./schemas/Numbers"),
  require("./schemas/Deuteronomy")
];

const TEXTS = [
  require("./text/Genesis_Hebrew"),
  require("./text/Exodus_Hebrew"),
  require("./text/Leviticus_Hebrew"),
  require("./text/Numbers_Hebrew"),
  require("./text/Deuteronomy_Hebrew")
];

const REFS_RE = /[0-9]+/g;

function convertRef(refs) {
  let [a,b,c,d] = refs.match(REFS_RE).map((n) => parseInt(n));
  // If ends in same chapter, `toChapter` is omitted
  return d ? [[a,b],[c,d]] : [[a,b],[a,c]];
}

function getAliyaFromRef(ref, book) {
  let [[fromChapter, fromVerse], [toChapter, toVerse]] = ref;
  let verses = [];
  let text = book.text;
  if (toChapter === fromChapter) {
    // Aliya ends in same Chapter. We just need inner verses.
    verses = text[fromChapter-1].slice(fromVerse-1, toVerse)
  } else {
    // fromChapter < toChapter: Aliya ends in later Chapter.
    for (var i = fromChapter; i <= toChapter; i++) {
      if (i === fromChapter) {
        // get partial verses from _first_ Chapter
        verses = verses.concat(text[fromChapter-1].slice(fromVerse-1));
      } else if (i === toChapter) {
        // get partial verses from _last_ Chapter
        verses = verses.concat(text[toChapter-1].slice(0, toVerse));        
      } else {
        // get all verses from intermediate Chapters
        verses = verses.concat(text[i-1]);
      }
    }
  }
  return verses;
}

function getParshah(parshah, book) {
  return {
    heTitle: parshah.heTitle,
    aliyos: parshah.refs.map(convertRef).map((ref) => getAliyaFromRef(ref, book))
  };
}

export const data = SCHEMAS.map((schema, index) => {
  return {
    heTitle: schema.heTitle,
    parshahs: schema.alts.Parasha.nodes.map((parshah, parshahIndex) => getParshah(parshah, TEXTS[index]))
  }
});
