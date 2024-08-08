import { Link } from "react-router-dom";

export default function Footer () {
    return(
  <section className="footer">
    
  <div className="box-container">

    <div className="box">
      <h3>our branches</h3>
      <a href="#"><i class="fas fa-map-marker-alt"></i>lattakia</a>
      <a href="#"><i class="fas fa-map-marker-alt"></i>alhasakh</a>
      <a href="#"><i class="fas fa-map-marker-alt"></i>dmascuse</a>
      <a href="#"><i class="fas fa-map-marker-alt"></i>allepo</a>
      <a href="#"><i class="fas fa-map-marker-alt"></i>Daraa</a>
    </div>
    <div className="box">
      <h3>quick links</h3>
      <Link to="/"><i class="fas fa-arrow-right"></i><span>Home</span></Link>
      <Link to="/jobhome"><i class="fas fa-arrow-right"></i>Jobs</Link>
      <Link to="/categoriesHome"><i class="fas fa-arrow-right"></i>Gategories</Link>
      <Link to="/offers"><i class="fas fa-arrow-right"></i>Offers</Link>
      <Link to="/concat"><i class="fas fa-arrow-right"></i>Concat Us</Link>

    </div>
    <div className="box">
      <h3>quick links</h3>
      <a href="#"><i class="fas fa-phone"></i>0995570960</a>
      <a href="#"><i class="fas fa-phone"></i>0930135216</a>
      <a href="#"><i class="fas fa-envelope"></i>msjob@gmail.com</a>
      <a href="#"><i class="fas fa-map-marker-alt"></i>lattakia</a>


    </div>
    <div className="box">
      <h3>quick links</h3>
      <a href="#"><i class="fab fa-facebook"></i>facebook</a>
      <a href="#"><i class="fab fa-instagram"></i>instagram</a>
      <a href="#"><i class="fab fa-whatsapp"></i>whatsapp</a>
      <a href="#"><i class="fab fa-twitter"></i>twitter</a>
    </div>


  </div>

</section>
    )
}