import styles from "./Overlay.module.css";
import { type OverlayProps } from "../../types/types";
import type { FC } from "react";

export const Overlay: FC<OverlayProps> = ({ onClose }) => {
  return <div className={styles.overlay} onClick={onClose}></div>;
};
