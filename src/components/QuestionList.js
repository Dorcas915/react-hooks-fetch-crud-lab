import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, onDeleteQuestion, onUpdateQuestion }) {
  const questionItems = questions.map((q) => (
    <QuestionItem
      key={q.id}
      question={q}
      onDelete={onDeleteQuestion}
      onUpdate={onUpdateQuestion}
    />
  ));

  return (
    <section>
      <h2>Questions</h2>
      <ul>{questionItems}</ul>
    </section>
  );
}

export default QuestionList;
