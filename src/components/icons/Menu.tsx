// https://www.figma.com/community/plugin/1349302373670864083/figma-ui-icon-set
import type { FC } from "react";

type Props = {
  fill?: string;
};

export const MenuIcon: FC<Props> = ({ fill = "black" }) => (
  <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M0 0H14V1H0V0ZM0 4H14V5H0V4ZM14 8H0V9H14V8Z" fill={fill} />
  </svg>
);

