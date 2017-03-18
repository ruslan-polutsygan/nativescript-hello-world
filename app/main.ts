import { platformNativeScriptDynamic } from "nativescript-angular/platform";

import { AppModule } from "./app.module";
import * as utils from "./utils/status-bar-util";

utils.setStatusBarColors();
platformNativeScriptDynamic().bootstrapModule(AppModule);
