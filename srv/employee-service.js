import cds from '@sap/cds';

export default cds.service.impl(async function () {
    const { Employees, AuditLogs } = this.entities;
    this.on('RunInactiveEmployeeCheck', async req => {
        console.log('=== JOB EXECUTED ===', new Date().toISOString());

        const employees = await SELECT.from(Employees);

        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - 90);

        let count = 0;

        for (const employee of employees) {
            if (employee.lastLoginDate && new Date(employee.lastLoginDate) < cutoffDate) {
                await INSERT.into(AuditLogs).entries({
                    entityName: 'Employees',
                    entityId: employee.ID,
                    action: 'INACTIVE',
                    details: `${employee.firstName} ${employee.lastName} inactive for more than 90 days`
                })
                count++;
            }
        }
        return `${count} inactive employees processed`;
    })
})