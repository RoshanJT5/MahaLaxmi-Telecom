"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import styles from "./information-drawer.module.css";

export interface TeamMember {
  id: string;
  slug: string;
  title: string;
  /** Rendered as raw HTML (`dangerouslySetInnerHTML`) — trusted content only. */
  content: string;
  featuredImage: string | { node: { sourceUrl: string } };
  teams: {
    designation: string;
    linkedin?: string;
    profilePicture?: string | { node: { sourceUrl: string } };
  };
}

function getImageSource(image?: string | { node?: { sourceUrl?: string } }) {
  if (typeof image === "string") return image;
  return image?.node?.sourceUrl;
}

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  return prefersReducedMotion;
}

export interface TeamDrawerProps {
  open: boolean;
  member: TeamMember | null;
  teams: TeamMember[];
  onClose: () => void;
  /** GSAP tween duration (seconds) for the drawer panel and overlay. */
  duration?: number;
  /** GSAP ease for the overlay and content fades. */
  ease?: string;
  /** GSAP tween delay (seconds). */
  delay?: number;
  /** Drawer panel background color. */
  backgroundColor?: string;
  /** Drawer panel text color. */
  textColor?: string;
  /** Backdrop opacity while the drawer is open. */
  overlayOpacity?: number;
  /** GSAP tween duration (seconds) for the staged content fade in/out. */
  contentDuration?: number;
}

/**
 * Controlled full-height detail drawer. The parent owns `open` + `member`;
 * the drawer keeps rendering the last member through the close animation,
 * then calls `onClose` so the parent can clear state.
 */
