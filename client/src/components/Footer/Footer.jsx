import "./Footer.css";

const Footer = () => (
    <div className="bg-emerald-800 text-emerald-300 px-6 py-6 mt-24 border-t border-emerald-600">
        <div className="text-2xl font-semibold mb-6">Meet the team</div>
        <div className="flex justify-around gap-8">
            <div className="flex flex-col items-center">
                <img src="https://ca.slack-edge.com/T03GU501J-U01QQ6RL6G1-5e6de7fae34e-512" alt="Canberk" className="w-24 rounded-full mb-3" />
                <div className="text-center">Canberk</div>
                <div className="space-x-2 mt-2">
                    <a href="https://www.linkedin.com/in/canberkvarli/" target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline">
                        LinkedIn
                    </a>
                    <a href="https://github.com/canberkvarli" target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline">
                        Github
                    </a>
                </div>
            </div>
            <div className="flex flex-col items-center">
                <img src="https://ca.slack-edge.com/T03GU501J-U020Z12SXPC-512120e88aaa-512" alt="Hilal" className="w-24 rounded-full mb-3" />
                <div className="text-center">Hilal</div>
                <div className="space-x-2 mt-2">
                    <a href="https://www.linkedin.com/in/hilal-balci-bebek-546b001b6/" target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline">
                        LinkedIn
                    </a>
                    <a href="https://github.com/hilalbbalci" target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline">
                        Github
                    </a>
                </div>
            </div>
            <div className="flex flex-col items-center">
                <img src="https://avatars.githubusercontent.com/u/15056122?s=400&u=5d0c1a7232d4ec2caf66c32fb77dbb28227b4544&v=4" alt="Jay" className="w-24 rounded-full mb-3" />
                <div className="text-center">Jay</div>
                <div className="space-x-2 mt-2">
                    <a href="https://www.linkedin.com/in/jay-lam/" target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline">
                        LinkedIn
                    </a>
                    <a href="https://github.com/lamjay415" target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline">
                        Github
                    </a>
                </div>
            </div>
        </div>
    </div>
);

export default Footer;
