export default function Contact() {
  function handleSubmit(e) {
    e.preventDefault()
    const data = new FormData(e.target)
    const subject = `New enquiry: ${data.get('name') || 'Insyd'}`
    const body = [
      `Name: ${data.get('name') || ''}`,
      `Email: ${data.get('email') || ''}`,
      `Company / product: ${data.get('company') || ''}`,
      '',
      data.get('message') || '',
    ].join('\n')
    window.location.href = `mailto:hello@insyd.studio?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`
  }

  return (
    <main className="work">
      <h1 className="work-headline">
        Talk to us <span className="work-dash" />
        <br />
        about what you want to build.
      </h1>

      <form className="contact-form" onSubmit={handleSubmit}>
        <label>
          <span>Name</span>
          <input name="name" type="text" placeholder="Your name" required />
        </label>
        <label>
          <span>Email</span>
          <input name="email" type="email" placeholder="you@company.com" required />
        </label>
        <label>
          <span>Company / product</span>
          <input name="company" type="text" placeholder="Optional" />
        </label>
        <label>
          <span>What are you looking to do?</span>
          <textarea
            name="message"
            rows={5}
            placeholder="Build a new web/mobile app, manage an existing one, run social media, ship an ML/DL model. Tell us where you're at."
            required
          />
        </label>
        <button type="submit" className="pill contact-submit">
          Send message
        </button>
      </form>

    </main>
  )
}
