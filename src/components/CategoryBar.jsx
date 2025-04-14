import react from 'react';

export default function CategoryBar({ onSelect }) {
  const categories = ['전체', '음악', '게임', '뉴스', '스포츠', '경제'];

  return (
    <nav className="flex  overflow-x-auto whitespace-nowrap space-x-4 px-4 py-2 border-b border-gray-300">
      {categories.map((category) => (
        <button
          key={category}
          className="px-3 py-1 rounded-full hover:bg-red-200 transition"
          onClick={() => onSelect(category)}
        >
          {category}
        </button>
      ))}
    </nav>
  );
}
