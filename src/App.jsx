import React, { useState } from "react";
import QRCode from "react-qr-code";

const App = () => {
  const [input, setInput] = useState("");
  const [qrGenerated, setQrGenerated] = useState(false);

  const handleGenerate = () => {
    if (input) {
      setQrGenerated(true);
    }
  };

  const handleDownload = () => {
    const svg = document.querySelector("svg");
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0);
        const url = canvas.toDataURL("image/png");

        const a = document.createElement("a");
        a.href = url;
        a.download = "qrcode.png";
        a.click();
      };

      img.src =
        "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgData);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg sm:max-w-md text-center border-animation">
        <h1 className="text-3xl font-bold text-blue-500 mb-6">
          QR Code Generator
        </h1>
        <input
          type="url"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text or URL for QR Code"
          className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="mt-5 flex flex-col items-center">
          {
            qrGenerated? (
              <div className="w-48 h-48 bg-gray-200 flex items-center justify-center shadow-md">
                <QRCode value={input} size={200} />
              </div>
            ) : (
              <div className="w-48 h-48 bg-gray-200 flex items-center justify-center shadow-md">
                <span>QR Code Preview</span>
              </div>
            )
            
          }
        </div>
        <button
          className="w-full mt-8 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          onClick={handleGenerate}
          disabled={!input}
        >
          Generate QR Code
        </button>
        <button
          className="w-full mt-5 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
          onClick={handleDownload}
          disabled={!qrGenerated}
        >
          Download QR Code
        </button>
        {/* Link to credit the developer */}
        <div className="mt-6 text-sm text-gray-500">
          <a href="https://www.facebook.com/softdevjowel" target="_blank" rel="noopener noreferrer">
            Developed by Muhammad Jowel
          </a>
        </div>
      </div>
    </div>
  );
};

export default App;
