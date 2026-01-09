const chat = document.getElementById("chat");
const input = document.getElementById("input");
const send = document.getElementById("send");

send.onclick = sendMessage;
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
});

async function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    // User message
    chat.innerHTML += `
        <div class="text-right mb-2 message">
            <span class="bg-cyan-400 text-black p-2 rounded inline-block">
                ${text}
            </span>
        </div>
    `;
    input.value = "";
    chat.scrollTop = chat.scrollHeight;

    // Typing indicator
    const typingDiv = document.createElement("div");
    typingDiv.className = "typing text-zinc-400 mb-2 message";
    typingDiv.innerHTML = `
        Kage is typing<span>.</span><span>.</span><span>.</span>
    `;
    chat.appendChild(typingDiv);
    chat.scrollTop = chat.scrollHeight;

    try {
        const res = await fetch("http://127.0.0.1:5000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: text })
        });

        const data = await res.json();
        typingDiv.remove();

        // Bot reply
        chat.innerHTML += `
            <div class="mb-2 message">
                <span class="bg-zinc-800 p-2 rounded inline-block">
                    ${data.reply}
                </span>
            </div>
        `;
        chat.scrollTop = chat.scrollHeight;

    } catch (err) {
        typingDiv.remove();
        chat.innerHTML += `
            <div class="mb-2 message text-red-400">
                ⚠️ Kage could not respond
            </div>
        `;
    }
}
