import { ConfigModule } from "@nestjs/config";
import local from "./local";

export const EnvProvider = ConfigModule.forRoot({
    isGlobal:true,
    load:[local]
})