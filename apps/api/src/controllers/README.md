# Job Controller

CREATE JOB (function name : createJob()):

1. VALIDATE INPUT
   - template_id exists
   - recipients array is valid
   - idempotency_key present (optional but recommended)

2. HANDLE IDEMPOTENCY
   - check if job with same idempotency_key exists
   - if yes → return existing job

3. CREATE JOB (DB)
   - status = "pending"
   - total_count = recipients.length
   - processed_count = 0
   - failed_count = 0

4. CREATE DOCUMENTS (DB)
   - one row per recipient
   - status = "pending"

5. ENQUEUE DOCUMENT JOBS
   - for each document:
       queue.add("generate_document", { documentId })
   - with retry config

6. RETURN RESPONSE
   - jobId
   - status = "pending"
 