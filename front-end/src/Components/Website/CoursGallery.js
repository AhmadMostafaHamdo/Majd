import main from '../../Assets/video/1.mp4';
import main2 from '../../Assets/video/2.mp4';
import main3 from '../../Assets/video/3.mp4';
import main4 from '../../Assets/video/4.mp4';
import main5 from '../../Assets/video/5.mp4';
import main6 from '../../Assets/video/6.mp4';
import Footer from './Footer';
import Nav from './Navbar';


export default function CoursGallery() {
    let mainVideo = document.querySelector(".main-video video");
    let videoList = document.querySelectorAll(".video-list .vid");
    let titleVideo = document.querySelector(".main-video .title");
videoList.forEach(video => {
    video.onclick = () => {
        videoList.forEach( (vid) => {
            vid.classList.remove("active");
            video.classList.add("active")
            if(video.classList.contains("active")) {
                let sr = video.children[0].getAttribute("src");
                mainVideo.src = sr;
                let text = video.children[1].innerHTML;
                titleVideo.innerHTML = text;
            }
        })
    }
})
    return(
      <>
        <Nav/>
           <div className="gallery">
            <div className="main-video">
                <div className="video">
                    <video src={main}    controls autoplay ></video>
                    <h3 className="title">كورس شامل لتعلم اللغة الانجليزية من الصفر للمبتدئين كورس كامل من البداية الى الاحتراف  الحلقة 1.mp4</h3>
                </div>
            </div>
            <div className="video-list">
                {window.localStorage.getItem("id") == 1
                    ? <><div className="vid active ">
                    <video src={main}  muted ></video>          
                    <h3 className="title">كورس شامل لتعلم اللغة الانجليزية من الصفر للمبتدئين كورس كامل من البداية الى الاحتراف  الحلقة     .mp4</h3>
                </div>
                <div className="vid">
                        <video src={main2}  muted poster={require('../../Assets/images/logo.png')}></video>          
                        <h3 className="title">كورس شامل لتعلم اللغة الانجليزية من الصفر للمبتدئين كورس كامل من البداية الى الاحتراف  الحلقة 2.mp4</h3>
                </div></>
                    : window.localStorage.getItem("id") == 2
                        ? <> <div className="vid active ">
                        <video src={main}  muted ></video>          
                        <h3 className="title">كورس شامل لتعلم اللغة الانجليزية من الصفر للمبتدئين كورس كامل من البداية الى الاحتراف  الحلقة 1.mp4</h3>
                    </div>
                    <div className="vid">
                            <video src={main2}  muted ></video>          
                            <h3 className="title">كورس شامل لتعلم اللغة الانجليزية من الصفر للمبتدئين كورس كامل من البداية الى الاحتراف  الحلقة 2.mp4</h3>
                    </div>
                    <div className="vid">
                            <video src={main3}  muted ></video>               
                            <h3 className="title">كورس شامل لتعلم اللغة الانجليزية من الصفر للمبتدئين كورس كامل من البداية الى الاحتراف  الحلقة 3.mp4</h3>
                    </div></>
                        : <><div className="vid active ">
                        <video src={main}  muted ></video>          
                        <h3 className="title">كورس شامل لتعلم اللغة الانجليزية من الصفر للمبتدئين كورس كامل من البداية الى الاحتراف  الحلقة 1.mp4</h3>
                    </div>
                    <div className="vid">
                            <video src={main2}  muted ></video>          
                            <h3 className="title">كورس شامل لتعلم اللغة الانجليزية من الصفر للمبتدئين كورس كامل من البداية الى الاحتراف  الحلقة 2.mp4</h3>
                    </div>
                    <div className="vid">
                            <video src={main3}  muted ></video>               
                            <h3 className="title">كورس شامل لتعلم اللغة الانجليزية من الصفر للمبتدئين كورس كامل من البداية الى الاحتراف  الحلقة 3.mp4</h3>
                    </div>
                    <div className="vid">
                            <video src={main4}  muted ></video>               
                            <h3 className="title">كورس شامل لتعلم اللغة الانجليزية من الصفر للمبتدئين كورس كامل من البداية الى الاحتراف  الحلقة 4.mp4</h3>
                    </div></>
                }
                
            </div>
        </div>
        <Footer/>
      </>
    )
}