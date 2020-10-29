import React, { useEffect, useRef } from "react"
import { graphql } from "gatsby";
import Img from 'gatsby-image';
import { gsap, Back } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import './contentFeature.scss';

export const ParagraphContentFeature = ({ node }) => {
  const contentFeature = useRef();
  useEffect(() => {
    if (typeof window !== `undefined`) {
      gsap.registerPlugin(ScrollTrigger)
      gsap.core.globals('ScrollTrigger', ScrollTrigger)
    }
    gsap.fromTo(contentFeature.current, {
      y: 200,
      autoAlpha: 0,
    },{
      y: 0,
      autoAlpha: 1,
      duration: 1.8,
      ease: Back.easeInOut.config(1.7),
      scrollTrigger: {
        trigger: contentFeature.current,
      }
    });
  },[]);
  return (
    <div className="container content-feature" ref={contentFeature}>
      <div className="content-feature__content">
        <h3>{node.field_headline}</h3>
        <p>{ node.field_description}</p>
        <a href={node.field_link.uri} className="button content-feature__button">{node.field_link.title}</a>
      </div>
      <div className="content-feature__image-wrapper">
        <Img className="content-feature__image" fluid={node.relationships.field_image.relationships.field_media_image.localFile.childImageSharp.fluid} alt='test'  />
      </div>
    </div>
  )
}

export const fragment = graphql`
  fragment ParagraphContentFeature on  paragraph__content_feature {
    id
    drupal_internal__id
    field_headline
    field_description
    field_link {
      uri
      title
    }
    relationships {
      field_image {
        relationships {
          field_media_image {
            localFile {
              childImageSharp {
                fluid(maxWidth:1080) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
  }
`;