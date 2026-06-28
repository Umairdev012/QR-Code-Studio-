const input = document.getElementById("qrInput");
const generateBtn = document.getElementById("generateBtn");
const downloadBtn = document.getElementById("downloadBtn");
const clearBtn = document.getElementById("clearBtn");

const qrImage = document.getElementById("qrImage");
const placeholder = document.getElementById("placeholder");

let currentQR = "";

// ===============================
// Generate QR Code
// ===============================

generateBtn.addEventListener("click", generateQRCode);

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        generateQRCode();
    }
});

function generateQRCode() {

    const text = input.value.trim();

    if (!text) {
        alert("Please enter text or a URL.");
        input.focus();
        return;
    }

    generateBtn.disabled = true;
    generateBtn.innerHTML =
        '<i class="fa-solid fa-spinner fa-spin"></i> Generating...';

    const url =
        "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=" +
        encodeURIComponent(text);

    const img = new Image();

    img.onload = () => {

        currentQR = url;

        qrImage.src = url;
        qrImage.style.display = "block";

        placeholder.style.display = "none";

        generateBtn.disabled = false;
        generateBtn.innerHTML =
            '<i class="fa-solid fa-wand-magic-sparkles"></i> Generate';

    };

    img.onerror = () => {

        alert("Unable to generate QR Code.");

        generateBtn.disabled = false;
        generateBtn.innerHTML =
            '<i class="fa-solid fa-wand-magic-sparkles"></i> Generate';

    };

    img.src = url;
}

// ===============================
// Download
// ===============================

downloadBtn.addEventListener("click", () => {

    if (!currentQR) {
        alert("Generate a QR Code first.");
        return;
    }

    const link = document.createElement("a");

    link.href = currentQR;
    link.download = "qr-code.png";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

});

// ===============================
// Clear
// ===============================

clearBtn.addEventListener("click", () => {

    input.value = "";

    qrImage.src = "";
    qrImage.style.display = "none";

    placeholder.style.display = "block";

    currentQR = "";

    input.focus();

});