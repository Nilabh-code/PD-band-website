import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Problem from './components/Problem'
import Hardware from './components/Hardware'
import HardwareShowcase from './components/HardwareShowcase'
import SignalView from './components/SignalView'
import SignalPipeline from './components/SignalPipeline'
import Features from './components/Features'
import Explainable from './components/Explainable'
import Dashboard from './components/Dashboard'
import ScenarioLab from './components/ScenarioLab'
import Engineering from './components/Engineering'
import Companion from './components/Companion'
import ChatAssist from './components/ChatAssist'
import Cost from './components/Cost'
import LimitsFuture from './components/LimitsFuture'
import Research from './components/Research'
import Footer from './components/Footer'
import JudgeMode from './components/JudgeMode'

// Section order mirrors the live-demo script beats:
// 01 Problem (hook) → 02 Device → 03 Poster/hotspots → 04 Signal
// → 05 Pipeline → 06 Features → 07 Freeze/fall logic → 08 Demo dashboard
// → 09 What-if lab → 10 Engineering/Intelligence → 11 Companion → 12 Chat
// → 13 Cost → 14 Limitations → 15 Future → 16 Research
export default function App() {
  const [judgeMode, setJudgeMode] = useState(false)

  return (
    <div className="grain min-h-screen bg-paper text-ink">
      <Navbar onJudgeMode={() => setJudgeMode(true)} />
      <main>
        <Hero onJudgeMode={() => setJudgeMode(true)} />
        <Problem />
        <Hardware />
        <HardwareShowcase />
        <SignalView />
        <SignalPipeline />
        <Features />
        <Explainable />
        <Dashboard />
        <ScenarioLab />
        <Engineering />
        <Companion />
        <ChatAssist />
        <Cost />
        <LimitsFuture />
        <Research />
      </main>
      <Footer />
      <JudgeMode open={judgeMode} onClose={() => setJudgeMode(false)} />
    </div>
  )
}