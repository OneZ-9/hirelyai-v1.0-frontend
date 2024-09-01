function Message({ message }) {
  return (
    <div className="h-80 flex items-center justify-center text-center md:p-40 text-slate-500 dark:text-slate-400">
      <p>{message}</p>
    </div>
  );
}

export default Message;
