import axios from 'axios';
const API_BASE_URL = 'https://books-backend.p.goit.global/books';

export async function fetchTopBooks() {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/top-books`
    );
    const topBooks = response.data.flatMap(category => category.books);
    const uniqueBooks = topBooks.filter(
      (book, index, self) =>
        index ===
        self.findIndex(b => b.title === book.title && b.author === book.author)
    );
    return uniqueBooks;
    
  } catch (error) {
    console.error('Error fetching top books:', error);
  }
}

export async function fetchBooksByCategory(category) {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/category?category=${encodeURIComponent(category)}`
    );
    const uniqueBooks = response.data.filter(
      (book, index, self) =>
        index ===
        self.findIndex(b => b.title === book.title && b.author === book.author)
    );
    return uniqueBooks;
  } catch (error) {
    console.error('Error fetching books by category:', error);
  }
}
