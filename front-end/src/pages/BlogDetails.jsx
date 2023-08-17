import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const BlogDetails = () => {
  // react state
  const [blog, setBlog] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const { id } = useParams();

  // get blogs
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`http://localhost:8000/api/v1/blog/get-blog/${id}`);
        if (data?.success) {
          setLoading(false);
          setBlog(data?.data);
        }
      } catch (error) {
        console.error(error.message);
      }
    })();
  }, []);

  return (
    <Card className='blog__details-card container mt-4'>
      <Card.Header className='text-center' as='h5'>
        <img
          src={blog.image}
          style={{ width: '300px', height: '300px', objectFit: 'cover' }}
          alt='Blog Image'
        />
      </Card.Header>
      <Card.Body>
        <Card.Title>{blog.title}</Card.Title>
        <Card.Text>{blog.description}</Card.Text>
        <Button variant='primary'>{blog.createdAt}</Button>
      </Card.Body>
    </Card>
  );
};

export default BlogDetails;
