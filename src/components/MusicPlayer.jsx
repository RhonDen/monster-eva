import { useEffect, useRef, useState } from 'react';
import { Pause, Play, SkipBack, SkipForward, Volume1, Volume2 } from 'lucide-react';
import ElasticSlider from '../ElasticSlider.jsx';

// Loads every song in src/assets/music. Add or remove files, no code changes needed.
const modules = import.meta.glob('../assets/music/*.{mp3,ogg,wav,m4a,flac}', {
  eager: true,
  import: 'default',
});
const tracks = Object.entries(modules).map(([path, src]) => ({
  src,
  title: path.split('/').pop().replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ').trim(),
}));

const fmt = (s) => {
  if (!Number.isFinite(s)) return '0:00';
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
};

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const keepPlaying = useRef(false);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [seek, setSeek] = useState(null); // value while the seek bar is being dragged

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = 0.7;
  }, []);

  // After the track changes, keep playing if we were playing.
  useEffect(() => {
    const audio = audioRef.current;
    if (audio && keepPlaying.current) audio.play().catch(() => {});
  }, [index]);

  if (tracks.length === 0) {
    return (
      <div className="player player--empty">
        <p className="player__label">NERV AUDIO</p>
        <p className="player__title">No songs found</p>
        <p className="player__hint">Add .mp3 files to src/assets/music/ and refresh.</p>
      </div>
    );
  }

  const track = tracks[index];

  const goTo = (target) => {
    const audio = audioRef.current;
    keepPlaying.current = playing;
    if (target === index) {
      audio.currentTime = 0;
      if (playing) audio.play().catch(() => {});
      return;
    }
    setTime(0);
    setDuration(0);
    setIndex(target);
  };

  const next = () => goTo((index + 1) % tracks.length);
  const previous = () => {
    const audio = audioRef.current;
    // Like most players: restart the song first, go back only if it just started.
    if (audio.currentTime > 3) {
      audio.currentTime = 0;
      return;
    }
    goTo((index - 1 + tracks.length) % tracks.length);
  };
  const toggle = () => {
    const audio = audioRef.current;
    if (audio.paused) audio.play().catch(() => {});
    else audio.pause();
  };
  const onEnded = () => {
    if (tracks.length === 1) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
      return;
    }
    keepPlaying.current = true;
    setTime(0);
    setDuration(0);
    setIndex((i) => (i + 1) % tracks.length);
  };

  return (
    <div className="player" role="group" aria-label="Music player">
      <audio
        ref={audioRef}
        src={track.src}
        preload="metadata"
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={onEnded}
        onSeeked={() => setSeek(null)}
      />

      <div className="player__top">
        <div className={`player__eq ${playing ? 'is-playing' : ''}`} aria-hidden="true">
          <i /><i /><i /><i />
        </div>
        <div className="player__meta">
          <p className="player__label">NERV AUDIO // TRACK {index + 1} OF {tracks.length}</p>
          <p className="player__title" title={track.title}>{track.title}</p>
        </div>
      </div>

      <ElasticSlider
        className="player__seek"
        value={seek ?? Math.min(time, duration || 1)}
        maxValue={duration || 1}
        onChange={(v) => setSeek(v)}
        onChangeEnd={(v) => { audioRef.current.currentTime = v; }}

        valuePosition="bubble"
        leftIcon={<span className="player__time">{fmt(seek ?? time)}</span>}
        rightIcon={<span className="player__time">{fmt(duration)}</span>}
        thickness={4}
        activeThickness={10}
        maxStretch={24}
        rangeColor="var(--green)"
        iconColor="var(--silver)"
        ariaLabel="Seek"
        disabled={!duration}
      />

      <div className="player__row">
        <div className="player__controls">
          <button className="player__btn" onClick={previous} aria-label="Previous track">
            <SkipBack size={18} aria-hidden="true" />
          </button>
          <button className="player__btn player__btn--play" onClick={toggle} aria-label={playing ? 'Pause' : 'Play'}>
            {playing ? <Pause size={22} aria-hidden="true" /> : <Play size={22} aria-hidden="true" />}
          </button>
          <button className="player__btn" onClick={next} aria-label="Next track">
            <SkipForward size={18} aria-hidden="true" />
          </button>
        </div>

        <ElasticSlider
          className="player__volume"
          defaultValue={70}
          valuePosition="none"
          leftIcon={<Volume1 size={18} />}
          rightIcon={<Volume2 size={18} />}
          onChange={(v) => { audioRef.current.volume = v / 100; }}
          thickness={4}
          activeThickness={10}
          maxStretch={30}
          rangeColor="var(--green)"
          iconColor="var(--silver)"
          ariaLabel="Volume"
        />
      </div>
    </div>
  );
}