export default function Card({ className = "", children }) {
  return <div className={`rounded-3xl bg-white shadow-sm ring-1 ring-slate-200 ${className}`}>{children}</div>;
}
