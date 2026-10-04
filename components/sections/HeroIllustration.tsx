export default function HeroIllustration() {
  return (
    <div className="heroart">
      <div className="orbit orbit1" />
      <div className="orbit orbit2" />
      <div className="floatingtag tagone">
        <i /> React + TypeScript
      </div>
      <div className="editor">
        <div className="editorhead">
          <span>
            <i />
            <i />
            <i />
          </span>
          <small>hello-world.tsx</small>
          <b>⌘</b>
        </div>
        <div className="code">
          <div>
            <em>01</em>
            <span className="purple">const</span> engineer = {'{'}
          </div>
          <div>
            <em>02</em>　name: <span className="sage">'Anuvab Das'</span>,
          </div>
          <div>
            <em>03</em>　craft: <span className="sage">'Frontend engineering'</span>,
          </div>
          <div>
            <em>04</em>　stack: [<span className="sage">'React'</span>,{' '}
            <span className="sage">'TypeScript'</span>],
          </div>
          <div>
            <em>05</em>　mindset: <span className="sage">'Always learning'</span>
          </div>
          <div>
            <em>06</em>
            {'}'};
          </div>
          <div>
            <em>07</em>{' '}
          </div>
          <div>
            <em>08</em>
            <span className="purple">export default</span>{' '}
            <span className="gold">buildSomethingGreat</span>();
          </div>
        </div>
        <div className="editorfoot">
          <span>⎇ main</span>
          <span>
            <i /> Ready to create
          </span>
          <span>TypeScript</span>
        </div>
      </div>
      <div className="floatingtag tagtwo">
        <span className="check">✓</span>
        <div>
          Designed for real people<small>Engineered for the real world.</small>
        </div>
      </div>
      <span className="artcaption">A LITTLE CURIOSITY. A LOT OF COMMITMENT.</span>
    </div>
  );
}
