// https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export function randomNChoices(answer, wrongs, n) {
  shuffleArray(wrongs);
  const choices = wrongs.slice(0, n - 1);
  choices.splice(Math.floor(Math.random() * n), 0, answer);

  return choices;
}
