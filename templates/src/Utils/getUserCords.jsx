export default async function getUserCords(userLocation) {
  try {
    let response = await fetch("/geocode-address", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userLocation })
    });
    return response.json();
  } catch {
    let response = { distance: "N/A", duration: " N/A" };
    return response;
  }
}
