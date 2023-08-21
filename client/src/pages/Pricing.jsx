// Uses the same styles as Product
import PageNav from "../components/PageNav";
import styles from "./Product.module.css";

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav />
      <section>
        <div>
          <h2>
            Simple pricing.
            <br />
            Just $9/month.
          </h2>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis aut
            nemo minus consequuntur accusamus perferendis aspernatur? Voluptas
            consectetur adipisci facere fugiat rerum iusto reprehenderit
            laudantium. Accusamus ullam eligendi dolores nemo.
          </p>
        </div>
        <img src='img-2.jpg' alt='overview of a large city with skyscrapers' />
      </section>
    </main>
  );
}
