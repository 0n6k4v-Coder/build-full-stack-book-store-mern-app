import { useState, useEffect, useRef } from "react";
import BookCard from "../books/BookCard";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface Book {
  _id: number | string;
  title: string;
  description: string;
  category: string;
  trending?: boolean;
  coverImage: string;
  oldPrice: number;
  newPrice: number;
}

const categories = [
  "Choose a genre",
  "Business",
  "Fiction",
  "Horror",
  "Adventure",
];

const TopSellers = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<string>("Choose a genre");
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("books.json")
      .then((res) => res.json())
      .then((data: Book[]) => setBooks(data));
  }, []);

  const filteredBooks =
    selectedCategory === "Choose a genre"
      ? books
      : books.filter(
          (book) => book.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  const handleScroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="py-10">
      <h2 className="text-3xl font-semibold mb-6">Top Sellers</h2>

      {/* Category Filtering */}
      <div className="mb-8 flex items-center">
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          name="category"
          id="category"
          className="border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none"
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Native CSS Carousel พร้อมปุ่ม Navigation */}
      <div className="relative group">
        <button
          onClick={() => handleScroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 transition-all cursor-pointer hidden group-hover:block"
          aria-label="Previous Slide"
        >
          <FiChevronLeft className="w-5 h-5" />
        </button>

        <div ref={carouselRef} className="carousel-container">
          {filteredBooks.length > 0 &&
            filteredBooks.map((book, index) => (
              <div key={index} className="carousel-item">
                <BookCard book={book} />
              </div>
            ))}
        </div>

        <button
          onClick={() => handleScroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 transition-all cursor-pointer hidden group-hover:block"
          aria-label="Next Slide"
        >
          <FiChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default TopSellers;