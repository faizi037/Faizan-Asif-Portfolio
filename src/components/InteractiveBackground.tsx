const InteractiveBackground = () => {
  return (
    <>
      <div className="fixed inset-0 -z-10 pointer-events-none">
        {/* Static gradient backgrounds - much lighter */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/8 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/8 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
      </div>
    </>
  );
};

export default InteractiveBackground;
