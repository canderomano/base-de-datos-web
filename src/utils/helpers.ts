export function cn(...c:(string|false|undefined)[]){ return c.filter(Boolean).join(' ') }

export function xpToLevel(xp:number){ return Math.floor(xp/150)+1 }
export function xpProgress(xp:number){ return xp%150 }
