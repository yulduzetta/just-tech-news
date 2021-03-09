async function handleLogout() {
  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    document.location.replace("/");
  } else {
    alert.response(response.statusText);
  }
}

document.querySelector("#logout").addEventListener("click", handleLogout);
