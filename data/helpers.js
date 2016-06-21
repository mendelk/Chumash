import {
  SCHEMAS,
  TEXTS_HE,
  TEXTS_EN,
  convertRef
} from './index';

export function getBook({ book }) {
  return { title: SCHEMAS[book].heTitle, index: book };
}

export function getBooks() {
  return [0,1,2,3,4].map((book) => getBook({ book }));
}

export function getParshahs({ book }) {
  // return { title: SCHEMAS[book].heTitle, index: book };
  return SCHEMAS[book].alts.Parasha.nodes.map((parshah, index) => {
    return {
      title: parshah.heTitle,
      index: index,
      book: book
    }
  });
}

export function getParshah({ book, parshah }) {
  let parshahObj = SCHEMAS[book].alts.Parasha.nodes[parshah];
  return {
    title: parshahObj.title,
    index: parshah,
    book: book,
    aliyaRefs: parshahObj.refs.map(convertRef)
  };
}

function getChapter({ book, chapter, lang }) {
  return {
    book: book,
    index: chapter,
    verses: TEXTS_HE[book].text[chapter]
  };
}

export function getVerse({ book, chapter, verse, lang }){
  let source = lang === "en" ? TEXTS_EN : TEXTS_HE;
  return {
    text: source[book].text[chapter][verse]
  };
}

function _expandRef(ref, chapter, fromVerse, toVerse) {
  for (let i = fromVerse; i <= toVerse; i++) {
    ref.push([chapter, i]);
  }
  return ref;
}

export function expandRef({ book, ref }) {
  let [[fromChapter, fromVerse], [toChapter, toVerse]] = ref;
  let expandedRef = [];
  if (toChapter === fromChapter) {
    // Aliya ends in same Chapter. We just need inner verses.
      _expandRef(expandedRef, fromChapter, fromVerse, toVerse)
  } else {
    // fromChapter < toChapter: Aliya ends in later Chapter.
    for (var i = fromChapter; i <= toChapter; i++) {
      if (i === fromChapter) {
        // get partial verses from _first_ Chapter
        let chapterLength = getChapter({book: book, chapter: i-1}).verses.length;
        _expandRef(expandedRef, i, fromVerse, chapterLength)
      } else if (i === toChapter) {
        // get partial verses from _last_ Chapter
        _expandRef(expandedRef, i, 1, toVerse)
      } else {
        // get all verses from intermediate Chapters
        let chapterLength = getChapter({book: book, chapter: i-1}).verses.length;
        _expandRef(expandedRef, i, 1, chapterLength)
      }
    }
  }
  return expandedRef;
}

export function getRashi({ book, chapter, verse, lang }){
  let source = lang === "en" ? TEXTS_EN : TEXTS_HE;
  return {
    text: source[book].text[chapter][verse]
  };
}



