import {LoginComponent} from './pages/login/login.component';
import {ListComponent} from "./pages/list/list.component";
import {CameraComponent} from "./pages/camera/camera.component";

export const routes = [
    { path: '', component: LoginComponent },
    { path: 'list', component: ListComponent },
    { path: 'camera', component: CameraComponent },
];

export const navigatableComponents = [
    LoginComponent,
    ListComponent,
    CameraComponent
];
