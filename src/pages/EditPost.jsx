import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  // Mock data for posts (same as SinglePost)
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
    // Simulate API call to fetch post data
    setTimeout(() => {
      const foundPost = mockPosts[id];
      if (foundPost) {
        setFormData({
          title: foundPost.title,
          content: foundPost.content,
          tags: foundPost.tags ? foundPost.tags.join(', ') : ''
        });
      } else {
        setError('Post not found');
      }
      setIsLoading(false);
    }, 1000);
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setError('');

    // Basic validation
    if (!formData.title.trim()) {
      setError('Title is required');
      setIsSaving(false);
      return;
    }

    if (!formData.content.trim()) {
      setError('Content is required');
      setIsSaving(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      // Navigate back to the post
      navigate(`/posts/${id}`);
    }, 1000);
  };

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
          <p className="text-gray-600 mb-6">The post you're trying to edit doesn't exist.</p>
          <button
            onClick={() => navigate('/posts')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            Back to Posts
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Edit Post</h1>
          <p className="mt-2 text-gray-600">Update your post content and settings.</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm mb-6">
                {error}
              </div>
            )}

            <div className="space-y-6">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter your post title..."
                  required
                />
              </div>

              {/* Tags */}
              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter tags separated by commas (e.g., React, JavaScript, Tutorial)"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Add relevant tags to help others find your post
                </p>
              </div>

              {/* Content */}
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                  Content *
                </label>
                <textarea
                  id="content"
                  name="content"
                  rows={15}
                  value={formData.content}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm font-mono"
                  placeholder="Write your post content here... You can use Markdown formatting."
                  required
                />
                <p className="mt-1 text-sm text-gray-500">
                  You can use Markdown formatting for rich text
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => navigate(`/posts/${id}`)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-blue-900 mb-2">Markdown Tips</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Use <code>**bold**</code> for <strong>bold text</strong></li>
            <li>• Use <code>*italic*</code> for <em>italic text</em></li>
            <li>• Use <code>## Heading</code> for section headers</li>
            <li>• Use <code>- item</code> for bullet lists</li>
            <li>• Use <code>`code`</code> for inline code</li>
            <li>• Use <code>```</code> for code blocks</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default EditPost; 