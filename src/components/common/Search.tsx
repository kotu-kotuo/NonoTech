import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { GoSearch } from "react-icons/go";

const Search = () => {
  const [query, setQuery] = useState("");
  return (
    <div className="flex justify-between rounded bg-white shadow-sm">
      <div className="my-auto ml-1 w-full hover:border-none focus:border-none">
        <input
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setQuery(e.target.value)
          }
          type="text"
          className="block w-full py-2  focus:outline-none"
        ></input>
      </div>
      <Link href={`/search/${query}`}>
        <div
          className="cursor-pointer
         rounded-r bg-primary p-2.5 text-2xl text-white shadow-sm transition hover:opacity-80"
        >
          <GoSearch />
        </div>
      </Link>
    </div>
  );
};

export default Search;
