import { aboutParagraphs } from "../../utils/aboutChat";
import './aboutContactStyles.css';

function AboutContact() {
  return (
    <section className="mainAboutContactSection">
      <h2 className="sectionTitle">SOBRE A FURIA</h2>
      { aboutParagraphs.map((paragraph, index) => (
        <p className="aboutParagraph" key={index}>{paragraph}</p>
      )) }
      <h2 className="sectionTitle">CONTATO</h2>
      <div className="socialsDiv">
        <a className="socialTag" href="https://www.instagram.com/furiagg" target="_blank">
          <img className="socialLogo" src="/src/assets/instagram.png" />
        </a>
        <a className="socialTag" href="https://x.com/furia" target="_blank">
          <img className="socialLogo" src="/src/assets/x.png" />
        </a>
        <a className="socialTag" href="https://www.tiktok.com/@furiagg" target="_blank">
          <img className="socialLogo" src="/src/assets/tiktok.png" />
        </a>
        <a className="socialTag" href="https://www.twitch.tv/furiatv" target="_blank">
          <img className="socialLogo" src="/src/assets/twitch.png" />
        </a>
        <a className="socialTag" href="https://www.facebook.com/furiagg" target="_blank">
          <img className="socialLogo" src="/src/assets/facebook.png" />
        </a>
        <a className="socialTag" href="https://www.youtube.com/furiagg" target="_blank">
          <img className="socialLogo" src="/src/assets/youtube.png" />
        </a>
      </div>
      <span className="contactSpan">Contato Inteligente da FURIA:</span>
      <a className="socialTag" href="https://wa.me/5511993404466" target="_blank">
        <img className="socialLogo" src="/src/assets/whatsapp.png" />
        <span className="obsSpan">Closed beta</span>
      </a>
    </section>
  )
}

export default AboutContact;