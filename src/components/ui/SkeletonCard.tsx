// ─── Card de carregamento ─────────────────────────────────────────────────────
// Exibido em uma grade enquanto os produtos estão carregando

export default function SkeletonCard() {
  return (
    <div className="bg-white border border-ink-100 rounded-sm overflow-hidden">
      {/* Espaço reservado para imagem */}
      <div className="aspect-[4/3] shimmer-bg" />
      {/* Espaços reservados para conteúdo */}
      <div className="p-4 space-y-2.5">
        <div className="h-4 w-3/4 rounded shimmer-bg" />
        <div className="h-3 w-full rounded shimmer-bg" />
        <div className="h-3 w-2/3 rounded shimmer-bg" />
        <div className="flex justify-between items-center pt-1">
          <div className="h-3 w-20 rounded shimmer-bg" />
          <div className="h-5 w-16 rounded shimmer-bg" />
        </div>
      </div>
    </div>
  );
}
