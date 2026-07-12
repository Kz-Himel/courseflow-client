"use client";

interface FilterSidebarProps {
  search: string;
  onSearchChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  level: string;
  onLevelChange: (value: string) => void;
  maxPrice: number;
  onMaxPriceChange: (value: number) => void;
  onApply: () => void;
  onReset: () => void;
}

const categories = [
  "Development",
  "Design",
  "Business",
  "Marketing",
  "Data Science",
  "Personal Development",
];

const levels = ["Beginner", "Intermediate", "Advanced"];

export default function FilterSidebar({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  level,
  onLevelChange,
  maxPrice,
  onMaxPriceChange,
  onApply,
  onReset,
}: FilterSidebarProps) {
  return (
    <aside className="w-full lg:w-64 bg-white rounded-2xl border border-gray-200 p-5 h-fit">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">Filters</h3>

      <div className="mb-5">
        <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">
          Search
        </label>
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search courses..."
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
      </div>

      <div className="mb-5">
        <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">
          Category
        </label>
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <input
              type="radio"
              name="category"
              checked={category === ""}
              onChange={() => onCategoryChange("")}
              className="accent-violet-600"
            />
            All Categories
          </label>
          {categories.map((cat) => (
            <label
              key={cat}
              className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer"
            >
              <input
                type="radio"
                name="category"
                checked={category === cat}
                onChange={() => onCategoryChange(cat)}
                className="accent-violet-600"
              />
              {cat}
            </label>
          ))}
        </div>
      </div>

      <div className="mb-5">
        <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">
          Level
        </label>
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <input
              type="radio"
              name="level"
              checked={level === ""}
              onChange={() => onLevelChange("")}
              className="accent-violet-600"
            />
            All Levels
          </label>
          {levels.map((lvl) => (
            <label
              key={lvl}
              className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer"
            >
              <input
                type="radio"
                name="level"
                checked={level === lvl}
                onChange={() => onLevelChange(lvl)}
                className="accent-violet-600"
              />
              {lvl}
            </label>
          ))}
        </div>
      </div>

      <div className="mb-5">
        <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">
          Price
        </label>
        <input
          type="range"
          min={0}
          max={200}
          value={maxPrice}
          onChange={(e) => onMaxPriceChange(Number(e.target.value))}
          className="w-full accent-violet-600"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>$0</span>
          <span>${maxPrice}</span>
        </div>
      </div>

      <button
        onClick={onApply}
        className="w-full bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium py-2.5 rounded-lg transition-colors mb-2"
      >
        Apply Filters
      </button>
      <button
        onClick={onReset}
        className="w-full text-sm font-medium text-gray-500 hover:text-gray-700 py-1"
      >
        Reset
      </button>
    </aside>
  );
}