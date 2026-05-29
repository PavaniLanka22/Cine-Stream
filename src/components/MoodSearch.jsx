import { useState } from "react";

function MoodSearch({ onMoodSearch }) {
  const [mood, setMood] = useState("");

  return (
    <div style={{ marginTop: "20px" }}>
      <input
        value={mood}
        onChange={(e) => setMood(e.target.value)}
        placeholder="Describe your mood..."
      />

      <button onClick={() => onMoodSearch(mood)}>
        AI Match
      </button>
    </div>
  );
}

export default MoodSearch;