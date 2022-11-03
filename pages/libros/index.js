import Link from "next/link";

export async function getStaticProps() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/`
  ).then((response) => response.json());

  return {
    props: {
      books: res,
    },
  };
}

const BookList = ({ books }) => {
  async function handleDelete(e, bookId) {
    e.preventDefault();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${bookId}`,
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _method: "DELETE",
        }),
      }
    );
    if (res.ok) {
      window.location.href = "/libros";
    }
  }
  return (
    <div>
      <Link href="/libros/crear">Crear libro</Link>
      <h1>Listado de Libros</h1>
      <ul data-cy="book-list">
        {books.map((book) => (
          <li key={`book-${book.id}`}>
            <Link
              href={`/libros/${book.id}`}
              data-cy={`link-to-visit-book-${book.id}`}
            >
              {book.title}
            </Link>
            {" - "}
            <Link
              href={`/libros/${book.id}/editar`}
              data-cy={`link-to-edit-book-${book.id}`}
            >
              Editar
            </Link>
            {" - "}
            <form
              onSubmit={(e) => handleDelete(e, book.id)}
              style={{ display: "inline" }}
              data-cy={`link-to-delete-book-${book.id}`}
            >
              <button>Eliminar</button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
