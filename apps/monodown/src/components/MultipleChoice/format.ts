export type Prompt = {
  type: "text";
  text: string;
  audio?: string;
  image?: string;
};

export type Choice = {
  id: string;
  text: string;
  audio?: string;
  image?: string;
};
