interface Props {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Card({ title, subtitle, children, className = "" }: Props) {
  return (
    <div
      className={`bg-[#161926] border border-[#1e2130] rounded-xl overflow-hidden ${className}`}
    >
      {(title || subtitle) && (
        <div className="px-6 py-4 border-b border-[#1e2130]">
          {title && <h3 className="text-sm font-semibold text-white">{title}</h3>}
          {subtitle && (
            <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>
          )}
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
}
