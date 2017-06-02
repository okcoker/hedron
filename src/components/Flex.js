// @flow
import React from "react";
import styled from "styled-components";
import { withLayout } from "./LayoutProvider";
import { horizontalAlign, verticalAlign } from "../utils/flex";
import { breakpoint, applyBreakpointStyle } from "../utils";
import passOn from "../utils/passOn";

const containerDirectionError = "Container direction must be `horizontal` or `vertical`";

const directionToFlex = direction => {
  if (direction === "vertical") {
    return "column";
  } else if (direction === "horizontal") {
    return "row";
  }
  throw Error(containerDirectionError);
};

const compute = name =>
  breakpoint(name, (props, name) => [
    applyBreakpointStyle('width', props.width, name),
    applyBreakpointStyle('height', props.height, name),
    applyBreakpointStyle('flex-grow', props.grow, name, { on: 1, off: 0 }),
    applyBreakpointStyle('flex-shrink', props.shrink, name, { on: 1, off: 0 }),
    applyBreakpointStyle('flex', props.flex, name),
    applyBreakpointStyle('flex-wrap', props.wrap, name, { on: 'wrap', off: 'nowrap' }),
    applyBreakpointStyle('flex-direction', props.direction, name, { modifier: v => directionToFlex(v) }),
    applyBreakpointStyle('margin-left', props.gutter, name, { modifier: v => `-${v}` }),
    applyBreakpointStyle('margin-right', props.gutter, name, { modifier: v => `-${v}` })
  ]);

const Wrapper = styled.div`
  display: flex;
  ${props => props.hAlign && horizontalAlign(props.hAlign, props.direction)}
  ${props => props.vAlign && verticalAlign(props.vAlign, props.direction)}
  ${compute("xs")}
  ${compute("sm")}
  ${compute("md")}
  ${compute("lg")}
`;

Wrapper.defaultProps = {
  direction: "horizontal"
};

const Container = ({ children, ...props }) => {
  return (
    <Wrapper {...props}>
      {passOn(children, child => ({
        xs: child.props.xs ||
          (child.props.direction === "horizontal" && 12 / children.length)
      }))}
    </Wrapper>
  );
};

export default withLayout(Container);