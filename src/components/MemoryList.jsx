export default function MemoryList({ memories = [] }) {
  if (!memories.length) {
    return <p className="text-slate-500">No memories yet.</p>;
  }

  return (
    <div className="space-y-4">
      {memories.map((memory, index) => (
        <div
          key={index}
          className="rounded-xl border border-slate-200 p-5"
        >
          <p className="font-medium text-slate-900">{memory.author}</p>
          <p className="mt-2 text-slate-600">{memory.text}</p>
        </div>
      ))}
    </div>
  );
}
