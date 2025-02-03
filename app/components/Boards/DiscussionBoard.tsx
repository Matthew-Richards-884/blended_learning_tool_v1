import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createMessage, getBoardInfo } from '../../util/databaseFunctions';
import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { innerQuestionClass, questionClass } from '../Form/EditQuizQuestion';
import { getAppSession } from '../Navbar';
import { Post } from '@prisma/client';
import { useState } from 'react';

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
    mutationFn: (params: {
      message: string;
      email: string;
      postID: string | undefined;
    }) =>
      createMessage({
        post: params.message,
        boardCode: boardCode,
        userEmail: params.email,
        postID: params.postID,
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
        ? await addMessageMutation.mutateAsync({
            message: value.post,
            email: session?.data.userEmail,
            postID: replyTo?.id,
          })
        : null;

      form.setFieldValue('post', '');
    },
    // Add a validator to support Zod usage in Form and Field
    validatorAdapter: zodValidator(),
  });

  const getMessage = (posts: Post[], postID: string) =>
    posts.find((post) => post.id == postID);

  const [replyTo, setReplyTo] = useState<{ id: string; email: string }>();

  return (
    <div className="flex h-[30rem] w-full p-1">
      {boardInfo.isSuccess && boardInfo.data ? (
        <div className="grid w-full grid-rows-4 bg-gray-200 text-black">
          <div className="row-span-3 w-full overflow-auto">
            <div className="bg-gray-200 p-3 m-1 border border-gray-300 shadow">
              <div>{boardInfo.data.title}</div>
              <div>{boardInfo.data.description}</div>
            </div>
            <div>
              {boardInfo.data.Post.map((message) => (
                <div className="m-1 bg-gray-100 p-3 shadow">
                  <div className="flex flex-row">
                    {message.postID ? (
                      <div className="me-2 flex-auto pe-1">
                        Reply to:{' '}
                        {getMessage(
                          boardInfo.data!.Post as Post[],
                          message.postID
                        )?.userEmail ?? <></>}
                      </div>
                    ) : (
                      <></>
                    )}
                    <div className="me-2 flex-grow justify-self-start pe-1">
                      {message.userEmail}
                    </div>
                    <div className="ms-2 flex-initial ps-1">
                      Created at:{' '}
                      {new Date(
                        message.createdAt as unknown as string
                      ).toUTCString()}
                    </div>
                  </div>
                  <div>{message.content}</div>
                  <button
                    onClick={() =>
                      setReplyTo({
                        id: message.id ?? undefined,
                        email: message.userEmail ?? undefined,
                      })
                    }
                    className="cursor-pointer rounded-md bg-gray-300 px-1 hover:bg-gray-200"
                  >
                    Reply
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="m-2 p-2 bg-gray-100">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
            >
              {replyTo ? (
                <div className="">Replying to: {replyTo.email}</div>
              ) : (
                <></>
              )}
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
                      onSubmit={() => (field.state.value = '')}
                    />
                  </div>
                )}
              />
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <button
                    type="submit"
                    disabled={!canSubmit}
                    className="cursor-pointer"
                  >
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
