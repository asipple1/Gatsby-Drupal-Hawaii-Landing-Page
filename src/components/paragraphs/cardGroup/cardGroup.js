import React from "react";
import { graphql } from "gatsby";
import Img from 'gatsby-image';
import './cardGroup.scss';

export const ParagraphCardGroup = ({ node }) => {
  const cards = node.relationships.field_card;
  return (
    <div className="container card-group">
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