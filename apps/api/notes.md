[1] Batch → Child Job Model (you NEED this)

Right now:

1 job = many documents

That’s dangerous.

✅ Correct model:
Job (batch)
  → Document Jobs (1 per certificate)

Flow:
API creates batch job
Creates 1000 document rows (status: pending)
Pushes 1000 jobs to queue

Worker:

processes ONE document
updates document status
increments job.processed_count

Why this matters:
parallel processing
retry only failed ones
progress tracking becomes real

[2] 1. Webhook system

You already have webhook_url

Good.

Now implement:

POST webhook_url
{
  jobId,
  status,
  completedCount,
  failedCount
}

[3] 2. Progress tracking

Expose:

GET /jobs/:id

Return:

{
  total: 1000,
  processed: 732,
  failed: 12,
  status: "processing"
}

[4] Zip aggregation worker

After all documents done:

generate ZIP
upload to S3
update zip_s3_url

👉 This should be a separate job

[5] What actually happens in real systems:
Worker picks job
Worker crashes
Job is now stuck in "processing" forever
✅ You need:

Job timeout + stall detection

BullMQ supports this:

stalledInterval
lockDuration

👉 If worker dies → job is re-queued automatically

If you don’t configure this → silent data loss

[6] ❓ “job fails 3 times → user handles it”

Okay — but HOW?

You didn’t define:

API to fetch failed jobs
error visibility
retry trigger

👉 Add:

GET /jobs/:id
POST /jobs/:id/retry

[7] ❓ “duplicate request → same job”

Good idea.

But incomplete.

Edge case:

Same idempotency key + different payload

What happens?

👉 You MUST validate:

if (same_key && different_payload) {
  throw error
}

Otherwise:

inconsistent results
potential abuse

