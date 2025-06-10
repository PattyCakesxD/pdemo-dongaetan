export function NavLogo() {
  return (
    <div className="grid grid-cols-3 gap-2 mb-6 w-full max-w-md px-4">
      {"DONGAETAN".split("").map((letter, i) => (
        <div
          key={i}
          className="w-full h-full flex items-center justify-center rounded-full text-4xl font-semibold aspect-square bg-gray-100 "
        >
          {letter}
        </div>
      ))}
    </div>
  );
}
