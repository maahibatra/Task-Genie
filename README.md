# Task Genie (Beta) - AI-Powered To-Do List App

Task Genie is an AI-powered to-do list app that can take your rants and make it into a to-do list! It's got Hugging Face's NLP models to generate tasks from user input.

## Features

- **Task Management**:
    - Add, edit, delete, and toggle tasks as completed.
  
- **AI Features**:
    - Generate task lists from natural language input.

## Usage
- You can add simple tasks, or click on the sparkle button at the top to open up the AI prompter.
- For AI prompts, talk about your day and what you need to do and click sen; the NLP will do the rest for you.
- You should see the to-do list pop up in a preview, where you can add more elements and edit or delete existing ones.
- On clicking save, it will save the generated tasks to the main task list.
- To toggle a task, simply click on it (not on the buttons). Edit and deletion is also possible through the buttons on the right.

## NOTE
- I am so very sorry that this project isn't easy to demo or run yourself - I tried to put it onto vercel but it just ruined everything so I am keeping it local-based till I have the courage to fight it.
- If you want to see a video demo, here's a link: (add link later)

## Prerequisites
- Node.js (>= v16.0.0)
- npm
- A Hugging Face account

### Hugging Face:
- On Hugging Face, go to Access Tokens.
- Create a new access token with read permissions.
- Copy and save it somewhere (you won't find it again!).

### Clone the repository:
    git clone https://github.com/your-username/task-genie.git
    cd task-genie

### Backend:
    - Navigate to the /backend directory:
        cd backend
    - Create a .env file in the /backend folder and add your Hugging Face API key:
        hfKey=your_hugging_face_api_key
    - Start the backend server:
        npm run dev
    - The server will run on http://localhost:5000.

### Frontend:
    - Start the frontend React app:
        npm start
    - The app will be available at a localhost specified in the terminal.

## HAVE FUN!!!!