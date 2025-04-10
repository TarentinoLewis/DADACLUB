import React from 'react';

const Gallery = () => {
  return (
    <main>
      <section className="gallery">
        <h2>Our Moments</h2>
        <div className="gallery-grid">
          <img src="images/event1.jpg" alt="Event 1" />
          <img src="images/event2.jpg" alt="Event 2" />
          <img src="images/event3.jpg" alt="Event 3" />
        </div>
      </section>
    </main>
  );
};

export default Gallery;