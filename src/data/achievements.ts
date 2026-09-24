import type { Achievement } from '../types';
export const achievements: Achievement[] = [
  {id:'a1', title:'Primera sesión', desc:'Completá tu primera sesión de estudio', icon:'🎯', xp:20},
  {id:'a2', title:'10 preguntas', desc:'Respondé 10 preguntas correctamente', icon:'🧠', xp:30},
  {id:'a3', title:'Primer módulo', desc:'Dominá tu primer módulo', icon:'📚', xp:50},
  {id:'a4', title:'Maestro subconsultas', desc:'Aprobá módulo 2 con >80%', icon:'🔍', xp:40},
  {id:'a5', title:'Racha 7 días', desc:'Estudiá 7 días seguidos', icon:'🔥', xp:100},
  {id:'a6', title:'Flash master', desc:'30 tarjetas estudiadas', icon:'🃏', xp:30},
  {id:'a7', title:'SQL Lab', desc:'Completá 5 ejercicios en laboratorio', icon:'💻', xp:40},
  {id:'a8', title:'Simulacro Pro', desc:'80%+ en simulacro de 20 preg.', icon:'🏆', xp:70},
];
