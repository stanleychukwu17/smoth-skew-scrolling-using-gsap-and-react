import useWindowSize from '../../hooks/useWindowSize';

// importing of stylesheet
import './app.scss';

// importing of assets
import img1 from '../../assets/1.jpg'
import img2 from '../../assets/2.jpg'
import img3 from '../../assets/3.jpg'
import img4 from '../../assets/4.jpg'
import img5 from '../../assets/5.jpg'
import img6 from '../../assets/6.jpg'
import { useCallback, useEffect, useRef } from 'react';

const images: string[] = [img1, img2, img3, img4, img5, img6]

// the configuration for the skewing and smooth-scrolling
const skewConfigs = {
    ease: .05,
    current: 0,
    previous: 0,
    rounded: 0
}

const App = () => {
    const appRef = useRef<HTMLDivElement>({} as HTMLDivElement)
    const scrollParentRef = useRef<HTMLDivElement>({} as HTMLDivElement)
    const {width: windowWidth, height: windowHeight} = useWindowSize();

    // we want to automatically update the height of the body to the scroll container height anytime the window height changes
    useEffect(() => {
        // teacher did:
        document.body.style.height = `${scrollParentRef.current.getBoundingClientRect().height}px`

        // we could have done this as well:
        // document.querySelector('body')!.style.height = `${scrollParentRef.current.getBoundingClientRect().height}px`
    }, [windowHeight])

    const skewScrolling = useCallback(() => {
        skewConfigs.current = window.scrollY
        skewConfigs.previous += (skewConfigs.current - skewConfigs.previous) * skewConfigs.ease
        skewConfigs.rounded = Math.round(skewConfigs.previous * 100) / 100

        // variables
        const difference = skewConfigs.current - skewConfigs.rounded
        const acceleration = difference / windowWidth
        const velocity = +acceleration
        const skew = velocity * 7.5;

        scrollParentRef.current.style.transform = `translate3d(0,-${skewConfigs.rounded}px,0) skewY(${skew}deg)`
        requestAnimationFrame(() => skewScrolling())
    }, [])

    useEffect(() => {
        requestAnimationFrame(() => skewScrolling())
    }, [skewScrolling])


    return (
        <div className="AppMain" ref={appRef}>
            {/* the class .scrollParent is mainly for the smooth scrolling, it has nothing to do with the skew */}
            <div className="scrollParent" ref={scrollParentRef}>
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
        </div>
    )
}
export default App;