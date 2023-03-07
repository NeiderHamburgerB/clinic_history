import { AccessControlModule } from 'nest-access-control'
import { roles } from 'src/config/roles/roles'
export const RolesProvider = AccessControlModule.forRoles(roles)