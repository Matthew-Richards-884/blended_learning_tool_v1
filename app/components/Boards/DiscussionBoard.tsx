import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createMessage, getBoardInfo } from '../../util/databaseFunctions';
import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { innerQuestionClass, questionClass } from '../Form/EditQuizQuestion';
import { getAppSession } from '../Navbar';
import { Post } from '@prisma/client';

export const DiscussionBoard = ({ boardCode }: { boardCode: string }) => {
  const queryClient = useQueryClient();
  console.log('Board Code: ', boardCode);
  const session = useQuery({
    queryKey: ['session'],
    queryFn: () => getAppSession(),
  }).data;

  const boardInfo = useQuery({
    queryKey: ['board', boardCode],
    queryFn: () => getBoardInfo(boardCode),
  });

  const addMessageMutation = useMutation({
    mutationFn: (params: { message: string; email: string }) =>
      createMessage({
        post: params.message,
        boardCode: boardCode,
        userEmail: params.email,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['board', boardCode] });
    },
  });

  const form = useForm({
    defaultValues: {
      post: '',
    },
    onSubmit: async ({ value }) => {
      console.log('QUIZ VALUE:', value);
      session
        ? addMessageMutation.mutateAsync({
            message: value.post,
            email: session?.data.userEmail,
          })
        : null;
    },
    // Add a validator to support Zod usage in Form and Field
    validatorAdapter: zodValidator(),
  });

  const getMessage = (posts: Post[], postID: string) =>
    posts.find((post) => post.id == postID);

  return (
    <div className="flex p-2">
      {boardInfo.isSuccess && boardInfo.data ? (
        <div>
          <div className="">
            <div>{boardInfo.data.title}</div>
            <div>{boardInfo.data.description}</div>
          </div>
          <div>
            {boardInfo.data.Post.map((message) => (
              <div>
                {message.postID ? (
                  <div>
                    Reply to:{' '}
                    {getMessage(boardInfo.data!.Post as Post[], message.postID)
                      ?.userEmail ?? <></>}
                  </div>
                ) : (
                  <></>
                )}
                <div>
                  {message.userEmail}: {message.content}
                </div>
                <div>Created at: {message.createdAt as unknown as string}</div>
              </div>
            ))}
          </div>
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
            >
              <form.Field
                name="post"
                children={(field) => (
                  <div className={questionClass}>
                    <input
                      id={field.name}
                      name={field.name}
                      value={field.state.value ?? ''}
                      placeholder={'Start typing...'}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className={innerQuestionClass}
                      type={'text'}
                    />
                  </div>
                )}
              />
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <button type="submit" disabled={!canSubmit}>
                    {isSubmitting ? '...' : 'Submit'}
                  </button>
                )}
              />
            </form>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};
