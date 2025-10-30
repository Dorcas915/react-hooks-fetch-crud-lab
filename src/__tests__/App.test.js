const React = require("react");
require("whatwg-fetch");
const {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} = require("@testing-library/react");
require("@testing-library/jest-dom/extend-expect");
const { server } = require("../mocks/server");
const App = require("../components/App");

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("displays question prompts after fetching", async () => {
  render(React.createElement(App));
  fireEvent.click(screen.queryByText(/View Questions/));
  expect(await screen.findByText(/lorem testum 1/g)).toBeInTheDocument();
  expect(await screen.findByText(/lorem testum 2/g)).toBeInTheDocument();
});

test("creates a new question when the form is submitted", async () => {
  render(React.createElement(App));
  await screen.findByText(/lorem testum 1/g);
  fireEvent.click(screen.queryByText("New Question"));
  fireEvent.change(screen.queryByLabelText(/Prompt/), {
    target: { value: "Test Prompt" },
  });
  fireEvent.change(screen.queryByLabelText(/Answer 1/), {
    target: { value: "Test Answer 1" },
  });
  fireEvent.change(screen.queryByLabelText(/Answer 2/), {
    target: { value: "Test Answer 2" },
  });
  fireEvent.change(screen.queryByLabelText(/Correct Answer/), {
    target: { value: "1" },
  });
  fireEvent.submit(screen.queryByText(/Add Question/));
  fireEvent.click(screen.queryByText(/View Questions/));
  expect(await screen.findByText(/Test Prompt/g)).toBeInTheDocument();
});

test("deletes the question when the delete button is clicked", async () => {
  const { rerender } = render(React.createElement(App));
  fireEvent.click(screen.queryByText(/View Questions/));
  await screen.findByText(/lorem testum 1/g);
  fireEvent.click(screen.queryAllByText("Delete Question")[0]);
  await waitForElementToBeRemoved(() => screen.queryByText(/lorem testum 1/g));
  rerender(React.createElement(App));
  await screen.findByText(/lorem testum 2/g);
  expect(screen.queryByText(/lorem testum 1/g)).not.toBeInTheDocument();
});

test("updates the answer when the dropdown is changed", async () => {
  const { rerender } = render(React.createElement(App));
  fireEvent.click(screen.queryByText(/View Questions/));
  await screen.findByText(/lorem testum 2/g);
  fireEvent.change(screen.queryAllByLabelText(/Correct Answer/)[0], {
    target: { value: "3" },
  });
  expect(screen.queryAllByLabelText(/Correct Answer/)[0].value).toBe("3");
  rerender(React.createElement(App));
  expect(screen.queryAllByLabelText(/Correct Answer/)[0].value).toBe("3");
});
