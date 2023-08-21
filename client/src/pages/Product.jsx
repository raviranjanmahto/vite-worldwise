import PageNav from "../components/PageNav";
import styles from "./Product.module.css";

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav />
      <section>
        <img
          src='img-1.jpg'
          alt='person with dog overlooking mountain with sunset'
        />
        <div>
          <h2>About WorldWide.</h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem,
            asperiores laboriosam eos explicabo commodi nemo consequatur sit hic
            modi dolores harum doloremque magni facere, voluptatibus odio
            repudiandae delectus? Tenetur, recusandae.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consequuntur illo tempore, aspernatur iste impedit sapiente neque.
            Reprehenderit ea vitae architecto minus accusamus! Amet quaerat
            blanditiis dolor ab officia. Dignissimos, inventore!
          </p>
        </div>
      </section>
    </main>
  );
}
