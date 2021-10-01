const Event = use('Event')
const Mail = use('Mail')
const Env = use('Env')

Event.on('forgot_password::user', async (user) => {
    console.log('send forgot password email', user.email)
    await Mail.send('mails.mails', user, (message) => {
        message.to(user.email)
        message.from(Env.get('MAIL_FROM_ADDRESS'), Env.get('MAIL_FROM_NAME'))
        message.subject(user.subject_email)
    })
})

Event.on('new::user', async (user) => {
    console.log('send activation email url', user.email)
    await Mail.send('mails.mails', user, (message) => {
        message.to(user.email)
        message.from(Env.get('MAIL_FROM_ADDRESS'), Env.get('MAIL_FROM_NAME'))
        message.subject(user.subject_email)
    })
})