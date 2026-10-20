import DomeGallery from './DomeGallery.jsx';

const modules = import.meta.glob('../assets/scenes/*.{jpg,jpeg,png,webp,avif,jfif}', {
  eager: true,
  import: 'default',
});

const scenes = Object.values(modules).map((src, i) => ({
  src,
  alt: `Evangelion scene ${i + 1}`,
}));

export default function Gallery() {
  return (
    <section id="gallery" className="gallery" aria-labelledby="gallery-title">
      <div className="container">
        <header className="section-head">
          <p className="label">SCENE ARCHIVE</p>
          <h2 id="gallery-title" className="section-title">MOMENTS FROM THE FRONT LINE</h2>
          <p className="gallery__hint">Drag to rotate the dome. Click a scene to enlarge it.</p>
        </header>
      </div>

      <div className="gallery__stage" data-reveal="pop">
        {scenes.length > 0 ? (
          <DomeGallery
            images={scenes}
            fit={0.8}
            minRadius={600}
            maxRadius={1400}
            overlayBlurColor="#050608"
            grayscale={false}
            openedImageWidth="min(88vw, 640px)"
            openedImageHeight="min(50vw, 360px)"
          />
        ) : (
          <div className="gallery__empty">
            <p className="label">NO SCENES FOUND</p>
            <p>Add images to <code>src/assets/scenes/</code>, then refresh.</p>
          </div>
        )}

      </div>
    </section>
  );
}