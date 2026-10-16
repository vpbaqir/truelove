# Prompt Pantry — Local Prompt Library

Save reusable prompts, fill named placeholders, and copy a ready-to-use prompt into the AI service of your choice. This app organizes prompts; it does not call an AI model.

## Run
Open `index.html` in a modern browser. No dependencies or API key are required.

## Features
- Create, edit, search, and delete prompt templates.
- Detect `{{variable}}` placeholders and generate fill-in fields.
- Live preview and copy action.
- JSON export and import; duplicate titles are skipped.
- Responsive layout and local persistence.

## Privacy
Templates remain in browser `localStorage` unless exported. Nothing is sent to a server. Avoid saving secrets or private data inside prompts.

## Limitations
No AI generation, cloud sync, accounts, or collaboration. Clipboard access depends on browser permissions.