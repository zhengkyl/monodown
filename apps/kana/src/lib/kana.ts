/**
 * The romaji field is ordered so that first is unique and obvious
 *
 * Mostly in this order: Hepburn, Nihon-shiki, Kunrei-shiki, other
 * Exceptions: を, づ, じゃ row, ぢゃ row
 */

export const gojuonKana = [
  [
    { hira: "あ", kata: "ア", romaji: ["a"] },
    { hira: "い", kata: "イ", romaji: ["i"] },
    { hira: "う", kata: "ウ", romaji: ["u"] },
    { hira: "え", kata: "エ", romaji: ["e"] },
    { hira: "お", kata: "オ", romaji: ["o"] },
  ],
  [
    { hira: "か", kata: "カ", romaji: ["ka"] },
    { hira: "き", kata: "キ", romaji: ["ki"] },
    { hira: "く", kata: "ク", romaji: ["ku"] },
    { hira: "け", kata: "ケ", romaji: ["ke"] },
    { hira: "こ", kata: "コ", romaji: ["ko"] },
  ],
  [
    { hira: "さ", kata: "サ", romaji: ["sa"] },
    { hira: "し", kata: "シ", romaji: ["shi", "si"] },
    { hira: "す", kata: "ス", romaji: ["su"] },
    { hira: "せ", kata: "セ", romaji: ["se"] },
    { hira: "そ", kata: "ソ", romaji: ["so"] },
  ],
  [
    { hira: "た", kata: "タ", romaji: ["ta"] },
    { hira: "ち", kata: "チ", romaji: ["chi", "ti"] },
    { hira: "つ", kata: "ツ", romaji: ["tsu", "tu"] },
    { hira: "て", kata: "テ", romaji: ["te"] },
    { hira: "と", kata: "ト", romaji: ["to"] },
  ],
  [
    { hira: "な", kata: "ナ", romaji: ["na"] },
    { hira: "に", kata: "ニ", romaji: ["ni"] },
    { hira: "ぬ", kata: "ヌ", romaji: ["nu"] },
    { hira: "ね", kata: "ネ", romaji: ["ne"] },
    { hira: "の", kata: "ノ", romaji: ["no"] },
  ],
  [
    { hira: "は", kata: "ハ", romaji: ["ha"] },
    { hira: "ひ", kata: "ヒ", romaji: ["hi"] },
    { hira: "ふ", kata: "フ", romaji: ["fu", "hu"] },
    { hira: "へ", kata: "ヘ", romaji: ["he"] },
    { hira: "ほ", kata: "ホ", romaji: ["ho"] },
  ],
  [
    { hira: "ま", kata: "マ", romaji: ["ma"] },
    { hira: "み", kata: "ミ", romaji: ["mi"] },
    { hira: "む", kata: "ム", romaji: ["mu"] },
    { hira: "め", kata: "メ", romaji: ["me"] },
    { hira: "も", kata: "モ", romaji: ["mo"] },
  ],
  [
    { hira: "や", kata: "ヤ", romaji: ["ya"] },
    null,
    { hira: "ゆ", kata: "ユ", romaji: ["yu"] },
    null,
    { hira: "よ", kata: "ヨ", romaji: ["yo"] },
  ],
  [
    { hira: "ら", kata: "ラ", romaji: ["ra"] },
    { hira: "り", kata: "リ", romaji: ["ri"] },
    { hira: "る", kata: "ル", romaji: ["ru"] },
    { hira: "れ", kata: "レ", romaji: ["re"] },
    { hira: "ろ", kata: "ロ", romaji: ["ro"] },
  ],
  [
    { hira: "わ", kata: "ワ", romaji: ["wa"] },
    null,
    null,
    null,
    { hira: "を", kata: "ヲ", romaji: ["wo", "o"] },
  ],
  [{ hira: "ん", kata: "ン", romaji: ["n"] }],
];

