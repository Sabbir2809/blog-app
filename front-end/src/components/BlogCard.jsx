import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BiSolidEdit } from 'react-icons/bi';
import { AiOutlineDelete } from 'react-icons/ai';
import Swal from 'sweetalert2';
import './../assets/styles/card.css';

const BlogCard = ({ blog, isUser }) => {
  const navigate = useNavigate();
  const { _id, image, title, description, createdAt } = blog;

  const handleEdit = () => {
    navigate(`/blog-update/${_id}`);
  };

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`http://localhost:8000/api/v1/blog/delete-blog/${_id}`);
      if (data?.success) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Blog Deleted Successfully',
          showConfirmButton: false,
          timer: 1500,
        });
        navigate('/');
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleBlog = () => {
    navigate(`/blog-details/${_id}`);
  };

  let picture =
    image.length > 10
      ? image
      : `https://i0.wp.com/myblog.com.ng/wp-content/uploads/2020/01/IMG_2117-1.jpg?fit=860%2C435&ssl=1`;

  return (
    <div className='card' key={_id}>
      <div className='card__header'>
        <img src={picture} alt='card__image' className='card__image' width='600' />
      </div>
      <div className='card__body'>
        {isUser && (
          <div className='icons'>
            <div className='edit__icon'>
              <BiSolidEdit color='info' onClick={handleEdit} size='25' />
            </div>
            <div className='delete__icon'>
              <AiOutlineDelete onClick={handleDelete} size='25' />
            </div>
          </div>
        )}
        <div onClick={handleBlog}>
          <h4 className='blog__title'>{title}</h4>
          <p>{description.substring(0, 160)}</p>
        </div>
      </div>
      <div className='card__footer'>
        <div className='user'>
          <div className='user__info'>
            <h6 className='text-secondary text-uppercase'>
              {blog?.user || blog?.username || blog?.user?.username}
            </h6>
            <small>{createdAt}</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
