import { RolesBuilder } from 'nest-access-control'

export enum RolesApp {
    HOSPITAL = 'HOSPITAL',
    PATIENT = 'PATIENT',
    DOCTOR = 'DOCTOR'
}

export enum ResourcesApp {
    DOCTOR = 'DOCTOR',
    MEDICAL_OBSERVACIONES = 'MEDICAL_OBSERVACIONES'
}

export const roles: RolesBuilder = new RolesBuilder()
    roles
        
        .grant(RolesApp.HOSPITAL)
        .createAny([ResourcesApp.DOCTOR])
        
        
        .grant(RolesApp.DOCTOR)
        .createAny([ResourcesApp.MEDICAL_OBSERVACIONES])

        .grant(RolesApp.PATIENT)
        .readOwn([ResourcesApp.MEDICAL_OBSERVACIONES])
        
        .grant(RolesApp.DOCTOR)
        .readOwn([ResourcesApp.MEDICAL_OBSERVACIONES])

        .grant(RolesApp.HOSPITAL)
        .extend(RolesApp.DOCTOR)
        .readAny([ResourcesApp.DOCTOR])



        
       