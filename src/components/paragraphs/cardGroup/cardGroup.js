import React, { useEffect, useRef } from "react"
import { graphql } from "gatsby";
import Img from 'gatsby-image';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import './cardGroup.scss';

export const ParagraphCardGroup = ({ node }) => {
  const cardsGroup = useRef();
  useEffect(() => {
    if (typeof window !== `undefined`) {
      gsap.registerPlugin(ScrollTrigger)
      gsap.core.globals('ScrollTrigger', ScrollTrigger)
    }
    const cards = cardsGroup.current.querySelectorAll('.card');
    gsap.fromTo(cards, {
      y: 100,
      autoAlpha: 0,
      scale: 0.8,
    },{
      y: 0,
      autoAlpha: 1,
      scale: 1,
      ease: "power1.inOut",
      stagger: {
        each: 0.1,
        from: "center",
      },
      scrollTrigger: {
        start: "top center",
        trigger: cardsGroup.current,
      }
    });
  },[]);
  const cards = node.relationships.field_card;
  return (
    <div className="container card-group" ref={cardsGroup}>
      {cards.map((card, index) => {
        const image = card.relationships.field_image.relationships.field_media_image.localFile.childImageSharp.fluid
        return  (
          <div className="card" key={index}>
            <div className="card__image-wrapper">
              <Img className="card__image" fluid={image} alt={card.field_headline}  />
            </div>
            <div className="card__copy">
              <h3>{card.field_headline}</h3>
              <p>{card.field_description}</p>
              {card.field_link &&
                <a href={card.field_link.uri} className="button">{card.field_link.title ? card.field_link.title : 'Learn More'}</a>
              }
            </div>
          </div>
        )
      })}
    </div>
  )
}

export const fragment = graphql`
  fragment ParagraphCardGroup on paragraph__cards_group {
    id
    drupal_internal__id
    relationships {
      field_card {
        field_headline
        field_description
        field_link {
          title
          uri
        }
        relationships {
          field_image {
            relationships {
              field_media_image {
                localFile {
                  childImageSharp {
                    fluid(maxWidth:780) {
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;