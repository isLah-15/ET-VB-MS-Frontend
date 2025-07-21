import { Link } from "react-router-dom";

const FooterLanding = () => {
    return (
        <div>
            <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10">
  <aside>
    <img 
    src="src\Assets\Images\Download SC Logo monogram design template for free.jpg"   
    width="50"
    height="50"/>
    <p>
      ACME Industries Ltd.
      <br />
      Providing reliable tech since 1992
    </p>
  </aside>
  <nav>
    <h6 className="footer-title">Services</h6>
    <a className="link link-hover">Event Planning</a>
    <a className="link link-hover">Entertainment</a>
    <a className="link link-hover">Marketing</a>
    <a className="link link-hover">Advertisement</a>
  </nav>
  <nav>
    <h6 className="footer-title">Company</h6>
    <Link to="/about" className="link link-hover">
    About us
    </Link>
    <a className="link link-hover">Contact</a>
    <a className="link link-hover">Jobs</a>
    
  </nav>
  <nav>
    <h6 className="footer-title">Legal</h6>
    <a className="link link-hover">Terms of use</a>
    <a className="link link-hover">Privacy policy</a>
    <a className="link link-hover">Cookie policy</a>
  </nav>
</footer>
  </div>
  );
};
        
export default FooterLanding;