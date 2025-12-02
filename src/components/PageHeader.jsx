const PageHeader = ({ title, desc }) => {
  return (
    <>
      <div className="w-full mx-auto flex flex-col items-start gap-4">
        <h1 className="text-4xl md:text-5xl font-bold dark:text-white">{title}</h1>
        <p className="md:text-lg text-gray-700 dark:text-gray-400 font-light">{desc}</p>
      </div>
    </>
  );
};

export default PageHeader;
