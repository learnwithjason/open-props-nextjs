import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

export async function getStaticProps() {
  const res = await fetch('https://www.learnwithjason.dev/api/schedule');

  if (!res.ok) {
    console.log('oops');
    // TODO actual error handling
  }

  const schedule = await res.json();

  return {
    props: { schedule },
  };
}

function Banner() {
  return (
    <aside className={styles.banner}>
      <p>
        <strong>NOTE:</strong> Please remember to include a photo with every
        episode or my crappy software will fall over.
      </p>
    </aside>
  );
}

function EpisodeCard({ title, date, guest, index }) {
  return (
    <div className={styles.card} style={{ '--_delay': index }}>
      <date>{new Date(date).toLocaleDateString()}</date>
      <div>{title}</div>
      <div className={styles.guest}>
        <Image
          src={guest[0].guestImage.asset.url}
          alt={guest[0].name}
          height={40}
          width={40}
        />
        <p>{guest[0].name}</p>
      </div>
    </div>
  );
}

function Form() {
  return (
    <form className={styles.form}>
      <label>
        <span>Title</span>
        <input type="text" />
      </label>
      <label>
        <span>Date</span>
        <input type="date" />
      </label>
      <label>
        <span>Guest Name</span>
        <input type="text" />
      </label>
      <label>
        <span>Guest Image</span>
        <input type="file" />
      </label>
    </form>
  );
}

export default function Home({ schedule }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>LWJ Dashboard</title>
        <meta
          name="description"
          content="A dashboard showing past and upcoming LWJ episodes"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>LWJ Dashboard</h1>

        <Banner />

        <div className={styles.table}>
          {schedule.map((episode, i) => (
            <EpisodeCard key={episode._id} index={i} {...episode} />
          ))}
        </div>

        <Form />
      </main>
    </div>
  );
}
