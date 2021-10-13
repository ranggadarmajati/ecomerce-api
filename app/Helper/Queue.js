
'use strict'
const Env = use('Env')
const Event = use('Event')
const Queue = require('bee-queue');
const options = {
    getEvents:true,
    removeOnSuccess: true,
    redis: {
        host: Env.get('REDIS_HOST', 'localhost'),
        port: Env.get('REDIS_PORT', '6379')
    },
}
const queue = new Queue('EMAIL_DELIVERY', options);

class BeQueue {
    emailQueue(obj) {
        const job = queue.createJob(obj);
        job.retries(3);
        job.save();
        job.on('progress', (progress) => {
            console.log(`Job ${job.id} reported progress: ${progress}%`);
        });
        job.on('succeeded', (result) => {
            console.log(`Received result for job ${job.id}: Successfully!`);
        });
        job.on('retrying', (err) => {
            console.log(
                `Job ${job.id} failed with error ${err.message} but is being retried!`
            );
        });
        job.on('failed', (err) => {
            console.log(`Job ${job.id} failed with error ${err.message}`);
        });
    }
}

// Process jobs from as many servers or processes as you like
queue.process((job, done) => {
    console.log(`Processing job ${job.id} | job send email to: ${job.data.email}`);
    if(job.data.URI_ACTIVATION) {
        Event.fire('new::user', job.data);
    } else {
        Event.fire('forgot_password::user', job.data);
    }
    done();
});

module.exports = new BeQueue