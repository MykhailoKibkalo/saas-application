export function Footer() {
    return (
        <footer className="bg-white border-t border-secondary-100 py-4 px-6 text-center text-secondary-500 text-sm">
            <p>© {new Date().getFullYear()} SaaSApp. All rights reserved.</p>
        </footer>
    );
}