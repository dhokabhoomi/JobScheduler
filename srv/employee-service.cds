using demo from '../db/schema';

service EmployeeService {

    entity Employees as projection on demo.Employees;
    entity AuditLogs as projection on demo.AuditLogs;

    @(requires: 'JobExecutor')
    action RunInactiveEmployeeCheck() returns String;

}
