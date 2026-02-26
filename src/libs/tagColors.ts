// Tag color palette - 20 unique colors
export const tagColors = [
  { bg: 'bg-green-500/20', border: 'border-green-500/50', text: 'text-green-300', glow: 'bg-green-500/40' },
  { bg: 'bg-blue-500/20', border: 'border-blue-500/50', text: 'text-blue-300', glow: 'bg-blue-500/40' },
  { bg: 'bg-purple-500/20', border: 'border-purple-500/50', text: 'text-purple-300', glow: 'bg-purple-500/40' },
  { bg: 'bg-pink-500/20', border: 'border-pink-500/50', text: 'text-pink-300', glow: 'bg-pink-500/40' },
  { bg: 'bg-amber-500/20', border: 'border-amber-500/50', text: 'text-amber-300', glow: 'bg-amber-500/40' },
  { bg: 'bg-cyan-500/20', border: 'border-cyan-500/50', text: 'text-cyan-300', glow: 'bg-cyan-500/40' },
  { bg: 'bg-rose-500/20', border: 'border-rose-500/50', text: 'text-rose-300', glow: 'bg-rose-500/40' },
  { bg: 'bg-teal-500/20', border: 'border-teal-500/50', text: 'text-teal-300', glow: 'bg-teal-500/40' },
  { bg: 'bg-orange-500/20', border: 'border-orange-500/50', text: 'text-orange-300', glow: 'bg-orange-500/40' },
  { bg: 'bg-violet-500/20', border: 'border-violet-500/50', text: 'text-violet-300', glow: 'bg-violet-500/40' },
  { bg: 'bg-lime-500/20', border: 'border-lime-500/50', text: 'text-lime-300', glow: 'bg-lime-500/40' },
  { bg: 'bg-fuchsia-500/20', border: 'border-fuchsia-500/50', text: 'text-fuchsia-300', glow: 'bg-fuchsia-500/40' },
  { bg: 'bg-emerald-500/20', border: 'border-emerald-500/50', text: 'text-emerald-300', glow: 'bg-emerald-500/40' },
  { bg: 'bg-sky-500/20', border: 'border-sky-500/50', text: 'text-sky-300', glow: 'bg-sky-500/40' },
  { bg: 'bg-red-500/20', border: 'border-red-500/50', text: 'text-red-300', glow: 'bg-red-500/40' },
  { bg: 'bg-yellow-500/20', border: 'border-yellow-500/50', text: 'text-yellow-300', glow: 'bg-yellow-500/40' },
  { bg: 'bg-slate-500/20', border: 'border-slate-400/50', text: 'text-slate-300', glow: 'bg-slate-500/40' },
  { bg: 'bg-stone-500/20', border: 'border-stone-400/50', text: 'text-stone-300', glow: 'bg-stone-500/40' },
  { bg: 'bg-zinc-400/20', border: 'border-zinc-400/50', text: 'text-zinc-300', glow: 'bg-zinc-400/40' },
];

export function getTagColor(index: number) {
  return tagColors[index % tagColors.length]!;
}
