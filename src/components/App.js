const React = require("react");
const { useState, useEffect } = React;
const QuestionList = require("./QuestionList");
const QuestionForm = require("./QuestionForm");

function App() {
  const [page, setPage] = useState("list");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((data) => setQuestions(data));
  }, []);

  function handleAddQuestion(newQuestion) {
    setQuestions([...questions, newQuestion]);
  }

  function handleDeleteQuestion(id) {
    setQuestions(questions.filter((q) => q.id !== id));
  }

  function handleUpdateQuestion(updatedQuestion) {
    setQuestions(
      questions.map((q) =>
        q.id === updatedQuestion.id ? updatedQuestion : q
      )
    );
  }

  return React.createElement(
    "main",
    null,
    React.createElement(
      "nav",
      null,
      React.createElement(
        "button",
        { onClick: () => setPage("list") },
        "View Questions"
      ),
      React.createElement(
        "button",
        { onClick: () => setPage("form") },
        "New Question"
      )
    ),
    page === "list"
      ? React.createElement(QuestionList, {
          questions: questions,
          onDelete: handleDeleteQuestion,
          onUpdate: handleUpdateQuestion,
        })
      : React.createElement(QuestionForm, {
          onAddQuestion: handleAddQuestion,
        })
  );
}

module.exports = App;
