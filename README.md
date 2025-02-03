# Zip2LLM - Codebase to LLM Context Converter 🚀

**Effortlessly Prepare Your Code Projects for Large Language Models.**

---

Feed your codebase to an LLM for code generation, analysis, or understanding. Zip2LLM is a simple, open-source web tool designed to convert zipped codebases into a structured, text-based format that is optimized for Large Language Models (LLMs).

**Example Output**

Imagine you zip a simple project folder named `my-project` containing these files:

```
my-project.zip
├── index.html
├── script.js
└── style.css
```

Zip2LLM will produce the following structured text output:

```text
index.html
```html
<!DOCTYPE html>
<html>
<head>
    <title>My Project</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Welcome!</h1>
    <script src="script.js"></script>
</body>
</html>```

script.js
```javascript
console.log("Hello from JavaScript!");```

style.css
```css
body {
    font-family: sans-serif;
}```
```

You can directly copy and paste this output into your LLM prompt!

Try the Live Demo!

Want to quickly test out Zip2LLM? Access the live demo directly in your browser:

[👉 Zip2LLM Live Demo 👈](https://adrianv425.github.io/zip2llm/)

No installation required! Simply visit the link above to upload your zip file and see Zip2LLM in action.

**Key Features**

*   **Zip File Input:** Accepts `.zip` archives of your codebase.
*   **Structured Text Output:** Creates a single, copyable text output.
*   **Relative File Paths:** Includes file paths within the zip structure for context.
*   **Fenced Code Blocks:** Uses Markdown fenced code blocks (``` ```) for code content.
*   **Language Detection:** Automatically detects and applies language tags for syntax highlighting in code blocks (e.g., ```javascript, ```python, ```html).
*   **File Statistics:** Displays a summary of processed files and language distribution.
*   **Clear & Copy Buttons:** Easy UI actions for clearing output and copying to clipboard.
*   **Error Handling:**  Handles invalid zip files and file reading errors gracefully.

**Getting Started - Quick Setup**

1.  **Clone the Repository:**

    ```bash
    git clone https://github.com/adrianv425/zip2llm.git
    cd zip2llm
    ```

2.  **Install Dependencies:**

    ```bash
    npm install
    ```

3.  **Run the Application:**

    ```bash
    npm start
    ```
    Open your browser and navigate to `http://localhost:3000`.

**How to Use**

1.  **Upload Zip File:** Click "Upload Zip File" and select your codebase's `.zip` archive.
2.  **View Structured Output:** The formatted text will be displayed below.
3.  **Copy to LLM:** Click the "Copy" button and paste the output into your LLM prompt before your code-related instructions.
4.  **Optional: Review Statistics:** Check the "Statistics" section for file and language counts.
5.  **Clear for Next Zip:** Use "Clear" to reset the output for processing a new project.

**Ideal Use Cases**

*   **Code Generation:** Provide project context to LLMs for more accurate and relevant code completion or generation within your project's structure.
*   **Code Analysis & Explanation:** Help LLMs understand the relationships between files in your project for better code analysis, bug finding, or explanation tasks.
*   **Learning & Documentation:** Use LLMs to explore and understand new codebases by providing a structured overview.

**Contributing - Open to Collaboration! 🤝**

Zip2LLM thrives on community contributions! We welcome your help in making this tool even more powerful and user-friendly.

**Contribution Guidelines:**

*   **Fork and Branch:** Fork the repository and create a feature or bug-fix branch.
*   **Code Style:** Maintain the existing code style and UI aesthetic. Use CSS variables in `src/App.css` for styling.
*   **Testing:**  Ensure your changes are well-tested and don't introduce regressions.
*   **Pull Requests:** Submit pull requests to the `main` branch with a clear description of your changes.

**Contribution Ideas**

*   **Expand Language Support:**  Add detection for more programming languages in `src/utils.js`.
*   **File Filtering:** Implement options to include/exclude files based on patterns.
*   **Line Numbers:** Add an option to include line numbers in output code blocks.
*   **Progress Bar:** Implement progress indication for large zip files.
*   **Performance Improvements:** Optimize for handling very large zip files.
*   **UI/UX Enhancements:** Suggest and implement UI/UX improvements.

**License**

[MIT License](LICENSE)

**Let's make working with code and LLMs more intuitive! Happy contextualizing!** 🎉
