import { useEmployeePosts } from "../hooks/useEmployeePosts";

function renderPosts(loading, posts) {
  if (loading) {
    return <p className="text-sm text-gray-400">Loading posts...</p>;
  }

  if (posts.length === 0) {
    return <p className="text-sm text-gray-400">No posts found.</p>;
  }

  const firstFivePosts = posts.slice(0, 5);

  return (
    <ul className="space-y-1">
      {firstFivePosts.map((post) => (
        <li key={post.id} className="text-sm text-gray-700 truncate">
          • {post.title}
        </li>
      ))}
    </ul>
  );
}

function EmployeeModal({ employee, onClose }) {
  const { posts, loading } = useEmployeePosts(employee?.id);

  if (!employee) {
    return null;
  }

  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(employee.name)}&size=48`;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[85vh] overflow-y-auto p-6">
        <div className="flex items-center gap-3 mb-4">
          <img
            src={avatarUrl}
            alt={employee.name}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h2 className="text-lg font-semibold">{employee.name}</h2>
            <p className="text-sm text-gray-500">@{employee.username}</p>
          </div>
        </div>

        <dl className="grid grid-cols-3 gap-y-2 text-sm mb-4">
          <dt className="text-gray-500">Email</dt>
          <dd className="col-span-2">{employee.email}</dd>

          <dt className="text-gray-500">Phone</dt>
          <dd className="col-span-2">{employee.phone}</dd>

          <dt className="text-gray-500">Company</dt>
          <dd className="col-span-2">{employee.company.name}</dd>

          <dt className="text-gray-500">City</dt>
          <dd className="col-span-2">{employee.address.city}</dd>

          <dt className="text-gray-500">Website</dt>
          <dd className="col-span-2">{employee.website}</dd>
        </dl>

        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-sm font-semibold mb-2">Recent Posts</h3>
          {renderPosts(loading, posts)}
        </div>

        <button
          onClick={onClose}
          className="mt-5 w-full py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default EmployeeModal;