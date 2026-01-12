import { getAnalytics, logEvent } from "firebase/analytics";
import { app } from "../auth/firebase";

const analytics = getAnalytics(app);

export function trackEvent(eventName, params = {}) {
  logEvent(analytics, eventName, params);
}
