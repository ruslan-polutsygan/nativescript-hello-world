import {LoginComponent} from './pages/login/login.component';
import {ListComponent} from "./pages/list/list.component";
import {CameraComponent} from "./pages/camera/camera.component";
import {LocationComponent} from "./pages/location/location.component";
import {CheckAppComponent} from "./pages/check-app/check-app.component";
import {OtherComponent} from "./pages/other/other.component";
import {OtherListComponent} from "./pages/other-list/other-list.component";

export const routes = [
    { path: '', component: LoginComponent },
    { path: 'list', component: ListComponent },
    { path: 'other', component: OtherComponent, children: [
        { path: 'list', component: OtherListComponent },
        { path: 'camera', component: CameraComponent },
        { path: 'location', component: LocationComponent },
        { path: 'check-app', component: CheckAppComponent },
    ] },
];

export const navigatableComponents = [
    LoginComponent,
    ListComponent,
    OtherComponent,
    OtherListComponent,
    CameraComponent,
    LocationComponent,
    CheckAppComponent,
];
