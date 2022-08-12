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
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#302d42" />
        <meta name="msapplication-TileColor" content="#302d42" />
        <meta name="theme-color" content="#302d42" />
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
