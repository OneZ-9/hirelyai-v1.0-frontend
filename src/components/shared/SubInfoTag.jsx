function SubInfoTag({ icon, label }) {
  return (
    <div className="flex items-center gap-x-2">
      <span className="max-sm:hidden">{icon}</span>
      <span className="max-sm:text-[0.6rem] max-md:text-xs">{label}</span>
    </div>
  );
}

export default SubInfoTag;
