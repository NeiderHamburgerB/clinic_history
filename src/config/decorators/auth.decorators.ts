import { applyDecorators, UseGuards } from "@nestjs/common"
import { JwtGuard } from "../passport/guards/jwt.guard"
import { ACGuard, UseRoles, Role } from 'nest-access-control'
import { ApiBearerAuth } from "@nestjs/swagger"


export function Auth(...roles: Role[]){
    return applyDecorators(
        UseGuards(JwtGuard, ACGuard),
        UseRoles(...roles),
        ApiBearerAuth()
    )
}