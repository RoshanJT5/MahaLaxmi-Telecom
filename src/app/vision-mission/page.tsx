import SiteShell from '@/components/SiteShell';
import VisionMissionSections from '@/components/VisionMissionSections';

export default function VisionMissionPage() {
  return (
    <SiteShell transparentOnTop>
      <main id="main-content">
        <VisionMissionSections standalone />
      </main>
    </SiteShell>
  );
}
