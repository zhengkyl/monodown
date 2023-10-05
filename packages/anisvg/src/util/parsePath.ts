// Based on https://github.com/jkroso/parse-svg-path/tree/master
// but simplified b/c I don't need command data

const segmentRe = /([mlhvcsqtaz])([^mlhvcsqtaz]*)/gi;

const numberRe = /-?\d*\.?\d+(?:e[-+]?\d+)?/gi;

export function parsePath(path: string) {
  const data = [];
  const matches = path.matchAll(segmentRe);
  for (const match of matches) {
    const numbers = match[2].match(numberRe) ?? [];
    data.push([match[1], ...numbers.map(parseFloat)]);
  }
  // console.log("parsePath", path, data);
  return data;
}

// tween parsed paths from parsePath()
export function getTweenedPath(pp1, pp2, t) {
  let str = "";
  if (pp1.length !== pp2.length)
    throw new Error("Tween paths have different number of points");
  for (let i = 0; i < pp1.length; i++) {
    if (pp1[i].length !== pp2[i].length)
      throw new Error("Tween paths have different commands");

    str += pp1[i][1]; // first is command
    for (let j = 1; j < pp1[i].length; j++) {
      const num = pp1[i][j] + t * (pp2[i][j] - pp1[i][j]);
      // not following letter and not negative
      if (j > 1 && num > 0) {
        str += " ";
      }
      str += num;
    }
  }

  return str;
}
