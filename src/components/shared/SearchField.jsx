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
  const [responsivePlaceholder, setRresponsivePlaceholder] = useState("");

  useEffect(() => {
    const updatePlaceholder = () => {
      if (window.innerWidth >= 1024) {
        setRresponsivePlaceholder(placeholder);
        // } else if (window.innerWidth >= 768) {
        //   setRresponsivePlaceholder("Medium screen placeholder");
      } else {
        setRresponsivePlaceholder("Search here...");
      }
    };

    // Set initial placeholder
    updatePlaceholder();

    // Add event listener
    window.addEventListener("resize", updatePlaceholder);

    // Clean up
    return () => window.removeEventListener("resize", updatePlaceholder);
  }, [placeholder]);

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
        placeholder={responsivePlaceholder}
        disabled={disabled}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
}

export default SearchField;
