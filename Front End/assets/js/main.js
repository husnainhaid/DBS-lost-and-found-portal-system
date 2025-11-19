// LOST REPORT SUBMIT HANDLER
document.getElementById("lostItemForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const data = Object.fromEntries(form.entries());

});
