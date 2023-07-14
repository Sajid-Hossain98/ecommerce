import { useState } from "react";
import { GoSearch } from "react-icons/go";
import { IconContext } from "react-icons/lib";
import { useComponentHideAndShow } from "../../hooks/useComponentHideAndShow";

const SearchMini = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  const { ref } = useComponentHideAndShow(setSearchOpen);

  return (
    <>
      <div className="search-field-sm" ref={ref}>
        <button onClick={() => setSearchOpen(!searchOpen)}>
          <IconContext.Provider
            value={{
              style: {
                color: "#FDFDFD",
                fontSize: "35px",
              },
            }}
          >
            <GoSearch className="search-icon" />
          </IconContext.Provider>
        </button>

        {searchOpen ? (
          <div className="searchBar-sm animate__animated animate__faster animate__flipInX">
            <input
              type="text"
              name="search"
              // onChange={handleSearch}
              placeholder="Search..."
              autoFocus
            />
          </div>
        ) : null}
      </div>
    </>
  );
};

export default SearchMini;
