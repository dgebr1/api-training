import { useEffect } from "react";
import { Link } from "react-router-dom";
import { usePostStore } from "../store/postStore";

function Posts() {
  const postStore = usePostStore((state) => state);

  useEffect(() => {
    postStore.getPosts();
  }, []);

  if (postStore?.isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Posts</h1>
            <Link
              to="/create-post"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Create New Post
            </Link>
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* {JSON.stringify(postStore?.posts)} */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {postStore?.posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <span>Some one</span>
                  <span className="mx-2">•</span>
                  <span>{new Date(post.createdAt).toISOString()}</span>
                  <span className="mx-2">•</span>
                  <span>8 min read</span>
                </div>

                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  <Link
                    to={`/posts/${post.id}`}
                    className="hover:text-indigo-600 transition-colors"
                  >
                    {post.title}
                  </Link>
                </h2>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.content}
                </p>

                <Link
                  to={`/posts/${post.id}`}
                  className="text-indigo-600 hover:text-indigo-700 font-medium text-sm"
                >
                  Read more →
                </Link>
              </div>
            </article>
          ))}
        </div>

        {postStore?.posts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No posts yet
            </h3>
            <p className="text-gray-600 mb-4">Be the first to create a post!</p>
            <Link
              to="/create-post"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Create Your First Post
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Posts;
