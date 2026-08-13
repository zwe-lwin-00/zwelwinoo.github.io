import { useRef, useState } from 'react'
import { useTheme } from './hooks/useTheme'
import About from './components/About'
import Educations from './components/Educations'
import Experiences from './components/Experiences'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollTop from './components/ScrollTop'

function App() {
  const { theme, toggleTheme } = useTheme()
  const [activeSection, setActiveSection] = useState('about')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const editorTextRef = useRef(null)

  const sections = [
    { id: 'about', label: 'about.ts', icon: 'fa-file-code' },
    { id: 'educations', label: 'education.json', icon: 'fa-graduation-cap' },
    { id: 'experiences', label: 'experience.ts', icon: 'fa-briefcase' },
    { id: 'skills', label: 'skills.ts', icon: 'fa-code' },
    { id: 'contact', label: 'contact.ts', icon: 'fa-envelope' },
  ]

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    const container = editorTextRef.current
    if (!element || !container) return

    // Only scroll the editor pane. scrollIntoView also moves overflow:hidden
    // ancestors and leaves a blank gap under short last sections like Contact.
    document.querySelectorAll('.editor-content, .editor-area, .vscode-container').forEach((el) => {
      el.scrollTop = 0
    })

    const top =
      element.getBoundingClientRect().top -
      container.getBoundingClientRect().top +
      container.scrollTop

    container.scrollTo({ top, behavior: 'smooth' })
  }

  const themeIcon = theme === 'dark' ? 'fa-sun' : 'fa-moon'

  return (
    <div className="vscode-container">
      {/* VS Code Activity Bar */}
      <div className="activity-bar">
        <div className="activity-bar-icons">
          <button
            className={`activity-icon ${sidebarOpen ? 'active' : ''}`}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            <i className="fas fa-bars"></i>
          </button>
          <button
            className="activity-icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            <i className={`fas ${themeIcon}`}></i>
          </button>
        </div>
      </div>

      {/* VS Code Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-title">EXPLORER</h2>
        </div>
        <nav className="sidebar-nav">
          <div className="nav-folder">
            <div className="folder-header">
              <i className="fas fa-chevron-down"></i>
              <span>PORTFOLIO</span>
            </div>
            <ul className="folder-items">
              {sections.map((section) => (
                <li key={section.id} className="nav-item">
                  <a
                    href={`#${section.id}`}
                    className={`nav-link ${activeSection === section.id ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection(section.id)
                    }}
                  >
                    <i className={`fas ${section.icon}`}></i>
                    <span>{section.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </aside>

      {/* VS Code Editor Area */}
      <main className="editor-area">
        {/* Tab Bar */}
        <div className="tab-bar">
          <div className="tab active">
            <span className="tab-icon">
              <i className="fas fa-code"></i>
            </span>
            <span className="tab-label">portfolio.tsx</span>
            <button className="tab-close">
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>

        {/* Editor Content */}
        <div className="editor-content">
          <div className="editor-line-numbers">
            {Array.from({ length: 50 }).map((_, i) => (
              <span key={i} className="line-number">{i + 1}</span>
            ))}
          </div>
          <div className="editor-text" ref={editorTextRef}>
            <About />
            <Educations />
            <Experiences />
            <Skills />
            <Contact />
          </div>
        </div>

        {/* Status Bar */}
        <Footer />
      </main>

      <ScrollTop />
    </div>
  )
}

export default App
