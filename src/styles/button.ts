// 4px is button depth

export const buttonBase =
  `inline-flex justify-center items-center vertical-middle rounded-lg font-semibold shadow-[0_4px_0_var(--un-shadow-color)] mb-[4px] transition-all duration-0 ease-out select-none` +
  ` disabled:(shadow-none translate-y-[4px] pointer-events-none)`;

export const buttonActive = `shadow-none translate-y-[4px]`;

export const btnFill = ([, color]) =>
  buttonBase +
  ` bg-${color}-500 shadow-${color}-600 text-white` +
  ` @hover:(bg-opacity-90 shadow-opacity-90)` +
  ` disabled:(bg-stone-200 text-stone-400)`;

export const btnLine = ([, color]) =>
  buttonBase +
  ` border-2 shadow-stone-200 border-stone-200 dark:text-white` +
  ` @hover:(bg-${color}-50/10 shadow-${color}-500 border-${color}-500 text-${color}-600)` +
  ` disabled:(bg-stone-100 text-stone-400)`;

export const btnLineActive = ([, color]) =>
  `bg-${color}-50 shadow-${color}-500 border-${color}-500 text-${color}-600`;
