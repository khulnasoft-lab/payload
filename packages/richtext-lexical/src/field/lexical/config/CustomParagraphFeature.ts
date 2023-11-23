import { ParagraphNode, TextNode } from 'lexical'

import type { FeatureProvider } from '../../features/types'

import { CustomParagraphNode } from './CustomParagraphNode'
import { CustomTextNode } from './CustomTextNode'

export const CustomParagraphFeature = (): FeatureProvider => {
  return {
    feature: () => {
      return {
        nodes: [
          /*{
            node: CustomParagraphNode,
            type: CustomParagraphNode.getType(),
          },
          {
            node: {
              replace: ParagraphNode,
              with: (node: ParagraphNode) => {
                return new CustomParagraphNode()
              },
            },
            type: CustomParagraphNode.getType(),
          },*/
          {
            node: CustomTextNode,
            type: CustomTextNode.getType(),
          },
          {
            node: {
              replace: TextNode,
              with: (node: TextNode) => {
                return new CustomTextNode(node?.__text)
              },
            },
            type: CustomTextNode.getType(),
          },
        ],
        props: null,
      }
    },
    key: 'customParagraph',
  }
}