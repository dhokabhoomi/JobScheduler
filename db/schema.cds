namespace demo;

using {cuid, managed} from '@sap/cds/common';

entity Employees : cuid, managed {
    firstName     : String(50);
    lastName      : String(50);
    email         : String(120);
    lastLoginDate : Date;
    isActive      : Boolean default true;
}

entity AuditLogs : cuid, managed {
    entityName : String(50);
    entityId   : UUID;
    action     : String(30);
    details    : String(500);
}
