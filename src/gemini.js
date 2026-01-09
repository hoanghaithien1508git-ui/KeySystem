import fetch from "node-fetch";

export async function signToken(payload) {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text:
              "Generate a short secure auth token (max 64 chars) for this payload:\n" +
              JSON.stringify(payload)
          }]
        }]
      })
    }
  );

  const data = await res.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || null;
}
