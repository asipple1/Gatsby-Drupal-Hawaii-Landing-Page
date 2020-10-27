// paragraphHelpers.js
import React from "react";
import { ParagraphContentFeature } from "./contentFeature/contentFeature";
import { ParagraphCardGroup } from "./cardGroup/cardGroup";

import './paragraphs.scss';

const components = {
  paragraph__content_feature: ParagraphContentFeature,
  paragraph__cards_group: ParagraphCardGroup,
};

export const getParagraph = node => {
  if (components.hasOwnProperty(node.type)) {
    const ParagraphComponent = components[node.type];
    return (
      <div id={`content-segment-${node.drupal_internal__id}`} className={`content-segment content-segment--${node.type.replace('paragraph__','').replace(/_/g, '-')}`} key={node.id}>
        <ParagraphComponent key={node.id} node={node} />
      </div>
    );
  }
  // return <p key={node.id}>Unknown type {node.__typename}</p>;
};