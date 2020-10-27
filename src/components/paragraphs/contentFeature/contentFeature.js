import React from "react";
import { graphql } from "gatsby";
import Img from 'gatsby-image';
import './contentFeature.scss';

export const ParagraphContentFeature = ({ node }) => (
  <div className="container content-feature">
    <div className="content-feature__content">
      <h3>{node.field_headline}</h3>
      <p>{ node.field_description}</p>
      <a href={node.field_link.uri} className="button content-feature__button">{node.field_link.title}</a>
    </div>
    <div className="content-feature__image-wrapper">
      <Img className="content-feature__image" fluid={node.relationships.field_image.relationships.field_media_image.localFile.childImageSharp.fluid} alt='test'  />
    </div>
  </div>
);

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