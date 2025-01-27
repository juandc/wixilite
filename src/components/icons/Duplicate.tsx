// https://www.figma.com/community/plugin/1349302373670864083/figma-ui-icon-set
import type { FC } from "react";

type Props = {
  fill?: string;
};

export const DuplicateIcon: FC<Props> = ({ fill = "black" }) => (
  <svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M9 1C12.866 1 16 4.134 16 8V10.7929L13.8536 8.6464L13.1464 9.3536L16.1464 12.3536L16.5 12.7071L16.8536 12.3536L19.8536 9.3536L19.1464 8.6464L17 10.7929V8C17 3.5817 13.4183 0 9 0V1ZM9 8H1V16H9V8ZM1 7H0V8V16V17H1H9H10V16V8V7H9H1Z" fill={fill} />
  </svg>
);
