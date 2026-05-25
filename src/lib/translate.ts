// lib/translate.ts

export async function translateText(
  text: string,
  from: "es" | "en",
  to: "es" | "en"
): Promise<string> {

  if (!text?.trim()) return text;

  try {

    const url =
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${from}|${to}`;

    const res = await fetch(url);

    const data = await res.json();

    return (
      data?.responseData?.translatedText ||
      text
    );

  } catch (error) {

    console.error("Translation failed:", error);

    return text;
  }
}