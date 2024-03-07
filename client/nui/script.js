window.addEventListener("message", (event) => {
    const item = event.data;
    if (item.type === "openDialog") {
        document.getElementById("title").innerText = item.title;
        document.getElementById("input").placeholder = item.description;
        const form = document.getElementById("form");
        form.style.display = "flex";

        document.getElementById("submit").addEventListener("click", function () {
            const result = document.getElementById("input").value;
            sendDialog(item.title, result);
            form.style.display = "none";
        });

        document.getElementById("cancel").addEventListener("click", function () {
            sendDialog(item.title, null);
            form.style.display = "none";
        });
    } else if (item.type === "closeDialog") {
        document.getElementById("dialog").style.display = "none";
    }
});

function sendDialog(title, result) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://foltone_dialog/sendDialog");
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify({ title, result }));
}
