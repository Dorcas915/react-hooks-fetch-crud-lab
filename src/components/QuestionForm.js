import React, { useState } from "react";

function QuestionForm({ onAddQuestion }) {
  const [formData, setFormData] = useState({
    prompt: "",
    answer1: "",
    answer2: "",
    correctIndex: 0,
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newQuestion = {
      prompt: formData.prompt,
      answers: [formData.answer1, formData.answer2],
      correctIndex: parseInt(formData.correctIndex),
    };

    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newQuestion),
    })
      .then((r) => r.json())
      .then((data) => onAddQuestion(data));
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>New Question</h2>

      <label>
        Prompt
        <input
          type="text"
          name="prompt"
          value={formData.prompt}
          onChange={handleChange}
        />
      </label>

      <label>
        Answer 1
        <input
          type="text"
          name="answer1"
          value={formData.answer1}
          onChange={handleChange}
        />
      </label>

      <label>
        Answer 2
        <input
          type="text"
          name="answer2"
          value={formData.answer2}
          onChange={handleChange}
        />
      </label>

      <label>
        Correct Answer
        <select
          name="correctIndex"
          value={formData.correctIndex}
          onChange={handleChange}
        >
          <option value="0">Answer 1</option>
          <option value="1">Answer 2</option>
        </select>
      </label>

      <button type="submit">Add Question</button>
    </form>
  );
}

export default QuestionForm;
