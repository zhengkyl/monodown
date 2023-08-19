export type TextPrompt = {
  type: "text";
  text: string;
  audio?: string;
  image?: string;
};

export type AudioPrompt = {
  type: "audio";
  text: string;
  audio: string;
};

export type ImagePrompt = {
  type: "image";
  text: string;
  image: string;
};

export type TextChoice = {
  id: string;
  text: string;
  audio?: string;
};

export type ImageChoice = {
  id: string;
  text: string;
  audio?: string;
  image: string;
};

export type Prompt = TextPrompt | AudioPrompt | ImagePrompt;
export type Choice = TextChoice | ImageChoice;
