import { Link } from "react-router-dom";
import "../styles/history.css";

export default function History() {
  // mock daata
  const log = [{
      id: "1",
      url: "https://www.tiktok.com/@space_nasa/video/728934112",
      // verdict: "verified",
      date: 1722115800000,
    },
    {
      id: "2",
      url: "https://www.tiktok.com/@randomuser/video/728122334",
      // verdict: "unverified",
      date: 1722029400000,        
    },
    {
      id: "3",
      url: "https://www.tiktok.com/@healthguru/video/727890112",
      // verdict: "verified",
      date: 1721856600000,         
    },
    {
      id: "4",
      url: "https://www.tiktok.com/@flat_earth/video/726456789",
      // verdict: "unverified",
      date: 1721241000000,          
    },];
    
    return (
    // history page
    <div className="history">
        {/* header */}
        <header>
            <h2>Search History</h2>
            <button className="btn-clear" disabled>clear</button>
        </header>
        
        {/* search list */}
        {log.length === 0 ? (
            <p className="empty">Nothing here yet.</p>):(
            <ul className="list">
                {log.map(({id, url, date}) => (
                    <li key={id} className="item">
                        <a href={url} target="_blank" rel="noreferrer">{url}</a>
                        {/* <span className={`tag ${verdict}`}>{verdict}</span> */}
                        <time>{new Date(date).toLocaleDateString()}</time>
                    </li>
                ))}
            </ul>)}
            {/* back button */}
            <Link to="/" className="back"> ← back</Link>
        </div>
    );
}
