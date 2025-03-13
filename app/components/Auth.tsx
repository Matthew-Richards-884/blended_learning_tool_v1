export function Auth({
  actionText,
  onSubmit,
  status,
  afterSubmit,
}: {
  actionText: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  status: 'pending' | 'idle' | 'success' | 'error';
  afterSubmit?: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 flex items-start justify-center bg-gray-200 p-8 text-black">
      <div className="rounded-lg bg-gray-100 p-8 shadow-lg">
        <h1 className="mb-4 text-2xl font-bold">{actionText}</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(e);
          }}
          className="space-y-4"
        >
          <div>
            <label htmlFor="email" className="block text-xs">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-full rounded border border-gray-500/20 bg-gray-50 px-2 py-1"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-xs">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-full rounded border border-gray-500/20 bg-gray-50 px-2 py-1"
            />
          </div>
          <button
            type="submit"
            className="w-full cursor-pointer rounded-sm border hover:bg-gray-100 border-gray-500/20 bg-gray-200 py-2 font-black uppercase shadow-md"
            disabled={status === 'pending'}
          >
            {status === 'pending' ? '...' : actionText}
          </button>
          {afterSubmit ? afterSubmit : null}
        </form>
      </div>
    </div>
  );
}
