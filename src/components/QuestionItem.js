const React = require("react");

function QuestionItem({ question, onDelete, onUpdate }) {
  const { id, prompt, answers, correctIndex } = question;

  function handleDeleteClick() {
    fetch(`http://localhost:4000/questions/${id}`, { method: "DELETE" })
      .then(() => onDelete(id));
  }

  function handleCorrectAnswerChange(e) {
    const newCorrectIndex = parseInt(e.target.value);
    onUpdate({ ...question, correctIndex: newCorrectIndex });

    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex: newCorrectIndex }),
    })
      .then((r) => r.json())
      .then((updated) => onUpdate(updated));
  }

  return React.createElement(
    "li",
    null,
    React.createElement("h4", null, `Question ${id}`),
    React.createElement("p", null, prompt),
    React.createElement(
      "ul",
      null,
      answers.map((a, i) =>
        React.createElement(
          "li",
          {
            key: i,
            style: { fontWeight: i === correctIndex ? "bold" : "normal" },
          },
          a
        )
      )
    ),
    React.createElement(
      "label",
      null,
      "Correct Answer:",
      React.createElement(
        "select",
        { value: correctIndex, onChange: handleCorrectAnswerChange },
        answers.map((a, i) =>
          React.createElement("option", { key: i, value: i }, a)
        )
      )
    ),
    React.createElement(
      "button",
      { onClick: handleDeleteClick },
      "Delete Question"
    )
  );
}

module.exports = QuestionItem;
