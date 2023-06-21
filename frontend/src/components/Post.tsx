import React from 'react';

interface PostProps {
  title: string;
  body: string;
}

export const Post: React.FC<PostProps> = ({ title, body }) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{body}</p>
    </div>
  );
};
