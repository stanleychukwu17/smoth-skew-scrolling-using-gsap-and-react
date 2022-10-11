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
import img7 from '../../assets/1.jpg'
import img8 from '../../assets/2.jpg'
import img9 from '../../assets/3.jpg'
import { useCallback, useEffect, useRef } from 'react';

const images: string[] = [img1, img2, img3, img4, img5, img6, img7, img8, img9]

// the configuration for the skewing and smooth-scrolling
const skewConfigs = {
    ease: .05, // the higher this number, the lesser the skew, try 0.5 and see, then try 0.1
    current: 0, // the current window.scrollY position of the user
    previous: 0, // the (current - previous) * ease
    rounded: 0 // the Math.round(previous)
}

const App = () => {
    const appRef = useRef<HTMLDivElement>({} as HTMLDivElement)
    const scrollParentRef = useRef<HTMLDivElement>({} as HTMLDivElement)

    // the useWindowSize is a hook that returns the current height and width of the user viewport, also monitor's the viewport for any changes so that the current dimensions are returned 
    let {width: windowWidth, height: windowHeight} = useWindowSize();

    // updates the height of the body to the scroll container height anytime the window height changes
    const updateBodyHeight = useCallback(() => {
        // teacher did:
        document.body.style.height = `${scrollParentRef.current.getBoundingClientRect().height}px`

        // we could have done this as well:
        // document.querySelector('body')!.style.height = `${scrollParentRef.current.getBoundingClientRect().height}px`
    }, [])

    // calls the updateBodyHeight() function, also uses the setTimeOut to ensure that all the images have been loaded and then calls the function again
    useEffect(() => {
        updateBodyHeight()

        setTimeout(() => { updateBodyHeight(); }, 1000);
    }, [updateBodyHeight, windowHeight])

    // handles the smooth scrolling and skewing
    const smoothSkewFunc = useCallback(() => {
        skewConfigs.current = window.scrollY
        skewConfigs.previous += (skewConfigs.current - skewConfigs.previous) * skewConfigs.ease
        skewConfigs.rounded = Math.round(skewConfigs.previous * 100) / 100

        // variables
        const difference = skewConfigs.current - skewConfigs.rounded
        const acceleration = difference / windowWidth // this is because we want to slow down the skewing on mobile devices
        const velocity = +acceleration // the higher the velocity of the user scrolling, the higher the skewing
        const skew = velocity * 7.5; // if you also increase the 7.5 value, it increases the skewing effect

        // updates the scroll position of the scroll-container and also adds the skew effect
        scrollParentRef.current.style.transform = `translate3d(0,-${skewConfigs.rounded}px,0) skewY(${skew}deg)`
        requestAnimationFrame(() => smoothSkewFunc())
    }, [])

    // allows the page to load before we call the smoothSkewScrolling() function
    useEffect(() => {
        requestAnimationFrame(() => smoothSkewFunc())
    }, [smoothSkewFunc])

    return (
        // the App main is styled so the the App is not scrollable, check out the css styling of .AppMain and .scrollParent
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
                                <div className="h2Cvr">
                                    <h2>Skew <span className="outline">Scrolling</span></h2>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default App;