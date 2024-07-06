function SubInfoTag({ icon, label }) {
  return (
    <div className="flex items-center gap-x-2">
      <span>{icon}</span>
      <span>{label}</span>
    </div>
  );
}

export default SubInfoTag;
