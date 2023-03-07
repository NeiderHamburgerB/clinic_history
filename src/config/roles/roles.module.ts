import { Module } from "@nestjs/common"
import { RolesProvider } from "./roles.provider"

@Module({
    imports:[RolesProvider],
    exports:[RolesProvider]
})
export class RolesModule {}