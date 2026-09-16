'use client';

import { useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { BrandLogo, partnerBrands } from './Editorial';

// Adapted from the 21st.dev logo carousel pattern: a duplicated track,
// masked edges, and a static reduced-motion presentation.
// https://docs.21st.dev/@cult-ui/components/logo-carousel
export default function BrandMarquee() {
  const [paused, setPaused] = useState(false);

  const logos = (duplicate: boolean) => <div className="brand-marquee__group" aria-hidden={duplicate}>
    {partnerBrands.map((brand) => <div className="brand-marquee__logo" key={brand.name}>
      <BrandLogo brand={brand} decorative={duplicate} />
    </div>)}
  </div>;

  return <div className={`brand-marquee${paused ? ' is-paused' : ''}`}>
    <div className="brand-marquee__viewport">
      <div className="brand-marquee__track">{logos(false)}{logos(true)}{logos(true)}</div>
    </div>
    <button className="brand-marquee__toggle" type="button" onClick={() => setPaused((value) => !value)} aria-label={paused ? 'Play brand logos' : 'Pause brand logos'}>
      {paused ? <Play size={14} fill="currentColor" /> : <Pause size={14} fill="currentColor" />}
      <span>{paused ? 'Play motion' : 'Pause motion'}</span>
    </button>
  </div>;
}
