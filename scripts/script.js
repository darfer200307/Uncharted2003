// Check if browser supports service workers
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js") // Path to your service worker file
      .then((registration) => {
        console.log("✅ Service Worker registered with scope:", registration.scope);
      })
      .catch((error) => {
        console.log("❌ Service Worker registration failed:", error);
      });
  });
}
