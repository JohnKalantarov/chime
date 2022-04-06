// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

import Svg, { SvgProps } from '../Svg';

interface ListHandRaiseProps extends SvgProps {}

const ListHandRaise: React.SFC<ListHandRaiseProps> = ({ ...rest }) => (
  <Svg {...rest}>
    <path d="M16.06 10.682c1.623 0 2.943 1.32 2.943 2.942v3.434c0 1.622-1.32 2.942-2.942 2.942h-3.34c-1.623 0-2.944-1.32-2.944-2.942v-3.434c0-1.622 1.32-2.942 2.944-2.942zm0 1h-3.34c-1.072 0-1.944.87-1.944 1.942v3.434c0 1.07.873 1.942 1.944 1.942h3.34c1.072 0 1.943-.871 1.943-1.942v-3.434c0-1.071-.872-1.942-1.942-1.942zm-.033 4.863c.276 0 .5.224.5.5 0 .245-.177.45-.41.492l-.09.008h-2.13c-.275 0-.5-.224-.5-.5 0-.245.178-.45.411-.492l.09-.008h2.129zm-3.109.146c.1.09.15.22.15.35 0 .07-.01.13-.04.19-.02.07-.06.12-.11.17-.09.09-.22.14-.35.14-.14 0-.26-.05-.35-.14-.05-.05-.09-.1-.11-.17-.03-.06-.04-.12-.04-.19 0-.13.05-.26.15-.35.18-.19.51-.19.7 0zm0-1.7c.1.09.15.221.15.351 0 .13-.05.26-.15.35-.09.1-.22.15-.35.15-.07 0-.13-.01-.19-.04-.07-.02-.12-.06-.16-.11-.1-.09-.15-.22-.15-.35 0-.07.01-.13.04-.19.02-.06.06-.12.11-.16.18-.19.521-.19.7 0zm-2.042-10.99c.485 0 .91.287 1.136.714.151-.064.314-.1.485-.1.68 0 1.24.566 1.304 1.286l.006.137v.123c.1-.029.203-.043.311-.043.68 0 1.24.597 1.304 1.359l.006.144v1.625c0 .276-.223.5-.5.5-.245 0-.45-.177-.492-.41l-.008-.09V7.621c0-.288-.164-.503-.31-.503-.13 0-.275.17-.305.41l-.006.093v1.674c0 .277-.223.5-.5.5-.245 0-.45-.176-.492-.41l-.008-.09V6.038c0-.23-.142-.423-.31-.423-.147 0-.275.148-.305.34l-.006.083V9.25c0 .276-.224.5-.5.5-.245 0-.45-.177-.492-.41l-.008-.09V5.423c0-.229-.142-.423-.31-.423-.147 0-.275.149-.305.34l-.006.083v3.768c0 .276-.224.5-.5.5-.245 0-.45-.177-.492-.41l-.008-.09V6.588c0-.287-.164-.5-.311-.5-.13 0-.274.168-.304.408l-.006.092v5.567c0 .276-.224.5-.5.5-.111 0-.249-.037-.348-.104l-.066-.056-1.1-1.185c-.403-.519-.637-.565-.7-.568-.026.001-.098-.003-.194.101-.07.078-.04.38.116.65l.064.1 1.461 2.012c.002.002.493.657 1.227 1.38.197.192.199.51.006.706-.098.1-.228.15-.357.15-.127 0-.253-.048-.35-.144-.745-.732-1.248-1.388-1.322-1.487l-.009-.012-1.466-2.019c-.426-.592-.599-1.47-.11-2.009.267-.292.609-.456.975-.427.438.018.87.272 1.284.754l.137.168.252.27V6.588c0-.828.588-1.5 1.31-1.5.117 0 .23.016.337.05C9.714 4.488 10.244 4 10.876 4zm4.318 10.84c.276 0 .5.224.5.5 0 .245-.177.45-.41.492l-.09.008h-1.296c-.276 0-.5-.224-.5-.5 0-.246.177-.45.41-.492l.09-.008h1.296zm-2.276-1.56c.1.101.15.22.15.36 0 .13-.05.25-.15.35-.09.09-.22.15-.35.15-.14 0-.26-.06-.35-.15-.1-.09-.15-.22-.15-.35 0-.07.01-.14.04-.2.02-.059.06-.11.11-.16.18-.18.521-.18.7 0zm3.294-.143c.276 0 .5.224.5.5 0 .245-.177.45-.41.492l-.09.008h-2.314c-.277 0-.5-.224-.5-.5 0-.246.177-.45.41-.492l.09-.008h2.314z" />
  </Svg>
);

ListHandRaise.displayName = 'ListHandRaise';

export default ListHandRaise;