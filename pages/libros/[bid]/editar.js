import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export async function getServerSideProps({ params }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${params.bid}`
  );
  const data = await res.json();

  return {
    props: {
      book: data,
    },
  };
}

const BookEdit = ({ book }) => {
  const router = useRouter();
  const [bookTitle, setBookTitle] = useState(book.title);
  const [errors, setErrors] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${book.id}`,
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          title: bookTitle,
          _method: "PATCH",
        }),
      }
    );
    if (res.ok) {
      setErrors([]);
      setBookTitle("");
      return router.push("/libros");
    }
    const data = await res.json();
    setErrors(data.errors);
    setSubmitting(false);
  }

  return (
    <div>
      <h1>BookEdit</h1>
      <form onSubmit={handleSubmit}>
        <label>Cambiar título del libro</label>
        <br />
        <input
          type="text"
          onChange={(e) => setBookTitle(e.target.value)}
          value={String(bookTitle)}
          disabled={submitting}
          data-cy="input-book-title"
        ></input>
        <button disabled={submitting} data-cy="button-submit-book">
          {submitting ? "Enviando..." : "Enviar"}
        </button>
        {errors.title && (
          <span style={{ color: "red", display: "block" }}>{errors.title}</span>
        )}
      </form>
      <br />
      <Link href="/libros">Lista de Libros</Link>
    </div>
  );
};

export default BookEdit;
