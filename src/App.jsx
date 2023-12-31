import styles from "./App.module.css"
import Chatbox from './components/Chatbox';
import { FaFacebook, FaLinkedin, FaGlobe } from "react-icons/fa";

export default function App() {
 

  return (
    <div className={styles.container}>
      <div className={styles.top}>Powered by Intelsense AI</div>
      <main className={styles.main}>
        <div className={styles.video}>
          <video
            muted
            width="100%"
            autoPlay
            loop
            playsInline
            aria-hidden
            data-object-fit
          >
            <source src={"/leadspace.mp4"} type="video/mp4" />
          </video>
        </div>
        <div className={styles.mainContent}>
          <div className={styles.logo}>
            <img
              src={"/logo.png"}
              className={styles.logoimage}
              alt="sensebot-logo"
            />
          </div>
          {/* <h1 className={styles.title}>Sense-Bot !</h1> */}

          <p className={styles.description}>
            The SenseBots platform provides the infrastructure and core
            capabilities to power an omni-channel conversational exprience. Try
            out our work on the coversational AI technology now.
          </p>
        </div>
      </main>
      
      <Chatbox/>
      
      <footer className={styles.footer}>
        <div className={styles.footertop}>
          Made with love by <a href="https://intelsense.ai/">Intelsense.ai</a>
        </div>
        <div className={styles.links}>
          <div className={styles.link}>
            <a href="https://www.facebook.com/intelsenseai">
              <FaFacebook />
            </a>
          </div>
          <div className={styles.link}>
            <a href="https://www.linkedin.com/company/intelsenseai/">
              <FaLinkedin />
            </a>
          </div>
          <div className={styles.link}>
            <a href="https://intelsense.ai/">
              <FaGlobe />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}