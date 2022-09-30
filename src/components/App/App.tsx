// import { gsap } from 'gsap';
import useWindowSize from '../../hooks/useWindowSize';

import './app.scss';

// importing of assets
import img1 from '../../assets/1.jpg'
import img2 from '../../assets/2.jpg'
import img3 from '../../assets/3.jpg'
import img4 from '../../assets/4.jpg'
import img5 from '../../assets/5.jpg'
import img6 from '../../assets/6.jpg'

const images: string[] = [img1, img2, img3, img4, img5, img6]

const App = () => {
    const {width, height} = useWindowSize();

    // console.log(width, height)

    return (
        <div className="AppMain">
            <div className="topBar">STANLEY TO</div>
            {
                images.map((echItem, index) => {
                    return (
                        <div className="bthCvr" key={index}>
                            <div className="imgCvr">
                                <img src={echItem} alt="People" />
                            </div>
                            {index < (images.length - 1) && (
                                <div className="h2Cvr">
                                    <h2>Skew <span className="outline">Scrolling</span></h2>
                                </div>
                            )}
                        </div>
                    )
                })
            }
        </div>
    )
}
export default App;