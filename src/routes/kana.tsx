import { For, createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { Button } from "~/components/ui/Button";

const mainKana = [
  [
    { hira: "あ", kata: "ア", type: ["a"] },
    { hira: "い", kata: "イ", type: ["i"] },
    { hira: "う", kata: "ウ", type: ["u"] },
    { hira: "え", kata: "エ", type: ["e"] },
    { hira: "お", kata: "オ", type: ["o"] },
  ],
  [
    { hira: "か", kata: "カ", type: ["ka"] },
    { hira: "き", kata: "キ", type: ["ki"] },
    { hira: "く", kata: "ク", type: ["ku"] },
    { hira: "け", kata: "ケ", type: ["ke"] },
    { hira: "こ", kata: "コ", type: ["ko"] },
  ],
  [
    { hira: "さ", kata: "サ", type: ["sa"] },
    { hira: "し", kata: "シ", type: ["shi", "si"] },
    { hira: "す", kata: "ス", type: ["su"] },
    { hira: "せ", kata: "セ", type: ["se"] },
    { hira: "そ", kata: "ソ", type: ["so"] },
  ],
  [
    { hira: "た", kata: "タ", type: ["ta"] },
    { hira: "ち", kata: "チ", type: ["chi", "ti"] },
    { hira: "つ", kata: "ツ", type: ["tsu", "tu"] },
    { hira: "て", kata: "テ", type: ["te"] },
    { hira: "と", kata: "ト", type: ["to"] },
  ],
  [
    { hira: "な", kata: "ナ", type: ["na"] },
    { hira: "に", kata: "ニ", type: ["ni"] },
    { hira: "ぬ", kata: "ヌ", type: ["nu"] },
    { hira: "ね", kata: "ネ", type: ["ne"] },
    { hira: "の", kata: "ノ", type: ["no"] },
  ],
  [
    { hira: "は", kata: "ハ", type: ["ha"] },
    { hira: "ひ", kata: "ヒ", type: ["hi"] },
    { hira: "ふ", kata: "フ", type: ["fu", "hu"] },
    { hira: "へ", kata: "ヘ", type: ["he"] },
    { hira: "ほ", kata: "ホ", type: ["ho"] },
  ],
  [
    { hira: "ま", kata: "マ", type: ["ma"] },
    { hira: "み", kata: "ミ", type: ["mi"] },
    { hira: "む", kata: "ム", type: ["mu"] },
    { hira: "め", kata: "メ", type: ["me"] },
    { hira: "も", kata: "モ", type: ["mo"] },
  ],
  [
    { hira: "や", kata: "ヤ", type: ["ya"] },
    { hira: "ゆ", kata: "ユ", type: ["yu"] },
    { hira: "よ", kata: "ヨ", type: ["yo"] },
  ],
  [
    { hira: "ら", kata: "ラ", type: ["ra"] },
    { hira: "り", kata: "リ", type: ["ri"] },
    { hira: "る", kata: "ル", type: ["ru"] },
    { hira: "れ", kata: "レ", type: ["re"] },
    { hira: "ろ", kata: "ロ", type: ["ro"] },
  ],
  [
    { hira: "わ", kata: "ワ", type: ["wa"] },
    { hira: "を", kata: "ヲ", type: ["wo"] },
    { hira: "ん", kata: "ン", type: ["n", "nn"] },
  ],
];

const dakutenKana = [
  [
    { hira: "が", kata: "ガ", type: ["ga"] },
    { hira: "ぎ", kata: "ギ", type: ["gi"] },
    { hira: "ぐ", kata: "グ", type: ["gu"] },
    { hira: "げ", kata: "ゲ", type: ["ge"] },
    { hira: "ご", kata: "ゴ", type: ["go"] },
  ],
  [
    { hira: "ざ", kata: "ザ", type: ["za"] },
    { hira: "じ", kata: "ジ", type: ["ji", "zi"] },
    { hira: "ず", kata: "ズ", type: ["zu"] },
    { hira: "ぜ", kata: "ゼ", type: ["ze"] },
    { hira: "ぞ", kata: "ゾ", type: ["zo"] },
  ],
  [
    { hira: "だ", kata: "ダ", type: ["da"] },
    { hira: "ぢ", kata: "ヂ", type: ["di"] },
    { hira: "づ", kata: "ヅ", type: ["du"] },
    { hira: "で", kata: "デ", type: ["de"] },
    { hira: "ど", kata: "ド", type: ["do"] },
  ],
  [
    { hira: "ば", kata: "バ", type: ["ba"] },
    { hira: "び", kata: "ビ", type: ["bi"] },
    { hira: "ぶ", kata: "ブ", type: ["bu"] },
    { hira: "べ", kata: "ベ", type: ["be"] },
    { hira: "ぼ", kata: "ボ", type: ["bo"] },
  ],
  [
    { hira: "ぱ", kata: "パ", type: ["pa"] },
    { hira: "ぴ", kata: "ピ", type: ["pi"] },
    { hira: "ぷ", kata: "プ", type: ["pu"] },
    { hira: "ぺ", kata: "ペ", type: ["pe"] },
    { hira: "ぽ", kata: "ポ", type: ["po"] },
  ],
];

const comboKana = [
  [
    { hira: "きゃ", kata: "キャ", type: ["kya"] },
    { hira: "きゅ", kata: "キュ", type: ["kyu"] },
    { hira: "きょ", kata: "キョ", type: ["kyo"] },
  ],
  [
    { hira: "ぎゃ", kata: "ギャ", type: ["gya"] },
    { hira: "ぎゅ", kata: "ギュ", type: ["gyu"] },
    { hira: "ぎょ", kata: "ギョ", type: ["gyo"] },
  ],
  [
    { hira: "しゃ", kata: "シャ", type: ["sha", "sya"] },
    { hira: "しゅ", kata: "シュ", type: ["shu", "syu"] },
    { hira: "しょ", kata: "ショ", type: ["sho", "syo"] },
  ],
  [
    { hira: "じゃ", kata: "ジャ", type: ["ja", "jya"] },
    { hira: "じゅ", kata: "ジュ", type: ["ju", "jyu"] },
    { hira: "じょ", kata: "ジョ", type: ["jo", "jyo"] },
  ],
  [
    { hira: "ちゃ", kata: "チャ", type: ["cha", "cya"] },
    { hira: "ちゅ", kata: "チュ", type: ["chu", "cyu"] },
    { hira: "ちょ", kata: "チョ", type: ["cho", "cyo"] },
  ],
  [
    { hira: "ぢゃ", kata: "ヂャ", type: ["dya"] },
    { hira: "ぢゅ", kata: "ヂュ", type: ["dyu"] },
    { hira: "ぢょ", kata: "ヂョ", type: ["dyo"] },
  ],
  [
    { hira: "にゃ", kata: "ニャ", type: ["nya"] },
    { hira: "にゅ", kata: "ニュ", type: ["nyu"] },
    { hira: "にょ", kata: "ニョ", type: ["nyo"] },
  ],
  [
    { hira: "ひゃ", kata: "ヒャ", type: ["hya"] },
    { hira: "ひゅ", kata: "ヒュ", type: ["hyu"] },
    { hira: "ひょ", kata: "ヒョ", type: ["hyo"] },
  ],
  [
    { hira: "びゃ", kata: "ビャ", type: ["bya"] },
    { hira: "びゅ", kata: "ビュ", type: ["byu"] },
    { hira: "びょ", kata: "ビョ", type: ["byo"] },
  ],
  [
    { hira: "ぴゃ", kata: "ピャ", type: ["pya"] },
    { hira: "ぴゅ", kata: "ピュ", type: ["pyu"] },
    { hira: "ぴょ", kata: "ピョ", type: ["pyo"] },
  ],
  [
    { hira: "みゃ", kata: "ミャ", type: ["mya"] },
    { hira: "みゅ", kata: "ミュ", type: ["myu"] },
    { hira: "みょ", kata: "ミョ", type: ["myo"] },
  ],
  [
    { hira: "りゃ", kata: "リャ", type: ["rya"] },
    { hira: "りゅ", kata: "リュ", type: ["ryu"] },
    { hira: "りょ", kata: "リョ", type: ["ryo"] },
  ],
];

export default function Kana() {
  const [mode, setMode] = createSignal<"hira" | "kata">("hira");

  return (
    <main>
      <Button
        size="md"
        class="btn-line-indigo"
        classList={{
          "btn-line-indigo-active": mode() === "hira",
        }}
        onClick={[setMode, "hira"]}
      >
        Hiragana
      </Button>
      <Button
        size="md"
        class="btn-line-indigo"
        classList={{
          "btn-line-indigo-active": mode() === "kata",
        }}
        onClick={[setMode, "kata"]}
      >
        Katakana
      </Button>
      <div class="flex items-start gap-4">
        <div class="grid grid-cols-2 gap-3">
          <ToggleButtons title="Main Kana" kana={mainKana} mode={mode()} />
        </div>
        <div class="grid grid-cols-2 gap-3">
          <ToggleButtons
            title="Dakuten Kana"
            kana={dakutenKana}
            mode={mode()}
          />
        </div>
        <div class="grid grid-cols-2 gap-3">
          <ToggleButtons title="Combo Kana" kana={comboKana} mode={mode()} />
        </div>
      </div>
    </main>
  );
}

type KanaInfo = { hira: string; kata: string; type: string[] };

type ToggleButtonsProps = {
  title: string;
  kana: KanaInfo[][];
  mode: "hira" | "kata";
};

function ToggleButtons(props: ToggleButtonsProps) {
  const [active, setActive] = createStore(Array(props.kana.length).fill(false));

  return (
    <>
      <Button
        size="md"
        class="btn-line-indigo col-span-2"
        classList={{
          "btn-line-indigo-active": active.every((value) => value),
        }}
        onClick={() => {
          const toggled = active.every((value) => value);
          setActive(Array(props.kana.length).fill(!toggled));
        }}
      >
        {props.title}
      </Button>
      <For each={props.kana}>
        {(row, i) => (
          <Button
            size="md"
            class="btn-line-indigo"
            classList={{ "btn-line-indigo-active": active[i()] }}
            onClick={() => setActive(i(), !active[i()])}
          >
            {row[0][props.mode]}/{row[0].type[0]}
          </Button>
        )}
      </For>
    </>
  );
}
