import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import DeleteModal from '../components/DeleteModal';
import { markdownToHtml } from '../utils/markdown';

function SinglePost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Mock data for posts
  const mockPosts = {
    1: {
      id: 1,
      title: 'Getting Started with React',
      content: `React is a JavaScript library for building user interfaces. It was developed by Facebook and is now maintained by a community of developers.

## Why React?

React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.

## Key Concepts

- **Components:** Reusable UI pieces that can be composed together
- **Props:** Data passed down from parent to child components
- **State:** Internal data that can change over time
- **JSX:** Syntax extension that allows you to write HTML-like code in JavaScript

## Getting Started

To start a new React project, you can use Create React App:

\`\`\`bash
npx create-react-app my-app
cd my-app
npm start
\`\`\`

This will create a new React application with all the necessary dependencies and configuration.`,
      author: 'John Doe',
      date: '2024-01-15',
      readTime: '5 min read',
      tags: ['React', 'JavaScript', 'Frontend']
    },
    2: {
      id: 2,
      title: 'Advanced JavaScript Concepts',
      content: `JavaScript is a powerful programming language that continues to evolve. Understanding advanced concepts is crucial for building modern applications.

## Closures

A closure is the combination of a function bundled together with references to its surrounding state. In other words, a closure gives you access to an outer function's scope from an inner function.

## Promises and Async/Await

Promises represent the eventual completion or failure of an asynchronous operation. Async/await is syntactic sugar over promises that makes asynchronous code look and behave more like synchronous code.

## Modules

ES6 modules provide a way to organize and structure your code. They allow you to export and import functions, objects, or primitives from one module to another.`,
      author: 'Jane Smith',
      date: '2024-01-14',
      readTime: '8 min read',
      tags: ['JavaScript', 'ES6', 'Async']
    },
    3: {
      id: 3,
      title: 'Building Scalable APIs',
      content: `Building scalable APIs is essential for modern web applications. A well-designed API can handle growth and provide a great developer experience.

## RESTful Design

REST (Representational State Transfer) is an architectural style for designing networked applications. It uses standard HTTP methods and status codes.

## Authentication & Authorization

Implementing proper authentication and authorization is crucial for API security. Common methods include JWT tokens, OAuth 2.0, and API keys.

## Rate Limiting

Rate limiting helps prevent abuse and ensures fair usage of your API resources. It can be implemented at various levels including IP-based and user-based limits.`,
      author: 'Mike Johnson',
      date: '2024-01-13',
      readTime: '12 min read',
      tags: ['API', 'Backend', 'Security']
    },
    4: {
      id: 4,
      title: 'CSS Grid vs Flexbox',
      content: `CSS Grid and Flexbox are both powerful layout systems in CSS, but they serve different purposes and can be used together effectively.

## CSS Grid

CSS Grid is a two-dimensional layout system designed for the web. It lets you lay out items in rows and columns, and has many features that make building complex layouts straightforward.

## Flexbox

Flexbox is a one-dimensional layout method for laying out items in rows or columns. Items flex to fill additional space and shrink to fit into smaller spaces.

## When to Use Each

- **Use Grid:** For overall page layouts, complex two-dimensional layouts
- **Use Flexbox:** For component layouts, one-dimensional layouts, alignment`,
      author: 'Sarah Wilson',
      date: '2024-01-12',
      readTime: '6 min read',
      tags: ['CSS', 'Layout', 'Frontend']
    }
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundPost = mockPosts[id];
      if (foundPost) {
        setPost(foundPost);
      } else {
        setError('Post not found');
      }
      setIsLoading(false);
    }, 1000);
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading post...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-6">The post you're looking for doesn't exist.</p>
          <Link
            to="/posts"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            Back to Posts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link
              to="/posts"
              className="text-indigo-600 hover:text-indigo-700 font-medium text-sm"
            >
              ← Back to Posts
            </Link>
            <div className="flex space-x-4">
              <button
                onClick={() => navigate(`/posts/${id}/edit`)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Edit
              </button>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Post Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <article className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-8">
            {/* Post Header */}
            <header className="mb-8">
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <span>{post.author}</span>
                <span className="mx-2">•</span>
                <span>{post.date}</span>
                <span className="mx-2">•</span>
                <span>{post.readTime}</span>
              </div>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {post.title}
              </h1>
              
              {post.tags && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </header>

            {/* Post Content */}
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content) }}
            />
          </div>
        </article>
      </div>

      {/* Delete Modal */}
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => {
          setShowDeleteModal(false);
          navigate('/posts');
        }}
        postTitle={post?.title || ''}
      />
    </div>
  );
}

export default SinglePost; 