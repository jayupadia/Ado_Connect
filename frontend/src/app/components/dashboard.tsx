'use client';

import { useEffect, useState } from "react";
import { createPost, getPosts } from "../api/dashboard";
import Image from "next/image"; // Import Next.js Image component

type Post = {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
};

export default function Dashboard() {
  const [posts, setPosts] = useState<Post[]>([]); // Define type for posts
  const [newPost, setNewPost] = useState<{ title: string; description: string; hashtags: string; image: File | null }>({
    title: "",
    description: "",
    hashtags: "",
    image: null,
  });

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getPosts();
      setPosts(data.data);
    };
    fetchPosts();
  }, []);

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", newPost.title);
    formData.append("description", newPost.description);
    formData.append("hashtags", newPost.hashtags);
    if (newPost.image) {
      formData.append("image", newPost.image); // Only append if image is not null
    }

    await createPost(formData);
    setNewPost({ title: "", description: "", hashtags: "", image: null });
    const data = await getPosts();
    setPosts(data.data);
  };

  return (
    <div className="flex">
      <aside className="w-1/4 p-4 bg-gray-100">Sidebar</aside>
      <main className="flex-1 p-4">
        <form onSubmit={handlePostSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          />
          <textarea
            placeholder="Description"
            value={newPost.description}
            onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
          ></textarea>
          <input
            type="text"
            placeholder="Hashtags"
            value={newPost.hashtags}
            onChange={(e) => setNewPost({ ...newPost, hashtags: e.target.value })}
          />
          <input
            type="file"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setNewPost({ ...newPost, image: e.target.files[0] }); // Add null check for files
              }
            }}
          />
          <button type="submit">Create Post</button>
        </form>
        <div>
          {posts.map((post) => (
            <div key={post._id}>
              <h2>{post.title}</h2>
              <p>{post.description}</p>
              <Image src={post.imageUrl} alt={post.title} width={500} height={300} /> {/* Use Next.js Image */}
            </div>
          ))}
        </div>
      </main>
      <aside className="w-1/4 p-4 bg-gray-100">Profile</aside>
    </div>
  );
}
