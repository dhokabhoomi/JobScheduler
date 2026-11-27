# Employee Job Scheduler - SAP CAP + SAP BTP

## Overview

Employee Job Scheduler is an SAP CAP application deployed on SAP BTP Cloud Foundry that automatically identifies inactive employees and generates audit records in SAP HANA Cloud using SAP Job Scheduling Service.

The application demonstrates:

- SAP CAP Development
- SAP HANA Cloud Integration
- Cloud Foundry Deployment
- Multi-Target Application (MTA) Deployment
- SAP Job Scheduling Service
- Automated Background Processing
- Audit Logging

---

## Architecture

```text
SAP Job Scheduler
        ↓
HTTP Job
        ↓
CAP Action
        ↓
RunInactiveEmployeeCheck()
        ↓
SAP HANA Cloud
        ↓
AuditLogs
```

---

## Business Use Case

Organizations often need automated monitoring processes.

This application:

1. Checks employee activity periodically.
2. Identifies employees inactive for more than 90 days.
3. Generates audit records automatically.
4. Runs without user intervention.

---

## Technologies Used

- SAP CAP (Cloud Application Programming Model)
- SAP HANA Cloud
- SAP BTP Cloud Foundry
- SAP Job Scheduling Service
- Node.js
- OData V4
- MTA (Multi-Target Application)

---

## Project Structure

```text
employee-job-scheduler
│
├── db
│   ├── schema.cds
│   └── data
│
├── srv
│   ├── employee-service.cds
│   └── employee-service.js
│
├── mta.yaml
├── package.json
└── README.md
```

---

## Data Model

### Employees

Stores employee details.

| Field | Description |
|---------|---------|
| ID | Employee Identifier |
| firstName | First Name |
| lastName | Last Name |
| email | Employee Email |
| lastLoginDate | Last Login Date |
| isActive | Employee Status |

### AuditLogs

Stores audit trail information.

| Field | Description |
|---------|---------|
| ID | Audit ID |
| entityName | Entity Name |
| entityId | Entity Identifier |
| action | Performed Action |
| details | Audit Details |

---

## Service Definition

### Action

```cds
action RunInactiveEmployeeCheck() returns String;
```

The action:

- Reads all employees
- Calculates inactivity period
- Identifies employees inactive for 90+ days
- Creates audit records
- Returns execution summary

---

## Scheduler Logic

```text
Read Employees
      ↓
Compare Last Login Date
      ↓
Older Than 90 Days?
      ↓
Yes
      ↓
Create Audit Log
```

---

## Deployment Steps

### Enable HANA

```bash
cds add hana
```

### Generate MTA

```bash
cds add mta
```

### Build MTAR

```bash
mbt build
```

### Deploy to Cloud Foundry

```bash
cf deploy mta_archives/employee-job-scheduler_1.0.0.mtar
```

---

## SAP Job Scheduling Service

### Job Configuration

**Job Name**

```text
InactiveEmployeeCheck
```

**HTTP Method**

```text
POST
```

**Endpoint**

```text
/odata/v4/employee/RunInactiveEmployeeCheck
```

### Schedule

Configured to execute automatically at fixed intervals.

---

## Challenges Encountered

### Missing xssec Dependency

Error:

```text
Cannot find '@sap/xssec'
```

Solution:

```bash
npm install @sap/xssec
```

---

### Cloud Foundry Authentication

Error:

```text
Authentication kind "jwt" configured,
but no XSUAA instance bound
```

Solution:

Configured mocked authentication for initial development and testing.

---

## Validation

Verified successful execution through:

### Cloud Foundry Logs

```text
=== JOB EXECUTED ===
```

### Scheduler Headers

```text
x_sap_job_id
x_sap_job_run_id
x_sap_job_schedule_id
```

These headers confirmed that SAP Job Scheduling Service successfully triggered the CAP action.

---

## Learning Outcomes

Through this project I learned:

- SAP CAP Service Development
- CDS Modeling
- OData Actions
- SAP HANA Cloud Integration
- MTA Deployment
- Cloud Foundry Deployment
- Service Binding
- Production Troubleshooting
- SAP Job Scheduling Service
- Background Job Automation