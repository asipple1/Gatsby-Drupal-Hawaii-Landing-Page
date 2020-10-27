import React, { useEffect} from "react"
import { graphql } from "gatsby"
import gsap from "gsap";
import { ReactSVG } from 'react-svg'
import Hawaii from '../images/hawaii.svg'

import Layout from "../components/layout"

import SEO from "../components/seo"
import Marquee from "../components/marquee/marquee";

// Paragraphs.
import { getParagraph } from "../components/paragraphs/paragraphHelpers";

const IndexPage = ({data}) => {
  const marqueeData = {
    "headline": data.nodePage.field_marquee_headline ? data.nodePage.field_marquee_headline : data.nodePage.title,
    "subhead": data.nodePage.field_marquee_subhead,
    "link": data.nodePage.field_marquee_link,
    "image": data.nodePage.relationships.field_marquee_im.relationships.field_media_image.localFile.childImageSharp.fluid,
    "imageAlt": data.nodePage.relationships.field_marquee_im.field_media_image.alt
  }
  const paragraphs = data.nodePage.relationships.field_content_segments.map(getParagraph);
  useEffect(() => {
    const tl = gsap.timeline();
    tl.to(['.grid-animation__item'], {
      duration: 0.4,
      y: '100%',
      stagger: {
        each: 0.4,
      }
    });
  }, []);
  return (
    <Layout>
      <SEO title="Home" />
      <Marquee data={marqueeData}/>
      <div className="content-segments">
        {paragraphs}
      </div>
      <div className="grid-animation">
        <div className="grid-animation__item"></div>
        <div className="grid-animation__item"></div>
        <div className="grid-animation__item"></div>
      </div>
    </Layout>
  )
}


export const data = graphql` {
  nodePage(drupal_internal__nid: {eq: 1}) {
    title
    field_marquee_headline
    field_marquee_subhead
    field_marquee_link {
      title
      uri
    }
    relationships {
      field_marquee_im {
        field_media_image {
          alt
        }
        relationships {
          field_media_image {
            localFile {
              childImageSharp {
                fluid(maxWidth:2000) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
      field_content_segments {
        type: __typename
        ...ParagraphContentFeature
        ...ParagraphCardGroup
      }
    }
  }
}`

export default IndexPage
