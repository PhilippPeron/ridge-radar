
import * as NavigationBar from 'expo-navigation-bar';

export function hideNavBar() {
    NavigationBar.setVisibilityAsync('visible');
    NavigationBar.setPositionAsync("absolute");
    NavigationBar.setBackgroundColorAsync("#ffffff01");
}