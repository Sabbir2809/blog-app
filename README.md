# Assignment: Basic Full-Stack Blog Project using MERN

- Frontend Package: `npm install react-router-dom axios bootstrap react-bootstrap react-icons react-hot-tost`

- Backend Package: `npm install express express-rate-limit cors helmet npp mongoose express-mongo-sanitize dotenv jsonwebtoken bcrypt nodemailer`

- Backend Dev Dependencies: `npm install -D nodemon morgan`

### Task-1: Backend Setup using Express.js and MongoDB

Set up a new Node.js project and install the required dependencies (express, mongoose, etc.). Create an Express.js server with routes for CRUD operations on blog posts. Define a Mongoose schema for the blog posts with fields like title, content, author, and createdAt

**Implement API routes for:**

1. Fetching all blog posts
1. Fetching a single blog post by ID
1. Creating a new blog post
1. Updating an existing blog post
1. Deleting a blog post

### Task 2: Frontend Setup using React

Set up a new React project using create-react-app.

**Create components for:**

1. A blog post list to display all available blog posts
1. A single blog post view
1. A form to add/edit blog posts

**Use React Router to handle different routes:**

1. / for displaying the list of blog posts
1. /post/:id for displaying a single blog post
1. /create for adding a new blog post
1. /edit/:id for editing an existing blog post

### Task 3: Connecting Frontend and Backend

1. Utilize axios or another HTTP library to make API requests from the frontend to the backend.

1. Fetch all blog posts and display them in the blog post list component.

1. Implement functionality to view a single blog post and its details.

1. Create forms to add new blog posts and edit existing ones.

### Task 4: Styling and UI Enhancement

1. Apply basic styling to your components using CSS or a CSS framework like Bootstrap or Tailwind css.

1. Ensure that the user interface is user-friendly and responsive.

### Task 5: Comment and Search Features

1. Implement user authentication and allow only authenticated users to create, edit, and delete blog posts.

1. Add comment functionality to the blog posts.

1. Implement a search feature to search for blog posts based on titles or keywords.
