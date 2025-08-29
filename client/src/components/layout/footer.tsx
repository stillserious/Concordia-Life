export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-6 text-center">
      <p className="text-sm text-gray-600" data-testid="footer-contact">
        Potrzebujesz pomocy? Skontaktuj się z nami pod numerem 24h:{" "}
        <strong className="text-insurance-primary">800 123 456</strong>
      </p>
    </footer>
  );
}
