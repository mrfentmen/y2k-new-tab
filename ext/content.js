const updateClock = () => {
  const now = new Date()
  const time = now.toLocaleTimeString('en-US', { hour12: false })
  const date = now.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
  document.getElementById('time').textContent = time
  document.getElementById('date').textContent = date
}

const Y2K_FACTS = [
  "In 2000, AOL Instant Messenger had over 100 million users.",
  "MySpace was the most visited website in the world in 2006.",
  "The original iPod had only 5GB of storage and cost $399.",
  "Napster shut down in 2001 after legal battles.",
  "AIM away messages were a form of self-expression in the early 2000s.",
  "Low-rise jeans and cargo pants were the height of fashion in 2000-2005.",
  "The original Motorola Razr was the most popular phone in 2005."
]

const loadFact = () => {
  const random = Y2K_FACTS[Math.floor(Math.random() * Y2K_FACTS.length)]
  document.getElementById('fact').textContent = random
}

const loadGuestbook = () => {
  chrome.storage.local.get(['guestbook'], (result) => {
    const entries = result.guestbook || []
    const container = document.getElementById('guestbook-entries')
    if (entries.length === 0) {
      container.innerHTML = '<div class="no-entries">Be the first to sign!</div>'
    } else {
      container.innerHTML = entries.slice().reverse().map(e => `
        <div class="guestbook-entry">
          <strong>${e.name}</strong>: ${e.message}
        </div>
      `).join('')
    }
  })
}

const saveGuestbook = (name, message) => {
  const entry = {
    timestamp: new Date().toISOString(),
    name: name,
    message: message
  }
  chrome.storage.local.get(['guestbook'], (result) => {
    const entries = result.guestbook || []
    entries.push(entry)
    chrome.storage.local.set({ guestbook: entries }, () => {
      loadGuestbook()
    })
  })
}

const init = () => {
  updateClock()
  loadFact()
  loadGuestbook()
  setInterval(updateClock, 1000)

  document.getElementById('guestbook-form').addEventListener('submit', (e) => {
    e.preventDefault()
    const name = document.getElementById('guest-name').value
    const message = document.getElementById('guest-message').value
    if (name && message) {
      saveGuestbook(name, message)
      e.target.reset()
    }
  })
}

document.addEventListener('DOMContentLoaded', init)
