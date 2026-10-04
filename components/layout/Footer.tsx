export default function Footer() {
  return (
    <footer>
      <a className="brandmark" href="#">
        ad<span>.</span>
      </a>
      <p>
        © {new Date().getFullYear()} Anuvab Das <span>·</span> Crafted with intention.
      </p>
      <a href="#">Back to top ↑</a>
    </footer>
  );
}
