console.log('Good use!!')

if ("serviceWorker" in navigator) {
    window.addEventListener("load", async () => {
        try {
            const reg = await navigator.serviceWorker.register("./sw.js");
            console.log("SW registered:", reg);
        } catch (err) {
            console.error("SW failed:", err);
        }
    });
}