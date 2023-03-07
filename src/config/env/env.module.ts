import { Module } from "@nestjs/common";
import { EnvProvider } from "./env.provider";

@Module({
    imports:[EnvProvider],
    exports:[EnvProvider]
})
export class EnvModule {}