'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const scenes = [
  { title: 'A store worth stepping into.', body: 'From the street, the experience begins with an open door and the confidence of a familiar name.' },
  { title: 'Discover every detail.', body: 'Explore a considered showroom with leading devices, accessories and technology within reach.' },
  { title: 'See it. Hold it. Compare it.', body: 'Customers can experience products in person and choose with the help of real people.' },
  { title: 'Built around people.', body: 'Honest guidance and space to decide turn a transaction into a relationship.' },
  { title: 'Bring this experience to your city.', body: 'Our retail formats make the same standard available to entrepreneurs across Maharashtra.' },
];

export default function SpriteExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(0);
  const [ready, setReady] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(motion.matches);
    if (motion.matches) return;

    let near = false;
    let metadataReady = false;
    let target = 0;
    let raf = 0;
    let lastBeat = -1;
    let primed = false;
    let variant = window.innerWidth < 768 ? 'mobile' : 'desktop';

    // The decoder handles one seek at a time. Discard intermediate scroll
    // positions and seek only to the newest target when it becomes free.
    const seek = () => {
      raf = 0;
      if (!near || !metadataReady || video.seeking || !Number.isFinite(video.duration)) return;
      const time = Math.min(video.duration - 0.05, Math.max(0, target * video.duration));
      if (Math.abs(video.currentTime - time) > 1 / 30) video.currentTime = time;
    };
    const scheduleSeek = () => {
      if (!raf) raf = requestAnimationFrame(seek);
    };
    const onScroll = () => {
      const bounds = section.getBoundingClientRect();
      const distance = Math.max(1, bounds.height - window.innerHeight);
      target = Math.min(1, Math.max(0, -bounds.top / distance));
      const beat = Math.min(scenes.length - 1, Math.floor(target * scenes.length));
      if (beat !== lastBeat) { lastBeat = beat; setActive(beat); }
      scheduleSeek();
    };
    const loadVideo = () => {
      near = true;
      video.preload = 'auto';
      video.src = variant === 'mobile'
        ? '/page-section2/jm-scroll-mobile.mp4'
        : '/page-section2/jm-scroll-desktop.mp4';
      video.load();
      onScroll();
    };
    const onMetadata = () => {
      metadataReady = true;
      scheduleSeek();
    };
    const onFrame = () => {
      if (Math.abs(video.currentTime - target * video.duration) < 0.1) setReady(true);
    };
    const onSeeked = () => {
      onFrame();
      scheduleSeek();
    };
    const onResize = () => {
      const next = window.innerWidth < 768 ? 'mobile' : 'desktop';
      if (next !== variant) {
        variant = next;
        metadataReady = false;
        primed = false;
        setReady(false);
        if (near) loadVideo();
      }
      onScroll();
    };
    const primeOnTouch = () => {
      if (!near || primed) return;
      primed = true;
      void video.play().then(() => {
        video.pause();
        scheduleSeek();
      }).catch(() => { primed = false; });
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !near) loadVideo();
    }, { rootMargin: '100% 0px' });

    video.addEventListener('loadedmetadata', onMetadata);
    video.addEventListener('loadeddata', onFrame);
    video.addEventListener('seeked', onSeeked);
    observer.observe(section);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    section.addEventListener('touchstart', primeOnTouch, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      section.removeEventListener('touchstart', primeOnTouch);
      video.removeEventListener('loadedmetadata', onMetadata);
      video.removeEventListener('loadeddata', onFrame);
      video.removeEventListener('seeked', onSeeked);
      cancelAnimationFrame(raf);
      video.pause();
    };
  }, []);

  return <section ref={sectionRef} className={`sprite-experience${reduced ? ' sprite-experience--static' : ''}`} aria-label="A look inside the Jagyasi Mobiles store">
    <div className="sprite-experience__sticky">
      <div className="sprite-experience__media">
        <picture className={`sprite-experience__poster${ready ? ' is-hidden' : ''}`}><source media="(max-width: 767px)" srcSet="/page-section2/poster-mobile.jpg" /><img src="/page-section2/poster.jpg" alt="Jagyasi Mobiles storefront" /></picture>
        <video ref={videoRef} muted playsInline preload="none" aria-hidden="true" />
      </div>
      <div className="sprite-experience__shade" />
      <div className="sprite-experience__content wrap">
        <div className="sprite-experience__label"><span>THE IN-STORE EXPERIENCE</span><ArrowDownRight size={18} /></div>
        <div className="sprite-experience__copy" key={active}><span className="sprite-experience__counter">{String(active + 1).padStart(2, '0')} / 05</span><h2>{scenes[active].title}</h2><p>{scenes[active].body}</p>{active === 4 && <Link href="/franchise" className="text-link text-link--light">Explore the franchise <ArrowUpRight size={18} /></Link>}</div>
        <div className="sprite-experience__progress" aria-hidden="true">{scenes.map((scene, index) => <span key={scene.title} className={index === active ? 'is-active' : ''} />)}</div>
      </div>
    </div>
  </section>;
}
