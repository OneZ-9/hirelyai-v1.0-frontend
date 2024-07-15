import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";

function SearchField({
  filterFunction,
  setFilter,
  placeholder,
  className,
  disabled = false,
}) {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(
    function () {
      const filtered = filterFunction(searchQuery);

      setFilter(filtered);
    },

    [searchQuery, setFilter, filterFunction]
  );

  return (
    <div className="relative">
      {!searchQuery && (
        <span className="absolute top-2 right-4">
          <Search
            className="text-slate-500 dark:text-slate-400"
            cursor="pointer"
          />
        </span>
      )}
      <Input
        type="text"
        className={className}
        placeholder={placeholder}
        disabled={disabled}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
}

export default SearchField;
