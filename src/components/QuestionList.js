const React = require("react");
const QuestionItem = require("./QuestionItem");

function QuestionList({ questions, onDelete, onUpdate }) {
  return React.createElement(
    "section",
    null,
    React.createElement("h1", null, "Question List"),
    React.createElement(
      "ul",
      null,
      questions.map((q) =>
        React.createElement(QuestionItem, {
          key: q.id,
          question: q,
          onDelete: onDelete,
          onUpdate: onUpdate,
        })
      )
    )
  );
}

module.exports = QuestionList;
