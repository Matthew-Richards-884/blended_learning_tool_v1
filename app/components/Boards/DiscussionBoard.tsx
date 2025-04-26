import {
  skipToken,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  createMessage,
  getBoardInfo,
  getGroup,
} from '../../util/databaseFunctions';
import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { innerQuestionClass, questionClass } from '../Form/EditQuizQuestion';
import { getAppSession } from '../Navbar';
import { Post } from '@prisma/client';
import { useEffect, useState } from 'react';

export const DiscussionBoard = ({
  boardCode,
  group,
}: {
  boardCode: string;
  group?: string;
}) => {
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
        privateMessage: privateMessage,
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
  const [privateMessage, setPrivateMessage] = useState(false);

  useEffect(() => {
    boardInfo.data
      ? setPrivateMessage(boardInfo.data.defaultPrivate)
      : undefined;
  }, [boardInfo.isSuccess]);

  const groupInfo = useQuery({
    queryKey: [boardCode, 'group', session?.data.userEmail],
    queryFn: group ? () => getGroup(group) : skipToken,
    enabled: !!group,
  });

  console.log('Group', group);

  return (
    <div className="flex h-[30rem] w-full p-1">
      {boardInfo.isSuccess && boardInfo.data ? (
        <div className="grid w-full grid-rows-4 bg-gray-200 text-black">
          <div className="row-span-3 w-full overflow-auto">
            <div className="m-1 bg-gray-100 p-3 shadow-md">
              <div>{boardInfo.data.title}</div>
              <div>{boardInfo.data.description}</div>
              {group ? <div>Group: {groupInfo.data?.title}</div> : <></>}
            </div>
            <div>
              {boardInfo.data.Post.map((message) =>
                !message.private ||
                session?.data.userType === 'Teacher' ||
                session?.data.userType === 'Admin' ||
                session?.data.userEmail === message.userEmail ? (
                  <div className="m-1 bg-gray-100 p-3 shadow" key={message.id}>
                    <div className="flex flex-row">
                      {message.private ? (
                        <div className="flex justify-center align-middle">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="my-auto flex size-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                            />
                          </svg>
                        </div>
                      ) : (
                        <></>
                      )}
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
                ) : (
                  <></>
                )
              )}
            </div>
          </div>
          <div className="m-1 bg-gray-100 p-2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
            >
              {replyTo ? (
                <div className="flex flex-row">
                  Replying to: {replyTo.email}{' '}
                  <button
                    className="ms-auto hover:cursor-pointer hover:bg-slate-200"
                    onClick={() => setReplyTo(undefined)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18 18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
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
              <div>
                <label className="inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    value=""
                    className="peer sr-only"
                    onClick={(e) => setPrivateMessage(e.currentTarget.checked)}
                    checked={privateMessage}
                  />
                  <div className="peer relative h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-green-600 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full"></div>
                  <span className="ms-3 flex text-sm font-medium text-gray-900">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                    Private message
                  </span>
                </label>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};
