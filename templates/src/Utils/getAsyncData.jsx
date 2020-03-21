export default async function getAsyncData(url) {
  try {
    let response = await fetch(url, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return response.json();
  } catch {
    return null;
  }
}
