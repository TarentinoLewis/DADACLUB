import React from 'react';

const Home = () => {
  return (
    <main>
      <section className="hero">
        <h1>Welcome to DADACLUB</h1>
        <p>An underground music experience like no other.</p>
      </section>
      <section className="about">
        <h2>About Us</h2>
        <p>
          DADACLUB is a haven for underground music lovers. A place where beats define the night and creativity knows no bounds.
          Come join us and dance in the Dark with DADA SOUNDSYSTEMS AND FRIENDS.
        </p>
      </section>
      <section className="feedback">
        <h2>Feedback</h2>
        <p>We value your feedback. Let us know what you think about DADACLUB!</p>
        <form>
          <input type="text" name="name" placeholder="Your Name" required />
          <textarea name="feedback" rows="5" placeholder="Your Feedback" required></textarea>
          <button type="submit">Submit</button>
        </form>
      </section>
    </main>
  );
};

export default Home;