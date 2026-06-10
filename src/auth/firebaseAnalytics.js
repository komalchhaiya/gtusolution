import { getAnalytics } from "firebase/analytics";
import { app } from "./firebase";

export const analytics =
  typeof window !== "undefined" ? getAnalytics(app) : null;
