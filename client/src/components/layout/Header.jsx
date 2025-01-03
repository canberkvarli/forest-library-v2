function Header() {
    return (
        <header className="bg-green-500 text-white p-4 shadow-md">
            <div className="flex justify-between items-center">
                <div className="font-bold text-lg">ForestLibrary</div>
                <nav>
                    <ul className="flex space-x-6">
                        <li>
                            <a href="/" className="hover:text-gray-200">Home</a>
                        </li>
                        <li>
                            <a href="/about" className="hover:text-gray-200">About</a>
                        </li>
                        <li>
                            <a href="/contact" className="hover:text-gray-200">Contact</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
