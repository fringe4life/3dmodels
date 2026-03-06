import { FaArrowUp } from "react-icons/fa";

const TopLink = () => (
  <a
    className="fixed right-5 bottom-5 z-1000 translate-x-28 rounded-full bg-white to-top-link p-2.5 shadow-gray-300 shadow-sm transition-transform duration-200 ease-out hover:bg-gray-200"
    href="#top"
  >
    <FaArrowUp className="h-4 w-4" />
    <span className="sr-only">Back to top</span>
  </a>
);

export { TopLink };
