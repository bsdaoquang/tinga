import { ReactNode } from "react";

export interface ListMenuItem {
  id: string;
  title: string,
  icon?: ReactNode;
  isPrimary?: boolean;
  onPress?: () => void;
}