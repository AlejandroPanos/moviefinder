import PageHeader from "../components/PageHeader";
import SearchForm from "../components/SearchForm";

const Search = () => {
  return (
    <>
      <div className="mx-auto p-4 my-4">
        <div className="flex flex-col items-start gap-6">
          <PageHeader
            title={"Advanced Search"}
            desc={"Use advanced filtering to browse thousands of movies"}
          />
          <SearchForm />
        </div>
      </div>
    </>
  );
};

export default Search;
