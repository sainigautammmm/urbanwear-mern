import React, { useState } from "react";
import axios from "axios";

function AIStylist() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async (text = message) => {
    if (!text.trim()) return;
    setLoading(true);
    setReply("");
    try {
      const { data } = await axios.post("http://localhost:8000/api/ai-stylist", { message: text });
      setReply(data.reply);
    } catch (error) {
      setReply("AI Stylist se connection nahi ho paaya. Backend check karke dobara try karo.");
    } finally {
      setLoading(false);
    }
  };

  const suggestions = [
    "Black jeans ke saath kya pehnu?",
    "Party ke liye outfit suggest karo",
    "Casual outfit under ₹2000"
  ];

  return (
    <div className="container py-5" style={{ maxWidth: 850 }}>
      <div className="text-center mb-4">
        <h1 className="fw-bold">✨ AI Fashion Stylist</h1>
        <p className="text-muted">Apne occasion, color ya budget ke baare mein poochho.</p>
      </div>
      <div className="d-flex flex-wrap gap-2 justify-content-center mb-4">
        {suggestions.map((item) => (
          <button key={item} className="btn btn-outline-dark btn-sm" onClick={() => { setMessage(item); askAI(item); }}>
            {item}
          </button>
        ))}
      </div>
      <div className="card shadow-sm border-0">
        <div className="card-body p-4">
          <textarea
            className="form-control mb-3"
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Example: White shirt ke saath kaunsi pants achhi rahegi?"
          />
          <button className="btn btn-dark w-100" disabled={loading || !message.trim()} onClick={() => askAI()}>
            {loading ? "Stylist soch raha hai..." : "Ask AI Stylist"}
          </button>
          {reply && (
            <div className="alert alert-light border mt-4 mb-0">
              <strong>AI Stylist:</strong>
              <p className="mb-0 mt-2" style={{ whiteSpace: "pre-wrap" }}>{reply}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AIStylist;
