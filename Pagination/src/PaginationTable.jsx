import React, { useState, useEffect } from "react";
import axios from "axios";

const PaginatedTable = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10); // Default page size
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  // Fetch paginated data
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3001/data`, {
        params: { pageNo: page, pageSize: pageSize },
      });
      setData(response.data.data);
      setTotalPages(Math.ceil(response.data.count.total / pageSize));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  // Fetch data on page change
  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <div>
      <h2>Paginated Table</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <table border="1">
            <thead>
              <tr>
                <th>User ID</th>
                <th>User Name</th>
                <th>Technology</th>
                <th>Feedback</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.userId}>
                  <td>{item.userId}</td>
                  <td>{item.userName}</td>
                  <td>{item.technologyName}</td>
                  <td>{item.feedback}</td>
                  <td>{item.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div>
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>
              Previous
            </button>
            <span> Page {page} of {totalPages} </span>
            <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PaginatedTable;
