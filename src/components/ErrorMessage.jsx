const ErrorMessage = ({ error }) => {
  return (
    <>
      <div className="w-full flex items-center justify-center p-8">
        <p className="text-red-600 dark:text-red-400">{error}</p>
      </div>
    </>
  );
};

export default ErrorMessage;
