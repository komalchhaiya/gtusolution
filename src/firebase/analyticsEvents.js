import { logEvent } from "firebase/analytics";
import { analytics } from "../auth/firebaseAnalytics";

export function trackEvent(eventName, params = {}) {
  if (!analytics) return;
  logEvent(analytics, eventName, params);
}
