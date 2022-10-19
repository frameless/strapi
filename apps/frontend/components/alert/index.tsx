import classnames from "classnames/bind";
export interface AlertProps {
  message: string;
  children: React.ReactNode;
}

import styles from "./index.module.css";

const cx = classnames.bind(styles);

export const Alert: React.FC<AlertProps> = ({ children, message }) => (
  <div className={cx("alert")}>
    <span className={cx("alert__message")}>{message}</span> <div className={cx("alert_children")}>{children}</div>
  </div>
);
