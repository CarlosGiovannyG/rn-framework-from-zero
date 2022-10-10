import React, { FC} from "react";
import { BlockComponent } from "@my-app/app/src/framework/engine/types";
import Link, { LinkProps } from "../ui/Link";
import useStyles from "@my-app/app/src/framework/styleguide/hooks/useStyles";


export const StoreLink: FC<BlockComponent<LinkProps>> = ({ children, componentName, props }) => {
  const linkStyles = useStyles(props?.style)
  return (
    <Link {...props}  style={linkStyles} />
  );
}