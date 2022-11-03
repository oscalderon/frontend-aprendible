import Link from "next/link";

export async function getStaticProps({ params }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${params.bid}`
  ).then((response) => response.json());

  return {
    props: {
      book: res,
    },
  };
}

export async function getStaticPaths() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/`
  ).then((response) => response.json());

  return {
    paths: res.map((book) => ({ params: { bid: String(book.id) } })),
    fallback: false,
  };
}

const BookDetail = ({ book }) => {
  return (
    <div>
      <h1>{book.title}</h1>
      <Link href="/libros">Lista de Libros</Link>
    </div>
  );
};

export default BookDetail;
