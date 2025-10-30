const React = require("react");
const { useState } = React;

function QuestionForm({ onAddQuestion }) {
  const [formData, setFormData] = useState({
    prompt: "",
    answers: ["", ""],
    correctIndex: 0,
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleAnswerChange(e, index) {
    const newAnswers = [...formData.answers];
    newAnswers[index] = e.target.value;
    setFormData({ ...formData, answers: newAnswers });
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((r) => r.json())
      .then((newQuestion) => onAddQuestion(newQuestion));
  }

  return React.createElement(
    "form",
    { onSubmit: handleSubmit },
    React.createElement("h2", null, "New Question Form"),
    React.createElement(
      "label",
      null,
      "Prompt:",
      React.createElement("input", {
        type: "text",
        name: "prompt",
        value: formData.prompt,
        onChange: handleChange,
      })
    ),
    React.createElement(
      "label",
      null,
      "Answer 1:",
      React.createElement("input", {
        type: "text",
        value: formData.answers[0],
        onChange: (e) => handleAnswerChange(e, 0),
      })
    ),
    React.createElement(
      "label",
      null,
      "Answer 2:",
      React.createElement("input", {
        type: "text",
        value: formData.answers[1],
        onChange: (e) => handleAnswerChange(e, 1),
      })
    ),
    React.createElement(
      "label",
      null,
      "Correct Answer:",
      React.createElement("select", {
        name: "correctIndex",
        value: formData.correctIndex,
        onChange: handleChange,
      },
        React.createElement("option", { value: 0 }, "Answer 1"),
        React.createElement("option", { value: 1 }, "Answer 2")
      )
    ),
    React.createElement("button", { type: "submit" }, "Add Question")
  );
}

module.exports = QuestionForm;