export const dakuonKana = [
  [
    { hira: "が", kata: "ガ", romaji: ["ga"] },
    { hira: "ぎ", kata: "ギ", romaji: ["gi"] },
    { hira: "ぐ", kata: "グ", romaji: ["gu"] },
    { hira: "げ", kata: "ゲ", romaji: ["ge"] },
    { hira: "ご", kata: "ゴ", romaji: ["go"] },
  ],
  [
    { hira: "ざ", kata: "ザ", romaji: ["za"] },
    { hira: "じ", kata: "ジ", romaji: ["ji", "zi"] },
    { hira: "ず", kata: "ズ", romaji: ["zu"] },
    { hira: "ぜ", kata: "ゼ", romaji: ["ze"] },
    { hira: "ぞ", kata: "ゾ", romaji: ["zo"] },
  ],
  [
    { hira: "だ", kata: "ダ", romaji: ["da"] },
    { hira: "ぢ", kata: "ヂ", romaji: ["ji", "di", "zi"] },
    { hira: "づ", kata: "ヅ", romaji: ["zu", "du"] },
    { hira: "で", kata: "デ", romaji: ["de"] },
    { hira: "ど", kata: "ド", romaji: ["do"] },
  ],
  [
    { hira: "ば", kata: "バ", romaji: ["ba"] },
    { hira: "び", kata: "ビ", romaji: ["bi"] },
    { hira: "ぶ", kata: "ブ", romaji: ["bu"] },
    { hira: "べ", kata: "ベ", romaji: ["be"] },
    { hira: "ぼ", kata: "ボ", romaji: ["bo"] },
  ],
  [
    { hira: "ぱ", kata: "パ", romaji: ["pa"] },
    { hira: "ぴ", kata: "ピ", romaji: ["pi"] },
    { hira: "ぷ", kata: "プ", romaji: ["pu"] },
    { hira: "ぺ", kata: "ペ", romaji: ["pe"] },
    { hira: "ぽ", kata: "ポ", romaji: ["po"] },
  ],
];

export const comboKana = [
  [
    { hira: "きゃ", kata: "キャ", romaji: ["kya"] },
    { hira: "きゅ", kata: "キュ", romaji: ["kyu"] },
    { hira: "きょ", kata: "キョ", romaji: ["kyo"] },
  ],
  [
    { hira: "ぎゃ", kata: "ギャ", romaji: ["gya"] },
    { hira: "ぎゅ", kata: "ギュ", romaji: ["gyu"] },
    { hira: "ぎょ", kata: "ギョ", romaji: ["gyo"] },
  ],
  [
    { hira: "しゃ", kata: "シャ", romaji: ["sha", "sya"] },
    { hira: "しゅ", kata: "シュ", romaji: ["shu", "syu"] },
    { hira: "しょ", kata: "ショ", romaji: ["sho", "syo"] },
  ],
  [
    { hira: "じゃ", kata: "ジャ", romaji: ["ja", "zya", "jya"] },
    { hira: "じゅ", kata: "ジュ", romaji: ["ju", "zyu", "jyu"] },
    { hira: "じょ", kata: "ジョ", romaji: ["jo", "zyo", "jyo"] },
  ],
  [
    { hira: "ちゃ", kata: "チャ", romaji: ["cha", "tya"] },
    { hira: "ちゅ", kata: "チュ", romaji: ["chu", "tyu"] },
    { hira: "ちょ", kata: "チョ", romaji: ["cho", "tyo"] },
  ],
  [
    { hira: "ぢゃ", kata: "ヂャ", romaji: ["dya", "ja", "zya", "jya"] },
    { hira: "ぢゅ", kata: "ヂュ", romaji: ["dyu", "ju", "zyu", "jyu"] },
    { hira: "ぢょ", kata: "ヂョ", romaji: ["dyo", "jo", "zyo", "jyo"] },
  ],
  [
    { hira: "にゃ", kata: "ニャ", romaji: ["nya"] },
    { hira: "にゅ", kata: "ニュ", romaji: ["nyu"] },
    { hira: "にょ", kata: "ニョ", romaji: ["nyo"] },
  ],
  [
    { hira: "ひゃ", kata: "ヒャ", romaji: ["hya"] },
    { hira: "ひゅ", kata: "ヒュ", romaji: ["hyu"] },
    { hira: "ひょ", kata: "ヒョ", romaji: ["hyo"] },
  ],
  [
    { hira: "びゃ", kata: "ビャ", romaji: ["bya"] },
    { hira: "びゅ", kata: "ビュ", romaji: ["byu"] },
    { hira: "びょ", kata: "ビョ", romaji: ["byo"] },
  ],
  [
    { hira: "ぴゃ", kata: "ピャ", romaji: ["pya"] },
    { hira: "ぴゅ", kata: "ピュ", romaji: ["pyu"] },
    { hira: "ぴょ", kata: "ピョ", romaji: ["pyo"] },
  ],
  [
    { hira: "みゃ", kata: "ミャ", romaji: ["mya"] },
    { hira: "みゅ", kata: "ミュ", romaji: ["myu"] },
    { hira: "みょ", kata: "ミョ", romaji: ["myo"] },
  ],
  [
    { hira: "りゃ", kata: "リャ", romaji: ["rya"] },
    { hira: "りゅ", kata: "リュ", romaji: ["ryu"] },
    { hira: "りょ", kata: "リョ", romaji: ["ryo"] },
  ],
];
