import React, { useEffect} from "react"
import Img from 'gatsby-image';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import './marquee.scss';

const Marquee = ({data}) => {
  const {headline, subhead, link, image, imageAlt} = data;

  useEffect(() => {
    if (typeof window !== `undefined`) {
      gsap.registerPlugin(ScrollTrigger)
      gsap.core.globals('ScrollTrigger', ScrollTrigger)
    }
    const tl = gsap.timeline();
    gsap.to('.marquee__decorative-headline', {
      autoAlpha: 0.5,
      duration: 3,
      ease: "power1.inOut"
    })
    tl.to('.marquee__content h1', {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      webkitClipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      autoAlpha: 1,
      duration: 1.2,
      ease: "power3.inOut"
    })
    tl.fromTo('.marquee__link', {
      y: '50px',
    }, {
      y: '0px',
      autoAlpha: 1,
      duration: 1,
      ease: "back.out(1.7)"
    },'<')
    tl.to('.marquee__content h2', {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      webkitClipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      autoAlpha: 1,
      duration: 1,
    }, '>-0.7')
    parallax('.marquee__decorative-headline', '.marquee');
    
  }, []);

  const parallax = (target, trigger) => {
    const animationSettings = {
      scrollStart: "center center",
      scrollEnd: "bottom top",
      startYPercent: 0,
      endYPercent: 30,
    }
    gsap
    .timeline({
      defaults: { duration: 1 },
      scrollTrigger: {
        trigger: trigger,
        //markers: true,
        scrub: true,
        start: animationSettings['scrollStart'],
        end: animationSettings['scrollEnd'],
        invalidateOnRefresh: true,
      }
    })
    .fromTo(target, 
      { 
        yPercent: animationSettings['startYPercent'], 
      }, { 
        yPercent: animationSettings['endYPercent'], 
      });
  }
  return (
    <div className="marquee">
      <div className="marquee__decorative-headline">
        <h1>{headline}</h1>
      </div>
      <div className="marquee__image-container">
        <Img className="marquee__image"fluid={image} alt={imageAlt}  />
      </div>
      <div className="container marquee__content">
         <h1>{headline}</h1>
         <h2>{subhead}</h2>
         <a href={link.uri} className="button marquee__link">{link.title}</a>
      </div>
    </div>
  )
}
export default Marquee;