import React, { createContext, useState } from "react";

export const BlogContext = createContext();

const BlogProvider = ({ children }) => {
  const [blog, setBlog] = useState(null); // State to hold the blog details
  return (
    <BlogContext.Provider value={{ blog, setBlog }}>
      {children}
    </BlogContext.Provider>
  );
};

export default BlogProvider;
