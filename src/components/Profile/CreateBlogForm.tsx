import { useNavigate } from 'react-router-dom';
import { IBlog } from '../../types/types';
import { useForm } from 'react-hook-form';
import { useCreateBlogMutation } from '../../slice/blogsApiSlice';
import { notify } from '../../helpers/notify';
import { errorCheck } from '../../helpers/errorCheck';
import { BaseButton } from '../BaseButton';

type BlogInput = Pick<IBlog, 'title' | 'content' | 'published'>;

export const CreateBlogForm = () => {
  const navigate = useNavigate();
  const [createBlog, { isLoading }] = useCreateBlogMutation();
  const { register, handleSubmit, reset } = useForm<BlogInput>();

  const handleCreateBlog = async (data: BlogInput) => {
    try {
      await createBlog(data).unwrap();
      notify({ type: 'success', message: 'Successfully created a blog' });
      reset();
      navigate('/profile');
    } catch (error) {
      const message = errorCheck(error);
      if (message) notify({ type: 'error', message });
    }
  };

  return (
    <div className="">
      <form
        onSubmit={handleSubmit(handleCreateBlog)}
        className="max-w-5xl mx-auto p-4"
      >
        <label htmlFor="title" className="text-cleanWhite">
          Title
        </label>
        <input
          className="text-black w-full p-2 resize-none"
          id="title"
          {...register('title')}
        />
        <label htmlFor="content" className="text-cleanWhite">
          Content
        </label>
        <textarea
          className="text-black w-full p-2 resize-none"
          rows={14}
          id="content"
          {...register('content')}
        />
        <BaseButton
          type="submit"
          isLoading={isLoading}
          className="w-full sm:w-fit mt-2 py-1 px-4 uppercase text-slate-900 font-semibold bg-accent border-accent focus:ring-green-300"
        >
          Create Blog
        </BaseButton>
      </form>
    </div>
  );
};
