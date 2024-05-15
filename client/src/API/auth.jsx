export async function signin(credentials) {
  const response = await fetch("/api/auth", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const body = await response.json();
  if (response.ok) {
    return body;
  } else {
    if (body) {
      throw body;
    } else {
      throw new Error("Erreur lors de l'authentification");
    }
  }
}
