import { createNavigationContainerRef } from "@react-navigation/native";
import { AppStackParamList } from "./navigation/stackParamList";

export const navigationRef = createNavigationContainerRef<AppStackParamList>();

export function navigate(name: any, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}
