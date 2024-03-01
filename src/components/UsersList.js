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
        user.name.toLowerCase().includes(filterBy.toLowerCase()) ||
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
      <h1 className="text-center font-bold h-screen flex justify-center items-center">
        Error: {error.message || error.error}
      </h1>
    );

  return (
    <div className="sm:w-3/4 mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <div className="flex gap-4 items-center mb-4">
        <button
          onClick={handleRefresh}
          className={
            'text-white font-bold py-2 px-4 rounded transition' +
            (refetching ? ' bg-grey-700' : ' hover:bg-blue-700 bg-blue-500')
          }
        >
          {refetching ? 'Refreshing...' : 'Refresh'}
        </button>
        <div>
          <label htmlFor="sortBy" className="mr-2">
            Sort by:
          </label>
          <select id="sortBy" onChange={handleSortByChange} className="p-1">
            <option value="">None</option>
            <option value="name">Name</option>
            <option value="email">Email</option>
          </select>
        </div>
        <div>
          <label htmlFor="filterBy" className="mr-2">
            Filter by:
          </label>
          <input
            type="text"
            id="filterBy"
            value={filterBy}
            onChange={handleFilterByChange}
            className="p-1 border border-gray-300 rounded"
          />
        </div>
      </div>
      <hr className="mb-4" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="bg-white rounded-lg shadow-md p-4 hover:bg-gray-100 transition"
          >
            <h3 className="text-xl font-semibold mb-2">{user.name}</h3>
            <p className="text-gray-600 mb-2">{user.email}</p>
            <p className="text-gray-600">{user.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersList;
