import React from 'react'

const fetchPosts = async (page, limit) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`
    );
    const data = await response.json();
    //console.log(data)
    return data;
  };

export default fetchPosts
