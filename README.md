<h1 align="center"><a href="https://message-editor.nikolab131.xyz/">Message editor</a></h1>

Message editor with support for variables and flexible nested conditions.

## Usage

> The project is under development so some things can be difficult to use.

### Variables

- If you click on variable then it will be inserted in the place where your cursor is.

- By default, 4 variables are available: firstname, lastname, company, position.\
You can replace these variables with your own. To do this, specify them as an array with the key "arrVarNames" in localStorage.

- Example:
  ```
  arrVarNames - ["salary", "age"]
  ```

> Due to the fact that the variables are stored in localStorage, they will not disappear when the tab is closed.

### Preview

- You can preview message and interact with variables if you click "Preview" button.

- When variables change, the condition sections are recalculated and the message is changed in real time.

### Condition sections

- To create new condition section select textarea and click "IF | THEN | ELSE" button. During this, if your cursor was in the middle of the text in textarea, then the text will split.

- Section can be created at any textarea.

- How they work: if the calculated string in "IF" block is not empty, then "THEN" block will be executed, otherwise the "ELSE" block will be executed.

### Save template

- To save current template to localStorage click the 'Save' button.

> Saved template will not disappear when you reload or close tab.

## Features

- Data is stored in a tree and can be serialized to JSON
- Tests
- CI/CD
- Personal hosting

## Build with

- React
- Typescript
- CSS Modules
- Jest
- Stylelint
- ESLint

## Installation

1. Clone repository
```bash
git clone https://github.com/NikolaB131-org/Message-editor.git
```

2. Navigate to the project folder
```bash
cd Message-editor
```

3. Install dependencies
```bash
npm i
```

## How to run

Run in dev mode
```bash
npm start
```

The project will start on: http://localhost:3000

## Other commands

Build production version
```bash
npm run build
```

Run tests
```bash
npm test
```

Run stylelint (with --fix flag)
```bash
npm run lint
```
