import { permanentRedirect } from 'next/navigation';

export default function OurStoryPage() {
  permanentRedirect('/about#our-story');
}
