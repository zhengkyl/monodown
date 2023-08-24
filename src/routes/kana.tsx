import { For } from "solid-js";
import { createStore } from "solid-js/store";
import { Button } from "~/components/ui/Button";

const mainKana = {
  "あ/a": [
    { hira: "あ", kata: "ア", type: ["a"] },
    { hira: "い", kata: "イ", type: ["i"] },
    { hira: "う", kata: "ウ", type: ["u"] },
    { hira: "え", kata: "エ", type: ["e"] },
    { hira: "お", kata: "オ", type: ["o"] },
  ],
  "か/ka": [
    { hira: "か", kata: "カ", type: ["ka"] },
    { hira: "き", kata: "キ", type: ["ki"] },
    { hira: "く", kata: "ク", type: ["ku"] },
    { hira: "け", kata: "ケ", type: ["ke"] },
    { hira: "こ", kata: "コ", type: ["ko"] },
  ],
  "さ/sa": [
    { hira: "さ", kata: "サ", type: ["sa"] },
    { hira: "し", kata: "シ", type: ["shi", "si"] },
    { hira: "す", kata: "ス", type: ["su"] },
    { hira: "せ", kata: "セ", type: ["se"] },
    { hira: "そ", kata: "ソ", type: ["so"] },
  ],
  "た/ta": [
    { hira: "た", kata: "タ", type: ["ta"] },
    { hira: "ち", kata: "チ", type: ["chi", "ti"] },
    { hira: "つ", kata: "ツ", type: ["tsu", "tu"] },
    { hira: "て", kata: "テ", type: ["te"] },
    { hira: "と", kata: "ト", type: ["to"] },
  ],
  "な/na": [
    { hira: "な", kata: "ナ", type: ["na"] },
    { hira: "に", kata: "ニ", type: ["ni"] },
    { hira: "ぬ", kata: "ヌ", type: ["nu"] },
    { hira: "ね", kata: "ネ", type: ["ne"] },
    { hira: "の", kata: "ノ", type: ["no"] },
  ],
  "は/ha": [
    { hira: "は", kata: "ハ", type: ["ha"] },
    { hira: "ひ", kata: "ヒ", type: ["hi"] },
    { hira: "ふ", kata: "フ", type: ["fu", "hu"] },
    { hira: "へ", kata: "ヘ", type: ["he"] },
    { hira: "ほ", kata: "ホ", type: ["ho"] },
  ],
  "ま/ma": [
    { hira: "ま", kata: "マ", type: ["ma"] },
    { hira: "み", kata: "ミ", type: ["mi"] },
    { hira: "む", kata: "ム", type: ["mu"] },
    { hira: "め", kata: "メ", type: ["me"] },
    { hira: "も", kata: "モ", type: ["mo"] },
  ],
  "や/ya": [
    { hira: "や", kata: "ヤ", type: ["ya"] },
    { hira: "ゆ", kata: "ユ", type: ["yu"] },
    { hira: "よ", kata: "ヨ", type: ["yo"] },
  ],
  "ら/ra": [
    { hira: "ら", kata: "ラ", type: ["ra"] },
    { hira: "り", kata: "リ", type: ["ri"] },
    { hira: "る", kata: "ル", type: ["ru"] },
    { hira: "れ", kata: "レ", type: ["re"] },
    { hira: "ろ", kata: "ロ", type: ["ro"] },
  ],
  "わ/wa": [
    { hira: "わ", kata: "ワ", type: ["wa"] },
    { hira: "を", kata: "ヲ", type: ["wo"] },
    { hira: "ん", kata: "ン", type: ["n", "nn"] },
  ],
};

const dakutenKana = {
  "が/ga": [
    { hira: "が", kata: "ガ", type: ["ga"] },
    { hira: "ぎ", kata: "ギ", type: ["gi"] },
    { hira: "ぐ", kata: "グ", type: ["gu"] },
    { hira: "げ", kata: "ゲ", type: ["ge"] },
    { hira: "ご", kata: "ゴ", type: ["go"] },
  ],
  "ざ/za": [
    { hira: "ざ", kata: "ザ", type: ["za"] },
    { hira: "じ", kata: "ジ", type: ["ji", "zi"] },
    { hira: "ず", kata: "ズ", type: ["zu"] },
    { hira: "ぜ", kata: "ゼ", type: ["ze"] },
    { hira: "ぞ", kata: "ゾ", type: ["zo"] },
  ],
  "だ/da": [
    { hira: "だ", kata: "ダ", type: ["da"] },
    { hira: "ぢ", kata: "ヂ", type: ["di"] },
    { hira: "づ", kata: "ヅ", type: ["du"] },
    { hira: "で", kata: "デ", type: ["de"] },
    { hira: "ど", kata: "ド", type: ["do"] },
  ],
  "ば/ba": [
    { hira: "ば", kata: "バ", type: ["ba"] },
    { hira: "び", kata: "ビ", type: ["bi"] },
    { hira: "ぶ", kata: "ブ", type: ["bu"] },
    { hira: "べ", kata: "ベ", type: ["be"] },
    { hira: "ぼ", kata: "ボ", type: ["bo"] },
  ],
  "ぱ/pa": [
    { hira: "ぱ", kata: "パ", type: ["pa"] },
    { hira: "ぴ", kata: "ピ", type: ["pi"] },
    { hira: "ぷ", kata: "プ", type: ["pu"] },
    { hira: "ぺ", kata: "ペ", type: ["pe"] },
    { hira: "ぽ", kata: "ポ", type: ["po"] },
  ],
};

export default function Kana() {
  const [mainActive, setMainActive] = createStore(
    Object.fromEntries(Object.keys(mainKana).map((key) => [key, false]))
  );
  const [dakutenActive, setDakutenActive] = createStore(
    Object.fromEntries(Object.keys(dakutenKana).map((key) => [key, false]))
  );

  return (
    <main>
      <div class="grid grid-cols-2 gap-4">
        <Button
          size="md"
          class="btn-line-indigo col-span-2"
          classList={{
            "btn-line-indigo-active": Object.values(mainActive).every(
              (value) => value
            ),
          }}
          onClick={() => {
            if (Object.values(mainActive).every((value) => value)) {
              setMainActive(
                Object.fromEntries(
                  Object.keys(mainKana).map((key) => [key, false])
                )
              );
            } else {
              setMainActive(
                Object.fromEntries(
                  Object.keys(mainKana).map((key) => [key, true])
                )
              );
            }
          }}
        >
          Main Kana
        </Button>
        <For each={Object.keys(mainKana)}>
          {(key) => (
            <Button
              size="md"
              class="btn-line-indigo"
              classList={{ "btn-line-indigo-active": mainActive[key] }}
              onClick={() => setMainActive(key, !mainActive[key])}
            >
              {key}
            </Button>
          )}
        </For>
      </div>
    </main>
  );
}
