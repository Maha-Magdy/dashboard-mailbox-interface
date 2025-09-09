## Icons
I created a small library to serve as the single source of truth for icons. This helps us avoid using different icons or inconsistent methods whenever an icon is needed.

### instruction to add icon, and use it
1. Add the SVG path of the icon to the icons/icons.ts file as a new object in the icons array. Be sure to include its name and viewBox.

2. To use the icons, `run npm run generate-icons` in the terminal after every change to the icons file. Alternatively, you can keep the watcher running with `npm run watch-icons` while working.

3. Use the icon across the application by calling it as a component. The component name will follow this format: iconName + Icon (e.g., DashboardIcon).

<a name="dashboard-mailbox-interface"></a>

# Dashboard Mailbox Interface

<a name="about"></a>

## About

**Mailbox Interface** is a key feature within the dashboard, designed to streamline internal communication. It allows users to receive emails directly in their inbox, compose and send messages to colleagues, view email content, delete messages, and mark emails as read. This feature integrates seamlessly with the dashboard, providing an intuitive and efficient way for users to manage their communications within the organization.

![screenshot](./app_screenshot_1.png)
![screenshot](./app_screenshot_2.png)

## Table of contents

- [Dashboard Mailbox Interface](#dashboard-mailbox-interface)
  - [About](#about)
  - [Table of contents](#table-of-contents)
  - [Features](#features)
  - [Getting Started](#getting-started)
  - [Demo](#demo)
  - [Examples](#examples)
  - [Contributing](#contributing)
  - [Acknowledgments](#acknowledgments)
  - [License](#license)
  - [Show your support](#show-your-support)

<a name="features"></a>

## Features

* **Login**: A secure login page with a simple form for email and password. When the entered credentials match the mock data, the user is redirected to the Dashboard, where their inbox emails are displayed. All internal routes are protected and accessible only to authenticated users with valid credentials.

* **Mailbox**
The mailbox interface allows users to view their inbox and sent emails. Users can delete emails, mark unread emails as read, and interact with messages directly. The UI is built to support future extensions, including highlighting emails, sorting them into important folders, managing drafts, and adding categories or labels.

* **Compose Email**
Users can create and send new emails through the Compose feature. It can be accessed from the Compose Email button in the mailbox main page, which opens a modal for quick email drafting, or from the navigation menu under the mailbox feature, which provides a full dedicated page. Both options allow users to enter recipient details, subject, and message content before sending.

* **View Email**
Users can open and read individual emails in detail. The View Email page displays the email subject, sender and recipient information, and the full body of the message. From this view, users can also delete the email or mark it as read, ensuring better inbox management.

* **Email Management Actions**
The mailbox includes essential tools for managing emails efficiently. Users can delete emails, mark unread emails as read,


<a name="getting_started"></a>


## Getting Started 

To get start with WYSIWYG Editor, This guide will help you quickly set up and use it. It's a React component that relies on the Draft.js library for its core editing features.

1. Quick Start
To get a feel for the editor and explore the provided examples:
- **Clone the project**: Download the project files to your local machine.
- **Install dependencies**: Navigate to the project directory in your terminal and run `npm install`. This command installs all the necessary Node.js modules.
- **Run the development server**: After installation, execute npm dev to start a local server. You can then open your browser and test the examples provided in the **app.tsx** file.

2. Using it in Your Own Project
To integrate the WYSIWYG Editor into your existing project:
- **Copy the component**: Simply copy the wysiwyg-editor folder from the components directory into your project.
- **Integrate and use**: Refer to the examples provided in the project for guidance on how to use the component in your own application.

<a name="demo"></a>

## Demo

Here is the link to the live demo of the WYSIWYG Editor:

- [Live Demo Link](https://maha-magdy.github.io/wysiwyg-editor/)

<a name="props_reference"></a>
``` 
interface WysiwygEditorProps {
    /**
     * In controlled mode, the RawDraftContentState value to display.
     * When provided, the editor operates as a controlled component.
     */
    value?: RawDraftContentState;
    /**
     * Callback function triggered on content change, providing the updated RawDraftContentState.
     * Required for controlled mode.
     */
    callback?: (content: RawDraftContentState) => void;
    /**
     * Optional CSS class name for the editor container.
     */
    className?: string;
    /**
     * Optional inline CSS style for the editor container.
     */
    style?: React.CSSProperties;
    /**
     * API endpoint for content persistence (e.g., loading initial content, and save it after edit it).
     * This prop enables an internal mechanism for fetching/saving content.
     */
    contentApi?: string;
    /**
     * Callback function executed upon successful content save via `contentApi`.
     */
    onSaveSuccess?: () => void;
    /**
     * Callback function executed upon content save error via `contentApi`.
     * Provides the error object.
     */
    onSaveError?: (error: unknown) => void;
    /**
     * [CONCEPTUAL] An array of strings defining which toolbar options should be displayed.
     * Example: `['bold', 'italic', 'ul', 'ol', 'link']`.
     * You would need to implement the logic within the WysiwygEditor component to
     * render toolbar buttons based on this prop.
     */
    toolbarOptions?: string[];
}
``` 

<a name="examples"></a>

## Examples

For examples, see the <a href='./src/App.tsx'>**app.tsx**</a> file.

<a name="contributing"></a>

## Contributing

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](https://github.com/Maha-Magdy/wysiwyg-editor/issues).

<a name="acknowledgments"></a>

## Acknowledgments

- This WYSIWYG editor leverages the <a href="https://draftjs.org/">Draft.js</a> library.

<a name="license"></a>

## License

This project is [MIT](./LICENSE) licensed.

## Show your support

Give a ⭐️ if you like this project!
