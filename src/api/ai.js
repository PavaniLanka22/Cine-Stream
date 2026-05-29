const GEMINI_API_KEY =
  import.meta.env.VITE_GEMINI_API_KEY;

// fallback movie if AI fails
function fallbackMovie(prompt) {
  const lower = prompt.toLowerCase();

  if (
    lower.includes("sad") ||
    lower.includes("emotional")
  ) {
    return "Interstellar";
  }

  if (lower.includes("action")) {
    return "John Wick";
  }

  if (
    lower.includes("sci") ||
    lower.includes("space")
  ) {
    return "Blade Runner 2049";
  }

  if (lower.includes("romantic")) {
    return "Titanic";
  }

  return "Inception";
}

export async function getMovieFromMood(
  moodPrompt
) {
  try {
    // fallback if no key
    if (!GEMINI_API_KEY) {
      console.warn(
        "Missing Gemini API Key"
      );

      return fallbackMovie(
        moodPrompt
      );
    }

    
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `
Suggest ONE movie title based on this mood.

ONLY return the movie title.

Mood:
${moodPrompt}
                  `,
                },
              ],
            },
          ],
        }),
      }
    );

    const data =
      await response.json();

    console.log(
      "Gemini Response:",
      data
    );

    // fallback if bad response
    if (!response.ok) {
      console.error(
        "Gemini API Error:",
        data
      );

      return fallbackMovie(
        moodPrompt
      );
    }

    let movie =
      data?.candidates?.[0]
        ?.content?.parts?.[0]?.text;

    // fallback if empty
    if (!movie) {
      return fallbackMovie(
        moodPrompt
      );
    }

    movie = movie
      .replace(/["']/g, "")
      .replace(/\n/g, "")
      .replace(/Movie:/gi, "")
      .trim();

    console.log(
      "Final Movie:",
      movie
    );

    return movie;
  } catch (err) {
    console.error(
      "Gemini Error:",
      err
    );

    return fallbackMovie(
      moodPrompt
    );
  }
}