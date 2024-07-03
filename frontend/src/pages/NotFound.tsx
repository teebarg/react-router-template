import React from "react";
import { Link } from "react-router-dom";

interface Props {}

const NotFound: React.FC<Props> = () => {
    return (
        <div>
            <div className="flex flex-col items-center justify-center min-h-screen bg-content1">
                <div className="max-w-md mx-auto text-center">
                    {/* <iframe src={giphy404} width="100%" height="50%" style={{ maxHeight: "60%", maxWidth: "100%" }} frameBorder="0" allowFullScreen /> */}
                    <svg className="w-20 h-20 mx-auto text-danger" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                    </svg>
                    <h1 className="text-4xl font-bold mt-6">Oops! Page Not Found</h1>
                    <p className="text-default-500 mt-4">{`The page you're looking for doesn't exist or has been moved.`}</p>
                    <Link to="/" className="bg-primary text-white font-semibold py-2 px-4 rounded mt-6 inline-block">
                        Go to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
