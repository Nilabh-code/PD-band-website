import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Problem from './components/Problem'
import Hardware from './components/Hardware'
import SignalPipeline from './components/SignalPipeline'
import Features from './components/Features'
import Dashboard from './components/Dashboard'
import ScenarioLab from './components/ScenarioLab'
import Explainable from './components/Explainable'
import HardwareShowcase from './components/HardwareShowcase'
import Cost from './components/Cost'
import Companion from './components/Companion'
import ChatAssist from './components/ChatAssist'
import Engineering from './components/Engineering'
import LimitsFuture from './components/LimitsFuture'
import Research from './components/Research'
import Footer from './components/Footer'
import JudgeMode from './components/JudgeMode'

export default function App() {
  const [judgeMode, setJudgeMode] = useState(false)

  return (
    <div className="grain min-h-screen bg-paper text-ink">
      <Navbar onJudgeMode={() => setJudgeMode(true)} />
      <main>
        <Hero onJudgeMode={() => setJudgeMode(true)} />
        <Problem />
        <Hardware />
        <SignalPipeline />
        <Features />
        <Dashboard />
        <ScenarioLab />
        <Explainable />
        <HardwareShowcase />
        <Cost />
        <Companion />
        <ChatAssist />
        <Engineering />
        <LimitsFuture />
        <Research />
      </main>
      <Footer />
      <JudgeMode open={judgeMode} onClose={() => setJudgeMode(false)} />
    </div>
  )
}