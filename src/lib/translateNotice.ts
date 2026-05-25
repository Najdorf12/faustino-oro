import { translateText } from "./translate";

interface TranslateNoticeInput {
  title: string;
  description: string;
  content: string;
}

export async function translateNotice({
  title,
  description,
  content,
}: TranslateNoticeInput) {

  const [
    titleEn,
    descriptionEn,
    contentEn,
  ] = await Promise.all([
    translateText(title, "es", "en"),
    translateText(description, "es", "en"),
    translateText(content, "es", "en"),
  ]);

  return {
    titleEn,
    descriptionEn,
    contentEn,
  };
}