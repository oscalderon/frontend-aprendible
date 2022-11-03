import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Aplicación de Libros</title>
        <meta
          name="description"
          content="App creada por Oswaldo Calderón entrenamiento Aprendible.com"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Books App</h1>
      <Link href="/libros" data-cy="link-to-books">
        Lista de Libros
      </Link>
    </div>
  );
}
