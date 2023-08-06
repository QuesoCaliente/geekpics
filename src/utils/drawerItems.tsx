import { FaHome, FaImage } from "react-icons/fa";
import { FaUpload } from "react-icons/fa";

export enum Role {
  ADMINISTRATOR = "cdf104fd-1a2b-4178-bce5-df92ed430170",
  MODERADOR = "eadb63f0-8e1c-493d-a178-b040e6ff96c6",
  USER = "c348dc6e-24ca-4e08-8633-b8072efb95b6",
  GLOBAL = "global",
}

export const drawerItems = [
  {
    name: "Home",
    icon: <FaHome />,
    href: "/",
    permissions: [Role.USER, Role.MODERADOR, Role.ADMINISTRATOR, Role.GLOBAL],
  },
  {
    name: "Upload",
    icon: <FaUpload />,
    href: "/upload",
    permissions: [Role.MODERADOR, Role.ADMINISTRATOR],
  },
  {
    name: "Images",
    icon: <FaImage />,
    href: "/images",
    permissions: [Role.USER, Role.MODERADOR, Role.ADMINISTRATOR, Role.GLOBAL],
  },
];
