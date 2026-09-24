import { useEffect, useMemo, useState } from 'react'
import { modules } from './data/modules'
import { flashcards } from './data/flashcards'
import { questions } from './data/questions'
import { exercises } from './data/exercises'
import { commonErrors } from './data/commonErrors'
import { achievements } from './data/achievements'
import { evaluativeQuestions } from './data/evaluative'
import type { View, Progress } from './types'
import { loadProgress, saveProgress, getTheme, setTheme } from './utils/storage'
import { xpToLevel, xpProgress } from './utils/helpers'

function Logo(){
  return (
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white font-black text-sm">BD2</div>
      <div>
        <div className="font-extrabold leading-none text-slate-900 dark:text-white">BD2 FINAL</div>
        <div className="text-[11px] text-slate-500 dark:text-slate-400 -mt-0.5">Base de Datos 2</div>
      </div>
    </div>
  )
}

export default function App(){
  const [view, setView] = useState<View>('dashboard')
  const [selectedModule, setSelectedModule] = useState<number>(1)
  const [theme, setThemeState] = useState<'light'|'dark'>(getTheme())
  const [progress, setProgress] = useState<Progress>(()=>loadProgress())
  const [search, setSearch] = useState('')
  const [mobileMenu, setMobileMenu] = useState(false)
  const [toast, setToast] = useState<string|null>(null)

  useEffect(()=>{ document.documentElement.classList.toggle('dark', theme==='dark'); setTheme(theme)},[theme])
  useEffect(()=>{ saveProgress(progress)},[progress])
  const showToast=(m:string)=>{ setToast(m); setTimeout(()=>setToast(null),2000)}

  // Derived stats
  const totalConcepts = modules.reduce((a,m)=>a+m.concepts.length,0)
  const completedCount = progress.completedConcepts.length
  const pct = Math.round(completedCount/totalConcepts*100)
  const answered = Object.keys(progress.answeredQuestions).length
  const correct = progress.correctQuestions.length
  const level = xpToLevel(progress.xp)
  const xpProg = xpProgress(progress.xp)

  // Module progress
  const moduleProgress = (id:number)=>{
    const mod = modules.find(m=>m.id===id)!
    const done = mod.concepts.filter(c=>progress.completedConcepts.includes(c.id)).length
    return Math.round(done/mod.concepts.length*100)
  }
  const moduleStatus = (id:number)=>{
    const p = moduleProgress(id)
    if(p===0) return 'No iniciado'
    if(p===100) return 'Dominado'
    return 'En progreso'
  }

  // Search filtered
  const searchResults = useMemo(()=>{
    if(!search) return null
    const q = search.toLowerCase()
    const mods = modules.flatMap(m=>m.concepts.filter(c=> c.title.toLowerCase().includes(q) || c.theory.toLowerCase().includes(q)).map(c=>({...c, moduleTitle:m.shortTitle})))
    const fcs = flashcards.filter(f=> f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q) || f.tag.toLowerCase().includes(q))
    const qs = questions.filter(qq=> qq.question.toLowerCase().includes(q))
    return {mods,fcs,qs}
  },[search])

  // Navigation items
  const nav = [
    {id:'dashboard', label:'Dashboard', icon:'🏠'},
    {id:'modules', label:'Temario', icon:'📚'},
    {id:'flashcards', label:'Flashcards', icon:'🃏'},
    {id:'quiz', label:'Cuestionarios', icon:'🧠'},
    {id:'evaluative', label:'Cuest. Evaluativo', icon:'📝'},
    {id:'lab', label:'Laboratorio', icon:'💻'},
    {id:'simulacro', label:'Simulacro', icon:'🎯'},
    {id:'session', label:'Sesión', icon:'⚡'},
    {id:'review', label:'Repaso', icon:'🔁'},
    {id:'favorites', label:'Favoritos', icon:'⭐'},
    {id:'errors', label:'Errores', icon:'⚠️'},
  ] as const

  const needReview = useMemo(()=>{
    // modules with low correct rate
    const byMod: Record<number,{total:number, correct:number}> = {}
    questions.forEach(q=>{
      if(progress.answeredQuestions[q.id]!==undefined){
        if(!byMod[q.moduleId]) byMod[q.moduleId]={total:0, correct:0}
        byMod[q.moduleId].total++
        if(progress.correctQuestions.includes(q.id)) byMod[q.moduleId].correct++
      }
    })
    return Object.entries(byMod).map(([mid,v])=>({mid: Number(mid), pct: v.total? Math.round(v.correct/v.total*100):100})).filter(x=>x.pct<70).sort((a,b)=>a.pct-b.pct).slice(0,3)
  },[progress])

  return (
    <div className={`${theme} min-h-screen bg-[#f8f9ff] dark:bg-[#0f1117] text-slate-800 dark:text-slate-200 transition-colors`}>
      {/* Sidebar desktop */}
      <div className="flex">
        <aside className="hidden lg:flex w-[260px] shrink-0 flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-[#171923] sticky top-0 h-screen">
          <div className="p-6 border-b border-slate-100 dark:border-slate-800"><Logo/><div className="mt-4 p-3 rounded-xl bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-950/40 dark:to-violet-950/30 border border-indigo-100 dark:border-indigo-900/30">
            <div className="text-xs font-semibold text-indigo-700 dark:text-indigo-300">Agustín Molina</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Final — Base de Datos 2</div>
            <div className="mt-2 flex items-center gap-2 text-xs">
              <span className="px-2 py-1 rounded-full bg-white dark:bg-slate-800 border text-slate-600 dark:text-slate-300">Nv {level}</span>
              <span className="text-violet-600 dark:text-violet-400 font-semibold">{progress.xp} XP</span>
            </div>
            <div className="mt-2 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-indigo-600 to-violet-600" style={{width: `${xpProg/150*100}%`}}/></div>
          </div></div>
          <nav className="flex-1 p-3 space-y-1 overflow-auto">
            {nav.map(n=>(
              <button key={n.id} onClick={()=>setView(n.id as View)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${view===n.id?'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow':'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
                <span>{n.icon}</span>{n.label}
              </button>
            ))}
          </nav>
          <div className="p-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium">Modo {theme==='dark'?'oscuro':'claro'}</span>
              <button onClick={()=>setThemeState(theme==='dark'?'light':'dark')} className="w-11 h-6 rounded-full bg-slate-200 dark:bg-slate-700 relative transition">
                <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition ${theme==='dark'?'left-5':'left-0.5'}`}/>
              </button>
            </div>
          </div>
        </aside>

        {/* Mobile Drawer */}
        {mobileMenu && (
          <div className="lg:hidden fixed inset-0 z-40 flex">
            <div className="flex-1 bg-black/40 backdrop-blur-sm" onClick={()=>setMobileMenu(false)} />
            <div className="w-[85%] max-w-[320px] bg-white dark:bg-[#171923] h-full shadow-2xl flex flex-col animate-[slideIn_0.2s_ease]">
              <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <Logo/>
                <button onClick={()=>setMobileMenu(false)} className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">✕</button>
              </div>
              <div className="p-4 border-b border-slate-100 dark:border-slate-800 space-y-3">
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400">🔍</span>
                  <input autoFocus value={search} onChange={e=>{setSearch(e.target.value); if(e.target.value) setView('search')}} placeholder="Buscar: exists, join, CTE..." className="w-full pl-9 pr-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-transparent focus:bg-white dark:focus:bg-slate-900 focus:border-indigo-300 outline-none text-sm"/>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="flex-1 px-3 py-2 rounded-xl bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-300 border border-orange-200 dark:border-orange-900 text-center font-semibold">🔥 Racha {progress.streak} días</span>
                  <span className="px-3 py-2 rounded-xl bg-indigo-600 text-white font-bold">{pct}%</span>
                </div>
              </div>
              <nav className="flex-1 p-3 space-y-1 overflow-auto">
                {nav.map(n=>(
                  <button key={n.id} onClick={()=>{setView(n.id as View); setMobileMenu(false)}} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[15px] font-medium transition ${view===n.id?'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow':'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
                    <span className="text-lg">{n.icon}</span>{n.label}
                    {view===n.id && <span className="ml-auto">›</span>}
                  </button>
                ))}
              </nav>
              <div className="p-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Modo {theme==='dark'?'oscuro':'claro'}</span>
                  <button onClick={()=>setThemeState(theme==='dark'?'light':'dark')} className="w-12 h-7 rounded-full bg-slate-200 dark:bg-slate-700 relative transition">
                    <span className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition ${theme==='dark'?'left-6':'left-1'}`}/>
                  </button>
                </div>
                <div className="mt-3 p-3 rounded-xl bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-950/30 dark:to-violet-950/20 border border-indigo-100 dark:border-indigo-900/30">
                  <div className="text-xs font-semibold text-indigo-700 dark:text-indigo-300">Agustín Molina</div>
                  <div className="text-xs text-slate-500">Final — Base de Datos 2 • Nv {level} • {progress.xp} XP</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main */}
        <div className="flex-1 min-w-0">
          {/* Topbar */}
          <header className="sticky top-0 z-30 bg-white/90 dark:bg-[#171923]/90 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
            <div className="px-3 sm:px-4 lg:px-8 py-2.5 sm:py-3 flex items-center gap-2 sm:gap-3">
              <button onClick={()=>setMobileMenu(true)} className="lg:hidden p-2.5 -ml-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                <span className="block w-5 h-0.5 bg-slate-700 dark:bg-slate-300 rounded mb-1"></span>
                <span className="block w-5 h-0.5 bg-slate-700 dark:bg-slate-300 rounded mb-1"></span>
                <span className="block w-5 h-0.5 bg-slate-700 dark:bg-slate-300 rounded"></span>
              </button>
              <div className="lg:hidden flex-1 min-w-0"><Logo/></div>
              <div className="hidden sm:flex flex-1 max-w-xl relative">
                <span className="absolute left-3 top-2.5 text-slate-400">🔍</span>
                <input value={search} onChange={e=>{setSearch(e.target.value); if(e.target.value) setView('search')}} placeholder="Buscar: exists, join, CTE..." className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-transparent focus:bg-white dark:focus:bg-slate-900 focus:border-indigo-300 outline-none text-sm"/>
              </div>
              <div className="hidden lg:flex items-center gap-2 ml-auto">
                <span className="px-3 py-1.5 rounded-full bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-300 border border-orange-200 dark:border-orange-900 text-xs font-semibold">🔥 Racha {progress.streak} días</span>
                <span className="px-3 py-1.5 rounded-full bg-indigo-600 text-white font-bold text-xs">{pct}%</span>
              </div>
              <div className="flex lg:hidden items-center gap-1.5 ml-auto">
                <span className="px-2.5 py-1 rounded-full bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-300 border text-xs font-bold">🔥{progress.streak}</span>
                <span className="px-2.5 py-1 rounded-full bg-indigo-600 text-white text-xs font-bold">{pct}%</span>
              </div>
            </div>
            {/* Mobile search bar visible when not drawer */}
            <div className="sm:hidden px-3 pb-3">
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400 text-sm">🔍</span>
                <input value={search} onChange={e=>{setSearch(e.target.value); if(e.target.value) setView('search')}} placeholder="Buscar tema, SQL, tarjeta..." className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-transparent focus:bg-white dark:focus:bg-slate-900 focus:border-indigo-300 outline-none text-sm"/>
              </div>
            </div>
          </header>

          <main className="px-3 sm:px-4 lg:px-8 py-4 sm:py-6 pb-28 sm:pb-24 lg:pb-8">
            {view==='dashboard' && (
              <Dashboard
                pct={pct} completedCount={completedCount} totalConcepts={totalConcepts}
                answered={answered} correct={correct} needReview={needReview}
                progress={progress} setView={setView} setSelectedModule={setSelectedModule}
                moduleProgress={moduleProgress} level={level} xpProg={xpProg}
                showToast={showToast} setProgress={setProgress}
              />
            )}
            {view==='modules' && (
              <ModulesView modules={modules} moduleProgress={moduleProgress} moduleStatus={moduleStatus} setView={setView} setSelectedModule={setSelectedModule}/>
            )}
            {view==='module-detail' && (
              <ModuleDetail mod={modules.find(m=>m.id===selectedModule)!} progress={progress} setProgress={setProgress} showToast={showToast} setView={setView}/>
            )}
            {view==='flashcards' && <FlashcardsView progress={progress} setProgress={setProgress} showToast={showToast}/>}
            {view==='quiz' && <QuizView progress={progress} setProgress={setProgress} showToast={showToast}/>}
            {view==='lab' && <LabView progress={progress} setProgress={setProgress} showToast={showToast}/>}
            {view==='simulacro' && <SimulacroView progress={progress} setProgress={setProgress} showToast={showToast}/>}
            {view==='session' && <SessionView setView={setView} progress={progress} setProgress={setProgress} showToast={showToast}/>}
            {view==='review' && <ReviewView progress={progress}/>}
            {view==='favorites' && <FavoritesView progress={progress} setProgress={setProgress}/>}
            {view==='errors' && <ErrorsView/>}
            {view==='evaluative' && <EvaluativeView progress={progress} setProgress={setProgress} showToast={showToast} />}
            {view==='search' && <SearchView search={search} results={searchResults} setView={setView} setSelectedModule={setSelectedModule}/>}
          </main>

          {/* Bottom nav mobile - improved */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-[#171923]/95 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 safe-area-pb">
            <div className="flex items-center justify-between px-1 py-1.5">
              {[
                {id:'dashboard', icon:'🏠', label:'Inicio'},
                {id:'modules', icon:'📚', label:'Temario'},
                {id:'flashcards', icon:'🃏', label:'Cards'},
                {id:'quiz', icon:'🧠', label:'Quiz'},
                {id:'lab', icon:'💻', label:'Lab'},
              ].map(n=>(
                <button key={n.id} onClick={()=>setView(n.id as View)} className={`flex-1 flex flex-col items-center gap-0.5 py-1.5 px-1 rounded-xl transition ${view===n.id?'text-indigo-600 dark:text-indigo-400':'text-slate-500 dark:text-slate-400'}`}>
                  <span className={`w-7 h-7 grid place-items-center rounded-xl text-[18px] ${view===n.id?'bg-indigo-600 text-white shadow' : ''}`}>{n.icon}</span>
                  <span className="text-[10px] font-semibold leading-none">{n.label}</span>
                </button>
              ))}
              <button onClick={()=>setMobileMenu(true)} className="flex-1 flex flex-col items-center gap-0.5 py-1.5 px-1 rounded-xl text-slate-500 dark:text-slate-400">
                <span className="w-7 h-7 grid place-items-center rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm">☰</span>
                <span className="text-[10px] font-semibold leading-none">Más</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {toast && <div className="fixed bottom-20 lg:bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-4 py-2 rounded-full shadow-lg text-sm">{toast}</div>}
    </div>
  )
}

function Dashboard({pct,completedCount,totalConcepts,answered,correct,needReview,progress,setView,setSelectedModule,moduleProgress,level,xpProg,showToast,setProgress}:any){
  const achievementsUnlocked = progress.xp>100?2: progress.xp>50?1:0
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="rounded-[20px] sm:rounded-[24px] bg-gradient-to-br from-indigo-600 via-violet-600 to-indigo-700 text-white p-5 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-5 sm:gap-6 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-64 h-64 bg-white/10 rounded-full blur-2xl"/>
        <div className="flex-1 min-w-0">
          <div className="text-white/80 text-xs sm:text-sm font-medium">¡Hola, Agustín! 👋</div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mt-1 leading-tight">Prepará tu final de<br className="hidden sm:block"/> Base de Datos 2 de forma inteligente.</h1>
          <p className="text-white/80 mt-2 sm:mt-3 max-w-xl text-sm sm:text-base">Continuá donde dejaste. Llevás {completedCount} conceptos dominados y {answered} preguntas practicadas.</p>
          <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-2.5 sm:gap-3">
            <button onClick={()=>setView('session')} className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white text-indigo-700 font-semibold hover:bg-slate-50 text-sm sm:text-base">Continuar estudiando →</button>
            <button onClick={()=>setView('modules')} className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/15 text-white border border-white/20 font-semibold text-sm sm:text-base">Empezar sesión de estudio</button>
          </div>
        </div>
        <div className="w-full lg:w-[340px] shrink-0 bg-white rounded-2xl p-4 sm:p-5 text-slate-800 shadow-xl">
          <div className="text-sm font-semibold flex items-center justify-between">Tu progreso <span className="text-indigo-600">{pct}%</span></div>
          <div className="mt-3 flex items-center gap-4">
            <div className="w-20 h-20 rounded-full border-[6px] border-slate-100 relative flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-[6px] border-indigo-600" style={{clipPath: `inset(0 ${100-pct}% 0 0)`}}/>
              <span className="font-bold text-lg">{pct}%</span>
            </div>
            <div className="text-xs text-slate-500 leading-relaxed">
              <div><b className="text-slate-900">{completedCount}/{totalConcepts}</b> conceptos</div>
              <div><b className="text-slate-900">{progress.studiedCards}</b> tarjetas estudiadas</div>
              <div><b className="text-slate-900">{answered}</b> preguntas • {correct} correctas</div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            <div className="bg-slate-50 rounded-xl p-2"><div className="font-bold">{level}</div><div className="text-[11px] text-slate-500">Nivel</div></div>
            <div className="bg-slate-50 rounded-xl p-2"><div className="font-bold">{xpProg}/150</div><div className="text-[11px] text-slate-500">XP progreso</div></div>
            <div className="bg-slate-50 rounded-xl p-2"><div className="font-bold">🔥 {progress.streak}</div><div className="text-[11px] text-slate-500">Racha</div></div>
          </div>
          <button onClick={()=>{setProgress((p:any)=>({...p, xp: p.xp+15})); showToast('¡+15 XP por revisar dashboard!')}} className="mt-3 w-full py-2 rounded-xl bg-slate-900 text-white text-sm font-medium">Reclamar XP diario</button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 grid sm:grid-cols-3 gap-4">
          {[
            {k:'Módulos', v:`${modules.filter(m=>moduleProgress(m.id)===100).length}/6`, s:'completados'},
            {k:'Tarjetas', v: progress.studiedCards, s:'estudiadas'},
            {k:'Precisión', v: answered?`${Math.round(correct/Math.max(1,answered)*100)}%`:'—', s:'correctas'},
          ].map(c=>(
            <div key={c.k} className="bg-white dark:bg-[#171923] rounded-2xl p-5 border border-slate-200 dark:border-slate-800">
              <div className="text-xs text-slate-500">{c.k}</div>
              <div className="text-2xl font-extrabold mt-1">{c.v}</div>
              <div className="text-xs text-slate-500">{c.s}</div>
            </div>
          ))}
          <div className="sm:col-span-3 bg-white dark:bg-[#171923] rounded-2xl p-5 border border-slate-200 dark:border-slate-800">
            <div className="font-semibold">Accesos rápidos</div>
            <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                {l:'Flashcards', id:'flashcards', c:'from-violet-500 to-indigo-500'},
                {l:'Cuestionario', id:'quiz', c:'from-blue-500 to-cyan-500'},
                {l:'Laboratorio', id:'lab', c:'from-emerald-500 to-teal-500'},
                {l:'Simulacro', id:'simulacro', c:'from-orange-500 to-amber-500'},
              ].map(b=>(
                <button key={b.id} onClick={()=>setView(b.id)} className={`p-4 rounded-xl bg-gradient-to-br ${b.c} text-white font-semibold text-sm text-left`}>{b.l}<div className="text-white/80 text-xs mt-1">Practicar →</div></button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white dark:bg-[#171923] rounded-2xl p-5 border border-slate-200 dark:border-slate-800">
            <div className="font-semibold">Necesita repaso</div>
            <div className="mt-3 space-y-2">
              {needReview.length? needReview.map((r:any)=>{
                const mod = modules.find(m=>m.id===r.mid)!
                return <div key={r.mid} className="flex items-center justify-between p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900"><span className="text-sm font-medium">{mod.shortTitle}</span><span className="text-sm font-bold text-amber-700">{r.pct}%</span></div>
              }): <div className="text-sm text-slate-500">¡Excelente! Sin temas críticos. Seguí con flashcards.</div>}
            </div>
            <button onClick={()=>setView('review')} className="mt-3 w-full py-2 rounded-xl bg-slate-900 dark:bg-white dark:text-slate-900 text-white text-sm">Ver repaso inteligente</button>
          </div>

          <div className="bg-white dark:bg-[#171923] rounded-2xl p-5 border border-slate-200 dark:border-slate-800">
            <div className="font-semibold">Logros</div>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {achievements.slice(0,4).map(a=>(
                <div key={a.id} className={`aspect-square rounded-xl flex flex-col items-center justify-center text-lg border ${achievementsUnlocked>=Number(a.id[1])?'bg-indigo-50 dark:bg-indigo-950/30 border-indigo-200':'bg-slate-50 dark:bg-slate-800 border-transparent opacity-60'}`}>{a.icon}<span className="text-[9px] mt-1 font-medium">{a.title.split(' ')[0]}</span></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-[#171923] rounded-2xl p-5 border border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between"><h3 className="font-semibold">Tu progreso por módulo</h3><button onClick={()=>setView('modules')} className="text-sm text-indigo-600">Ver todo →</button></div>
        <div className="mt-4 grid md:grid-cols-3 gap-4">
          {modules.map(m=>{
            const p = moduleProgress(m.id)
            return (
              <button key={m.id} onClick={()=>{setSelectedModule(m.id); setView('module-detail')}} className="text-left p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:shadow-md transition bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${m.color} flex items-center justify-center text-white`}>{m.icon}</div>
                <div className="font-semibold mt-3 text-sm">{m.shortTitle}</div>
                <div className="text-xs text-slate-500 line-clamp-2">{m.description}</div>
                <div className="mt-3 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden"><div className="h-full bg-indigo-600" style={{width:`${p}%`}}/></div>
                <div className="text-xs text-slate-500 mt-1">{p}% • {p===100?'Dominado':p>0?'En progreso':'No iniciado'}</div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function ModulesView({modules,moduleProgress,moduleStatus,setView,setSelectedModule}:any){
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-extrabold">Temario</h1><p className="text-slate-500 dark:text-slate-400">6 módulos • {modules.reduce((a:number,m:any)=>a+m.concepts.length,0)} conceptos</p></div>
      <div className="grid md:grid-cols-2 gap-4">
        {modules.map((m:any)=>(
          <div key={m.id} className="bg-white dark:bg-[#171923] rounded-2xl p-5 border border-slate-200 dark:border-slate-800 hover:shadow-card transition">
            <div className="flex gap-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${m.color} flex items-center justify-center text-white text-xl shrink-0`}>{m.icon}</div>
              <div className="flex-1">
                <div className="text-xs font-semibold text-indigo-600">MÓDULO {m.id}</div>
                <div className="font-bold">{m.title}</div>
                <div className="text-sm text-slate-500 mt-1">{m.description}</div>
                <div className="mt-3 flex items-center gap-2 text-xs">
                  <span className="px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800">{m.concepts.length} conceptos</span>
                  <span className={`px-2 py-1 rounded-full font-medium ${moduleProgress(m.id)===100?'bg-emerald-100 text-emerald-700':moduleProgress(m.id)>0?'bg-amber-100 text-amber-700':'bg-slate-100 text-slate-600'}`}>{moduleStatus(m.id)}</span>
                </div>
                <div className="mt-3 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-indigo-600 to-violet-600" style={{width:`${moduleProgress(m.id)}%`}}/></div>
              </div>
            </div>
            <button onClick={()=>{setSelectedModule(m.id); setView('module-detail')}} className="mt-4 w-full py-2.5 rounded-xl bg-slate-900 dark:bg-white dark:text-slate-900 text-white font-medium">Ver módulo →</button>
          </div>
        ))}
      </div>
    </div>
  )
}

function ModuleDetail({mod,progress,setProgress,showToast,setView}:any){
  const [active, setActive]=useState<string>(mod.concepts[0].id)
  const concept = mod.concepts.find((c:any)=>c.id===active)
  const isFav = progress.favorites.concepts.includes(concept.id)
  const isDone = progress.completedConcepts.includes(concept.id)
  return (
    <div className="space-y-6">
      <button onClick={()=>setView('modules')} className="text-sm text-slate-500">← Volver al temario</button>
      <div className={`rounded-2xl bg-gradient-to-br ${mod.color} text-white p-6`}>
        <div className="text-white/80 text-xs font-bold tracking-widest">MÓDULO {mod.id}</div>
        <h1 className="text-2xl font-extrabold mt-1">{mod.title}</h1>
        <p className="text-white/90 mt-2 max-w-2xl">{mod.description}</p>
      </div>
      <div className="grid lg:grid-cols-[280px_1fr] gap-6">
        <div className="space-y-2">
          {mod.concepts.map((c:any)=>(
            <button key={c.id} onClick={()=>setActive(c.id)} className={`w-full text-left p-3 rounded-xl border ${active===c.id?'bg-indigo-600 text-white border-indigo-600':'bg-white dark:bg-[#171923] border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
              <div className="font-semibold text-sm">{c.title}</div>
              <div className={`text-xs ${active===c.id?'text-white/80':'text-slate-500'} truncate`}>{progress.completedConcepts.includes(c.id)?'✓ Completado':'Pendiente'}</div>
            </button>
          ))}
        </div>
        <div className="bg-white dark:bg-[#171923] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div><h2 className="text-xl font-bold">{concept.title}</h2><p className="text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">{concept.theory}</p>{concept.detail && <p className="text-sm text-slate-500 mt-2">{concept.detail}</p>}</div>
            <button onClick={()=>{
              setProgress((p:any)=>{
                const concepts = isFav ? p.favorites.concepts.filter((x:string)=>x!==concept.id) : [...p.favorites.concepts, concept.id]
                return {...p, favorites:{...p.favorites, concepts}}
              })
            }} className={`p-2 rounded-xl border ${isFav?'bg-amber-400 border-amber-400 text-white':'bg-slate-50 dark:bg-slate-800'}`}>⭐</button>
          </div>

          <div>
            <div className="text-sm font-semibold">Ejemplo SQL</div>
            <pre className="mt-2 p-4 rounded-xl bg-slate-900 text-slate-100 overflow-auto text-sm font-mono leading-relaxed"><code>{concept.sqlExample}</code></pre>
            <div className="mt-2 p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 text-sm">
              <div className="font-semibold text-indigo-700 dark:text-indigo-300">Explicación línea por línea</div>
              <div className="whitespace-pre-line text-slate-600 dark:text-slate-400 mt-1">{concept.explanation}</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900">
              <div className="font-semibold text-amber-800 dark:text-amber-300 text-sm">⚠️ Errores frecuentes</div>
              <ul className="mt-2 list-disc list-inside text-sm text-amber-900/80 dark:text-amber-200/80 space-y-1">{concept.errors.map((e:string,i:number)=><li key={i}>{e}</li>)}</ul>
            </div>
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900">
              <div className="font-semibold text-emerald-800 dark:text-emerald-300 text-sm">💡 Consejo para el examen</div>
              <div className="text-sm mt-2 text-emerald-900/80 dark:text-emerald-200/80">{concept.tip}</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button onClick={()=>{
              if(!isDone){ setProgress((p:any)=>({...p, completedConcepts:[...p.completedConcepts,concept.id], xp:p.xp+10, studiedCards: p.studiedCards+1})); showToast('¡+10 XP! Concepto completado')}
              else showToast('Ya completado')
            }} className={`px-5 py-2.5 rounded-xl font-semibold ${isDone?'bg-emerald-600 text-white':'bg-indigo-600 text-white'}`}>{isDone?'✓ Completado':'Marcar como completado +10 XP'}</button>
            <button onClick={()=>setView('flashcards')} className="px-5 py-2.5 rounded-xl border bg-white dark:bg-slate-800 font-medium">Practicar →</button>
          </div>
        </div>
      </div>
    </div>
  )
}

function FlashcardsView({progress,setProgress,showToast}:any){
  const [filter,setFilter]=useState<number>(0)
  const [idx,setIdx]=useState(0)
  const [revealed,setRevealed]=useState(false)
  const list = useMemo(()=>{
    let l = filter? flashcards.filter((f:any)=>f.moduleId===filter): [...flashcards]
    // smart order: dificil first
    return [...l].sort((a:any,b:any)=>{
      const ra = progress.flashcardRatings[a.id]
      const rb = progress.flashcardRatings[b.id]
      const w = (r:string)=> r==='dificil'?0: r==='normal'?1:2
      return w(ra||'normal') - w(rb||'normal')
    })
  },[filter,progress.flashcardRatings])
  const card = list[idx]
  if(!card) return <div>No hay tarjetas</div>
  const currentRating = progress.flashcardRatings[card.id]
  const isFav = progress.favorites.flashcards.includes(card.id)
  const rate=(lvl:'facil'|'normal'|'dificil')=>{
    const alreadyRated = currentRating === lvl
    setProgress((p:any)=>({...p, flashcardRatings:{...p.flashcardRatings,[card.id]:lvl}, studiedCards: alreadyRated ? p.studiedCards : p.studiedCards+1, xp: alreadyRated ? p.xp : p.xp+ (lvl==='facil'?5: lvl==='normal'?8:10)}))
    showToast(alreadyRated ? `Actualizado a ${lvl}` : lvl==='dificil'?'Se repetirá pronto • +10 XP': lvl==='facil' ? '¡Bien! +5 XP' : '+8 XP')
  }
  const goNext = () => { setRevealed(false); setTimeout(()=> setIdx((i:number)=>(i+1)%list.length), 150) }
  const goPrev = () => { setRevealed(false); setTimeout(()=> setIdx((i:number)=>Math.max(0,i-1) === i ? i : Math.max(0,i-1)), 150) }
  // Reset revealed when card changes via filter
  useEffect(()=>{ setRevealed(false)},[idx, filter])
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold">Flashcards</h1>
        <select value={filter} onChange={e=>{setFilter(Number(e.target.value)); setIdx(0); setRevealed(false)}} className="px-3 py-2 rounded-xl border bg-white dark:bg-slate-800 text-sm">
          <option value={0}>Todos los módulos</option>{modules.map((m:any)=><option key={m.id} value={m.id}>{m.shortTitle}</option>)}
        </select>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-500">{idx+1} / {list.length} • Módulo {card.moduleId} {currentRating && <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-bold ${currentRating==='facil'?'bg-emerald-100 text-emerald-700': currentRating==='dificil'?'bg-red-100 text-red-700':'bg-amber-100 text-amber-700'}`}>{currentRating}</span>}</span>
        <div className="h-1.5 flex-1 mx-4 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-indigo-600 transition-all" style={{width:`${(idx+1)/list.length*100}%`}}/></div>
        <span className="px-2 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold">{card.tag}</span>
      </div>

      <div className="relative h-[420px] sm:h-[380px]" style={{perspective:'1000px'}}>
        <div className="w-full h-full relative transition-all duration-700" style={{transformStyle:'preserve-3d', transform: revealed ? 'rotateY(180deg)' : 'rotateY(0deg)'}}>
          {/* FRONT - Pregunta */}
          <div onClick={()=>setRevealed(true)} className="absolute inset-0 bg-white dark:bg-[#171923] rounded-[24px] border border-slate-200 dark:border-slate-800 p-6 sm:p-8 flex flex-col shadow-card cursor-pointer select-none" style={{backfaceVisibility:'hidden'}}>
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold tracking-widest text-indigo-600">PREGUNTA</div>
              <span className="w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center text-indigo-600 text-sm" title="Click para girar">↻</span>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <div className="text-xl sm:text-2xl font-semibold leading-relaxed">{card.question}</div>
              <div className="mt-3 text-xs text-slate-400">Tocá la tarjeta para ver la respuesta</div>
            </div>
            <div className="space-y-2">
              <button onClick={(e)=>{e.stopPropagation(); setRevealed(true)}} className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold hover:shadow-lg transition flex items-center justify-center gap-2">
                <span>Revelar respuesta</span><span className="text-white/80">↻</span>
              </button>
              <div className="flex gap-2">
                <button onClick={(e)=>{e.stopPropagation(); goPrev()}} className="flex-1 py-2.5 rounded-xl border bg-white dark:bg-slate-800 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition">← Anterior</button>
                <button onClick={(e)=>{e.stopPropagation(); goNext()}} className="flex-1 py-2.5 rounded-xl border bg-white dark:bg-slate-800 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition">Siguiente →</button>
              </div>
            </div>
          </div>

          {/* BACK - Respuesta */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-violet-600 to-indigo-700 rounded-[24px] p-6 sm:p-8 flex flex-col text-white shadow-card" style={{transform:'rotateY(180deg)', backfaceVisibility:'hidden'}}>
            <div className="flex items-center justify-between">
              <div className="text-white/70 text-xs font-bold tracking-widest">RESPUESTA</div>
              <button onClick={()=>setRevealed(false)} className="w-8 h-8 rounded-full bg-white/15 border border-white/20 flex items-center justify-center hover:bg-white/25 transition" title="Volver a pregunta">↩</button>
            </div>
            {/* Click area to flip back */}
            <div onClick={()=>setRevealed(false)} className="flex-1 flex flex-col items-center justify-center text-center cursor-pointer">
              <div className="text-lg sm:text-xl font-medium leading-relaxed">{card.answer}</div>
              <div className="mt-3 text-xs text-white/60">Tocá para ver la pregunta de nuevo</div>
              {currentRating && <div className="mt-3 px-3 py-1 rounded-full bg-white/20 border border-white/20 text-xs font-semibold">Calificada como: {currentRating} ✓</div>}
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <button onClick={()=>setRevealed(false)} className="flex-1 py-2.5 rounded-xl bg-white/15 border border-white/20 text-sm font-semibold hover:bg-white/25 transition flex items-center justify-center gap-1.5">
                  <span>↩</span> Ver pregunta
                </button>
                <button onClick={()=>setProgress((p:any)=>({...p, favorites:{...p.favorites, flashcards: isFav ? p.favorites.flashcards.filter((x:string)=>x!==card.id) : [...p.favorites.flashcards, card.id]}}))} className={`px-4 py-2.5 rounded-xl text-sm font-semibold border transition ${isFav?'bg-amber-400 border-amber-400 text-white':'bg-white/10 border-white/20 text-white hover:bg-white/20'}`} title={isFav?'Quitar favorita':'Marcar favorita'}>
                  {isFav?'⭐ Fav':'☆'}
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button onClick={()=>rate('dificil')} className={`py-3 rounded-xl font-bold text-sm transition border ${currentRating==='dificil'?'bg-red-500 border-red-500 text-white shadow-lg scale-[1.02]':'bg-white/15 border-white/20 text-white hover:bg-white/25'}`}>Difícil</button>
                <button onClick={()=>rate('normal')} className={`py-3 rounded-xl font-bold text-sm transition border ${currentRating==='normal'?'bg-white text-indigo-700 shadow-lg scale-[1.02]':'bg-white/15 border-white/20 text-white hover:bg-white/25'}`}>Normal</button>
                <button onClick={()=>rate('facil')} className={`py-3 rounded-xl font-bold text-sm transition border ${currentRating==='facil'?'bg-emerald-400 border-emerald-400 text-white shadow-lg scale-[1.02]':'bg-white/15 border-white/20 text-white hover:bg-white/25'}`}>Fácil</button>
              </div>

              <div className="flex gap-2">
                <button onClick={goPrev} className="flex-1 py-2 rounded-xl bg-white/10 border border-white/20 text-sm font-medium hover:bg-white/20 transition">← Anterior</button>
                <button onClick={goNext} className="flex-1 py-2 rounded-xl bg-white text-indigo-700 text-sm font-bold hover:bg-white/90 transition">Siguiente →</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
        <span>💡 Tip:</span>
        <span>Podés girar la tarjeta cuantas veces quieras. Calificá para activar el repaso inteligente.</span>
      </div>
      <div className="text-center text-xs text-slate-400">Las difíciles aparecen primero. {currentRating ? 'Ya calificaste esta tarjeta.' : 'Calificá fácil/normal/difícil para personalizar tu repaso.'}</div>
    </div>
  )
}

function QuizView({_progress: _p,setProgress,showToast}:any){
  const progress=_p
  const [mod,setMod]=useState<number>(0)
  const [i,setI]=useState(0)
  const [chosen,setChosen]=useState<number|null>(null)
  const [show,setShow]=useState(false)
  const list = useMemo(()=> mod? questions.filter((q:any)=>q.moduleId===mod): questions,[mod])
  const q = list[i]
  const answer=(idx:number)=>{
    if(show) return
    setChosen(idx); setShow(true)
    const correct = idx===q.correct
    setProgress((p:any)=>{
      const answered = {...p.answeredQuestions, [q.id]:correct}
      const correctQs = correct && !p.correctQuestions.includes(q.id)? [...p.correctQuestions,q.id]: p.correctQuestions
      return {...p, answeredQuestions:answered, correctQuestions:correctQs, answeredCount: Object.keys(answered).length, xp: correct? p.xp+10: p.xp+2}
    })
    showToast(correct?'¡Correcto +10 XP!':'Revisá la explicación')
  }
  if(!q) return <div>No hay preguntas</div>
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-extrabold">Cuestionarios</h1>
        <select value={mod} onChange={e=>{setMod(Number(e.target.value)); setI(0); setShow(false); setChosen(null)}} className="px-3 py-2 rounded-xl border bg-white dark:bg-slate-800 text-sm">
          <option value={0}>Todos los módulos</option>{modules.map((m:any)=><option key={m.id} value={m.id}>{m.shortTitle}</option>)}
        </select>
      </div>
      <div className="bg-white dark:bg-[#171923] rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
        <div className="flex items-center gap-2 text-xs">
          <span className="px-2 py-1 rounded-full bg-indigo-100 text-indigo-700 font-semibold">Módulo {q.moduleId}</span>
          <span className="px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800">{q.type}</span>
          <span className="ml-auto text-slate-500">{i+1}/{list.length}</span>
        </div>
        <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mt-3"><div className="h-full bg-indigo-600" style={{width:`${(i+1)/list.length*100}%`}}/></div>
        <h3 className="font-semibold mt-4 text-lg leading-relaxed">{q.question}</h3>
        {q.code && <pre className="mt-3 p-3 rounded-xl bg-slate-900 text-slate-100 text-sm font-mono overflow-auto">{q.code}</pre>}
        <div className="mt-4 space-y-2">
          {q.options.map((op:string,idx:number)=>{
            const isCorrect = idx===q.correct
            const isChosen = idx===chosen
            let cls="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50"
            if(show){
              if(isCorrect) cls="bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 text-emerald-900 dark:text-emerald-200"
              else if(isChosen && !isCorrect) cls="bg-red-50 dark:bg-red-950/30 border-red-300 text-red-900 dark:text-red-200"
              else cls="opacity-60"
            }
            return <button key={idx} onClick={()=>answer(idx)} className={`w-full text-left p-3 rounded-xl border text-sm font-medium transition ${cls}`}>{String.fromCharCode(65+idx)}. {op} {show && isCorrect && ' ✓'} </button>
          })}
        </div>
        {show && (
          <div className={`mt-4 p-4 rounded-xl border ${chosen===q.correct?'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200':'bg-amber-50 dark:bg-amber-950/20 border-amber-200'}`}>
            <div className={`font-semibold ${chosen===q.correct?'text-emerald-700':'text-amber-700'}`}>{chosen===q.correct?'¡Correcto!':'Incorrecto'}</div>
            <div className="text-sm mt-1 text-slate-700 dark:text-slate-300">{q.explanation}</div>
            {q.whyIncorrect && <ul className="mt-2 text-xs text-slate-500 list-disc list-inside">{q.whyIncorrect.map((w:string,i:number)=><li key={i}>{w}</li>)}</ul>}
            <button onClick={()=>{setI((v:number)=>(v+1)%list.length); setShow(false); setChosen(null)}} className="mt-3 px-4 py-2 rounded-xl bg-slate-900 dark:bg-white dark:text-slate-900 text-white text-sm">Siguiente →</button>
          </div>
        )}
      </div>
    </div>
  )
}

function LabView({progress,setProgress,showToast}:any){
  const [exId,setExId]=useState(exercises[0].id)
  const ex = exercises.find((e:any)=>e.id===exId)!
  const [code,setCode]=useState(ex.starterCode)
  const [result,setResult]=useState<{headers:string[], rows:string[][]}|null>(null)
  const [msg,setMsg]=useState<string|null>(null)
  useEffect(()=>{setCode(ex.starterCode); setResult(null); setMsg(null)},[exId])
  const run=()=>{
    const norm=(s:string)=>s.replace(/\s+/g,' ').trim().toLowerCase().replace(/;/g,'')
    if(norm(code)===norm(ex.expected)){
      setResult({headers:ex.resultHeaders, rows:ex.resultRows}); setMsg('✅ Consulta correcta')
      if(!progress.completedExercises.includes(ex.id)){
        setProgress((p:any)=>({...p, completedExercises:[...p.completedExercises,ex.id], xp:p.xp+15})); showToast('+15 XP')
      }
    } else {
      setMsg('❌ No coincide con la solución esperada. Revisá sintaxis, alias y filtros.')
      setResult(null)
    }
  }
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold">Laboratorio SQL 💻</h1>
      <p className="text-slate-500 -mt-4">Editor simulado con validación de consultas. Practicá sin riesgo.</p>
      <div className="grid lg:grid-cols-[220px_1fr] gap-6">
        <div className="space-y-2">
          {exercises.map((e:any)=>(
            <button key={e.id} onClick={()=>setExId(e.id)} className={`w-full text-left p-3 rounded-xl border text-sm ${exId===e.id?'bg-indigo-600 text-white border-indigo-600':'bg-white dark:bg-[#171923] border-slate-200 dark:border-slate-800'}`}>
              <div className="font-semibold">{e.title}</div><div className={`text-xs ${exId===e.id?'text-white/80':'text-slate-500'}`}>Módulo {e.moduleId} • {e.difficulty}</div>
            </button>
          ))}
        </div>
        <div className="space-y-4">
          <div className="bg-white dark:bg-[#171923] rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
            <div className="font-semibold">{ex.title} <span className="text-xs px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 ml-2">Módulo {ex.moduleId}</span></div>
            <div className="text-sm text-slate-500 mt-1">{ex.instructions}</div>
            <div className="text-xs mt-2 text-amber-700 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 p-2 rounded-xl">💡 Pista: {ex.hint}</div>
          </div>

          <div className="bg-[#0f172a] rounded-2xl p-4 border border-slate-800">
            <div className="flex items-center justify-between mb-2"><span className="text-xs font-mono text-slate-400">editor.sql</span><button onClick={run} className="px-4 py-1.5 rounded-lg bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-600">▶ Ejecutar</button></div>
            <textarea value={code} onChange={e=>setCode(e.target.value)} className="w-full h-40 bg-[#1e293b] text-emerald-300 font-mono text-sm p-3 rounded-xl outline-none border border-slate-700" spellCheck={false}/>
            {msg && <div className="mt-3 p-3 rounded-xl bg-white/10 text-white text-sm">{msg}</div>}
            {result && (
              <div className="mt-3 bg-white rounded-xl overflow-hidden">
                <div className="px-4 py-2 bg-slate-100 text-xs font-semibold text-slate-600">Resultado ({result.rows.length} filas)</div>
                <table className="w-full text-sm">
                  <thead><tr className="bg-slate-50">{result.headers.map((h:string)=><th key={h} className="px-3 py-2 text-left font-semibold border-b">{h}</th>)}</tr></thead>
                  <tbody>{result.rows.map((r:string[],i:number)=><tr key={i} className="border-b last:border-0">{r.map((c:string,j:number)=><td key={j} className="px-3 py-2">{c}</td>)}</tr>)}</tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function SimulacroView({_progress: _p2,setProgress,showToast}:any){
  const progress=_p2
  const [cfg,setCfg]=useState<{n:10|20|30, timed:boolean}|null>(null)
  const [qs,setQs]=useState<any[]>([])
  const [idx,setIdx]=useState(0)
  const [ans,setAns]=useState<Record<string,number>>({})
  const [done,setDone]=useState(false)
  const [time,setTime]=useState(0)
  useEffect(()=>{
    if(cfg?.timed && !done){
      const id=setInterval(()=>setTime(t=>t+1),1000)
      return ()=>clearInterval(id)
    }
  },[cfg,done])
  const start=(n:10|20|30, timed:boolean)=>{
    const shuffled=[...questions].sort(()=>Math.random()-0.5).slice(0,n)
    setQs(shuffled); setCfg({n,timed}); setIdx(0); setAns({}); setDone(false); setTime(0)
  }
  if(!cfg) return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-extrabold">Simulacro de Final 🎯</h1>
      <div className="bg-white dark:bg-[#171923] rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
        <div className="font-semibold">Elegí cantidad</div>
        <div className="mt-3 grid grid-cols-3 gap-3">
          {[10,20,30].map(n=>(
            <button key={n} onClick={()=>start(n as any,false)} className="p-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-indigo-400 text-center">
              <div className="text-2xl font-black">{n}</div><div className="text-xs text-slate-500">preguntas</div>
            </button>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <button onClick={()=>start(20,true)} className="py-3 rounded-xl bg-orange-500 text-white font-semibold">⏱ Con tiempo</button>
          <button onClick={()=>start(20,false)} className="py-3 rounded-xl bg-indigo-600 text-white font-semibold">Sin tiempo</button>
        </div>
        <p className="text-xs text-slate-500 mt-3">Mezcla preguntas de todos los módulos. Al finalizar verás rendimiento por módulo.</p>
      </div>
    </div>
  )
  if(done){
    const correct = qs.filter((q:any)=>ans[q.id]===q.correct).length
    const pct = Math.round(correct/qs.length*100)
    const byMod:Record<number,{t:number,c:number}>={}
    qs.forEach((q:any)=>{ if(!byMod[q.moduleId]) byMod[q.moduleId]={t:0,c:0}; byMod[q.moduleId].t++; if(ans[q.id]===q.correct) byMod[q.moduleId].c++ })
    const weak = Object.entries(byMod).filter(([_,v])=> v.c/v.t<0.6).map(([k])=>modules.find(m=>m.id===Number(k))?.shortTitle)
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl p-6 text-white text-center">
          <div className="text-white/80 text-sm">Resultado</div>
          <div className="text-5xl font-black mt-1">{pct}%</div>
          <div className="text-white/90">{correct}/{qs.length} correctas • {Math.floor(time/60)}:{String(time%60).padStart(2,'0')}</div>
          {pct>=80 && <div className="mt-2 inline-block px-3 py-1 rounded-full bg-white text-indigo-700 text-sm font-bold">¡Excelente!</div>}
        </div>
        <div className="bg-white dark:bg-[#171923] rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
          <div className="font-semibold">Rendimiento por módulo</div>
          <div className="mt-3 space-y-2">
            {Object.entries(byMod).map(([mid,v]:any)=>{
              const m=modules.find(x=>x.id===Number(mid))!
              const p=Math.round(v.c/v.t*100)
              return <div key={mid} className="flex items-center gap-3"><span className="text-sm w-32">{m.shortTitle}</span><div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden"><div className={`h-full ${p>=70?'bg-emerald-500':p>=50?'bg-amber-500':'bg-red-500'}`} style={{width:`${p}%`}}/></div><span className="text-sm font-bold">{p}%</span></div>
            })}
          </div>
          {weak.length>0 && <div className="mt-4 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 text-sm"><b>Temas para repasar:</b> {weak.join(', ')}</div>}
          <div className="mt-4 flex gap-3">
            <button onClick={()=>{setCfg(null)}} className="flex-1 py-3 rounded-xl bg-slate-900 dark:bg-white dark:text-slate-900 text-white font-semibold">Nuevo simulacro</button>
            <button onClick={()=>{setProgress((p:any)=>({...p, xp: p.xp+ pct>=60?30:10})); showToast('Progreso guardado'); setCfg(null)}} className="flex-1 py-3 rounded-xl bg-white border font-semibold">Guardar y salir</button>
          </div>
        </div>
      </div>
    )
  }
  const q=qs[idx]
  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold">{idx+1}/{qs.length} • {cfg.timed && `⏱ ${Math.floor(time/60)}:${String(time%60).padStart(2,'0')}`}</div>
        <button onClick={()=>setDone(true)} className="px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs">Finalizar</button>
      </div>
      <div className="h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-indigo-600" style={{width:`${(idx+1)/qs.length*100}%`}}/></div>
      <div className="bg-white dark:bg-[#171923] rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
        <div className="text-xs px-2 py-1 rounded-full bg-indigo-100 text-indigo-700 inline-block">Módulo {q.moduleId}</div>
        <h3 className="font-semibold mt-3">{q.question}</h3>
        {q.code && <pre className="mt-2 p-2 bg-slate-900 text-slate-100 rounded-xl text-sm overflow-auto">{q.code}</pre>}
        <div className="mt-4 space-y-2">
          {q.options.map((op:string,i:number)=>(
            <button key={i} onClick={()=>setAns({...ans,[q.id]:i})} className={`w-full text-left p-3 rounded-xl border text-sm ${ans[q.id]===i?'bg-indigo-600 text-white border-indigo-600':'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'}`}>{String.fromCharCode(65+i)}. {op}</button>
          ))}
        </div>
        <div className="mt-4 flex justify-between">
          <button disabled={idx===0} onClick={()=>setIdx(idx-1)} className="px-4 py-2 rounded-xl border disabled:opacity-40">← Anterior</button>
          {idx===qs.length-1? <button onClick={()=>setDone(true)} className="px-6 py-2 rounded-xl bg-emerald-600 text-white font-semibold">Ver resultado</button> : <button onClick={()=>setIdx(idx+1)} className="px-6 py-2 rounded-xl bg-indigo-600 text-white font-semibold">Siguiente →</button>}
        </div>
      </div>
    </div>
  )
}

function SessionView({setView,progress,setProgress,showToast}:any){
  const [step,setStep]=useState(0)
  const totalSteps=4
  // Build session: 3 concepts, 5 flashcards, 5 questions, 1 exercise
  const sessionConcepts = modules.flatMap(m=>m.concepts).slice(0,3)
  const sessionFlash = flashcards.slice(0,5)
  const sessionQs = questions.slice(0,5)
  const sessionEx = exercises[0]
  const finish=()=>{
    setProgress((p:any)=>({...p, xp:p.xp+25, streak: p.streak+1, lastActivity:new Date().toISOString()}))
    showToast('¡Sesión completada +25 XP!')
    setView('dashboard')
  }
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-extrabold">Sesión de estudio ⚡ — 15 minutos</h1>
      <div className="flex gap-2">{Array.from({length:totalSteps}).map((_,i)=><div key={i} className={`flex-1 h-2 rounded-full ${i<=step?'bg-indigo-600':'bg-slate-200 dark:bg-slate-800'}`}/>)}</div>
      {step===0 && (
        <div className="bg-white dark:bg-[#171923] rounded-2xl border p-6 space-y-3">
          <h3 className="font-bold">1️⃣ Teoría breve — 3 conceptos</h3>
          {sessionConcepts.map((c:any)=><div key={c.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800"><div className="font-semibold text-sm">{c.title}</div><div className="text-xs text-slate-500">{c.theory.slice(0,120)}...</div></div>)}
          <button onClick={()=>setStep(1)} className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold">Continuar → Flashcards</button>
        </div>
      )}
      {step===1 && (
        <div className="bg-white dark:bg-[#171923] rounded-2xl border p-6">
          <h3 className="font-bold">2️⃣ Flashcards — 5 tarjetas</h3>
          <div className="mt-3 space-y-2">{sessionFlash.map((f:any)=><div key={f.id} className="p-3 rounded-xl border flex justify-between items-center"><span className="text-sm">{f.question}</span><span className="text-xs px-2 py-1 rounded-full bg-indigo-100 text-indigo-700">{f.tag}</span></div>)}</div>
          <button onClick={()=>setStep(2)} className="mt-4 w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold">Ya repasé → Preguntas</button>
        </div>
      )}
      {step===2 && (
        <div className="bg-white dark:bg-[#171923] rounded-2xl border p-6">
          <h3 className="font-bold">3️⃣ Preguntas — 5 preguntas</h3>
          <div className="mt-3 space-y-2">{sessionQs.map((q:any,i:number)=><div key={q.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-sm">{i+1}. {q.question}</div>)}</div>
          <button onClick={()=>setStep(3)} className="mt-4 w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold">Siguiente → Ejercicio SQL</button>
        </div>
      )}
      {step===3 && (
        <div className="bg-white dark:bg-[#171923] rounded-2xl border p-6">
          <h3 className="font-bold">4️⃣ Ejercicio SQL</h3>
          <div className="mt-2 p-3 rounded-xl bg-slate-900 text-slate-100 font-mono text-sm">{sessionEx.instructions}</div>
          <pre className="mt-3 p-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-sm overflow-auto">{sessionEx.starterCode}</pre>
          <button onClick={finish} className="mt-4 w-full py-3 rounded-xl bg-emerald-600 text-white font-semibold">Finalizar sesión 🎉</button>
          <div className="text-xs text-slate-500 mt-2 text-center">Al finalizar: {progress.xp} XP → {progress.xp+25} XP • Racha +1</div>
        </div>
      )}
    </div>
  )
}

function ReviewView({progress}:any){
  const difficult = flashcards.filter((f:any)=>progress.flashcardRatings[f.id]==='dificil')
  const incorrect = questions.filter((q:any)=>progress.answeredQuestions[q.id]===false)
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-extrabold">Repaso inteligente 🔁</h1>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-[#171923] rounded-2xl border p-5">
          <div className="font-semibold">Tarjetas difíciles ({difficult.length})</div>
          <div className="mt-3 space-y-2 max-h-80 overflow-auto">{difficult.length? difficult.map((f:any)=><div key={f.id} className="p-3 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 text-sm"><div className="font-medium">{f.question}</div><div className="text-xs text-slate-500 mt-1">{f.answer}</div></div>): <div className="text-sm text-slate-500">No hay tarjetas difíciles. ¡Bien!</div>}</div>
        </div>
        <div className="bg-white dark:bg-[#171923] rounded-2xl border p-5">
          <div className="font-semibold">Preguntas falladas ({incorrect.length})</div>
          <div className="mt-3 space-y-2 max-h-80 overflow-auto">{incorrect.length? incorrect.map((q:any)=><div key={q.id} className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 text-sm">{q.question}<div className="text-xs text-slate-500 mt-1">{q.explanation.slice(0,100)}...</div></div>): <div className="text-sm text-slate-500">Sin errores recientes.</div>}</div>
        </div>
      </div>
      <div className="bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl p-6 text-white">
        <div className="font-bold">Recomendación</div>
        <div className="text-white/90 text-sm mt-1">{difficult.length+incorrect.length>5?'Tenés varios temas para reforzar. Hacé una sesión de 15 min diaria.':'Vas muy bien, mantené la racha practicando 1 módulo por día.'}</div>
      </div>
    </div>
  )
}

function FavoritesView({progress,setProgress}:any){
  const favConcepts = modules.flatMap(m=>m.concepts).filter(c=>progress.favorites.concepts.includes(c.id))
  const favFlash = flashcards.filter(f=>progress.favorites.flashcards.includes(f.id))
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-extrabold">Mis favoritos ⭐</h1>
      <div className="bg-white dark:bg-[#171923] rounded-2xl border p-5">
        <div className="font-semibold">Conceptos ({favConcepts.length})</div>
        <div className="mt-3 space-y-2">{favConcepts.length? favConcepts.map((c:any)=><div key={c.id} className="flex justify-between items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800"><span className="text-sm font-medium">{c.title}</span><button onClick={()=>setProgress((p:any)=>({...p, favorites:{...p.favorites, concepts:p.favorites.concepts.filter((x:string)=>x!==c.id)}}))} className="text-xs px-2 py-1 rounded-full bg-white border">Quitar</button></div>):<div className="text-sm text-slate-500">Aún no marcaste favoritos. Entrá a un módulo y tocá ⭐</div>}</div>
      </div>
      <div className="bg-white dark:bg-[#171923] rounded-2xl border p-5">
        <div className="font-semibold">Flashcards ({favFlash.length})</div>
        <div className="mt-3 space-y-2">{favFlash.map((f:any)=><div key={f.id} className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900"><div className="text-sm font-medium">{f.question}</div><div className="text-xs text-slate-500">{f.answer}</div></div>)}</div>
      </div>
    </div>
  )
}

function ErrorsView(){
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-extrabold">⚠️ Errores frecuentes</h1>
      <div className="grid gap-4">
        {commonErrors.map(e=>(
          <div key={e.id} className="bg-white dark:bg-[#171923] rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
            <div className="flex items-center gap-2"><span className="px-2 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold">Módulo {e.moduleId}</span><h3 className="font-bold">{e.title}</h3></div>
            <p className="text-sm text-slate-500 mt-2">{e.description}</p>
            <div className="mt-4 grid md:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900">
                <div className="text-xs font-bold text-red-700">❌ Incorrecto</div>
                <pre className="mt-1 text-xs font-mono whitespace-pre-wrap break-words">{e.incorrect}</pre>
              </div>
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900">
                <div className="text-xs font-bold text-emerald-700">✅ Correcto</div>
                <pre className="mt-1 text-xs font-mono whitespace-pre-wrap break-words">{e.correct}</pre>
              </div>
            </div>
            <div className="mt-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-sm">{e.explanation}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function EvaluativeView({progress,setProgress,showToast}:any){
  const [started,setStarted]=useState(false)
  const [idx,setIdx]=useState(0)
  const [answers,setAnswers]=useState<Record<string,number>>({})
  const [finished,setFinished]=useState(false)
  const [showResult,setShowResult]=useState(false)
  const [filter,setFilter]=useState<'all'|'correct'|'incorrect'>('all')
  const [instantMode,setInstantMode]=useState(false)
  const [revealed,setRevealed]=useState<Record<string,boolean>>({})
  const total = evaluativeQuestions.length
  const answeredCount = Object.keys(answers).length
  const correctCount = evaluativeQuestions.filter(q=> answers[q.id]===q.correct).length
  const pct = total? Math.round(correctCount/total*100):0
  const progressPct = Math.round((answeredCount/total)*100)

  const handleSelect=(qid:string, opt:number)=>{
    if(finished) return
    setAnswers(prev=> ({...prev, [qid]:opt}))
    if(instantMode){
      // no auto reveal, user will confirm
    }
  }
  const handleConfirm=()=>{
    const q = evaluativeQuestions[idx]
    if(answers[q.id]===undefined) return
    setRevealed(prev=> ({...prev, [q.id]:true}))
    const isCorrect = answers[q.id]===q.correct
    showToast(isCorrect ? '¡Correcto! ✓' : `Incorrecto. Correcta: ${String.fromCharCode(65+q.correct)}`)
  }
  const handleFinish=()=>{
    if(answeredCount < total){
      if(!confirm(`Respondiste ${answeredCount}/${total}. ¿Entregar igual?`)) return
    }
    setFinished(true)
    setShowResult(true)
    const newCorrect = evaluativeQuestions.filter(q=> answers[q.id]===q.correct).map(q=>q.id)
    setProgress((p:any)=> ({...p, xp: p.xp + Math.round(correctCount * 1.5 + 10), answeredCount: p.answeredCount + answeredCount }))
    showToast(`Evaluativo finalizado: ${correctCount}/${total} (${pct}%)`)
  }
  const reset=()=>{
    setAnswers({}); setIdx(0); setStarted(false); setFinished(false); setShowResult(false); setFilter('all'); setRevealed({}); setInstantMode(false)
  }

  if(!started){
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="rounded-[20px] sm:rounded-[24px] bg-gradient-to-br from-violet-600 via-indigo-600 to-fuchsia-600 text-white p-6 sm:p-8 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-64 h-64 bg-white/10 rounded-full blur-2xl"/>
          <div className="relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-xs font-bold tracking-widest">📝 CUESTIONARIO EVALUATIVO</div>
            <h1 className="text-2xl sm:text-3xl font-extrabold mt-3">Cuestionario Evaluativo — 50 preguntas</h1>
            <p className="text-white/90 mt-2 max-w-2xl text-sm sm:text-base">Todas las preguntas del evaluativo real, con respuestas correctas validadas. Practicá en condiciones de examen, con navegación libre y revisión detallada.</p>
            <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3 max-w-md">
              <div className="bg-white rounded-xl p-3 text-center text-slate-800"><div className="font-black text-lg">50</div><div className="text-[11px] text-slate-500 font-semibold">Preguntas</div></div>
              <div className="bg-white rounded-xl p-3 text-center text-slate-800"><div className="font-black text-lg">A-E</div><div className="text-[11px] text-slate-500 font-semibold">Opciones</div></div>
              <div className="bg-white rounded-xl p-3 text-center text-slate-800"><div className="font-black text-lg">~30m</div><div className="text-[11px] text-slate-500 font-semibold">Estimado</div></div>
            </div>
            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <button onClick={()=>setStarted(true)} className="px-7 py-3.5 rounded-xl bg-white text-violet-700 font-extrabold hover:bg-slate-50 shadow-lg">Comenzar evaluativo →</button>
              <div className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-sm text-white/90">✔ Respuestas oficiales incluidas • ✔ Revisión por tema • ✔ Guarda XP</div>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-[#171923] rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
            <div className="font-bold">¿Cómo funciona?</div>
            <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400 list-disc list-inside">
              <li>Navegá con grilla 1-50, podés saltear y volver.</li>
              <li>Elegí A-E por pregunta, se guarda automático.</li>
              <li>Entregá y vas a ver nota, detalle por pregunta y explicación.</li>
              <li>Progreso guardado en LocalStorage + XP.</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-[#171923] rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
            <div className="font-bold">Temario cubierto</div>
            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              {['Cluster/BD/Schema','search_path','EXISTS/IN','HAVING','Orden SQL','LIKE','Subconsultas','CTE','FK CASCADE','LIMIT/OFFSET'].map(t=> <span key={t} className="px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-300 border">{t}</span>)}
            </div>
            <div className="mt-4 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 text-xs text-amber-800 dark:text-amber-200">💡 Tip: Usá el evaluativo como simulacro final antes del examen. Apuntá a 80%+.</div>
          </div>
        </div>
      </div>
    )
  }

  if(showResult){
    const filtered = evaluativeQuestions.filter(q=>{
      if(filter==='all') return true
      if(filter==='correct') return answers[q.id]===q.correct
      return answers[q.id]!==q.correct
    })
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl p-6 text-white text-center">
          <div className="text-white/80 text-xs font-bold tracking-widest">RESULTADO EVALUATIVO</div>
          <div className="text-5xl font-black mt-1">{pct}%</div>
          <div className="text-white/90 mt-1">{correctCount}/{total} correctas • {answeredCount} respondidas</div>
          <div className="mt-3 flex justify-center gap-2">
            {pct>=80 && <span className="px-3 py-1 rounded-full bg-white text-indigo-700 text-sm font-bold">¡Excelente!</span>}
            {pct>=60 && pct<80 && <span className="px-3 py-1 rounded-full bg-white/20 border border-white/30 text-sm font-bold">Aprobado</span>}
            {pct<60 && <span className="px-3 py-1 rounded-full bg-red-500 text-white text-sm font-bold">A repasar</span>}
          </div>
          <div className="mt-5 grid grid-cols-3 gap-2 max-w-md mx-auto">
            <div className="bg-white/15 backdrop-blur rounded-xl p-3 border border-white/20"><div className="font-black text-xl">{correctCount}</div><div className="text-xs opacity-80">Correctas</div></div>
            <div className="bg-white/15 backdrop-blur rounded-xl p-3 border border-white/20"><div className="font-black text-xl">{total-correctCount}</div><div className="text-xs opacity-80">Incorrectas</div></div>
            <div className="bg-white/15 backdrop-blur rounded-xl p-3 border border-white/20"><div className="font-black text-xl">{total-answeredCount}</div><div className="text-xs opacity-80">Sin resp.</div></div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button onClick={()=>setFilter('all')} className={`px-4 py-2 rounded-xl text-sm font-semibold border ${filter==='all'?'bg-slate-900 text-white dark:bg-white dark:text-slate-900':'bg-white dark:bg-slate-800'}`}>Todas ({total})</button>
          <button onClick={()=>setFilter('correct')} className={`px-4 py-2 rounded-xl text-sm font-semibold border ${filter==='correct'?'bg-emerald-600 text-white':'bg-white dark:bg-slate-800'}`}>Correctas ({correctCount})</button>
          <button onClick={()=>setFilter('incorrect')} className={`px-4 py-2 rounded-xl text-sm font-semibold border ${filter==='incorrect'?'bg-red-600 text-white':'bg-white dark:bg-slate-800'}`}>Incorrectas ({total-correctCount})</button>
          <button onClick={()=>setShowResult(false)} className="ml-auto px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold">Volver al cuestionario</button>
          <button onClick={reset} className="px-4 py-2 rounded-xl border bg-white dark:bg-slate-800 text-sm font-semibold">Reiniciar</button>
        </div>

        <div className="space-y-4">
          {filtered.map((q, i)=> {
            const userAns = answers[q.id]
            const isCorrect = userAns === q.correct
            const idxReal = evaluativeQuestions.findIndex(x=>x.id===q.id)
            return (
              <div key={q.id} className={`bg-white dark:bg-[#171923] rounded-2xl border p-5 ${isCorrect?'border-emerald-200 dark:border-emerald-900':'border-red-200 dark:border-red-900'}`}>
                <div className="flex items-start justify-between gap-3">
                  <div className={`px-2.5 py-1 rounded-full text-xs font-bold ${isCorrect?'bg-emerald-100 text-emerald-700':'bg-red-100 text-red-700'}`}>#{idxReal+1} {isCorrect?'✓ Correcta':'✗ Incorrecta'}</div>
                  <span className="text-xs text-slate-500">Tu Rta: {userAns!==undefined ? String.fromCharCode(65+userAns) : '—'} • Correcta: {String.fromCharCode(65+q.correct)}</span>
                </div>
                <div className="font-semibold mt-2">{q.question}</div>
                <div className="mt-3 space-y-1.5">
                  {q.options.map((op, oi)=>{
                    const isU = oi===userAns
                    const isC = oi===q.correct
                    let cls="border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                    if(isC) cls="bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 text-emerald-800 dark:text-emerald-200 font-semibold"
                    else if(isU && !isC) cls="bg-red-50 dark:bg-red-950/30 border-red-300 text-red-800 dark:text-red-200"
                    return <div key={oi} className={`p-2.5 rounded-xl border text-sm flex gap-2 ${cls}`}><span className="font-bold">{String.fromCharCode(65+oi)}.</span><span>{op}</span>{isC && <span className="ml-auto">✓</span>}</div>
                  })}
                </div>
                <div className="mt-3 p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900 text-sm text-slate-700 dark:text-slate-300">
                  <span className="font-semibold text-indigo-700 dark:text-indigo-300">Explicación:</span> {q.explanation}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  const q = evaluativeQuestions[idx]
  const letters = ['A','B','C','D','E']
  return (
    <div className="max-w-6xl mx-auto grid lg:grid-cols-[280px_1fr] gap-4 sm:gap-6">
      {/* Grilla navegable */}
      <div className="bg-white dark:bg-[#171923] rounded-2xl border border-slate-200 dark:border-slate-800 p-4 h-fit lg:sticky lg:top-[72px]">
        <div className="flex items-center justify-between">
          <div className="font-bold text-sm">Preguntas</div>
          <span className="text-xs px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800">{answeredCount}/{total}</span>
        </div>
        <div className="mt-3 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-violet-600 to-indigo-600 transition-all" style={{width:`${progressPct}%`}}/></div>
        {/* Toggle corrección instantánea */}
        <div className="mt-4 p-3 rounded-xl bg-violet-50 dark:bg-violet-950/20 border border-violet-200 dark:border-violet-900">
          <div className="flex items-center justify-between gap-2">
            <div>
              <div className="text-xs font-bold text-violet-800 dark:text-violet-200">Corrección instantánea</div>
              <div className="text-[11px] text-violet-600 dark:text-violet-300 leading-tight">{instantMode ? 'Te dice al confirmar si está bien' : 'Solo al entregar ves la nota'}</div>
            </div>
            <button onClick={()=>setInstantMode(v=>!v)} className={`w-11 h-6 rounded-full relative transition shrink-0 ${instantMode?'bg-violet-600':'bg-slate-300 dark:bg-slate-600'}`}>
              <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition ${instantMode?'left-5':'left-0.5'}`}/>
            </button>
          </div>
          <div className="mt-2 text-[11px] text-slate-500">{instantMode ? '✔ Activada: Confirmar → ver feedback' : '○ Desactivada'}</div>
        </div>
        <div className="mt-4 grid grid-cols-5 sm:grid-cols-8 lg:grid-cols-5 gap-1.5">
          {evaluativeQuestions.map((qq, i)=>{
            const answered = answers[qq.id]!==undefined
            const isCurrent = i===idx
            const wasRevealed = !!revealed[qq.id]
            const isCorrectRevealed = wasRevealed && answers[qq.id]===qq.correct
            return (
              <button key={qq.id} onClick={()=>setIdx(i)} className={`h-9 rounded-xl text-sm font-bold border transition flex items-center justify-center ${isCurrent?'bg-indigo-600 text-white border-indigo-600 shadow': wasRevealed ? (isCorrectRevealed?'bg-emerald-500 text-white border-emerald-500':'bg-red-500 text-white border-red-500') : answered?'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border-emerald-200':'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'}`}>
                {i+1}
              </button>
            )
          })}
        </div>
        <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-emerald-500"/> Correcta</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-red-500"/> Incorrecta</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-emerald-200 border border-emerald-300"/> Respondida</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-indigo-600"/> Actual</span>
        </div>
        <button onClick={handleFinish} className="mt-4 w-full py-3 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700">Entregar evaluativo</button>
        <button onClick={()=>{ if(confirm('¿Salir sin guardar?')) setStarted(false)}} className="mt-2 w-full py-2.5 rounded-xl border bg-white dark:bg-slate-800 text-sm font-semibold">Salir</button>
        <div className="mt-3 text-xs text-slate-500 text-center">Podés entregar con preguntas sin responder.</div>
      </div>

      {/* Pregunta actual */}
      <div className="bg-white dark:bg-[#171923] rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="px-2.5 py-1 rounded-full bg-violet-100 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300 font-bold">Pregunta {idx+1} / {total}</span>
          <span className="px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800">ID {q.id}</span>
          {answers[q.id]!==undefined ? <span className="px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 font-semibold">Respondida: {letters[answers[q.id]]}</span> : <span className="px-2 py-1 rounded-full bg-amber-100 text-amber-700 font-semibold">Pendiente</span>}
          <span className="ml-auto text-slate-500">{progressPct}% completado</span>
        </div>

        <h2 className="font-bold text-[15px] sm:text-lg leading-relaxed mt-4">{q.question}</h2>

        <div className="mt-4 space-y-2">
          {q.options.map((op, oi)=>{
            const selected = answers[q.id]===oi
            const isRevealed = !!revealed[q.id]
            const isCorrectOpt = oi===q.correct
            let btnCls = 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-700'
            if(instantMode && isRevealed){
              if(isCorrectOpt) btnCls='bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 text-emerald-800 dark:text-emerald-200'
              else if(selected && !isCorrectOpt) btnCls='bg-red-50 dark:bg-red-950/30 border-red-300 text-red-800 dark:text-red-200'
              else btnCls='opacity-60 bg-slate-50 dark:bg-slate-800 border-slate-200'
            } else if(selected){
              btnCls='bg-indigo-600 text-white border-indigo-600 shadow'
            }
            return (
              <button key={oi} onClick={()=>handleSelect(q.id, oi)} disabled={!!(instantMode && revealed[q.id])} className={`w-full text-left p-3 sm:p-3.5 rounded-xl border text-sm flex gap-3 items-start transition ${btnCls} ${instantMode && revealed[q.id] ? 'cursor-default' : ''}`}>
                <span className={`w-7 h-7 rounded-full grid place-items-center font-black text-xs shrink-0 ${selected && !instantMode ? 'bg-white text-indigo-600' : instantMode && isRevealed && isCorrectOpt ? 'bg-emerald-600 text-white' : instantMode && isRevealed && selected && !isCorrectOpt ? 'bg-red-600 text-white' : selected ? 'bg-white text-indigo-600' : 'bg-white dark:bg-slate-900 border'}`}>{letters[oi]}</span>
                <span className="flex-1 leading-snug">{op}</span>
                {instantMode && isRevealed && isCorrectOpt && <span className="text-emerald-600 font-bold">✓</span>}
                {instantMode && isRevealed && selected && !isCorrectOpt && <span className="text-red-600 font-bold">✗</span>}
              </button>
            )
          })}
        </div>

        {/* Botón confirmar + feedback instantáneo */}
        {instantMode ? (
          <div className="mt-4 space-y-3">
            {!revealed[q.id] ? (
              <button disabled={answers[q.id]===undefined} onClick={handleConfirm} className="w-full py-3 rounded-xl bg-violet-600 text-white font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-violet-700">
                {answers[q.id]===undefined ? 'Seleccioná una opción' : `Confirmar respuesta ${letters[answers[q.id]]} → Ver corrección`}
              </button>
            ) : (
              <div className={`p-4 rounded-xl border ${answers[q.id]===q.correct ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800' : 'bg-red-50 dark:bg-red-950/20 border-red-300 dark:border-red-800'}`}>
                <div className={`font-bold ${answers[q.id]===q.correct ? 'text-emerald-700 dark:text-emerald-300' : 'text-red-700 dark:text-red-300'}`}>
                  {answers[q.id]===q.correct ? '¡Correcto! ✓' : `Incorrecto ✗ — Correcta: ${letters[q.correct]}`}
                </div>
                <div className="text-sm mt-1 text-slate-700 dark:text-slate-300">{q.explanation}</div>
                <div className="mt-3 flex gap-2">
                  <button onClick={()=> setRevealed(prev=>{ const n={...prev}; delete n[q.id]; return n})} className="px-4 py-2 rounded-xl border bg-white dark:bg-slate-800 text-sm font-semibold">Cambiar respuesta</button>
                  <button onClick={()=> setIdx(i=>Math.min(total-1,i+1))} className="flex-1 py-2 rounded-xl bg-indigo-600 text-white text-sm font-bold">Siguiente →</button>
                </div>
              </div>
            )}
            {answers[q.id]!==undefined && !revealed[q.id] && <div className="text-xs text-slate-500 text-center">Confirmá para ver si está bien. Podés desactivar el modo arriba.</div>}
          </div>
        ) : (
          answers[q.id]!==undefined && !finished && (
            <div className="mt-4 p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900 text-sm">
              Seleccionaste <b>{letters[answers[q.id]]}</b>. Podés cambiar antes de entregar. {instantMode ? '' : 'Activá corrección instantánea para ver al momento.'}
            </div>
          )
        )}

        <div className="mt-6 flex justify-between gap-3">
          <button disabled={idx===0} onClick={()=>setIdx(i=>Math.max(0,i-1))} className="px-5 py-3 rounded-xl border bg-white dark:bg-slate-800 font-semibold disabled:opacity-40 text-sm">← Anterior</button>
          {idx===total-1 ? <button onClick={handleFinish} className="px-7 py-3 rounded-xl bg-emerald-600 text-white font-bold">Entregar →</button> : <button onClick={()=>setIdx(i=>Math.min(total-1,i+1))} className="px-7 py-3 rounded-xl bg-indigo-600 text-white font-bold">Siguiente →</button>}
        </div>

        <div className="mt-4 flex justify-center">
          <button onClick={handleFinish} className="text-sm text-slate-500 underline">Entregar y ver resultado</button>
        </div>
      </div>
    </div>
  )
}

function SearchView({search,results,setView,setSelectedModule}:any){
  if(!search) return <div className="text-center py-20 text-slate-500">Escribí algo para buscar</div>
  if(!results) return null
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-xl font-bold">Resultados para "{search}"</h1>
      <div className="bg-white dark:bg-[#171923] rounded-2xl border p-5">
        <div className="font-semibold">Conceptos ({results.mods.length})</div>
        <div className="mt-2 space-y-2">{results.mods.map((c:any)=><button key={c.id} onClick={()=>{setSelectedModule(c.moduleId); setView('module-detail')}} className="w-full text-left p-3 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100"><div className="font-medium text-sm">{c.title} • {c.moduleTitle}</div><div className="text-xs text-slate-500">{c.theory.slice(0,80)}...</div></button>)}{!results.mods.length && <div className="text-sm text-slate-500">Sin resultados</div>}</div>
      </div>
      <div className="bg-white dark:bg-[#171923] rounded-2xl border p-5">
        <div className="font-semibold">Flashcards ({results.fcs.length})</div>
        <div className="mt-2 space-y-2">{results.fcs.map((f:any)=><div key={f.id} className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/20 text-sm">{f.question}<div className="text-xs text-slate-500">{f.answer}</div></div>)}</div>
      </div>
      <div className="bg-white dark:bg-[#171923] rounded-2xl border p-5">
        <div className="font-semibold">Preguntas ({results.qs.length})</div>
        <div className="mt-2 space-y-2">{results.qs.map((q:any)=><div key={q.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-sm">{q.question}</div>)}</div>
      </div>
    </div>
  )
}
