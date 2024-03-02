import React, { useState } from 'react';
import { useGetUsersQuery } from '../store/reducers/users';
import Loader from './Loader';

const UsersList = () => {
  const { data: users = [], error, isLoading, refetch } = useGetUsersQuery();
  const [sortBy, setSortBy] = useState('');
  const [filterBy, setFilterBy] = useState('');
  const [refetching, setRefetching] = useState(false);

  const handleRefresh = async () => {
    setRefetching(true);
    await refetch();
    setRefetching(false);
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleFilterByChange = (event) => {
    setFilterBy(event.target.value);
  };

  let filteredUsers = [...users];

  if (filterBy) {
    filteredUsers = users.filter(
      (user) =>
        user.username.toLowerCase().includes(filterBy.toLowerCase()) ||
        user.email.toLowerCase().includes(filterBy.toLowerCase()),
    );
  }

  if (sortBy) {
    filteredUsers.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) {
        return -1;
      }
      if (a[sortBy] > b[sortBy]) {
        return 1;
      }
      return 0;
    });
  }

  if (isLoading) return <Loader />;
  if (error)
    return (
      <h1 className="text-center font-bold h-screen flex justify-center items-center text-gray-100">
        Error: {error.message || error.error}
      </h1>
    );

  return (
    <div className="sm:w-3/4 w-11/12 mx-auto pt-8">
      <h1 className="text-2xl font-bold mb-4 text-gray-100">Users</h1>
      <div className="flex gap-4 items-center mb-4">
        <div>
          <label htmlFor="sortBy" className="mr-2 text-gray-300">
            Sort by:
          </label>
          <select
            id="sortBy"
            onChange={handleSortByChange}
            className="p-1 border border-gray-600 bg-gray-700 text-gray-300 rounded"
          >
            <option value="">None</option>
            <option value="username">Username</option>
            <option value="email">Email</option>
          </select>
        </div>
        <div>
          <label htmlFor="filterBy" className="mr-2 text-gray-300">
            Filter by:
          </label>
          <input
            type="text"
            id="filterBy"
            value={filterBy}
            onChange={handleFilterByChange}
            className="p-1 border border-gray-600 bg-gray-700 rounded w-32 md:w-64 text-gray-300"
          />
        </div>
        <div className="self-end">
          <button
            onClick={handleRefresh}
            className={
              'text-white font-bold py-2 px-4 rounded transition' +
              (refetching ? ' bg-blue-700' : ' hover:bg-blue-700 bg-blue-500')
            }
          >
            {refetching ? 'Refetching...' : 'Refresh'}
          </button>
        </div>
      </div>
      <hr className="mb-4" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="bg-slate-800 rounded-lg shadow-md p-4 hover:bg-slate-700 transition"
          >
            <h3 className="text-gray-300 text-xl font-semibold mb-2">{user.username}</h3>
            <div>
              <a href={`mailto:${user.email}`} className="w-100 text-gray-400 mb-2">
                {user.email}
              </a>
            </div>
            <div>
              <a href={`tel:${user.phone}`} className="w-100 text-gray-400">
                {user.phone}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersList;