export function TeamDrawer({
  open,
  member,
  teams,
  onClose,
  duration = 0.65,
  ease = "power2.inOut",
  delay = 0,
  backgroundColor = "#fffdfa",
  textColor = "#14100a",
  overlayOpacity = 0.35,
  contentDuration = 0.25,
}: TeamDrawerProps) {
  const [renderMember, setRenderMember] = useState<TeamMember | null>(member);
  const [closing, setClosing] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const shown = open && !closing;
  const teamList: TeamMember[] = Array.isArray(teams) ? teams : [];

  const lockScroll = () => {
    if (typeof document !== "undefined") document.body.style.overflow = "hidden";
  };
  const unlockScroll = () => {
    if (typeof document !== "undefined") document.body.style.overflow = "";
  };

  useEffect(() => {
    if (open && member) {
      setRenderMember(member);
      setClosing(false);
      lockScroll();
    }
  }, [open, member]);

  const handleClose = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    unlockScroll();

    const fadeOut = prefersReducedMotion ? 0 : contentDuration;
    gsap.to(contentRef.current, {
      opacity: 0,
      duration: fadeOut,
      ease,
      overwrite: "auto",
    });

    setClosing(true);
    closeTimeout.current = setTimeout(
      () => {
        onClose();
        setClosing(false);
        closeTimeout.current = null;
      },
      (fadeOut + (prefersReducedMotion ? 0 : duration + delay)) * 1000,
    );
  };

  const stepMember = (dir: 1 | -1) => {
    if (!renderMember || teamList.length < 2) return;
    const idx = teamList.findIndex((item) => item.id === renderMember.id);
    const next = teamList[(idx + dir + teamList.length) % teamList.length];
    setRenderMember(next);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.to(overlayRef.current, {
      opacity: shown ? overlayOpacity : 0,
      duration: prefersReducedMotion ? 0 : duration,
      ease,
      delay: prefersReducedMotion ? 0 : delay,
      overwrite: "auto",
    });
  }, [shown, duration, ease, delay, overlayOpacity, prefersReducedMotion]);

  // Fade the content in only after the drawer panel has finished sliding open.
  useEffect(() => {
    if (typeof window === "undefined" || !shown) return;
    gsap.fromTo(
      contentRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: prefersReducedMotion ? 0 : contentDuration,
        ease,
        delay: prefersReducedMotion ? 0 : delay + duration,
        overwrite: "auto",
      },
    );
  }, [shown, renderMember, duration, contentDuration, ease, delay, prefersReducedMotion]);

  useEffect(() => {
    if (!shown) return;
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shown, contentDuration, duration, delay, ease, prefersReducedMotion]);

  useEffect(() => {
    return () => {
      if (closeTimeout.current) clearTimeout(closeTimeout.current);
      unlockScroll();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const memberIndex = renderMember ? teamList.findIndex((item) => item.id === renderMember.id) : -1;
  const featuredImageSource = renderMember ? getImageSource(renderMember.featuredImage) : undefined;

  return (
    <div
      className={`${styles.root} ${shown ? styles.rootOpen : ""}`}
      aria-hidden={!shown && !renderMember}
    >
      <div ref={overlayRef} onClick={handleClose} className={styles.overlay} />
      <aside
        className={`${styles.panel} ${shown ? styles.panelOpen : ""}`}
        style={{
          backgroundColor,
          color: textColor,
          transitionDuration: prefersReducedMotion ? "0s" : `${duration}s`,
          transitionDelay: prefersReducedMotion ? "0s" : `${delay}s`,
        }}
        role="dialog"
        aria-modal="true"
        aria-label={renderMember ? `${renderMember.title} profile` : "Team member profile"}
      >
        <div ref={contentRef} className={styles.content}>
          {renderMember && (
            <>
              <div className={styles.topRow}>
                <button type="button" aria-label="Close profile" className={styles.closeBtn} onClick={handleClose}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M4 4L20 20M20 4L4 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
                <span className={styles.counter}>
                  {memberIndex + 1}/{teamList.length}
                </span>
              </div>
              <div className={styles.divider} />
              <p className={styles.eyebrow}>Leadership</p>
              <h2 className={styles.name}>{renderMember.title}</h2>
              <p className={styles.role}>{renderMember.teams.designation}</p>
              {featuredImageSource && (
                <div className={styles.photo}>
                  <img src={featuredImageSource} alt={`${renderMember.title} portrait`} loading="lazy" />
                </div>
              )}
              <div className={styles.bio} dangerouslySetInnerHTML={{ __html: renderMember.content }} />
              <div className={styles.navRow}>
                <div className={styles.navBtns}>
                  <button type="button" className={styles.navBtn} onClick={() => stepMember(-1)} aria-label="Previous profile">
                    <span aria-hidden="true">←</span> Prev
                  </button>
                  <button type="button" className={styles.navBtn} onClick={() => stepMember(1)} aria-label="Next profile">
                    Next <span aria-hidden="true">→</span>
                  </button>
                </div>
                {renderMember.teams.linkedin && (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={renderMember.teams.linkedin}
                    aria-label={`${renderMember.title} on LinkedIn`}
                    className={styles.linkedin}
                  >
                    <svg viewBox="0 0 37 36" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M12.8072 35.3548C12.7917 35.2159 12.7686 35.0769 12.7686 34.938C12.7686 27.2802 12.7686 19.6146 12.7686 11.9568C12.7686 11.8178 12.7686 11.6789 12.7686 11.5091C15.4241 11.5091 18.0487 11.5091 20.7043 11.5091C20.7043 12.5975 20.7043 13.6783 20.7043 14.7667C20.7352 14.7822 20.7583 14.7976 20.7892 14.813C20.9127 14.6664 21.0362 14.5197 21.1675 14.3807C22.6496 12.7287 24.3711 11.4087 26.602 11.0536C30.2688 10.4824 34.4374 11.895 36.1434 16.4882C36.5835 17.6847 36.8382 18.9199 36.9231 20.1936C36.9308 20.3171 36.9694 20.4406 37.0003 20.5641C37.0003 25.4969 37.0003 30.422 37.0003 35.3548C34.3525 35.3548 31.7124 35.3548 29.0646 35.3548C29.0646 35.185 29.0569 35.0229 29.0569 34.8531C29.0569 30.8543 29.0646 26.8479 29.0492 22.8491C29.0414 22.0617 28.972 21.2589 28.833 20.4792C28.3775 17.9858 26.4168 16.7352 23.9542 17.3296C22.225 17.7465 20.766 19.5297 20.7506 21.3438C20.7274 25.991 20.7352 30.6305 20.7352 35.2776C20.7352 35.3008 20.7429 35.3317 20.7506 35.3548C18.0951 35.3548 15.455 35.3548 12.8072 35.3548Z" />
                      <path d="M0.478818 35.355C0.471098 35.2006 0.463379 35.0462 0.463379 34.8918C0.463379 27.2571 0.463379 19.6147 0.463379 11.9801C0.463379 11.8257 0.463379 11.679 0.463379 11.5015C3.1112 11.5015 5.72813 11.5015 8.41455 11.5015C8.41455 19.4526 8.41455 27.4038 8.41455 35.355C5.77445 35.355 3.12663 35.355 0.478818 35.355Z" />
                      <path d="M4.59731e-05 4.12196C0.00776555 2.05311 1.40501 0.416562 3.45842 0.0923393C4.79391 -0.116089 6.08308 -0.00801527 7.21014 0.794821C8.62282 1.80609 9.13231 3.24965 8.83897 4.91708C8.54562 6.60767 7.44944 7.64981 5.80517 8.08211C4.70127 8.37545 3.59737 8.32913 2.52435 7.91228C0.957274 7.29471 -0.00767361 5.83571 4.59731e-05 4.12196Z" />
                    </svg>
                  </a>
                )}
              </div>
            </>
          )}
        </div>
      </aside>
    </div>
  );
}
