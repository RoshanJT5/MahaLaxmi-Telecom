import SiteShell from '@/components/SiteShell';
import styles from './leadership.module.css';

const DIRECTORS = [
  { id:'PJ', name:'Pradip Jagyasi', role:'CEO & Co-Founder', bio:'Sets the company’s overall vision and strategy, and leads growth, brand partnerships and franchise expansion across Maharashtra and beyond.', active:true },
  { id:'GJ', name:'Gautam Jagyasi', role:'Managing Director', bio:'', active:false },
  { id:'NW', name:'Nilesh Wadhvani', role:'Whole-Time Director', bio:'', active:false },
  { id:'KJ', name:'Kapil Jagyasi', role:'Whole-Time Director', bio:'', active:false },
  { id:'VJ', name:'Vijay Jagyasi', role:'Whole-Time Director', bio:'', active:false },
];

export default function LeadershipPage() {
  return (
    <SiteShell>
      <main id="main-content">
        <section className={styles.topSection}>
          <div className={styles.topContainer}>
            <p className={styles.eyebrow}>Leadership</p>
            <h1 className={styles.topTitle}>The people behind<br /><span className={styles.topTitleGold}>every store</span>.</h1>
            <p className={styles.topIntro}>A leadership team drawn from two decades of telecom distribution, now focused on building a premium retail chain.</p>
          </div>
        </section>

        <section className={styles.boardSection}>
          <div className={styles.boardContainer}>
            <p className={styles.eyebrow}>Board & Leadership</p>
            <h2 className={styles.boardTitle}>Five directors, one shared standard of retail.</h2>

            <div className={styles.grid}>
              {DIRECTORS.map(d=>(
                <div key={d.id} className={`${styles.card} ${d.active?styles.cardActive:''}`}>
                  <div className={`${styles.avatar} ${d.active?styles.avatarFilled:styles.avatarOutline}`}>{d.id}</div>
                  <h3 className={styles.cardName}>{d.name}</h3>
                  <p className={styles.cardRole}>{d.role}</p>
                  {d.active ? <p className={styles.cardBio}>{d.bio}</p> : <div style={{flex:1}}/>}
                  <a href="#" className={`${styles.cardLink} ${!d.active?styles.cardLinkMuted:''}`}>{d.active?'— Profile':'View Profile'}</a>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
