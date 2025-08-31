export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-6 px-6 text-center">
      <p className="text-sm text-gray-600" data-testid="footer-contact">
        Potrzebujesz pomocy? Skontaktuj się z nami telefonicznie, pod numerem:{" "}
        <strong className="text-insurance-primary">606 883 506</strong><br />
        Infolinia działa 24 h na dobę, 7 dni w tygodniu.
      </p>
    </footer>
  );
}
